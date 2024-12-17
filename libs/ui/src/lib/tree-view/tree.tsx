import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';

import { DropInfo, TreeNode, TreeNodeComponentProps, TreeProps } from './type';
import { getTargetIndex, isValidDrop } from './tree.service';

const TreeNodeComponent = ({
  node,
  level = 0,
  expandedKeys,
  setExpandedKeys,
  selectedNodeKey,
  onDragStart,
  onDrop,
  isDraggable,
  onAction,
  treeId,
}: TreeNodeComponentProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedKeys.includes(node.key);

  const [dropPosition, setDropPosition] = useState<'before' | 'after' | 'inside' | null>(null);

  const dropIndicatorStyle = {
    before: 'absolute w-full h-0.5 bg-blue-400 -top-[1px] z-10 pointer-events-none',
    after: 'absolute w-full h-0.5 bg-blue-400 bottom-[-1px] z-10 pointer-events-none',
    inside: 'absolute inset-0 bg-blue-100 opacity-50 pointer-events-none rounded',
  };

  const isActuallyDraggable = isDraggable && node.constraints?.drag !== false;

  const getNodeStyle = () => {
    const styles = [
      `flex items-center py-1 px-2 rounded group
        ${dropPosition === 'inside' ? 'bg-blue-200' : ''}`,
    ];
    if (selectedNodeKey === node.key) {
      styles.push('bg-blue-50');
    }
    if (node.constraints?.drag === false) {
      styles.push('border-l-4 border-red-300');
    }
    if (node.constraints?.drop === false) {
      styles.push('border-l-4 border-yellow-300');
    }
    if (node.constraints?.drag === false && node.constraints?.drop === false) {
      styles.push('bg-gray-50');
    }
    if (node.constraints?.drag === false || node.constraints?.drop === false) {
      styles.push('opacity-75');
    } else {
      styles.push('hover:bg-gray-100');
    }
    return styles.join(' ');
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    if (!isDraggable || node.constraints?.drag === false) return;
    onDragStart?.(node);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (node.constraints?.drop === false) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 3;

    const newPosition = y < threshold ? 'before' : y > rect.height - threshold ? 'after' : 'inside';

    if (dropPosition !== newPosition) {
      setDropPosition(newPosition);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDropPosition(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (node.constraints?.drop === false) return;

    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('bg-blue-100');

    onDrop({
      targetNode: node,
      dropPosition: dropPosition || 'inside',
    });
    setDropPosition(null);
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedKeys((prev) =>
      isExpanded ? prev.filter((k) => k !== node.key) : [...prev, node.key],
    );
  };

  const handleClick = () => {
    if (onAction) {
      onAction({
        type: 'CLICK',
        payload: {
          node: node,
          treeId: treeId,
        },
      });
    }
  };

  return (
    <div className="relative select-none">
      <div
        className={getNodeStyle()}
        style={{
          paddingLeft: `${level * 20}px`,
          cursor: node.constraints?.drag === false ? 'not-allowed' : 'grab',
        }}
        draggable={isActuallyDraggable}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}>
        {dropPosition && <div className={dropIndicatorStyle[dropPosition]} />}
        <span
          className="w-6 h-6 flex items-center justify-center cursor-pointer"
          onClick={toggleExpand}>
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )
          ) : null}
        </span>
        <span className="w-6 h-6 flex items-center justify-center mr-1">
          {hasChildren ? (
            <Folder className="w-4 h-4 text-blue-500" />
          ) : (
            <File className="w-4 h-4 text-gray-500" />
          )}
        </span>
        <span className="text-sm flex-grow">{node.title}</span>
      </div>

      {hasChildren && isExpanded && (
        <div className="tree-children">
          {node.children &&
            node.children.map((child) => (
              <TreeNodeComponent
                key={child.key}
                node={child}
                level={level + 1}
                expandedKeys={expandedKeys}
                setExpandedKeys={setExpandedKeys}
                selectedNodeKey={selectedNodeKey}
                onDragStart={onDragStart}
                onDrop={onDrop}
                isDraggable={isDraggable}
                onAction={onAction}
                treeId={treeId}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({
  treeId,
  data,
  selectedKey,
  expandedKeys,
  setExpandedKeys,
  draggedNode,
  setDraggedNode,
  onAction,
}: TreeProps) => {
  const handleDrop = async (dropInfo: DropInfo) => {
    if (!draggedNode) return;
    const { targetNode, dropPosition } = dropInfo;

    if (!targetNode || draggedNode.node.key === targetNode.key) return;
    if (!isValidDrop(draggedNode.node.key, targetNode.key, data)) return;

    const targetIndex = targetNode
      ? getTargetIndex(data, targetNode.key, dropPosition)
      : data.length;

    if (onAction) {
      onAction({
        type: draggedNode.sourceTreeId === treeId ? 'MOVE' : 'COPY',
        payload: {
          sourceNode: draggedNode.node,
          targetNode,
          treeId,
          position: dropPosition,
          targetIndex,
          sourceTreeId: draggedNode.sourceTreeId,
          targetTreeId: treeId,
        },
      });
    }
    setDraggedNode(null);
  };

  const canDragNode = (node: TreeNode): boolean => {
    if (node.constraints?.drag === false) return false;
    return true;
  };

  const handleDragStart = (node: TreeNode) => {
    setDraggedNode({ node, sourceTreeId: treeId });
  };

  return (
    <div
      className="border rounded-lg p-4 bg-white shadow-sm"
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add('bg-blue-100');
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-blue-100');
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-blue-100');
        handleDrop({ targetNode: null, dropPosition: 'inside' });
      }}>
      <div className="tree">
        {data.map((node) => (
          <TreeNodeComponent
            key={node.key}
            node={node}
            selectedNodeKey={selectedKey}
            expandedKeys={expandedKeys}
            setExpandedKeys={setExpandedKeys}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            isDraggable={canDragNode(node)}
            onAction={onAction}
            treeId={treeId}
          />
        ))}
      </div>
    </div>
  );
};
export { TreeView };
