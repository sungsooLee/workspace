import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer, MainContents, ContentsButtons, LinkBox } from '@shared/ui';

import { Tabs, Button } from '@learnway/ui';

import { TenantUserApplicationDetail } from '@features/platform-management/tenant';

export const Route = createLazyFileRoute('/_layout/platform/tenant/user/application-detail')({
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
            onClick={() => router.navigate({ to: '/platform/tenant/user' })}
          />
        </LinkBox>
        <Button
          label={t('반려')}
          variant="gray2"
          size="sm"
          //onClick={() => router.navigate({ to: '/platform/tenant/management/regist' })}
        />
        <Button
          label={t('승인')}
          variant="primary"
          size="sm"
          //onClick={() => router.navigate({ to: '/platform/tenant/management/regist' })}
        />
      </ContentsButtons>
      <MainContents>
        <TenantUserApplicationDetail />
      </MainContents>
    </PageContainer>
  );
}
