import { forwardRef, useEffect, useState } from 'react';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui/tabs';
import { t } from 'i18next';
import { EnChannelDetailButtonLayout, EnChannelDetailListType } from '../../../types/type';
import { ChannelDetailBoardArticle } from './channel-detail-board-article';

interface ChannelDetailBoardProps {
  onButtonChange: (layout: EnChannelDetailButtonLayout, listType?: EnChannelDetailListType) => void;
}

const ChannelDetailBoardComponent = (props: ChannelDetailBoardProps, ref: any) => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('manageArticle');

  useEffect(() => {
    props.onButtonChange && props.onButtonChange(EnChannelDetailButtonLayout.NONE);
  }, []);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const tabItems = [
    {
      title: t('게시물 관리'),
      key: 'manageArticle',
      content: <ChannelDetailBoardArticle />,
    },
    {
      title: t('게시판 설정'),
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
