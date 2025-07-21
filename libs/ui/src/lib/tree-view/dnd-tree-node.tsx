import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import {
  EnhancedTreeNode,
  TreeNode,
  NodeMovePositionType,
  DragData,
  DropZoneData,
  DndTreeNodeProps,
} from './type';
import { getNodeMaxDepth } from './tree.service';
import { useTreeContext } from './tree.context';
import styles from './tree.module.css';
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

export const DndTreeNode: React.FC<DndTreeNodeProps> = ({
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
  minDraggableLevel,
  moveIcon,
  isFirstSibling = false,
  renderNodeDragHandle,
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
  const isTreeToTreeMode = treeType === 'TREE_TO_TREE' || moveIcon === true;
  const isSourceTree = sourceTreeId ? treeId === sourceTreeId : false;
  const isDragDisabled = isTreeToTreeMode && isNodeSelected && isSourceTree;
  const shouldShowSelection = isTreeToTreeMode && isNodeSelected && isSourceTree;
  const isDragAndDropMode =
    treeType === 'DEFAULT' ||
    treeType === 'DRAG_DROP' ||
    treeType === 'SAME_LEVEL_ONLY' ||
    treeType === 'SAME_PARENT_ONLY' ||
    treeType === 'TREE_TO_TREE';

  // 드래그 설정
  const {
    attributes: dragAttributes,
    listeners: dragListeners,
    setNodeRef: setDragNodeRef,
    isDragging,
    transform,
  } = useDraggable({
    id: `${treeId}-drag-${node.key}`,
    data: {
      id: node.key,
      node,
      level,
    } as DragData,
    disabled: !isDraggable || node.constraints?.drag === false,
  });

  // 특정 위치에 대한 드롭 유효성 검사
  const isValidDropTargetForPosition = useCallback(
    (position: NodeMovePositionType) => {
      if (!effectiveDraggedNode) return true;

      // 같은 트리에서 자기 자신의 BEFORE/INSIDE로는 드롭할 수 없음 (AFTER는 허용)
      if (effectiveDraggedNode.key === node.key && position !== 'AFTER') {
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

      // 트리 타입에 따른 유효성 검사
      if (treeType === 'SAME_LEVEL_ONLY') {
        const draggedLevel = effectiveDraggedNode.level || effectiveDraggedNode.depth || 0;

        if (position === 'BEFORE' || position === 'AFTER') {
          return draggedLevel === level;
        } else if (position === 'INSIDE') {
          return draggedLevel === level + 1;
        }
      }

      if (treeType === 'SAME_PARENT_ONLY') {
        const sourceParentKey = effectiveDraggedNode.parentKey || effectiveDraggedNode.parentId;
        const currentNodeParentKey = node.parentKey || node.parentId;

        if (position === 'INSIDE') {
          return node.key === sourceParentKey;
        } else if (position === 'BEFORE' || position === 'AFTER') {
          if (sourceParentKey !== currentNodeParentKey) {
            return false;
          }
          if (node.key === sourceParentKey) {
            return false;
          }
        }
      }

      // MaxDepth 검증
      if (maxDepth !== undefined && position === 'INSIDE') {
        const draggedNodeMaxDepth = getNodeMaxDepth(effectiveDraggedNode);
        const insideFinalLevel = level + 1;
        if (insideFinalLevel + draggedNodeMaxDepth - 1 > maxDepth) {
          return false;
        }
      }

      // 커스텀 검증 로직
      if (customDropValidator) {
        return customDropValidator({
          sourceNode: effectiveDraggedNode,
          targetNode: node,
          dropPosition: position,
          level,
        });
      }

      return true;
    },
    [
      effectiveDraggedNode,
      node,
      customDropValidator,
      level,
      treeType,
      maxDepth,
      globalSourceTreeId,
      treeId,
    ],
  );

  // 현재 노드가 유효한 드롭 대상인지 확인
  const isValidDropTarget = useCallback(() => {
    if (!effectiveDraggedNode) return true;

    return ['BEFORE', 'INSIDE', 'AFTER'].some((pos) =>
      isValidDropTargetForPosition(pos as NodeMovePositionType),
    );
  }, [effectiveDraggedNode, isValidDropTargetForPosition]);

  const isValidDropPosition = useCallback(() => {
    if (!effectiveDraggedNode || !dropPosition) return true;

    if (level === 0 && dropPosition !== 'INSIDE') {
      return false;
    }

    return isValidDropTargetForPosition(dropPosition);
  }, [dropPosition, effectiveDraggedNode, level, isValidDropTargetForPosition]);

  // 성능 최적화를 위한 계산들
  const isThisNodeBeingDragged = useMemo(
    () => isDragging && globalSourceTreeId === treeId && effectiveDraggedNodeKey === node.key,
    [isDragging, globalSourceTreeId, treeId, effectiveDraggedNodeKey, node.key],
  );

  const isSelectedNode = useMemo(
    () => selectedNode?.key === node.key,
    [selectedNode?.key, node.key],
  );

  const hasSearchMatch = useMemo(
    () =>
      searchKeyword && node.title && node.title.toLowerCase().includes(searchKeyword.toLowerCase()),
    [searchKeyword, node.title],
  );

  const isInvalidDropTarget = useMemo(
    () => effectiveDraggedNode && globalSourceTreeId === treeId && !isValidDropTarget(),
    [effectiveDraggedNode, globalSourceTreeId, treeId, isValidDropTarget],
  );

  const isMaxDepthExceeded = useMemo(() => {
    if (!effectiveDraggedNode || !maxDepth || globalSourceTreeId !== treeId) return false;

    const draggedNodeMaxDepth = getNodeMaxDepth(effectiveDraggedNode);
    const targetNodeLevel = level;
    const insideFinalLevel = targetNodeLevel + 1;
    return insideFinalLevel + draggedNodeMaxDepth - 1 > maxDepth;
  }, [effectiveDraggedNode, maxDepth, level, globalSourceTreeId, treeId]);

  const isCustomValidatorBlocked = useMemo(() => {
    if (!effectiveDraggedNode || !customDropValidator || globalSourceTreeId !== treeId)
      return false;

    const positions: NodeMovePositionType[] = ['BEFORE', 'INSIDE', 'AFTER'];

    return positions.every((position) => {
      return !customDropValidator({
        sourceNode: effectiveDraggedNode,
        targetNode: node,
        dropPosition: position,
        level,
      });
    });
  }, [effectiveDraggedNode, customDropValidator, node, level, globalSourceTreeId, treeId]);

  const shouldCollapseForSameLevel = useMemo(() => {
    if (!effectiveDraggedNode || treeType !== 'SAME_LEVEL_ONLY' || globalSourceTreeId !== treeId)
      return false;

    const draggedLevel = effectiveDraggedNode.level || effectiveDraggedNode.depth || 0;

    if (effectiveDraggedNodeKey === node.key) return false;

    const canBefore = draggedLevel === level;
    const canInside = draggedLevel === level + 1;

    return !canBefore && !canInside;
  }, [effectiveDraggedNode, treeType, level, globalSourceTreeId, treeId, effectiveDraggedNodeKey]);

  const isCustomValidatorGrayedOut = useMemo(() => {
    if (!effectiveDraggedNode || !customDropValidator || globalSourceTreeId !== treeId)
      return false;

    if (effectiveDraggedNodeKey === node.key) return false;

    const positions: NodeMovePositionType[] = ['BEFORE', 'INSIDE', 'AFTER'];

    return positions.some((position) => {
      return !customDropValidator({
        sourceNode: effectiveDraggedNode,
        targetNode: node,
        dropPosition: position,
        level,
      });
    });
  }, [
    effectiveDraggedNode,
    customDropValidator,
    node,
    level,
    globalSourceTreeId,
    treeId,
    effectiveDraggedNodeKey,
  ]);

  const isDescendantOfDraggedNode = useMemo(() => {
    if (!effectiveDraggedNode || globalSourceTreeId !== treeId) return false;

    const isDescendant = (parentNode: TreeNode, childKey: string): boolean => {
      if (!parentNode.children) return false;
      return parentNode.children.some(
        (child) => child.key === childKey || isDescendant(child, childKey),
      );
    };

    return isDescendant(effectiveDraggedNode, node.key);
  }, [effectiveDraggedNode, node.key, globalSourceTreeId, treeId]);

  // 중복 BEFORE 인디케이터 방지를 위한 로직
  const shouldRenderBefore = useMemo(() => {
    if (!(isGlobalDragging || effectiveDraggedNode)) return false;
    if (effectiveDraggedNodeKey === node.key) return false;
    if (isDescendantOfDraggedNode) return false;
    if (shouldCollapseForSameLevel) return false;
    // 현재 드래그 중인 노드인 경우 BEFORE 표시하지 않음
    if (isThisNodeBeingDragged) return false;

    // 첫 번째 형제가 아닌 경우 BEFORE 렌더링 (이전 형제의 AFTER와 중복 방지)
    return isFirstSibling;
  }, [
    isGlobalDragging,
    effectiveDraggedNode,
    effectiveDraggedNodeKey,
    node.key,
    isDescendantOfDraggedNode,
    shouldCollapseForSameLevel,
    isFirstSibling,
    isThisNodeBeingDragged,
  ]);

  const nodeStyle = useMemo(() => {
    const styles = [];

    if (isThisNodeBeingDragged) {
      styles.push('opacity-80 bg-blue-100 border-2 border-blue-400 shadow-md');
    }

    if (isSelectedNode) {
      styles.push('bg-[var(--secondary6)]');
    }
    if (treeType === 'SHUTTLE_LIST' && isNodeSelected) {
      styles.push('bg-[var(--secondary6)]');
    }
    if (shouldShowSelection) {
      styles.push('bg-[var(--secondary6)]');
    }

    if (dropPosition === 'INSIDE') {
      styles.push(isValidDropPosition() ? 'bg-blue-50' : 'bg-red-50');
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
    }

    if (isInvalidDropTarget) {
      if (treeType === 'SAME_LEVEL_ONLY') {
        styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
      } else {
        styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
      }
    }

    if (isMaxDepthExceeded) {
      styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
    }

    if (isCustomValidatorBlocked) {
      styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
    }

    if (isCustomValidatorGrayedOut) {
      styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
    }

    if (shouldCollapseForSameLevel) {
      styles.push('opacity-60 bg-gray-100 cursor-not-allowed');
    }

    if (hasSearchMatch) {
      styles.push('bg-yellow-50');
    }

    return styles.join(' ');
  }, [
    isThisNodeBeingDragged,
    isSelectedNode,
    treeType,
    isNodeSelected,
    shouldShowSelection,
    dropPosition,
    isValidDropPosition,
    node.constraints,
    isInvalidDropTarget,
    isMaxDepthExceeded,
    isCustomValidatorBlocked,
    isCustomValidatorGrayedOut,
    shouldCollapseForSameLevel,
    hasSearchMatch,
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
      setDropPosition(null);
    } else if (!isThisNodeDropTarget) {
      setDropPosition(null);
    }
  }, [isThisNodeDropTarget, currentDropPosition, isGlobalDragging, globalSourceTreeId, treeId]);

  // SAME_LEVEL_ONLY에서 BEFORE/AFTER 드롭 비활성화 조건
  const shouldDisableBeforeAfterDrop = useMemo(() => {
    if (!effectiveDraggedNode || treeType !== 'SAME_LEVEL_ONLY') return false;

    const draggedLevel = effectiveDraggedNode.level || effectiveDraggedNode.depth || 0;
    return draggedLevel !== level;
  }, [treeType, effectiveDraggedNode, level]);

  // 드롭 영역 설정
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

  const shouldDisableInsideDrop = useMemo(() => {
    if (!effectiveDraggedNode) return false;
    return !isValidDropTargetForPosition('INSIDE');
  }, [effectiveDraggedNode, isValidDropTargetForPosition]);

  // SAME_LEVEL_ONLY에서 첫 번째 AFTER 드롭존 렌더링 여부
  const shouldRenderFirstAfterZone = useMemo(() => {
    return (
      treeType === 'SAME_LEVEL_ONLY' &&
      (!hasChildren || !isExpanded) &&
      (isGlobalDragging || effectiveDraggedNode) &&
      effectiveDraggedNodeKey !== node.key &&
      !isDescendantOfDraggedNode &&
      !shouldCollapseForSameLevel &&
      !isThisNodeBeingDragged &&
      isValidDropTargetForPosition('AFTER')
    );
  }, [
    treeType,
    hasChildren,
    isExpanded,
    isGlobalDragging,
    effectiveDraggedNode,
    effectiveDraggedNodeKey,
    node.key,
    isDescendantOfDraggedNode,
    shouldCollapseForSameLevel,
    isThisNodeBeingDragged,
    isValidDropTargetForPosition,
  ]);

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

  // 이벤트 핸들러들
  const handleToggleExpand = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setExpandedKeys((prev) =>
        isExpanded ? prev.filter((k) => k !== node.key) : [...prev, node.key],
      );
    },
    [isExpanded, node.key, setExpandedKeys],
  );

  const handleClick = useCallback(() => {
    if (node && onNodeClick) onNodeClick(node);
    if (node === selectedNode && onNodeClick) onNodeClick(null);
    if (onCustomNodeClick) {
      onCustomNodeClick({ ...node, level });
    }
  }, [node, onNodeClick, selectedNode, onCustomNodeClick, level]);

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
    if (minDraggableLevel && level < minDraggableLevel) return null;

    // renderNodeDragHandle이 제공된 경우 해당 함수의 결과에 따라 드래그 핸들 표시 여부 결정
    if (renderNodeDragHandle && !renderNodeDragHandle(node)) {
      return null;
    }

    const dragIconStyle = isDragDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-grab';

    return (
      <span
        className={`flex items-center justify-center text-5xl transition-opacity ${dragIconStyle}`}
        draggable={!isDragDisabled}
        {...dragAttributes}
        {...dragListeners}
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

  const renderAfterDropZone = (adjustForChildren = false) => {
    const isDropZoneHovered = isOverAfter || (isDraggedFromOtherTree && dropPosition === 'AFTER');
    const isValidDrop = isValidDropTargetForPosition('AFTER');

    const getDropZoneHeight = () => {
      if (!(isGlobalDragging || effectiveDraggedNode)) return '0px';
      if (isDropZoneHovered) return '20px';
      return '12px';
    };

    const getMarginTop = () => {
      if (adjustForChildren && hasChildren && isExpanded) {
        return '8px';
      }
      return '4px';
    };

    return (
      <div
        ref={setDropAfterRef}
        style={{
          position: 'relative',
          height: getDropZoneHeight(),
          backgroundColor: (() => {
            if (isDropZoneHovered && isValidDrop) return 'rgba(33, 150, 243, 0.15)';
            if (isDropZoneHovered && !isValidDrop) return 'rgba(239, 68, 68, 0.15)';
            return 'transparent';
          })(),
          marginTop: getMarginTop(),
          marginLeft: `${level * 28}px`,
          borderRadius: '4px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: (() => {
            if (isDropZoneHovered && isValidDrop) return '2px dashed #2196f3';
            if (isDropZoneHovered && !isValidDrop) return '2px dashed #ef4444';
            return '1px dashed transparent';
          })(),
          cursor: isDropZoneHovered && isValidDrop ? 'copy' : 'default',
          opacity: isGlobalDragging || effectiveDraggedNode ? 1 : 0,
          transform: isDropZoneHovered && isValidDrop ? 'scaleY(1.2)' : 'scaleY(1)',
          zIndex: 20,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></div>
    );
  };

  return (
    <div className={styles.tree_item}>
      {/* BEFORE 드롭 영역 - 중복 방지를 위해 첫 번째 형제만 렌더링 */}
      {shouldRenderBefore && (
        <div
          ref={setDropBeforeRef}
          style={{
            position: 'relative',
            height: (() => {
              const isDropZoneHovered =
                isOverBefore || (isDraggedFromOtherTree && dropPosition === 'BEFORE');
              if (!(isGlobalDragging || effectiveDraggedNode)) return '0px';
              if (isDropZoneHovered) return '20px';
              return isFirstSibling ? '12px' : '8px';
            })(),
            backgroundColor: (() => {
              const isDropZoneHovered =
                isOverBefore || (isDraggedFromOtherTree && dropPosition === 'BEFORE');
              const isValidDrop = isValidDropTargetForPosition('BEFORE');
              if (isDropZoneHovered && isValidDrop) return 'rgba(33, 150, 243, 0.15)';
              if (isDropZoneHovered && !isValidDrop) return 'rgba(239, 68, 68, 0.15)';
              return 'transparent';
            })(),
            marginBottom: '0px',
            marginLeft: `${level * 28}px`,
            borderRadius: '4px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: (() => {
              const isDropZoneHovered =
                isOverBefore || (isDraggedFromOtherTree && dropPosition === 'BEFORE');
              const isValidDrop = isValidDropTargetForPosition('BEFORE');
              if (isDropZoneHovered && isValidDrop) return '2px dashed #2196f3';
              if (isDropZoneHovered && !isValidDrop) return '2px dashed #ef4444';
              return '1px dashed transparent';
            })(),
            cursor:
              (isOverBefore || (isDraggedFromOtherTree && dropPosition === 'BEFORE')) &&
              isValidDropTargetForPosition('BEFORE')
                ? 'copy'
                : 'default',
            opacity: isGlobalDragging || effectiveDraggedNode ? 1 : 0,
            transform: (() => {
              const isDropZoneHovered =
                isOverBefore || (isDraggedFromOtherTree && dropPosition === 'BEFORE');
              const isValidDrop = isValidDropTargetForPosition('BEFORE');
              return isDropZoneHovered && isValidDrop ? 'scaleY(1.2)' : 'scaleY(1)';
            })(),
            zIndex: 20,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        ></div>
      )}

      {/* 노드 콘텐츠 */}
      <div
        ref={setDragNodeRef}
        className={cn(
          nodeStyle,
          styles.tree_inner,
          isDraggable && styles.draggable_hint,
          isDraggable && styles.enhanced_hover,
        )}
        style={{
          paddingLeft: `${level * 28}px`,
          display: 'flex',
          alignItems: 'center',
          minHeight: '40px',
          margin: shouldCollapseForSameLevel ? '0px 0' : '2px 0',
          opacity: isDragging ? 0.7 : 1,
          cursor: isDraggable ? 'grab' : 'default',
          border: (() => {
            const isInsideHover =
              isOverInside || (isDraggedFromOtherTree && dropPosition === 'INSIDE');
            const isValidDrop = isValidDropTargetForPosition('INSIDE');

            if (isInsideHover && isValidDrop) {
              return '3px dashed #2196f3';
            }
            if (isInsideHover && !isValidDrop) {
              return '2px dashed #ef4444';
            }
            return '2px solid transparent';
          })(),
          backgroundColor: (() => {
            const isInsideHover =
              isOverInside || (isDraggedFromOtherTree && dropPosition === 'INSIDE');
            const isValidDrop = isValidDropTargetForPosition('INSIDE');

            if (isInsideHover && isValidDrop) {
              return 'rgba(33, 150, 243, 0.12)';
            }
            if (isInsideHover && !isValidDrop) {
              return 'rgba(239, 68, 68, 0.08)';
            }
            return undefined;
          })(),
          borderRadius: '6px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: (() => {
            const isInsideHover =
              isOverInside || (isDraggedFromOtherTree && dropPosition === 'INSIDE');
            const isValidDrop = isValidDropTargetForPosition('INSIDE');
            if (isInsideHover && isValidDrop) {
              return 'translateY(-1px)';
            }
            if (isInsideHover && !isValidDrop) {
              return 'translateY(0)';
            }
            return 'translateY(0)';
          })(),
          boxShadow: (() => {
            const isInsideHover =
              isOverInside || (isDraggedFromOtherTree && dropPosition === 'INSIDE');
            const isValidDrop = isValidDropTargetForPosition('INSIDE');
            if (isInsideHover && isValidDrop) {
              return '0 0 12px rgba(33, 150, 243, 0.6)';
            }
            return 'none';
          })(),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-level={level + 1}
        aria-selected={selectedNode?.key === node.key}
        tabIndex={0}
      >
        {/* 드롭 인사이드 영역 */}
        <div
          ref={setDropInsideRef}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            minHeight: '36px',
            zIndex: 10,
          }}
        >
          {level === 0 ? (
            <span
              className={cn(hasChildren ? styles.has_children : '', styles.tree_menu)}
              onClick={handleToggleExpand}
            >
              <IcoHome03 stroke="#131C30" className={styles.icon_home} />{' '}
            </span>
          ) : null}
          {hasChildren && (
            <span
              className={cn(hasChildren ? styles.has_children : '', styles.tree_menu)}
              onClick={handleToggleExpand}
            >
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

      {/* AFTER 드롭 영역 - 일반 트리 타입 */}
      {treeType !== 'SAME_LEVEL_ONLY' &&
        (isGlobalDragging || effectiveDraggedNode) &&
        !isDescendantOfDraggedNode &&
        !shouldCollapseForSameLevel &&
        !isThisNodeBeingDragged &&
        renderAfterDropZone()}

      {/* AFTER 드롭 영역 - SAME_LEVEL_ONLY (자식이 없거나 확장되지 않은 노드) */}
      {shouldRenderFirstAfterZone && renderAfterDropZone()}

      {/* 자식 노드들 */}
      {hasChildren && isExpanded && (
        <div className={styles.tree_children}>
          {node.children!.map((child, index, array) => (
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
              minDraggableLevel={minDraggableLevel}
              moveIcon={moveIcon}
              isFirstSibling={index === 0}
              renderNodeDragHandle={renderNodeDragHandle}
            />
          ))}
        </div>
      )}

      {/* 확장된 노드의 AFTER 드롭존 - SAME_LEVEL_ONLY (첫 번째 AFTER 존이 표시되지 않은 경우만) */}
      {treeType === 'SAME_LEVEL_ONLY' &&
        !shouldRenderFirstAfterZone &&
        hasChildren &&
        isExpanded &&
        (isGlobalDragging || effectiveDraggedNode) &&
        effectiveDraggedNodeKey !== node.key &&
        !isDescendantOfDraggedNode &&
        !shouldCollapseForSameLevel &&
        !isThisNodeBeingDragged &&
        isValidDropTargetForPosition('AFTER') &&
        renderAfterDropZone()}
    </div>
  );
};
