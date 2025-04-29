import { FC, useState } from 'react';
import { t } from 'i18next';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';

import { SectionLayout } from './components/section-layout';
import { TenantDetailLearningRoleList } from './tenant-detail-learning-role-list';
import { TenantDetailLearningRoleView } from './tenant-detail-learning-role-view';
import { TenantDetailLeaningRoleMenu } from './tenant-detail-learning-role-menu';
import { TenantDetailLearningRoleApi } from './tenant-detail-learning-role-api';
import { TenantDetailLearningRoleSearch } from './tenant-detail-learning-role-search';
import { TenantDetailLearningRoleGrant } from './tenant-detail-learning-role-grant';

const TenantDetailLearningRoleComponent: FC<any> = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO-ROLE');

  const renderTabRoleInfoContent = (menuScope: string) => {
    return (
      <SectionLayout contentsRatio={'thirty'}>
        <TenantDetailLearningRoleList menuScope={menuScope} />
        <TenantDetailLearningRoleView menuScope={menuScope} />
      </SectionLayout>
    );
  };

  const renderTabMenuContent = (menuScope: string) => {
    return (
      <SectionLayout contentsRatio={'third_children'}>
        <TenantDetailLearningRoleList menuScope={menuScope} />
        <TenantDetailLeaningRoleMenu menuScope={menuScope} />
        <TenantDetailLearningRoleApi menuScope={menuScope} />
      </SectionLayout>
    );
  };

  const renderTabRoleGrantContent = (menuScope: string) => {
    return (
      <SectionLayout contentsRatio={'thirty'}>
        <TenantDetailLearningRoleSearch menuScope={menuScope} />
        <TenantDetailLearningRoleGrant menuScope={menuScope} />
      </SectionLayout>
    );
  };

  const tabItems = [
    {
      title: t('학습자 역할정보'),
      key: 'FO-ROLE',
      content: renderTabRoleInfoContent('FO'),
    },
    {
      title: t('학습자 메뉴설정'),
      key: 'FO-MENU',
      content: renderTabMenuContent('FO'),
    },
    {
      title: t('학습자 역할부여'),
      key: 'FO-ROLE-SET',
      content: renderTabRoleGrantContent('FO'),
    },
    {
      title: t('HRD센터 역할정보'),
      key: 'BO-ROLE',
      content: renderTabRoleInfoContent('BO'),
    },
    {
      title: t('HRD센터 메뉴설정'),
      key: 'BO-MENU',
      content: renderTabMenuContent('BO'),
    },
    {
      title: t('HRD센터 역할부여'),
      key: 'BO-ROLE-SET',
      content: renderTabRoleGrantContent('BO'),
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

export const TenaTenantDetailLearningRole = TenantDetailLearningRoleComponent;
