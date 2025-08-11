import { pageRouteConfig } from '@features/auth/index';
import { CategoryManage } from '@features/platform-management/platform/category-managemnet';
import { MainContents, PageContainer, SectionLayout } from '@shared/ui/layout';
import { createLazyFileRoute } from '@tanstack/react-router';

// TODO
// 삭제시 에러코드 확인하여 팝업 처리
// 다국어 처리
export const Route = createLazyFileRoute('/_layout/platform/category/')({
  component: RouteComponent,
  ...pageRouteConfig({}),
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <SectionLayout contentsRatio={'half'}>
          <CategoryManage />
        </SectionLayout>
      </MainContents>
    </PageContainer>
  );
}
