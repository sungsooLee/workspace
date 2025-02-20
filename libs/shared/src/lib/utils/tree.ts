import { isArray } from 'lodash';

export function convertHierarchyToList(
  tree: any,
  convertFn?: (node: any, depth: number, index: number, parentNode?: any) => [any, any[]],
  childProperty = 'children',
) {
  const recursiveCall = (arr: any[], r: any[], depth = 0, parentNode?: any) => {
    if (!arr?.length) {
      return;
    }
    depth++;

    arr.forEach((node: any, index: number) => {
      if (convertFn) {
        r.push(convertFn(node, depth, index, parentNode));
      } else {
        r.push(node);
      }

      if (node?.[childProperty]?.length > 0) {
        recursiveCall(node[childProperty], r, depth, node);
      }
    });
  };

  const nodes: any[] = [];
  recursiveCall(isArray(tree) ? tree : [tree], nodes);

  return nodes;
}

export function convertHierarchyNode(
  tree: any,
  convertFn: (node: any, depth: number, index: number, parentNode?: any) => [any, any[]],
  childProperty = 'children',
) {
  if (!tree) {
    return;
  }
  let index = 0;
  const recursiveCall = (hierarchyData: any[], r: any, depth = 0, parentNode?: any) => {
    if (!hierarchyData?.length) {
      return;
    }
    depth++;
    hierarchyData.forEach((data: any) => {
      const [node, children] = convertFn(data, depth, index, parentNode);
      index++;
      r.push(node);
      if (children && children?.length > 0) {
        node[childProperty] = [];
        recursiveCall(children, node[childProperty], depth, node);
      }
    });
  };
  const convertTree: any = [];
  recursiveCall(isArray(tree) ? tree : [tree], convertTree);

  return isArray(tree) ? convertTree : convertTree[0];
}
