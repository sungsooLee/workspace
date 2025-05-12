import { FC, useState } from 'react';
import { t } from 'i18next';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';

import { TenantDetailLearningRoleTree } from './tenant-detail-learning-role-tree';
import { TenantDetailLearningRoleMenu } from './tenant-detail-learning-role-menu';
import { TenantDetailLearningRoleGrant } from './tenant-detail-learning-role-grant';

const TenantDetailLearningRoleComponent: FC<any> = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO-ROLE');

  const tabItems = [
    {
      title: t('학습자 역할정보'),
      key: 'FO-ROLE',
      content: <TenantDetailLearningRoleTree roleScope={'FO'} />,
    },
    {
      title: t('학습자 메뉴설정'),
      key: 'FO-MENU',
      content: <TenantDetailLearningRoleMenu roleScope={'FO'} />,
    },
    {
      title: t('학습자 역할부여'),
      key: 'FO-ROLE-SET',
      content: <TenantDetailLearningRoleGrant roleScope={'FO'} />,
    },
    {
      title: t('HRD센터 역할정보'),
      key: 'BO-ROLE',
      content: <TenantDetailLearningRoleTree roleScope={'BO'} />,
    },
    {
      title: t('HRD센터 메뉴설정'),
      key: 'BO-MENU',
      content: <TenantDetailLearningRoleMenu roleScope={'BO'} />,
    },
    {
      title: t('HRD센터 역할부여'),
      key: 'BO-ROLE-SET',
      content: <TenantDetailLearningRoleGrant roleScope={'BO'} />,
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

export const TenantDetailLearningRole = TenantDetailLearningRoleComponent;
