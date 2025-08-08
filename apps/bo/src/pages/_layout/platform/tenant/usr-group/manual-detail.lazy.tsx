import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper, Table } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import {
  CODE_GROUP,
  DynamicFormConfig,
  SearchBoxConfig,
  useDynamicForm,
  useSearchBox,
} from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { Checkbox } from '@learnway/ui/checkbox';
import { ContentsRow } from '@learnway/ui/contents-row';
import { ChipListModalSelectorFormField } from '@learnway/ui/form-field';
import { GridBox, useGridBox } from '@learnway/ui/grid';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';

import {
  useCreateUserGroupManual, useDeleteUserGroupManual,
  useFetchUserGroupDetail,
  useUpdateUserGroupManual,
} from '@entities/user-group';
import { queryOptions } from '@entities/user-group/service/user-group.queries';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { Tenant } from '@learnway/auth/types';
import { FormDisplay, FormRow } from '@shared/ui/form';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui/layout';
import {
  ChannelListChoiceModal,
  UserChoiceModal,
  UserGroupOrganizationShuttleModal,
} from '@shared/ui/modal';
import { SearchBox } from '@shared/ui/search-box';
import { useWatch } from 'react-hook-form';
import { useToast } from '@learnway/ui/toast';

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

  const { openModal, confirm: openConfirm, } = useModal();
  const { open: openToast } = useToast();
  const [tenantInfo, setTenantInfo] = useState<Tenant>();
  const [modalUserGroups, setModalUserGroups] = useState<any>(null);
  const [tableInstance, setTableInstance] = useState<Table<any>>();
  const [userGroupSettings, setUserGroupSettings] = useState<any>();
  const [assignmentTypeOptions, setAssignmentTypeOptions] = useState<any>();

  const { create } = useCreateUserGroupManual({
    onSuccess: async () => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      router.navigate({ to: '/platform/tenant/usr-group/manual' });
    },
  });
  const { update } = useUpdateUserGroupManual({
    onSuccess: () => {
      openToast({ title: t('저장 하였습니다.'), type: 'success' });
      refetch();
    },
  });
  const { delete:deleteUserGroup } = useDeleteUserGroupManual({
    onSuccess: () => {
      openToast({ title: t('삭제 되었습니다.'), type: 'success' });
      router.navigate({ to: '/platform/tenant/usr-group/manual' });
    }
  })

  const {
    provider: searchManualProvider,
    getValues: getManualValues,
    onFormChange: manualFormChange,
    onFormValid: manualFormValid,
    setValue: setManualValue,
    formState: manualFormState,
  } = useSearchBox(searchManualConfig());
  const {
    config: gManualConfig,
    gridFetch: gridManualFetch,
    data: gridManualData,
  } = useGridBox(gridManualConfig, getManualValues);

  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    setFormError,
    clearFormError,
    getValues,
    setValue,
    formState,
  } = useDynamicForm(formConfig());
  const assignmentTypeWatch = useWatch({ control: provider.control, name: 'assignmentType' });

  const handleListButtonClick = () => {
    const listParam = routerState.location.state?.listParam;

    router.navigate({
      to: '/platform/tenant/usr-group/manual',
      state: { listParam },
    });
  };

  const handleRemoveButtonClick = async () => {
    if (await openConfirm(t('삭제 하시겠습니까?'))) {
      if( routerState.location.state )
        deleteUserGroup(routerState.location.state.userGroupId);
    }
  }

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
    const payload = {
      userGroupId: routerState.location.state?.userGroupId,
      userGroupOriginType: formData.userGroupOriginType,
      userGroupOriginMappingId: null,
      userGroupName: formData.userGroupName,
      tenantId: tenantInfo?.tenantId,
      isUsed: formData.isUsed,
      assignmentType: formData.assignmentType,
      userList: [] as any,
    };
    if (formData.userGroupOriginType !== 'TENANT') {
      payload.userGroupOriginMappingId =
        formData.userGroupOriginType === 'PERSONAL'
          ? formData.personName[0].uuid
          : formData.channelName[0].channelUuid;
    }

    if (userGroupData) {
      if (!userGroupSettings || userGroupSettings.length === 0) {
        openConfirm({
          title: t('유저그룹 대상자를 설정해 주세요.'),
          content: t('유저그룹 대상자는 최소 1명 이상 대상자가 있어야 등록이 가능합니다.'),
          type: 'complete',
          isConfirm: false
        });
        return false;
      }
      payload.userList = userGroupSettings.map((row: any) => {
        return { userUuid: row.userUuid, userName: row.userName };
      });
      console.log('payload {} => ', payload);
      if (await openConfirm(t('저장 하시겠습니까?'))) {
        update(payload);
      }
    } else {
      const tableRow = gridManualData.content;
      if (!tableRow || tableRow.length === 0) {
        openConfirm({
          title: t('유저그룹 대상자를 설정해 주세요.'),
          content: t('유저그룹 대상자는 최소 1명 이상 대상자가 있어야 등록이 가능합니다.'),
          type: 'complete',
          isConfirm: false
        });
        return false;
      }
      payload.userList = tableRow.map((row: any) => {
        return { userUuid: row.userUuid };
      });

      console.log('payload {} => ', payload);
      if (await openConfirm(t('저장 하시겠습니까?'))) {
        create(payload);
      }
    }
  };

  // 유저 그룹 설정 목록에서 추가된 데이터 기반으로 검색하는 기능
  const handleOnSearchManual = (searchData: any) => {
    if (modalUserGroups) {
      searchData = { ...searchData, groups: [{ combiners: modalUserGroups }] };
      gridManualFetch(searchData);
    }
  };

  const openUserGroupModal = () => {
    if (tenantInfo) {
      openModal({
        width: 'xl',
        content: <UserGroupOrganizationShuttleModal tenantIds={[tenantInfo.tenantId]} />,
        onClose(data: any) {
          if (data) {
            console.log('Modal {} => ', data);
            const combiners = data
              .flatMap((g: any) => g.combiners)
              .map(({ combineName, ...rest }: any) => rest);
            const saveValues = getManualValues();
            saveValues['groups'] = [
              {
                combiners,
              },
            ];
            setModalUserGroups(combiners);
            gridManualFetch(saveValues);
          }
        },
      });
    }
  };

  const removeUserGroupData = () => {
    const tableRow = tableInstance?.getSelectedRowModel().rows;
    if (tableRow) {
      const userUuids = tableRow.map((row) => {
        console.log(row.original);
        return row.original.userUuid;
      });
      if (userGroupData) {
        const newUserGroupSettings = userGroupSettings.filter(
          (data: any) => !userUuids.includes(data.userUuid),
        );
        setUserGroupSettings(newUserGroupSettings);
      } else {
        if (gManualConfig.gridData?.content) {
          const newGridContent: any[] = gridManualData.content.filter(
            (data: any) => !userUuids.includes(data.userUuid),
          );
          gManualConfig.onDataChange(newGridContent);
        }
      }
    }
  };

  useEffect(() => {
    if (userGroupData) {
      console.log('#### userGroupData {} => ', userGroupData);

      setUserGroupSettings(userGroupData.userList);
      if (userGroupData.userGroupOriginType) {
        if (userGroupData.userGroupOriginType === 'CHANNEL') {
          updateFormData({
            ...userGroupData,
            channelName: [
              {
                channelUuid: userGroupData.userGroupOriginMappingId,
                channelName: userGroupData.originName,
              },
            ],
          });
        } else if (userGroupData.userGroupOriginType === 'PERSONAL') {
          updateFormData({
            ...userGroupData,
            personName: [
              {
                uuid: userGroupData.userGroupOriginMappingId,
                name: userGroupData.originName,
              },
            ],
          });
        } else {
          updateFormData({ ...userGroupData });
        }
      }
    }
  }, [userGroupData]);

  useEffect(() => {
    console.log('### loginUser', loginUser);
    if (loginUser) {
      setTenantInfo(loginUser.activeTenant);
      setValue('tenantName', loginUser.activeTenant?.tenantName);
    }
  }, [loginUser]);

  useEffect(() => {
    if (assignmentTypeWatch) {
      setAssignmentTypeOptions(assignmentTypeWatch);
    }
  }, [assignmentTypeWatch]);

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button onClick={handleListButtonClick} variant="point" size="sm">
            {t('목록')}
          </Button>
        </LinkBox>
        <Button onClick={handleRemoveButtonClick} variant="point" size="sm">
          {t('삭제')}
        </Button>
        <Button onClick={handleResetButtonClick} variant="point" size="sm">
          {t('초기화')}
        </Button>
        <Button variant="primary" size="sm" onClick={handleModifyButtonClick}>
          {t('저장')}
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
                      content: <ChannelListChoiceModal roleId={0} />,
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
          onAddClick={openUserGroupModal}
          showRemove
          onRemoveClick={removeUserGroupData}
          // excelButtons={ (assignmentTypeOptions === 'DIRECT_USER_BASED')
          //   && <GridExcelUploadButton onUpload={} />}
          multiple
          showColumnSettings={false}
          hideRowSelectionCheckBox={true}
          onTableInstanceChange={(table: Table<any>) => setTableInstance(table)}
          data={userGroupSettings}
          config={gManualConfig}
          columns={manualColumns()}
        />
      </MainContents>
    </PageContainer>
  );
}

