import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { pageRouteConfig } from '@features/auth/index';
import { MyPage } from '@features/user/my-page/ui/my-page';
import { Button } from '@learnway/ui/button';
import { useTranslation } from 'react-i18next';

/* company logo image */
// import imgLogo from '../../../../assets/images/temp/img_temp_company_logo.png';
export const Route = createFileRoute('/_layout/my-page/info/')({
  component: RouteComponent,
  ...pageRouteConfig({}),
});

function RouteComponent() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <PageContainer hideOutLine={true}>
      {/* main_contents */}
      <ContentsButtons>
        <Button
          variant="point"
          size="sm"
          onClick={() => router.history.canGoBack() && router.history.back()}
        >
          {t('LABEL.button.previous')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <MyPage />
      </MainContents>
    </PageContainer>
  );
}
