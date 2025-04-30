import { FC, useState } from 'react';
import { Tabs } from '@learnway/ui';

/* styles */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

/* tab contents */
import { SectionLayout } from './components/section-layout';
import { TenantDetailBannerList } from './tenant-detail-banner-list';
import { TenantDetailBannerView } from './tenant-detail-banner-view';

const TenantDetailBannerComponent: FC<any> = () => {
  const renderTabContent = () => {
    return (
      <SectionLayout contentsRatio={'thirty'}>
        <TenantDetailBannerList />
        <TenantDetailBannerView />
      </SectionLayout>
    );
  };

  const tabItems = [
    {
      title: '최상단캠페인 배너',
      key: 'tab01',
      content: renderTabContent(),
    },
    {
      title: '키비쥬얼영역 배너',
      key: 'tab02',
      content: renderTabContent(),
    },
  ];
  return (
    <Tabs
      items={tabItems}
      type="line"
      size={'sm'}
      className={styles.tab_wrap}
      selectedTabKey={'tab01'}
    />
  );
};

export const TenantDetailBanner = TenantDetailBannerComponent;
