import { ReactNode, useState, useEffect, useRef } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';

import { ContentsButtons, MainContents, PageContainer, LinkBox } from '@widgets/layout';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { Tabs, Button } from '@learnway/ui';

/* tab contents */
import {
  TenantDetailLearningRole,
  TenantDetailBanner,
  TenantDetailWidget,
  TenantDetailMenu,
  TenantDetailCategory,
  TenantDetailAttribute,
} from '@features/tenant';

import { EnTenantDetailTabKey } from '@types';

export const Route = createFileRoute('/_layout/tenant/management/detail')({
  component: RouteComponent,
});

const buttonShowTabs: string[] = [EnTenantDetailTabKey.base, EnTenantDetailTabKey.attribute];
/**
 * 화면 번호:
 * 테넌트 속성 과정연관 (NLP_BO_TMS_1003_00_04),
 * 메뉴 (NLP_BO_TMS_1003_02, NLP_BO_TMS_1003_02_01, NLP_BO_TMS_1003_02_02, NLP_BO_TMS_1003_02_03)
 * 카테고리 (NLP_BO_TMS_1003_03 , NLP_BO_TMS_1003_03_01, NLP_BO_TMS_1003_03_01_01)
 * 역할 (NLP_BO_TMS_1003_04, NLP_BO_TMS_1003_04_01, NLP_BO_TMS_1003_04_02, NLP_BO_TMS_1003_04_03, NLP_BO_TMS_1003_04_04, NLP_BO_TMS_1003_04_05)
 * 위젯 (NLP_BO_TMS_1003_05)
 * 배너 (NLP_BO_TMS_1105, NLP_BO_TMS_1106)
 * @returns
 */
function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const formAttrRef = useRef(2);
  const menuRef = useRef(3);

  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnTenantDetailTabKey.attribute);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };
  const handleListButtonClick = () => {
    router.navigate({ to: '/tenant/management' });
  };

  const handleModifyButtonClick = () => {
    switch (selectedTabKey) {
      case EnTenantDetailTabKey.attribute:
        {
          console.log('formAtt', formAttrRef);
          const attrTab: any = formAttrRef.current;
          if (attrTab) {
            attrTab.saveData();
          }
        }
        break;
    }
  };

  const handleResetButtonClick = () => {
    switch (selectedTabKey) {
      case EnTenantDetailTabKey.attribute:
        {
          const attrTab: any = formAttrRef.current;
          if (attrTab) {
            attrTab.clearForm();
          }
        }
        break;
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
    }
  };

  const menuItems = [
    {
      title: '테넌트 속성 관리',
      key: EnTenantDetailTabKey.attribute,
      content: <TenantDetailAttribute ref={formAttrRef} />,
    },
    {
      title: '테넌트 메뉴관리',
      key: EnTenantDetailTabKey.menu,
      content: <TenantDetailMenu ref={menuRef} />,
    },
    {
      title: '테넌트 카테고리 관리',
      key: EnTenantDetailTabKey.category,
      content: <TenantDetailCategory />,
    },
    {
      title: '테넌트 역할 관리',
      key: EnTenantDetailTabKey.learningRole,
      content: <TenantDetailLearningRole />,
    },
    {
      title: '테넌트 위젯 관리',
      key: EnTenantDetailTabKey.widget,
      content: <TenantDetailWidget />,
    },
    {
      title: '테넌트 배너 관리',
      key: EnTenantDetailTabKey.banner,
      content: <TenantDetailBanner />,
    },
  ];

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          {EnTenantDetailTabKey.menu === selectedTabKey && (
            <Button
              type="button"
              variant="point"
              size="sm"
              onClick={handleMultiLangButtonClick}
              label={t('LABEL.button.multilingualManage')}
            />
          )}
          <Button onClick={handleListButtonClick} variant="point" size="sm" label={t('목록')} />
        </LinkBox>

        <Button
          onClick={handleResetButtonClick}
          variant="point"
          size="sm"
          disabled={!buttonShowTabs.includes(selectedTabKey)}
          label={t('초기화')}
        />
        <Button
          variant="point"
          size="sm"
          onClick={handleModifyButtonClick}
          disabled={!buttonShowTabs.includes(selectedTabKey)}
          label={t('수정')}
        ></Button>
      </ContentsButtons>
      <MainContents>
        <Tabs
          items={menuItems}
          type="progress"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={EnTenantDetailTabKey.attribute}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
