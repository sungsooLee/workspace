import { useEffect, useCallback, useState } from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Checkbox, GridBox, useGridBox, useGridBoxConfig, useModal } from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { useApproveRoleApplication, roleApplicationQueryOptions } from '@entities/role';
import { RejectModal, RoleApplicationHistoryModal } from '@features/shared';
import { MyRoleExtendModal } from '@features/user/my-page/ui/my-role-extend-modal';

import boxStyles from '@learnway/styles/bo/assets/styles/modules/wrap-box.module.css'; // 하단 layout style - line

export const Route = createFileRoute('/_layout/platform/role/application/')({
  component: RouteComponent,
});

const _global = {
  linkClick: (row: any) => {
    return;
  },
  historyClick: (row: any) => {
    return;
  },
};

function RouteComponent() {
  const { alert: openAlert, confirm: openConfirm, open: openModal } = useModal();
  const { provider: searchProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const [tableInstance, setTableInstance] = useState<Table<any>>();
  const { approve: approveRoleApplication } = useApproveRoleApplication({
    onSuccess: (data: any) => {
      gridFetch();
    },
  });

  useEffect(() => {
    gridFetch();
  }, []);

  const handleOnSearch = useCallback((data: any) => {
    console.log('data', data);
    const searchData = {
      ...data,
      createdDate: data.createdDate ? getDateToString(new Date(data.createdDate), 'YYYYMMDD') : '',
    };
    gridFetch(searchData);
  }, []);

  useEffect(() => {
    console.log('### tableInstance rows', tableInstance?.getSelectedRowModel().rows);
  }, [tableInstance]);

  const handleOnApprove = () => {
    const rows = tableInstance?.getSelectedRowModel().rows;
    if (rows?.length === 0) {
      openAlert({
        title: t('대상자를 선택해 주세요.'),
        content: t('대상자를 먼저 선택한 후에 진행해 주세요.'),
      });
    } else {
      openConfirm({
        title: t('승인 하시겠습니까?'),
        content: t('승인 완료 시 신청자에게 메일이 발송됩니다.'),
        onClose: (value: boolean) => {
          const payload = {
            roleApplicationIds: rows?.map((row: any) => row.id), // TODO
            status: 'REJECTED',
          };
          approveRoleApplication(payload);
        },
      });
    }
  };

  const handleOnReject = () => {
    const rows = tableInstance?.getSelectedRowModel().rows;
    if (rows?.length == 0) {
      openAlert({
        title: t('대상자를 선택해 주세요.'),
        content: t('대상자를 먼저 선택한 후에 진행해 주세요.'),
      });
    } else {
      openModal({
        width: 'sm',
        content: <RejectModal />,
        onClose(data: any) {
          console.log('reason', data);
          if (data) {
            setTimeout(() => reject(data.rejectReason), 0);
          }
        },
      });
    }
  };

  const reject = (reason: any) => {
    console.log('reason', reason);
    openConfirm({
      title: t('반려 하시겠습니까?'), // TODO
      content: (
        <p>
          {t(
            '채널 개설 신청을 반려하면 해당 신청 건으로 채널 개설을 할 수 없습니다. 반려 처리 시 반려 안내 메일이 발송됩니다.',
          )}
        </p>
      ),
      onClose: (value: boolean) => {
        if (value) {
          rejectRequests(reason);
        }
      },
    });
  };

  const rejectRequests = (reason: any) => {
    const rows = tableInstance?.getSelectedRowModel().rows;
    const payload = {
      roleApplicationIds: rows?.map((row: any) => row.id), // TODO
      status: 'REJECTED',
      rejectReason: reason,
    };
    approveRoleApplication(payload);
  };

  _global.linkClick = (row: any) => {
    openModal({
      content: <MyRoleExtendModal data={row} type="view" />,
      width: 'md',
    });
  };
  _global.historyClick = (row: any) => {
    openModal({
      content: <RoleApplicationHistoryModal roleApplicationId={row.roleApplicationId} />,
      width: 'md',
    });
  };

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <div className={cn(boxStyles.start, boxStyles.inner)}>
          <div className="grid_wrap">
            <GridBox
              config={gConfig}
              columns={columns}
              multiple
              title={t('역할신청 목록')}
              hideRowSelectionCheckBox
              customButtonNode={
                <>
                  <Button variant="text" label={t('승인')} onClick={handleOnApprove} />
                  <Button variant="text" label={t('반려')} onClick={handleOnReject} />
                </>
              }
              onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
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
        required: true,
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        value: undefined,
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyId'],
        },
        format: 'number',
        isSearchable: true,
        isClearable: true,
        placeholder: '입력 선택',
      },
      {
        name: 'userName',
        type: 'text',
        label: t('이름'),
        value: '',
        placeholder: t('입력'),
      },
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        value: '',
        placeholder: t('입력'),
      },
    ],
    [
      {
        name: 'roleId',
        type: 'dropdown',
        label: t('HRD 담당자 역할'),
        value: '',
        presetOptionLabel: t('LABEL.form.label.all'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.bo.my.role.roleId'],
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
        name: 'createdDate',
        type: 'date',
        label: t('신청일'),
        format: 'object',
        value: '',
        placeholder: t('입력'),
      },
    ],
  ],
};

