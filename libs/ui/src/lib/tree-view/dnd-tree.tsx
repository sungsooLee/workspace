import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  useDraggable,
  useDroppable,
  UniqueIdentifier,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragMoveEvent,
} from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import {
  EnhancedTreeNode,
  TreeNode,
  TreeProps,
  NodeMovePositionType,
  DropInfo,
  MoveEventPayload,
  CopyEventPayload,
  SelectEventPayload,
} from './type';
import {
  calculateTargetIndex,
  findNodeByKey,
  findNodePath,
  findRootNode,
  getNodeLevel,
  getNodeMaxDepth,
  insertNodeAtPosition,
  isValidDrop,
  removeNodeByKey,
} from './tree.service';
import { useTreeContext } from './tree.context';
import styles from './tree.module.css'; // Tree module CSS
import {
  IcoBoxMinus,
  IcoBoxPlus,
  IcoFile01,
  IcoFolder,
  IcoFolderOpen,
  IcoHome03,
  IcoMenu01,
  IcoMove01,
} from '@learnway/icons';
import { cn } from '@learnway/shared';

interface DragData {
  id: string;
  node: TreeNode;
  level: number;
}

interface DropZoneData {
  id: string;
  node: TreeNode;
  level: number;
  position: NodeMovePositionType;
}

interface DndTreeNodeProps {
  node: EnhancedTreeNode;
  level: number;
  expandedKeys: string[];
  setExpandedKeys: (keys: string[] | ((prev: string[]) => string[])) => void;
  selectedNode?: TreeNode | null;
  onNodeClick?: (node: TreeNode | null) => void;
  nodeButtons?: (node: TreeNode, level: number) => React.ReactNode;
  searchKeyword?: string;
  onCustomNodeClick?: (node: TreeNode) => void;
  shouldDisableClick?: (node: TreeNode, level: number) => boolean;
  selectedItems?: string[];
  sourceTreeId?: string;
  treeId: string;
  treeType?: string;
  isDraggable: boolean;
  maxDepth?: number;
  customDropValidator?: (params: any) => boolean;
  draggedNode?: TreeNode | null; // 현재 드래그 중인 노드 추가
  draggedNodeKey?: string | null; // 현재 드래그 중인 노드 키 추가
}

