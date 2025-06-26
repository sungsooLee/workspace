import { useCallback, useEffect, useMemo, useState } from 'react';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import {
  CODE_GROUP,
  compactValues,
  DynamicFormConfig,
  SearchBoxConfig,
  useCurrentRoute,
  useDynamicForm,
  useSearchBox,
} from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { pageRouteConfig } from '@features/auth';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  DatePicker,
  GridBox,
  RadioGroupFormField,
  useGridBox,
  useModal,
} from '@learnway/ui';
import { SearchBox } from '@shared/ui/search-box';
import { ChipListFormField, ContentsHistoryInfoFormField, FormRow, FormSubTitle } from '@shared/ui';
import { cn, DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { EnChannelScope, EnCompanyScope, EnDeptScope, EnTenantScope } from '@types';
import { FormDisplay } from '@features/form/ui/form-display';
import { formUtils } from '@entities/form-utils';
import { createColumnHelper } from '@tanstack/react-table';
import { useFetchRole } from '@entities/role/service/role-manage.hook';
import { MyRoleExtendModal } from '@features/user/my-page/ui/my-role-extend-modal';
import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';

export const Route = createFileRoute('/_layout/my-page/role/detail')({
  component: RouteComponent,
  ...pageRouteConfig({ meta: { title: '나의 권한' } }),
});

function RouteComponent() {
  const { state } = useCurrentRoute(Route);
  const router = useRouter();

  console.log('### detail state,', state);
  const { confirm, alert, open: openModal } = useModal();
  const {
    provider: sProvider,
    getValues,
    onFormChange: onFormChangeSearchBox,
    onFormValid,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const { provider, fetchData, onSubmit, onFormChange, clearFormError, control } =
    useDynamicForm(formConfig);

  const { data: roleData } = useFetchRole(state?.roleId);

  const handleSubmit = (data: any) => {
    console.log('### handleSubmit :', data);
  };

  useEffect(() => {
    if (state?.roleId) {
      gridFetch({ roleId: state?.roleId });
    }
  }, []);

  // useEffect(() => {
  //   if (state?.roleId) return;
  //   router.history.canGoBack() && router.history.back();
  // }, [state]);

  useEffect(() => {
    if (roleData) {
      onFormChange({
        roleId: roleData.roleId,
        roleCd: '',
        roleName: roleData.name,
        roleDescription: roleData.description,
        tenantScope: roleData.tenantScope,
        companyScope: roleData.companyScope,
        companies: roleData.companies,
        deptScope: roleData.deptScope,
        depts: roleData.depts,
        channelScope: roleData.channelScope,
        channels: roleData.channels,
      });
    }
  }, [roleData]);

  /**
   * @param data
   */
  const handleOnSearch = (query: any) => {
    console.log('### handleOnSearch:: ', query);
    gridFetch({
      roleId: state?.roleId,
      ...compactValues(query),
      createdDateFrom: query.createPeriod.from
        ? formatDate(query.createPeriod.from, DATE_TIME_FORMAT.DATE_SERVER)
        : undefined,
      createdDateTo: query.createPeriod.to
        ? formatDate(query.createPeriod.to, DATE_TIME_FORMAT.DATE_SERVER)
        : undefined,
    });
  };

  const handleCellClick = useCallback(
    (data: any) => {
      console.log('data', data);
      openModal({
        content: <MyRoleExtendModal data={data} type="view" />,
        width: 'md',
      });
    },
    [openModal],
  );

  const gridColumns = useMemo(() => createGridColumns(handleCellClick), [handleCellClick]);

  return (
    <PageContainer>
      <ContentsButtons>
        <Link to="/my-page/role" state={{ listParam: state.listParam }}>
          <Button type="button" variant="point" size="sm">
            목록
          </Button>
        </Link>
      </ContentsButtons>
      <MainContents>
        <SearchBox provider={sProvider} onSearch={handleOnSearch} />
        <GridBox
          disabledSelectionToggle
          showNumberingColumn={true}
          columns={gridColumns}
          config={gConfig}
        />
        <form style={{ marginTop: 20 }} onSubmit={onSubmit(handleSubmit)}>
          <FormSubTitle label={t('역할 정보')} />
          <ContentsRow>
            <FormRow provider={provider} name={'roleId'} />
            {/* <FormRow provider={provider} name={'roleCd'} /> */}
            <FormRow provider={provider} name={'roleName'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'roleDescription'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'tenantScope'} element={<RadioGroupFormField />} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'companyScope'} element={<RadioGroupFormField />} />
          </ContentsRow>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'companyScope', value: EnCompanyScope.MANUAL }]}
          >
            <div className="chiplist_modal_wrap">
              <FormRow
                provider={provider}
                name={'companies'}
                element={
                  <ChipListModalSelectorFormField
                    disabled={true}
                    hideCloseButton
                    showAddButton={false}
                  />
                }
              />
            </div>
          </FormDisplay>
          <ContentsRow>
            <FormRow provider={provider} name={'deptScope'} element={<RadioGroupFormField />} />
          </ContentsRow>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'deptScope', value: EnChannelScope.MANUAL }]}
          >
            <div className="chiplist_modal_wrap">
              <FormRow
                provider={provider}
                name={'depts'}
                element={
                  <ChipListModalSelectorFormField
                    disabled={true}
                    hideCloseButton
                    showAddButton={false}
                  />
                }
              />
            </div>
          </FormDisplay>

          {/* 채널 */}
          <ContentsRow>
            <FormRow provider={provider} name={'channelScope'} element={<RadioGroupFormField />} />
          </ContentsRow>
          <FormDisplay
            provider={provider}
            dependencies={[
              { name: 'channelScope', value: EnChannelScope.CURRENT_COMPANY_INCLUSIVE },
            ]}
          >
            <div className="chiplist_modal_wrap">
              <FormRow
                provider={provider}
                name={'channels'}
                element={
                  <ChipListModalSelectorFormField
                    disabled={true}
                    hideCloseButton
                    showAddButton={false}
                  />
                }
              />
            </div>
          </FormDisplay>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'channelScope', value: EnChannelScope.MANUAL }]}
          >
            <div className="chiplist_modal_wrap">
              <FormRow
                provider={provider}
                name={'channels'}
                element={
                  <ChipListModalSelectorFormField
                    disabled={true}
                    hideCloseButton
                    showAddButton={false}
                  />
                }
              />
            </div>
          </FormDisplay>
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </form>
      </MainContents>
    </PageContainer>
  );
}

