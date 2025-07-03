import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './category.queries';
import { useRouter } from '@tanstack/react-router';
import { Category } from '../../../types/entities/category';

export function useFetchCategories() {
  return useQuery(queryOptions.all());
}

export const useCategoryNavigation = () => {
  const router = useRouter();

  const handleCategoryClick = (category: Category) => {
    router.navigate({
      to: '/category',
      state: {
        categoryId: category.categoryId.toString(),
      },
    });

    const recentCategories = JSON.parse(localStorage.getItem('recentCategories') || '[]');
    const updatedCategories = [
      category.categoryId,
      ...recentCategories.filter((id: number) => id !== category.categoryId),
    ].slice(0, 8);

    localStorage.setItem('recentCategories', JSON.stringify(updatedCategories));
  };

  return { handleCategoryClick };
};
