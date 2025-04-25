import { NodeMovePositionType, TreeNode, TreeType } from './type';

export const generateKey = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * 트리에서 특정 키를 가진 노드를 찾아서 반환.
 * @param nodes 검색할 노드 배열
 * @param key 찾을 노드 키
 * @returns
 */
export const findNodeByKey = (nodes: TreeNode[], key: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.key === key) return { ...node }; // 스프레드 연산을 사용해서 깊은 복사본 반환
    if (node.children) {
      const found = findNodeByKey(node.children, key);
      if (found) return found;
    }
  }
  return null;
};

/**
 * 트리에서 특정 키 배열을 가진 노드를 찾아서 반환.
 */
export const findNodesByKeys = (nodes: TreeNode[], keys: string[]): TreeNode[] => {
  const result: TreeNode[] = [];

  const searchNodes = (nodeArray: TreeNode[]) => {
    for (const node of nodeArray) {
      if (keys.includes(node?.apiUuid)) {
        result.push(node);
      }
      if (node.children && node.children.length > 0) {
        searchNodes(node.children);
      }
    }
  };
  searchNodes(nodes);
  return result;
};

/**
 * 트리에서 특정 키를 가진 노드 제거
 * @param nodes 제거할 노드 배열
 * @param key 제거할 노드 키
 * @returns
 */
export const removeNodeByKey = (nodes: TreeNode[], key: string): TreeNode[] => {
  const result: TreeNode[] = [];

  for (const node of nodes) {
    if (node.key === key) continue;

    const newNode = { ...node };

    if (node.children && node.children.length > 0) {
      newNode.children = removeNodeByKey([...node.children], key);
    }

    result.push(newNode);
  }

  return result;
};

/**
 * 특정 부모 노드에 새로운 자식 노드 추가
 * @param nodes
 * @param parentKey
 * @param newNode
 * @returns
 */
export const addNodeToParent = (
  nodes: TreeNode[],
  parentKey: string | null,
  newNode: TreeNode,
): TreeNode[] => {
  if (parentKey === null) {
    return [...nodes, { ...newNode }];
  }

  return nodes.map((node) => {
    if (node.key === parentKey) {
      return {
        ...node,
        children: [...(node.children || []), { ...newNode }],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addNodeToParent([...node.children], parentKey, newNode),
      };
    }
    return node;
  });
};

/**
 * 특정 노드의 데이터를 업데이트한다.
 * @param nodes
 * @param key
 * @param updates
 * @returns
 */
export const updateNodeByKey = (
  nodes: TreeNode[],
  key: string,
  updates: Partial<TreeNode>,
): TreeNode[] => {
  return nodes.map((node) => {
    if (node.key === key) {
      return { ...node, ...updates };
    }
    if (node.children) {
      return {
        ...node,
        children: updateNodeByKey([...node.children], key, updates),
      };
    }
    return node;
  });
};

/**
 * 특정 노드까지의 경로 찾기.
 * @param nodes
 * @param targetKey
 * @param path 현재까지의 경로
 * @returns
 */
export const findNodePath = (
  nodes: TreeNode[],
  targetKey: string,
  path: string[] = [],
): string[] | null => {
  for (const node of nodes) {
    if (node.key === targetKey) {
      return [...path, node.key];
    }
    if (node.children) {
      const foundPath = findNodePath(node.children, targetKey, [...path, node.key]);
      if (foundPath) {
        return foundPath;
      }
    }
  }
  return null;
};

/**
 * 드래그앤드랍 동작 유효한지 체크
 * @param draggedKey
 * @param targetKey
 * @param nodes
 * @returns
 */
// export const isValidDrop = (draggedKey: string, targetKey: string, nodes: TreeNode[]): boolean => {
//   if (draggedKey === targetKey) return false;

//   const targetPath = findNodePath(nodes, targetKey);
//   if (!targetPath) return true;

//   return !targetPath.includes(draggedKey);
// };

export const insertNodeAtPosition = (
  nodes: TreeNode[],
  targetKey: string,
  newNode: TreeNode,
  position: NodeMovePositionType,
): TreeNode[] => {
  const result: TreeNode[] = [];
  for (const node of nodes) {
    if (node.key === targetKey) {
      if (position === 'INSIDE') {
        result.push({ ...node, children: [...(node.children || []), newNode] });
      } else if (position === 'BEFORE') {
        result.push(newNode, node);
      } else if (position === 'AFTER') {
        result.push(node, newNode);
      }
    } else {
      result.push({
        ...node,
        children: node.children
          ? insertNodeAtPosition(node.children, targetKey, newNode, position)
          : undefined,
      });
    }
  }
  return result;
};

