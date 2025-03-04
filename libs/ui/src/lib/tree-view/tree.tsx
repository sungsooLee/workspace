import React, { useCallback, useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import {
  DropInfo,
  NodeMovePositionType,
  SelectEventPayload,
  TreeNode,
  TreeNodeComponentProps,
  TreeProps,
} from './type';
import { findNodePath, insertNodeAtPosition, isValidDrop, removeNodeByKey } from './tree.service';
import { useTreeContext } from './tree.context';

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
}: TreeNodeComponentProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedKeys.includes(node.key);
  const isAdvancedMode = treeType === 'advanced';

  // 드랍 위치(before, inside, after)
  const [dropPosition, setDropPosition] = useState<NodeMovePositionType | null>(null);
  // 드랍 위치에 따른 스타일링
  const dropIndicatorStyle = {
    BEFORE: 'absolute w-full h-0.5 bg-blue-400 -top-[1px] z-10 pointer-events-none',
    AFTER: 'absolute w-full h-0.5 bg-blue-400 bottom-[-1px] z-10 pointer-events-none',
    INSIDE: 'absolute inset-0 bg-blue-100 opacity-50 pointer-events-none rounded',
  };

  const isActuallyDraggable = isDraggable && node.constraints?.drag !== false;

  const getNodeStyle = () => {
    const styles = [
      `flex items-center py-1 rounded group min-h-[40px]
        ${dropPosition === 'INSIDE' ? 'bg-blue-200' : ''}`,
    ];
    if (selectedNode && selectedNode.key === node.key) {
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
  // 드래그 가능하면 현재 노드 상위 컴포넌트로 콜백
  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    if (!isDraggable || node.constraints?.drag === false) return;
    onDragStart?.(node);
  };

  // 노드 위에 드래그 된 노드가 겹칠 때 계산.
  const handleDragOver = (e: React.DragEvent) => {
    if (node.constraints?.drop === false) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 3;

    const newPosition = y < threshold ? 'BEFORE' : y > rect.height - threshold ? 'AFTER' : 'INSIDE';

    if (dropPosition !== newPosition) {
      setDropPosition(newPosition);
    }
  };

  // 노드 위에 드래그 된 노드가 벗어날 때
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDropPosition(null);
  };

  // 드랍되었을때 상위 컴포넌트로 콜백
  const handleDrop = (e: React.DragEvent) => {
    if (node.constraints?.drop === false) return;

    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('bg-blue-100');

    onDrop({
      targetNode: node,
      dropPosition: dropPosition || 'INSIDE',
    });
    setDropPosition(null);
  };

  // 접기, 펴기 토글.
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedKeys((prev) =>
      isExpanded ? prev.filter((k) => k !== node.key) : [...prev, node.key],
    );
  };

  const handleClick = () => {
    if (node && onNodeClick) onNodeClick(node);
    if (node === selectedNode && onNodeClick) onNodeClick(null);
  };

  // 햄버거 버튼으로 드래그 시작 (advanced 모드)
  const handleHamburgerDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    if (!isDraggable || node.constraints?.drag === false) return;
    onDragStart?.(node);
  };

  return (
    <div className="relative select-none">
      <div
        className={getNodeStyle()}
        style={{
          paddingLeft: `${level * 20}px`,
          cursor: node.constraints?.drag === false ? 'not-allowed' : 'grab',
        }}
        draggable={isAdvancedMode ? false : isActuallyDraggable}
        onDragStart={isAdvancedMode ? undefined : handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}>
        {dropPosition && <div className={dropIndicatorStyle[dropPosition]} />}
        <span
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={handleToggleExpand}>
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            )
          ) : null}
        </span>
        <span className="mr-1 flex h-6 w-6 items-center justify-center">
          {hasChildren ? (
            <Folder className="h-4 w-4 text-blue-500" />
          ) : (
            <File className="h-4 w-4 text-gray-500" />
          )}
        </span>
        <span className="flex-grow text-sm">
          {node.title} / key = {node.key} / Depth : {level}
        </span>

        {treeType === 'advanced' && (
          <div className="relative flex items-center">
            {nodeButtons && (
              <div className="mr-2 flex space-x-1" onClick={(e) => e.stopPropagation()}>
                {nodeButtons(node, level)}
              </div>
            )}
            <span
              className={`ml-2 flex items-center justify-center text-5xl transition-opacity ${isAdvancedMode && isActuallyDraggable ? 'cursor-grab' : 'cursor-pointer'}`}
              draggable={isAdvancedMode && isActuallyDraggable}
              onDragStart={isAdvancedMode ? handleHamburgerDragStart : undefined}>
              ☰
            </span>
          </div>
        )}
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
                selectedNode={selectedNode}
                onDragStart={onDragStart}
                onDrop={onDrop}
                isDraggable={isDraggable}
                onNodeClick={onNodeClick}
                treeType={treeType}
                nodeButtons={nodeButtons}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({ treeId, data, onAction, expandTrigger, type, nodeButtons }: TreeProps) => {
  const [treeData, setTreeData] = useState(data);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [internalDragState, setInternalDragState] = useState<{
    node: TreeNode | null;
    sourceTreeId: string | null;
  }>({
    node: null,
    sourceTreeId: null,
  });

  const treeContext = useTreeContext();

  const dragState = treeContext ? treeContext.dragState : internalDragState;
  const setDragState = treeContext ? treeContext.setDragState : setInternalDragState;

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  const getAllNodeKeys = useCallback((nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllNodeKeys(node.children));
      }
      return keys;
    }, []);
  }, []);

  useEffect(() => {
    if (expandTrigger !== undefined) {
      setExpandedKeys(expandTrigger ? getAllNodeKeys(treeData) : []);
    }
  }, [expandTrigger]);

  // 드래그&드랍 노드를 드랍하였을때
  const handleDrop = (dropInfo: DropInfo) => {
    if (!dragState.node) return;

    const { targetNode, dropPosition } = dropInfo;
    // 같은 트리면 이동, 다른 트리면 복사
    const actionType = dragState.sourceTreeId === treeId ? 'NODE_MOVE' : 'NODE_COPY';

    if (targetNode && !isValidDrop(dragState.node.key, targetNode.key, treeData)) return;
    if (actionType === 'NODE_COPY' && findNodePath(treeData, dragState.node.key)) {
      alert('이미 트리에 해당 노드가 존재합니다.');
      return;
    }

    let newTreeData = [...treeData];
    if (actionType === 'NODE_MOVE') {
      newTreeData = removeNodeByKey(newTreeData, dragState.node.key);
    }

    if (targetNode) {
      newTreeData = insertNodeAtPosition(newTreeData, targetNode.key, dragState.node, dropPosition);
    } else {
      newTreeData = [...newTreeData, { ...dragState.node }];
    }

    setTreeData(newTreeData);

    onAction?.({
      type: actionType,
      sourceNode: dragState.node,
      targetNode: targetNode,
      position: dropPosition,
      treeId,
    });
  };

  const canDragNode = (node: TreeNode): boolean => {
    if (node.constraints?.drag === false) return false;
    return true;
  };

  const handleDragStart = (node: TreeNode) => {
    setDragState({ node: node, sourceTreeId: treeId });
  };

  const handleNodeClick = (node: TreeNode | null) => {
    setSelectedNode(node);
    if (onAction && node) onAction({ type: 'NODE_SELECT', node: node } as SelectEventPayload);
  };

  return (
    <div
      className="rounded-lg border bg-white p-4 shadow-sm"
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
        handleDrop({ targetNode: null, dropPosition: 'INSIDE' });
      }}>
      <div className="tree">
        {treeData.length > 0 ? (
          treeData.map((node) => (
            <TreeNodeComponent
              key={node.key}
              node={node}
              selectedNode={selectedNode}
              expandedKeys={expandedKeys}
              setExpandedKeys={setExpandedKeys}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              isDraggable={canDragNode(node)}
              onNodeClick={handleNodeClick}
              nodeButtons={nodeButtons}
              treeType={type}
            />
          ))
        ) : (
          <div className="py-4 text-center text-gray-500">
            트리에 노드가 없습니다. 노드를 추가해주세요.
          </div>
        )}
      </div>
    </div>
  );
};
export { TreeView };
