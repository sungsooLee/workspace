export const transformDepartmentApiDataToTreeData = (apiData: any) => {
  //const dataArray = Array.isArray(apiData) ? apiData : [apiData];
  const root = { deptId: 'root', deptName: 'ROOT', childList: [] };
  if (apiData && apiData.length > 0) {
    root.childList = apiData;
  }
  const dataArray = [root];

  const transform = (nodes: any) => {
    if (!nodes) return [];

    return nodes.map((node: any) => {
      // 새로운 노드 객체 생성
      const transformedNode = {
        ...node,
        // 필수 트리 속성
        key: node.deptId?.toString(),
        title: node.deptName,

        parentKey: node.parent || node.companyCode,
        children: node.childList || [],
        _nodeType: 'D',
      };

      if (!node.deptId && !node.parent) {
        //회사 노드
        transformedNode.parentKey = 'root';
        transformedNode.key = node.companyCode;
        transformedNode._nodeType = 'C';
      }

      // 자식 노드가 있는 경우 재귀적으로 변환
      if (node.childList && node.childList.length > 0) {
        transformedNode.children = transform(node.childList);
      }

      return transformedNode;
    });
  };
  const retva = transform(dataArray);
  console.log('transform', retva);
  return retva;
};
