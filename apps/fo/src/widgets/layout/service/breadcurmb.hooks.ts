import {  useRouter } from '@tanstack/react-router';
import { useCategories } from '../../../features/category';
import { Category } from '../../../types';
import { useEffect, useState } from 'react';

function useCategoryBreadcrumbs(currentCategoryId: number | null) {
  const { data: categories } = useCategories();

  const findCategoryPath = (categoryId: number) => {
    const path: Category[] = [];

    const findParent = (categories: Category[], targetId: number) => {
      for (const category of categories) {
        if (category.categoryId === targetId) {
          path.unshift(category);
          return true;
        }

        if (category.children) {
          if (findParent(category.children as Category[], targetId)) {
            path.unshift(category);
            return true;
          }
        }
      }
      return false;
    };

    if (currentCategoryId) {
      findParent(categories, currentCategoryId);
    }

    return path;
  };

  const breadcrumbPath = currentCategoryId ? findCategoryPath(currentCategoryId) : [];

  return breadcrumbPath;
}

function useShowBreadcrumbs() {
  const router = useRouter();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const unsubscribe = router.subscribe('onResolved', () => {
      const currentPath = router.state.location.pathname;
      setShouldShow(currentPath.includes('/category'));
    });

    setShouldShow(router.state.location.pathname.includes('/category'));

    return () => {
      unsubscribe();
    };
  }, [router]);

  return shouldShow;
}

export { useCategoryBreadcrumbs, useShowBreadcrumbs };
