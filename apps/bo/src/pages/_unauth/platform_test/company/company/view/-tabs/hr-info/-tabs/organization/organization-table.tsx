import React, { useCallback } from 'react';
import { t } from 'i18next';
import { useSearchBox } from '@learnway/hooks';
import { SearchBox } from '@shared/ui/search-box';
import { GridBox, useGridBox } from '@shared/ui/grid-box';
import { translationQueryOptions } from '@entities/translation/service/translation.queries';

export const OrganizationTable = () => {
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { gridFetch } = useGridBox(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    console.log('OrganizationRight : handleOnSearch', data);
    // gridFetch(data);
  }, []);

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <GridBox config={gridConfig} />
    </>
  );
};

const searchConfig: any = {
  builders: [
    [
      {
        name: 'companyTypeCode',
        type: 'dropdown',
        label: t('회사구분'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: '완성차', label: t('완성차') },
          { value: '현대', label: t('현대') },
          { value: '기아', label: t('기아') },
        ],
      },
      {
        name: 'name',
        type: 'text',
        label: t('회사/법인명'),
        value: '',
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 2, label: t('사용') },
          { value: 3, label: t('미사용') },
        ],
      },
    ],
  ],
};

const gridConfig = {
  query: translationQueryOptions.all,
  title: t('회사(법인)목록'),
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    { name: '회사구분', label: '회사구분' },
    { name: '법인코드', label: '법인코드' },
    { name: '회사/법인명', label: '회사/법인명' },
    { name: '대표자', label: '대표자' },
    { name: '사업자번호', label: '사업자번호' },
    { name: '사용여부', label: '사용여부' },
    { name: '담당자', label: '담당자' },
    { name: '등록일자', label: '등록일자' },
  ],
  data: [],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
  height: 300,
  hideColumnSettings: true,
  showExcelDownload: true,
};
