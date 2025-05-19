import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';

import { pageRouteConfig } from '@features/auth/index';
import { MyPage } from '@features/user/my-page/ui/my-page';

/* company logo image */
// import imgLogo from '../../../../assets/images/temp/img_temp_company_logo.png';
export const Route = createFileRoute('/_layout/my-page/info/')({
  component: RouteComponent,
  ...pageRouteConfig({ meta: { title: '나의 정보' } }),
});

function RouteComponent() {
  return (
    <PageContainer hideOutLine={true}>
      {/* main_contents */}
      <MainContents>
        <MyPage />
      </MainContents>
    </PageContainer>
  );
}
