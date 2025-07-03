import { useCreation } from 'ahooks';
import { useFetchCategories } from '../../../entities/category/service/category.hook';
import { convertHierarchyToList } from '@learnway/shared';

export function useCategories() {
  const { data } = useFetchCategories();

  return {
    data: useCreation(() => {
      if (!data || !data?.length) {
        return [];
      }

      return convertHierarchyToList(data);
    }, [data]),
  };
}
