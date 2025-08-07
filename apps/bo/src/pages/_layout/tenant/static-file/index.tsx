import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button } from '@learnway/ui/button';
import { EnFormMode } from '@shared/types/enums';
import { t } from 'i18next';
import { TenantStaticFileList } from '@features/tenant-management/tenant/static-file/tenant-static-file-list';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';

export const Route = createFileRoute('/_layout/tenant/static-file/')({
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
          onClick={() => router.navigate({ to: '/tenant/static-file/detail', state: {mode: EnFormMode.ADD} })}
          label={t('등록')}
        />
      </ContentsButtons>
      <MainContents>
        <TenantStaticFileList />
      </MainContents>
    </PageContainer>
  );
}
