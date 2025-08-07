import { queryOptions } from '@entities/companies';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { Divider } from '@learnway/ui/elements';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { EnGlobalConst } from '@shared/types/enums';
import { SearchBoxForm } from '@shared/ui/search-box';
import { Link } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { ContentsRow } from '@learnway/ui/contents-row';
import { DropdownFormField, FormRow2, InputFormField, PeriodPickerFormField } from '@shared/ui/form';

const TenantCompanyListComponent = () => {
  const { data: loginUser } = useFetchAuthUser();

  const [tenantId, setTenantId] = useState<number>();

  const searchParam = () => {
    const data = getValues();
    const searchData = {
      tenantId,
      companyType: data.companyType,
      name: data.name,
      isUsed: data.isUsed,
      modifyStartDate: data.modifyDate &&  data.modifyDate.from &&
        getDateToString(new Date(data.modifyDate.from), 'YYYYMMDD'),
      modifyEndDate: data.modifyDate &&  data.modifyDate.from &&
        getDateToString(new Date(data.modifyDate.to), 'YYYYMMDD'),
    };
    return searchData;
  };
  const {
    provider: searchProvider,
    getValues,
    onSubmit,
  } = useDynamicForm2();
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, searchParam);

  const handleOnSearch = () => {
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
      {/*<SearchBox provider={searchProvider} onSearch={handleOnSearch} />*/}
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
      <GridBox config={gConfig} columns={columns()} showNumberingColumn title={t('회사 목록')} />
    </>
  );
};

export const TenantCompanyList = TenantCompanyListComponent;

const gridConfig: useGridBoxConfig = {
  query: queryOptions.list,
  columns: [],
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
    columnHelper.accessor('companyType', {
      header: t('그룹'),
      cell: (info) =>
        t(`${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.CompanyType.${info.getValue()}`),
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('name', {
      header: t('회사명'),
      cell: (info) => (
        <Link
          to="/platform/tenant/company/detail"
          state={{
            companyCode: info.row.original.companyCode,
          }}
          className="link"
        >
          {info.row.original.name}
        </Link>
      ),
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('isUsed', {
      header: t('회사정보 사용'),
      cell: (info) => (info.getValue() ? t('사용') : t('미사용')),
    }),
    columnHelper.accessor('lastModifiedBy', {
      header: t('수정자'),
      cell: (info) =>
        info.row.original.isUseLinkageSystem ? '시스템' : info.row.original.lastModifiedBy,
      meta: {
        size: 'auto',
      },
    }),
    columnHelper.accessor('modifiedDate', {
      header: t('수정일'),
      cell: (info) =>
        info.getValue() === null
          ? ''
          : getDateToString(
              new Date(info.row.original.modifiedDate),
              DATE_TIME_FORMAT.DATETIME_SEC,
            ),
      meta: {
        size: 'auto',
      },
    }),
  ] as ColumnDef<any, unknown>[];
