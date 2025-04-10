import { convertHierarchyNode, getRandomId } from '@learnway/shared';
import CategoryService from '../api/category';

export const queryKeys = {
  all: ['categories'] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5분
    queryFn: async () => {
      const data = await CategoryService.getCategories('tenantNo');
      return convertHierarchyNode(
        data,
        (node: any, depth: number, index: number, parentNode?: any) => {
          node['depth'] = depth;
          node['parentNode'] = parentNode;
          if (!node?.key) {
            node['key'] = getRandomId();
          }
          return [node, node.children];
        },
      );
    },
  }),
};
