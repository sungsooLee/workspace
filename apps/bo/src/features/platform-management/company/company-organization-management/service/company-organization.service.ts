import { TreeNode } from '@learnway/ui';
import { t } from 'i18next';
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
      currentTitles.push(node.deptName || 'no name');
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

export const transformDepartmentApiDataToTreeData = (apiData: any, rootName = 'ROOT') => {
  //const dataArray = Array.isArray(apiData) ? apiData : [apiData];
  const root = { deptId: 'root', deptName: rootName, childList: [] };
  if (apiData && apiData.length > 0) {
    root.childList = apiData;
  }
  const dataArray = [root];

  const transform = (nodes: any, depth = 0) => {
    if (!nodes) return [];

    return nodes.map((node: any) => {
      const memberCount = node.deptMemberCount;
      const nodeTitle =
        node.deptId !== 'root'
          ? node.deptName + ' (' + t('{{count}}명', { count: memberCount.toLocaleString() }) + ')'
          : node.deptName;
      // 새로운 노드 객체 생성
      const transformedNode = {
        ...node,
        // 필수 트리 속성
        key: node.deptId?.toString(),
        title: nodeTitle,

        parentKey: node.parentDeptId?.toString() || '',
        children: node.childList || [],
        _nodeType: 'D',
        depth: depth,
      };

      if (!node.deptId && !node.parentDeptId) {
        //회사 노드
        transformedNode.parentKey = 'root';
        transformedNode.key = node.companyCode;
        transformedNode._nodeType = 'C';
      }

      // 자식 노드가 있는 경우 재귀적으로 변환
      if (node.childList && node.childList.length > 0) {
        transformedNode.children = transform(node.childList, depth + 1);
      }

      return transformedNode;
    });
  };
  const retva = transform(dataArray);
  console.log('transform', retva);
  return retva;
};
