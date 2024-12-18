import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import {
  TreeAction,
  TreeNode,
  UseTreeProps,
  NodeMovePositionType,
  MovePayload,
  ClickPayload,
  DeletePayload,
  AddPayload,
  CopyPayload,
} from './type';
import {
  addNodeToParent,
  findNodePath,
  generateKey,
  insertNodeAtPosition,
  removeNodeByKey,
  updateNodeByKey,
} from './tree.service';

export const useTree = ({
  initialData,
  treeId,
  onMove,
  onCopy,
  onAdd,
  onDelete,
  onUpdate,
  onClick,
  onError,
}: UseTreeProps) => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const treeOperations = useMemo(
    () => ({
      move: async (
        sourceNode: TreeNode,
        targetNode: TreeNode | null,
        position: string,
        targetIndex?: number,
      ) => {
        if (!mountedRef.current) return;

        try {
          setIsLoading(true);
          if (onMove) {
            await onMove(
              sourceNode,
              targetNode,
              position as NodeMovePositionType,
              targetIndex || 0,
            );
          }
          setTreeData((prev) => {
            const newData = removeNodeByKey(prev, sourceNode.key);

            if (!targetNode) return [...newData, { ...sourceNode }];
            return insertNodeAtPosition(
              newData,
              targetNode?.key || null,
              sourceNode,
              position as NodeMovePositionType,
            );
          });
        } catch (error) {
          onError?.(error as Error, 'MOVE');
          throw error;
        } finally {
          if (mountedRef.current) {
            setIsLoading(false);
          }
        }
      },

      copy: async (sourceNode: TreeNode, targetNode: TreeNode | null, position?: string) => {
        if (!mountedRef.current) return;

        try {
          setIsLoading(true);
          if (onCopy) {
            await onCopy(sourceNode, targetNode, position as NodeMovePositionType);
          }

          setTreeData((prevData) => {
            if (findNodePath(prevData, sourceNode.key)) {
              alert('이미 트리에 해당 노드 값이 존재합니다.');
              return prevData;
            }

            if (!targetNode) return [...prevData, { ...sourceNode }];

            return insertNodeAtPosition(
              prevData,
              targetNode?.key || null,
              sourceNode,
              position as NodeMovePositionType,
            );
          });
        } catch (error) {
          onError?.(error as Error, 'COPY');
          throw error;
        } finally {
          if (mountedRef.current) {
            setIsLoading(false);
          }
        }
      },

      add: async (parentNode: TreeNode | null, newNodeData: Partial<TreeNode>) => {
        if (!mountedRef.current) return;
        try {
          setIsLoading(true);
          const nodeToAdd: TreeNode = {
            key: generateKey(),
            ...newNodeData,
            children: newNodeData.children || [],
          };
          if (onAdd) {
            await onAdd(parentNode, nodeToAdd);
          }
          setTreeData((prev) =>
            parentNode ? addNodeToParent(prev, parentNode.key, nodeToAdd) : [...prev, nodeToAdd],
          );
          return nodeToAdd;
        } catch (error) {
          onError?.(error as Error, 'ADD');
          throw error;
        } finally {
          if (mountedRef.current) {
            setIsLoading(false);
          }
        }
      },

      delete: async (nodeToDelete: TreeNode) => {
        if (!mountedRef.current) return;
        try {
          setIsLoading(true);
          if (onDelete) {
            await onDelete(nodeToDelete);
          }
          setTreeData((prev) => removeNodeByKey(prev, nodeToDelete.key));
          setSelectedNode((prev) => (prev?.key === nodeToDelete.key ? null : prev));
        } catch (error) {
          onError?.(error as Error, 'DELETE');
          throw error;
        } finally {
          if (mountedRef.current) {
            setIsLoading(false);
          }
        }
      },

      update: async (node: TreeNode, updates: Partial<TreeNode>) => {
        if (!mountedRef.current) return;

        try {
          setIsLoading(true);
          if (onUpdate) {
            await onUpdate(node, updates);
          }
          setTreeData((prev) => updateNodeByKey(prev, node.key, updates));
        } catch (error) {
          onError?.(error as Error, 'UPDATE');
          throw error;
        } finally {
          if (mountedRef.current) {
            setIsLoading(false);
          }
        }
      },
    }),
    [onMove, onCopy, onAdd, onDelete, onUpdate, onError],
  );

  const handleAction = useCallback(
    async (action: TreeAction) => {
      const { type, payload } = action;
      if (payload.treeId !== treeId) return;
      try {
        switch (type) {
          case 'MOVE': {
            const movePayload = payload as MovePayload;
            await treeOperations.move(
              movePayload.sourceNode,
              movePayload.targetNode || null,
              movePayload.position,
              movePayload.targetIndex,
            );
            break;
          }
          case 'COPY': {
            const copyPayload = payload as CopyPayload;
            await treeOperations.copy(
              copyPayload.sourceNode,
              copyPayload.targetNode || null,
              copyPayload.position,
            );
            break;
          }

          case 'ADD': {
            const addPayload = payload as AddPayload;
            await treeOperations.add(addPayload.parentNode || null, addPayload.newNode);
            break;
          }

          case 'DELETE': {
            const deletePayload = payload as DeletePayload;
            await treeOperations.delete(deletePayload.nodeToDelete);
            break;
          }

          // case 'UPDATE':
          //   await treeOperations.update(payload.node!, payload.updates!);
          //   break;

          case 'CLICK': {
            const clickPayload = payload as ClickPayload;
            if (clickPayload.node) {
              if (onClick) {
                await onClick(clickPayload.node);
              }
              setSelectedNode((prev) =>
                prev?.key === clickPayload.node!.key ? null : clickPayload.node!,
              );
            }
            break;
          }
        }
      } catch (error) {
        console.error('Tree action error:', error);
      }
    },
    [treeId, treeOperations, onClick],
  );

  const getAllNodeKeys = useCallback((nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllNodeKeys(node.children));
      }
      return keys;
    }, []);
  }, []);

  const handleExpandAll = useCallback(() => {
    setExpandedKeys(getAllNodeKeys(treeData));
  }, [treeData, getAllNodeKeys]);

  const handleCollapseAll = useCallback(() => {
    setExpandedKeys([]);
  }, []);

  return {
    treeData,
    selectedNode,
    expandedKeys,
    setExpandedKeys,
    handleAction,
    handleExpandAll,
    handleCollapseAll,
    isLoading,
  };
};