// export const insertNodeAtPosition = (
//   nodes: TreeNode[],
//   targetKey: string | null,
//   newNode: TreeNode,
//   position?: NodeMovePositionType,
// ): TreeNode[] => {
//   for (let i = 0; i < nodes.length; i++) {
//     const node = nodes[i];
//     if (node.key === targetKey) {
//       const result = [...nodes];
//       switch (position) {
//         case 'BEFORE' as NodeMovePositionType:
//           result.splice(i, 0, newNode);
//           return result;
//         case 'INSIDE' as NodeMovePositionType:
//           return addNodeToParent(nodes, targetKey, newNode);
//         case 'AFTER' as NodeMovePositionType:
//           result.splice(i + 1, 0, newNode);
//           return result;
//         default:
//           result.splice(i + 1, 0, newNode);
//           return result;
//       }
//     }
//   }

//   return nodes.map((node) => {
//     if (!node.children) return node;

//     return {
//       ...node,
//       children: insertNodeAtPosition(node.children, targetKey, newNode, position),
//     };
//   });
// };

export const findSiblingNodes = (nodes: TreeNode[], targetKey: string): TreeNode[] => {
  if (nodes.some((node) => node.key === targetKey)) {
    return nodes;
  }

  for (const node of nodes) {
    if (node.children) {
      if (node.children.some((child) => child.key === targetKey)) {
        return node.children;
      }
      const found = findSiblingNodes(node.children, targetKey);
      if (found.length > 0) return found;
    }
  }

  return [];
};

/**
 * dnd 하려는 index값
 * @param nodes
 * @param targetKey
 * @param position
 * @returns
 */
export const getTargetIndex = (nodes: TreeNode[], targetKey: string, position: string): number => {
  const siblings = findSiblingNodes(nodes, targetKey);

  const targetIndex = siblings.findIndex((node) => node.key === targetKey);

  if (position === 'before') {
    return targetIndex;
  }

  return targetIndex + 1;
};

/**
 * 노드에 트리 아이디 추가 (추후 API에서 가져올 것 같음.)
 * @param nodes
 * @param treeId
 * @returns
 */
export const addTreeId = (nodes: TreeNode[], treeId: string): TreeNode[] => {
  return nodes.map((node) => ({
    ...node,
    treeId,
    children: node.children ? addTreeId(node.children, treeId) : undefined,
  }));
};

/**
 * 특정 노드의 부모 노드를 찾음
 * @param nodes 트리 노드 배열
 * @param key 찾을 노드 키
 * @returns 부모 노드 또는 null
 */
export const findParentNode = (nodes: TreeNode[], key: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.children && node.children.some((child) => child.key === key)) {
      return node;
    }
    if (node.children) {
      const parent = findParentNode(node.children, key);
      if (parent) return parent;
    }
  }
  return null;
};
/**
 * 특정 노드의 레벨을 계산
 * @param nodes 트리 노드 배열
 * @param key 찾을 노드 키
 * @returns 노드의 레벨 (0부터 시작)
 */
export const getNodeLevel = (nodes: TreeNode[], key: string): number => {
  const path = findNodePath(nodes, key);
  return path ? path.length - 1 : -1;
};

export const getNodeWithLevel: any = (nodes: TreeNode[], nodeKey: string, currentLevel = 0) => {
  for (const node of nodes) {
    if (node.key === nodeKey) {
      return { ...node, level: currentLevel };
    }

    if (node.children?.length) {
      const foundNode = getNodeWithLevel(node.children, nodeKey, currentLevel + 1);
      if (foundNode) return foundNode;
    }
  }
  return null;
};

