import {  useRouter } from '@tanstack/react-router';
import { Category } from '../../../types';
import { useEffect, useState } from 'react';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { useCategoryTree } from '@entities/category';

function useCategoryBreadcrumbs(currentCategoryId: number | null, tenantId: number) {
  const { data: categories } = useCategoryTree(tenantId);

  const findCategoryPath = (categoryId: number) => {
    const path: Category[] = [];

    const findParent = (categories: Category[], targetId: number) => {
      for (const category of categories) {
        if (category.id === targetId) {
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
      findParent(categories?.tree.children, categoryId);
    }

    return path;
  };

  const breadcrumbPath = currentCategoryId ? findCategoryPath(currentCategoryId) : [];

  return breadcrumbPath;
}

function useShowBreadcrumbs() {
  const { data: loginUser } = useFetchAuthUser();
  const router = useRouter();
  const [shouldShow, setShouldShow] = useState({
    isShow: false,
    tenantId: 0
  });

  useEffect(() => {
    const unsubscribe = router.subscribe('onResolved', () => {
      const currentPath = router.state.location.pathname;
      setShouldShow({
        isShow: currentPath.includes('/category'),
        tenantId: (loginUser && loginUser.activeTenant) ? loginUser?.activeTenant?.tenantId : 0
      });
    });

    setShouldShow({
      isShow: router.state.location.pathname.includes('/category'),
      tenantId: (loginUser && loginUser.activeTenant) ? loginUser?.activeTenant?.tenantId : 0
    });

    return () => {
      unsubscribe();
    };
  }, [router, loginUser]);

  return shouldShow;
}

export { useCategoryBreadcrumbs, useShowBreadcrumbs };
