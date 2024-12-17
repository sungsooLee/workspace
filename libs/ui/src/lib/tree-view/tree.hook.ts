import { useState, useCallback } from 'react';
import { TreeAction, TreeNode } from './type';
import {
  addNodeToParent,
  generateKey,
  insertNodeAtPosition,
  removeNodeByKey,
  updateNodeByKey,
} from './tree.service';

interface UseTreeProps {
  initialData: TreeNode[];
  treeId?: string;
  onMove?: (
    sourceNode: TreeNode,
    targetNode: TreeNode | null,
    position: string,
    targetIndex?: number,
  ) => Promise<void>;
  onCopy?: (sourceNode: TreeNode, targetNode: TreeNode | null, position?: string) => Promise<void>;
  onAdd?: (parentNode: TreeNode | null, newNode: Partial<TreeNode>) => Promise<void>;
  onDelete?: (node: TreeNode) => Promise<void>;
  onUpdate?: (node: TreeNode, updates: Partial<TreeNode>) => Promise<void>;
  onClick?: (node: TreeNode) => Promise<void>;
}

export const useTree = ({
  initialData,
  treeId,
  onMove,
  onCopy,
  onAdd,
  onDelete,
  onUpdate,
  onClick,
}: UseTreeProps) => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const handleAction = useCallback(
    async (action: TreeAction) => {
      const { type, payload } = action;
      console.log(payload);
      if (payload.treeId !== treeId) return;

      try {
        switch (type) {
          case 'MOVE': {
            const { sourceNode, targetNode, position, targetIndex } = payload;
            if (!sourceNode || position === undefined) return;
            if (onMove) {
              await onMove(sourceNode, targetNode || null, position, targetIndex);
            }
            setTreeData((prev) => {
              const newData = removeNodeByKey(prev, sourceNode.key);
              return insertNodeAtPosition(newData, targetNode?.key || null, sourceNode, position);
            });
            break;
          }

          case 'COPY': {
            const { sourceNode, targetNode, position } = payload;
            if (!sourceNode) return;

            if (onCopy) {
              await onCopy(sourceNode, targetNode || null, position);
            }
            setTreeData((prev) =>
              insertNodeAtPosition(prev, targetNode?.key || null, sourceNode, position),
            );
            break;
          }

          case 'ADD': {
            const { parentNode, newNode } = payload;
            if (!newNode) return;

            const nodeToAdd: TreeNode = {
              key: generateKey(),
              ...newNode,
              children: newNode.children || [],
            };

            if (onAdd) {
              await onAdd(parentNode || null, nodeToAdd);
            }
            setTreeData((prev) =>
              parentNode ? addNodeToParent(prev, parentNode.key, nodeToAdd) : [...prev, nodeToAdd],
            );
            break;
          }

          case 'DELETE': {
            const { nodeToDelete } = payload;
            console.log(nodeToDelete);
            if (!nodeToDelete) return;

            if (onDelete) {
              await onDelete(nodeToDelete);
            }
            setTreeData((prev) => removeNodeByKey(prev, nodeToDelete.key));
            setSelectedNode(null);
            break;
          }

          case 'UPDATE': {
            const { node, updates } = payload;
            if (!node || !updates) return;

            if (onUpdate) {
              await onUpdate(node, updates);
            }
            setTreeData((prev) => updateNodeByKey(prev, node.key, updates));
            break;
          }

          case 'CLICK': {
            const { node } = payload;

            // if (onClick) {
            //   await onClick(node);
            // }
            if (node) setSelectedNode(node);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [treeId, onMove, onCopy, onAdd, onDelete, onUpdate],
  );

  const getAllNodeKeys = useCallback((nodes: TreeNode[]): string[] => {
    let keys: string[] = [];
    nodes.forEach((node) => {
      keys.push(node.key);
      if (node.children && node.children.length > 0) {
        keys = [...keys, ...getAllNodeKeys(node.children)];
      }
    });
    return keys;
  }, []);

  const handleNodeClick = useCallback(
    (node: TreeNode) => {
      if (selectedNode && node.key === selectedNode.key) {
        setSelectedNode(null);
        return;
      }
      setSelectedNode(node);
    },
    [selectedNode],
  );

  const handleExpandAll = useCallback(() => {
    const allKeys = getAllNodeKeys(treeData);
    setExpandedKeys(allKeys);
  }, [treeData, getAllNodeKeys]);

  const handleCollapseAll = useCallback(() => {
    setExpandedKeys([]);
  }, []);

  return {
    treeData,
    selectedNode,
    expandedKeys,
    setExpandedKeys,
    handleNodeClick,
    handleExpandAll,
    handleCollapseAll,
    handleAction,
  };
};
