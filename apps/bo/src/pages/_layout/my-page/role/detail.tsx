import { useCallback, useEffect, useMemo, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { t } from 'i18next';

import {
  CODE_GROUP,
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
import { cn } from '@learnway/shared';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form
import { EnChannelScope, EnCompanyScope, EnDeptScope, EnTenantScope } from '@types';
import { FormDisplay } from '@features/form/ui/form-display';
import { formUtils } from '@entities/form-utils';
import { createColumnHelper } from '@tanstack/react-table';
import { useFetchRole } from '@entities/role/service/role-manage.hook';
import { MyRoleExtendModal } from '@features/user/my-page/ui/my-role-extend-modal';

export const Route = createFileRoute('/_layout/my-page/role/detail')({
  component: RouteComponent,
  ...pageRouteConfig({ meta: { title: '나의 권한' } }),
});

function RouteComponent() {
  const { state } = useCurrentRoute(Route);

  const { confirm, alert, open: openModal } = useModal();
  const { provider: sProvider, getValues } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const { provider, fetchData, onSubmit, onFormChange, clearFormError, control } =
    useDynamicForm(formConfig);

  const { data: roleData } = useFetchRole(state?.roleId);

  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  console.log('### roleData', roleData);

  const handleSubmit = (data: any) => {
    console.log('### handleSubmit :', data);
  };

  useEffect(() => {
    if (state?.roleId) return;
    // console.log('### state', state);
    // throw new Error('state not set');
  }, [state]);

  useEffect(() => {
    if (roleData) {
      //   {
      //     "roleData.roleId": 1,
      //     "roleData.siteScope": "BO",
      //     "roleData.roleType": "PLATFORM_MANAGER",
      //     "roleData.parentRoleId": null,
      //     "roleData.sortOrder": 1,
      //     "roleData.name": "플랫폼 담당자",
      //     "roleData.description": "플랫폼 담당자",
      //     "roleData.tenantScope": "ALL",
      //     "roleData.tenantId": 1,
      //     "roleData.companyScope": "ALL",
      //     "roleData.companies": [],
      //     "roleData.channelScope": "ALL",
      //     "roleData.channels": [],
      //     "roleData.deptScope": "ALL",
      //     "roleData.depts": [],
      //     "roleData.isUsed": true,
      //     "roleData.createdBy": "anonymousUser",
      //     "roleData.createdDate": "2025-05-02T17:37:20.608Z",
      //     "roleData.lastModifiedBy": "anonymousUser",
      //     "roleData.modifiedDate": "2025-05-02T17:37:20.608Z"
      // },
      // roleData.roleId
      // roleData.siteScope
      // roleData.roleType
      // roleData.parentRoleId
      // roleData.sortOrder
      // roleData.name
      // roleData.description
      // roleData.tenantScope
      // roleData.tenantId
      // roleData.companyScope
      // roleData.companies
      // roleData.channelScope
      // roleData.channels
      // roleData.deptScope
      // roleData.depts
      // roleData.isUsed
      // roleData.createdBy
      // roleData.createdDate
      // roleData.lastModifiedBy
      // roleData.modifiedDate
      // onFormChange({
      //   roleId: roleData.roleId,
      //   roleCd: '',
      //   roleName: roleData.name,
      //   roleDescription: roleData.description,
      //   tenantScope: roleData.tenantScope,
      //   companyScope: roleData.companyScope,
      //   companies: roleData.companies,
      //   deptScope: roleData.deptScope,
      //   depts: roleData.depts,
      //   channelScope: roleData.channelScope,
      //   channels: roleData.channels,
      // });
    }
  }, [roleData]);

  console.log('selectedRow', selectedRow);
  /**
   * @param data
   */
  const handleOnSearch = (data: any) => {
    console.log('handleOnSearch:: ', data);
  };

  const handleCellClick = useCallback(
    (data: any) => {
      console.log('data', data);
      openModal({
        content: <MyRoleExtendModal data={selectedRow} type="view" />,
        width: 'md',
      });
    },
    [openModal],
  );

  const gridColumns = useMemo(() => createGridColumns(handleCellClick), [handleCellClick]);

  return (
    <PageContainer>
      <ContentsButtons>
        <Link to="/my-page/role">
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
          onRowSelect={(row: any) => {
            setSelectedRow(row);
          }}
          config={gConfig}
        />
        <form style={{ marginTop: 20 }} onSubmit={onSubmit(handleSubmit)}>
          <Button type="submit" variant="point" size="sm">
            테스트
          </Button>
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
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'date'}
              element={<DatePicker displayType="from-to" />}
            />
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
        name: 'requestStatus',
        type: 'dropdown',
        label: t('신청상태'),
        value: '',
        options: [
          { value: '', label: t('전체') },
          { value: '승인', label: t('승인') },
          { value: '반려', label: t('반려') },
        ],
      },
      {
        name: 'requestDate',
        type: 'date-range',
        label: t('신청일'),
        value: {
          from: formUtils.nowDate({ unit: 'day', offset: -30 }),
          to: formUtils.nowDate(),
        },
      },
    ],
  ],
};

const gridConfig = {
  query: '',
  columns: [],

  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
  data: [],
  // data: [
  //   {
  //     id: 1,
  //     role: '태넌트 관리자',
  //     rolePeriod: '2025-10-10 ~ 2025-11-10',
  //     approveStatus: '승인',
  //     createDate: '2025-10-10',
  //     approveDate: '2025-10-10',
  //     approveUser: '김현대',
  //   },
  //   {
  //     id: 2,
  //     role: '채널 관리자',
  //     rolePeriod: '2025-10-10 ~ 2025-11-10',
  //     approveStatus: '반려',
  //     createDate: '2025-10-10',
  //     approveDate: '2025-10-10',
  //     approveUser: '김현대',
  //   },
  // ],
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
    },
    // 테넌트
    {
      name: 'tenantScope',
      type: 'radio-group',
      label: t('테넌트 접근 범위'),
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
    size: 248,
  }),
  columnHelper.accessor('rolePeriod', {
    header: t('권한 기간'),
    size: 248,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('approveStatus', {
    header: t('신청 상태'),
    size: 248,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('approveInfo', {
    cell: (info) => {
      return (
        <Button variant="gray2" size="xs" onClick={() => onCellClick(info.row.original)}>
          {t('진행 현황')}
        </Button>
      );
    },
    header: t('신청 현황'),
    size: 104,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('createDate', {
    header: t('신청일'),
    size: 248,
    meta: {
      cellAlign: 'center',
    },
  }),
  columnHelper.accessor('approveUser', {
    header: t('결재자'),
    size: 104,
  }),
  columnHelper.accessor('approveDate', {
    header: t('결재일'),
    size: 248,
    meta: {
      cellAlign: 'center',
    },
  }),
];
