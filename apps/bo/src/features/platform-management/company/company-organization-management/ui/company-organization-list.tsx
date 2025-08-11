import { useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox } from '@learnway/ui/grid';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { SearchBoxForm } from '@shared/ui/search-box';

import { queryOptions as companyQueryOptions } from '@entities/companies';
import { FormRow2 } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { EnGlobalConst } from '@shared/types/enums';
import { DropdownFormField, InputFormField, PeriodPickerFormField } from '@shared/ui/form';
import { useCreation } from 'ahooks';

const _global = {
  linkClick: (row: any) => {
    return;
  },
};

/**
 * NLP_BO_TMS_1111_01 : 임시 회사 api 호출
 * @returns
 */
const CompanyOrganizationListComponent = ({
  rootPath,
  roleInfo,
}: {
  rootPath: string;
  roleInfo: string;
}) => {
  const router = useRouter();
  const { data: loginUser } = useFetchAuthUser();

  const [tenantId, setTenantId] = useState<number>();
  const gridInitConfig = useCreation(
    () => ({
      query: companyQueryOptions.list,
      columns: [
        {
          name: 'companyType',
          label: t('그룹'),
          render: (info: any) => {
            return t(
              `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.getValue()}`,
            );
          },
        },
        {
          name: 'isUseLinkageSystem',
          label: t('데이터 관리 방식'),
          render: (info: any) => {
            return info.getValue() ? '자동 관리' : '수동 관리';
          },
        },
        {
          name: 'name',
          label: t('회사명'),
          render: (info: any) => {
            return (
              <Button
                className="link"
                onClick={() => {
                  _global.linkClick(info.row.original);
                }}
                label={info.getValue() as string}
              />
            );
          },
        },
        {
          name: 'isUsed',
          label: t('회사정보 사용'),
          render: (info: any) => {
            return info.getValue() ? t('사용') : t('미사용');
          },
        },
        {
          name: 'lastModifiedBy',
          label: t('수정자'),
          render: (info: any) => {
            return info.row.original.isUseLinkageSystem
              ? '시스템'
              : info.row.original.lastModifiedBy;
          },
        },
        {
          name: 'modifiedDate',
          label: t('수정일'),
          render: (info: any) => {
            return info.getValue() === null
              ? ''
              : getDateToString(new Date(info.getValue() as string), DATE_TIME_FORMAT.DATETIME_SEC);
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
    [],
  );

  const searchParam = () => {
    const data = getValues();
    console.log('####### => ', data);
    const searchData = {
      tenantId,
      companyType: data.companyType,
      name: data.name,
      isUsed: data.isUsed,
      modifyStartDate:
        data.modifyDate &&
        data.modifyDate.from &&
        getDateToString(new Date(data.modifyDate.from), 'YYYYMMDD'),
      modifyEndDate:
        data.modifyDate &&
        data.modifyDate.to &&
        getDateToString(new Date(data.modifyDate.to), 'YYYYMMDD'),
    };
    return searchData;
  };

  const {
    provider: searchProvider,
    getValues,
    setValue,
    onFormChange,
    onFormValid,
    onSubmit,
  } = useDynamicForm2();
  const { config: gConfig, gridFetch } = useGridBox(gridInitConfig, searchParam);

  _global.linkClick = (row: any) => {
    console.log('getValues', getValues());
    router.navigate({
      to: `${rootPath}/tenant/organization/detail`,
      state: {
        companyCode: row.companyCode,
        conpanyId: row.conpanyId,
        listParam: getValues(),
        roleInfo,
      },
    });
  };

  const handleOnSearch = (data: any) => {
    if (!tenantId) return;
    gridFetch(searchParam());
  };

  useEffect(() => {
    if (!loginUser) return;

    if (loginUser.activeTenant) {
      setTenantId(loginUser.activeTenant.tenantId);
    } else {
      if (loginUser.tenants && loginUser.tenants.length > 0) {
        setTenantId(loginUser.tenants[0].tenantId);
      }
    }
  }, [loginUser]);

  useEffect(() => {
    if (!tenantId) return;
    gridFetch(searchParam());
  }, [tenantId]);

  return (
    <>
      <SearchBoxForm onSearch={onSubmit(handleOnSearch)}>
        <ContentsRow>
          <FormRow2
            provider={searchProvider}
            name="companyType"
            type="dropdown"
            label={t('그룹')}
            value=""
            format="string"
            element={
              <DropdownFormField
                optionsConfig={{ codeGroup: CODE_GROUP['pms.company.CompanyType'] }}
                presetOptionLabel={t('LABEL.form.label.all')}
              />
            }
          />
          <FormRow2
            provider={searchProvider}
            name="name"
            type="text"
            label={t('회사명')}
            value=""
            format="string"
            placeholder={t('입력')}
            element={<InputFormField />}
          />
          <FormRow2
            provider={searchProvider}
            name="isUsed"
            type="dropdown"
            label={t('회사정보 사용')}
            value=""
            format="string"
            element={
              <DropdownFormField
                options={[
                  { value: '', label: t('전체') },
                  { value: true, label: t('사용') },
                  { value: false, label: t('미사용') },
                ]}
              />
            }
          />
          <FormRow2
            provider={searchProvider}
            name={'modifyDate'}
            label={t('수정기간')}
            format={'object'}
            element={<PeriodPickerFormField datePickerConfig={{ displayType: 'day' }} />}
          />
        </ContentsRow>
      </SearchBoxForm>
      <Divider />
      <GridBox config={gConfig} />
    </>
  );
};

export const TenantCompanyOrganizationList = CompanyOrganizationListComponent;
