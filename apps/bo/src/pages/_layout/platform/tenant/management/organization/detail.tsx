import { useState, useEffect, useRef } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

import { Tabs, Button } from '@learnway/ui';

import {
  EnOrganizationShowType,
  TenantCompanyOrganizationTree,
  CompanyOrganizationCheck,
} from '@features/platform/company';

export const Route = createFileRoute('/_layout/platform/tenant/management/organization/detail')({
  component: RouteComponent,
});

/**
 * 화면 번호 : NLP_BO_TMS_1111_03
 * @returns
 */
function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnOrganizationShowType.check);
  const companyCode = routerState.location.state?.companyCode;
  const handleListButtonClick = () => {
    const listParam = routerState.location.state?.listParam;
    console.log('listParam-detail', listParam);
    router.navigate({ to: '/platform/tenant/organization', state: { listParam: listParam } });
  };

  const menuItems = [
    {
      title: t('회사조직 확인'),
      key: EnOrganizationShowType.check,
      content: <CompanyOrganizationCheck companyCode={companyCode} />,
    },
    {
      title: t('회사조직(원본)'),
      key: EnOrganizationShowType.origin,
      content: (
        <TenantCompanyOrganizationTree
          companyCode={companyCode}
          showType={EnOrganizationShowType.origin}
        />
      ),
    },
    {
      title: t('회사조직(플랫폼)'),
      key: EnOrganizationShowType.platform,
      content: (
        <TenantCompanyOrganizationTree
          companyCode={companyCode}
          showType={EnOrganizationShowType.platform}
        />
      ),
    },
  ];

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="point"
          size="sm"
          stopPropagation
          onClick={handleListButtonClick}
          label={t('목록')}
        />
      </ContentsButtons>

      <MainContents>
        <Tabs
          items={menuItems}
          type="line"
          size="sm"
          className={styles.progress_wrap}
          selectedTabKey={selectedTabKey}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
