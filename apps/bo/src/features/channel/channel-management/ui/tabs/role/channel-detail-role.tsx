import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { getDateToString } from '@learnway/shared';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { SearchBox } from '@shared/ui';
import { useRouterState } from '@tanstack/react-router';
import { createColumnHelper, Table } from '@tanstack/react-table';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { EnChannelDetailButtonLayout } from '../../../types/type';

interface ChannelDetailRoleProps {
  onButtonLayoutChange: (layout: EnChannelDetailButtonLayout) => void;
}

const ChannelDetailRoleComponent = ({ onButtonLayoutChange }: ChannelDetailRoleProps) => {
  const { confirm: openConfirm } = useModal();

  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;

  const { provider: sProvider, getValues } = useSearchBox(searchConfig);

  const searchParam = () => {
    const data = getValues();
    const searchData = {
      ...data,
      channelUuid,
      roleStartDate: data.roleDate.from
        ? getDateToString(new Date(data.roleDate.from), 'YYYYMMDD')
        : '',
      roleEndDate: data.roleDate.to ? getDateToString(new Date(data.roleDate.to), 'YYYYMMDD') : '',
    };
    return searchData;
  };

  const { config: gConfig, gridFetch } = useGridBox(gridConfig, searchParam);
  const [tableInstance, setTableInstance] = useState<Table<any>>();

  useEffect(() => {
    onButtonLayoutChange && onButtonLayoutChange(EnChannelDetailButtonLayout.NONE);
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(searchParam());
  }, []);

  const handleAddClick = () => {
    console.log('handleAddClick');
    // TODO 유저 검색 조회 (공통 - 셔틀) 커스터마이징 필요
  };

  const handleRemoveClick = () => {
    const deleteRows = tableInstance?.getSelectedRowModel().rows;
    if (deleteRows && deleteRows.length > 0) {
      openConfirm({
        title: t('채널 담당자를 삭제하시겠습니까?'),
        content: <p>{t('해당 채널에 대한 역할만 삭제되며, 다른 HRD 담당자 역할은 유지됩니다.')}</p>,
        onClose: (value: boolean) => {
          if (value) {
            console.log('deleteRows', deleteRows);
          }
        },
      });
    }
  };

  return (
    <>
      <SearchBox provider={sProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        columns={columns}
        multiple
        showAdd
        showRemove
        title={t('담당자 목록')}
        onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
        onAddClick={handleAddClick}
        onRemoveClick={handleRemoveClick}
      />
    </>
  );
};

export const ChannelDetailRole = ChannelDetailRoleComponent;

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'roleId',
        type: 'dropdown',
        label: t('HRD 담당자 역할'),
        value: '',
        format: 'object',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.bo.my.role.roleId'],
        },
      },
      {
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        options: [
          { label: '회사A', value: 'A' },
          { label: '회사B', value: 'B' },
          { label: '회사C', value: 'C' },
        ],
        presetOptionLabel: t('선택'),
      },
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        value: '',
      },
    ],
    [
      {
        name: 'roleStatus',
        type: 'dropdown',
        label: t('역할 상태'),
        value: '',
        options: [
          { label: t('사용'), value: 'A' },
          { label: t('미사용'), value: 'B' },
        ],
        presetOptionLabel: t('전체'),
      },
      {
        name: 'isExpired',
        type: 'dropdown',
        label: t('만료 여부'),
        format: 'boolean',
        value: undefined,
        options: [
          { label: t('만료'), value: true },
          { label: t('정상'), value: false },
        ],
        presetOptionLabel: t('전체'),
      },
      {
        name: 'roleDate',
        label: t('역할 기간'),
        type: 'date-range',
        value: {
          from: undefined,
          to: undefined,
        },
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 1000,
    sort: [],
  },
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('roleId', {
    cell: (info) => info.getValue(),
    header: t('HRD 담당자 역할'),
    enableGrouping: false,
  }),
  columnHelper.accessor('tenantName', {
    cell: (info) => info.getValue(),
    header: t('테넌트'),
    enableGrouping: false,
  }),
  columnHelper.accessor('companyName', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    enableGrouping: false,
  }),
  columnHelper.accessor('deptName', {
    cell: (info) => info.getValue(),
    header: t('소속'),
    enableGrouping: false,
  }),
  columnHelper.accessor('employeeNumber', {
    cell: (info) => info.getValue(),
    header: t('사번'),
    enableGrouping: false,
  }),
  columnHelper.accessor('roleStatus', {
    cell: (info) => info.getValue(),
    header: t('역할 상태'),
    enableGrouping: false,
  }),
  columnHelper.accessor('roleStartDate', {
    cell: (info) => info.getValue(),
    header: t('역할 시작일'),
    enableGrouping: false,
  }),
  columnHelper.accessor('roleEndDate', {
    cell: (info) => info.getValue(),
    header: t('역할 종료일'),
    enableGrouping: false,
  }),
  columnHelper.accessor('isExpired', {
    cell: (info) => info.getValue(),
    header: t('만료 여부'),
    enableGrouping: false,
  }),
];
