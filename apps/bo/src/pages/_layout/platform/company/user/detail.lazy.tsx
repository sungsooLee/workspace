import { CompanyUserDetail } from '@features/platform-management/company';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { useRef } from 'react';
import { Button } from '@learnway/ui/button';

export const Route = createLazyFileRoute('/_layout/platform/company/user/detail')({
  component: RouteComponent });

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const formRef = useRef<HTMLFormElement>(null);
  const handleOnSave = () => {
    if (formRef.current?.saveData) formRef.current.saveData();
  };

  const handleOnReset = () => {
    if (formRef.current?.clearForm) formRef.current.clearForm();
  };

  const handleListClick = () => {
    const listParam = routerState.location.state?.listParam;
    router.navigate({ to: '/platform/company/user', state: { listParam } });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            variant="point"
            size="sm"
            onClick={handleListClick}
            label={t('LABEL.button.list')}
          />
        </LinkBox>
        <Button variant="point" size="sm" onClick={handleOnReset} label={t('LABEL.button.reset')} />
        <Button variant="primary" size="sm" onClick={handleOnSave} label={t('LABEL.button.save')} />
      </ContentsButtons>
      <MainContents>
        <CompanyUserDetail formRef={formRef} listPath={'/platform/company/user'} />
      </MainContents>
    </PageContainer>
  );
}
