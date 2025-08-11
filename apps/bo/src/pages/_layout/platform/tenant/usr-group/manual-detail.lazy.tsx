import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { Table } from '@tanstack/react-table';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';

import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

import { useDynamicForm2 } from '@learnway/hooks';
import { FormRow2, FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { Checkbox } from '@learnway/ui/checkbox';
import { ContentsRow } from '@learnway/ui/contents-row';
import { ChipListModalSelectorFormField, RadioGroupFormField } from '@learnway/ui/form-field';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { useModal } from '@learnway/ui/modal';

import {
  useCreateUserGroupManual, useDeleteUserGroupManual,
  useFetchUserGroupDetail,
  useUpdateUserGroupManual,
} from '@entities/user-group';
import { queryOptions } from '@entities/user-group/service/user-group.queries';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { Tenant } from '@learnway/auth/types';
import {
  ContentsHistoryInfoFormField,
  DropdownFormField,
  FormDisplay,
  InputFormField,
  SwitchFormField,
} from '@shared/ui/form';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui/layout';
import {
  ChannelListChoiceModal,
  UserChoiceModal,
  UserGroupOrganizationShuttleModal,
} from '@shared/ui/modal';
import { SearchBoxForm } from '@shared/ui/search-box';
import { useWatch } from 'react-hook-form';
import { useToast } from '@learnway/ui/toast';
import { EnFormMode } from '@shared/types';
import { cn } from '@learnway/shared';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { queryOptions as companysQueryOptions } from '@entities/companies';
import { useQueryClient } from '@tanstack/react-query';
import { useCreation } from 'ahooks';

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
  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement>(null);

  const { data: loginUser } = useFetchAuthUser();
  // 상세
  const { data: userGroupData, refetch } = useFetchUserGroupDetail(
    routerState.location.state?.userGroupId,
  );

  const { openModal, confirm: openConfirm, } = useModal();
  const { open: openToast } = useToast();
  const [tenantInfo, setTenantInfo] = useState<Tenant>();
  const [roleId, setRoleId] = useState<number>(0);
  const [companyOptions, setCompanyOptions] = useState<any[]>([]);
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
  const gridManualConfig = useCreation<useGridBoxConfig>(
    () => ({
      title: t('유저그룹 설정 목록'),
      query: queryOptions.blackwhiteUsers,
      columns: [
        {
          name: 'select-check',
          id: 'select-check',
          label: (info: any) => {
            return (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <Checkbox
                  checked={info.table.getIsAllRowsSelected()}
                  onCheckedChange={(checked) => {
                    info.table.toggleAllRowsSelected(!!checked);
                  }}
                />
              </div>
            );
          },
          render: (info: any) => {
            return (
              <div style={{ width: '100%', textAlign: 'center', paddingRight: 0 }}>
                <Checkbox
                  checked={info.row.getIsSelected()}
                  onCheckedChange={() => {
                    if (!info.row.getIsGrouped()) {
                      info.row.getToggleSelectedHandler();
                    }
                  }}
                />
              </div>
            );
          },
          size: 32,
          maxSize: 32,
          minSize: 32,
          meta: {
            align: 'center',
            headerAlign: 'center',
            cellAlign: 'center',
          },
          enableSorting: false,
        },
        {
          name: 'companyName',
          label: t('회사'),
          size: 152
        },
        {
          name: 'deptName',
          label: t('소속'),
          size: 200
        },
        {
          name: 'employeeNumber',
          label: t('사번'),
          size: 120
        },
        {
          name: 'userName',
          label: t('이름'),
          size: 104
        },
        {
          name: 'userState',
          label: t('재직여부'),
          render: (info: any) => {
            switch (info.getValue()) {
              case 'ACTIVE':
                return t('재직');
              case 'SUSPENDED':
                return t('정직');
              default:
                return t('휴직');
            }
          },
          meta: {
            cellAlign: 'center',
          },
          size: 152
        },
        {
          name: 'accountStatus',
          label: t('계정상태'),
          render: (info: any) => {
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
          meta: {
            cellAlign: 'center',
          },
          size: 104
        },
      ],
      data: [],
      gridState: {
        page: 0,
        size: 10,
        sort: [],
      }
    }),
    []
  );

  const {
    provider: searchManualProvider,
    getValues: getManualValues,
    onFormChange: manualFormChange,
    onSubmit: onManualSubmit,
  } = useDynamicForm2();
  const searchParams = () => {
    let data = getManualValues();
    if (modalUserGroups) {
      data = { ...data, groups: [{ combiners: modalUserGroups }] };
    }
    return data;
  }
  const {
    config: gManualConfig,
    gridFetch: gridManualFetch,
    data: gridManualData,
  } = useGridBox(gridManualConfig, searchParams);

  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    setValue,
  } = useDynamicForm2();
  const assignmentTypeWatch = useWatch({ control: provider.control, name: 'assignmentType' });


  // 유저 그룹 설정 목록에서 추가된 데이터 기반으로 검색하는 기능
  const handleOnSearchManual = () => {
    const payload = searchParams();
    gridManualFetch(payload);
  };

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
      if (!gridManualData || !gridManualData.content || gridManualData.content.length === 0) {
        openConfirm({
          title: t('유저그룹 대상자를 설정해 주세요.'),
          content: t('유저그룹 대상자는 최소 1명 이상 대상자가 있어야 등록이 가능합니다.'),
          type: 'complete',
          isConfirm: false
        });
        return false;
      }
      payload.userList = gridManualData.content.map((row: any) => {
        return { userUuid: row.userUuid };
      });

      console.log('payload {} => ', payload);
      if (await openConfirm(t('저장 하시겠습니까?'))) {
        create(payload);
      }
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
      const combiners = [{
        combineType: "USER_GROUP",
        combineValue: userGroupData.userGroupId
      }];
      setModalUserGroups(combiners);
    }
  }, [userGroupData]);

  useEffect(() => {
    console.log('### loginUser', loginUser);
    if (loginUser) {
      setTenantInfo(loginUser.activeTenant);
      setRoleId(loginUser.activeRole!.roleId)
      setValue('tenantName', loginUser.activeTenant?.tenantName);
      (async () => {
        const companys = await queryClient.fetchQuery(
          companysQueryOptions.tenantCompany(loginUser.activeTenant?.tenantId),
        );

        const companyIdOptions = companys.map((item: any) => ({
          label: item.name,
          value: item.companyCode,
        }));
        setCompanyOptions([
          { value: '', label: t('LABEL.form.label.select') },
          ...companyIdOptions,
        ]);
      })();
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
        {
          routerState.location.state.mode === EnFormMode.VIEW &&
          <Button onClick={handleRemoveButtonClick} variant="point" size="sm">
            {t('삭제')}
          </Button>
        }
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
            <FormRow2
              provider={provider}
              name={'userGroupOriginType'}
              label={t('유저그룹 유형')}
              format="string"
              value={'TENANT'}
              element={
                <RadioGroupFormField
                  options={[
                    { label: t('테넌트 유저그룹'), value: 'TENANT' },
                    { label: t('채널 유저그룹'), value: 'CHANNEL' },
                    { label: t('개인 유저그룹'), value: 'PERSONAL' },
                  ]}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'tenantName'}
              label={t('테넌트')}
              format="string"
              type="text"
              value=""
              element={<InputFormField disabled={true} />}
            />
            <FormRow2
              provider={provider}
              name={'userGroupName'}
              label={t('유저그룹명')}
              format="string"
              type="text"
              placeholder={t('입력')}
              validation={{
                required: true,
                conditions: [
                  {
                    fn: (values: any) => {
                      console.log(values)
                      const fieldValue = values.userGroupName;
                      if (!fieldValue && fieldValue === '') return true;
                      return false;
                    },
                    message: t('LABEL.form.validation.needInput', { code: t('유저그룹명') }),
                  },
                ],
              }}
              element={<InputFormField />}
            />
            <FormRow2
              provider={provider}
              name={'isUsed'}
              label={t('사용 여부')}
              format="boolean"
              value={true}
              className={dynamicFormStyles.form_item_horizontal}
              switchConfig={{
                label: (value: boolean) => (value ? t('사용') : t('미사용')),
              }}
              guideText={t('사용 상태인 경우 유저그룹에서 조회할 수 있습니다.')}
              element={<SwitchFormField />}
            />
          </ContentsRow>

          <FormDisplay
            provider={provider}
            dependencies={[{ name: 'userGroupOriginType', value: 'CHANNEL' }]}
          >
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="channelName"
                label={t('채널')}
                format={'array'}
                validation={{
                  required: (values: any) => values.userGroupOriginType === 'CHANNEL'
                }}
                element={
                  <ChipListModalSelectorFormField
                    modalConfig={{
                      content: <ChannelListChoiceModal roleId={roleId} />,
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
              <FormRow2
                provider={provider}
                name="personName"
                label={t('개인')}
                format={'array'}
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
            <FormRow2
              provider={provider}
              name={'assignmentType'}
              label={t('유저그룹 대상자 설정')}
              format="string"
              value={'USER_GROUP_BASED'}
              guideText={t('선택한 1개의 방식만 유저그룹 대상자로 설정됩니다.')}
              validation={{
                required: true,
              }}
              element={
                <RadioGroupFormField
                  options={[
                    { label: t('유저그룹 설정'), value: 'USER_GROUP_BASED' },
                    { label: t('직접 설정'), value: 'DIRECT_USER_BASED' },
                  ]}
                />
              }
            />
          </ContentsRow>
        </form>
      </MainContents>
      <MainContents>
        <SearchBoxForm onSearch={onManualSubmit(handleOnSearchManual)} onReset={manualFormChange}>
          <ContentsRow>
            <FormRow2
              provider={searchManualProvider}
              name="companyCode"
              label={t('회사')}
              format="string"
              value=""
              element={<DropdownFormField options={companyOptions} />}
            />
            <FormRow2
              provider={searchManualProvider}
              name={'employeeNumber'}
              label={t('사번')}
              format="string"
              type="text"
              placeholder={t('입력')}
              element={<InputFormField />}
            />
            <FormRow2
              provider={searchManualProvider}
              name={'userName'}
              label={t('이름')}
              format="string"
              type="text"
              placeholder={t('입력')}
              element={<InputFormField />}
            />
          </ContentsRow>
        </SearchBoxForm>
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
        />
        <ContentsRow className={cn(formStyles.no_line, formStyles.space2)}>
          <ContentsHistoryInfoFormField provider={provider}/>
        </ContentsRow>
      </MainContents>
    </PageContainer>
  );
}

// const formConfig = (): DynamicFormConfig => ({
//   validator: {
//     channelName: {
//       required: (values) => values.userGroupOriginType === 'CHANNEL',
//     },
//     personName: {
//       required: (values) => values.userGroupOriginType === 'PERSONAL',
//     },
//   },
// });
