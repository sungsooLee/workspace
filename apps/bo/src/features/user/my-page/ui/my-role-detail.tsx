import { useCallback, useEffect, useMemo } from 'react';
import { t } from 'i18next';
import { CellContext, createColumnHelper } from '@tanstack/react-table';
import { Link, useRouter } from '@tanstack/react-router';

import {
  CODE_GROUP,
  compactValues,
  DynamicFormConfig,
  SearchBoxConfig,
  useCurrentRoute,
  useDynamicForm,
  useSearchBox,
} from '@learnway/hooks';
import { cn, DATE_TIME_FORMAT, formatDate } from '@learnway/shared';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  FormSubTitle,
  GridBox,
  RadioGroupFormField,
  useGridBox,
  useModal,
} from '@learnway/ui';
import { useFetchRole } from '@entities/role/service/role-manage.hook';
import { roleManagerQueryOptions } from '@entities/role/service/role-manage.queries';
import { FormDisplay } from '@features/form/ui/form-display';
import { MyRoleExtendModal } from '@features/user/my-page/ui/my-role-extend-modal';
import {
  ContentsButtons,
  ContentsHistoryInfoFormField,
  FormRow,
  MainContents,
  PageContainer,
  SearchBox,
} from '@shared/ui';

import {
  EnChannelScope,
  EnCompanyScope,
  EnDeptScope,
  EnTenantScope,
  RoleApplication,
} from '@types';

import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css'; // form

const MyRoleDetailComponent = ({ route }: any) => {
  const { state } = useCurrentRoute();
  const router = useRouter();

  const { open: openModal } = useModal();
  const {
    provider: sProvider,
    getValues,
    onFormChange: onFormChangeSearchBox,
  } = useSearchBox(searchConfig);
  const { config: gConfig, gridFetch } = useGridBox(gridConfig, getValues);
  const { provider, onSubmit, onFormChange } = useDynamicForm(formConfig);

  const { data: roleData } = useFetchRole(state?.roleId);

  const handleSubmit = (data: any) => {
    console.log('### handleSubmit :', data);
  };

  useEffect(() => {
    if (state?.roleId) {
      onFormChangeSearchBox({ roleId: state?.roleId });
      gridFetch({ roleId: state?.roleId });
    } else {
      router.history.canGoBack() && router.history.back();
    }
  }, []);

  useEffect(() => {
    if (roleData) {
      onFormChange({
        roleId: roleData.roleId,
        roleCd: '',
        roleName: roleData.name,
        roleDescription: roleData.description,
        tenantScope: roleData.tenantScope,
        companyScope: roleData.companyScope,
        companies: roleData.companies?.map((company: any) => ({
          value: company.id,
          label: company.name,
        })),
        deptScope: roleData.deptScope,
        depts: roleData.depts?.map((dept: any) => ({ value: dept.id, label: dept.name })),
        channelScope: roleData.channelScope,
        channels: roleData.channels?.map((channel: any) => ({
          value: channel.uuid,
          label: channel.name,
        })),
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
            dependencies={[{ name: 'deptScope', value: EnDeptScope.MANUAL }]}
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
            condition={'or'}
            dependencies={[
              { name: 'channelScope', value: EnChannelScope.CURRENT_CHANNEL_INCLUSIVE },
              { name: 'channelScope', value: EnChannelScope.MANUAL },
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
          <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
            <ContentsHistoryInfoFormField />
          </ContentsRow>
        </form>
      </MainContents>
    </PageContainer>
  );
};

export const MyRoleDetail = MyRoleDetailComponent;

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
      {
        name: 'roleId',
        type: 'hidden',
        format: 'object',
        value: '',
      },
    ],
  ],
};

const gridConfig = {
  // query: '',
  query: roleManagerQueryOptions.getMyRoleApplications,
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
      readOnly: true,
    },
    {
      name: 'roleCd',
      type: 'text',
      label: t('역할코드'),
      value: '',
      readOnly: true,
    },
    {
      name: 'roleName',
      type: 'text',
      label: t('역할명'),
      value: '',
      readOnly: true,
    },
    {
      name: 'roleDescription',
      type: 'textarea',
      label: t('역할 설명'),
      value: '설명입니다',
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
      readOnly: true,
      value: [],
      chipListConfig: {
        showInput: false,
        labelField: 'label',
        valueField: 'value',
        wordwrap: true,
      },
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
    {
      name: 'depts',
      label: '',
      type: 'chip-list',
      value: [],
      readOnly: true,
      chipListConfig: {
        showInput: false,
        labelField: 'label',
        valueField: 'value',
        wordwrap: true,
      },
    },
    // 채널
    {
      name: 'channelScope',
      type: 'radio-group',
      label: t('채널 접근 범위'),
      disabled: true,
      value: EnChannelScope.ALL,
      optionsConfig: {
        codeGroup: CODE_GROUP['pms.role.ChannelScope'],
      },
    },
    {
      name: 'channels',
      type: 'chip-list',
      label: '',
      value: [],
      readOnly: true,
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
    cell: (info: CellContext<RoleApplication, any>) => {
      return `${info.row.original.role.name}`;
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
  columnHelper.accessor('approver', {
    header: t('결재자'),
    size: 104,
    cell: (info: CellContext<RoleApplication, any>) => {
      return info.row.original.approver ? `${info.row.original.approver.name}` : '';
    },
  }),
  columnHelper.accessor('approvedDate', {
    header: t('결재일'),
    size: 206,
    meta: {
      cellAlign: 'center',
    },
    cell: (info: CellContext<RoleApplication, any>) => {
      return info.row.original.approvedDate
        ? `${formatDate(info.row.original.approvedDate, DATE_TIME_FORMAT.DATETIME_MIN)}`
        : '';
    },
  }),
];
