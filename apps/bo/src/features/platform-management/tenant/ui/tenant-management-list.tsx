import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString, SelectOption } from '@learnway/shared';
import { Divider } from '@learnway/ui/elements';
import {
  createGridBoxColumnHelper,
  GridBox,
  useGridBox,
  useGridBoxConfig,
} from '@learnway/ui/grid';

import { SearchBoxForm } from '@shared/ui/search-box';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { queryOptions as companysQueryOptions } from '@entities/companies/service/companies.queries';
import { Tenant, tenantQueryOptions } from '@entities/tenant';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { useCreation } from 'ahooks';

import {
  DropdownFormField,
  FormRow2,
  InputFormField,
  TenantByRoleDropdownFormField,
} from '@shared/ui/form';

/**
 * 화면번호 : NLP_BO_TMS_1000
 * @param param0
 * @returns
 */
const TenantManagmentListComponent: FC<any> = ({ rootPath, roleInfo }) => {
  const router = useRouter();
  const routerState = useRouterState();

  const [companyOptions, setCompanyOptions] = useState<SelectOption[]>([]);

  const { data: loginUser } = useFetchAuthUser();
  const queryClient = useQueryClient();
  const isPlatformManager = roleInfo === 'PLATFORM';
  const linkClick = (tenantId: number, tenantName: string) => {
    router.navigate({
      to: `${rootPath}/tenant/management/detail`,
      state: {
        tenantId,
        tenantName,
        listParam: getValues(),
        roleInfo,
      },
    });
  };
  const boxHelper = createGridBoxColumnHelper<Tenant>();

  const gridInitConfig = useCreation<useGridBoxConfig>(
    () => ({
      query: tenantQueryOptions.list,
      columns: [
        boxHelper.accessor('tenantName', {
          label: t('LABEL.grid.column.tenantName'),
          render: (info) => {
            return (
              <Button
                className="link"
                onClick={() => linkClick(info.row.original.tenantId, info.row.original.tenantName)}
              >
                {info.getValue()}
              </Button>
            );
          },
          size: 192,
        }),
        boxHelper.accessor('companyTenantList', {
          label: t('LABEL.grid.column.company'),
          enableSorting: false,
          render: (info) => {
            return (
              info.getValue() &&
              info
                .getValue()
                .map((item) => item.companyName)
                .join(',')
            );
          },
          size: 200,
        }),
        boxHelper.accessor('tenantUserList', {
          label: t('LABEL.grid.column.tenantManager'),
          enableSorting: false,
          render: (info) => {
            return (
              info.getValue() &&
              info
                .getValue()
                .map((item) => item.userName)
                .join(',')
            );
          },
          size: 120,
        }),
        boxHelper.accessor('isUsed', {
          label: t('사용여부'),
          render: (info) => {
            return info.row.original.isUsed ? t('LABEL.common.enable') : t('미사용');
          },
          size: 104,
        }),
        boxHelper.accessor('createdDate', {
          label: t('등록일시'),
          render: (info) => {
            return getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATETIME_SEC);
          },
          meta: {
            cellAlign: 'center',
          },
          size: 192,
        }),
        boxHelper.accessor('modifiedDate', {
          label: t('수정일시'),
          render: (info) => {
            return getDateToString(new Date(info.getValue()), DATE_TIME_FORMAT.DATETIME_SEC);
          },
          meta: {
            cellAlign: 'center',
          },
          size: 192,
        }),
      ],
      data: [],
      gridState: {
        page: 0,
        size: 20,
        sort: [],
      },
    }),
    [],
  );

  const {
    provider: searchProvider,
    getValues,
    onFormChange,
    onFormValid,
    setValue,
    onSubmit,
  } = useDynamicForm2();
  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig, getValues);

  const tenantIdWatch = useWatch({ control: searchProvider.control, name: 'tenantId' });

  const handleOnSearch = (data: any) => {
    gridFetch(data);
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

  useEffect(() => {
    if (!loginUser) return;

    if (loginUser.activeTenant) setValue('tenantId', loginUser.activeTenant.tenantId ?? '');
  }, [loginUser]);

  useEffect(() => {
    setValue('companyCode', '');
    if (tenantIdWatch) {
      (async () => {
        const companys = await queryClient.fetchQuery(
          companysQueryOptions.tenantCompany(tenantIdWatch),
        );

        const companyIdOptions = companys.map((item) => ({
          label: item.name,
          value: item.companyCode,
        }));
        console.log(companyIdOptions);
        setCompanyOptions(companyIdOptions);
      })();
    } else {
      setCompanyOptions([]);
    }
  }, [tenantIdWatch]);

  return (
    <>
      <SearchBoxForm onSearch={onSubmit(handleOnSearch)}>
        <ContentsRow>
          <FormRow2
            provider={searchProvider}
            name="tenantId"
            type="custom"
            label={t('LABEL.form.label.tenant', '테넌트')}
            value=""
            format="number"
            placeholder={t('입력 또는 선택')}
            validation={{
              required: !isPlatformManager,
              conditions: [
                {
                  fn: (values: any) => {
                    if (isPlatformManager) return false;
                    console.log(values);
                    return !values.tenantId;
                  },
                  message: t('{{type}}를 선택해주세요.', { type: t('테넌트') }),
                },
              ],
            }}
            element={
              <TenantByRoleDropdownFormField
                presetOptionLabel={t('입력 선택')}
                dropdownConfig={{
                  onchange: () => {
                    return '';
                  },
                  isSearchable: true,
                }}
              />
            }
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
                options={companyOptions}
                presetOptionLabel={t('LABEL.form.label.select')}
                dropdownConfig={{
                  onchange: () => {
                    return '';
                  },
                  isSearchable: true,
                }}
              />
            }
          />
          <FormRow2
            provider={searchProvider}
            name="tenantManagerName"
            type="text"
            label={t('LABEL.grid.column.tenantManager', '테넌트 담당자')}
            value=""
            format="string"
            element={<InputFormField />}
          />
        </ContentsRow>
        <ContentsRow>
          <FormRow2
            provider={searchProvider}
            name="companyManagerName"
            type="text"
            label={t('LABEL.grid.column.companyManager')}
            value=""
            element={<InputFormField />}
          />
          <FormRow2
            provider={searchProvider}
            name="isUsed"
            label={t('LABEL.form.label.useYn')}
            format={'boolean'}
            value={''}
            element={
              <DropdownFormField
                presetOptionLabel={t('LABEL.form.label.all')}
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
        </ContentsRow>
      </SearchBoxForm>
      <Divider />
      {/*<GridBox config={gConfig} columns={columns} showNumberingColumn />*/}
      <GridBox config={gConfig} showNumberingColumn />
    </>
  );
};

export const TenantManagmentList = TenantManagmentListComponent;
