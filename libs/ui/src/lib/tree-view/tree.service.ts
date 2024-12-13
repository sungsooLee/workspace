// utils.ts
import { TreeNode } from './type';

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
const findNodePath = (
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
