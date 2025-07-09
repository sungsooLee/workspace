import { useState } from 'react';
import { t } from 'i18next';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { Tabs, Button } from '@learnway/ui';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { ChannelDetailBase } from '@features/channel/channel-management/channel-detail-base';
import { ChannelDetailRole } from '@features/channel/channel-management/channel-detail-role';
import { ChannelDetailHome } from '@features/channel/channel-management/channel-detail-home';
import { ChannelDetailBoard } from '@features/channel/channel-management/channel-detail-board';
import { MainContents, PageContainer, LinkBox, ContentsButtons } from '@shared/ui';

export const Route = createLazyFileRoute('/_layout/tenant/channel/management/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedTabKey, setSelectedTabKey] = useState('menu01');

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const menuItems = [
    {
      title: '기본 정보',
      key: 'base',
      content: <ChannelDetailBase />,
    },
    {
      title: '홈 설정',
      key: 'home',
      content: <ChannelDetailHome />,
    },
    {
      title: '게시판 관리',
      key: 'board',
      content: <ChannelDetailBoard />,
    },
    {
      title: '구독자 관리',
      key: 'subscriber',
      content: '구독자 관리',
    },
    {
      title: '담당자 관리',
      key: 'contact',
      content: <ChannelDetailRole />,
    },
  ];

  return (
    <PageContainer hideOutLine={true}>
      <MainContents>
        <Tabs
          items={menuItems}
          type="fill"
          size="sm"
          className="page_tabs"
          selectedTabKey={'board'}
          onTabChange={handleTabChange}
          showContentBorder={true}
        />
      </MainContents>
    </PageContainer>
  );
}
