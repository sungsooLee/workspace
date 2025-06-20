import { useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer, MainContents, ContentsButtons, LinkBox } from '@widgets/layout';

import { Tabs, Button } from '@learnway/ui';

import {
  TenantUserRegist,
  TenantUserList,
  TenantUserRegistApplicationList,
} from '@features/tenant';
import {
  CompanyUserDetail,
  CompanyUserDetailBase,
  CompanyUserDetailLearningHistory,
} from '@features/platform/company';

export const Route = createFileRoute('/_layout/platform/tenant/management/user/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            label={t('LABEL.button.list')}
            variant="gray2"
            size="sm"
            onClick={() => router.navigate({ to: '/platform/tenant/management/user' })}
          />
        </LinkBox>
        <Button
          label={t('LABEL.button.reset')}
          variant="gray2"
          size="sm"
          //onClick={() => router.navigate({ to: '/platform/tenant/management/regist' })}
        />
        <Button
          label={t('LABEL.button.save')}
          variant="primary"
          size="sm"
          //onClick={() => router.navigate({ to: '/platform/tenant/management/regist' })}
        />
      </ContentsButtons>
      <MainContents>
        <CompanyUserDetail />
      </MainContents>
    </PageContainer>
  );
}
