import { useState } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import { Tabs, Button } from '@learnway/ui';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { ChannelDetailBase } from '@features/tenant/channel/channel-detail-base';
import { ChannelDetailRole } from '@features/tenant/channel/channel-detail-role';
import { ChannelDetailHome } from '@features/tenant/channel/channel-detail-home';
import { ChannelDetailBoard } from '@features/tenant/channel/channel-detail-board';

export const Route = createFileRoute('/_layout/tenant/channel/detail')({
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
