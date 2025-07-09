import { useState, useEffect } from 'react';
import { t } from 'i18next';
import { Button, TableBox, Tabs } from '@learnway/ui';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { ChannelDetailBoardArticle } from './channel-detail-board-article';
import { ChannelDetailBoardArticleDetail } from './channel-detail-board-article-detail';

const ChannelDetailBoardComponent = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('manageArticle');

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const tabItems = [
    {
      title: '게시물 관리',
      key: 'manageArticle',
      content: <ChannelDetailBoardArticle />,
    },
    {
      title: '게시판 설정',
      key: 'settingBoard',
      content: 'settingBoard',
    },
  ];

  return (
    <Tabs
      items={tabItems}
      type="line"
      size={'sm'}
      className={styles.tab_wrap}
      selectedTabKey={selectedTabKey}
      onTabChange={handleTabChange}
    />
  );
};

export const ChannelDetailBoard = ChannelDetailBoardComponent;