const gridConfig: useGridBoxConfig = {
  query: roleApplicationQueryOptions.list,
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

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('checkbox', {
    // 상태에 따른 checkbox disabled를 위해 checkbox 따로 구현
    id: 'select-check',
    size: 50,
    maxSize: 50,
    minSize: 50,
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
      const disabled = row.original.status === 'APPROVED' || row.original.status === 'REJECTED';
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
  columnHelper.group({
    id: 'role',
    header: t('신청한 역할'),
    meta: {
      headerAlign: 'center',
    },
    columns: [
      columnHelper.accessor('roleType', {
        header: t('역할 타입'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 150,
      }),
      columnHelper.accessor('roleName', {
        header: t('역할명'),
        cell: (info) => (
          <Button
            variant="line"
            label={info.row.original.roleName}
            onClick={() => _global.linkClick(info.row.original)}
          />
        ),
        enableGrouping: false,
      }),
      columnHelper.accessor('startDate', {
        header: t('역할 시작일'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 100,
      }),
      columnHelper.accessor('endDate', {
        header: t('역할 종료일'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 100,
      }),
    ],
  }),
  columnHelper.group({
    id: 'applicant',
    header: t('신청자 정보'),
    meta: {
      headerAlign: 'center',
    },
    columns: [
      columnHelper.accessor('companyName', {
        header: t('회사명'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('deptName', {
        header: t('부서명'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('employeeNumber', {
        header: t('사번'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('userName', {
        header: t('이름'),
        cell: (info) => (
          <Button
            variant="line"
            label={info.row.original.userName}
            onClick={() => _global.linkClick(info.row.original)}
          />
        ),
        enableGrouping: false,
        size: 130,
      }),
    ],
  }),
  columnHelper.accessor('createdDate', {
    header: t('역할 신청 일시'),
    cell: (info) =>
      info.getValue() === null
        ? ''
        : getDateToString(new Date(info.row.original.createdDate), DATE_TIME_FORMAT.DATETIME_SEC),
    enableGrouping: false,
    size: 160,
  }),
  columnHelper.accessor('status', {
    header: t('역할 신청 상태'),
    cell: (info) => info.getValue(),
    enableGrouping: false,
    size: 100,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('roleApplicationId', {
    header: t('이력'),
    cell: (info) => (
      <Button
        variant="gray"
        label={t('이력 보기')}
        onClick={() => _global.historyClick(info.row.original)}
      />
    ),
    enableGrouping: false,
    size: 80,
    meta: {
      cellAlign: 'center',
    },
  }),
] as ColumnDef<any, unknown>[];
