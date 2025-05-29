import { FC, useEffect, useState, useCallback } from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';
import { CompanyDetailHROrganization } from './company-detail-hr-organization';
import { CompanyDetailHRPosition } from './company-detail-ht-position';

const CompanyDetailHRComponent: FC<any> = () => {
  const [selectedTabKey, setSelectedTabKey] = useState('position');

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const menuItems = [
    {
      title: '조직',
      key: 'organization',
      content: <CompanyDetailHROrganization />,
    },
    {
      title: '보직',
      key: 'position',
      content: <CompanyDetailHRPosition />,
    },
    {
      title: '직군',
      key: 'group',
      content: '',
    },
    {
      title: '호칭',
      key: 'designation',
      content: '',
    },
    {
      title: '직무',
      key: 'role',
      content: '',
    },
  ];

  return (
    <Tabs
      items={menuItems}
      type="line"
      size={'sm'}
      className={styles.tab_wrap}
      selectedTabKey={selectedTabKey}
      onTabChange={handleTabChange}
    />
  );
};

export const CompanyDetailHR = CompanyDetailHRComponent;
