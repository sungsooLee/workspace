import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import { CategoryDetail } from '@features/category/ui/category-detail';
import { CategoryDetailM as MobileCategoryDetail } from '@features/category/m.ui/category-detail';
import { pageRouteConfig } from '@features/auth';

export const Route = createFileRoute('/_layout/_category/category')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      mobile: {
        showHeader: false,
        showMainFooter: false,
        showFooter: false,
      }
    },
  })
});

function RouteComponent() {
  const routerState = useRouterState()
  const categoryId = routerState.location.state.categoryId;
  return (
    <>
      {
        isMobile ? <MobileCategoryDetail categoryId={categoryId} /> : <CategoryDetail categoryId={categoryId}/>
      }
    </>
  )
}
