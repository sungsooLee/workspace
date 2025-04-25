import { TreeNode } from '@learnway/ui';

export const findNodeByApiId = (nodes: TreeNode[], apiId: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.key && node.key.toString() === apiId) return { ...node };
    if (node.children) {
      const found = findNodeByApiId(node.children, apiId);
      if (found) return found;
    }
  }
  return null;
};
