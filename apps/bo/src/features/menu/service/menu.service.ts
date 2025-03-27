/**
 * API 응답 데이터에서 menuId를 key로 변환하고 isUsed 속성을 추가하는 함수
 * @param {any} apiData - API에서 받은 원본 데이터
 * @returns {TreeNode[]} - 트리 컴포넌트에 적합한 형태로 변환된 데이터
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
        title: node.title || node.menuCode, // title이 없으면 menuCode 사용
        isUsed: node.useYn === true, // useYn을 isUsed로 변환

        // 원본 데이터 속성 유지
        menuId: node.menuId,
        menuCode: node.menuCode,
        description: node.menuDesc,
        parentKey: node.parentId?.toString(), // parentId를 parentKey로 변환
        url: node.path,
        isPersonalInfo: node.personalDataContainYn === true,

        // 추가 속성
        code: node.menuCode,
        sortOrder: node.sortOrder,
        visiblePcYn: node.visiblePcYn,
        visibleMobileYn: node.visibleMobileYn,
        quickAccessAreaYn: node.quickAccessAreaYn,

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

/**
 * 트리 컴포넌트 데이터를 API 요청 형식으로 다시 변환하는 함수 (저장 시 사용)
 * @param {TreeNode[]} treeData - 트리 컴포넌트의 데이터
 * @returns {any} - API 요청에 적합한 형태로 변환된 데이터
 */
export const transformTreeDataToApiFormat = (treeData: any) => {
  if (!treeData) return [];

  const transform = (nodes: any) => {
    return nodes.map((node: any) => {
      // API 요청 형식의 객체 생성
      const apiNode = {
        menuId: parseInt(node.menuId || node.key),
        menuCode: node.menuCode || node.code,
        title: node.title,
        menuDesc: node.description,
        parentId: node.parentKey ? parseInt(node.parentKey) : null,
        path: node.url,
        personalDataContainYn: node.isPersonalInfo === true,
        useYn: node.isUsed === true,
        visiblePcYn: node.visiblePcYn !== false,
        visibleMobileYn: node.visibleMobileYn !== false,
        quickAccessAreaYn: node.quickAccessAreaYn === true,
        sortOrder: node.sortOrder || 0,
        children: node.children || [],
      };

      // 자식 노드가 있는 경우 재귀적으로 변환
      if (node.children && node.children.length > 0) {
        apiNode.children = transform(node.children);
      }

      return apiNode;
    });
  };

  return transform(treeData);
};
