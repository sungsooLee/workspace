import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DragStartEvent, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
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
  treeId: string;
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
  const treeContext = useTreeContext();

  // 전역 드래그 상태 확인
  const globalDraggedNode = treeContext?.dragState?.node || null;
  const isGlobalDragging = treeContext?.dragState?.isDragging || false;
  const globalSourceTreeId = treeContext?.dragState?.sourceTreeId || null;

  // 현재 사용할 드래그된 노드 (props로 받은 것 또는 전역 상태)
  const effectiveDraggedNode = draggedNode || globalDraggedNode;
  const effectiveDraggedNodeKey = draggedNodeKey || globalDraggedNode?.key || null;

  // 다른 트리에서 드래그 중인지 확인
  const isDraggedFromOtherTree = isGlobalDragging && globalSourceTreeId !== treeId;

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
    id: `${treeId}-drag-${node.key}`,
    data: {
      id: node.key,
      node,
      level,
    } as DragData,
    disabled: !isDraggable || node.constraints?.drag === false,
  });

  const isValidDropPosition = useCallback(() => {
    if (!effectiveDraggedNode || !dropPosition) return true;

    // 레벨 0 노드는 INSIDE만 허용
    if (level === 0 && dropPosition !== 'INSIDE') {
      return false;
    }

    // 트리 타입에 따른 유효성 검사
    if (treeType === 'SAME_LEVEL_ONLY') {
      const draggedLevel = effectiveDraggedNode.level || effectiveDraggedNode.depth || 0;

      if (dropPosition === 'BEFORE' || dropPosition === 'AFTER') {
        // BEFORE/AFTER는 같은 레벨이어야 함
        if (draggedLevel !== level) {
          return false;
        }
      } else if (dropPosition === 'INSIDE') {
        // INSIDE는 드래그된 노드가 타겟보다 한 레벨 아래여야 함
        if (draggedLevel !== level + 1) {
          return false;
        }
      }
    }

    if (treeType === 'SAME_PARENT_ONLY') {
      const sourceParentKey = effectiveDraggedNode.parentKey || effectiveDraggedNode.parentId;
      const currentNodeParentKey = node.parentKey || node.parentId;

      if (dropPosition === 'INSIDE') {
        if (node.key !== sourceParentKey) {
          return false;
        }
      } else if (dropPosition === 'BEFORE' || dropPosition === 'AFTER') {
        // BEFORE/AFTER는 같은 부모를 가진 형제 노드들끼리만 가능
        if (sourceParentKey !== currentNodeParentKey) {
          return false;
        }
        // 추가: 같은 부모 노드 자체로는 BEFORE/AFTER 드롭 불가 (부모는 INSIDE만)
        if (node.key === sourceParentKey) {
          return false;
        }
      }
    }

    // MaxDepth 검증 추가
    if (maxDepth !== undefined) {
      // 드래그하는 노드의 최대 깊이 계산
      const draggedNodeMaxDepth = getNodeMaxDepth(effectiveDraggedNode);
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
        sourceNode: effectiveDraggedNode,
        targetNode: node,
        dropPosition,
        level,
      });

      if (!isCustomValid) {
        return false;
      }
    }

    return true;
  }, [dropPosition, effectiveDraggedNode, level, treeType, node, customDropValidator, maxDepth]);

  // 현재 노드가 유효한 드롭 대상인지 확인 (드래그 중일 때)
  const isValidDropTarget = useCallback(() => {
    if (!effectiveDraggedNode) return true; // 드래그 중이 아니면 항상 유효

    // 같은 트리에서 자기 자신으로는 드롭할 수 없음
    if (effectiveDraggedNode.key === node.key) {
      return false;
    }

    // 같은 트리에서 자식 노드로는 드롭할 수 없음 (순환 참조 방지)
    if (globalSourceTreeId === treeId) {
      const isDescendant = (parentNode: TreeNode, childKey: string): boolean => {
        if (!parentNode.children) return false;
        return parentNode.children.some(
          (child) => child.key === childKey || isDescendant(child, childKey),
        );
      };

      if (isDescendant(effectiveDraggedNode, node.key)) {
        return false;
      }
    }

    // 제약 조건 확인
    if (node.constraints?.drop === false) {
      return false;
    }

    // 트리 타입에 따른 유효성 검사 추가
    if (treeType === 'SAME_LEVEL_ONLY') {
      const draggedLevel = effectiveDraggedNode.level || effectiveDraggedNode.depth || 0;

      // SAME_LEVEL_ONLY 규칙:
      // 1. 드래그된 노드와 같은 레벨인 경우: BEFORE/AFTER 가능, INSIDE 불가
      // 2. 드래그된 노드보다 한 레벨 위인 경우: INSIDE 가능, BEFORE/AFTER 불가
      const canDropSameLevel = draggedLevel === level; // BEFORE/AFTER 가능
      const canDropInside = draggedLevel === level + 1; // INSIDE 가능

      if (!canDropSameLevel && !canDropInside) {
        return false;
      }
    }

    if (treeType === 'SAME_PARENT_ONLY') {
      const sourceParentKey = effectiveDraggedNode.parentKey || effectiveDraggedNode.parentId;

      // 1. 현재 노드가 드래그된 노드의 원래 부모인 경우 (INSIDE 드롭 가능)
      const canDropInside = node.key === sourceParentKey;

      // 2. 현재 노드가 드래그된 노드와 같은 부모를 가지는 경우 (BEFORE/AFTER 드롭 가능)
      const currentNodeParentKey = node.parentKey || node.parentId;
      const canDropBeforeAfter = sourceParentKey === currentNodeParentKey;

      if (!canDropInside && !canDropBeforeAfter) {
        return false;
      }
    }

    // MaxDepth 검증
    if (maxDepth !== undefined) {
      const draggedNodeMaxDepth = getNodeMaxDepth(effectiveDraggedNode);
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
        sourceNode: effectiveDraggedNode,
        targetNode: node,
        dropPosition: 'INSIDE',
        level,
      });

      // 추가로 BEFORE/AFTER도 검증 (보다 엄격한 검증)
      const isValidBefore = customDropValidator({
        sourceNode: effectiveDraggedNode,
        targetNode: node,
        dropPosition: 'BEFORE',
        level,
      });

      const isValidAfter = customDropValidator({
        sourceNode: effectiveDraggedNode,
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
  }, [effectiveDraggedNode, node, customDropValidator, level, treeType, maxDepth]);

  const nodeStyle = useMemo(() => {
    const styles = [];

    // 배경 스타일 (INSIDE 드롭 위치는 border로 처리하므로 배경 제거)
    // if (dropPosition === 'INSIDE') {
    //   styles.push('bg-[var(--gray1)]');
    // }

    // 드래그 중 스타일 (현재 드래그되는 노드)
    const isThisNodeBeingDragged =
      isDragging && globalSourceTreeId === treeId && effectiveDraggedNodeKey === node.key;
    if (isThisNodeBeingDragged) {
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

    // 드래그 중일 때 유효하지 않은 드롭 대상 스타일 (같은 트리에서만 적용)
    if (effectiveDraggedNode && globalSourceTreeId === treeId && !isValidDropTarget()) {
      styles.push('opacity-50 cursor-not-allowed');
      // 드래그 중이고 유효하지 않은 대상이면 배경을 빨간색으로
      if (!isValidDropTarget()) {
        styles.push('bg-red-50');
      }
    }

    // 다른 트리에서 드래그 중일 때는 전체 배경 스타일을 제거하고
    // 정확한 드롭 위치에서만 스타일 표시하도록 함

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
    effectiveDraggedNode,
    isValidDropTarget,
    treeType,
    isDraggedFromOtherTree,
  ]);

  // 전역 드롭 상태 확인
  const currentDropTarget = treeContext?.dragState?.currentDropTarget;
  const isThisNodeDropTarget =
    currentDropTarget?.node?.key === node.key && currentDropTarget?.treeId === treeId;
  const currentDropPosition = isThisNodeDropTarget ? currentDropTarget?.position : null;

  // 드롭 위치 상태 업데이트
  useEffect(() => {
    const isCrossTreeDrag = globalSourceTreeId && globalSourceTreeId !== treeId;

    if (isCrossTreeDrag && isThisNodeDropTarget && currentDropPosition) {
      setDropPosition(currentDropPosition);
    } else if (!isCrossTreeDrag && !isGlobalDragging) {
      // 같은 트리 드래그이거나 드래그 중이 아니면 로컬 상태 사용
      setDropPosition(null);
    } else if (!isThisNodeDropTarget) {
      setDropPosition(null);
    }
  }, [isThisNodeDropTarget, currentDropPosition, isGlobalDragging, globalSourceTreeId, treeId]);

  // SAME_LEVEL_ONLY에서 BEFORE/AFTER 드롭 비활성화 조건 확인
  const shouldDisableBeforeAfterDrop = useMemo(() => {
    if (!effectiveDraggedNode || treeType !== 'SAME_LEVEL_ONLY') return false;

    const draggedLevel = effectiveDraggedNode.level || effectiveDraggedNode.depth || 0;

    // 드래그된 노드가 타겟보다 한 레벨 아래인 경우 BEFORE/AFTER 비활성화 (INSIDE만 허용)
    return draggedLevel === level + 1;
  }, [treeType, effectiveDraggedNode, level]);

  // 드롭 영역 설정 (BEFORE) - 모든 depth에서 허용
  const { setNodeRef: setDropBeforeRef, isOver: isOverBefore } = useDroppable({
    id: `${treeId}-drop-before-${node.key}`,
    data: {
      id: node.key,
      node,
      level,
      position: 'BEFORE',
      treeId,
    } as DropZoneData,
    disabled: shouldDisableBeforeAfterDrop,
  });

  // 드롭 영역 설정 (AFTER) - 모든 depth에서 허용
  const { setNodeRef: setDropAfterRef, isOver: isOverAfter } = useDroppable({
    id: `${treeId}-drop-after-${node.key}`,
    data: {
      id: node.key,
      node,
      level,
      position: 'AFTER',
      treeId,
    } as DropZoneData,
    disabled: shouldDisableBeforeAfterDrop,
  });

  // 드롭 타입별 INSIDE 드롭 비활성화 조건 확인
  const shouldDisableInsideDrop = useMemo(() => {
    if (!effectiveDraggedNode) return false;

    if (treeType === 'SAME_PARENT_ONLY') {
      const sourceParentKey = effectiveDraggedNode.parentKey || effectiveDraggedNode.parentId;
      const currentNodeParentKey = node.parentKey || node.parentId;

      // 형제 노드들 (같은 부모를 가진 노드들)은 INSIDE 드롭 비활성화
      return sourceParentKey === currentNodeParentKey && node.key !== sourceParentKey;
    }

    if (treeType === 'SAME_LEVEL_ONLY') {
      const draggedLevel = effectiveDraggedNode.level || effectiveDraggedNode.depth || 0;

      // 같은 레벨 노드들은 INSIDE 드롭 비활성화 (BEFORE/AFTER만 허용)
      return draggedLevel === level;
    }

    return false;
  }, [treeType, effectiveDraggedNode, node.key, node.parentKey, node.parentId, level]);

  // 드롭 영역 설정 (INSIDE) - 하위 노드로 이동
  const { setNodeRef: setDropInsideRef, isOver: isOverInside } = useDroppable({
    id: `${treeId}-drop-inside-${node.key}`,
    data: {
      id: node.key,
      node,
      level,
      position: 'INSIDE',
      treeId,
    } as DropZoneData,
    disabled: shouldDisableInsideDrop,
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
          position: 'relative',
          height: isGlobalDragging ? '10px' : '2px',
          // height: '10px',
          backgroundColor:
            (isOverBefore || (isDraggedFromOtherTree && dropPosition === 'BEFORE')) &&
            isValidDropTarget()
              ? 'rgba(33, 150, 243, 0.2)'
              : 'transparent',
          marginBottom: '0px',
          marginLeft: `${level * 28}px`,
          borderRadius: '2px',
          // transition: 'height 0.2s ease',
        }}
      >
        {/* 드롭 라인 표시 */}
        {(isOverBefore || (isDraggedFromOtherTree && dropPosition === 'BEFORE')) &&
          isValidDropTarget() && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                right: '0',
                height: '2px',
                backgroundColor: '#2196f3',
                borderRadius: '1px',
                transform: 'translateY(-50%)',
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
          border:
            (isOverInside || (isDraggedFromOtherTree && dropPosition === 'INSIDE')) &&
            isValidDropTarget()
              ? '2px dashed #2196f3'
              : '1px solid transparent',
          // borderRadius: '4px',
          transition: 'all 0.2s ease',
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
          position: 'relative',
          height: isGlobalDragging ? '10px' : '2px',
          // height: '10px',

          backgroundColor:
            (isOverAfter || (isDraggedFromOtherTree && dropPosition === 'AFTER')) &&
            isValidDropTarget()
              ? 'rgba(33, 150, 243, 0.2)'
              : 'transparent',
          marginTop: '0px',
          marginLeft: `${level * 28}px`,
          borderRadius: '2px',
          // transition: 'height 0.2s ease',
        }}
      >
        {/* 드롭 라인 표시 */}
        {(isOverAfter || (isDraggedFromOtherTree && dropPosition === 'AFTER')) &&
          isValidDropTarget() && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                right: '0',
                height: '2px',
                backgroundColor: '#2196f3',
                borderRadius: '1px',
                transform: 'translateY(-50%)',
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
              draggedNode={effectiveDraggedNode}
              draggedNodeKey={effectiveDraggedNodeKey}
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
  const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);
  const [draggedNodeKey, setDraggedNodeKey] = useState<string | null>(null);

  const selectedNode =
    externalSelectedNode !== undefined ? externalSelectedNode : internalSelectedNode;
  const expandedKeys = externalExpandedKeys || internalExpandedKeys;
  const treeContext = useTreeContext();

  // 전역 드래그 상태에서 드래그된 노드 정보 가져오기
  const globalDraggedNode = treeContext?.dragState?.node || null;
  const globalDraggedNodeKey = globalDraggedNode?.key || null;
  const isGlobalDragging = treeContext?.dragState?.isDragging || false;

  // 현재 드래그된 노드는 로컬 또는 전역 상태에서 가져옴
  const currentDraggedNode = draggedNode || globalDraggedNode;
  const currentDraggedNodeKey = draggedNodeKey || globalDraggedNodeKey;

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

  // TreeContainer의 전역 DndContext 콜백 등록
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const dragData = active.data.current as DragData;

      // 이 트리에서 시작된 드래그인지 확인 - 드래그 ID가 이 트리의 것인지 확인
      const isDragFromThisTree = active.id && active.id.toString().startsWith(`${treeId}-drag-`);
      if (dragData && isDragFromThisTree) {
        setDraggedNode(dragData.node);
        setDraggedNodeKey(dragData.node.key);
        if (treeContext && treeContext.setDragState) {
          treeContext.setDragState({
            node: JSON.parse(JSON.stringify(dragData.node)),
            sourceTreeId: treeId,
            isDragging: true,
          });
        }
      }
    },
    [treeData, treeId, treeContext],
  );

  const handleDrop = useCallback(
    async (dropInfo: DropInfo) => {
      const { targetNode, dropPosition, sourceNode } = dropInfo;

      if (!sourceNode || !targetNode) return;

      // 유효성 검증
      const sourceTreeId = treeContext?.dragState?.sourceTreeId || null;
      const actionType = sourceTreeId === treeId ? 'NODE_MOVE' : 'NODE_COPY';

      if (
        actionType === 'NODE_MOVE' &&
        !isValidDrop(sourceNode.key, targetNode.key, treeData, dropPosition, type)
      ) {
        return;
      }

      // 루트 레벨로의 이동 제한
      if (getNodeLevel(treeData, targetNode.key) === 0 && dropPosition !== 'INSIDE') {
        console.warn('Cannot drop next to root level node');
        return;
      }

      // 클라이언트 트리 업데이트
      if (clientTree) {
        let newTreeData = [...treeData];

        // 같은 트리 내에서만 이동할 때 소스에서 제거, 크로스 트리에서는 타겟 트리에만 추가
        if (actionType === 'NODE_MOVE') {
          newTreeData = removeNodeByKey(newTreeData, sourceNode.key);
        } else if (actionType === 'NODE_COPY') {
          // 타겟 트리에만 노드 추가 (소스 트리에서는 제거하지 않음)
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

      // 드래그 상태는 TreeContainer에서 중앙 관리됨
    },
    [treeContext, treeId, type, treeData, clientTree, isSearching, searchKeyword, onAction],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      // 이 트리에서 시작된 드래그인지 확인하여 처리
      const dragData = active.data.current as DragData;
      const isThisTreeDrag = active.id && active.id.toString().startsWith(`${treeId}-drag-`);

      if (isThisTreeDrag) {
        setDraggedNode(null);
        setDraggedNodeKey(null);
      }

      if (!over) {
        return;
      }

      const dropData = over.data.current as DropZoneData;

      if (!dragData || !dropData) {
        return;
      }

      // 이 트리의 드롭 영역인지 확인 - 드롭 처리는 해당 트리에서만
      const isThisTreeDrop = over.id && over.id.toString().startsWith(`${treeId}-drop-`);

      if (!isThisTreeDrop) {
        return;
      }

      const dropInfo: DropInfo = {
        sourceNode: dragData.node,
        targetNode: dropData.node,
        dropPosition: dropData.position,
      };

      handleDrop(dropInfo);
    },
    [treeData, handleDrop],
  );

  const handleRemoveNode = useCallback(
    (nodeKey: string) => {
      if (clientTree) {
        const newTreeData = removeNodeByKey([...treeData], nodeKey);

        if (isSearching && searchKeyword) {
          updateNodeVisibility(newTreeData, searchKeyword);
        }

        setTreeData(newTreeData);

        const updatedInitialData = JSON.parse(JSON.stringify(newTreeData));
        const fullData = JSON.parse(JSON.stringify(updatedInitialData));
        updateNodeVisibility(fullData, '');
        setInitialData(fullData);
      }
    },
    [clientTree, treeData, isSearching, searchKeyword],
  );

  useEffect(() => {
    if (treeContext && treeContext.registerTreeCallbacks) {
      treeContext.registerTreeCallbacks(treeId, {
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        removeNode: handleRemoveNode,
      });
    }
  }, [treeId, treeContext, handleDragStart, handleDragEnd, handleRemoveNode]);

  // 드롭 처리

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
              draggedNode={currentDraggedNode}
              draggedNodeKey={currentDraggedNodeKey}
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
  );
};
