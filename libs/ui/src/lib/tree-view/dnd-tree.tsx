import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { EnhancedTreeNode, TreeNode, TreeProps, SelectEventPayload } from './type';
import { getNodeLevel } from './tree.service';
import { useTreeContext } from './tree.context';
import styles from './tree.module.css';
import { cn } from '@learnway/shared';
import { DndTreeNode } from './dnd-tree-node';
import { useDndTreeLogic } from './dnd-tree-hooks';
import { TreeSkeleton } from './tree-skeleton';

export const DndTreeView: React.FC<TreeProps> = ({
  treeId,
  data,
  onAction,
  expandTrigger,
  type,
  nodeButtons,
  searchKeyword,
  selectedNode: externalSelectedNode,
  initExpandedKeys = [],
  expandedKeys: externalExpandedKeys,
  onExpandedKeysChange,
  onSelectedNodeChange,
  onCustomNodeClick,
  clientTree,
  shouldDisableClick,
  selectedItems,
  sourceTreeId,
  maxDepth,
  isSelectableNode,
  customDropValidator,
  minDraggableLevel,
  moveIcon,
  isLoading = false,
  skeletonNodeCount = 5,
}) => {
  const [internalSelectedNode, setInternalSelectedNode] = useState<TreeNode | null>(null);
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(initExpandedKeys);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const selectedNode =
    externalSelectedNode !== undefined ? externalSelectedNode : internalSelectedNode;
  const expandedKeys = externalExpandedKeys || internalExpandedKeys;
  const treeContext = useTreeContext();

  // 커스텀 훅 사용
  const { treeData, currentDraggedNode, currentDraggedNodeKey } = useDndTreeLogic(
    treeId,
    data,
    type,
    clientTree,
    isSearching,
    searchKeyword,
    onAction,
  );

  // 전역 드래그 상태 확인
  const isGlobalDragging = treeContext?.dragState?.isDragging || false;

  // 확장된 키를 안전하게 업데이트하는 함수
  const updateExpandedKeys = useCallback(
    (newKeys: string[]) => {
      setInternalExpandedKeys(newKeys);
      if (onExpandedKeysChange) {
        onExpandedKeysChange(newKeys);
      }
    },
    [onExpandedKeysChange],
  );

  // 검색 관련 처리
  const lastSearchKeyword = useRef(searchKeyword);
  const isInitialSearch = useRef(true);

  useEffect(() => {
    if (lastSearchKeyword.current === searchKeyword && !isInitialSearch.current) {
      return;
    }

    isInitialSearch.current = false;
    lastSearchKeyword.current = searchKeyword;

    if (!searchKeyword) {
      if (isSearching) {
        setIsSearching(false);
      }
      return;
    }

    setIsSearching(true);

    if (searchKeyword) {
      const newExpandedKeys = new Set<string>(expandedKeys);
      const collectVisibleNodePaths = (nodes: EnhancedTreeNode[], parentPath: string[] = []) => {
        for (const node of nodes) {
          const currentPath = [...parentPath, node.key];
          if (node._visible) {
            if (node.title && node.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
              parentPath.forEach((key) => newExpandedKeys.add(key));
            }
            if (node.children && node.children.length > 0) {
              collectVisibleNodePaths(node.children, currentPath);
              if (node.children.some((child) => child._visible)) {
                newExpandedKeys.add(node.key);
              }
            }
          }
        }
      };

      collectVisibleNodePaths(treeData);
      const expandedKeysArray = [...newExpandedKeys];
      setInternalExpandedKeys(expandedKeysArray);
      if (onExpandedKeysChange) {
        onExpandedKeysChange(expandedKeysArray);
      }
    }
  }, [searchKeyword, treeData, expandedKeys, isSearching, onExpandedKeysChange]);

  // 모든 노드 키 가져오기
  const getAllNodeKeys = useCallback((nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllNodeKeys(node.children));
      }
      return keys;
    }, []);
  }, []);

  // 확장 트리거 처리
  useEffect(() => {
    if (expandTrigger !== undefined && !isSearching) {
      const newExpandedKeys = expandTrigger ? getAllNodeKeys(treeData) : [];
      updateExpandedKeys(newExpandedKeys);
    }
  }, [expandTrigger, getAllNodeKeys, treeData, isSearching, updateExpandedKeys]);

  // 노드 클릭 처리
  const handleNodeClick = (node: TreeNode) => {
    if (node && node.key && isSelectableNode) {
      const nodeLevel = getNodeLevel(treeData, node.key);
      if (isSelectableNode && !isSelectableNode({ ...node, level: nodeLevel })) {
        return;
      }
    }
    setInternalSelectedNode(node);
    onSelectedNodeChange?.(node);
    if (onAction && node) {
      onAction({ type: 'NODE_SELECT', node: node } as SelectEventPayload);
    }
  };

  // 확장된 키 설정 함수
  const setExpandedKeys = useCallback(
    (keys: string[] | ((prevKeys: string[]) => string[])) => {
      const newKeys = typeof keys === 'function' ? keys(expandedKeys) : keys;
      updateExpandedKeys(newKeys);
    },
    [expandedKeys, updateExpandedKeys],
  );

  // 검색 결과 존재 여부
  const hasVisibleNodes = useMemo(() => {
    if (!searchKeyword) return true;
    return treeData.some((node) => node._visible);
  }, [treeData, searchKeyword]);

  // 트리 하단 글로벌 드롭 존 설정
  const { setNodeRef: setBottomDropRef, isOver: isOverBottom } = useDroppable({
    id: `${treeId}-drop-bottom`,
    data: {
      id: 'tree-bottom',
      treeId,
      position: 'BOTTOM',
      isGlobalDropZone: true,
    },
  });

  // 로딩 상태일 때 스켈레톤 표시
  if (isLoading) {
    return <TreeSkeleton nodeCount={skeletonNodeCount} showNestedItems={type !== 'SHUTTLE_LIST'} />;
  }

  return (
    <div className={cn(styles.tree_wrap, 'tree_wrap')}>
      <div className={styles.tree}>
        {treeData.length > 0 && hasVisibleNodes ? (
          treeData.map((node, index) => (
            <DndTreeNode
              key={node.key}
              node={node}
              level={0}
              expandedKeys={expandedKeys}
              setExpandedKeys={setExpandedKeys}
              selectedNode={selectedNode}
              onNodeClick={(node) => {
                node && handleNodeClick(node);
              }}
              nodeButtons={nodeButtons}
              searchKeyword={searchKeyword}
              onCustomNodeClick={onCustomNodeClick}
              shouldDisableClick={shouldDisableClick}
              selectedItems={selectedItems}
              sourceTreeId={sourceTreeId}
              treeId={treeId}
              treeType={type}
              isDraggable={type !== 'SHUTTLE_LIST'}
              maxDepth={maxDepth}
              customDropValidator={customDropValidator}
              draggedNode={currentDraggedNode}
              draggedNodeKey={currentDraggedNodeKey}
              minDraggableLevel={minDraggableLevel}
              moveIcon={moveIcon}
              isFirstSibling={index === 0}
            />
          ))
        ) : (
          <div>
            {searchKeyword
              ? `검색 결과가 없습니다: "${searchKeyword}"`
              : '트리에 노드가 없습니다. 노드를 추가해주세요.'}
          </div>
        )}

        {/* 트리 하단 글로벌 드롭 존 */}
        {(isGlobalDragging || currentDraggedNode) &&
          (type !== 'SAME_LEVEL_ONLY' ||
            (currentDraggedNode &&
              (currentDraggedNode.level === 1 || currentDraggedNode.depth === 1))) && (
            <div
              ref={setBottomDropRef}
              style={{
                height: isOverBottom ? '64px' : '32px',
                backgroundColor: isOverBottom ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                borderRadius: '6px',
                margin: '8px 0',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                border: isOverBottom ? '2px dashed #2196f3' : '2px dashed transparent',
              }}
            >
              {isOverBottom && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '12px',
                    color: '#2196f3',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>루트의 마지막 자식으로 추가</span>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};