const formConfig = (): DynamicFormConfig => ({
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
});

const searchManualConfig = (): SearchBoxConfig => ({
  builders: [
    [
      {
        name: 'companyId',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        format: 'object',
        presetOptionLabel: t('LABEL.form.label.select'),
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.company.companyId'],
        },
        dropdownConfig: {
          onchange: () => {
            return '';
          },
          isSearchable: true,
          placeholder: t('입력 또는 선택'),
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
  title: t('유저그룹 설정 목록'),
  query: queryOptions.blackwhiteUsers,
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const columnHelper = createColumnHelper<any>();
const manualColumns = () =>
  [
    columnHelper.accessor('select-check', {
      id: 'select-check',
      size: 32,
      maxSize: 32,
      minSize: 32,
      meta: {
        align: 'center',
        headerAlign: 'center',
        cellAlign: 'center',
      },
      enableSorting: false,
      header: ({ table }) => {
        return (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              onCheckedChange={(checked) => {
                table.toggleAllRowsSelected(!!checked);
              }}
            />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div style={{ width: '100%', textAlign: 'center', paddingRight: 0 }}>
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={() => {
                if (!row.getIsGrouped()) {
                  row.getToggleSelectedHandler();
                }
              }}
            />
          </div>
        );
      },
    }),
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
