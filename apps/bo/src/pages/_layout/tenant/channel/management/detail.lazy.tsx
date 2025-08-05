import {
  ChannelDetailBase,
  ChannelDetailBoard,
  ChannelDetailHome,
  ChannelDetailRole,
} from '@features/channel';
import { ChannelDetailSubscriber } from '@features/channel/channel-management/channel-detail-subscriber';
import { ChannelDetailUser } from '@features/channel/channel-management/channel-detail-user';
import { ChannelDetailUserGroup } from '@features/channel/channel-management/channel-detail-user-group';
import { Button } from '@learnway/ui/button';
import { Tabs } from '@learnway/ui/tabs';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { EnFormMode } from '@types';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';

// 등록 / 초기화,저장 / 구독 해지
export enum EnButtonLayout {
  REGISTER = 'REGISTER',
  RESET_AND_SAVE = 'RESET_AND_SAVE',
  CANCEL_SUBSCRIBE = 'CANCEL_SUBSCRIBE',
  NONE = 'NONE',
}

enum EnTabKeys {
  BASE = 'BASE',
  USER = 'USER',
  HOME = 'HOME',
  BOARD = 'BOARD',
  SUBSCRIBER = 'SUBSCRIBER',
  MANAGER_ROLE = 'MANAGER_ROLE',
  USER_GROUP = 'USER_GROUP',
}

export const Route = createLazyFileRoute('/_layout/tenant/channel/management/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;
  const [currentTab, setCurrentTab] = useState(EnTabKeys.BASE);

  useEffect(() => {
    if (!channelUuid) router.navigate({ to: '/tenant/channel/management' });
  }, []);

  const baseFormRef = useRef<HTMLFormElement>(null);
  const userFormRef = useRef<HTMLFormElement>(null);
  const homeFormRef = useRef<HTMLFormElement>(null);
  const boardFormRef = useRef<HTMLFormElement>(null);
  const subscriberFormRef = useRef<HTMLFormElement>(null);
  const userGroupFormRef = useRef<HTMLFormElement>(null);

  const getFormRef = () => {
    switch (currentTab) {
      case EnTabKeys.BASE:
        return baseFormRef;
      case EnTabKeys.USER:
        return userFormRef;
      case EnTabKeys.HOME:
        return homeFormRef;
      case EnTabKeys.BOARD:
        return boardFormRef;
      case EnTabKeys.SUBSCRIBER:
        return subscriberFormRef;
      case EnTabKeys.USER_GROUP:
        return userGroupFormRef;
    }
    return undefined;
  };

  const handleOnList = () => {
    const listParam = routerState.location.state?.listParam;
    router.navigate({ to: '/tenant/channel/management', state: { listParam } });
  };

  const handleOnSave = () => {
    const formRef = getFormRef();
    if (formRef?.current?.saveData) formRef.current.saveData();
  };

  const handleOnReset = () => {
    const formRef = getFormRef();
    if (formRef?.current?.clearForm) formRef.current.clearForm();
  };

  const handleOnRegister = () => {
    const formRef = getFormRef();
    if (formRef?.current?.register) formRef.current.register();
  };

  const handleOnCancelSubscribe = () => {
    const formRef = getFormRef();
    if (formRef?.current?.cancelSubscribe) formRef.current.cancelSubscribe();
  };

  const [buttonLayout, setButtonLayout] = useState(EnButtonLayout.NONE);

  const handleButtonLayoutChange = (layout: EnButtonLayout) => {
    setButtonLayout(layout);
  };

  const handleOnTabChange = (value: string) => {
    const tabKey = Object.values(EnTabKeys).find((enumValue) => enumValue === value) as EnTabKeys;
    setCurrentTab(tabKey);
  };

  const menuItems = [
    {
      title: t('기본 정보'),
      key: EnTabKeys.BASE,
      content: (
        <ChannelDetailBase
          ref={baseFormRef}
          mode={EnFormMode.VIEW}
          onButtonLayoutChange={handleButtonLayoutChange}
        />
      ),
    },
    {
      title: t('사용자 관리'),
      key: EnTabKeys.USER,
      content: (
        <ChannelDetailUser ref={userFormRef} onButtonLayoutChange={handleButtonLayoutChange} />
      ),
    },
    {
      title: t('홈 설정'),
      key: EnTabKeys.HOME,
      content: (
        <ChannelDetailHome ref={homeFormRef} onButtonLayoutChange={handleButtonLayoutChange} />
      ),
    },
    {
      title: t('게시판 관리'),
      key: EnTabKeys.BOARD,
      content: (
        <ChannelDetailBoard ref={boardFormRef} onButtonLayoutChange={handleButtonLayoutChange} />
      ),
    },
    {
      title: t('구독자 관리'),
      key: EnTabKeys.SUBSCRIBER,
      content: (
        <ChannelDetailSubscriber
          ref={subscriberFormRef}
          onButtonLayoutChange={handleButtonLayoutChange}
        />
      ),
    },
    {
      title: t('담당자 역할 관리'),
      key: EnTabKeys.MANAGER_ROLE,
      content: <ChannelDetailRole onButtonLayoutChange={handleButtonLayoutChange} />,
    },
    {
      title: t('채널 유저 그룹'),
      key: EnTabKeys.USER_GROUP,
      content: (
        <ChannelDetailUserGroup
          ref={userGroupFormRef}
          onButtonLayoutChange={handleButtonLayoutChange}
        />
      ),
    },
  ];

  return (
    <PageContainer hideOutLine={true}>
      <ContentsButtons>
        <LinkBox>
          <Button variant="point" size="sm" onClick={handleOnList} label={t('LABEL.button.list')} />
        </LinkBox>
        {buttonLayout === EnButtonLayout.REGISTER && (
          <Button variant="point" size="sm" onClick={handleOnRegister} label={t('등록')} />
        )}
        {buttonLayout === EnButtonLayout.RESET_AND_SAVE && (
          <>
            <Button
              variant="point"
              size="sm"
              onClick={handleOnReset}
              label={t('LABEL.button.reset')}
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleOnSave}
              label={t('LABEL.button.save')}
            />
          </>
        )}
        {buttonLayout === EnButtonLayout.CANCEL_SUBSCRIBE && (
          <Button
            variant="point"
            size="sm"
            onClick={handleOnCancelSubscribe}
            label={t('구독 해지')}
          />
        )}
      </ContentsButtons>
      <MainContents>
        <Tabs
          items={menuItems}
          type="fill"
          size="sm"
          className="page_tabs"
          showContentBorder={true}
          onTabChange={handleOnTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
