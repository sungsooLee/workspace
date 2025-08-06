import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { TenantHolidayList } from '@features/tenant-management/tenant/holiday/tenant-holiday-list';
import { Button } from '@learnway/ui/button';
import { t } from 'i18next';
import { EnFormMode } from '@shared/types/enums';

export const Route = createFileRoute('/_layout/tenant/holiday/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter();

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.navigate({ to: '/tenant/holiday/detail', state: {mode: EnFormMode.ADD} })}
          label={t('등록')}
        />
      </ContentsButtons>
      <MainContents>
        <TenantHolidayList rootPath="/"/>
      </MainContents>
    </PageContainer>
  );
}
