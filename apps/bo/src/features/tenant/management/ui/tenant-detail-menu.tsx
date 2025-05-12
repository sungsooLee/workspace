import { FC, useState } from 'react';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';
import { TenantDetailMenuTree } from './tenant-detail-menu-tree';

const TenantDetailMenuComponent: FC<any> = ({ roleInfo }) => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');

  const renderTabContent = () => {
    return <TenantDetailMenuTree menuScope={selectedTabKey} roleInfo={roleInfo} />;
  };
  const tabItems = [
    {
      title: '학습자 메뉴',
      key: 'FO',
      content: renderTabContent(),
    },
    {
      title: 'HRD센터 메뉴',
      key: 'BO',
      content: renderTabContent(),
    },
  ];
  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
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
