import { useState, useCallback } from 'react';
import { TreeNode } from './type';
import { addNodeToParent, removeNodeByKey, updateNodeByKey } from './tree.service';

interface UseTreeViewProps {
  initialData: TreeNode[];
}

export const useTreeView = ({ initialData }: UseTreeViewProps) => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

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

  const handleAddNode = useCallback(
    (nodeData: { title: string }) => {
      const newNode: TreeNode = {
        key: Math.random().toString(36).substr(2, 9),
        title: nodeData.title,
        children: [],
      };

      if (!selectedNode) {
        setTreeData((prev) => [...prev, newNode]);
        return;
      }
      setTreeData((prev) => addNodeToParent(prev, selectedNode.key, newNode));
    },
    [selectedNode],
  );

  const handleDeleteNode = useCallback((key: string) => {
    setSelectedNode(null);
    setTreeData((prev) => removeNodeByKey(prev, key));
  }, []);

  const handleUpdateNode = useCallback((key: string, updates: Partial<TreeNode>) => {
    setTreeData((prev) => updateNodeByKey(prev, key, updates));
  }, []);

  const handleExpandAll = useCallback(() => {
    const allKeys = getAllNodeKeys(treeData);
    setExpandedKeys(allKeys);
  }, [treeData, getAllNodeKeys]);

  const handleCollapseAll = useCallback(() => {
    setExpandedKeys([]);
  }, []);

  const handleTreeChange = useCallback((newData: TreeNode[]) => {
    setTreeData(newData);
  }, []);

  return {
    treeData,
    selectedNode,
    expandedKeys,
    setExpandedKeys,
    handleNodeClick,
    handleAddNode,
    handleDeleteNode,
    handleUpdateNode,
    handleExpandAll,
    handleCollapseAll,
    handleTreeChange,
  };
};
