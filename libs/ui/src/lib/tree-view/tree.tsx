import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';

import { TreeNode, TreeNodeComponentProps, TreeViewProps } from './type';
import { addNodeToParent, findNodeByKey, isValidDrop, removeNodeByKey } from './tree.service';

const TreeNodeComponent = ({
  node,
  level = 0,
  expandedKeys,
  setExpandedKeys,
  selectedNodeKey,
  onDragStart,
  onDrop,
  onNodeClick,
  isDraggable,
}: TreeNodeComponentProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedKeys.includes(node.key);

  const isActuallyDraggable = isDraggable && node.constraints?.drag !== false;

  const getNodeStyle = () => {
    const styles = ['flex items-center py-1 px-2 rounded group'];

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
    if (isDraggable) {
      onDragStart(node);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (node.constraints?.drop === false) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('bg-blue-100');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('bg-blue-100');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('bg-blue-100');
    if (node.constraints?.drop === false) {
      return;
    }
    onDrop(node);
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedKeys((prev) =>
      isExpanded ? prev.filter((k) => k !== node.key) : [...prev, node.key],
    );
  };

  return (
    <div className="select-none">
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
          onNodeClick?.(node);
        }}>
        <div className="absolute right-2 flex gap-1"></div>
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
                onNodeClick={onNodeClick}
                isDraggable={isDraggable}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({
  data,
  selectedKey,
  onNodeClick,
  onDataChange,
  expandedKeys,
  setExpandedKeys,
}: TreeViewProps) => {
  const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);

  const handleDrop = (targetNode: TreeNode | null) => {
    if (!draggedNode) return;
    if (draggedNode.key === targetNode?.key) return;

    if (targetNode?.key && !isValidDrop(draggedNode.key, targetNode.key, data)) {
      return;
    }

    const newData = [...data];
    const updatedData = removeNodeByKey(newData, draggedNode.key);
    const finalData = targetNode
      ? addNodeToParent(updatedData, targetNode.key, draggedNode)
      : [...updatedData, draggedNode];

    onDataChange?.(finalData);
    setDraggedNode(null);
  };

  const canDragNode = (node: TreeNode): boolean => {
    if (node.constraints?.drag === false) return false;
    return true;
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
        handleDrop(null);
      }}>
      <div className="tree">
        {data.map((node) => (
          <TreeNodeComponent
            key={node.key}
            node={node}
            selectedNodeKey={selectedKey}
            expandedKeys={expandedKeys}
            setExpandedKeys={setExpandedKeys}
            onDragStart={setDraggedNode}
            onDrop={handleDrop}
            onNodeClick={onNodeClick}
            isDraggable={canDragNode(node)}
          />
        ))}
      </div>
    </div>
  );
};
export { TreeView };
