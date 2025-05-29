import { FC, useEffect, useState, useCallback } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { cn } from '@learnway/shared';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { FormSubTitle } from '@shared/ui';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

const CompanyDetailHRUsergroupComponent: FC<any> = () => {
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  const [partOptions, setPartOptions] = useState<any[]>([]);

  const searchConfig: SearchBoxConfig = {
    builders: [
      [
        {
          name: 'company',
          type: 'dropdown',
          label: t('회사'),
          value: '',
          optionsConfig: {
            codeGroup: CODE_GROUP['manual.company.companyCode'],
          },
          dropdownConfig: {
            onChange: (value: any) => {
              console.log('===== onchange', value);
              return '';
            },
          },
        },
        {
          name: 'part',
          type: 'dropdown',
          label: t('본부/사업부'),
          value: '',
          options: partOptions,
        },
        {
          name: 'dept',
          type: 'dropdown',
          label: t('부서'),
          value: '',
          options: [],
        },
      ],
      [
        {
          name: 'affiliation',
          type: 'dropdown',
          label: t('소속'),
          value: '',
          options: [],
        },
        {
          name: 'employeeNumber',
          type: 'text',
          label: t('사번'),
          value: '',
        },
        {
          name: 'name',
          type: 'text',
          label: t('이름'),
          value: '',
        },
      ],
    ],
  };

  const { provider: searchProvider, getValues, fetchData } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    //gridFetch(data);
  }, []);

  useEffect(() => {
    const initialData = {
      company: companyCode,
      name: '',
      part: '',
      dept: '',
      affiliation: '',
      employeeNumber: '',
    };
    fetchData(initialData);
  }, []);

  return (
    <>
      <FormSubTitle label={t('유저그룹 대상자')} lineType={'light'} />
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox
            config={gConfig}
            columns={columns}
            title={t('유저그룹 대상자 목록')}
            height={440}
          />
        </div>
      </div>
    </>
  );
};

export const CompanyDetailHRUsergroup = CompanyDetailHRUsergroupComponent;

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],

  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('company', {
    cell: (info) => info.getValue(),
    header: '회사',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('part', {
    cell: (info) => info.getValue(),
    header: '본부/사업부',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('dept', {
    cell: (info) => info.getValue(),
    header: '부서',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('affiliation', {
    cell: (info) => info.getValue(),
    header: '소속',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('employeeNumber', {
    cell: (info) => info.getValue(),
    header: '사번',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: '이름',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('employmentStatus', {
    cell: (info) => info.getValue(),
    header: '재직여부',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('accountStatus', {
    cell: (info) => info.getValue(),
    header: '계정상태',
    size: 100,
  }),
] as ColumnDef<any, unknown>[];
