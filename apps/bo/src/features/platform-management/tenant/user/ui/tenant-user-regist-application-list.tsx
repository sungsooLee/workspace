import { tenantQueryOptions } from '@entities/tenant';
import { useApproveAccountUser, useRejectAccountUser } from '@entities/users/service/users.hook';
import { usersQueryOptions } from '@entities/users/service/users.queries';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { CODE_GROUP, SearchBoxConfig, useDynamicForm2, useSearchBox } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString, SelectOption } from '@learnway/shared';
import { Button } from '@learnway/ui/button';
import { Checkbox } from '@learnway/ui/checkbox';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';
import { EnGlobalConst } from '@shared/types/enums';
import {
  DropdownFormField, FormItem,
  FormRow2,
  InputFormField,
  PeriodPickerFormField,
  TenantByRoleDropdownFormField,
} from '@shared/ui/form';
import { SearchBox, SearchBoxForm } from '@shared/ui/search-box';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import { t } from 'i18next';
import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import { useCreation } from 'ahooks';

const _global = {
  linkClick: (userUuid: string) => {
    return;
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

  const { openModal, confirm: confirmModal } = useModal();
  const [companyCodes, setCompanyCodes] = useState<SelectOption[]>([]);
  const [tenantId, setTenantId] = useState<number | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [tableInstance, setTableInstance] = useState<Table<any>>();

  _global.linkClick = (userUuid: string) => {
    router.navigate({
      to: `${rootPath}/tenant/user/application-detail`,
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
          name: 'select-check',
          id: 'select-check',
          label: (info: any) => {
            return (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <Checkbox
                  checked={info.table.getIsAllRowsSelected()}
                  onCheckedChange={(checked) => {
                    info.table.toggleAllRowsSelected(!!checked);
                  }}
                />
              </div>
            );
          },
          render: (info: any) => {
            return (
              <div style={{ width: '100%', textAlign: 'center', paddingRight: 0 }}>
                <Checkbox
                  checked={info.row.getIsSelected()}
                  onCheckedChange={() => {
                    if (!info.row.getIsGrouped()) {
                      info.row.getToggleSelectedHandler();
                    }
                  }}
                />
              </div>
            );
          },
          size: 32,
          maxSize: 32,
          minSize: 32,
          meta: {
            align: 'center',
            headerAlign: 'center',
            cellAlign: 'center',
          },
          enableSorting: false,
        },
        {
          name: 'tenantName',
          label: t('테넌트'),
          render: (info: any) => {
            const found = info.row.original.tenants.find((tenant: any) => {
              return tenant.tenantId === loginUser?.activeTenant?.tenantId;
            });
            if (found) {
              return found.tenantName;
            }
            return tenantId;
          },
          size: 114,
          enableSorting: false,
        },
        {
          name: 'opt1',
          label: t('그룹'),
          render: (info: any) => {
            return t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.row.original.company.companyType}`,
            );
          },
          size: 114,
          enableSorting: false,
        },
        {
          name: 'opt2',
          label: t('회사'),
          render: (info: any) => {
            return info.row.original.company.name;
          },
          size: 114,
          enableSorting: false,
        },
        {
          name: 'opt3',
          label: t('소속'),
          render: (info: any) => {
            return info.row.original.dept?.deptName;
          },
          size: 114,
          enableSorting: false,
        },
        {
          name: 'positionName',
          label: t('호칭(지위)'),
          size: 114,
        },
        {
          name: 'email',
          label: t('이메일'),
          size: 114,
        },
        {
          name: 'employeeNumber',
          label: t('사번'),
          meta: {
            cellAlign: 'center',
          },
          size: 88,
        },
        {
          name: 'name',
          label: t('이름'),
          render: (info: any) => {
            return (
              <Button
                label={`${info.getValue()}`}
                className="link"
                onClick={() => _global.linkClick(info.row.original.uuid)}
              />
            );
          },
          size: 88,
        },
        {
          name: 'createdDate',
          label: t('신청일'),
          render: (info: any) => {
            return info.row.original.createdDate
              ? getDateToString(new Date(info.row.original.createdDate), DATE_TIME_FORMAT.DATETIME_SEC)
              : '';
          },
          size: 114,
        },
        {
          name: 'opt10',
          label: t('승인 상태'),
          render: (info: any) => {
            if (info.row.original.enabledDate) {
              return t('승인');
            }
            return t('대기');
          },
          meta: {
            cellAlign: 'center',
          },
          size: 76,
          enableSorting: false,
        },
        {
          name: 'enabledDate',
          label: t('승인일'),
          render: (info: any) => {
            return info.row.original.enabledDate
              ? getDateToString(new Date(info.row.original.enabledDate), DATE_TIME_FORMAT.DATETIME_SEC)
              : '';
          },
          size: 114,
        },
      ],
      data: [],
      gridState: {
        page: 0,
        size: 20,
        sort: [],
      },
    }),
    []
  );

  const handleOnSearchParam = () => {
    const data = getValues();
    const payload = {
      ...data,
      createdDateFrom: data.dateRange && data.dateRange.from &&
        getDateToString(new Date(data.dateRange.from), 'YYYY-MM-DDTHH:mm:ss'),
      createdDateTo: data.dateRange && data.dateRange.to &&
        getDateToString(new Date(data.dateRange.to), 'YYYY-MM-DDTHH:mm:ss'),
      dateRange: null,
    };
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== null && value !== undefined && value !== '',
      ),
    );
    return filteredPayload;
  };

  const {
    provider: searchProvider,
    getValues,
    setValue,
    onFormChange,
    onFormValid,
    onSubmit,
  } = useDynamicForm2();
  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig, handleOnSearchParam);
  const tenantIdWatch = useWatch({ control: searchProvider.control, name: 'tenantId' });

  const handleOnSearch = () => {
    gridFetch(handleOnSearchParam());
  };

  const openChangeUserEnableModal = (isApproval: boolean) => {
    const selectedRow = tableInstance?.getSelectedRowModel().rows;
    const checkTarget = selectedRow?.filter((row: any) => row.original.enabledDate !== null);
    if (checkTarget?.length !== 0) {
      confirmModal({
        title: isApproval ? '승인 확인' : '반려 확인',
        content: '선택한 대상 중 이미 승인된 대상이 있습니다. 확인 후 다시 시도해주세요.',
        isConfirm: false
      });
      return;
    }
    confirmModal({
      title: isApproval ? t('승인 하시겠습니까?') : t('반려 하시겠습니까?'),
      content: isApproval ? (
        <p>{t('회원가입 신청을 승인하면 로그인 및 정상적인 서비스 이용을 할 수 있습니다.')}</p>
      ) : (
        <p>{t('회원가입 신청을 반려하면 정상적으로 서비스 이용을 할 수 없습니다.')}</p>
      ),
      onClose: (value: boolean) => {
        if (value) {
          // 선택한 계정 상태 변경(대기 -> 정상),
          const uuids = selectedRow?.map((row: any) => row.original.uuid);
          if (isApproval) {
            // 승인
            approve(
              { uuids },
              {
                onSuccess: () => {
                  gridFetch(getValues());
                },
              },
            );
          } else {
            // 반려
            reject(
              { uuids },
              {
                onSuccess: () => {
                  gridFetch(getValues());
                },
              },
            );
          }
        }
      },
    });
  };

  useEffect(() => {
    const init = async () => {
      const listParam = routerState.location.state.listParam;
      if (listParam) {
        onFormChange(listParam);
        if (await onFormValid()) {
          handleOnSearch();
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!loginUser) return;
    if (loginUser.activeTenant) setTenantId(loginUser.activeTenant.tenantId);
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
        setCompanyCodes(companyIdOptions);
      })();
    } else {
      setCompanyCodes([]);
    }
  }, [tenantIdWatch]);

  return (
    <>
      <SearchBoxForm onSearch={onSubmit(handleOnSearch)}>
        <ContentsRow>
          <FormRow2
            provider={searchProvider}
            name={'tenantId'}
            type="custom"
            label={t('LABEL.form.label.tenant', '테넌트')}
            value=""
            format="number"
            element={<TenantByRoleDropdownFormField />}
            validation={{ required: true }}
          />
          <FormRow2
            provider={searchProvider}
            name="companyCode"
            type="dropdown"
            label={t('LABEL.grid.column.company', '회사')}
            value=""
            format="string"
            element={
              <DropdownFormField
                options={companyCodes}
                presetOptionLabel={t('LABEL.form.label.select')}
              />
            }
          />
          <FormRow2
            provider={searchProvider}
            name="email"
            type="text"
            label={t('이메일')}
            value=""
            format="string"
            placeholder={t('입력')}
            element={<InputFormField />}
          />
          <FormRow2
            provider={searchProvider}
            name="employeeNumber"
            type="text"
            label={t('사번')}
            value=""
            format="string"
            placeholder={t('입력')}
            element={<InputFormField />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={searchProvider}
            name="userState"
            type="dropdown"
            label={t('승인 상태')}
            value="WAIT"
            format="string"
            element={
              <DropdownFormField
                options={[
                  { value: '', label: t('전체') },
                  { value: 'WAIT', label: t('대기') },
                  { value: 'NORMAL', label: t('승인') },
                ]}
              />
            }
          />
          <FormRow2
            provider={searchProvider}
            name={'dateRange'}
            label={t('신청 기간')}
            format={'object'}
            element={<PeriodPickerFormField datePickerConfig={{ displayType: 'day' }} />}
          />
          <FormItem />
          <FormItem />
        </ContentsRow>
      </SearchBoxForm>
      <Divider />
      <GridBox
        config={gConfig}
        multiple
        showColumnSettings={false}
        hideRowSelectionCheckBox={true}
        onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
        onRowSelect={(row) => {
          if (row) {
            setIsDisabled(true);
          } else {
            setIsDisabled(false);
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
