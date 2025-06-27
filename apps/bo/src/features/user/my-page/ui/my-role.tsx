import { CODE_GROUP, compactValues, useCurrentRoute, useSearchBox } from '@learnway/hooks';
import { Button, GridBox, useGridBox, useModal } from '@learnway/ui';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchBox } from '@shared/ui/search-box';
import { MyRoleExtendModal } from './my-role-extend-modal';
import { Link, useRouter, useRouterState } from '@tanstack/react-router';
import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';
import { DATE_TIME_FORMAT, dateDiff, formatDate } from '@learnway/shared';
import { createColumnHelper } from '@tanstack/react-table';

const MyRoleComponent = (route: any) => {
  const router = useRouter();

  // const routerState = useRouterState();
  const { state } = useCurrentRoute();

  const { provider: sProvider, getValues, onFormChange, onFormValid } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const { open: openModal } = useModal();
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  function handleRefetch() {
    onFormChange();
    gridFetch();
  }

  function handleOnSearch(query: Record<string, any>) {
    console.log('### query', query);
    gridFetch({
      ...compactValues(query),
      startDate: query.rolePeriod.from
        ? formatDate(query.rolePeriod.from, DATE_TIME_FORMAT.DATE_SERVER)
        : undefined,
      endDate: query.rolePeriod.to
        ? formatDate(query.rolePeriod.to, DATE_TIME_FORMAT.DATE_SERVER)
        : undefined,
    });
  }

  useEffect(() => {
    const init = async (state: any) => {
      // const listParam = state.location.state.listParam;
      const listParam = state.listParam;
      if (listParam) {
        onFormChange(listParam);
        if (await onFormValid()) {
          handleOnSearch(getValues());
        }
      }
    };
    init(state);
  }, [state]);

  const handleExtend = () => {
    openModal({
      content: <MyRoleExtendModal data={selectedRow} type="request" callback={handleRefetch} />,
      width: 'md',
    });
  };

  const handleCellClick = useCallback(
    (data: any) => {
      console.log('data', data);
      router.navigate({
        to: '/my-page/role/detail',
        state: { roleId: data.roleId, listParam: getValues() },
      });
    },
    [openModal],
  );

  const gridColumns = useMemo(() => createGridColumns(handleCellClick), [handleCellClick]);

  return (
    <div>
      <SearchBox provider={sProvider} onSearch={handleOnSearch} />
      <GridBox
        title={t('HRD 담당자 역할 목록')}
        hideRowSelectionRadioBox={false}
        onRowSelect={(row: any) => {
          console.log('row::', row);
          setSelectedRow(row);
        }}
        config={gConfig}
        columns={gridColumns}
        customButtonNode={
          <Button disabled={!selectedRow} variant="save" size="md" onClick={handleExtend}>
            권한기간 연장 신청
          </Button>
        }
      />
    </div>
  );
};

export const MyRole = MyRoleComponent;

const searchConfig: any = {
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
          codeGroup: CODE_GROUP['manual.bo.my.role.roidId'],
        },
      },
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('테넌트'),
        value: '',
        format: 'object',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.bo.my.tenant.tenantId'],
          // codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
      },
      {
        name: 'channelId',
        type: 'dropdown',
        label: t('채널'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: 'channelA', label: t('채널1번') },
          { value: 'channelB', label: t('채널2번') },
        ],
      },
    ],
    [
      {
        name: 'isExpired',
        type: 'dropdown',
        label: t('만료여부'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.code.expired'],
        },
      },
      {
        name: 'status',
        type: 'dropdown',
        label: t('신청 상태'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.role.RoleApplicationStatus'],
        },
      },
      {
        name: 'rolePeriod',
        type: 'date-range',
        label: t('역할 기간'),
        value: {
          from: undefined,
          to: undefined,
        },
      },
    ],
  ],
};

const gridConfig = {
  // query: '',
  query: roleManagerQueryOptions.getRoleApplicationList,
  pagination: {
    pageIndex: 0,
    pageSize: 20,
    totalRows: 0,
  },
  columns: [],
  data: [],
};

const columnHelper = createColumnHelper<any>();
const createGridColumns = (onCellClick: (data: any) => void) => [
  columnHelper.accessor('roleName', {
    header: t('HRD 담당자 역할'),
    size: 227,
    cell: (info) => {
      return (
        <Button
          className="text-ellipsis"
          variant="link"
          size="lg"
          onClick={() => onCellClick(info.row.original)}
        >
          {info.row.original.roleName}
        </Button>
      );
    },
    meta: {
      sortKey: 'roleEntity.name',
    },
  }),
  columnHelper.accessor('tenantName', {
    header: t('테넌트'),
    size: 227,
    meta: {
      sortKey: 'roleEntity.tenantEntity.tenantName',
    },
  }),
  columnHelper.accessor('channels', {
    header: t('채널'),
    size: 227,
    enableSorting: false,
    cell: (info) => {
      const channelList = [
        {
          channelId: 1,
          channelName: '채널1',
        },
        {
          channelId: 2,
          channelName: '채널2',
        },
      ];
      // TODO 채널 목록 적용
      // const channelText = info.row.original.channels
      //   ?.map?.((channel: { channelName: any }) => channel.channelName)
      //   ?.join(', ');
      const channelText = channelList
        ?.map?.((channel: { channelName: any }) => channel.channelName)
        ?.join(', ');
      return `${channelText}`;
    },
  }),
  columnHelper.accessor('startDate', {
    header: t('역할 시작일'),
    size: 227,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('endDate', {
    header: t('역할 종료일'),
    size: 227,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('expired', {
    header: t('만료 여부'),
    size: 104,
    enableSorting: false,
    cell: (info) => {
      const diff = dateDiff(info.row.original.endDate, new Date());
      if (diff !== undefined && 0 >= diff) {
        return `${t('LABEL.common.expired')}`;
      } else {
        return `${t('LABEL.common.valid')}`;
      }
    },
  }),
  columnHelper.accessor('status', {
    header: t('신청 상태'),
    size: 104,
  }),
];
