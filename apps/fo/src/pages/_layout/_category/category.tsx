import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import { CategoryDetail } from '@features/category/ui/category-detail';
import { CategoryDetail as MobileCategoryDetail } from '@features/category/m.ui/category-detail';

export interface CategoryDetailComponentProps {
  categoryId: number
}

export const Route = createFileRoute('/_layout/_category/category')({
  component: RouteComponent,
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
