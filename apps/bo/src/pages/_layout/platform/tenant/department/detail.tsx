import { Children, FC, isValidElement, ReactNode, useState, useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

import { Tabs, Button } from '@learnway/ui';

import { TenantCompanyDepartmentTree } from '@features/tenant/department/ui/tenant-company-department-tree';
export const Route = createFileRoute('/_layout/platform/tenant/department/detail')({
  component: RouteComponent,
});

enum EnTabKey {
  check = 'check',
  origin = 'origin',
  platform = 'platform',
}

/**
 * 화면 번호 : NLP_BO_TMS_1111_03
 * @returns
 */
function RouteComponent() {
  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnTabKey.origin);

  const menuItems = [
    {
      title: '회사조직 확인',
      key: EnTabKey.check,
      content: <TenantCompanyDepartmentTree />,
    },
    {
      title: '회사조직(원본)',
      key: EnTabKey.origin,
      content: '원본',
    },
    {
      title: '회사조직(플랫폼)',
      key: EnTabKey.platform,
      content: '플랫폼',
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
        <Button variant="point" size="sm">
          목록
        </Button>
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
