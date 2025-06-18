import { FC, useEffect, useState, useCallback } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { FormSubTitle, FormRow, ContentsHistoryInfoFormField } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { cn } from '@learnway/shared';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import {
  DynamicFormConfig,
  useDynamicForm,
  useSearchBox,
  SearchBoxConfig,
  CODE_GROUP,
} from '@learnway/hooks';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

const CompanyUserDetailLearningHistoryComponent: FC<any> = () => {
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);
  return (
    <>
      <SearchBox provider={sProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox config={gConfig} columns={columns} title={t('교육 이력 목록')} />
        </div>
      </div>
    </>
  );
};

export const CompanyUserDetailLearningHistory = CompanyUserDetailLearningHistoryComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        required: true,
        name: 'tenantId',
        type: 'dropdown',
        format: 'number',
        label: t('테넌트'),
        value: undefined,
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 또는 선택',
        },
      },
      {
        name: 'company',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyCode'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 또는 선택',
        },
      },
      {
        name: 'email',
        type: 'text',
        label: t('이메일'),
        value: '',
        placeholder: '',
      },
      {
        name: 'registerType',
        type: 'dropdown',
        label: t('회원가입방식'),
        value: '',
        optionsConfig: {
          options: [{ label: t('전체'), value: '' }],
          codeGroup: CODE_GROUP['pms.company.LinkageSystem'],
        },
      },
    ],
    [
      {
        name: 'sabun',
        type: 'text',
        label: t('사번'),
        value: '',
        placeholder: '',
      },
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
        value: 'opt1',
        options: [
          { label: '정상', value: 'opt1' },
          { label: '잠김', value: 'opt2' },
          { label: '휴면(정상)', value: 'opt3' },
          { label: '휴면(잠김)', value: 'opt4' },
        ],
      },
      {
        name: 'approvalStatus',
        type: 'dropdown',
        label: t('승인 상태'),
        value: 'opt1',
        options: [{ label: '정상', value: 'opt1' }],
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
  data: [],

  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('gubun1', {
    cell: (info) => info.getValue(),
    header: '구분',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('gubun2', {
    cell: (info) => info.getValue(),
    header: '구분',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('gubun3', {
    cell: (info) => info.getValue(),
    header: '구분',
    size: 200,
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
