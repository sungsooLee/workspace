import { forwardRef, useEffect, useState } from 'react';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui/tabs';
import { EnChannelDetailButtonLayout } from '../../../types/type';
import { ChannelDetailBoardArticle } from './channel-detail-board-article';

interface ChannelDetailBoardProps {
  onButtonLayoutChange: (layout: EnChannelDetailButtonLayout) => void;
}

const ChannelDetailBoardComponent = (props: ChannelDetailBoardProps, ref: any) => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('manageArticle');

  useEffect(() => {
    props.onButtonLayoutChange && props.onButtonLayoutChange(EnChannelDetailButtonLayout.NONE);
  }, []);

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

export const ChannelDetailBoard = forwardRef(ChannelDetailBoardComponent);
