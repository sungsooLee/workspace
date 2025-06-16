import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { PageContainer, MainContents, ContentsButtons } from '@widgets/layout';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import { TenantCompanyOrganizationList } from '@features/tenant/organization/ui/tenant-company-organization-list';

export const Route = createFileRoute('/_layout/platform/tenant/organization/')({
  component: RouteComponent,
});

/**
 * 화면번호: NLP_BO_TMS_1111_01
 * @returns
 */
function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <TenantCompanyOrganizationList rootPath="/platform" />
      </MainContents>
    </PageContainer>
  );
}
