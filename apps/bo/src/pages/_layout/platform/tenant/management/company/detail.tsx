import { useRef } from 'react';

import { PageContainer, MainContents, ContentsButtons } from '@widgets/layout';

import { CompanyDetail } from '@features/platform/company/ui/company-detail';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/platform/tenant/management/company/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const formRef = useRef(1);

  return (
    <PageContainer>
      <MainContents>
        <CompanyDetail ref={formRef} mode="view" />
      </MainContents>
    </PageContainer>
  );
}
