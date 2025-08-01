import { useRef } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer, MainContents, ContentsButtons, LinkBox } from '@shared/ui';

import { CompanyDetail } from '@features/platform-management/company';
import { EnFormMode } from '@types';
import { Button } from '@learnway/ui/button';

export const Route = createLazyFileRoute('/_layout/platform/tenant/company/detail')({
  component: RouteComponent });

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
    router.navigate({ to: '/platform/tenant/company' });
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
        <CompanyDetail ref={formRef} mode={EnFormMode.VIEW} roleInfo={'TENANT'} />
      </MainContents>
    </PageContainer>
  );
}
