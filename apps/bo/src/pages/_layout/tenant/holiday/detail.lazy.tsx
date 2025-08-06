import { TenantUserApplicationDetail } from '@features/tenant-management/tenant/holiday/tenant-holiday-detail';
import { Button } from '@learnway/ui/button';
import { EnFormMode } from '@shared/types/enums';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui/layout';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { useRef } from 'react';

export const Route = createLazyFileRoute('/_layout/tenant/holiday/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const formRef = useRef(1);

  const handleSaveClick = () => {
    const detail: any = formRef.current;
    detail.saveData();
  };

  const handleResetClick = () => {
    const detail: any = formRef.current;
    detail.clearForm();
  };

  const handleRemoveClick = () => {
    const detail: any = formRef.current;
    detail.removeData();
  };

  const handleListClick = () => {
    router.navigate({ to: '/tenant/holiday' });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button variant="point" size="sm" onClick={handleListClick}>
            {t('LABEL.button.list')}
          </Button>
        </LinkBox>
        {routerState.location.state.mode !== EnFormMode.ADD && (
          <Button variant="point" size="sm" onClick={handleRemoveClick}>
            {t('삭제')}
          </Button>
        )}
        <Button variant="point" size="sm" onClick={handleResetClick}>
          {t('초기화')}
        </Button>
        <Button variant="primary" size="sm" onClick={handleSaveClick}>
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <TenantUserApplicationDetail ref={formRef} mode={EnFormMode.VIEW} />
      </MainContents>
    </PageContainer>
  );
}
