export const transformDepartmentApiDataToTreeData = (apiData: any) => {
  //const dataArray = Array.isArray(apiData) ? apiData : [apiData];
  const dataArray = [{ deptCode: 'root', deptName: 'ROOT', childList: [...apiData] }];

  const transform = (nodes: any) => {
    if (!nodes) return [];

    return nodes.map((node: any) => {
      // 새로운 노드 객체 생성
      const transformedNode = {
        ...node,
        // 필수 트리 속성
        key: node.deptCode, // menuId를 key로 사용
        title: node.deptName, // title이 없으면 menuCode 사용

        parentKey: node.parent || 'root', // parentRoleId를 parentKey로 변환
        children: node.childList || [],
      };

      // 자식 노드가 있는 경우 재귀적으로 변환
      if (node.childList && node.childList.length > 0) {
        transformedNode.children = transform(node.childList);
      }

      return transformedNode;
    });
  };

  return transform(dataArray);
};
