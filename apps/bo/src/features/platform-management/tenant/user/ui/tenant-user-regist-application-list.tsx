import React, { FC, useState, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useRouter, useRouterState, Link } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef, Table } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { Button, Checkbox, Divider, GridBox, useGridBox, useModal } from '@learnway/ui';
import { useSearchBox, SearchBoxConfig, CODE_GROUP } from '@learnway/hooks';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { SearchBox } from '@shared/ui/search-box';
import { usersQueryOptions } from '@entities/users/service/users.queries';
import { tenantQueryOptions } from '@entities/tenant';
import { EnGlobalConst } from '@types';
import {
  getUserStatus
} from '@features/platform-management/company/company-user-management/service/company-user.service';
import { TenantByRoleDropdownFormField } from '@shared/ui';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { useApproveAccountUser, useRejectAccountUser } from '@entities/users/service/users.hook';

const _global = {
  linkClick: (userUuid: string) => {
    return;
  },
  getTenantId: (): number | undefined => {
    return undefined;
  },
};

/**
 * 화면번호 : NLP_BO_TMS_1111_15 테넌트-유저관리 (회원 가입 신청)
 * @param param0
 * @returns
 */
const TenantUserRegistApplicationListComponent: FC<any> = ({ rootPath }) => {
  const router = useRouter();
  const routerState = useRouterState();

  const { data: loginUser } = useFetchAuthUser();
  const queryClient = useQueryClient();
  const { approve } = useApproveAccountUser({});
  const { reject } = useRejectAccountUser({});

  const {open: openModal, confirm: confirmModal, alert } = useModal();
  const [companyCodes, setCompanyCodes] = useState<string[]>([]);
  const [tenantId, setTenantId] = useState<number | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [tableInstance, setTableInstance] = useState<Table<any>>()

  _global.linkClick = (userUuid: string) => {
    router.navigate({
      to: `${rootPath}/tenant/user/application-detail`,
      state: {
        userUuid,
        listParam: getValues(),
      },
    });
  };

  const {
    provider: searchProvider,
    setValue,
    setOptions,
    getValues,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig());
  const { config: gConfig, gridFetch } = useGridBox(gridConfig);

  const tenantIdWatch = useWatch({ control: searchProvider.control, name: 'tenantId' });

  const handleOnSearch = (data: any) => {
    console.log('searchData : () => ', data);
    gridFetch(data);
  };

  const openChangeUserEnableModal = (isApproval: boolean) => {
    const selectedRow = tableInstance?.getSelectedRowModel().rows;
    const checkTarget = selectedRow?.filter( (row: any) => row.original.enabledDate !== null)
    if( checkTarget?.length !== 0 ) {
      alert({
        title: isApproval ? '승인 확인' : '반려 확인',
        content: '선택한 대상 중 이미 승인된 대상이 있습니다. 확인 후 다시 시도해주세요.'
      })
      return;
    }
    confirmModal({
      title: isApproval ? t('승인 하시겠습니까?') : t('반려 하시겠습니까?'),
      content: isApproval ?
        <p>{t('회원가입 신청을 승인하면 로그인 및 정상적인 서비스 이용을 할 수 있습니다.')}</p>
      : <p>{t('회원가입 신청을 반려하면 정상적으로 서비스 이용을 할 수 없습니다.')}</p>,
      onClose: (value: boolean) => {
        if( value ) {
          // 선택한 계정 상태 변경(대기 -> 정상),
          const uuids = selectedRow?.map((row: any) => row.original.uuid);
          if( isApproval ) { // 승인
            approve({ uuids }, {
              onSuccess: () => {
                gridFetch(getValues())
              }
            });
          } else { // 반려
            reject(
              { uuids }, {
                onSuccess: () => {
                  gridFetch(getValues());
                },
              },
            );
          }
        }
      },
    })
  }

  useEffect(() => {
    const init = async () => {
      const listParam = routerState.location.state.listParam;
      if (listParam) {
        onFormChange(listParam);
        if (await onFormValid()) {
          handleOnSearch(getValues());
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!loginUser) return;

    const tenantIdOptions = loginUser.tenants.map((tenant) => ({
      value: tenant.tenantId,
      label: tenant.tenantName,
    }));
    const tenantIds = tenantIdOptions.map((item) => item.value);
    setOptions('tenantId', tenantIdOptions);
    setTenantId(loginUser.activeTenant?.tenantId)

    if (loginUser.activeTenant) setValue('tenantId', loginUser.activeTenant.tenantId ?? '');

    (async () => {
      const companys = await queryClient.fetchQuery(tenantQueryOptions.tenantCompanys(tenantIds));
      const companyCodes = companys.map((item) => item.companyCode);
      setCompanyCodes(companyCodes);
    })();
  }, [loginUser]);

  useEffect(() => {
    if (tenantIdWatch) {
      (async () => {
        const companys = await queryClient.fetchQuery(
          tenantQueryOptions.tenantCompanys([tenantIdWatch]),
        );
        const companyIdOptions = companys.map((item) => ({
          label: item.name,
          value: item.companyId,
        }));
        setOptions('companyId', companyIdOptions);
      })();
    } else {
      setValue('companyId', '');
      setOptions('companyId', []);
    }
  }, [tenantIdWatch]);

  _global.getTenantId = () => {
    return tenantId;
  };

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        columns={columns()}
        multiple
        showColumnSettings={false}
        hideRowSelectionCheckBox={true}
        onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
        onRowSelect={(row) => {
          if( row ) {
            setIsDisabled(true)
          } else {
            setIsDisabled(false)
          }
        }}
        customButtonNode={
          <>
            <Button
              variant="outline"
              size="sm"
              label={t('승인')}
              disabled={!isDisabled}
              onClick={(e) => openChangeUserEnableModal(true)}
            />
            <Button
              variant="outline"
              size="sm"
              label={t('반려')}
              disabled={!isDisabled}
              onClick={(e) => openChangeUserEnableModal(false)}
            />
          </>
        }
        />
    </>
  );
};

export const TenantUserRegistApplicationList = TenantUserRegistApplicationListComponent;

const searchConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        label: t('테넌트'),
        format: 'number',
        value: '',
        element: <TenantByRoleDropdownFormField />,
      },
      {
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        format: 'object',
        value: '',
        presetOptionLabel: t('LABEL.form.label.select'),
        options: [],
      },
      {
        name: 'email',
        type: 'text',
        label: t('이메일'),
        value: '',
      },
    ],
    [
      {
        name: 'tenantManagerName',
        type: 'text',
        label: t('사번'),
        value: '',
      },
      {
        name: 'userState',
        type: 'dropdown',
        label: t('승인 상태'),
        value: 'WAIT',
        options: [
          { value: 'WAIT', label: t('대기') },
          { value: '', label: t('전체') },
          { value: 'NORMAL', label: t('승인') },
        ],
      },
      {
        name: 'dateRange',
        type: 'date-range',
        label: t('신청기간'),
        format: 'object',
        value: { from: undefined, to: undefined },
      },
    ],
  ],
  validator: {
    tenantId: true,
  },
});

