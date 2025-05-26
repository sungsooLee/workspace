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

export const Route = createFileRoute('/_layout/tenant/channel/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [selectedTabKey, setSelectedTabKey] = useState('menu01');

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const menuItems = [
    {
      title: '기본 정보',
      key: 'menu01',
      content: <ChannelDetailBase />,
    },
    {
      title: '메인 설정',
      key: 'menu02',
      content: '메인 설정',
    },
    {
      title: '게시판 설정',
      key: 'menu03',
      content: '게시판 설정',
    },
    {
      title: '구독자 관리',
      key: 'menu04',
      content: '구독자 관리',
    },
    {
      title: '담당자 역할 관리',
      key: 'menu05',
      content: <ChannelDetailRole />,
    },
  ];

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            variant="point"
            size="sm"
            onClick={() => router.navigate({ to: '/tenant/channel' })}
          >
            {t('LABEL.button.list')}
          </Button>
          <Button variant="point" size="sm">
            {t('LABEL.button.delete')}
          </Button>
        </LinkBox>
        <Button variant="point" size="sm">
          {t('LABEL.button.preview')}
        </Button>
        <Button variant="save" size="sm">
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <Tabs
          items={menuItems}
          type="fill"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={'menu01'}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
