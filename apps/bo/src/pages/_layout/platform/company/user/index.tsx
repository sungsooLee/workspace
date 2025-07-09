import { useEffect, useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { t } from 'i18next';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Button, Divider, GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { useQueryClient } from '@tanstack/react-query';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { formUtils } from '@entities/form-utils';
import { EnGlobalConst } from '@types';
import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { MainContents, PageContainer } from '@shared/ui';

export const Route = createFileRoute('/_layout/platform/company/user/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { provider: searchProvider, getValues, setValue, setOptions } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const tenantIdWatch = useWatch({ control: searchProvider.control, name: 'tenantId' });

  useEffect(() => {
    gridFetch();
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    console.log('search', data);
    gridFetch(data);
  }, []);

  useEffect(() => {
    setValue('companyId', '');
    if (tenantIdWatch) {
      (async () => {
        const companys = await queryClient.fetchQuery(
          companysQueryOptions.tenantCompany(tenantIdWatch),
        );
        const companyIdOptions = companys.map((item) => ({
          label: item.name,
          value: item.companyId,
        }));
        setOptions('companyId', companyIdOptions);
      })();
    } else {
      setOptions('companyId', []);
    }
  }, [tenantIdWatch]);

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <Divider />
        <GridBox config={gConfig} columns={columns} title="유저 목록" />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        required: true,
        name: 'tenantId',
        type: 'dropdown',
        format: 'number',
        label: t('테넌트'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
        presetOptionLabel: t('LABEL.form.label.select'),
      },
      {
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        format: 'object',
        value: '',
        presetOptionLabel: t('LABEL.form.label.select'),
        options: [],
      },
      {
        name: 'sabun',
        type: 'text',
        label: t('사번'),
        value: '',
        placeholder: '',
      },
    ],
    [
      {
        name: 'role',
        type: 'dropdown',
        label: t('학습자 역할'),
        value: '',
        options: [
          { label: '전체', value: '' },
          { label: '조직장', value: 'A' },
          { label: '조직원', value: 'B' },
          { label: '교육팀장', value: 'C' },
        ],
      },
      {
        name: 'accountStatus',
        type: 'dropdown',
        label: t('계정 상태'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.user.AccountStatus'],
        },
        presetOptionLabel: t('전체'),
      },
      {
        name: 'regStrDate',
        type: 'date-range',
        label: t('회원가입 기간'),
        value: {
          from: undefined,
          to: undefined,
        },
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [
    {
      tenant: '테넌트',
      companyType: 'CAR',
      companyName: '회사명',
      deptName: '부서명',
      name: '홍길동',
    },
  ],

  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('tenant', {
    header: t('테넌트'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('companyType', {
    header: t('그룹'),
    cell: (info) => t('pms.company.CompanyType.' + info.getValue()),
    enableGrouping: false,
  }),
  columnHelper.accessor('companyName', {
    header: t('회사'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('deptName', {
    header: t('소속'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('c1', {
    header: t('호칭(직위)'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('employeeNumber', {
    header: t('사번'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('name', {
    header: t('이름'),
    cell: (info) => (
      <Link
        to="/platform/company/user/detail"
        // state={{
        //   companyCode: info.row.original.companyCode,
        // }}
        className="link"
      >
        {info.row.original.name}
      </Link>
    ),
    enableGrouping: false,
  }),
  columnHelper.accessor('c2', {
    header: t('학습자 역할'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor('userStatus', {
    cell: (info) => t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.Status.${info.getValue()}`),
    header: t('재직여부'),
    size: 60,
  }),
  columnHelper.accessor('accountStatus', {
    cell: (info) =>
      t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.AccountStatus.${info.getValue()}`),
    header: t('계정상태'),
    size: 60,
  }),
  columnHelper.accessor('unlock', {
    header: t('잠김해제'),
    cell: (info) => <Button variant="gray" label={t('잠김해제')} />,
    enableGrouping: false,
  }),
  columnHelper.accessor('login', {
    header: t('로그인'),
    cell: (info) => <Button variant="gray" label={t('로그인')} />,
    enableGrouping: false,
  }),
  columnHelper.accessor('createdDate', {
    header: t('회원가입일'),
    cell: (info) =>
      info.getValue() === null
        ? ''
        : getDateToString(new Date(info.row.original.createdDate), DATE_TIME_FORMAT.DATETIME_SEC),
    enableGrouping: false,
    meta: {
      cellAlign: 'center',
    },
  }),
] as ColumnDef<any, unknown>[];