export const isValidDrop = (
  sourceKey: string,
  targetKey: string,
  treeData: TreeNode[],
  dropPosition: string,
  treeType?: TreeType,
) => {
  // 1. Prevent dropping onto itself
  if (sourceKey === targetKey) return false;

  // 2. Prevent dropping into its own descendants
  const sourcePath = findNodePath(treeData, sourceKey);
  const targetPath = findNodePath(treeData, targetKey);

  if (!sourcePath || !targetPath) return false;

  if (targetPath.includes(sourceKey)) return false;

  // New validation for SAME_LEVEL_ONLY type
  if (treeType === 'SAME_LEVEL_ONLY') {
    const sourceNode = getNodeWithLevel(treeData, sourceKey);
    const targetNode = getNodeWithLevel(treeData, targetKey);

    if (!sourceNode || !targetNode) return false;

    // For "INSIDE" drops, the target level + 1 should equal the source level
    // because we're checking if we can drop inside that target node at the next level
    if (dropPosition === 'INSIDE') {
      return sourceNode.level === targetNode.level + 1;
    }

    return sourceNode.level === targetNode.level;
  } else if (treeType === 'SAME_PARENT_ONLY') {
    //같은 부모 안에서 이동
    const sourceParent = findParentNode(treeData, sourceKey);
    const targetParent = findParentNode(treeData, targetKey);

    if (!sourceParent || !targetParent) return false;

    // INSIDE 액션이면 타켓 키와 소스 부모키가 같으면 됨.
    if (dropPosition === 'INSIDE') {
      return sourceParent.key === targetKey;
    }

    console.log('소스 부모' + sourceParent.key);
    console.log('타겟 부모' + targetParent.key);
    return sourceParent.key === targetParent.key;
  }

  return true;
};

/**
 * 노드의 부모에서 해당 노드의 인덱스를 찾습니다
 */
export const findNodeIndex = (nodes: TreeNode[], nodeKey: string): number => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].key === nodeKey) {
      return i;
    }

    if (nodes[i].children?.length) {
      const index = findNodeIndex(nodes[i].children || [], nodeKey);
      if (index !== -1) {
        return index;
      }
    }
  }
  return -1;
};
/**
 * 노드 이동 시 목표 인덱스를 계산합니다
 */
export const calculateTargetIndex = (
  treeData: TreeNode[],
  targetNode: TreeNode,
  dropPosition: NodeMovePositionType,
): { parentKey: string | null; index: number } => {
  // 상위 노드가 루트인지 확인
  const isTargetRoot = !findParentNode(treeData, targetNode.key);

  // INSIDE의 경우 항상 마지막 인덱스로 이동
  if (dropPosition === 'INSIDE') {
    return {
      parentKey: targetNode.key,
      index: targetNode.children?.length || 0,
    };
  }

  // 부모 노드 찾기 (또는, 루트인 경우 null)
  const parentNode = isTargetRoot ? null : findParentNode(treeData, targetNode.key);
  const siblings = isTargetRoot ? treeData : parentNode?.children || [];

  // 대상 노드의 인덱스 찾기
  const targetIndex = siblings.findIndex((node) => node.key === targetNode.key);

  if (targetIndex === -1) {
    return { parentKey: isTargetRoot ? null : parentNode?.key || null, index: 0 };
  }

  // BEFORE: 대상 노드 앞으로 이동
  if (dropPosition === 'BEFORE') {
    return {
      parentKey: isTargetRoot ? null : parentNode?.key || null,
      index: targetIndex,
    };
  }

  // AFTER: 대상 노드 뒤로 이동
  return {
    parentKey: isTargetRoot ? null : parentNode?.key || null,
    index: targetIndex + 1,
  };
};

/**
 * 트리의 모든 키를 갖고 옴.
 * @param treeData
 * @returns
 */
export const getAllKeysByTree = (treeData: TreeNode[]) => {
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

/**
 * 특정 레벨까지의 모든 트리 키를 반환함 (1~level까지 포함)
 * @param treeData
 * @param level
 * @returns
 */
export const getKeysByLevel = (treeData: TreeNode[], level: number, currentLevel = 1): string[] => {
  if (!treeData || treeData.length === 0 || currentLevel > level) {
    return [];
  }

  // 현재 레벨의 키들
  const currentLevelKeys = treeData.map((node: TreeNode) => node.key);

  // 자식 노드들에서 다음 레벨의 키를 찾음
  const childrenKeys: string[] = [];
  if (currentLevel < level) {
    treeData.forEach((node: TreeNode) => {
      if (node.children && node.children.length > 0) {
        const keys = getKeysByLevel(node.children, level, currentLevel + 1);
        childrenKeys.push(...keys);
      }
    });
  }

  // 현재 레벨의 키와 자식 노드들의 키를 합침
  return [...currentLevelKeys, ...childrenKeys];
};
