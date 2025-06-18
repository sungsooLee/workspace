import { TreeNode } from '@learnway/ui';
import { EnTreeEventPosition } from '@types';

export const findOrganizationPathById = (
  nodes: TreeNode[],
  key: string,
  titles: string[] = [],
): string => {
  const targetId = key;

  for (const node of nodes) {
    // 현재 노드의 제목을 임시 경로에 추가
    const currentTitles = [...titles];
    if (node.key !== 'root') {
      currentTitles.push(node.title || 'no name');
    }

    // 현재 노드가 대상 노드인지 확인
    if (node.key && node.key.toString() === targetId) {
      return currentTitles.join(' > ');
    }

    // 자식 노드가 있으면 재귀적으로 검색
    if (node.children && node.children.length > 0) {
      const result = findOrganizationPathById(node.children, key, currentTitles);
      if (result) {
        return result;
      }
    }
  }

  // 노드를 찾지 못한 경우
  return '';
};