const searchConfig: SearchBoxConfig = {
  builders: [
    [
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
        name: 'createPeriod',
        type: 'date-range',
        label: t('신청일'),
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

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'roleId',
      type: 'text',
      label: t('역할ID'),
      value: '',
      disabled: true,
    },
    {
      name: 'roleCd',
      type: 'text',
      label: t('역할코드'),
      value: '',
      disabled: true,
    },
    {
      name: 'roleName',
      type: 'text',
      label: t('역할명'),
      value: '',
      disabled: true,
    },
    {
      name: 'roleDescription',
      type: 'textarea',
      label: t('역할 설명'),
      value: '설명입니다',
      disabled: true,
      readOnly: true,
    },
    // 테넌트
    {
      name: 'tenantScope',
      type: 'radio-group',
      label: t('테넌트 접근 범위'),
      disabled: true,
      value: EnTenantScope.ALL,
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.role.TenantScope'],
      },
    },
    // 회사
    {
      name: 'companyScope',
      type: 'radio-group',
      label: t('회사 접근 범위'),
      value: EnCompanyScope.ALL,
      disabled: true,
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.role.CompanyScope'],
      },
    },
    {
      name: 'companies',
      label: '',
      type: 'chip-list',
      format: 'array',
      value: [{ label: '회사1', value: 'id0' }],
      placeholder: '',
    },
    // 조직
    {
      name: 'deptScope',
      type: 'radio-group',
      label: t('조직 접근 범위'),
      disabled: true,
      value: EnDeptScope.ALL,
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.role.DeptScope'],
      },
    },
    { name: 'depts', label: '', type: 'chip-list', value: [{ label: '부서1', value: 'id0' }] },
    {
      name: 'channelScope',
      type: 'radio-group',
      label: t('채널 접근 범위'),
      disabled: true,
      value: EnChannelScope.MANUAL,
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.role.ChannelScope'],
      },
    },
    // 채널
    {
      name: 'channels',
      type: 'chip-list',
      label: '',
      value: [{ label: '채널1', value: 'id0' }],
      disabled: true,
      chipListConfig: {
        showInput: false,
        labelField: 'label',
        valueField: 'value',
        wordwrap: true,
      },
    },
  ],
  validator: {
    channelScope: true,
    deptScope: true,
    companyScope: true,
    tenantScope: true,
  },
};

const columnHelper = createColumnHelper<any>();
const createGridColumns = (onCellClick: (data: any) => void) => [
  columnHelper.accessor('roleName', {
    header: t('HRD 담당자 역할'),
    size: 206,
    meta: {
      sortKey: 'roleEntity.name',
    },
  }),
  columnHelper.accessor('startDate', {
    header: t('역할 시작일'),
    size: 206,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('endDate', {
    header: t('역할 종료일'),
    size: 206,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('status', {
    header: t('신청 상태'),
    size: 206,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('approveInfo', {
    header: t('신청 현황'),
    size: 104,
    meta: {
      cellAlign: 'center',
    },
    enableSorting: false,
    cell: (info) => {
      return (
        <Button variant="gray2" size="xs" onClick={() => onCellClick(info.row.original)}>
          {t('진행 현황')}
        </Button>
      );
    },
  }),
  columnHelper.accessor('createdDate', {
    header: t('신청일'),
    size: 206,
    meta: {
      cellAlign: 'center',
    },
    cell: (info) => {
      return `${formatDate(info.row.original.createdDate, DATE_TIME_FORMAT.DATETIME_MIN)}`;
    },
  }),
  columnHelper.accessor('lastModifiedBy', {
    header: t('결재자'),
    size: 104,
  }),
  columnHelper.accessor('modifiedDate', {
    header: t('결재일'),
    size: 206,
    meta: {
      cellAlign: 'center',
    },
  }),
];

// {
//   "roleApplicationId": 18,
//   "companyId": 54,
//   "companyName": "현대오토에버",
//   "deptId": 1,
//   "deptName": "개발팀",
//   "userUuid": "c39270e2-3f6d-11f0-9435-0218a74d52f7",
//   "userName": "이창기",
//   "employeeNumber": "9496504",
//   "roleId": 65,
//   "roleName": "현대카드HRD역할\"'`~!@#$%^&*()_+-={}|[]:\\\";'<>?",
//   "tenantId": 2,
//   "tenantName": "현대카드\uD83D\uDC68‍\uD83D\uDCBB\uD83D\uDD25\uD83D\uDCAF\uD83D\uDE80",
//   "channels": [],
//   "startDate": "2025-06-24",
//   "endDate": "2025-07-28",
//   "reason": "test",
//   "status": "EXTEND",
//   "rejectReason": null,
//   "createdBy": "c39270e2-3f6d-11f0-9435-0218a74d52f7",
//   "createdDate": "2025-06-24T04:51:09.250Z",
//   "lastModifiedBy": null,
//   "modifiedDate": null
// },
