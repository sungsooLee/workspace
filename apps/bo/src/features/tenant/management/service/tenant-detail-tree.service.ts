import { TreeNode } from '@learnway/ui';

export const getAllTreeKeys = (treeData: TreeNode[]) => {
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
const getAllChildrens = (nodes: TreeNode[], contains: TreeNode[] = []) => {
  for (const node of nodes) {
    contains.push(node);
    if (node.children && node.children.length > 0) {
      getAllChildrens(node.children, contains);
    }
  }
  return contains;
};

const getAllParentAndChildrenByKey = (
  nodes: TreeNode[],
  key: number | string,
  contains: TreeNode[] = [],
) => {
  for (const node of nodes) {
    const currentNodes = [...contains, node];
    if (node.key === key) {
      console.log(currentNodes);

      if (node.children && node.children?.length > 0) {
        getAllChildrens(node.children, currentNodes);

        console.log(currentNodes);
      }
      return currentNodes;
    }
    if (node.children && node.children.length > 0) {
      const result: TreeNode[] = getAllParentAndChildrenByKey(node.children, key, currentNodes);
      if (result.length > currentNodes.length) {
        return result;
      }
    }
  }
  return contains;
};

export const getNodeByKey = (nodes: TreeNode[], key: number | string): TreeNode | undefined => {
  for (const node of nodes) {
    if (node.key === key) {
      return node;
    }
    if (node.children && node.children?.length > 0) {
      return getNodeByKey(node.children, key);
    }
  }
  return undefined;
};

export const getAllParentAndAllChildById = (nodes: TreeNode[], key: number | string) => {
  return getAllParentAndChildrenByKey(nodes, key);
};

export const findMenuPathById = (
  nodes: TreeNode[],
  menuId: number | string,
  titles: string[] = [],
): string => {
  const targetId = menuId.toString();

  for (const node of nodes) {
    // 현재 노드의 제목을 임시 경로에 추가
    const currentTitles = [...titles, node.title || 'Unnamed'];

    // 현재 노드가 대상 노드인지 확인
    if (node.menuId && node.menuId.toString() === targetId) {
      return currentTitles.join(' > ');
    }

    // 자식 노드가 있으면 재귀적으로 검색
    if (node.children && node.children.length > 0) {
      const result = findMenuPathById(node.children, menuId, currentTitles);
      if (result) {
        return result;
      }
    }
  }

  // 노드를 찾지 못한 경우
  return '';
};

export const getFirstExpandKeys = (treeData: TreeNode[]) => {
  if (treeData && treeData.length > 0) {
    const firstLevelKeys = treeData.map((node: TreeNode) => node.key);
    return firstLevelKeys;
  }
};
/**
 * Tenant Menu를 TreeNode 로 변환 하는 함수
 * @param apiData
 * @returns 변환된 TreeNode
 */
export const transformApiDataToTreeData = (apiData: any) => {
  // 단일 노드인 경우 배열로 감싸기
  const dataArray = Array.isArray(apiData) ? apiData : [apiData];

  // 재귀적으로 데이터 구조 변환
  const transform = (nodes: any) => {
    if (!nodes) return [];

    return nodes.map((node: any) => {
      // 새로운 노드 객체 생성
      const transformedNode = {
        // 필수 트리 속성
        key: node.menuId.toString(), // menuId를 key로 사용
        title: node.menuName || node.menuCode, // title이 없으면 menuCode 사용

        // 원본 데이터 속성 유지
        menuId: node.menuId,
        sortOrder: node.sortOrder,
        isUsed: node.isUsed, // isUsed을 isUsed로 변환
        isDeleted: node.isDeleted,
        isMobileExposed: node.isMobileExposed,
        isWebExposed: node.isWebExposed,
        tenantId: node.tenantId,
        menuCode: node.menuCode,
        path: node.path,
        depth: node.depth,
        isShortCutArea: node.isShortCutArea,
        isPersoninfoInclusion: node.isPersoninfoInclusion,
        menuScope: node.menuScope,
        menuStartDate: node.menuStartDate,
        menuEndDate: node.menuEndDate,
        parentId: node.parentId,
        tenantMappingMenuId: node.tenantMappingMenuId,

        parentKey: node.parentId?.toString(), // parentId를 parentKey로 변환
        children: node.children || [],
      };

      // 자식 노드가 있는 경우 재귀적으로 변환
      if (node.children && node.children.length > 0) {
        transformedNode.children = transform(node.children);
      }

      return transformedNode;
    });
  };

  return transform(dataArray);
};

export const moveNodeCheck = (events: any) => {
  console.log('devents ', events);
  switch (events.position) {
    case 'BEFORE':
      if (events.sourceNode.level === events.targetNode.level) {
        return {
          tenantMappingMenuId: events.sourceNode.tenantMappingMenuId,
          destinationParentId: events.targetNode.parentKey,
          sortOrder: events.targetNode.sortOrder,
          menuScopeCode: '',
        };
      }
      break;
    case 'INSIDE':
      if (events.sourceNode.level === events.targetNode.level + 1) {
        return {
          tenantMappingMenuId: events.sourceNode.tenantMappingMenuId,
          destinationParentId: events.targetNode.key,
          sortOrder: 1,
          menuScopeCode: '',
        };
      }
      break;
    case 'AFTER':
      if (events.sourceNode.level === events.targetNode.level) {
        return {
          tenantMappingMenuId: events.sourceNode.tenantMappingMenuId,
          destinationParentId: events.targetNode.parentKey,
          sortOrder: events.targetNode.sortOrder + 1,
          menuScopeCode: '',
        };
      }
      break;
  }
  return undefined;
};
