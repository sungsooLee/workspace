import { useState, useCallback } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { cn } from '@learnway/shared';
import { Button, GridBox, Checkbox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import { formUtils } from '@entities/form-utils';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

interface ChannelDetailBoardArticleListProps {
  onArticleClick?: (articleId: number) => void;
}

const ChannelDetailBoardArticleListComponent = ({
  onArticleClick,
}: ChannelDetailBoardArticleListProps) => {
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch, data: gridData } = useGridBox(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  const handleArticleClick = useCallback(
    (articleId: number) => {
      onArticleClick?.(articleId);
    },
    [onArticleClick],
  );

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('boardType', {
      cell: (info) => info.getValue(),
      header: '게시판 유형',
      size: 130,
      enableGrouping: false,
    }),
    columnHelper.accessor('boardCode', {
      cell: (info) => info.getValue(),
      header: '게시판 코드',
      size: 100,
      enableGrouping: false,
    }),

    columnHelper.accessor('articleDivision', {
      cell: (info) => info.getValue(),
      header: '게시물 분류',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('title', {
      cell: (info) => (
        <Button className="link" onClick={() => handleArticleClick(info.row.original.articleId)}>
          {info.row.original.title}
        </Button>
      ),
      header: '제목',
      enableGrouping: false,
    }),
    columnHelper.accessor('isFixed', {
      cell: (info) => (info.getValue() ? t('고정') : t('비고정')),
      header: '고정 공지 여부',
      enableGrouping: false,
      size: 130,
    }),
    columnHelper.accessor('fixedDuration', {
      cell: (info) => info.getValue(),
      header: t('고정 공지 게시 기간'),
      enableGrouping: false,
      size: 190,
    }),
    columnHelper.accessor('isActive', {
      cell: (info) => (info.getValue() ? t('노출') : t('비노출')),
      header: '노출 여부',
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('view', {
      cell: (info) => info.getValue(),
      header: t('조회수'),
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('createdBy', {
      cell: (info) => info.getValue(),
      header: '등록자',
      size: 130,
      enableGrouping: false,
    }),
    columnHelper.accessor('createdDate', {
      cell: (info) => info.getValue(),
      header: '등록일',
      enableGrouping: false,
      size: 130,
    }),
  ] as ColumnDef<any, unknown>[];

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox
            config={gConfig}
            columns={columns}
            showNumberingColumn={true}
            title="게시물 목록"
            customButtonNode={<Checkbox size="sm" label={t('내가 등록한 게시물')} />}
          />
        </div>
      </div>
    </>
  );
};

export const ChannelDetailBoardArticleList = ChannelDetailBoardArticleListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'boardType',
        type: 'dropdown',
        label: t('게시판 유형'),
        value: '',
        options: [{ value: '', label: t('전체') }],
      },
      {
        name: 'boardDivision',
        type: 'dropdown',
        label: t('게시판 분류'),
        value: '',
        options: [{ value: '', label: t('전체') }],
      },
      {
        name: 'title',
        type: 'text',
        label: t('제목'),
        value: '',
        placeholder: '',
      },
    ],
    [
      {
        name: 'isFixed',
        type: 'dropdown',
        label: t('고정 공지 여부'),
        value: '',
        options: [{ value: '', label: t('전체') }],
      },
      {
        name: 'isActive',
        type: 'dropdown',
        label: t('노출 여부'),
        value: '',
        options: [{ value: '', label: t('전체') }],
      },
      {
        name: 'registerDate',
        type: 'date-range',
        label: t('등록 기간'),
        value: {
          from: formUtils.now({ unit: 'day', offset: -30 }),
          to: formUtils.now(),
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
      articleId: 1,
      boardType: '채널 게시판',
      boardCode: '123',
      articleDivision: '일반',
      title: '게시물 등록시 작성한 제목',
      isFixed: false,
      fixedDuration: '',
      isActive: true,
      view: 1000,
      createdBy: '김현대',
      createdDate: '2025-01-01 11:11:11',
    },
  ],

  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
