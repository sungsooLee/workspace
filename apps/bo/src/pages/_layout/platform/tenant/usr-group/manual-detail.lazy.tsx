import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect } from 'react';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import {
  CODE_GROUP,
  DynamicFormConfig,
  SearchBoxConfig,
  useDynamicForm,
  useSearchBox,
} from '@learnway/hooks';
import { Button, ContentsRow, FormSubTitle, GridBox, Input, useGridBox } from '@learnway/ui';

import { ContentsButtons, FormRow, LinkBox } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';

import { GridExcelUploadButton } from '@shared/ui';

import { useFetchUserGroupDetail } from '@entities/user-group';
import { MainContents, PageContainer } from '@shared/ui';

export const Route = createLazyFileRoute('/_layout/platform/tenant/usr-group/manual-detail')({
  component: RouteComponent,
});

/**
 * 화면 번호: NLP_BO_PMS_2001 (유저그룹수동등록 등록/상세)
 *
 * @returns
 */
function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const { data: userGroupData, refetch } = useFetchUserGroupDetail(
    routerState.location.state?.userGroupId,
  );

  const { provider: searchManualProvider, getValues: getManualValues } =
    useSearchBox(searchManualConfig());
  const { config: gManualConfig, gridFetch: gridManualFetch } = useGridBox(
    gridManualConfig,
    getManualValues,
  );

  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    setFormError,
    clearFormError,
    getValues,
  } = useDynamicForm(formConfig);

  const handleListButtonClick = () => {
    const listParam = routerState.location.state?.listParam;

    router.navigate({
      to: '/platform/tenant/usr-group/manual',
      state: { listParam },
    });
  };

  const handleResetButtonClick = () => {
    console.log('reset');
  };
  const handleModifyButtonClick = () => {
    console.log('save');
  };
  const handleOnSubmit = (formData: any) => {
    console.log('save', formData);
  };
  const handleOnSearchManual = (searchData: any) => {
    console.log('search', searchData);
  };

  useEffect(() => {
    if (userGroupData) {
      console.log('#### userGroupData {} => ', userGroupData);

      updateFormData({ ...userGroupData });
    }
  }, [userGroupData]);

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button onClick={handleListButtonClick} variant="point" size="sm">
            목록
          </Button>
        </LinkBox>

        <Button onClick={handleResetButtonClick} variant="point" size="sm">
          초기화
        </Button>
        <Button variant="primary" size="sm" onClick={handleModifyButtonClick}>
          저장
        </Button>
      </ContentsButtons>
      <MainContents>
        <form onSubmit={onSubmit(handleOnSubmit)}>
          <FormSubTitle label={t('유저그룹 기본 정보')} lineType="dark" />
          <ContentsRow>
            <FormRow provider={provider} name={'userGroupOriginType'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'tenantName'} element={<Input disabled={true} />} />
            <FormRow provider={provider} name={'userGroupName'} />
            <FormRow
              provider={provider}
              name={'isUsed'}
              className={dynamicFormStyles.form_item_horizontal}
            />
          </ContentsRow>
          <FormSubTitle label={t('유저그룹 대상자 정보')} lineType="dark" />
          <ContentsRow>
            <FormRow provider={provider} name={'assignmentType'} />
          </ContentsRow>
          <SearchBox provider={searchManualProvider} onSearch={handleOnSearchManual} />
          <GridBox
            showAdd
            showRemove
            excelButtons={<GridExcelUploadButton />}
            config={gManualConfig}
            columns={manualColumns}
          />
        </form>
      </MainContents>
    </PageContainer>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'userGroupOriginType',
      type: 'radio-group',
      label: t('유저그룹 유형'),
      value: 'tenant',
      options: [
        { label: t('테넌트 유저그룹'), value: 'TENANT' },
        { label: t('채널 유저그룹'), value: 'CHANNEL' },
        { label: t('개인 유저그룹'), value: 'PERSONAL' },
      ],
    },
    {
      name: 'tenantName',
      type: 'text',
      label: t('테넌트'),
      value: '',
    },
    {
      name: 'userGroupName',
      type: 'text',
      label: t('유저그룹명'),
      value: '',
    },
    {
      name: 'isUsed',
      type: 'switch',
      label: t('사용 여부'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      guideText: t('사용상태인 경우 유저그룹에서 조회 할 수 있습니다.'),
    },
    {
      name: 'assignmentType',
      type: 'radio-group',
      label: t('유저그룹 대상자 설정'),
      value: '',
      options: [
        { label: t('유저그룹 설정'), value: 'USER_GROUP_BASED' },
        { label: t('직접 설정'), value: 'DIRECT_USER_BASED' },
      ],
      guideText: t('선택한 1개의 방식만 유저그룹 대상자로 설정됩니다.'),
    },
  ],
  validator: {
    c3: true,
    c5: true,
    c6: true,
  },
};

const searchManualConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'companyCode',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        format: 'object',
        presetOptionLabel: t('LABEL.form.label.select'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyCode'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: '입력 또는 선택',
        },
      },
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        value: '',
      },
      {
        name: 'tenantManagerName',
        type: 'text',
        label: t('이름'),
        value: '',
      },
    ],
  ],
});

const gridManualConfig = {
  query: '',
  columns: [],
  data: [],

  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
};

const columnHelper = createColumnHelper<any>();
const manualColumns = [
  columnHelper.accessor('tenantName', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 152,
  }),
  columnHelper.accessor('companyTenantList', {
    cell: (info) => info.getValue(),
    header: t('소속'),
    size: 200,
  }),
  columnHelper.accessor('tenantRoleList', {
    cell: (info) => info.getValue(),
    header: t('사번'),
    size: 120,
  }),
  columnHelper.accessor('createdBy', {
    header: t('이름'),
    size: 104,
  }),
  columnHelper.accessor('createdDate', {
    cell: (info) => info.getValue(),
    header: t('제직여부'),
    size: 152,
  }),
  columnHelper.accessor('isUsed', {
    cell: (info) => {
      return info.row.original.isUsed ? t('사용') : t('미사용');
    },
    header: t('계정상태'),
    size: 104,
  }),
] as ColumnDef<any, unknown>[];
