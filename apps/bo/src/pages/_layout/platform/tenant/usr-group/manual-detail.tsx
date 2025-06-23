import { useState, useEffect, useRef } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import { IcoUploadCloud } from '@learnway/icons';
import {
  Input,
  ContentsRow,
  Button,
  GridBox,
  useGridBox,
  ChipListModalSelectorFormField,
} from '@learnway/ui';
import {
  DynamicFormConfig,
  useDynamicForm,
  CODE_GROUP,
  useSearchBox,
  SearchBoxConfig,
} from '@learnway/hooks';

import { FormRow, FormSubTitle, SwitchFormField } from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';

import { FormDisplay } from '@features/form/ui/form-display';
import {
  ChannelChoiceModal,
  ChannelListChoiceModal,
  CompanyShuttleModal,
  GridExcelUploadButton,
  UserGroupChoiceModal,
} from '@features/shared';

import { EnTenantDetailTabKey } from '@types';

export const Route = createFileRoute('/_layout/platform/tenant/usr-group/manual-detail')({
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

  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnTenantDetailTabKey.base);

  const { provider: searchMenualProvider, getValues: getMenualValues } =
    useSearchBox(searchMenualConfig);
  const { config: gMenualConfig, gridFetch: gridMenualFetch } = useGridBox(
    gridMenualConfig,
    getMenualValues,
  );
  const { provider: searchExceptionProvider, getValues: getExceptionValues } =
    useSearchBox(searchExceptionConfig);
  const { config: gExceptionConfig, gridFetch: gridExceptionFetch } = useGridBox(
    gridExceptionConfig,
    getExceptionValues,
  );

  const { provider, fetchData, onSubmit, onFormChange, setFormError, clearFormError, getValues } =
    useDynamicForm(formConfig);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };
  // if (!routerState.location.state.tenantId) {
  //   router.navigate({ to: '/platform/tenant/management', state: { listParam: {} } });
  // }
  const handleListButtonClick = () => {
    const listParam = routerState.location.state?.listParam;

    router.navigate({
      to: '/platform/tenant/usr-group/manual',
      state: { listParam: listParam },
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
  const handleOnSearchMenual = (searchData: any) => {
    console.log('search', searchData);
  };

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
            <FormRow provider={provider} name={'c1'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'c2'} element={<Input disabled={true} />} />
            <FormRow provider={provider} name={'c3'} />
            <FormRow
              provider={provider}
              name={'c4'}
              className={dynamicFormStyles.form_item_horizontal}
            />
          </ContentsRow>
          <FormSubTitle label={t('유저그룹 대상자 정보')} lineType="dark" />
          <ContentsRow>
            <FormRow provider={provider} name={'c5'} />
          </ContentsRow>
          <FormDisplay provider={provider} dependencies={[{ name: 'c5', value: true }]}>
            <ContentsRow>
              <FormRow
                provider={provider}
                name="c6"
                element={
                  <ChipListModalSelectorFormField
                    modalConfig={{
                      content: <UserGroupChoiceModal />,
                      title: '',
                      width: 'xl',
                    }}
                    chipList={{
                      labelField: 'name',
                      valueField: 'companyId',
                      wordwrap: true,
                    }}
                  />
                }
              />
            </ContentsRow>
          </FormDisplay>
          <FormDisplay provider={provider} dependencies={[{ name: 'c5', value: false }]}>
            <SearchBox provider={searchMenualProvider} onSearch={handleOnSearchMenual} />
            <GridBox
              showAdd
              showRemove
              excelButtons={<GridExcelUploadButton />}
              config={gMenualConfig}
              columns={menualColumns}
            />
          </FormDisplay>
          {/**유저그룹 대상자 제외 */}
          <ContentsRow>
            <FormRow provider={provider} name={'c7'} />
          </ContentsRow>
          <SearchBox provider={searchExceptionProvider} onSearch={handleOnSearchMenual} />
          <GridBox
            showAdd
            showRemove
            excelButtons={<GridExcelUploadButton />}
            config={gExceptionConfig}
            columns={exceptionColumns}
          />
        </form>
      </MainContents>
    </PageContainer>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'c1',
      type: 'radio-group',
      label: t('유저그룹 유형'),
      value: 'tenant',
      options: [
        { label: t('테넌트 유저그룹'), value: 'tenant' },
        { label: t('채널 유저그룹'), value: 'channel' },
        { label: t('개인별 유저그룹'), value: 'manual' },
      ],
    },
    {
      name: 'c2',
      type: 'text',
      label: t('테넌트'),
      value: '테넌트1',
    },
    {
      name: 'c3',
      type: 'text',
      label: t('유저그룹명'),
      value: '',
    },
    {
      name: 'c4',
      type: 'switch',
      label: t('유저그룹명'),
      value: true,
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
      guideText: t('사용상태인 경우 유저그룹에서 조회 할 수 있습니다.'),
    },
    {
      name: 'c5',
      type: 'radio-group',
      label: t('유저그룹 대상자 설정'),
      value: true,
      options: [
        { label: t('유저그룹 설정'), value: true },
        { label: t('직접 설정'), value: false },
      ],
      guideText: t('선택한 1개의 방식만 유저그룹 대상자로 설정됩니다.'),
    },
    {
      name: 'c6',
      type: 'radio-group',
      label: t('유저그룹 대상자 설정'),
      format: 'array',
      value: [],
    },
    {
      name: 'c7',
      type: 'custom',
      label: t('유저그룹 대상자 제외'),
      format: 'array',
      value: [],
      guideText: t('선택한 사용자는 해당 유저그룹대상자에서 제외 합니다.'),
    },
  ],
  validator: {
    c3: true,
    c5: true,
    c6: true,
  },
};

const searchMenualConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'companyCode',
        type: 'dropdown',
        label: t('회사'),
        value: '',
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
        name: 'companyName',
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
};

const searchExceptionConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'companyCode',
        type: 'dropdown',
        label: t('회사'),
        value: '',
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
        name: 'companyName',
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
};

const gridMenualConfig = {
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
const menualColumns = [
  columnHelper.accessor('tenantName', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 152,
  }),
  columnHelper.accessor('tenantSite', {
    cell: (info) => info.getValue(),
    header: t('실'),
    size: 240,
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

const gridExceptionConfig = {
  query: '',
  columns: [],
  data: [],

  pagination: {
    pageSize: 20,
    pageIndex: 0,
    totalRows: 0,
  },
};

const exceptionColumns = [
  columnHelper.accessor('tenantName', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 152,
  }),
  columnHelper.accessor('tenantSite', {
    cell: (info) => info.getValue(),
    header: t('실'),
    size: 240,
  }),

  columnHelper.accessor('companyTenantList', {
    id: 'companyTenantList',
    cell: (info) => info.getValue(),
    header: t('소속'),
    size: 200,
  }),
  columnHelper.accessor('tenantRoleList', {
    id: 'tenantRoleList',
    cell: (info) => info.getValue(),
    header: t('사번'),
    size: 120,
  }),
  columnHelper.accessor('createdBy', {
    id: 'createdBy',
    header: t('이름'),
    size: 104,
  }),
  columnHelper.accessor('createdDate', {
    id: 'createdDate',
    cell: (info) => info.getValue(),
    header: t('제직여부'),
    size: 152,
  }),
  columnHelper.accessor('isUsed', {
    id: 'isUsed',
    cell: (info) => {
      return info.row.original.isUsed ? t('사용') : t('미사용');
    },
    header: t('계정상태'),
    size: 104,
  }),
] as ColumnDef<any, unknown>[];
