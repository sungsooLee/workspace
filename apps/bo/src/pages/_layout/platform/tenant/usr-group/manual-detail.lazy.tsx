import { useEffect, useRef, useState } from 'react';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  FormSubTitle,
  GridBox,
  Input,
  useGridBox,
} from '@learnway/ui';
import {
  CODE_GROUP,
  DynamicFormConfig,
  SearchBoxConfig,
  useDynamicForm,
  useSearchBox,
} from '@learnway/hooks';

import {
  ChannelListChoiceModal,
  ContentsButtons,
  FormRow,
  GridExcelUploadButton,
  LinkBox,
  MainContents,
  PageContainer,
  UserChoiceModal,
} from '@shared/ui';
import { SearchBox } from '@shared/ui/search-box';
import { useFetchUserGroupDetail } from '@entities/user-group';
import { FormDisplay } from '@features/form';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { queryOptions } from '@entities/user-group/service/user-group.queries';
import { Tenant } from '@learnway/auth/types';

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

  const formRef = useRef<HTMLFormElement>(null);

  const { data: loginUser } = useFetchAuthUser();
  // 상세
  const { data: userGroupData, refetch } = useFetchUserGroupDetail(
    routerState.location.state?.userGroupId,
  );

  const [tenantInfo, setTenantInfo] = useState<Tenant>();

  const {
    provider: searchManualProvider,
    getValues: getManualValues,
    onFormChange: manualFormChange,
    onFormValid: manualFormValid,
    setValue: setManualValue,
  } = useSearchBox(searchManualConfig());
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
    setValue,
  } = useDynamicForm(formConfig);

  const handleListButtonClick = () => {
    const listParam = routerState.location.state?.listParam;

    router.navigate({
      to: '/platform/tenant/usr-group/manual',
      state: { listParam },
    });
  };

  const handleResetButtonClick = () => {
    onFormChange();
  };

  const handleModifyButtonClick = async () => {
    const form = formRef.current;
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const handleOnSubmit = async (formData: any) => {
    console.log('data {} => ', formData);
    console.log('userList {} => ', getManualValues());
    const payload = {
      userGroupOriginType: formData.userGroupOriginType,
      userGroupOriginMappingId:
        formData.userGroupOriginType === 'PERSONAL'
          ? formData.personName[0].uuid
          : formData.channelName[0].channelUuid,
      userGroupName: formData.userGroupName,
      tenantId: tenantInfo?.tenantId,
      isUsed: formData.isUsed,
      assignmentType: formData.assignmentType,
      userList: '유저목록',
    };
    console.log('payload {} => ', payload);
  };

  const handleOnSearchManual = (searchData: any) => {
    console.log('search', searchData);
    gridManualFetch(searchData);
  };

  useEffect(() => {
    if (userGroupData) {
      console.log('#### userGroupData {} => ', userGroupData);

      updateFormData({ ...userGroupData });
    }
  }, [userGroupData]);

  useEffect(() => {
    console.log('### loginUser', loginUser);
    if (loginUser) {
      setTenantInfo(loginUser.activeTenant);
      setValue('tenantName', loginUser.activeTenant?.tenantName);
    }
  }, [loginUser]);

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
        <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
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

          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'userGroupOriginType', value: 'CHANNEL' }]}
          >
            <ContentsRow>
              <FormRow
                provider={provider}
                name="channelName"
                element={
                  <ChipListModalSelectorFormField
                    modalConfig={{
                      content: <ChannelListChoiceModal />,
                      title: '',
                      width: 'xl',
                    }}
                    chipList={{
                      labelField: 'channelName',
                      valueField: 'channelUuid',
                      hideBorder: true,
                    }}
                    selectOnlyOne={true}
                  />
                }
              />
            </ContentsRow>
          </FormDisplay>
          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'userGroupOriginType', value: 'PERSONAL' }]}
          >
            <ContentsRow>
              <FormRow
                provider={provider}
                name="personName"
                element={
                  <ChipListModalSelectorFormField
                    modalConfig={{
                      content: <UserChoiceModal />,
                      title: '',
                      width: 'xl',
                    }}
                    chipList={{
                      labelField: 'name',
                      valueField: 'uuid',
                      hideBorder: true,
                    }}
                    selectOnlyOne={true}
                  />
                }
              />
            </ContentsRow>
          </FormDisplay>

          <FormSubTitle label={t('유저그룹 대상자 정보')} lineType="dark" />
          <ContentsRow>
            <FormRow provider={provider} name={'assignmentType'} />
          </ContentsRow>
        </form>
      </MainContents>
      <MainContents>
        <SearchBox provider={searchManualProvider} onSearch={handleOnSearchManual} />
        <GridBox
          showAdd
          showRemove
          excelButtons={
            userGroupData &&
            userGroupData.assignmentType === 'DIRECT_USER_BASED' && <GridExcelUploadButton />
          }
          config={gManualConfig}
          columns={manualColumns}
        />
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
      value: 'TENANT',
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
      name: 'channelName',
      type: 'custom',
      label: t('채널'),
      format: 'array',
      value: [],
    },
    {
      name: 'personName',
      type: 'custom',
      label: t('개인'),
      format: 'array',
      value: [],
    },
    {
      name: 'assignmentType',
      type: 'radio-group',
      label: t('유저그룹 대상자 설정'),
      value: 'USER_GROUP_BASED',
      options: [
        { label: t('유저그룹 설정'), value: 'USER_GROUP_BASED' },
        { label: t('직접 설정'), value: 'DIRECT_USER_BASED' },
      ],
      guideText: t('선택한 1개의 방식만 유저그룹 대상자로 설정됩니다.'),
    },
  ],
  validator: {
    userGroupName: {
      format: 'string',
      required: true,
      conditions: [
        {
          fn: (values) => {
            const fieldValue = values.userGroupName.fieldValue;
            if (fieldValue === '') return true;
            return false;
          },
          message: t('LABEL.form.validation.needInput', { code: t('유저그룹명') }),
        },
      ],
    },
    assignmentType: {
      format: 'string',
      required: true,
    },
    channelName: {
      required: (values) => values.userGroupOriginType === 'CHANNEL',
    },
    personName: {
      required: (values) => values.userGroupOriginType === 'PERSONAL',
    },
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
        name: 'userName',
        type: 'text',
        label: t('이름'),
        value: '',
      },
    ],
  ],
});

