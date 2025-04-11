import { UseQueryOptions } from '@tanstack/react-query';

import CategoryService from '@entities/category/api/category';
import { CategoryCreate, CategoryUpdate, CategoryMove } from '@types';

export const queryKeys = {
  all: ['category'] as const,
  detail: (id: number) => ['category', id] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async () => {
      const data = await CategoryService.getCategory();
      console.log('## get category :: ', data);

      if (!data) return null;
      return data;
    },
  }),
  detail: (id: number, mode: string) => ({
    queryKey: queryKeys.detail(id),
    enabled: mode === 'view',
    queryFn: async () => {
      const data = await CategoryService.getCategoryDetail(id);
      console.log('## get category detail :: ', data);
      if (!data) return null;
      return data;
    },
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: CategoryCreate) => CategoryService.createCategory(payload),
  }),
  // checkExistsMenu: () => ({
  //   mutationFn: (payload: any) => CategoryService.existsMenu(payload.menuCode, payload.parentId),
  // }),
  update: () => ({
    mutationFn: (payload: CategoryUpdate) => CategoryService.updateCategory(payload),
  }),
  delete: () => ({
    mutationFn: (payload: string) => CategoryService.deleteCategory(payload),
  }),
  move: () => ({
    mutationFn: (payload: CategoryMove) => CategoryService.moveCategory(payload),
  }),
};
