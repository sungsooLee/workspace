import { TreeNode } from '@learnway/ui';

export const handleExpandAll = (treeData: TreeNode[]) => {
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

export const getFirstExpandKeys = (treeData: TreeNode[]) => {
  if (treeData && treeData.length > 0) {
    const firstLevelKeys = treeData.map((node: TreeNode) => node.key);
    return firstLevelKeys;
  }
};

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
