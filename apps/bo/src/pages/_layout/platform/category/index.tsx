import { createFileRoute } from '@tanstack/react-router';
import { CategoryManage } from '@features/platform/category';
import { pageRouteConfig } from '@features/auth/index';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { SectionLayout } from '@widgets/layout/ui/container/section-layout/section-layout';

// TODO
// 삭제시 에러코드 확인하여 팝업 처리
// 다국어 처리
export const Route = createFileRoute('/_layout/platform/category/')({
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
