import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { Button, GridBox, useGridBox, useModal } from '@learnway/ui';
import { IcoInfoCircle, IcoDownload } from '@learnway/icons';
import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from '@tanstack/react-router';

import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css'; // search-box.module.css
import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { queryOptions as trainingPlaceQueryOptions } from '@entities/training-place/service/training-place.queries';
import { useCallback } from 'react';
import { ImagePreviewModal } from '@features/shared/ui/modal/image-preview-modal';

export const Route = createFileRoute('/_layout/learning/training-place/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { open: openModal } = useModal();

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  const downloadByUrl = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('educationPlaceTypecd', {
      cell: (info) => t('pms.education.EducationPlaceType.' + info.getValue()),
      header: t('LABEL.grid.column.division'),
      enableGrouping: false,
      size: 200,
    }),
    columnHelper.accessor('educationPlaceCodeName', {
      cell: (info) => info.getValue(),
      header: t('LABEL.grid.column.placeName'),
      size: 300,
      enableGrouping: false,
    }),
    columnHelper.accessor('isUsed', {
      cell: (info) => (info.getValue() ? 'Y' : 'N'),
      header: t('LABEL.grid.column.isUsed'),
      size: 90,
      enableGrouping: false,
    }),
    columnHelper.accessor('isReservationUsed', {
      cell: (info) => (info.getValue() ? 'Y' : 'N'),
      header: t('LABEL.grid.column.isReservationUsed'),
      size: 90,
      enableGrouping: false,
    }),
    columnHelper.accessor('mapImageFileInfo', {
      cell: (info) => {
        console.log('===>>>', CODE_GROUP['pms.education.EducationPlaceType']);
        //const disabled = info.row.original.mapImageFileInfo?.files?.length > 0 ? false : true;
        const disabled = !info.row.original.isUsed;
        const imageFileUrl =
          'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
        return (
          <Button
            className="link"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              openModal({
                width: 'full',
                height: 'full',
                content: <ImagePreviewModal imageUrl={imageFileUrl} />,
                headerActionNode: (
                  <Button onlyIcon onClick={() => downloadByUrl(imageFileUrl)}>
                    <IcoDownload width={40} height={40} stroke="#131C30" />
                  </Button>
                ),
              });
            }}
          >
            {t('LABEL.button.viewMap')}
          </Button>
        );
      },
      header: t('LABEL.grid.column.map'),
      size: 90,
      enableGrouping: false,
    }),
    columnHelper.accessor('mapImageLinkContent', {
      cell: (info) => {
        //const disabled = info.row.original.mapImageLinkContent?.length > 0 ? false : true;
        //const mapLink = info.row.original.mapImageLinkContent;
        const disabled = !info.row.original.isUsed;
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
      header: t('LABEL.grid.column.link'),
      size: 90,
      enableGrouping: false,
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
    columnHelper.accessor('createdDate', {
      cell: (info) =>
        getDateToString(new Date(info.row.original.createdDate), DATE_TIME_FORMAT.DATETIME_SEC),
      header: t('LABEL.grid.column.firstCreatedDateTime'),
      enableGrouping: false,
      size: 190,
    }),
    columnHelper.accessor('createdBy', {
      cell: (info) => info.getValue(),
      header: t('LABEL.grid.column.firstCreatedBy'),
      enableGrouping: false,
      size: 100,
    }),
    columnHelper.accessor('modifiedDate', {
      cell: (info) =>
        getDateToString(new Date(info.row.original.modifiedDate), DATE_TIME_FORMAT.DATETIME_SEC),
      header: t('LABEL.grid.column.lastModifiedDateTime'),
      enableGrouping: false,
      size: 190,
    }),
    columnHelper.accessor('lastModifiedBy', {
      cell: (info) => info.getValue(),
      header: t('LABEL.grid.column.lastModifiedBy'),
      enableGrouping: false,
      size: 100,
    }),
  ] as ColumnDef<any, unknown>[];

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
          {t('LABEL.button.regist')}
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
              columns={columns}
              height={440}
              showColumnSettings={false}
              showExcelDownload={true}
              onRowSelect={handleGridRowSelect}
              title={t('LABEL.grid.title.trainingPlaceList')}
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
        label: t('LABEL.form.label.division'),
        value: '',
        optionsConfig: {
          options: [{ value: '', label: t('LABEL.all') }],
          codeGroup: CODE_GROUP['pms.education.EducationPlaceType'],
        },
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('LABEL.form.label.isUsed'),
        value: '',
        options: [
          { value: '', label: t('LABEL.all') },
          { value: 'true', label: t('Y') },
          { value: 'false', label: t('N') },
        ],
      },
      {
        name: 'isReservationUsed',
        type: 'dropdown',
        label: t('LABEL.form.label.isReservationUsed'),
        value: '',
        options: [
          { value: '', label: t('LABEL.all') },
          { value: 'true', label: t('Y') },
          { value: 'false', label: t('N') },
        ],
      },
      {
        name: 'educationPlaceCodeName',
        type: 'text',
        label: t('LABEL.form.label.placeName'),
        value: '',
        placeholder: t('LABEL.form.placeholder.input'),
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
  ],
  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
  excel: {
    download: '',
    form: {
      xlsx: '',
      csv: '',
    },
  },
};
