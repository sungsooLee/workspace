import { queryOptions as companysQueryOptions } from '@entities/companies';
import { usersQueryOptions, useUnlockUser } from '@entities/users';
import { getUserStatus } from '@features/platform-management/company/company-user-management/service/company-user.service';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { CODE_GROUP, SearchBoxConfig, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { GridExcelDownloadButton, GridExcelUploadButton } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { EnGlobalConst, RoleInfo } from '@types';
import { useCreation } from 'ahooks';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

interface CompanyUserListProps {
  detailPath: string;
}

const CompanyUserListComponent = ({ detailPath }: CompanyUserListProps) => {
  const router = useRouter();
  const routerState = useRouterState();
  const { data: loginUser } = useFetchAuthUser();
  const queryClient = useQueryClient();

  const { alert, confirm: openConfirm } = useModal();

  const searchConfig: SearchBoxConfig = {
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
          name: 'userState',
          type: 'dropdown',
          label: t('계정 상태'),
          value: '',
          optionsConfig: {
            codeGroup: CODE_GROUP['pms.user.UserState'],
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
  };

  const [tenantId, setTenantId] = useState(undefined);
  const {
    provider: searchProvider,
    getValues,
    setValue,
    setOptions,
    onFormChange,
    onFormValid,
  } = useSearchBox(searchConfig);

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

  const linkClick = (userUuid: string) => {
    router.navigate({
      to: detailPath,
      state: {
        userUuid,
        listParam: getValues(),
      },
    });
  };

  const gridInitConfig = useCreation(
    () => ({
      query: usersQueryOptions.list,
      columns: [
        {
          name: 'tenant',
          label: t('테넌트'),
          render: (info: any) => {
            const found = info.row.original.tenants.find((tenant: any) => {
              return tenant.tenantId === tenantId;
            });

            if (found) {
              return found.tenantName;
            }
            return tenantId;
          },
          size: 120,
          enableSorting: false,
        },
        {
          name: 'companyEntity.companyType',
          label: t('그룹'),
          render: (info: any) =>
            t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.row.original.company.companyType}`,
            ),
          size: 120,
          enableSorting: false,
        },
        {
          name: 'companyEntity.name',
          label: t('회사'),
          render: (info: any) => info.row.original.company.name,
          size: 120,
          enableSorting: false,
        },
        {
          name: 'deptEntity.deptName',
          id: 'deptEntity.deptName',
          label: t('소속'),
          render: (info: any) => info.row.original.dept?.deptName,
          size: 120,
        },
        {
          name: 'positionName',
          label: t('호칭(직위)'),
          render: (info: any) => info.getValue(),
          size: 120,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'employeeNumber',
          label: t('사번'),
          render: (info: any) => info.getValue(),
          size: 120,
          meta: {
            cellAlign: 'center',
          },
        },
        {
          name: 'name',
          label: t('이름'),
          render: (info: any) => (
            <Button
              className="link"
              onClick={() => linkClick(info.row.original.uuid)}
              label={info.row.original.name}
            />
          ),
          size: 120,
        },
        // 재직, 정직, 휴직 : deletedDate, isOnLeave, isSuspended, retireDate이 null인지 여부로 확인
        {
          name: 'userStatus',
          label: t('재직여부'),
          render: (info: any) => {
            const status = getUserStatus(info.row.original);
            if (status) return t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.user.Status.${status}`);
            return t('-');
          },
          size: 88,
          meta: {
            cellAlign: 'center',
          },
          enableSorting: false,
        },
        // enabledDate, lockedDate, dormantDate, deletedDate이 null인지 여부로 판단
        // 대기(회원가입 승인 전), 정상, 휴면(1년 미로그인), 잠김(비밀번호 5회 오류)
        {
          name: 'accountStatus',
          label: t('계정상태'),
          render: (info: any) => {
            if (info.row.original.enabledDate === null)
              return t('대기'); // 계정활성화일시
            else if (info.row.original.lockedDate !== null)
              return t('잠김'); // 계정잠김일시
            else if (info.row.original.dormantDate !== null) return t('휴면'); // 휴면계정전환일시
            return t('정상');
          },
          size: 88,
          meta: {
            cellAlign: 'center',
          },
          enableSorting: false,
        },
        {
          name: 'unlock',
          label: t('잠김해제'),
          render: (info: any) => (
            <Button
              variant="gray"
              label={t('잠김해제')}
              disabled={info.row.original.lockedDate === null}
              onClick={() => {
                unlockClick(info.row.original);
              }}
            />
          ),
          size: 88,
          meta: {
            cellAlign: 'center',
          },
          enableSorting: false,
        },
        {
          name: 'login',
          label: t('로그인'),
          render: (info: any) => (
            <Button
              variant="gray"
              label={t('로그인')}
              onClick={() => {
                alert({ title: '준비중입니다.' });
              }}
            />
          ),
          size: 88,
          meta: {
            cellAlign: 'center',
          },
          enableSorting: false,
        },
        // linkageSystem값이 null이면 직접 가입, 아니면 I/F
        {
          name: 'createdDate',
          id: 'userEntity.createdDate',
          label: t('회원가입일'),
          render: (info: any) =>
            info.row.original.linkageSystem === null
              ? info.row.original.createdDate
                ? getDateToString(
                    new Date(info.row.original.createdDate),
                    DATE_TIME_FORMAT.DATETIME_SEC,
                  )
                : ''
              : info.row.original.joinDate
                ? getDateToString(
                    new Date(info.row.original.joinDate),
                    DATE_TIME_FORMAT.DATETIME_SEC,
                  )
                : '',
          size: 160,
          meta: {
            cellAlign: 'center',
          },
        },
      ],
      data: [],
      gridState: {
        page: 0,
        size: 10,
        sort: [],
      },
    }),
    [tenantId, detailPath],
  );

  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig, searchParam);

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

  const unlockClick = async (row: any) => {
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
      const payload = {
        uuids: [row.uuid],
      };
      unlock(payload, {
        onSuccess: () => {
          gridFetch(searchParam());
        },
      });
    }
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

  return (
    <>
      <SearchBox provider={searchProvider} onSearch={handleOnSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        title={t('유저 목록')}
        showNumberingColumn
        disabledSelectionToggle
        excelButtons={customExcelButtons()}
      />
    </>
  );
};

export const CompanyUserList = CompanyUserListComponent;
