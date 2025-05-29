import { TreeNode } from '@learnway/ui';

export const getAllTreeKeys = (treeData: TreeNode[]) => {
  const recursive = (nodes: TreeNode[]): string[] => {
    return nodes.reduce((keys: string[], node) => {
      keys.push(node.key);
      if (node.children?.length) {
        keys.push(...recursive(node.children));
      }

      return keys;
    }, []);
  };
  return recursive(treeData);
};

export const deleteNodeByNode = (nodes: TreeNode[], node: TreeNode) => {
  const recervice = (d: any[]) => {
    const index = d.findIndex((item) => item.key === node.key);
    console.log('index', index);
    if (index !== -1) {
      d.splice(index, 1);
      return;
    }
    for (const i of d) {
      if (i.children && i.children.length > 0) {
        recervice(i.children);
      }
    }
  };
  recervice(nodes);
};

export const moveNodePosition = (event: any, predata: any) => {
  const map = genMap(predata);
  switch (event.position) {
    case 'INSIDE':
      {
        deleteNodeByNode(predata, event.sourceNode);
        const parent = map.get(event.targetNode.key);
        parent.children.splice(event.targetIndex, 0, event.sourceNode);
      }
      break;
    case 'BEFORE':
    case 'AFTER':
      {
        deleteNodeByNode(predata, event.sourceNode);
        const parent = map.get(event.targetNode.parentKey);
        parent.children.splice(event.targetIndex, 0, event.sourceNode);
      }
      break;
  }
};

export const copyTreeNode = (event: any, baseTree: any[], targetTree: any[]) => {
  const sourceKey = event.sourceNode.key;
  const allParents = getAllParent(baseTree, sourceKey);
  const oldCopyMenu: TreeNode[] = [...JSON.parse(JSON.stringify(targetTree))];
  const oldMap = genMap(oldCopyMenu);

  for (const item of allParents) {
    const newMenu = oldMap.get(item.key);
    if (!newMenu) {
      const parentMenu: any = oldMap.get(item.parentKey);
      if (parentMenu) {
        const newItem = JSON.parse(JSON.stringify(item));
        newItem.children = new Array<any>();
        parentMenu?.children.push(newItem);
        oldMap.set(newItem.key, newItem);
      }
    }
  }

  const copyMenu = oldMap.get(sourceKey);
  if (copyMenu) {
    copyMenu.children = JSON.parse(JSON.stringify(event.sourceNode.children));
  }

  return oldCopyMenu;
};

export const getAllParent = (nodes: TreeNode[], key: string): TreeNode[] => {
  const retval: TreeNode[] = [];
  const map = genMap(nodes);
  let parentKey = key;
  while (parentKey) {
    if (map.has(parentKey)) {
      const item = map.get(parentKey);
      retval.unshift(map.get(parentKey));
      parentKey = item.parentKey;
    }
  }
  return retval;
};

export const getAllParentAndChildrenByKey = (nodes: TreeNode[], key: string) => {
  const retval = getAllParent(nodes, key);
  const current = retval.at(-1);
  if (current?.children && current.children.length > 0) {
    getAllChildrens(current.children, retval);
  }
  return retval;
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

const recusiveAllParentAndChildren = (
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
      }
      return currentNodes;
    }
    if (node.children && node.children.length > 0) {
      const result: TreeNode[] = recusiveAllParentAndChildren(node.children, key, currentNodes);
      if (result.length > currentNodes.length) {
        return result;
      }
    }
  }
  return contains;
};

export const genMap = (nodes: TreeNode[]) => {
  const retMap = new Map();
  const recursive = (nodes: TreeNode[], map: Map<any, any>) => {
    nodes.forEach((item: TreeNode) => {
      map.set(item.key, item);
      if (item?.children && item?.children.length > 0) {
        recursive(item.children, map);
      }
    });
  };
  recursive(nodes, retMap);
  return retMap;
};

export const getNodeByKey = (nodes: TreeNode[], key: number | string): TreeNode | undefined => {
  for (const node of nodes) {
    if (node.key === key) {
      return node;
    }
    if (node?.children && node.children?.length > 0) {
      return getNodeByKey(node.children, key);
    }
  }
  return undefined;
};

export const getAllParentAndAllChildById = (nodes: TreeNode[], key: number | string) => {
  return recusiveAllParentAndChildren(nodes, key);
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
export const transformMenuApiDataToTreeData = (apiData: any) => {
  // 단일 노드인 경우 배열로 감싸기
  const dataArray = Array.isArray(apiData) ? apiData : [apiData];

  // 재귀적으로 데이터 구조 변환
  const transform = (nodes: any) => {
    if (!nodes) return [];

    return nodes.map((node: any) => {
      // 새로운 노드 객체 생성

      const transformedNode = {
        ...node,

        // 필수 트리 속성
        key: node.menuId.toString(), // menuId를 key로 사용
        title: node.menuName || node.menuCode, // title이 없으면 menuCode 사용
        parentKey: node.parentId?.toString(), // parentId를 parentKey로 변환
        children: node.children || [],
        original: node,
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

export const transformRoleMenuApiDataToTreeData = (apiData: any) => {
  // 단일 노드인 경우 배열로 감싸기
  const dataArray = Array.isArray(apiData) ? apiData : [apiData];

  // 재귀적으로 데이터 구조 변환
  const transform = (nodes: any) => {
    if (!nodes) return [];

    return nodes.map((node: any) => {
      // 새로운 노드 객체 생성
      const transformedNode = {
        ...node,
        // 필수 트리 속성
        key: node.menuId, // menuId를 key로 사용
        title: node.menuName, // title이 없으면 menuCode 사용
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
  const targetIndex = events.targetIndex + 1;
  const retValue = {
    tenantMappingMenuId: events.sourceNode.tenantMappingMenuId,
    sortOrder: targetIndex,
    menuScopeCode: '',
  };

  switch (events.position) {
    case 'BEFORE': {
      if (events.sourceNode.level === events.targetNode.level) {
        return { ...retValue, destinationParentId: events.targetNode.parentKey };
      }
      break;
    }
    case 'INSIDE':
      if (events.sourceNode.level === events.targetNode.level + 1) {
        return {
          ...retValue,
          destinationParentId: events.targetNode.key,
        };
      }
      break;
    case 'AFTER':
      if (events.sourceNode.level === events.targetNode.level) {
        return {
          ...retValue,
          destinationParentId: events.targetNode.parentKey,
        };
      }
      break;
  }
  return undefined;
};

export const transformRoleApiDataToTreeData = (apiData: any) => {
  // const dataArray = Array.isArray(apiData) ? apiData : [apiData];
  const dataArray = [{ roleId: 'root', name: 'ROOT', children: [...apiData] }];

  const transform = (nodes: any) => {
    if (!nodes) return [];

    return nodes.map((node: any) => {
      // 새로운 노드 객체 생성
      const transformedNode = {
        ...node,
        // 필수 트리 속성
        key: node.roleId, // menuId를 key로 사용
        title: node.name, // title이 없으면 menuCode 사용

        parentKey: node.parentRoleId || 'root', // parentRoleId를 parentKey로 변환
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

export const moveRoleCheck = (events: any) => {
  const targetIndex = events.targetIndex + 1;
  return {
    roleCode: events.sourceNode.roleCode,
    body: {
      sortOrder: targetIndex,
      parentRoleId:
        events.targetNode.level === events.sourceNode.level
          ? events.targetNode.parentRoleId
          : events.targetNode.roleId,
    },
  };
};