const DndTreeNode: React.FC<DndTreeNodeProps> = ({
  node,
  level,
  expandedKeys,
  setExpandedKeys,
  selectedNode,
  onNodeClick,
  nodeButtons,
  searchKeyword,
  onCustomNodeClick,
  shouldDisableClick,
  selectedItems,
  sourceTreeId,
  treeId,
  treeType,
  isDraggable,
  maxDepth,
  customDropValidator,
  draggedNode,
  draggedNodeKey,
}) => {
  const [dropPosition, setDropPosition] = useState<NodeMovePositionType | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedKeys.includes(node.key);
  const isNodeSelected = selectedItems?.includes(node.key) || false;
  const isTreeToTreeMode = treeType === 'TREE_TO_TREE';
  const isSourceTree = sourceTreeId ? treeId === sourceTreeId : false;
  const isDragDisabled = isTreeToTreeMode && isNodeSelected && isSourceTree;
  const shouldShowSelection = isTreeToTreeMode && isNodeSelected && isSourceTree;
  const isDragAndDropMode =
    treeType === 'DEFAULT' ||
    treeType === 'DRAG_DROP' ||
    treeType === 'SAME_LEVEL_ONLY' ||
    treeType === 'SAME_PARENT_ONLY' ||
    treeType === 'TREE_TO_TREE';
  // 드래그 설정 - 마우스 위치에서 시작하도록 개선
  const {
    attributes: dragAttributes,
    listeners: dragListeners,
    setNodeRef: setDragNodeRef,
    isDragging,
  } = useDraggable({
    id: `drag-${node.key}`,
    data: {
      id: node.key,
      node,
      level,
    } as DragData,
    disabled: !isDraggable || node.constraints?.drag === false,
  });

  const isValidDropPosition = useCallback(() => {
    if (!draggedNode || !dropPosition) return true;

    // 레벨 0 노드는 INSIDE만 허용
    if (level === 0 && dropPosition !== 'INSIDE') {
      return false;
    }

    // 트리 타입에 따른 유효성 검사
    if (treeType === 'SAME_LEVEL_ONLY') {
      const draggedLevel = draggedNode.level || 0;

      // BEFORE/AFTER는 같은 레벨이어야 함
      if ((dropPosition === 'BEFORE' || dropPosition === 'AFTER') && draggedLevel !== level) {
        return false;
      }
      // INSIDE는 부모-자식 관계가 맞아야 함
      if (dropPosition === 'INSIDE' && draggedLevel !== level + 1) {
        return false;
      }
    }

    if (treeType === 'SAME_PARENT_ONLY') {
      const sourceParentKey = draggedNode.parentKey;

      // INSIDE는 현재 노드가 원본 부모여야 함
      if (dropPosition === 'INSIDE' && node.key !== sourceParentKey) {
        return false;
      }
      // BEFORE/AFTER는 타겟과 같은 부모를 가져야 함
      if (
        (dropPosition === 'BEFORE' || dropPosition === 'AFTER') &&
        sourceParentKey !== node.parentKey
      ) {
        return false;
      }
    }

    // MaxDepth 검증 추가
    if (maxDepth !== undefined) {
      // 드래그하는 노드의 최대 깊이 계산
      const draggedNodeMaxDepth = getNodeMaxDepth(draggedNode);
      const targetNodeLevel = level;
      let finalLevel: number;
      if (dropPosition === 'INSIDE') {
        finalLevel = targetNodeLevel + 1;
      } else {
        finalLevel = targetNodeLevel;
      }
      if (finalLevel + draggedNodeMaxDepth - 1 > maxDepth) {
        return false;
      }
    }
    if (customDropValidator) {
      const isCustomValid = customDropValidator({
        sourceNode: draggedNode,
        targetNode: node,
        dropPosition,
        level,
      });

      if (!isCustomValid) {
        return false;
      }
    }

    return true;
  }, [dropPosition, draggedNode, level, treeType, node, customDropValidator, maxDepth]);

  // 현재 노드가 유효한 드롭 대상인지 확인 (드래그 중일 때)
  const isValidDropTarget = useCallback(() => {
    if (!draggedNode) return true; // 드래그 중이 아니면 항상 유효

    // 자기 자신으로는 드롭할 수 없음
    if (draggedNode.key === node.key) {
      return false;
    }

    // 자식 노드로는 드롭할 수 없음 (순환 참조 방지)
    const isDescendant = (parentNode: TreeNode, childKey: string): boolean => {
      if (!parentNode.children) return false;
      return parentNode.children.some(
        (child) => child.key === childKey || isDescendant(child, childKey),
      );
    };

    if (isDescendant(draggedNode, node.key)) {
      return false;
    }

    // 제약 조건 확인
    if (node.constraints?.drop === false) {
      return false;
    }

    // 트리 타입에 따른 유효성 검사 추가
    if (treeType === 'SAME_LEVEL_ONLY') {
      const draggedLevel = draggedNode.depth || 0;

      // SAME_LEVEL_ONLY에서는 같은 레벨끼리만 이동 가능하거나
      // 드래그된 노드가 한 레벨 아래로 들어갈 수 있음 (INSIDE)
      const canDropInside = draggedLevel === level + 1;
      const canDropSameLevel = draggedLevel === level;
      if (!canDropSameLevel) {
        return false;
      }
    }

    if (treeType === 'SAME_PARENT_ONLY') {
      const sourceParentKey = draggedNode.parentKey || draggedNode.parentId;

      // 1. 현재 노드가 드래그된 노드의 원래 부모인 경우 (INSIDE 드롭 가능)
      const canDropInside = node.key === sourceParentKey;
      if (!canDropInside) {
        return false;
      }
    }

    // MaxDepth 검증
    if (maxDepth !== undefined) {
      const draggedNodeMaxDepth = getNodeMaxDepth(draggedNode);
      // INSIDE 드롭을 가정한 레벨 계산
      const finalLevel = level + 1;
      if (finalLevel + draggedNodeMaxDepth - 1 > maxDepth) {
        return false;
      }
    }

    // 커스텀 검증 로직이 있다면 실행
    if (customDropValidator) {
      // INSIDE 위치로 가정하여 검증 (가장 일반적인 케이스)
      const isValidInside = customDropValidator({
        sourceNode: draggedNode,
        targetNode: node,
        dropPosition: 'INSIDE',
        level,
      });

      // 추가로 BEFORE/AFTER도 검증 (보다 엄격한 검증)
      const isValidBefore = customDropValidator({
        sourceNode: draggedNode,
        targetNode: node,
        dropPosition: 'BEFORE',
        level,
      });

      const isValidAfter = customDropValidator({
        sourceNode: draggedNode,
        targetNode: node,
        dropPosition: 'AFTER',
        level,
      });

      // 하나라도 유효하면 유효한 드롭 대상으로 간주
      if (!isValidInside && !isValidBefore && !isValidAfter) {
        return false;
      }
    }

    return true;
  }, [draggedNode, node, customDropValidator, level, treeType, maxDepth]);

  const nodeStyle = useMemo(() => {
    const styles = [];

    // 배경 스타일
    if (dropPosition === 'INSIDE') {
      styles.push('bg-[var(--gray1)]');
    }

    // 드래그 중 스타일 (현재 드래그되는 노드)
    if (isDragging) {
      styles.push('opacity-50 bg-[var(--gray1)]');
    }

    // 선택 스타일
    if (selectedNode && selectedNode.key === node.key) {
      styles.push('bg-[var(--secondary6)]');
    }
    if (treeType === 'SHUTTLE_LIST' && isNodeSelected) {
      styles.push('bg-[var(--secondary6)]');
    }
    // TREE_TO_TREE 모드에서 선택된 노드 스타일
    if (shouldShowSelection) {
      styles.push('bg-[var(--secondary6)]');
    }

    // 드롭 위치 스타일
    if (dropPosition === 'INSIDE') {
      styles.push(isValidDropPosition() ? 'bg-blue-50' : 'bg-red-50');
    }

    // 제약 조건 스타일
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
    }

    // 드래그 중일 때 유효하지 않은 드롭 대상 스타일
    if (draggedNode && !isValidDropTarget()) {
      styles.push('opacity-50 cursor-not-allowed');
      // 드래그 중이고 유효하지 않은 대상이면 배경을 빨간색으로
      if (!isValidDropTarget()) {
        styles.push('bg-red-50');
      }
    }

    // 검색 하이라이트
    if (
      searchKeyword &&
      node.title &&
      node.title.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      styles.push('bg-yellow-50');
    }

    return styles.join(' ');
  }, [
    dropPosition,
    isDragging,
    selectedNode,
    node.key,
    node.constraints,
    searchKeyword,
    node.title,
    isTreeToTreeMode,
    isNodeSelected,
    shouldShowSelection,
    isValidDropPosition,
    draggedNode,
    isValidDropTarget,
    treeType,
  ]);

  // 드롭 영역 설정 (BEFORE) - 모든 depth에서 허용
  const { setNodeRef: setDropBeforeRef, isOver: isOverBefore } = useDroppable({
    id: `drop-before-${node.key}`,
    data: {
      id: node.key,
      node,
      level,
      position: 'BEFORE',
    } as DropZoneData,
    disabled: node.constraints?.drop === false,
  });

  // 드롭 영역 설정 (AFTER) - 모든 depth에서 허용
  const { setNodeRef: setDropAfterRef, isOver: isOverAfter } = useDroppable({
    id: `drop-after-${node.key}`,
    data: {
      id: node.key,
      node,
      level,
      position: 'AFTER',
    } as DropZoneData,
    disabled: node.constraints?.drop === false,
  });

  // 드롭 영역 설정 (INSIDE) - 하위 노드로 이동
  const { setNodeRef: setDropInsideRef, isOver: isOverInside } = useDroppable({
    id: `drop-inside-${node.key}`,
    data: {
      id: node.key,
      node,
      level,
      position: 'INSIDE',
    } as DropZoneData,
    disabled: node.constraints?.drop === false,
  });

  // 접기/펴기 토글
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedKeys((prev) =>
      isExpanded ? prev.filter((k) => k !== node.key) : [...prev, node.key],
    );
  };

  // 노드 클릭
  const handleClick = () => {
    if (node && onNodeClick) onNodeClick(node);
    if (node === selectedNode && onNodeClick) onNodeClick(null);
    if (onCustomNodeClick) {
      onCustomNodeClick({ ...node, level });
    }
  };

  // 검색어 하이라이팅
  const highlightMatch = (text: string) => {
    if (!searchKeyword) return text;

    const regex = new RegExp(`(${searchKeyword})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) => {
          const isMatch = part.toLowerCase() === searchKeyword.toLowerCase();
          return isMatch ? (
            <span key={i} style={{ backgroundColor: 'yellow' }}>
              {part}
            </span>
          ) : (
            part
          );
        })}
      </>
    );
  };

  // 노드가 숨김 상태면 렌더링하지 않음
  if (node._visible === false) {
    return null;
  }

  const renderDragIcon = () => {
    if (level < 1) return null;

    const dragIconStyle = isDragDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-grab';

    return (
      <span
        className={`flex items-center justify-center text-5xl transition-opacity ${dragIconStyle}`}
        draggable={!isDragDisabled}
        {...dragAttributes}
        {...dragListeners}
        // onDragStart={isDragDisabled ? (e) => e.preventDefault() : handleDragStart}
      >
        {isTreeToTreeMode ? (
          <IcoMove01
            width={24}
            height={24}
            fill={isDragDisabled ? '#E3E9EF' : '#A9AFB8'}
            stroke={isDragDisabled ? '#E3E9EF' : '#A9AFB8'}
            className={styles.icon_drag}
          />
        ) : (
          <IcoMenu01
            width={24}
            height={24}
            fill={isDragDisabled ? '#E3E9EF' : '#A9AFB8'}
            stroke={isDragDisabled ? '#E3E9EF' : '#A9AFB8'}
            className={styles.icon_drag}
          />
        )}
      </span>
    );
  };

  return (
    <div style={{ position: 'relative' }} className={styles.tree_item}>
      {/* BEFORE 드롭 영역 - 더 큰 영역으로 개선 */}
      <div
        ref={setDropBeforeRef}
        style={{
          height: '10px',
          backgroundColor: isOverBefore ? 'rgba(33, 150, 243, 0.2)' : 'transparent',
          marginBottom: '0px',
          marginLeft: `${level * 20}px`,
          borderRadius: '2px',
          transition: 'all 0.2s ease',
          width: '100%',
          position: 'absolute',
          left: '0',
          top: '0',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* 드롭 라인 표시 */}
        {isOverBefore && (
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '0',
              right: '0',
              height: '2px',
              backgroundColor: '#2196f3',
              borderRadius: '1px',
            }}
          />
        )}
      </div>

      {/* 노드 콘텐츠 */}
      <div
        ref={setDragNodeRef}
        className={cn(nodeStyle, styles.tree_inner)}
        style={{
          paddingLeft: `${level * 28}px`,
          display: 'flex',
          alignItems: 'center',
          // minHeight: '36px',
          opacity: isDragging ? 0.5 : 1,
          cursor: isDraggable ? 'grab' : 'default',
          border: isOverInside ? '2px dashed #2196f3' : '1px solid transparent',
          // borderRadius: '4px',
          transition: 'all 0.2s ease',
          // position: 'relative',
          // zIndex: 5,
          // margin: '1px 0',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* 드롭 인사이드 영역 */}
        <div
          ref={setDropInsideRef}
          style={{ width: '100%', display: 'flex', alignItems: 'center' }}
        >
          {hasChildren && (
            <span
              className={cn(hasChildren ? styles.has_children : '', styles.tree_menu)}
              onClick={handleToggleExpand}
            >
              {level === 0 && hasChildren ? (
                <IcoHome03 stroke="#131C30" className={styles.icon_home} />
              ) : null}
              {level !== 0 && hasChildren ? (
                isExpanded ? (
                  <IcoBoxMinus className={styles.icon_minus} width={20} height={21} />
                ) : (
                  <IcoBoxPlus className={styles.icon_plus} />
                )
              ) : null}
            </span>
          )}
          {level !== 0 && (
            <span className={cn(styles.folder_wrap)}>
              {node && node?.apiNodeType === 'API' ? (
                <IcoFile01 width={'16'} height={'16'} stroke={'#131C30'} fill={'none'} />
              ) : isExpanded && node.children && node.children.length > 0 ? (
                <IcoFolderOpen stroke="#131C30" className={styles.icon_folder} />
              ) : (
                <IcoFolder stroke="#131C30" className={styles.icon_folder} />
              )}
            </span>
          )}
          {/* 노드 제목 */}
          <span
            className={cn(
              styles.node_title,
              onCustomNodeClick && level >= 1 && !shouldDisableClick?.(node, level)
                ? 'cursor-pointer underline'
                : 'cursor-default',
            )}
            style={{ flex: 1, userSelect: 'none' }}
          >
            {highlightMatch(node.title || '')}
          </span>

          {isDragAndDropMode && (
            <div className={styles.drag_wrap}>
              {nodeButtons && (
                <div
                  className={`flex space-x-1 transition-opacity duration-150 ${isHovered || level === 0 ? 'opacity-100' : 'invisible opacity-0'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {nodeButtons(node, level)}
                </div>
              )}
              {renderDragIcon()}
            </div>
          )}

          {treeType === 'SHUTTLE_LIST' && (
            <div className={styles.btn_area}>
              {nodeButtons && (
                <div
                  className={`duration-150} mr-2 flex space-x-1 transition-opacity`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {nodeButtons(node, level)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* AFTER 드롭 영역 - 더 큰 영역으로 개선 */}
      <div
        ref={setDropAfterRef}
        style={{
          height: '10px',
          backgroundColor: isOverAfter ? 'rgba(33, 150, 243, 0.2)' : 'transparent',
          marginTop: '0px',
          marginLeft: `${level * 20}px`,
          borderRadius: '2px',
          transition: 'all 0.2s ease',
          width: '100%',
          position: 'absolute',
          left: '0',
          bottom: '0',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* 드롭 라인 표시 */}
        {isOverAfter && (
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '0',
              right: '0',
              height: '2px',
              backgroundColor: '#2196f3',
              borderRadius: '1px',
            }}
          />
        )}
      </div>

      {/* 자식 노드들 */}
      {hasChildren && isExpanded && (
        <div className={styles.tree_children}>
          {node.children!.map((child) => (
            <DndTreeNode
              key={child.key}
              node={child}
              level={level + 1}
              expandedKeys={expandedKeys}
              setExpandedKeys={setExpandedKeys}
              selectedNode={selectedNode}
              onNodeClick={onNodeClick}
              nodeButtons={nodeButtons}
              searchKeyword={searchKeyword}
              onCustomNodeClick={onCustomNodeClick}
              shouldDisableClick={shouldDisableClick}
              selectedItems={selectedItems}
              sourceTreeId={sourceTreeId}
              treeId={treeId}
              treeType={treeType}
              isDraggable={isDraggable}
              maxDepth={maxDepth}
              customDropValidator={customDropValidator}
              draggedNode={draggedNode}
              draggedNodeKey={draggedNodeKey}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const updateNodeVisibility = (nodes: EnhancedTreeNode[], keyword: string): boolean => {
  let hasVisibleNodes = false;

  if (!keyword) {
    for (const node of nodes) {
      node._visible = true;
      if (node.children && node.children.length > 0) {
        updateNodeVisibility(node.children, keyword);
      }
    }
    return true;
  }

  for (const node of nodes) {
    const nodeMatch = node.title && node.title.toLowerCase().includes(keyword.toLowerCase());
    let childrenMatch = false;
    if (node.children && node.children.length > 0) {
      childrenMatch = updateNodeVisibility(node.children, keyword);
    }
    node._visible = nodeMatch || childrenMatch;
    hasVisibleNodes = hasVisibleNodes || node._visible;
  }

  return hasVisibleNodes;
};

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
}) => {
  const [initialData, setInitialData] = useState<EnhancedTreeNode[]>(
    JSON.parse(JSON.stringify(data)),
  );
  const [treeData, setTreeData] = useState<EnhancedTreeNode[]>(JSON.parse(JSON.stringify(data)));
  const [internalSelectedNode, setInternalSelectedNode] = useState<TreeNode | null>(null);
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(initExpandedKeys);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);
  const [draggedNodeKey, setDraggedNodeKey] = useState<string | null>(null);

  const selectedNode =
    externalSelectedNode !== undefined ? externalSelectedNode : internalSelectedNode;
  const expandedKeys = externalExpandedKeys || internalExpandedKeys;
  const treeContext = useTreeContext();

  // DnD 센서 설정 - 더 빠른 드래그 시작을 위해 거리 조건 줄임
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3, // 마우스 이동 거리를 줄여서 더 빠른 드래그 시작
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150, // 터치 딜레이 줄임
      tolerance: 3, // 터치 허용 거리 줄임
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // 외부 데이터 변경 감지
  useEffect(() => {
    setInitialData(JSON.parse(JSON.stringify(data)));
  }, [data]);

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
        const currentTreeData = JSON.parse(JSON.stringify(initialData));
        updateNodeVisibility(currentTreeData, '');
        setTreeData(currentTreeData);
        setIsSearching(false);
      }
      return;
    }

    setIsSearching(true);
    const newTreeData = JSON.parse(JSON.stringify(initialData));
    const hasResults = updateNodeVisibility(newTreeData, searchKeyword);
    setTreeData(newTreeData);

    if (hasResults) {
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

      collectVisibleNodePaths(newTreeData);
      const expandedKeysArray = [...newExpandedKeys];
      setInternalExpandedKeys(expandedKeysArray);
      if (onExpandedKeysChange) {
        onExpandedKeysChange(expandedKeysArray);
      }
    }
  }, [searchKeyword, initialData, expandedKeys]);

  useEffect(() => {
    const refreshedData = JSON.parse(JSON.stringify(initialData));
    if (isSearching && searchKeyword) {
      updateNodeVisibility(refreshedData, searchKeyword);
    } else {
      updateNodeVisibility(refreshedData, '');
    }
    setTreeData(refreshedData);
  }, [initialData, isSearching, searchKeyword]);

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

  // 드래그 시작
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const dragData = active.data.current as DragData;

    setActiveId(active.id);
    setDraggedNode(dragData.node);
    setDraggedNodeKey(dragData.node.key);

    if (treeContext && treeContext.setDragState) {
      treeContext.setDragState({
        node: JSON.parse(JSON.stringify(dragData.node)),
        sourceTreeId: treeId,
        isDragging: true,
      });
    }
  };

  // 드래그 종료
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setDraggedNode(null);
    setDraggedNodeKey(null);

    if (!over) {
      if (treeContext && treeContext.resetDragState) {
        treeContext.resetDragState();
      }
      return;
    }

    const dragData = active.data.current as DragData;
    const dropData = over.data.current as DropZoneData;

    if (!dragData || !dropData) {
      if (treeContext && treeContext.resetDragState) {
        treeContext.resetDragState();
      }
      return;
    }

    const dropInfo: DropInfo = {
      sourceNode: dragData.node,
      targetNode: dropData.node,
      dropPosition: dropData.position,
    };

    handleDrop(dropInfo);
  };

  // 드롭 처리
  const handleDrop = async (dropInfo: DropInfo) => {
    const { targetNode, dropPosition, sourceNode } = dropInfo;

    if (!sourceNode || !targetNode) return;

    // 유효성 검증
    const sourceTreeId = treeContext?.dragState?.sourceTreeId || null;
    const actionType = sourceTreeId === treeId ? 'NODE_MOVE' : 'NODE_COPY';

    if (
      actionType === 'NODE_MOVE' &&
      !isValidDrop(sourceNode.key, targetNode.key, treeData, dropPosition, type)
    ) {
      if (treeContext && treeContext.resetDragState) {
        treeContext.resetDragState();
      }
      return;
    }

    // 루트 레벨로의 이동 제한
    if (getNodeLevel(treeData, targetNode.key) === 0 && dropPosition !== 'INSIDE') {
      console.warn('Cannot drop next to root level node');
      if (treeContext && treeContext.resetDragState) {
        treeContext.resetDragState();
      }
      return;
    }

    // 클라이언트 트리 업데이트
    if (clientTree) {
      let newTreeData = [...treeData];

      if (actionType === 'NODE_MOVE') {
        newTreeData = removeNodeByKey(newTreeData, sourceNode.key);
      }

      newTreeData = insertNodeAtPosition(newTreeData, targetNode.key, sourceNode, dropPosition);

      if (isSearching && searchKeyword) {
        updateNodeVisibility(newTreeData, searchKeyword);
      }

      setTreeData(newTreeData);

      const updatedInitialData = JSON.parse(JSON.stringify(newTreeData));
      const fullData = JSON.parse(JSON.stringify(updatedInitialData));
      updateNodeVisibility(fullData, '');
      setInitialData(fullData);
    }

    // 액션 콜백 호출
    if (onAction) {
      const targetIndex = calculateTargetIndex(treeData, targetNode, dropPosition).index;

      if (actionType === 'NODE_MOVE') {
        const movePayload: MoveEventPayload = {
          type: 'NODE_MOVE',
          sourceNode: sourceNode,
          targetNode: targetNode,
          position: dropPosition,
          treeId,
          targetIndex,
        };
        onAction(movePayload);
      } else {
        const copyPayload: CopyEventPayload = {
          type: 'NODE_COPY',
          sourceNode: sourceNode,
          targetNode: targetNode,
          position: dropPosition,
          treeId,
          targetIndex,
          sourceTreeId: sourceTreeId || null,
        };
        onAction(copyPayload);
      }
    }

    // 드래그 상태 초기화
    setTimeout(() => {
      if (treeContext && treeContext.resetDragState) {
        treeContext.resetDragState();
      }
    }, 100);
  };

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

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[snapCenterToCursor]}
    >
      <div className={cn(styles.tree_wrap, 'tree_wrap')}>
        <div className={styles.tree}>
          {treeData.length > 0 && hasVisibleNodes ? (
            treeData.map((node) => (
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
                draggedNode={draggedNode}
                draggedNodeKey={draggedNodeKey}
              />
            ))
          ) : (
            <div>
              {searchKeyword
                ? `검색 결과가 없습니다: "${searchKeyword}"`
                : '트리에 노드가 없습니다. 노드를 추가해주세요.'}
            </div>
          )}
        </div>
      </div>
      {/* 드래그 오버레이 - 마우스 위치에서 시작 */}
      <DragOverlay>
        {activeId && draggedNode ? (
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: 'white',
              border: '2px solid #2196f3',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333',
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'grabbing',
            }}
          >
            {draggedNode.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
