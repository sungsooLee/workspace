import { Button } from '@learnway/ui/button';
import { Tabs } from '@learnway/ui/tabs';
import { EnFormMode } from '@shared/types/enums';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui/layout';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { useRef, useState } from 'react';
import { EnChannelDetailButtonLayout, EnChannelDetailTabKeys } from '../types/type';
import { ChannelDetailBase } from './tabs/base/channel-detail-base';
import { ChannelDetailBoard } from './tabs/board/channel-detail-board';
import { ChannelDetailHome } from './tabs/home/channel-detail-home';
import { ChannelDetailRole } from './tabs/role/channel-detail-role';
import { ChannelDetailSubscriber } from './tabs/subscriber/channel-detail-subscriber';
import { ChannelDetailUserGroup } from './tabs/user-group/channel-detail-user-group';
import { ChannelDetailUser } from './tabs/user/channel-detail-user';

const ChannelDetailComponent = () => {
  const router = useRouter();
  const routerState = useRouterState();
  const [currentTab, setCurrentTab] = useState(EnChannelDetailTabKeys.BASE);

  const baseFormRef = useRef<HTMLFormElement>(null);
  const userFormRef = useRef<HTMLFormElement>(null);
  const homeFormRef = useRef<HTMLFormElement>(null);
  const boardFormRef = useRef<HTMLFormElement>(null);
  const subscriberFormRef = useRef<HTMLFormElement>(null);
  const userGroupFormRef = useRef<HTMLFormElement>(null);

  const getFormRef = () => {
    switch (currentTab) {
      case EnChannelDetailTabKeys.BASE:
        return baseFormRef;
      case EnChannelDetailTabKeys.USER:
        return userFormRef;
      case EnChannelDetailTabKeys.HOME:
        return homeFormRef;
      case EnChannelDetailTabKeys.BOARD:
        return boardFormRef;
      case EnChannelDetailTabKeys.SUBSCRIBER:
        return subscriberFormRef;
      case EnChannelDetailTabKeys.USER_GROUP:
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

  const [buttonLayout, setButtonLayout] = useState(EnChannelDetailButtonLayout.NONE);

  const handleButtonLayoutChange = (layout: EnChannelDetailButtonLayout) => {
    setButtonLayout(layout);
  };

  const handleOnTabChange = (value: string) => {
    const tabKey = Object.values(EnChannelDetailTabKeys).find(
      (enumValue) => enumValue === value,
    ) as EnChannelDetailTabKeys;
    setCurrentTab(tabKey);
  };

  const menuItems = [
    {
      title: t('기본 정보'),
      key: EnChannelDetailTabKeys.BASE,
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
      key: EnChannelDetailTabKeys.USER,
      content: (
        <ChannelDetailUser ref={userFormRef} onButtonLayoutChange={handleButtonLayoutChange} />
      ),
    },
    {
      title: t('홈 설정'),
      key: EnChannelDetailTabKeys.HOME,
      content: (
        <ChannelDetailHome ref={homeFormRef} onButtonLayoutChange={handleButtonLayoutChange} />
      ),
    },
    {
      title: t('게시판 관리'),
      key: EnChannelDetailTabKeys.BOARD,
      content: (
        <ChannelDetailBoard ref={boardFormRef} onButtonLayoutChange={handleButtonLayoutChange} />
      ),
    },
    {
      title: t('구독자 관리'),
      key: EnChannelDetailTabKeys.SUBSCRIBER,
      content: (
        <ChannelDetailSubscriber
          ref={subscriberFormRef}
          onButtonLayoutChange={handleButtonLayoutChange}
        />
      ),
    },
    {
      title: t('담당자 역할 관리'),
      key: EnChannelDetailTabKeys.MANAGER_ROLE,
      content: <ChannelDetailRole onButtonLayoutChange={handleButtonLayoutChange} />,
    },
    {
      title: t('채널 유저 그룹'),
      key: EnChannelDetailTabKeys.USER_GROUP,
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
        {buttonLayout === EnChannelDetailButtonLayout.REGISTER && (
          <Button variant="point" size="sm" onClick={handleOnRegister} label={t('등록')} />
        )}
        {buttonLayout === EnChannelDetailButtonLayout.RESET_AND_SAVE && (
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
        {buttonLayout === EnChannelDetailButtonLayout.CANCEL_SUBSCRIBE && (
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
};

export const ChannelDetail = ChannelDetailComponent;
