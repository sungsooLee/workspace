import { TreeNode } from '@learnway/ui';

export const handleExpandAll = (treeData: TreeNode[]) => {
  const getAllKeys = (nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...getAllKeys(node.children));
      }

      return keys;
    }, []);
  };
  return getAllKeys(treeData);
};

export const getFirstExpandKeys = (treeData: TreeNode[]) => {
  if (treeData && treeData.length > 0) {
    const firstLevelKeys = treeData.map((node: TreeNode) => node.key);
    return firstLevelKeys;
  }
};
