import { useState, useEffect, useRef } from 'react';
import { t } from 'i18next';
import { createLazyFileRoute, useRouterState, useRouter } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { ChannelDetail } from '@features/channel/channel-management/channel-detail';
import { MainContents, PageContainer, LinkBox, ContentsButtons } from '@shared/ui';
import { EnFormMode } from '@types';

export const Route = createLazyFileRoute('/_layout/tenant/channel/management/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  //const method = routerState.location.state?.method;
  //const channelUuid = routerState.location.state?.channelUuid;

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
        <ChannelDetail ref={formRef} mode={EnFormMode.ADD} />
      </MainContents>
    </PageContainer>
  );
}
