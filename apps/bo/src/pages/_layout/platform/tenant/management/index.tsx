import { createFileRoute, Link } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';

import { useRouter } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Button, GridBox, useGridBox, Input, DynamicFormField, Dropdown } from '@learnway/ui';

import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { TenantManagmentList } from '@features/tenant/management/ui/tenant-managment-list';

export const Route = createFileRoute('/_layout/platform/tenant/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.navigate({ to: '/platform/tenant/management/regist' })}
        >
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <TenantManagmentList />
      </MainContents>
    </PageContainer>
  );
}
