import { FC, useEffect, useState, useCallback } from 'react';
import { Tabs } from '@learnway/ui';
import { CompanyDetailHROrganization } from './company-detail-hr-organization';
import { CompanyDetailHRLink } from './company-detail-ht-link';
import { EnUserGroupType } from '@types';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

const CompanyDetailHRComponent: FC<any> = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnUserGroupType.ORGANIZATION);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const menuItems = [
    {
      title: '조직',
      key: EnUserGroupType.ORGANIZATION,
      content: <CompanyDetailHROrganization />,
    },
    {
      title: '직군',
      key: EnUserGroupType.JOB_GROUP,
      content: <CompanyDetailHRLink type={EnUserGroupType.JOB_GROUP} />,
    },
    {
      title: '직무',
      key: EnUserGroupType.JOB,
      content: <CompanyDetailHRLink type={EnUserGroupType.JOB} />,
    },
    {
      title: '호칭',
      key: EnUserGroupType.JOB_TITLE,
      content: <CompanyDetailHRLink type={EnUserGroupType.JOB_TITLE} />,
    },
    {
      title: '보직',
      key: EnUserGroupType.JOB_POSITION,
      content: <CompanyDetailHRLink type={EnUserGroupType.JOB_POSITION} />,
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
