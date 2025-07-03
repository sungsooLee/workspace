import { FC, useState, useRef, useImperativeHandle } from 'react';
import { t } from 'i18next';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui';

import { TenantDetailLearningRoleTree } from './tenant-detail-learning-role-tree';
import { TenantDetailLearningRoleMenu } from './tenant-detail-learning-role-menu';
import { TenantDetailLearningRoleGrant } from './tenant-detail-learning-role-grant';

enum TabKey {
  FO_ROLE = 'FO_ROLE',
  FO_MENU = 'FO_MENU',
  FO_GRANT = 'FO_GRANT',
  BO_ROLE = 'BO_ROLE',
  BO_MENU = 'BO_MENU',
  BO_GRANT = 'BO_GRANT',
}
/**
 * 화면번호:
 * NLP_BO_TMS_1003_04(학습역할), NLP_BO_TMS_1003_04_01(학습역할메뉴), NLP_BO_TMS_1003_04_02(학습역할부여),
 * NLP_BO_TMS_1003_04_03(HRD역할), NLP_BO_TMS_1003_04_04(HRD역할메뉴), NLP_BO_TMS_1003_04_05(HRD역할부여),
 * NLP_BO_PMS_1100 (플렛폼 학습역할), NLP_BO_PMS_1101 (플렛폼 학습역할메뉴), NLP_BO_PMS_1103 (플렛품 학습역할부여)
 * NLP_BO_PMS_1104 (플렛폼 HRD역할), NLP_BO_PMS_1105 (플렛폼 HRD역할메뉴), NLP_BO_PMS_1106 (플렛폼 HRD역할부여),
 * @param param0
 * @returns
 */
const TenantDetailLearningRoleComponent: FC<any> = ({ roleInfo }) => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>(TabKey.FO_ROLE);
  const roleRef = useRef<any>();

  const renderTabRoleContent = () => {
    if (selectedTabKey.startsWith('FO')) {
      return <TenantDetailLearningRoleTree ref={roleRef} roleInfo={roleInfo} siteScope={'FO'} />;
    } else {
      return <TenantDetailLearningRoleTree ref={roleRef} roleInfo={roleInfo} siteScope={'BO'} />;
    }
  };

  const renderTabMenuContent = () => {
    if (selectedTabKey.startsWith('FO')) {
      return <TenantDetailLearningRoleMenu ref={roleRef} roleInfo={roleInfo} siteScope={'FO'} />;
    } else {
      return <TenantDetailLearningRoleMenu ref={roleRef} roleInfo={roleInfo} siteScope={'BO'} />;
    }
  };

  const renderTabGrantContent = () => {
    if (selectedTabKey.startsWith('FO')) {
      return <TenantDetailLearningRoleGrant ref={roleRef} roleInfo={roleInfo} siteScope={'FO'} />;
    } else {
      return <TenantDetailLearningRoleGrant ref={roleRef} roleInfo={roleInfo} siteScope={'BO'} />;
    }
  };

  const tabItems = [
    {
      title: t('학습자 역할정보'),
      key: TabKey.FO_ROLE,
      content: renderTabRoleContent(),
    },
    {
      title: t('학습자 메뉴설정'),
      key: TabKey.FO_MENU,
      content: renderTabMenuContent(),
    },
    {
      title: t('학습자 역할부여'),
      key: TabKey.FO_GRANT,
      content: renderTabGrantContent(),
    },
    {
      title: t('HRD센터 역할정보'),
      key: TabKey.BO_ROLE,
      content: renderTabRoleContent(),
    },
    {
      title: t('HRD센터 메뉴설정'),
      key: TabKey.BO_MENU,
      content: renderTabMenuContent(),
    },
    {
      title: t('HRD센터 역할부여'),
      key: TabKey.BO_GRANT,
      content: renderTabGrantContent(),
    },
  ];

  // useImperativeHandle(ref, () => ({
  //   showAlertModify() {
  //     return true;
  //   },
  // }));

  const handleBeforeTabChange = async (value: string, nextValue: string) => {
    let retVal = false;
    console.log('key', value, nextValue);
    if (nextValue !== value) {
      console.log('handleTabChange', roleRef);
      switch (value) {
        case TabKey.FO_ROLE:
          retVal = roleRef.current.showAlertModify();
          break;
        case TabKey.FO_MENU:
          retVal = roleRef.current.showAlertModify();
          break;
        case TabKey.FO_GRANT:
          retVal = roleRef.current.showAlertModify();
          break;
        case TabKey.BO_ROLE:
          retVal = roleRef.current.showAlertModify();
          break;
        case TabKey.BO_MENU:
          retVal = roleRef.current.showAlertModify();
          break;
        case TabKey.BO_GRANT:
          retVal = roleRef.current.showAlertModify();
          break;
      }

      // setSelectedTabKey(tabKey);
    }
    return !retVal;
  };
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
      // onBeforeTabChange={handleBeforeTabChange}
      onTabChange={handleTabChange}
    />
  );
};

export const TenantDetailLearningRole = TenantDetailLearningRoleComponent;
