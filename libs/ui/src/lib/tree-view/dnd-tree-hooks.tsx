import { useCallback, useEffect, useState } from 'react';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import {
  TreeNode,
  EnhancedTreeNode,
  DropInfo,
  MoveEventPayload,
  CopyEventPayload,
  DragData,
  TreeType,
} from './type';
import { calculateTargetIndex, getNodeLevel, isValidDrop, removeNodeByKey } from './tree.service';
import { useTreeContext } from './tree.context';
import { updateNodeVisibility } from './dnd-tree-utils';
import { optimisticallyUpdateTree } from './tree-optimistic-update';

export const useDndTreeLogic = (
  treeId: string,
  data: TreeNode[],
  type: TreeType = 'DEFAULT',
  clientTree?: boolean,
  isSearching?: boolean,
  searchKeyword?: string,
  onAction?: (payload: any) => void,
  disableOptimisticUpdate?: boolean,
) => {
  const [initialData, setInitialData] = useState<EnhancedTreeNode[]>(
    JSON.parse(JSON.stringify(data)),
  );
  const [treeData, setTreeData] = useState<EnhancedTreeNode[]>(JSON.parse(JSON.stringify(data)));
  const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);
  const [draggedNodeKey, setDraggedNodeKey] = useState<string | null>(null);

  const treeContext = useTreeContext();

  // 전역 드래그 상태에서 드래그된 노드 정보
  const globalDraggedNode = treeContext?.dragState?.node || null;
  const globalDraggedNodeKey = globalDraggedNode?.key || null;

  // 현재 드래그된 노드는 로컬 또는 전역 상태에서 가져옴
  const currentDraggedNode = draggedNode || globalDraggedNode;
  const currentDraggedNodeKey = draggedNodeKey || globalDraggedNodeKey;

  // 외부 데이터 변경 감지
  useEffect(() => {
    setInitialData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  // 검색 관련 처리
  useEffect(() => {
    const refreshedData = JSON.parse(JSON.stringify(initialData));
    if (isSearching && searchKeyword) {
      updateNodeVisibility(refreshedData, searchKeyword);
    } else {
      updateNodeVisibility(refreshedData, '');
    }
    setTreeData(refreshedData);
  }, [initialData, isSearching, searchKeyword]);

  // 드래그 시작 핸들러
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const dragData = active.data.current as DragData;

      const isDragFromThisTree = active.id && active.id.toString().startsWith(`${treeId}-drag-`);
      if (dragData && isDragFromThisTree) {
        setDraggedNode(dragData.node);
        setDraggedNodeKey(dragData.node.key);

        // 셔틀 모드 여부 판단 (SHUTTLE_LIST 타입이거나 트리 간 이동이 아닌 경우)
        const isShuttleMode = type === 'SHUTTLE_LIST' || type !== 'TREE_TO_TREE';

        if (treeContext && treeContext.setDragState) {
          treeContext.setDragState({
            node: JSON.parse(JSON.stringify(dragData.node)),
            sourceTreeId: treeId,
            isDragging: true,
            isShuttleMode,
          });
        }
      }
    },
    [treeData, treeId, treeContext, type],
  );

  // 드롭 핸들러
  const handleDrop = useCallback(
    async (dropInfo: DropInfo) => {
      const { targetNode, dropPosition, sourceNode } = dropInfo;

      if (!sourceNode || !targetNode) return;

      const sourceTreeId = treeContext?.dragState?.sourceTreeId || null;
      const actionType = sourceTreeId === treeId ? 'NODE_MOVE' : 'NODE_COPY';

      if (
        actionType === 'NODE_MOVE' &&
        !isValidDrop(sourceNode.key, targetNode.key, treeData, dropPosition, type)
      ) {
        return;
      }

      if (getNodeLevel(treeData, targetNode.key) === 0 && dropPosition !== 'INSIDE') {
        console.warn('Cannot drop next to root level node');
        return;
      }

      if (clientTree || !disableOptimisticUpdate) {
        const { newTreeData, newInitialData } = optimisticallyUpdateTree(treeData, {
          actionType,
          sourceNode,
          targetNode,
          dropPosition,
          isSearching,
          searchKeyword,
        });

        setTreeData(newTreeData);
        setInitialData(newInitialData);
      }

      // 액션 콜백 호출
      if (onAction) {
        const targetIndex = calculateTargetIndex(treeData, targetNode, dropPosition).index;

        if (actionType === 'NODE_MOVE') {
          const movePayload: MoveEventPayload = {
            type: 'NODE_MOVE',
            sourceNode,
            targetNode,
            position: dropPosition,
            treeId,
            targetIndex,
          };
          onAction(movePayload);
        } else {
          const copyPayload: CopyEventPayload = {
            type: 'NODE_COPY',
            sourceNode,
            targetNode,
            position: dropPosition,
            treeId,
            targetIndex,
            sourceTreeId: sourceTreeId || null,
          };
          onAction(copyPayload);
        }
      }
    },
    [treeContext, treeId, type, treeData, clientTree, isSearching, searchKeyword, onAction],
  );

  // 하단 드롭 처리
  const handleBottomDrop = useCallback(
    (sourceNode: TreeNode) => {
      if (!sourceNode) return;

      const rootNode = treeData[0];

      if (rootNode.children && rootNode.children.length > 0) {
        const lastChildNode = rootNode.children[rootNode.children.length - 1];
        const dropInfo: DropInfo = {
          sourceNode,
          targetNode: lastChildNode,
          dropPosition: 'AFTER',
        };
        handleDrop(dropInfo);
      } else {
        const dropInfo: DropInfo = {
          sourceNode,
          targetNode: rootNode,
          dropPosition: 'INSIDE',
        };
        handleDrop(dropInfo);
      }
    },
    [treeData, handleDrop],
  );

  // 드래그 종료 핸들러
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      const dragData = active.data.current as DragData;
      const isThisTreeDrag = active.id && active.id.toString().startsWith(`${treeId}-drag-`);

      if (isThisTreeDrag) {
        setDraggedNode(null);
        setDraggedNodeKey(null);
      }

      if (!over) {
        return;
      }

      const dropData = over.data.current as any;

      if (!dragData || !dropData) {
        return;
      }

      const isThisTreeDrop = over.id && over.id.toString().startsWith(`${treeId}-drop-`);

      if (!isThisTreeDrop) {
        return;
      }

      // 하단 글로벌 드롭 존 처리
      if (dropData.isGlobalDropZone && dropData.position === 'BOTTOM') {
        handleBottomDrop(dragData.node);
        return;
      }

      const dropInfo: DropInfo = {
        sourceNode: dragData.node,
        targetNode: dropData.node,
        dropPosition: dropData.position,
      };

      handleDrop(dropInfo);
    },
    [treeData, handleDrop, handleBottomDrop],
  );

  // 노드 제거
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

  // 로컬 드래그 상태 리셋
  const resetLocalDragState = useCallback(() => {
    setDraggedNode(null);
    setDraggedNodeKey(null);
  }, []);

  // 트리 컨텍스트에 콜백 등록
  useEffect(() => {
    if (treeContext && treeContext.registerTreeCallbacks) {
      treeContext.registerTreeCallbacks(treeId, {
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        removeNode: handleRemoveNode,
        resetLocalDragState,
      });
    }
  }, [treeId, treeContext, handleDragStart, handleDragEnd, handleRemoveNode, resetLocalDragState]);

  return {
    treeData,
    setTreeData,
    currentDraggedNode,
    currentDraggedNodeKey,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleBottomDrop,
    handleRemoveNode,
    resetLocalDragState,
  };
};
