import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';

import { TenantUserRegist } from '@features/platform-management/tenant';
import { Button } from '@learnway/ui/button';
import { useRef } from 'react';

export const Route = createLazyFileRoute('/_layout/platform/tenant/user/user-regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleOnSave = () => {
    if (formRef.current?.saveData) formRef.current.saveData();
  };

  const handleOnReset = () => {
    if (formRef.current?.clearForm) formRef.current.clearForm();
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            label={t('LABEL.button.list')}
            variant="gray2"
            size="sm"
            onClick={() => router.navigate({ to: '/platform/tenant/user' })}
          />
        </LinkBox>
        <Button variant="gray2" size="sm" onClick={handleOnReset}>
          {t('LABEL.button.reset')}
        </Button>
        <Button variant="primary" size="sm" onClick={handleOnSave}>
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <TenantUserRegist ref={formRef} />
      </MainContents>
    </PageContainer>
  );
}
