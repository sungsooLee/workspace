import { useEffect, useCallback } from 'react';
import { t } from 'i18next';
import { Button } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { EnGlobalConst, EnPageMode } from '@types';
import { queryOptions } from '@entities/training-place/service/space.queries';
import { Link } from '@tanstack/react-router';
import { useFetchAuthUser } from '@learnway/auth/entities';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

const TrainingPlaceListComponent = ({
  pageMode,
  onAddClick,
  onSelect,
}: {
  pageMode: EnPageMode;
  onAddClick?: any;
  onSelect?: any;
}) => {
  const { provider: searchProvider, getValues, setOptions, setValue } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const { data: loginUser } = useFetchAuthUser();

  useEffect(() => {
    gridFetch();
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(data);
  }, []);

  useEffect(() => {
    if (!loginUser) return;

    const tenantIdOptions = loginUser.tenants.map((tenant) => ({
      value: tenant.tenantId,
      label: tenant.tenantName,
    }));
    setOptions('tenantId', tenantIdOptions);
    if (loginUser.activeTenant) setValue('tenantId', loginUser.activeTenant.tenantId ?? '');
  }, [loginUser]);

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
        if (pageMode === EnPageMode.MODAL) return info.getValue();
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
      cell: (info) => info.getValue(),
      enableGrouping: false,
      size: 390,
    }),
    columnHelper.accessor('isUsed', {
      header: t('사용여부'),
      cell: (info) => (info.getValue() ? t('사용') : t('미사용')),
      enableGrouping: false,
      size: 150,
      meta: {
        cellAlign: 'center',
      },
    }),
  ] as ColumnDef<any, unknown>[];

  const onHandleSelect = (row: any) => {
    if (onSelect) onSelect(row.original);
  };

  switch (pageMode) {
    case EnPageMode.PAGE:
      columns.push(
        columnHelper.accessor('preview', {
          header: t('미리보기'),
          cell: (info) =>
            info.row.original.onOffLineType === 'ONLINE' ? (
              <Button
                variant="gray"
                label={t('미리보기')}
                onClick={() => window.open(info.row.original.preview, '_blank')}
              />
            ) : (
              <Button variant="gray" label={t('미리보기')} />
            ),
          enableGrouping: false,
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
      <div className={cn(boxStyles.start, boxStyles.inner)}>
        <div className="grid_wrap">
          <GridBox
            config={gConfig}
            columns={columns}
            title={t('교육공간 목록')}
            showAdd={pageMode === EnPageMode.MODAL && onAddClick}
            onAddClick={onAddClick}
            disabledSelectionToggle
          />
        </div>
      </div>
    </>
  );
};

export const TrainingPlaceList = TrainingPlaceListComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        format: 'object',
        label: t('테넌트'),
        value: '',
        options: [],
        placeholder: t('선택'),
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
};

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
