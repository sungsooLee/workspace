import { ChannelDetail, EnChannelRegisterMethod } from '@features/channel';
import { Button } from '@learnway/ui';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { EnFormMode } from '@types';
import { t } from 'i18next';
import { useRef } from 'react';

export const Route = createLazyFileRoute('/_layout/tenant/channel/management/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const requestUuid = routerState.location.state?.requestUuid;

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
          >
            {t('LABEL.button.list')}
          </Button>
        </LinkBox>
        <Button variant="point" size="sm" onClick={handleOnReset}>
          {t('LABEL.button.reset')}
        </Button>
        <Button variant="primary" size="sm" onClick={handleOnSave}>
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <ChannelDetail
          ref={formRef}
          mode={EnFormMode.ADD}
          method={requestUuid ? EnChannelRegisterMethod.REQUEST : EnChannelRegisterMethod.MANUAL}
          requestId={requestUuid}
        />
      </MainContents>
    </PageContainer>
  );
}