const gridManualConfig = {
  title: '유저그룹 설정 목록',
  query: queryOptions.userGroupSubDirectoryList,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const columnHelper = createColumnHelper<any>();
const manualColumns = [
  columnHelper.accessor('companyName', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    size: 152,
  }),
  columnHelper.accessor('deptName', {
    cell: (info) => info.getValue(),
    header: t('소속'),
    size: 200,
  }),
  columnHelper.accessor('employeeNumber', {
    cell: (info) => info.getValue(),
    header: t('사번'),
    size: 120,
  }),
  columnHelper.accessor('userName', {
    header: t('이름'),
    size: 104,
  }),
  columnHelper.accessor('userStatus', {
    cell: (info: any) => {
      switch (info.getValue()) {
        case 'ACTIVE':
          return t('재직');
        case 'SUSPENDED':
          return t('정직');
        default:
          return t('휴직');
      }
    },
    header: t('제직여부'),
    meta: {
      cellAlign: 'center',
    },
    size: 152,
  }),
  columnHelper.accessor('accountStatus', {
    cell: (info: any) => {
      switch (info.getValue()) {
        case 'NORMAL':
          return t('정상');
        case 'WAIT':
          return t('대기');
        case 'DORMANT':
          return t('휴면');
        default:
          return t('잠김');
      }
    },
    header: t('계정상태'),
    meta: {
      cellAlign: 'center',
    },
    size: 104,
  }),
] as ColumnDef<any, unknown>[];
