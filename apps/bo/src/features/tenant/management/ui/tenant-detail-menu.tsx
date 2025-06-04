import { useState, forwardRef, useImperativeHandle } from 'react';
import { useRouter } from '@tanstack/react-router';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';
import { TenantDetailMenuTree } from './tenant-detail-menu-tree';
/**
 * 화면번호:
 * NLP_BO_TMS_1002_01 (플랫폼-학습자메뉴), NLP_BO_TMS_1002_01_01 (플랫폼-학습자메뉴-상세), NLP_BO_TMS_1002_01_03 (플랫폼-HRD메뉴),NLP_BO_TMS_1002_01_04 (플랫폼-HRD메뉴-상세),
 * NLP_BO_TMS_1003_02 (테넌트-학습자메뉴), NLP_BO_TMS_1003_02_01 (테넌트-학습자메뉴-상세), NLP_BO_TMS_1003_02_02 (테넌트-HRD메뉴),NLP_BO_TMS_1003_02_02 (테넌트-HRD메뉴-상세)
 *
 * @param param0
 * @returns
 */
const TenantDetailMenuComponent = ({ roleInfo }: { roleInfo: any }, ref: any) => {
  const router = useRouter();

  const [selectedTabKey, setSelectedTabKey] = useState<string>('FO');

  useImperativeHandle(ref, () => ({
    moveMultilang() {
      console.log('aaaaa');

      router.navigate({
        to: '/platform/system/multilingual',
        state: {
          keyType: selectedTabKey === 'FO' ? 'LEARNER_MENU' : 'HRD_CENTER_MENU',
        },
      });
    },
  }));

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

export const TenantDetailMenu = forwardRef(TenantDetailMenuComponent);
