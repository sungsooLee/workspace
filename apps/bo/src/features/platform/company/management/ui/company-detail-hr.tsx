import { FC, useEffect, useState, useCallback } from 'react';
import { Tabs } from '@learnway/ui';
import { CompanyDetailHROrganization } from './company-detail-hr-organization';
import { CompanyDetailHRLink } from './company-detail-ht-link';
import { EnCompanyHrLinkType } from '@types';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

const CompanyDetailHRComponent: FC<any> = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnCompanyHrLinkType.POSITION);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const menuItems = [
    {
      title: '조직',
      key: EnCompanyHrLinkType.ORGANIZATION,
      content: <CompanyDetailHROrganization />,
    },
    {
      title: '직군',
      key: EnCompanyHrLinkType.GROUP,
      content: <CompanyDetailHRLink type={EnCompanyHrLinkType.GROUP} />,
    },
    {
      title: '직무',
      key: EnCompanyHrLinkType.ROLE,
      content: <CompanyDetailHRLink type={EnCompanyHrLinkType.ROLE} />,
    },
    {
      title: '호칭',
      key: EnCompanyHrLinkType.DESIGNATION,
      content: <CompanyDetailHRLink type={EnCompanyHrLinkType.DESIGNATION} />,
    },
    {
      title: '보직',
      key: EnCompanyHrLinkType.POSITION,
      content: <CompanyDetailHRLink type={EnCompanyHrLinkType.POSITION} />,
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
