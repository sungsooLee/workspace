import React, { useCallback } from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import { Button, GridBox, useGridBox } from '@learnway/ui';
import { SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { queryOptions } from '@entities/label-messages-mock';
import { LabelMessage, LabelMessagesQueryParams } from '@types';
import { ContentsButtons, MainContents, PageContainer } from '@widgets/layout';
import { SearchBox } from '@shared/ui/search-box';
import { DATE_TIME_FORMAT, formatDate } from '@learnway/shared';

export const Route = createFileRoute('/_unauth/sample/search-box-grid-box-sample/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox<LabelMessage>(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" label={t('과정개설')} />
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <GridBox config={gConfig} showNumberingColumn />
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
  rowId: 'labelMessageName',
  columns: [
    // 분류
    { name: 'labelMessageType', label: () => t('LABEL.grid.column.type'), size: 100 },
    // 라벨/메세지 코드
    {
      name: 'labelMessageMultilingulKey',
      label: t('LABEL.grid.column.labelMessageCode'),
      size: 200,
    },
    // 라벨/메세지
    { name: 'labelMessageName', label: t('LABEL.grid.column.labelMessage'), size: 200 },
    // 사용여부
    {
      name: 'isUsed',
      label: t('LABEL.grid.column.useYn'),
      size: 104,
      render: (info: any) => (info.getValue() ? 'Y' : 'N'),
    },
    // 등록자
    {
      name: 'createdBy',
      size: 139,
      label: t('LABEL.grid.column.createdBy'),
    },
    // 등록일
    {
      name: 'createdDate',
      label: t('LABEL.grid.column.createdDate'),
      size: 200,
      render: (info: any) => formatDate(info.getValue(), DATE_TIME_FORMAT.DATETIME_SEC),
    },
  ],
  gridState: {
    page: 0,
    size: 10,
    sort: ['labelMessageMultilingulKey,desc'],
  },
};
