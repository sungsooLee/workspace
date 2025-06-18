import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer, MainContents, ContentsButtons } from '@widgets/layout';

import { Tabs, Button } from '@learnway/ui';

import { TenantUserList, TenantUserRegistApplicationList } from '@features/tenant';

export const Route = createFileRoute('/_layout/platform/tenant/management/user/')({
  component: RouteComponent,
});

/**
 * 화면번호: NLP_BO_TMS_1111_07 , NLP_BO_TMS_1111_15
 * @returns
 */
function RouteComponent() {
  const router = useRouter();

  const [selectedTabKey, setSelectedTabKey] = useState<string>('t1');

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const tabItems = [
    {
      title: '유저',
      key: 't1',
      content: <TenantUserList />,
    },
    {
      title: '회원가입 신청',
      key: 't2',
      content: <TenantUserRegistApplicationList />,
    },
  ];

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          label={t('LABEL.button.regist')}
          variant="primary"
          size="sm"
          onClick={() => router.navigate({ to: '/platform/tenant/management/user/user-regist' })}
        />
      </ContentsButtons>
      <MainContents>
        <Tabs
          items={tabItems}
          type="fill"
          size="sm"
          selectedTabKey={selectedTabKey}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