const gridConfig = {
  query: usersQueryOptions.list,
  columns: [],
  data: [],

  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<any>();
const columns = () => [
  columnHelper.accessor('select-check', {
    id: 'select-check',
    size: 32,
    maxSize: 32,
    minSize: 32,
    meta: {
      align: 'center',
      headerAlign: 'center',
      cellAlign: 'center',
    },
    enableSorting: false,
    header: ({ table }) => {
      return (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(checked) => {
              table.toggleAllRowsSelected(!!checked);
            }}
          />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div style={{ width: '100%', textAlign: 'center', paddingRight: 0 }}>
          <Checkbox
            checked={row.getIsSelected()}
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
  columnHelper.accessor('tenantName', {
    cell: (info) => {
        const found = info.row.original.tenants.find((tenant: any) => {
          return tenant.tenantId === _global.getTenantId();
        });

        if (found) {
          return found.tenantName;
        }
        return _global.getTenantId();
    },
    header: t('테넌트'),
    size: 114
  }),
  columnHelper.accessor('opt1', {
    cell: (info) => {
      return t(
        `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.row.original.company.companyType}`,
      );
    },
    header: t('그룹'),
    size: 114
  }),
  columnHelper.accessor('opt2', {
    cell: (info) => info.row.original.company.name,
    header: t('회사'),
    size: 114
  }),
  columnHelper.accessor('opt3', {
    cell: (info) => info.row.original.dept?.deptName,
    header: t('소속'),
    size: 114
  }),
  columnHelper.accessor('positionName', {
    cell: (info) => info.getValue(),
    header: t('호칭(지위)'),
    size: 114
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    header: t('이메일'),
    size: 114
  }),
  columnHelper.accessor('employeeNumber', {
    cell: (info) => info.getValue(),
    header: t('사번'),
    meta: {
      cellAlign: 'center',
    },
    size: 88
  }),
  columnHelper.accessor('name', {
    cell: (info) => {
      return (
        <Button
          label={`${info.getValue()}`}
          className="link"
          onClick={() => _global.linkClick(info.row.original.uuid)}
        />
      );
    },
    header: t('이름'),
    size: 88
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => info.row.original.createdDate
      ? getDateToString(new Date(info.row.original.createdDate), DATE_TIME_FORMAT.DATETIME_SEC)
      : '',
    header: t('신청일'),
    size: 114
  }),
  columnHelper.accessor('opt10', {
    cell: (info) => {
      if( info.row.original.enabledDate ) {
        return t('승인')
      }
      return t('대기');
    },
    header: t('승인 상태'),
    meta: {
      cellAlign: 'center',
    },
    size: 76
  }),
  columnHelper.accessor('enabledDate', {
    cell: (info) => info.row.original.enabledDate
      ? getDateToString(new Date(info.row.original.enabledDate), DATE_TIME_FORMAT.DATETIME_SEC)
      : '',
    header: t('승인일'),
    size: 114
  }),
] as ColumnDef<any, unknown>[];
