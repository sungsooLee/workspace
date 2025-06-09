import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { PageContainer, MainContents, ContentsButtons } from '@widgets/layout';

import { Tabs, Button } from '@learnway/ui';

import { TenantManagmentList } from '@features/tenant/management/ui/tenant-managment-list';

export const Route = createFileRoute('/_layout/platform/tenant/management/user-management/')({
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
      content: '유저',
    },
    {
      title: '회원가입 신청',
      key: 't2',
      content: '',
    },
  ];

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="primary"
          size="sm"
          //onClick={() => router.navigate({ to: '/platform/tenant/management/regist' })}
        >
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <Tabs
          items={tabItems}
          type="line"
          size="sm"
          selectedTabKey={selectedTabKey}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
