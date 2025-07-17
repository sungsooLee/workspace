import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { useUnlockUser } from '@entities/users/service/users.hook';
import { usersQueryOptions } from '@entities/users/service/users.queries';
import { getUserStatus } from '@features/platform-management/company/company-user-management/service/company-user.service';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button, Divider, GridBox, useGridBox, useGridBoxConfig, useModal } from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useLocation } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { EnGlobalConst, RoleInfo } from '@types';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import { useFetchAuthUser } from '@learnway/auth/entities';

const _global = {
  unlockClick: (row: any) => {
    return;
  },
  loginClick: (row: any) => {
    return;
  },
  getTenantId: (): number | undefined => {
    return undefined;
  },
  getDetailPath: (): string => {
    return '';
  },
};

const CompanyUserListComponent = () => {
  const location = useLocation();

  const { data: loginUser } = useFetchAuthUser();
  const queryClient = useQueryClient();

  const { alert, confirm: openConfirm } = useModal();
  const {
    provider: searchProvider,
    getValues,
    setValue,
    setOptions,
  } = useSearchBox(searchConfig());

  const searchParam = () => {
    const data = getValues();
    setTenantId(data.tenantId);
    const createdDateFrom = data.createdDate.from
      ? dayjs(new Date(data.createdDate.from)).startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS')
      : '';
    const createdDateTo = data.createdDate.to
      ? dayjs(new Date(data.createdDate.to)).endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS')
      : '';
    const searchData = {
      ...data,
      createdDateFrom,
      createdDateTo,
    };
    console.log('searchData', searchData);
    return searchData;
  };

  const { config: gConfig, gridFetch } = useGridBox(gridConfig, searchParam);
  const [tenantId, setTenantId] = useState(undefined);

  const tenantIdWatch = useWatch({ control: searchProvider.control, name: 'tenantId' });
  const { unlock } = useUnlockUser({});

  const handleOnSearch = useCallback((data: any) => {
    gridFetch(searchParam());
  }, []);

  useEffect(() => {
    setValue('companyId', '');
    if (tenantIdWatch) {
      (async () => {
        const companys = await queryClient.fetchQuery(
          companysQueryOptions.tenantCompany(tenantIdWatch),
        );
        const companyIdOptions = companys.map((item) => ({
          label: item.name,
          value: item.companyId,
        }));
        setOptions('companyId', companyIdOptions);
      })();
    } else {
      setOptions('companyId', []);
    }
  }, [tenantIdWatch]);

  useEffect(() => {
    if (!loginUser) return;

    const tenantIdOptions = loginUser.tenants.map((tenant) => ({
      value: tenant.tenantId,
      label: tenant.tenantName,
    }));

    setOptions('tenantId', tenantIdOptions);
    if (loginUser.activeTenant) setValue('tenantId', loginUser.activeTenant.tenantId ?? '');
  }, [loginUser]);

  _global.unlockClick = async (row: any) => {
    const message =
      row.authType === 'PLATFORM' ? (
        <>
          {t('계정 잠김을 해제하면 임시비밀번호를 사용자 메일로 발송합니다.')}
          <br />
          {t(
            '사용자가 임시비밀번호로 로그인 후 비밀번호를 변경해야 계정 상태가 ‘잠김’ → ‘정상’으로 변경됩니다. ',
          )}
        </>
      ) : (
        t('계정 잠김을 해제하면 계정 상태가 ‘잠김’ → ‘정상’으로 변경됩니다.')
      );
    if (
      await openConfirm({
        title: t('계정 잠김을 해제하시겠습니까?'),
        content: message,
      })
    ) {
      unlock(row.uuid, {
        onSuccess: () => {
          gridFetch(searchParam());
        },
      });
    }
  };
  _global.loginClick = (row: any) => {
    alert({ title: '준비중입니다.' });
  };
  _global.getTenantId = () => {
    return tenantId;
  };
  _global.getDetailPath = () => {
    return location.pathname + '/detail';
  };

  const customExcelButtons = () => {
    // TODO 테넌트 관리자의 경우 엑셀 업로드/다운로드(추후 platform 메니져는 조건은 삭제)
    const myRoleTypes = loginUser?.myRoles?.filter((item: RoleInfo) => {
      if (item.roleType === 'TENANT_MANAGER' || item.roleType === 'PLATFORM_MANAGER') {
        return item.roleType;
      }
    });
    if (myRoleTypes && myRoleTypes.length !== 0) {
      return (
        <>
          <GridExcelUploadButton />
          <GridExcelDownloadButton />
        </>
      );
    }
    return '';
  };

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        columns={columns()}
        title={t('유저 목록')}
        disabledSelectionToggle
        excelButtons={customExcelButtons()}
      />
    </>
  );
};

export const CompanyUserList = CompanyUserListComponent;

const searchConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'tenantId',
        type: 'dropdown',
        format: 'number',
        label: t('테넌트'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
        presetOptionLabel: t('LABEL.form.label.select'),
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
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        value: '',
        placeholder: '',
      },
    ],
    [
      {
        name: 'accountStatus',
        type: 'dropdown',
        label: t('계정 상태'),
        value: '',
        optionsConfig: {
          codeGroup: CODE_GROUP['pms.user.AccountStatus'],
        },
        presetOptionLabel: t('전체'),
      },
      {
        name: 'createdDate',
        type: 'date-range',
        label: t('회원가입 기간'),
        value: {
          from: undefined,
          to: undefined,
        },
      },
    ],
  ],
  validator: {
    tenantId: true,
    createdDate: {
      conditions: [
        {
          fn: (values: any) => !values.createdDate?.from && values.createdDate?.to,
          message: t('시작 날짜를 선택하세요'),
        },
        {
          fn: (values: any) => values.createdDate?.from && !values.createdDate?.to,
          message: t('종료 날짜를 선택하세요.'),
        },
        {
          fn: (values: any) => values.createdDate.from > values.createdDate.to,
          message: t('시작 날짜는 종료 날짜 보다 이전일 이어야 합니다.'),
        },
      ],
    },
  },
});

const gridConfig: useGridBoxConfig = {
  query: usersQueryOptions.list,
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

const columns = () =>
  [
    columnHelper.accessor('tenant', {
      header: t('테넌트'),
      cell: (info) => {
        const found = info.row.original.tenants.find((tenant: any) => {
          return tenant.tenantId === _global.getTenantId();
        });

        if (found) {
          return found.tenantName;
        }
        return _global.getTenantId();
      },
      enableGrouping: false,
      enableSorting: false,
      size: 120,
    }),
    columnHelper.accessor('companyEntity.companyType', {
      header: t('그룹'),
      cell: (info) =>
        t(
          `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.row.original.company.companyType}`,
        ),
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('companyEntity.name', {
      header: t('회사'),
      cell: (info) => info.row.original.company.name,
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('deptEntity.deptName', {
      header: t('소속'),
      cell: (info) => info.row.original.dept?.deptName,
      enableGrouping: false,
      size: 120,
    }),
    columnHelper.accessor('positionName', {
      header: t('호칭(직위)'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
      size: 120,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('employeeNumber', {
      header: t('사번'),
      cell: (info) => info.getValue(),
      enableGrouping: false,
      size: 120,
      meta: {
        cellAlign: 'center',
      },
    }),
    columnHelper.accessor('name', {
      header: t('이름'),
      cell: (info) => (
        <Link
          to={_global.getDetailPath()}
          state={{
            userUuid: info.row.original.uuid,
          }}
          className="link"
        >
          {info.row.original.name}
        </Link>
      ),
      enableGrouping: false,
      size: 120,
    }),
    // 재직, 정직, 휴직 : deletedDate, isOnLeave, isSuspended, retireDate이 null인지 여부로 확인
    columnHelper.accessor('userStatus', {
      cell: (info) => {
        const status = getUserStatus(info.row.original);
        if (status) return t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.Status.${status}`);
        return t('-');
      },
      header: t('재직여부'),
      size: 88,
      meta: {
        cellAlign: 'center',
      },
      enableSorting: false,
    }),
    // enabledDate, lockedDate, dormantDate, deletedDate이 null인지 여부로 판단
    // 대기(회원가입 승인 전), 정상, 휴면(1년 미로그인), 잠김(비밀번호 5회 오류)
    columnHelper.accessor('accountStatus', {
      cell: (info) => {
        if (info.row.original.enabledDate === null)
          return t('대기'); // 계정활성화일시
        else if (info.row.original.lockedDate !== null)
          return t('잠김'); // 계정잠김일시
        else if (info.row.original.dormantDate !== null) return t('휴면'); // 휴면계정전환일시
        return t('정상');
      },
      header: t('계정상태'),
      size: 88,
      meta: {
        cellAlign: 'center',
      },
      enableSorting: false,
    }),
    columnHelper.accessor('unlock', {
      header: t('잠김해제'),
      cell: (info) => (
        <Button
          variant="gray"
          label={t('잠김해제')}
          disabled={info.row.original.lockedDate === null}
          onClick={() => {
            _global.unlockClick(info.row.original);
          }}
        />
      ),
      enableGrouping: false,
      meta: {
        cellAlign: 'center',
      },
      size: 88,
      enableSorting: false,
    }),
    columnHelper.accessor('login', {
      header: t('로그인'),
      cell: (info) => (
        <Button
          variant="gray"
          label={t('로그인')}
          onClick={() => {
            _global.loginClick(info.row.original);
          }}
        />
      ),
      enableGrouping: false,
      meta: {
        cellAlign: 'center',
      },
      enableSorting: false,
      size: 88,
    }),
    // linkageSystem값이 null이면 직접 가입, 아니면 I/F
    columnHelper.accessor('createdDate', {
      header: t('회원가입일'),
      cell: (info) =>
        info.row.original.linkageSystem === null
          ? info.row.original.createdDate
            ? getDateToString(
                new Date(info.row.original.createdDate),
                DATE_TIME_FORMAT.DATETIME_SEC,
              )
            : ''
          : info.row.original.joinDate
            ? getDateToString(new Date(info.row.original.joinDate), DATE_TIME_FORMAT.DATETIME_SEC)
            : '',
      enableGrouping: false,
      meta: {
        cellAlign: 'center',
      },
      size: 160,
    }),
  ] as ColumnDef<any, unknown>[];
