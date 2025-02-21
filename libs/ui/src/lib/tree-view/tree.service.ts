import { NodeMovePositionType, TreeNode } from './type';

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
export const isValidDrop = (draggedKey: string, targetKey: string, nodes: TreeNode[]): boolean => {
  if (draggedKey === targetKey) return false;

  const targetPath = findNodePath(nodes, targetKey);
  if (!targetPath) return true;

  return !targetPath.includes(draggedKey);
};

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
