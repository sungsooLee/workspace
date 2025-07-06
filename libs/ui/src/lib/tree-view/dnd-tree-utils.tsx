import { EnhancedTreeNode } from './type';

/**
 * 노드 가시성을 업데이트하는 함수
 * 검색 키워드에 따라 노드를 표시하거나 숨김
 */
export const updateNodeVisibility = (nodes: EnhancedTreeNode[], keyword: string): boolean => {
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