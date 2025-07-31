import { useEffect, useState } from 'react';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import { PageContainer, MainContents, ContentsButtons } from '@shared/ui';

import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { SearchBox } from '@shared/ui/search-box';

import { queryOptions } from '@entities/companies/service/companies.queries';

import { EnGlobalConst } from '@types';
import { TenantCompanyList } from '@features/platform-management/tenant/company/company-list';
import { Button } from '@learnway/ui/button';

export const Route = createFileRoute('/_layout/platform/tenant/company/')({
  component: RouteComponent });

/**
 * 화면번호: NLP_BO_TMS_1111_19
 * @returns
 */

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <TenantCompanyList />
      </MainContents>
    </PageContainer>
  );
}

