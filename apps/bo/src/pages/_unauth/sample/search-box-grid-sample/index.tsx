import React, { useCallback, useEffect } from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { queryOptions } from '@entities/label-messages';
import { LabelMessagesQueryParams } from '@types';
import { ContentsButtons, MainContents, PageContainer } from '@widgets/layout';
import { SearchBox } from '@shared/ui/search-box';

export const Route = createFileRoute('/_unauth/sample/search-box-grid-sample/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  useEffect(() => {
    gridFetch(getValues(), { page: 0, size: 10 });
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    console.log('handleOnSearch.data', data);
    gridFetch(data);
  }, []);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" label={t('과정개설')} />
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <GridBox config={{ ...gConfig, data: [{}, {}] }} />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: '채널',
        type: 'dropdown',
        label: t('채널'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'COMMON_CODE', label: t('채널') },
        ],
      },
      {
        name: '테넌트',
        type: 'dropdown',
        label: t('테넌트'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'COMMON_CODE', label: t('테넌트') },
        ],
      },
      {
        name: '유형',
        type: 'dropdown',
        label: t('유형'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'COMMON_CODE', label: t('유형') },
        ],
      },
      {
        name: '운영자',
        type: 'text',
        label: t('운영자'),
        value: '',
      },
    ],
    [
      {
        name: '개설년도',
        type: 'dropdown',
        label: t('개설년도'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'COMMON_CODE', label: t('개설년도') },
        ],
      },
      {
        name: '사용여부',
        type: 'dropdown',
        label: t('사용여부'),
        value: '',
        options: [
          { value: '', label: '전체' },
          { value: 'COMMON_CODE', label: t('사용여부') },
        ],
      },
      {
        name: '과정코드',
        type: 'text',
        label: t('과정코드'),
        value: '',
      },
      {
        name: '과정명',
        type: 'text',
        label: t('과정명'),
        value: '',
      },
    ],
  ],
};

const gridConfig = {
  query: queryOptions.all<LabelMessagesQueryParams>,
  columns: [
    { name: '채널', label: '채널', render: (info: any) => 'xxx' },
    { name: '테넌트', label: '테넌트', render: (info: any) => '222222' },
    { name: '과정유형', label: '과정유형' },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
