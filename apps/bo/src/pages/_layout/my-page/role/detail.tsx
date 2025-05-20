import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';

import { SearchBoxConfig, useCurrentRoute, useSearchBox } from '@/libs/hooks/src';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { pageRouteConfig } from '@features/auth';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { Button, GridBox, useGridBox } from '@/libs/ui/src';
import { SearchBox } from '@shared/ui/search-box';

export const Route = createFileRoute('/_layout/my-page/role/detail')({
  component: RouteComponent,
  ...pageRouteConfig({ meta: { title: '나의 권한' } }),
});

function RouteComponent() {
  const { state } = useCurrentRoute(Route);
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
    totalRows: 20,
  });
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    console.log(data);
  };

  console.log(' PAGE STATE :', state);
  return (
    <PageContainer>
      <ContentsButtons>
        <Link to="/my-page/role">
          <Button type="button" variant="point" size="sm">
            목록
          </Button>
        </Link>
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <GridBox
          // hideRowSelectionRadioBox={false}
          onRowSelect={(row: any) => {
            console.log('row::', row);
            setSelectedRow(row);
          }}
          config={gConfig}
          pagination={{
            ...pagination,
            onPageChange: (pageIndex) => {
              console.log('pageIndex :: ', pageIndex);
              setPagination((prev) => ({ ...prev, pageIndex }));
            },
            onPageSizeChange: (pageSize) => {
              console.log('pageSize :: ', pageSize);
              setPagination((prev) => ({ ...prev, pageSize }));
            },
          }}
        />
        <form>
          <div>폼</div>
        </form>
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenant',
        type: 'dropdown',
        label: t('신청상태'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
      },
      {
        name: 'channel',
        type: 'date-range',
        label: t('신청일'),
        value: {
          from: undefined,
          to: undefined,
        },
      },
    ],
  ],
};

const gridConfig = {
  query: '',
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    {
      name: 'role',
      label: t('HRD 담당자 역할'),
    },
    {
      name: 'rolePeriod',
      label: t('권한 기간'),
    },
    { name: 'approveStatus', label: t('신청 상태') },
    { name: 'createDate', label: t('신청일') },
    { name: 'approveDate', label: t('승인/반려일') },
    { name: 'approveUser', label: t('승인/반려자') },
  ],
  data: [
    {
      role: '태넌트 관리자',
      rolePeriod: '2025-10-10 ~ 2025-11-10',
      approveStatus: '승인',
      createDate: '2025-10-10',
      approveDate: '2025-10-10',
      approveUser: '김현대',
    },
    {
      role: '채널 관리자',
      rolePeriod: '2025-10-10 ~ 2025-11-10',
      approveStatus: '반려',
      createDate: '2025-10-10',
      approveDate: '2025-10-10',
      approveUser: '김현대',
    },
  ],
};
