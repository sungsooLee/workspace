import { useState, useCallback } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { IcoRefresh02, IcoSearch } from '@learnway/icons';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { SearchBox } from '@shared/ui/search-box';
import { useRouter } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Button, GridBox, useGridBox, Input, DynamicFormField, Dropdown } from '@learnway/ui';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';

import { tenantQueryOptions } from '@entities/tenant/service/tenant.queries';
export const Route = createFileRoute('/_layout/tenant/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const gridConfig = {
    query: tenantQueryOptions.all,
    columns: [
      {
        name: 'no1',
        label: 'NO.',
        type: 'numbering',
      },
      {
        name: 'tenantName',
        label: t('테넌트명'),
        render: (info: any) => (
          <Button
            className="link"
            onClick={() => {
              router.navigate({
                to: '/tenant/management/detail',
                state: { tenantId: info.row.original.tenantId },
              });
            }}
          >
            {info.row.original.tenantName}
          </Button>
        ),
      },
      {
        name: 'tenantSite',
        label: t('테넌트 사이트'),
        render: (info: any) => (
          <Link to={info.getValue()} className="link">
            {info.getValue()}
          </Link>
        ),
      },
      { name: 'company', label: t('회사') },
      { name: 'hrdOwner', label: '테넌트 담당자' },
      { name: 'companyNumber', label: '사용여부' },
      { name: 'name', label: '등록자' },
      { name: 'roleTerm', label: '등록일시' },
      { name: 'tenure', label: '수정자' },
      { name: 'roleStatus', label: '수정일시' },
    ],
    data: [
      {
        id: '1',
        tenantId: 1,
        tenantName: '테넌트A',
        tenantSite: '/abcdefg',
        channelName: '내 관리 채널명',
        company: '현대자동차',
        tenantOwner: '경영지원팀',
        hrdOwner: '테넌트 담당자',
        companyNumber: '1234567',
        name: '김현대',
        roleTerm: '2025-01-03 ~ 2025-01-03',
        tenure: '재직',
        roleStatus: '정상',
      },
      {
        id: '1',
        tenantId: 2,
        tenantName: '테넌트B 2',
        tenantSite: '/abcdefg',
        channelName: '내 관리 채널명',
        company: '현대자동차',
        tenantOwner: '경영지원팀',
        hrdOwner: '테넌트 담당자',
        companyNumber: '1234567',
        name: '김현대',
        roleTerm: '2025-01-03 ~ 2025-01-03',
        tenure: '재직',
        roleStatus: '정상',
      },
    ],

    pagination: {
      pageSize: 10,
      pageIndex: 0,
      totalRows: 0,
    },
  };

  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data } = useGridBox(gridConfig, getValues);

  // useDynamicForm(formConfig);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);
  const handleNewTenant = useCallback(async () => {
    if (!data) return;
  }, [data]);

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <GridBox config={gConfig} />
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
        label: t('테넌트명'),
        value: '',
        options: [
          { value: 'tenantA', label: t('테넌트A') },
          { value: 'tenantB', label: t('테넌트B') },
          { value: 'tenantC', label: t('테넌트C') },
          { value: 'tenantD', label: t('테넌트D') },
          { value: 'tenantE', label: t('테넌트E') },
          { value: 'tenantF', label: t('테넌트F') },
        ],
        dropdownConfig: {
          // onChange: () => {
          //   return '';
          // },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
      {
        name: 'company',
        type: 'dropdown',
        label: t('회사명'),
        value: '',
        options: [
          { value: 'companyA', label: t('회사A') },
          { value: 'companyB', label: t('회사B') },
          { value: 'companyC', label: t('회사C') },
          { value: 'companyD', label: t('회사D') },
          { value: 'companyE', label: t('회사E') },
          { value: 'companyF', label: t('회사F') },
        ],
        dropdownConfig: {
          // onChange: () => {
          //   return '';
          // },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
      {
        name: 'tenantOwner',
        type: 'dropdown',
        label: t('테넌트담당자'),
        value: '',
        options: [
          { value: 'tenantOwner', label: t('회사A') },
          { value: 'companyB', label: t('회사B') },
          { value: 'companyC', label: t('회사C') },
          { value: 'companyD', label: t('회사D') },
          { value: 'companyE', label: t('회사E') },
          { value: 'companyF', label: t('회사F') },
        ],
        dropdownConfig: {
          // onChange: () => {
          //   return '';
          // },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
    ],
    [
      {
        name: 'companyOwner',
        type: 'dropdown',
        label: t('회사 담당자'),
        value: '',
        options: [
          { value: 'companyOwner1', label: t('회사담당1') },
          { value: 'companyOwner2', label: t('회사담당2') },
          { value: 'companyOwner3', label: t('회사담당3') },
          { value: 'companyOwner4', label: t('회사담당4') },
          { value: 'companyOwner5', label: t('회사담당5') },
        ],
        dropdownConfig: {
          // onChange: () => {
          //   return '';
          // },
          isSearchable: true,
          placeholder: '입력 선택',
        },
      },
      {
        name: 'useable',
        type: 'dropdown',
        label: t('사용여부'),
        value: 'ALL',
        options: [
          { value: 'ALL', label: t('전체') },
          { value: 'Y', label: t('사용') },
          { value: 'N', label: t('미사용') },
        ],
      },
    ],
  ],
};
