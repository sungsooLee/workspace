import { queryOptions } from '@entities/training-place/service/space.queries';
import { CODE_GROUP, SearchBoxConfig, useFileManager, useSearchBox } from '@learnway/hooks';
import { IcoDownload } from '@learnway/icons';
import {
  Button,
  Divider,
  GridBox,
  PreviewImage,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { Link } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EnGlobalConst, EnPageMode } from '@types';
import { t } from 'i18next';
import { forwardRef, useCallback, useImperativeHandle } from 'react';

interface TrainingPlaceListProps {
  pageMode: EnPageMode;
  onSelect?: (data: any) => void;
  onAdd?: () => void;
}

const TrainingPlaceListComponent = (props: TrainingPlaceListProps, ref: any) => {
  const { openModal } = useModal();
  const { provider: searchProvider, getValues, setValue } = useSearchBox(searchConfig());
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);

  const { getFileInfo, fileDownload } = useFileManager();

  const handleOnSearch = useCallback(
    (data: any) => {
      gridFetch(data);
    },
    [gridFetch],
  );

  useImperativeHandle(ref, () => ({
    reload() {
      console.log('reload');
      gridFetch();
    },
  }));

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('tenantName', {
      header: t('테넌트'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
      size: 180,
    }),
    columnHelper.accessor('onOffLineType', {
      header: t('교육공간 타입'),
      cell: (info) =>
        t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.lms.space.OnOffLineType.${info.getValue()}`),
      enableGrouping: false,
      size: 180,
    }),
    columnHelper.accessor('learningSpaceName', {
      header: t('교육공간명'),
      cell: (info) => {
        if (props.pageMode === EnPageMode.MODAL) return info.getValue();
        else
          return (
            <Link
              to={'/learning/training-place/detail'}
              state={{
                learningSpaceId: info.row.original.learningSpaceId,
              }}
              className="link"
            >
              {info.row.original.learningSpaceName}
            </Link>
          );
      },
      enableGrouping: false,
    }),
    columnHelper.accessor('addressUrl', {
      header: t('주소 / URL'),
      cell: (info) => {
        return info.getValue();
      },
      enableGrouping: false,
      size: 390,
    }),
    columnHelper.accessor('isUsed', {
      header: t('사용여부'),
      cell: (info) => (info.getValue() ? t('사용') : t('미사용')),
      enableGrouping: false,
      size: 150,
      enableSorting: false,
      meta: {
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const onHandleSelect = (row: any) => {
    if (props.onSelect) props.onSelect(row.original);
  };

  const onHandlePreview = async (preview: string) => {
    const mapFile = await getFileInfo(preview);
    if (mapFile && mapFile.fileUrl) {
      console.log('### fileUrl', mapFile.fileUrl);
      openModal({
        width: 'full',
        height: 'full',
        content: <PreviewImage imageUrl={mapFile.fileUrl} />,
        headerActionNode: (
          <Button onlyIcon onClick={() => fileDownload(preview)}>
            <IcoDownload width={40} height={40} stroke="#131C30" />
          </Button>
        ),
      });
    }
  };

  switch (props.pageMode) {
    case EnPageMode.PAGE:
      columns.push(
        columnHelper.accessor('preview', {
          header: t('미리보기'),
          cell: (info) => {
            switch (info.row.original.onOffLineType) {
              case 'ONLINE':
                return (
                  <Button
                    variant="gray"
                    label={t('미리보기')}
                    onClick={() => window.open(info.row.original.preview, '_blank')}
                  />
                );
              case 'OFFLINE':
                if (info.row.original.preview.length > 0)
                  return (
                    <Button
                      variant="gray"
                      label={t('미리보기')}
                      onClick={() => onHandlePreview(info.row.original.preview)}
                    />
                  );
            }
            return '';
          },
          enableGrouping: false,
          enableSorting: false,
          size: 150,
          meta: {
            cellAlign: 'center',
          },
        }),
      );
      break;
    case EnPageMode.MODAL:
      columns.push(
        columnHelper.accessor('preview', {
          header: t('선택'),
          cell: (info) => (
            <Button variant="gray" label={t('선택')} onClick={() => onHandleSelect(info.row)} />
          ),
          enableGrouping: false,
          size: 150,
          meta: {
            cellAlign: 'center',
          },
        }),
      );
      break;
  }
  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        columns={columns}
        title={t('교육공간 목록')}
        showAdd={props.pageMode === EnPageMode.MODAL}
        onAddClick={props.onAdd}
        disabledSelectionToggle
      />
    </>
  );
};

export const TrainingPlaceList = forwardRef(TrainingPlaceListComponent);

const searchConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        format: 'object',
        label: t('테넌트'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.bo.my.tenant.tenantId'],
        },
        presetOptionLabel: t('선택'),
      },
      {
        name: 'onOffLineType',
        type: 'dropdown',
        label: t('교육공간 타입'),
        value: '',
        presetOptionLabel: t('전체'),
        optionsConfig: {
          codeGroup: CODE_GROUP['lms.space.OnOffLineType'],
        },
      },
      {
        name: 'isUsed',
        type: 'dropdown',
        label: t('사용 여부'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: true, label: t('사용') },
          { value: false, label: t('미사용') },
        ],
      },
      {
        name: 'learningSpaceName',
        type: 'text',
        label: t('교육공간명'),
        value: '',
      },
    ],
  ],
});

const gridConfig: useGridBoxConfig = {
  query: queryOptions.list,
  columns: [
    {
      name: 'no1',
      label: 'NO.',
      type: 'numbering',
    },
  ],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};
