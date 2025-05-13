import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { cn } from '@/libs/shared/src';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { Dropdown, Button, Input } from '@/libs/ui/src';
import { IcoInfoCircle } from '@/libs/icons/src';
import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { IcoRefresh02, IcoSearch } from '@/libs/icons/src';
import { GridBox } from '@/libs/ui/src';
import { useRouter } from '@tanstack/react-router';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox } from '@/libs/hooks/src';
import { SearchBoxConfig } from '@/libs/hooks/src';
import { trainingPlaceQueryOptions } from '@entities/training-place/service/training-place.queries';
import { useCallback } from 'react';
import { useGridBox } from '@/libs/ui/src';

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

  const data: any[] = [
    {
      order: '1',
      sort: '서비스 기술교육',
      spot: 'Cell Text',
      useable: 'Y',
      reservation: 'N',
      companyOwner: '담당자명',
      map: (
        <Link to={'/'} className="link">
          약도보기
        </Link>
      ),
      link: (
        <Button size={'xs'} className="link_icon" onlyIcon>
          <IcoInfoCircle width={16} height={16} stroke={'#4C515E'} fill={'none'} />
        </Button>
      ),
      registerDate: '2025-01-01 07:12',
      registerOwner: '김현대',
      modificationDate: '2025-01-01 07:12',
      modifier: '김현대',
    },
    {
      order: '2',
      sort: '서비스 기술교육',
      spot: 'Cell Text',
      useable: 'Y',
      reservation: 'N',
      companyOwner: '담당자명',
      map: (
        <Button className="link" disabled>
          약도보기
        </Button>
      ),
      link: (
        <Button size={'xs'} className="link_icon" onlyIcon>
          <IcoInfoCircle width={16} height={16} stroke={'#4C515E'} fill={'none'} />
        </Button>
      ),
      registerDate: '2025-01-01 07:12',
      registerOwner: '김현대',
      modificationDate: '2025-01-01 07:12',
      modifier: '김현대',
    },
  ];

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

  useEffect(() => {
    gridFetch();
  }, []);

  return (
    <form className="form_row">
      <PageContainer>
        <ContentsButtons>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.navigate({ to: '/learning/training-place/regist' })}
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
                title="교육장소 목록"
              />
            </div>
          </div>
        </MainContents>
      </PageContainer>
    </form>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'placeDivision',
        type: 'dropdown',
        label: t('구분'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'campus', label: t('캠퍼스') },
          { value: 'option1', label: t('서비스기술교육') },
          { value: 'option2', label: t('생기클러스터') },
          { value: 'external', label: t('외부') },
          { value: 'overseas', label: t('해외') },
        ],
      },
      {
        name: 'useable',
        type: 'dropdown',
        label: t('사용가능'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'Y', label: t('Y') },
          { value: 'N', label: t('N') },
        ],
      },
      {
        name: 'reservationAvailable',
        type: 'dropdown',
        label: t('예약가능'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'Y', label: t('Y') },
          { value: 'N', label: t('N') },
        ],
      },
      {
        name: 'placeName',
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
  /*
  data: [
    {
      sort: '서비스 기술교육',
      spot: 'Cell Text',
      useable: 'Y',
      reservation: 'N',
      companyOwner: '담당자명',
      map: (
        <Link to={'/'} className="link">
          약도보기
        </Link>
      ),
      link: (
        <Button size={'xs'} className="link_icon" onlyIcon>
          <IcoInfoCircle width={16} height={16} stroke={'#4C515E'} fill={'none'} />
        </Button>
      ),
      registerDate: '2025-01-01 07:12',
      registerOwner: '김현대',
      modificationDate: '2025-01-01 07:12',
      modifier: '김현대',
    },
    {
      sort: '서비스 기술교육',
      spot: 'Cell Text',
      useable: 'Y',
      reservation: 'N',
      companyOwner: '담당자명',
      map: (
        <Button className="link" disabled>
          약도보기
        </Button>
      ),
      link: (
        <Button size={'xs'} className="link_icon" onlyIcon>
          <IcoInfoCircle width={16} height={16} stroke={'#4C515E'} fill={'none'} />
        </Button>
      ),
      registerDate: '2025-01-01 07:12',
      registerOwner: '김현대',
      modificationDate: '2025-01-01 07:12',
      modifier: '김현대',
    },
  ],
  */
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
    { name: 'placeType', label: '구분' },
    { name: 'placeName', label: '장소 명' },
    { name: 'isUsed', label: '사용가능' },
    { name: 'isReservationUsed', label: '예약가능' },
    { name: 'map', label: '약도' },
    { name: 'link', label: '링크' },
    { name: 'createdDate', label: '최초등록일시' },
    { name: 'createdBy', label: '최초등록자' },
    { name: 'modifiedDate', label: '최종수정일시' },
    { name: 'lastModifiedBy', label: '최종수정자' },
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};

/*
{
    "status": 200,
    "data": {
        "content": [],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 10,
            "sort": {
                "empty": false,
                "sorted": true,
                "unsorted": false
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 0,
        "totalPages": 0,
        "last": true,
        "size": 10,
        "number": 0,
        "sort": {
            "empty": false,
            "sorted": true,
            "unsorted": false
        },
        "numberOfElements": 0,
        "first": true,
        "empty": true
    }
}
*/
