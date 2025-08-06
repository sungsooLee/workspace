import { ChannelDetailBase, EnChannelRegisterMethod } from '@features/channel';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { Button } from '@learnway/ui/button';
import { EnFormMode } from '@shared/types/enums';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui/layout';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect, useRef } from 'react';

export const Route = createLazyFileRoute('/_layout/tenant/channel/management/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const requestUuid = routerState.location.state?.requestUuid;

  const { data: loginUser } = useFetchAuthUser();

  useEffect(() => {
    if (!loginUser) return;
    if (
      loginUser.activeRole?.roleType !== 'PLATFORM_MANAGER' &&
      loginUser.activeRole?.roleType !== 'TENANT_MANAGER'
    )
      router.navigate({ to: '/tenant/channel/management' });
  }, [loginUser]);

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
            variant="point"
            size="sm"
            onClick={() => router.navigate({ to: '/tenant/channel/management' })}
            label={t('LABEL.button.list')}
          />
        </LinkBox>
        <Button variant="point" size="sm" onClick={handleOnReset} label={t('LABEL.button.reset')} />
        <Button variant="primary" size="sm" onClick={handleOnSave} label={t('LABEL.button.save')} />
      </ContentsButtons>
      <MainContents>
        <ChannelDetailBase
          ref={formRef}
          mode={EnFormMode.ADD}
          method={requestUuid ? EnChannelRegisterMethod.REQUEST : EnChannelRegisterMethod.MANUAL}
          requestId={requestUuid}
        />
      </MainContents>
    </PageContainer>
  );
}
