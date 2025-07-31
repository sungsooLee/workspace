import { convertHierarchyToList } from '@learnway/shared';
import { useCreation } from 'ahooks';
import { useFetchCategories } from '../../../entities/category/service/category.hook';

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
