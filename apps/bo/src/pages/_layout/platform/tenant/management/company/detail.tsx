import { useRef } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer, MainContents, ContentsButtons, LinkBox } from '@widgets/layout';

import { Button } from '@learnway/ui';

import { CompanyDetail } from '@features/platform/company';

export const Route = createFileRoute('/_layout/platform/tenant/management/company/detail')({
  component: RouteComponent,
});

/**
 * 화면번호: NLP_BO_TMS_1111_20
 * @returns
 */
function RouteComponent() {
  const router = useRouter();

  const formRef = useRef(1);

  const handleSaveClick = () => {
    const detail: any = formRef.current;
    detail.saveData();
  };

  const handleListClick = () => {
    router.navigate({ to: '/platform/tenant/management/company' });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button variant="point" size="sm" onClick={handleListClick}>
            {t('LABEL.button.list')}
          </Button>
        </LinkBox>
        <Button variant="primary" size="sm" onClick={handleSaveClick}>
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <CompanyDetail ref={formRef} mode="view" />
      </MainContents>
    </PageContainer>
  );
}
