import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { EnhancedTreeNode, NodeMovePositionType, TreeNodeComponentProps, TreeType } from './type';
import { getNodeLevel } from './tree.service';
import { IcoFolder, IcoHome03 } from '@learnway/icons';

// Component that filters out hidden nodes
const FilteredTreeNode = ({ node, draggedNodeKey, ...props }: TreeNodeComponentProps) => {
  const enhancedNode = node as EnhancedTreeNode;

  // If node is hidden, don't render anything
  if (enhancedNode._visible === false) {
    return null;
  }

  // Render the actual tree node component
  return <TreeNodeComponent node={node} draggedNodeKey={draggedNodeKey} {...props} />;
};

const TreeNodeComponent = ({
  node,
  level = 0,
  expandedKeys,
  setExpandedKeys,
  selectedNode,
  onDragStart,
  onDrop,
  isDraggable,
  onNodeClick,
  treeType,
  nodeButtons,
  searchKeyword,
  draggedNodeKey,
  draggedNode,
}: TreeNodeComponentProps) => {
  const enhanceNode = node as EnhancedTreeNode;
  // Drop position state (before, inside, after)
  const [dropPosition, setDropPosition] = useState<NodeMovePositionType | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);

  const hasChildren = enhanceNode.children && enhanceNode.children.length > 0;
  const isExpanded = expandedKeys.includes(enhanceNode.key);
  const isDragAndDropMode =
    treeType === 'DRAG_DROP' || treeType === 'SAME_LEVEL_ONLY' || treeType === 'SAME_PARENT_ONLY';

  // Styles for different drop positions
  const dropIndicatorStyle = {
    BEFORE: 'absolute w-full h-0.5 bg-blue-400 -top-[1px] z-10 pointer-events-none',
    AFTER: 'absolute w-full h-0.5 bg-blue-400 bottom-[-1px] z-10 pointer-events-none',
    INSIDE: 'absolute inset-0 bg-blue-100 opacity-50 pointer-events-none rounded',
  };

  const isActuallyDraggable = isDraggable && enhanceNode.constraints?.drag !== false;

  // Search keyword highlighting function
  const highlightMatch = (text: string) => {
    if (!searchKeyword) return text;

    const regex = new RegExp(`(${searchKeyword})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) => {
          const isMatch = part.toLowerCase() === searchKeyword.toLowerCase();
          return isMatch ? (
            <span key={i} className="bg-yellow-200">
              {part}
            </span>
          ) : (
            part
          );
        })}
      </>
    );
  };

  // Compute node style based on state
  const getNodeStyle = useMemo(() => {
    const styles = [
      `flex items-center py-1 rounded min-h-[40px]
        ${dropPosition === 'INSIDE' ? 'bg-blue-200' : ''}
        ${isDragging ? 'opacity-50 scale-[0.98] border border-blue-300 bg-blue-50' : ''}`,
    ];

    if (selectedNode && selectedNode.key === enhanceNode.key) {
      styles.push('bg-blue-50');
    }

    // Constraint styles
    if (enhanceNode.constraints?.drag === false) {
      styles.push('border-l-4 border-red-300');
    }
    if (enhanceNode.constraints?.drop === false) {
      styles.push('border-l-4 border-yellow-300');
    }
    if (enhanceNode.constraints?.drag === false && enhanceNode.constraints?.drop === false) {
      styles.push('bg-gray-50');
    }
    if (enhanceNode.constraints?.drag === false || enhanceNode.constraints?.drop === false) {
      styles.push('opacity-75');
    } else {
      styles.push('hover:bg-gray-100');
    }

    // Search highlight
    if (
      searchKeyword &&
      enhanceNode.title &&
      enhanceNode.title.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      styles.push('bg-yellow-50');
    }

    return styles.join(' ');
  }, [
    dropPosition,
    isDragging,
    selectedNode,
    enhanceNode.key,
    enhanceNode.constraints,
    enhanceNode.title,
    searchKeyword,
  ]);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent) => {
    if (!isDraggable || enhanceNode.constraints?.drag === false) return;

    try {
      // Create drag image
      const dragImage = document.createElement('div');
      dragImage.classList.add('drag-node-image');
      dragImage.innerHTML = `
      <div class="px-2 py-1 bg-blue-100 rounded border border-blue-300 shadow-md flex items-center">
        ${level === 0 ? '<span>🏠</span>' : '<span>📁</span>'}
        <span class="ml-2 font-medium">${enhanceNode.title || ''}</span>
      </div>
    `;

      // Position off-screen
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-1000px';
      dragImage.style.left = '-1000px';
      dragImage.style.pointerEvents = 'none';

      // Add to document
      document.body.appendChild(dragImage);

      // Set drag image
      e.dataTransfer.setDragImage(dragImage, 10, 10);

      // Set effect allowed before setting data
      e.dataTransfer.effectAllowed = 'move';

      // Include level info explicitly
      const nodeData = {
        ...enhanceNode,
        level: level,
      };

      // Important: order matters for cross-browser compatibility
      // First set the application/json format
      e.dataTransfer.setData('application/json', JSON.stringify(nodeData));

      // Then set the text/plain format (for simple identification)
      e.dataTransfer.setData('text/plain', nodeData.key);

      // Add a custom format to make detection easier during dragover
      e.dataTransfer.setData('tree/node', 'true');

      // Call drag start callback
      if (onDragStart) {
        onDragStart(nodeData);
      }

      // Remove drag image after a short delay
      setTimeout(() => {
        if (document.body.contains(dragImage)) {
          document.body.removeChild(dragImage);
        }
      }, 0);

      setIsDragging(true);

      // Debug log to verify data was set
      console.log('Drag started with formats:', e.dataTransfer.types);
    } catch (error) {
      console.error('Drag start error:', error);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    if (enhanceNode.constraints?.drop === false) return;

    e.preventDefault();
    e.stopPropagation();

    // Check if we're dragging a tree node before proceeding
    // Use multiple checks for cross-browser compatibility
    const isTreeNodeDrag =
      e.dataTransfer.types.includes('tree/node') ||
      e.dataTransfer.types.includes('application/json') ||
      (draggedNodeKey !== null && draggedNode !== null);
    console.log(isTreeNodeDrag);
    if (!isTreeNodeDrag) {
      return;
    }

    // Prevent drop on level 0 unless it's INSIDE
    if (level === 0 && dropPosition !== 'INSIDE') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 3;

    // Calculate new position
    let newPosition: NodeMovePositionType | null = null;

    // Basic position calculation
    newPosition = y < threshold ? 'BEFORE' : y > rect.height - threshold ? 'AFTER' : 'INSIDE';

    // Apply tree-type specific constraints
    if (treeType === 'SAME_LEVEL_ONLY' || treeType === 'SAME_PARENT_ONLY') {
      // For these modes, we don't allow dropping inside another node
      if (newPosition === 'INSIDE') {
        newPosition = y < rect.height / 2 ? 'BEFORE' : 'AFTER';
      }
    }

    // Update state only if position changed
    if (dropPosition !== newPosition) {
      setDropPosition(newPosition);
    }

    // Set dropEffect to show the correct cursor
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDropPosition(null);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    if (enhanceNode.constraints?.drop === false) return;

    e.preventDefault();
    e.stopPropagation();

    // Prevent drop on level 0 unless it's INSIDE
    if (level === 0 && dropPosition !== 'INSIDE') {
      return;
    }

    // Get the source node - try from dataTransfer first, then from component state
    let sourceNode;

    try {
      // Try to get from dataTransfer
      const jsonData = e.dataTransfer.getData('application/json');
      if (jsonData) {
        sourceNode = JSON.parse(jsonData);
      }
    } catch (error) {
      console.error('Error retrieving dragged node data from dataTransfer:', error);
    }

    // If we couldn't get source node from dataTransfer, use component state
    if (!sourceNode && draggedNode) {
      sourceNode = draggedNode;
    }

    // Final check before proceeding
    if (!sourceNode) {
      console.warn('No dragged node information available');
      return;
    }

    // Call drop callback if we have a position
    if (dropPosition) {
      console.log(
        'Dropping node:',
        sourceNode,
        'at position:',
        dropPosition,
        'on target:',
        enhanceNode,
      );
      onDrop?.({
        targetNode: { ...enhanceNode, level },
        dropPosition: dropPosition,
        sourceNode: sourceNode,
      });
    }

    setDropPosition(null);
  };

  // Toggle expand/collapse
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedKeys((prev) =>
      isExpanded ? prev.filter((k) => k !== enhanceNode.key) : [...prev, enhanceNode.key],
    );
  };

  // Handle node click
  const handleClick = () => {
    if (enhanceNode && onNodeClick) onNodeClick(enhanceNode);
    if (enhanceNode === selectedNode && onNodeClick) onNodeClick(null);
  };

  // Drag start from hamburger icon
  const handleHamburgerDragStart = (e: React.DragEvent) => {
    handleDragStart(e);
  };

  return (
    <div className="relative select-none">
      <div
        className={getNodeStyle}
        style={{
          paddingLeft: `${level * 20}px`,
          cursor: enhanceNode.constraints?.drag === false ? 'not-allowed' : 'grab',
          boxShadow: isDragging ? '0 0 0 2px rgba(59, 130, 246, 0.3)' : 'none',
          transition: 'all 0.2s ease',
        }}
        draggable={isActuallyDraggable}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {dropPosition && <div className={dropIndicatorStyle[dropPosition]} />}
        <span
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={handleToggleExpand}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            )
          ) : null}
        </span>
        <span className="mr-1 flex h-6 w-6 items-center justify-center">
          {level === 0 ? <IcoHome03 stroke="#131C30" /> : <IcoFolder stroke="#131C30" />}
        </span>
        <span className="flex-grow text-sm">{highlightMatch(enhanceNode.title || '')}</span>

        {isDragAndDropMode && (
          <div className="relative flex items-center">
            {nodeButtons && (
              <div
                className={`mr-2 flex space-x-1 transition-opacity duration-150 ${isHovered || level === 0 ? 'opacity-100' : 'invisible opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
              >
                {nodeButtons(enhanceNode, level)}
              </div>
            )}
            {level >= 1 && (
              <span
                className={`ml-2 flex items-center justify-center text-lg transition-opacity ${isDragAndDropMode && isActuallyDraggable ? 'cursor-grab' : 'cursor-pointer'}`}
                draggable={true}
                onDragStart={handleHamburgerDragStart}
                onDragEnd={handleDragEnd}
              >
                ☰
              </span>
            )}
          </div>
        )}

        {treeType === 'SHUTTLE_LIST' && (
          <div className="relative flex items-center">
            {nodeButtons && (
              <div
                className={`duration-150} mr-2 flex space-x-1 transition-opacity`}
                onClick={(e) => e.stopPropagation()}
              >
                {nodeButtons(enhanceNode, level)}
              </div>
            )}
          </div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="tree-children">
          {enhanceNode.children &&
            enhanceNode.children.map((child) => (
              <FilteredTreeNode
                key={child.key}
                node={child}
                level={level + 1}
                expandedKeys={expandedKeys}
                setExpandedKeys={setExpandedKeys}
                selectedNode={selectedNode}
                onDragStart={onDragStart}
                onDrop={onDrop}
                isDraggable={isDraggable}
                onNodeClick={onNodeClick}
                treeType={treeType}
                nodeButtons={nodeButtons}
                searchKeyword={searchKeyword}
                draggedNodeKey={draggedNodeKey}
                draggedNode={draggedNode}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export { FilteredTreeNode, TreeNodeComponent };
