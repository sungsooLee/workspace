import { useState, useEffect, useRef } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs, Button } from '@learnway/ui';

/* tab contents */
import { TenantDetailBase } from '@features/tenant/management/ui/tenant-detail-base';
import { TenantDetailMenu } from '@features/tenant/management/ui/tenant-detail-menu';
import { TenantDetailCategory } from '@features/tenant/management/ui/tenant-detail-category';
import { TenantDetailAttribute } from '@features/tenant/management/ui/tenant-detail-attribute';
import { TenantDetailWidget } from '@features/tenant/management/ui/tenant-detail-widget';
import { TenantDetailBanner } from '@features/tenant/management/ui/tenant-detail-banner';
import { TenantDetailLearningRole } from '@features/tenant/management/ui/tenant-detail-learning-role';

import { EnTenantDetailTabKey } from '@types';

export const Route = createFileRoute('/_layout/platform/tenant/management/detail')({
  component: RouteComponent,
});

const scrollHidden: string[] = [
  EnTenantDetailTabKey.menu,
  EnTenantDetailTabKey.category,
  EnTenantDetailTabKey.learningRole,
  EnTenantDetailTabKey.banner,
];

const buttonShowTabs: string[] = [EnTenantDetailTabKey.base, EnTenantDetailTabKey.attribute];
/**
 * 화면 번호:
 * 테넌트 기본정보 (NLP_BO_TMS_1002),
 * 테넌트 속성 과정연관 (NLP_BO_TMS_1003_00_04),
 * 메뉴 (NLP_BO_TMS_1002_01, NLP_BO_TMS_1002_01_01, NLP_BO_TMS_1002_01_03, NLP_BO_TMS_1002_01_04)
 * 카테고리 (NLP_BO_TMS_1002_02_01 , NLP_BO_TMS_1002_02_02)
 * 역할 (NLP_BO_PMS_1100, NLP_BO_PMS_1101, NLP_BO_PMS_1103, NLP_BO_PMS_1104, NLP_BO_PMS_1105, NLP_BO_PMS_1106)
 * 위젯 (NLP_BO_TMS_1003_05)
 * 배너 (NLP_BO_TMS_1105, NLP_BO_TMS_1106)
 * @returns
 */
function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const formBaseRef = useRef(1);
  const formAttrRef = useRef(2);
  const menuRef = useRef(3);

  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnTenantDetailTabKey.base);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };
  // if (!routerState.location.state.tenantId) {
  //   router.navigate({ to: '/platform/tenant/management', state: { listParam: {} } });
  // }
  const handleListButtonClick = () => {
    const listParam = routerState.location.state?.listParam;

    router.navigate({ to: '/platform/tenant/management', state: { listParam: listParam } });
  };

  const handleModifyButtonClick = () => {
    switch (selectedTabKey) {
      case EnTenantDetailTabKey.base:
        {
          console.log('formBaseRef', formBaseRef);
          const baseTab: any = formBaseRef.current;
          if (baseTab) {
            baseTab.saveData();
          }
        }
        break;
      case EnTenantDetailTabKey.attribute:
        {
          console.log('formAtt', formAttrRef);
          const attrTab: any = formAttrRef.current;
          if (attrTab) {
            attrTab.saveData();
          }
        }
        break;
      default:
        alert('없음');
    }
  };

  const handleMultiLangButtonClick = () => {
    switch (selectedTabKey) {
      case EnTenantDetailTabKey.menu:
        {
          const menuTab: any = menuRef.current;
          if (menuTab) {
            menuTab.moveMultilang();
          }
        }
        break;
      default:
        alert('없음');
    }
  };

  const handleResetButtonClick = () => {
    switch (selectedTabKey) {
      case EnTenantDetailTabKey.base:
        {
          const baseTab: any = formBaseRef.current;
          if (baseTab) {
            baseTab.clearForm();
          }
        }
        break;
      case EnTenantDetailTabKey.attribute:
        {
          const attrTab: any = formAttrRef.current;
          if (attrTab) {
            attrTab.clearForm();
          }
        }
        break;
      default:
        alert('없음');
    }
  };

  const menuItems = [
    {
      title: '테넌트 기본 정보',
      key: EnTenantDetailTabKey.base,
      content: <TenantDetailBase ref={formBaseRef} roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 속성 관리',
      key: EnTenantDetailTabKey.attribute,
      content: <TenantDetailAttribute ref={formAttrRef} roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 메뉴관리 매핑',
      key: EnTenantDetailTabKey.menu,
      content: <TenantDetailMenu ref={menuRef} roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 카테고리 관리',
      key: EnTenantDetailTabKey.category,
      content: <TenantDetailCategory roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 역할 관리',
      key: EnTenantDetailTabKey.learningRole,
      content: <TenantDetailLearningRole roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 위젯 관리',
      key: EnTenantDetailTabKey.widget,
      content: <TenantDetailWidget roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 배너 관리',
      key: EnTenantDetailTabKey.banner,
      content: <TenantDetailBanner roleInfo={'PLATFORM'} />,
    },
    {
      title: '테넌트 디자인/테마 관리',
      key: EnTenantDetailTabKey.theme,
      content: '테넌트 디자인/테마 관리',
    },
  ];
  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          {EnTenantDetailTabKey.menu === selectedTabKey && (
            <Button type="button" variant="point" size="sm" onClick={handleMultiLangButtonClick}>
              {t('LABEL.button.multilingualManage')}
            </Button>
          )}
          <Button onClick={handleListButtonClick} variant="point" size="sm">
            목록
          </Button>
        </LinkBox>

        <Button
          onClick={handleResetButtonClick}
          variant="point"
          size="sm"
          disabled={!buttonShowTabs.includes(selectedTabKey)}
        >
          초기화
        </Button>
        <Button
          variant="point"
          size="sm"
          onClick={handleModifyButtonClick}
          disabled={!buttonShowTabs.includes(selectedTabKey)}
        >
          수정
        </Button>
      </ContentsButtons>
      <MainContents>
        <Tabs
          items={menuItems}
          type="progress"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={selectedTabKey}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
