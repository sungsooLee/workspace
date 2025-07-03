import { FC, useState } from 'react';
import { t } from 'i18next';
import { getRandomId, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  GridBox,
  useGridBox,
  Checkbox,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig } from '@learnway/hooks';
import { WidgetPreviewButton } from '@features/platform';
import { createColumnHelper, ColumnDef, Table } from '@tanstack/react-table';
import popupStyles from '@learnway/styles/bo/assets/styles/modules/popup-contents.module.css';

import { widgetsQueryOptions } from '@entities/widgets/service/widgets.queries';
import { useCreateTenantWidget } from '@entities/widgets/service/widgets.hook';

const TenantDetailWidgetMappingModalComponent: FC<{ tenantId: number }> = ({ tenantId }) => {
  const [tableInstance, setTableInstance] = useState<Table<any>>();

  const { close: closeModal } = useModal();

  const { provider: sProvider } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);
  const { createTenantWidget } = useCreateTenantWidget({
    onSuccess: () => {
      closeModal();
    },
  });
  const handleOnSearch = (param: any) => {
    console.log('handleOnSearch click', param);
    gridFetch({ ...param, tenantId: tenantId });
  };

  const handleOnConfirm = () => {
    const saveRows = tableInstance?.getSelectedRowModel().rows;
    if (saveRows) {
      const payload = {
        tenantId: tenantId,
        body: {
          widgetTypeList: saveRows
            .filter((item) => !item.original.isTenantApplied)
            .map((item) => item.original.widgetCode),
        },
      };

      createTenantWidget(payload);
    }
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('위젯조회')}</ModalTitle>
      <ModalBody>
        <div className={popupStyles.wrap}>
          <SearchBox provider={sProvider} onSearch={handleOnSearch} />
          <div className={popupStyles.container}>
            <GridBox
              title={t('위젯목록')}
              config={gConfig}
              columns={columns}
              multiple
              showColumnSettings={false}
              hideRowSelectionCheckBox={true}
              guideText={t('이미 테넌트 적용(Y값)된 위젯은 선택할 수 없습니다.')}
              // showColumnSettings={false}
              onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooter>
          <Button label={t('취소')} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
          <Button label={t('확인')} variant={'primary'} size={'lg'} onClick={handleOnConfirm} />
        </ModalFooter>
      </ModalFooter>
    </ModalContainer>
  );
};

export const TenantDetailWidgetMappingModal = TenantDetailWidgetMappingModalComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'widgetName',
        type: 'text',
        label: t('위젯명'),
        value: '',
      },
      {
        name: 'deviceType',
        type: 'dropdown',
        label: t('디바이스'),
        format: 'string',
        value: 'ALL',
        options: [
          { label: '전체', value: 'ALL' },
          { label: 'PC', value: 'PC' },
          { label: 'Mobile', value: 'MOBILE' },
        ],
      },
      {
        name: 'tenantApplied',
        type: 'dropdown',
        label: t('테넌트 적용 여부'),
        value: '',
        options: [
          { label: '선택', value: '' },
          { label: 'Y', value: 'true' },
          { label: 'N', value: 'false' },
        ],
      },
    ],
  ],
};

const gridConfig = {
  query: widgetsQueryOptions.listWithTenant,
  columns: [],
  data: [],

  pagination: {
    pageSize: 10,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('select-check', {
    id: 'select-check',
    size: 64,
    maxSize: 64,
    minSize: 64,
    meta: {
      align: 'center',
      headerAlign: 'center',
      cellAlign: 'center',
    },
    enableSorting: false,
    header: ({ table }) => (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(checked) => {
            table.toggleAllRowsSelected(!!checked);
          }}
        />
      </div>
    ),
    cell: ({ row }) => {
      const disabled = row.original.isTenantApplied;
      return (
        <div style={{ width: '100%', textAlign: 'center', paddingRight: 0 }}>
          <Checkbox
            checked={row.getIsSelected()}
            disabled={row.getIsGrouped() || disabled}
            onCheckedChange={() => {
              if (!row.getIsGrouped()) {
                row.getToggleSelectedHandler();
              }
            }}
          />
        </div>
      );
    },
  }),

  columnHelper.accessor('numbering', {
    id: 'numbering',
    cell: ({ row }) => row.index,
    header: 'NO.',
    size: 64,
    enableGrouping: false,
  }),
  columnHelper.accessor('widgetName', {
    id: 'widgetName',
    cell: (info) => {
      return info.getValue();
    },
    header: '위젯명',
    enableGrouping: false,
    size: 708,
  }),
  columnHelper.accessor('device', {
    id: 'device',
    cell: ({ row }) => {
      const array = [];
      row.original.isMobileExposed && array.push('PC');
      row.original.isWebExposed && array.push('Mobile');
      return array.toString();
    },
    header: '디바이스',
    size: 200,
    enableGrouping: false,
  }),
  columnHelper.accessor('isTenantApplied', {
    id: 'isTenantApplied',
    cell: (info) => (info.getValue() ? 'Y' : 'N'),
    header: '테넌트적용여부',
    size: 200,
    enableGrouping: false,
  }),

  columnHelper.accessor('showbutton', {
    cell: ({ row }) => {
      return <WidgetPreviewButton widget={row.original} />;
    },
    header: '미리보기',
    size: 88,
    enableGrouping: false,
  }),
] as ColumnDef<any, unknown>[];
