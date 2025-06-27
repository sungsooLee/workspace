import { useEffect, useCallback } from 'react';
import { t } from 'i18next';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { formUtils } from '@entities/form-utils';
import { roleApplicationQueryOptions } from '@entities/role/service/role-manage.queries';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

export const Route = createFileRoute('/_layout/platform/role/application/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  useEffect(() => {
    gridFetch();
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    console.log('data', data);
    const searchData = {
      ...data,
      createdDate: data.createdDate ? getDateToString(new Date(data.createdDate), 'YYYYMMDD') : '',
    };
    gridFetch(searchData);
  }, []);

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <GridBox config={gConfig} columns={columns} multiple title={t('역할신청 관리')} />
          </div>
        </div>
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        required: true,
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        value: undefined,
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyId'],
        },
        format: 'number',
        isSearchable: true,
        isClearable: true,
        placeholder: '입력 선택',
      },
      {
        name: 'userName',
        type: 'text',
        label: t('이름'),
        value: '',
        placeholder: t('입력'),
      },
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        value: '',
        placeholder: t('입력'),
      },
    ],
    [
      {
        name: 'roleId',
        type: 'dropdown',
        label: t('HRD 담당자 역할'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.bo.role.roidId'],
        },
      },
      {
        name: 'status',
        type: 'dropdown',
        label: t('신청 상태'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.role.RoleApplicationStatus'],
        },
      },
      {
        name: 'createdDate',
        type: 'date',
        label: t('신청일'),
        format: 'object',
        value: '',
        placeholder: t('입력'),
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: roleApplicationQueryOptions.list,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.group({
    id: 'role',
    header: t('신청한 역할'),
    meta: {
      headerAlign: 'center',
    },
    columns: [
      columnHelper.accessor('roleType', {
        header: t('역할 타입'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 150,
      }),
      columnHelper.accessor('roleName', {
        header: t('역할명'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
      }),
      columnHelper.accessor('startDate', {
        header: t('역할 시작일'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 100,
      }),
      columnHelper.accessor('endDate', {
        header: t('역할 종료일'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 100,
      }),
    ],
  }),
  columnHelper.group({
    id: 'applicant',
    header: t('신청자 정보'),
    meta: {
      headerAlign: 'center',
    },
    columns: [
      columnHelper.accessor('companyName', {
        header: t('회사명'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('deptName', {
        header: t('부서명'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('employeeNumber', {
        header: t('사번'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('userName', {
        header: t('이름'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
    ],
  }),
  columnHelper.accessor('createdDate', {
    header: t('역할 신청 일시'),
    cell: (info) =>
      info.getValue() === null
        ? ''
        : getDateToString(new Date(info.row.original.createdDate), DATE_TIME_FORMAT.DATETIME_SEC),
    enableGrouping: false,
    size: 160,
  }),
  columnHelper.accessor('status', {
    header: t('역할 신청 상태'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
    size: 100,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('roleApplicationId', {
    header: t('이력'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
    size: 80,
  }),
] as ColumnDef<any, unknown>[];
