import { useEffect, useCallback, useState } from 'react';
import { t } from 'i18next';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  Checkbox,
  Divider,
  GridBox,
  useGridBox,
  useGridBoxConfig,
  useModal,
} from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import { SearchBox } from '@shared/ui/search-box';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import {
  useApproveRoleApplication,
  roleApplicationQueryOptions,
  roleManagerQueryOptions,
} from '@entities/role';
import { EnGlobalConst, LabelMessage } from '@types';
import { RejectModal, RoleApplicationHistoryModal } from '@features/shared';
import { MyRoleExtendModal } from '@features/user/my-page/ui/my-role-extend-modal';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { useQueryClient } from '@tanstack/react-query';

import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { size } from 'lodash';

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
  const { data: loginUser } = useFetchAuthUser();
  const queryClient = useQueryClient();

  const { alert: openAlert, confirm: openConfirm, open: openModal } = useModal();
  const { provider: searchProvider, getValues, setOptions } = useSearchBox(searchConfig);
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

  useEffect(() => {
    if (!loginUser) return;
    if (loginUser.activeTenant?.tenantId) {
      getCompanyOptions(loginUser.activeTenant?.tenantId);
      getRoleOptions(loginUser.activeTenant?.tenantId);
    }
  }, [loginUser]);

  const getCompanyOptions = async (tenantId?: number) => {
    const companies = await queryClient.fetchQuery(companysQueryOptions.tenantCompany(tenantId));

    const companyIdOptions = companies.map((item) => ({
      label: item.name,
      value: item.companyId,
    }));
    setOptions('companyId', companyIdOptions);
  };

  const getRoleOptions = async (tenantId?: number) => {
    const roles = await queryClient.fetchQuery(
      roleManagerQueryOptions.list({ tenantId: tenantId, size: 5000 }),
    );
    const roleIdOptions = roles.content.map((item: any) => ({
      label: item.name,
      value: item.roleId,
    }));
    setOptions('roleId', roleIdOptions);
  };

  const handleOnSearch = useCallback((data: any) => {
    console.log('data', data);
    const searchData = {
      ...data,
      createdDate: data.createdDate
        ? getDateToString(new Date(data.createdDate), 'YYYY-MM-DD')
        : '',
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
            roleApplicationIds: rows?.map((row: any) => row.original.roleApplicationId),
            status: 'APPROVED',
          };
          approveRoleApplication(payload);
        },
      });
    }
  };

  const handleOnReject = () => {
    const rows = tableInstance?.getSelectedRowModel().rows;
    if (rows?.length === 0) {
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
      title: t('역할신청을 반려 하시겠습니까?'),
      content: <p>{t('반려 완료 시 신청자에게 안내 메일이 발송됩니다.')}</p>,
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
      roleApplicationIds: rows?.map((row: any) => row.original.roleApplicationId),
      status: 'REJECTED',
      rejectReason: reason,
    };
    approveRoleApplication(payload);
  };

  const handleOnSelectable = (row: any) => {
    const disabled = row.status === 'APPROVED' || row.status === 'REJECTED';
    return !disabled;
  };

  _global.linkClick = (row: any) => {
    openModal({
      content: <MyRoleExtendModal data={row} type="view" />,
      width: 'md',
    });
  };
  _global.historyClick = (row: any) => {
    console.log('row', row);
    openModal({
      content: <RoleApplicationHistoryModal applicationId={row.roleApplicationId} />,
      width: 'md',
    });
  };

  return (
    <PageContainer>
      <MainContents>
        <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
        <Divider />
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
          isRowSelectable={handleOnSelectable}
        />
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        format: 'object',
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
        format: 'object',
        presetOptionLabel: t('LABEL.form.label.all'),
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
  columns: [],
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
  columnHelper.accessor('checkbox', {
    id: 'numbering',
    size: 64,
    header: 'NO.',
    meta: { cellAlign: 'center' },
    enableSorting: false,
    cell: ({ row }: any) => {
      if (row.depth === 0) {
        return <p>{row.index + 1}</p>;
        // return pagination ? (
        //   <p>{pagination.pageNumber * pagination.pageSize + row.index + 1}</p>
        // ) : (
        //   <p>{row.index + 1}</p>
        // );
      }

      return <span></span>;
    },
  }),
  columnHelper.group({
    id: 'role',
    header: t('신청한 역할'),
    meta: {
      headerAlign: 'center',
    },
    columns: [
      columnHelper.accessor('role.roleType', {
        header: t('역할 타입'),
        cell: (info) =>
          t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.role.RoleType.${info.getValue()}`),
        enableGrouping: false,
        size: 150,
      }),
      columnHelper.accessor('role.name', {
        header: t('역할명'),
        cell: (info) => (
          <Button
            variant="link"
            label={info.row.original.role.name}
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
      columnHelper.accessor('applicant.company.name', {
        header: t('회사명'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('applicant.dept.deptName', {
        header: t('부서명'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('applicant.employeeNumber', {
        header: t('사번'),
        cell: (info) => info.getValue(),
        enableGrouping: false,
        size: 130,
      }),
      columnHelper.accessor('applicant.name', {
        header: t('이름'),
        cell: (info) => (
          <Button
            variant="link"
            label={info.row.original.applicant.name}
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
    cell: (info) =>
      t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.role.RoleApplicationStatus.${info.getValue()}`),
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
