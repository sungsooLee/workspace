import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useRef } from 'react';

import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';

import { CompanyUserDetail } from '@features/platform-management/company';
import { Button } from '@learnway/ui/button';

export const Route = createLazyFileRoute('/_layout/platform/tenant/user/detail')({
  component: RouteComponent });

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
        <Button label={t('LABEL.button.reset')} variant="gray2" size="sm" onClick={handleOnReset} />
        <Button label={t('LABEL.button.save')} variant="primary" size="sm" onClick={handleOnSave} />
      </ContentsButtons>
      <MainContents>
        <CompanyUserDetail formRef={formRef} listPath={'/platform/tenant/user'} />
      </MainContents>
    </PageContainer>
  );
}
