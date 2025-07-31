import { EnUserGroupType } from '@types';
import { t } from 'i18next';
import { FC, useState } from 'react';
import { CompanyDetailHROrganization } from './company-detail-hr-organization';
import { CompanyDetailHRLink } from './company-detail-ht-link';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui/tabs';

const CompanyDetailHRComponent: FC<any> = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnUserGroupType.ORGANIZATION);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const menuItems = [
    {
      title: t('조직'),
      key: EnUserGroupType.ORGANIZATION,
      content: <CompanyDetailHROrganization />,
    },
    {
      title: t('직군'),
      key: EnUserGroupType.JOB_GROUP,
      content: <CompanyDetailHRLink type={EnUserGroupType.JOB_GROUP} />,
    },
    {
      title: t('직무'),
      key: EnUserGroupType.JOB,
      content: <CompanyDetailHRLink type={EnUserGroupType.JOB} />,
    },
    {
      title: t('호칭'),
      key: EnUserGroupType.JOB_TITLE,
      content: <CompanyDetailHRLink type={EnUserGroupType.JOB_TITLE} />,
    },
    {
      title: t('보직'),
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
