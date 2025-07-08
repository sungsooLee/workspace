import { findNodeByKey, findNodePath, TreeNode } from '@learnway/ui';
import type { Category, CategoryCreate } from '@types';

/**
 * API 응답 데이터에서 menuId를 key로 변환하고 isUsed 속성을 추가하는 함수
 * @param {any} apiData - API에서 받은 원본 데이터
 * @returns {TreeNode[]} - 트리 컴포넌트에 적합한 형태로 변환된 데이터
 */
export const transformApiDataToTreeData = (apiData: any) => {
  console.log('## apiData', apiData);

  // 단일 노드인 경우 배열로 감싸기
  const dataArray = Array.isArray(apiData) ? apiData : [apiData];
  console.log('## dataArray', dataArray);
  // 재귀적으로 데이터 구조 변환
  const transform = (nodes: any) => {
    if (!nodes) return [];

    return nodes.map((node: any) => {
      // 새로운 노드 객체 생성
      const transformedNode = {
        ...node,
        // 필수 트리 속성
        key: node.id?.toString(),
        title: node.name,
        children: node.children || [],
        isUsed: true, // TODO
        menuId: node.id?.toString(),
        // 추가 속성
        code: node.id,
        sortOrder: node.sortSeq,
      };

      // 자식 노드가 있는 경우 재귀적으로 변환
      if (node.children && node.children.length > 0) {
        node.children = node.children.map((n: any) => ({
          ...n,
          parentKey: node.id?.toString(),
          parentMenuName: node.name,
        }));
        transformedNode.children = transform(node.children);
      }

      return transformedNode;
    });
  };

  return transform(dataArray);
};

/**
 * 특정 메뉴 ID를 가진 노드까지의 경로를 제목으로 찾습니다.
 * @param nodes 검색할 노드 배열
 * @param menuId 찾을 메뉴 ID
 * @param titles 현재까지의 제목 배열 (재귀 호출용)
 * @returns 경로 제목 문자열 (예: "홈 > 사용자 관리 > 권한 관리")
 */
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

/**
 * 트리에서 특정 menuId를 가진 노드를 찾아서 반환.
 * @param nodes 검색할 노드 배열
 * @param menuId 찾을 노드의 menuId
 * @returns 찾은 노드 또는 null
 */
export const findNodeByMenuId = (nodes: TreeNode[], menuId: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.menuId && node.menuId.toString() === menuId) return { ...node };
    if (node.children) {
      const found = findNodeByMenuId(node.children, menuId);
      if (found) return found;
    }
  }
  return null;
};

export const treeExpandAll = (
  expand: boolean,
  treeData: TreeNode[],
  onExpandChange: (keys: string[]) => void,
) => {
  if (expand) {
    // 모든 노드 키 수집
    const getAllKeys = (nodes: TreeNode[]): string[] => {
      return nodes.reduce((keys: string[], node) => {
        keys.push(node.key);
        if (node.children?.length) {
          keys.push(...getAllKeys(node.children));
        }
        return keys;
      }, []);
    };

    const allKeys = getAllKeys(treeData);
    onExpandChange(allKeys);
  } else {
    // 모두 축소
    onExpandChange([]);
  }
};
