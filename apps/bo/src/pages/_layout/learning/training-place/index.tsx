import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { Dropdown, Button, Input, GridBox, useGridBox } from '@learnway/ui';
import { IcoInfoCircle } from '@learnway/icons';
import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from '@tanstack/react-router';

import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import { queryOptions as trainingPlaceQueryOptions } from '@entities/training-place/service/training-place.queries';
import { useCallback } from 'react';
import { size } from 'lodash';

export const Route = createFileRoute('/_layout/learning/training-place/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);
  /*
  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('sort', {
      cell: (info) => info.getValue(),
      header: '구분',
      enableGrouping: false,
      size: 200,
    }),
    columnHelper.accessor('spot', {
      cell: (info) => info.getValue(),
      header: '장소 명',
      size: 300,
      enableGrouping: false,
    }),
    columnHelper.accessor('useable', {
      cell: (info) => info.getValue(),
      header: '사용가능',
      size: 90,
      enableGrouping: false,
    }),
    columnHelper.accessor('reservation', {
      cell: (info) => info.getValue(),
      header: '예약가능',
      size: 90,
      enableGrouping: false,
    }),
    columnHelper.accessor('map', {
      cell: (info) => info.getValue(),
      header: '약도',
      size: 90,
      enableGrouping: false,
    }),
    columnHelper.accessor('link', {
      cell: (info) => info.getValue(),
      header: '링크',
      size: 90,
      enableGrouping: false,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('registerDate', {
      cell: (info) => info.getValue(),
      header: '최초등록일시',
      enableGrouping: false,
      size: 190,
    }),
    columnHelper.accessor('registerOwner', {
      cell: (info) => info.getValue(),
      header: '최초등록자',
      enableGrouping: false,
      size: 100,
    }),
    columnHelper.accessor('modificationDate', {
      cell: (info) => info.getValue(),
      header: '최종수정일시',
      enableGrouping: false,
      size: 190,
    }),
    columnHelper.accessor('modifier', {
      cell: (info) => info.getValue(),
      header: '최종수정자',
      enableGrouping: false,
      size: 100,
    }),
  ] as ColumnDef<any, unknown>[];
*/
  useEffect(() => {
    gridFetch();
  }, []);

  const handleGridRowSelect = (row: any) => {
    router.navigate({
      to: '/learning/training-place/detail',
      state: {
        placeUUID: row.educationPlaceUuid,
      },
    });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            router.navigate({
              to: '/learning/training-place/regist',
            })
          }
        >
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <div className={cn(searchStyles.start, searchStyles.wrap)}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        </div>

        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <GridBox
              config={gConfig}
              /*columns={columns}*/
              height={440}
              showColumnSettings={false}
              showExcelDownload={true}
              onRowSelect={handleGridRowSelect}
              title="교육장소 목록"
            />
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
        name: 'educationPlaceTypecd',
        type: 'dropdown',
        label: t('구분'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'CAMPUS', label: t('캠퍼스') },
          { value: 'SERVISE_TECH', label: t('서비스기술교육') },
          { value: 'ME_CLUSTER', label: t('생기클러스터') },
          { value: 'OUTSIDE', label: t('외부') },
          { value: 'ABROAD', label: t('해외') },
        ],
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용가능'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('Y') },
          { value: 'false', label: t('N') },
        ],
      },
      {
        name: 'isReservationUsed',
        type: 'dropdown',
        label: t('예약가능'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'true', label: t('Y') },
          { value: 'false', label: t('N') },
        ],
      },
      {
        name: 'educationPlaceCodeName',
        type: 'text',
        label: t('장소 명'),
        value: '',
        placeholder: t('입력'),
      },
    ],
  ],
};

const gridConfig = {
  query: trainingPlaceQueryOptions.all,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    { name: 'educationPlaceTypecd', label: '구분', size: 200 },
    { name: 'educationPlaceCodeName', label: t('장소 명'), size: 300 },
    {
      name: 'isUsed',
      label: '사용가능',
      render: (info: any) => {
        return info.row.original.isUsed ? 'Y' : 'N';
      },
      size: 90,
    },
    {
      name: 'isReservationUsed',
      label: '예약가능',
      render: (info: any) => {
        return info.row.original.isReservationUsed ? 'Y' : 'N';
      },
      size: 90,
    },
    {
      name: 'map',
      label: '약도',
      render: (info: any) => {
        const disabled = info.row.original.mapImageFileInfo?.files?.length > 0 ? false : true;
        return (
          <Link to={'/'} className="link" disabled={disabled}>
            약도보기
          </Link>
        );
      },
      size: 90,
    },
    {
      name: 'mapImageLinkContent',
      label: '링크',
      render: (info: any) => {
        //const disabled = info.row.original.mapImageLinkContent?.length > 0 ? false : true;
        //const mapLink = info.row.original.mapImageLinkContent;
        const disabled = false;
        const mapLink = 'https://www.naver.com';
        return (
          <Button
            size={'xs'}
            className="link_icon"
            onlyIcon
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              window.open(mapLink, '_blank', 'noreferrer');
            }}
          >
            <IcoInfoCircle width={16} height={16} stroke={'#4C515E'} fill={'none'} />
          </Button>
        );
      },
      size: 90,
    },
    {
      name: 'createdDate',
      label: '최초등록일시',
      render: (info: any) => {
        return getDateToString(
          new Date(info.row.original.createdDate),
          DATE_TIME_FORMAT.DATETIME_SEC,
        );
      },
      size: 190,
    },
    { name: 'createdBy', label: '최초등록자', size: 100 },
    {
      name: 'modifiedDate',
      label: '최종수정일시',
      render: (info: any) => {
        return getDateToString(
          new Date(info.row.original.modifiedDate),
          DATE_TIME_FORMAT.DATETIME_SEC,
        );
      },
      size: 190,
    },
    { name: 'lastModifiedBy', label: '최종수정자', size: 100 },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};
