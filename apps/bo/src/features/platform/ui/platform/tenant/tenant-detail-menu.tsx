import { FC, useEffect, useRef, useState } from 'react';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs, Button } from '@learnway/ui';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import { TenantDetailMenuTree } from './tenant-detail-menu-tree';

const TenantDetailMenuComponent: FC<any> = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');
  const renderTabContent = (tabKey: string) => {
    return <TenantDetailMenuTree menuScope={tabKey} />;
  };
  const tabItems = [
    {
      title: '학습자 메뉴',
      key: 'FO',
      content: renderTabContent('FO'),
    },
    {
      title: 'HRD센터 메뉴',
      key: 'BO',
      content: "renderTabContent('BO')",
    },
  ];
  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };
  const handlerList = (e) => {
    alert('callList');
  };

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

export const TenantDetailMenu = TenantDetailMenuComponent;
