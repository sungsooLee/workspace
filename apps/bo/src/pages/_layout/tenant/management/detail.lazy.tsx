import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { useRef, useState } from 'react';

import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Button } from '@learnway/ui/button';
import { Tabs } from '@learnway/ui/tabs';

/* tab contents */
import {
  TenantDetailAttribute,
  TenantDetailBanner,
  TenantDetailCategory,
  TenantDetailLearningRole,
  TenantDetailMenu,
  TenantDetailWidget,
} from '@features/platform-management/tenant';

import { EnTenantDetailTabKey } from '@types';

export const Route = createLazyFileRoute('/_layout/tenant/management/detail')({
  component: RouteComponent,
});

const buttonShowTabs: string[] = [EnTenantDetailTabKey.base, EnTenantDetailTabKey.attribute];
const buttonShowMultiLang: string[] = [EnTenantDetailTabKey.menu, EnTenantDetailTabKey.category];
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
      title: t('테넌트 속성 관리'),
      key: EnTenantDetailTabKey.attribute,
      content: <TenantDetailAttribute ref={formAttrRef} />,
    },
    {
      title: t('테넌트 메뉴관리'),
      key: EnTenantDetailTabKey.menu,
      content: <TenantDetailMenu ref={menuRef} />,
    },
    {
      title: t('테넌트 카테고리 관리'),
      key: EnTenantDetailTabKey.category,
      content: <TenantDetailCategory />,
    },
    {
      title: t('테넌트 역할 관리'),
      key: EnTenantDetailTabKey.learningRole,
      content: <TenantDetailLearningRole roleInfo={'TENANT'} />,
    },
    {
      title: t('테넌트 위젯 관리'),
      key: EnTenantDetailTabKey.widget,
      content: <TenantDetailWidget />,
    },
    {
      title: t('테넌트 배너 관리'),
      key: EnTenantDetailTabKey.banner,
      content: <TenantDetailBanner />,
    },
  ];

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          {buttonShowMultiLang.includes(selectedTabKey) && (
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
          variant="primary"
          size="sm"
          onClick={handleModifyButtonClick}
          disabled={!buttonShowTabs.includes(selectedTabKey)}
          label={t('LABEL.button.save')}
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
