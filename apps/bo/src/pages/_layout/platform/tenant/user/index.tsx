import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { TenantUserRegistApplicationList } from '@features/platform-management/tenant';
import { Button } from '@learnway/ui/button';
import { Tabs } from '@learnway/ui/tabs';

import { CompanyUserList } from '@features/platform-management/company';

import { tenantQueryOptions } from '@entities/tenant';

export const Route = createFileRoute('/_layout/platform/tenant/user/')({
  component: RouteComponent,
});

/**
 * 화면번호: NLP_BO_TMS_1111_07 , NLP_BO_TMS_1111_15
 * @returns
 */
function RouteComponent() {
  const router = useRouter();

  const { data: loginUser } = useFetchAuthUser();
  const queryClient = useQueryClient();

  const [companyCodes, setCompanyCodes] = useState<string[]>([]);
  const [selectedTabKey, setSelectedTabKey] = useState<string>('t1');

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  useEffect(() => {
    if (!loginUser) return;

    const tenantIdOptions = loginUser.tenants.map((tenant) => ({
      value: tenant.tenantId,
      label: tenant.tenantName,
    }));
    const tenantIds = tenantIdOptions.map((item) => item.value);

    (async () => {
      const companys = await queryClient.fetchQuery(tenantQueryOptions.tenantCompanys(tenantIds));
      const companyCodes = companys.map((item) => item.companyCode);
      setCompanyCodes(companyCodes);
    })();
  }, [loginUser]);
  const tabItems = [
    {
      title: t('유저'),
      key: 't1',
      // content: <TenantUserList rootPath="/platform" />,
      content: <CompanyUserList detailPath="/platform/tenant/user/detail" />,
    },
    {
      title: t('회원가입 신청'),
      key: 't2',
      content: <TenantUserRegistApplicationList rootPath="/platform" />,
    },
  ];

  return (
    <PageContainer hideOutLine={true}>
      <ContentsButtons>
        {selectedTabKey && selectedTabKey === 't1' && (
          <Button
            label={t('LABEL.button.regist')}
            variant="primary"
            size="sm"
            onClick={() => {
              if (companyCodes && companyCodes.length > 0) {
                router.navigate({
                  to: '/platform/tenant/user/user-regist',
                  state: { companyCodes },
                });
              }
            }}
          />
        )}
      </ContentsButtons>
      <MainContents>
        <Tabs
          items={tabItems}
          type="fill"
          size="sm"
          showContentBorder
          selectedTabKey={selectedTabKey}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
