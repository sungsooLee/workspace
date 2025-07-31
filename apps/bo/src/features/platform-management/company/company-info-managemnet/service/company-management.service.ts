import { TreeNode } from '@learnway/ui/tree-view';
import { t } from 'i18next';
// TODO: Fix unknown imports:  from '@learnway/ui'

export const findUserGroupOrganizationPathById = (
  nodes: TreeNode[],
  key: string,
  titles: string[] = [],
): string => {
  const targetId = key;

  for (const node of nodes) {
    // 현재 노드의 제목을 임시 경로에 추가
    const currentTitles = [...titles];
    if (node.key !== 'root') {
      currentTitles.push(node.deptName || 'no name');
    }

    // 현재 노드가 대상 노드인지 확인
    if (node.key && node.key.toString() === targetId) {
      return currentTitles.join(' > ');
    }

    // 자식 노드가 있으면 재귀적으로 검색
    if (node.children && node.children.length > 0) {
      const result = findUserGroupOrganizationPathById(node.children, key, currentTitles);
      if (result) {
        return result;
      }
    }
  }

  // 노드를 찾지 못한 경우
  return '';
};

export const transformUserGroupOrganizationApiDataToTreeData = (
  apiData: any,
  rootName = 'ROOT',
) => {
  const root = { id: 'root', name: rootName, children: [] };
  if (apiData && apiData.length > 0) {
    root.children = apiData;
  }
  const dataArray = [root];

  const transform = (nodes: any, depth: number, parentId = '') => {
    if (!nodes) return [];

    return nodes.map((node: any) => {
      const memberCount = node.userCount;
      const nodeTitle =
        node.id !== 'root'
          ? node.name + ' (' + t('{{count}}명', { count: memberCount.toLocaleString() }) + ')'
          : node.name;
      // 새로운 노드 객체 생성
      const transformedNode = {
        ...node,
        // 필수 트리 속성
        key: node.id?.toString(),
        title: nodeTitle,

        parentKey: parentId,
        children: node.childList || [],
        _nodeType: 'D',
        depth: depth };

      if (node.type === 'COMPANY') {
        //회사 노드
        transformedNode.parentKey = 'root';
        transformedNode.key = node.id;
        transformedNode._nodeType = 'C';
      }

      // 자식 노드가 있는 경우 재귀적으로 변환
      if (node.children && node.children.length > 0) {
        transformedNode.children = transform(node.children, depth + 1, node.id);
      }

      return transformedNode;
    });
  };
  const retva = transform(dataArray, 0);
  console.log('### transform', retva);
  return retva;
};
