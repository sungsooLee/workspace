import { useGetChannelDetail } from '@entities/channel/service/channel.hook';
import { FormDisplay, InputFormField } from '@features/form';
import { DynamicFormConfig, SearchBoxConfig, useDynamicForm, useSearchBox } from '@learnway/hooks';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { ContentsRow, FormSubTitle, GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui';
import { ChipListFormField, FormRow, SearchBox } from '@shared/ui';
import { useRouterState } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { EnFormMode } from '@types';
import { t } from 'i18next';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

interface ChannelDetailUserGroupDetailProps {
  mode: EnFormMode;
  userGroupId?: number;
}

const ChannelDetailUserGroupDetailComponent = (
  props: ChannelDetailUserGroupDetailProps,
  ref: any,
) => {
  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;

  const { data: channelData } = useGetChannelDetail(channelUuid);

  const { provider, onSubmit, onFormChange, getValues, updateFormData } =
    useDynamicForm(formConfig());

  const { provider: excludeUserSearchProvider, getValues: getValuesForExcludeUser } =
    useSearchBox(searchConfig);

  const { config: userGridConfig, gridFetch: gridFetchForUser } = useGridBox(gridConfig);
  const { config: excludeUserGridConfig, gridFetch: gridFetchForExcludeUser } = useGridBox(
    gridConfig,
    getValuesForExcludeUser,
  );

  useEffect(() => {
    if (channelData) {
      if (props.mode === EnFormMode.ADD) {
        const initialData = {
          userGroupOriginType: 'CHANNEL',
          tenantName: channelData.mainTenantInfo.tenantName,
          userGroupName: '',
          isUsed: true,
          channelList: [{ ...channelData }],
          userGroupSetting: 'USER_GROUP',
        };
        updateFormData(initialData);
      } else if (props.mode === EnFormMode.VIEW) {
        const initialData = {
          userGroupOriginType: 'CHANNEL',
          tenantName: channelData.mainTenantInfo.tenantName,
          userGroupName: '',
          isUsed: true,
          channelList: [{ ...channelData }],
          userGroupSetting: 'USER_GROUP',
        };
        updateFormData(initialData);
      }
    }
  }, [channelData, props, getValues]);

  const handleOnSearchForExcludeUser = useCallback((data: any) => {
    gridFetchForExcludeUser(data);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    saveData() {
      const form = formRef.current;
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    },
    clearForm() {
      onFormChange();
    },
  }));

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('유저그룹 기본 정보')} />
      <ContentsRow>
        <FormRow provider={provider} name={'userGroupOriginType'} />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'tenantName'}
          element={<InputFormField readOnly={true} />}
        />
        <FormRow provider={provider} name={'userGroupName'} />
        <FormRow
          provider={provider}
          name={'isUsed'}
          className={dynamicFormStyles.form_item_horizontal}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow
          provider={provider}
          name={'channelList'}
          element={
            <ChipListFormField
              chipListConfig={{
                labelField: 'channelName',
                valueField: 'channelUuid',
                hideBorder: true,
                isOptionHideCloseButton: (option: any) => true,
              }}
              disabled={true}
            />
          }
        />
      </ContentsRow>
      <FormSubTitle label={t('유저그룹 대상자 정보')} />
      <ContentsRow>
        <FormRow provider={provider} name={'userGroupSetting'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'userGroupSetting', value: 'USER_GROUP' }]}
      >
        <GridBox
          config={userGridConfig}
          columns={columns}
          multiple
          title={t('유저그룹 설정 목록')}
          disabledSelectionToggle
          showAdd
          showRemove
        />
      </FormDisplay>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'userGroupSetting', value: 'DIRECT' }]}
      >
        <SearchBox provider={excludeUserSearchProvider} onSearch={handleOnSearchForExcludeUser} />
        <GridBox
          config={excludeUserGridConfig}
          columns={columns}
          multiple
          title={t('유저그룹 대상자 제외 목록')}
          disabledSelectionToggle
          showAdd
          showRemove
        />
      </FormDisplay>
    </form>
  );
};

export const ChannelDetailUserGroupDetail = forwardRef(ChannelDetailUserGroupDetailComponent);

const formConfig = (): DynamicFormConfig => ({
  builders: [
    {
      name: 'userGroupOriginType',
      type: 'radio-group',
      label: t('유저그룹 유형'),
      value: 'CHANNEL',
      options: [{ label: t('채널 유저 그룹'), value: 'CHANNEL' }],
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
      placeholder: '',
      guideText: t('사용 상태인 경우 유저그룹에서 조회할 수 있습니다.'),
      switchConfig: {
        label: (value: boolean) => (value ? t('사용') : t('미사용')),
      },
    },
    {
      label: t('채널'),
      name: 'channelList',
      format: 'array',
      type: 'chip-list',
      value: [],
    },
    {
      name: 'userGroupSetting',
      type: 'radio-group',
      label: t('유저그룹 대상자 설정'),
      value: 'USER_GROUP',
      options: [
        { label: t('유저그룹 설정'), value: 'USER_GROUP' },
        { label: t('직접 설정'), value: 'DIRECT' },
      ],
      guideText: t('선택한 1개의 방식만 유저그룹 대상자로 설정됩니다.'),
    },
  ],
  validator: {
    userGroupName: true,
    channelList: true,
    userGroupSetting: true,
  },
});

const gridConfig: useGridBoxConfig = {
  query: '',
  columns: [],
  data: [],
  gridState: {
    page: 0,
    size: 10,
    sort: [],
  },
};

const searchConfig: SearchBoxConfig = {
  builders: [
    [
      {
        name: 'companyCode',
        type: 'dropdown',
        label: t('회사'),
        value: '',
        option: [
          { label: '회사A', value: 'A' },
          { label: '회사B', value: 'B' },
          { label: '회사C', value: 'C' },
        ],
        presetOptionLabel: t('선택'),
      },
      {
        name: 'employeeNumber',
        type: 'text',
        label: t('사번'),
        value: '',
      },
      {
        name: 'name',
        type: 'text',
        label: t('이름'),
        value: '',
      },
    ],
  ],
};

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('companyName', {
    cell: (info) => info.getValue(),
    header: t('회사'),
    enableGrouping: false,
  }),
  columnHelper.accessor('roomName', {
    cell: (info) => info.getValue(),
    header: t('실'),
    enableGrouping: false,
  }),
  columnHelper.accessor('deptName', {
    cell: (info) => info.getValue(),
    header: t('소속'),
    enableGrouping: false,
  }),
  columnHelper.accessor('employeeNumber', {
    cell: (info) => info.getValue(),
    header: t('사번'),
    enableGrouping: false,
  }),
  columnHelper.accessor('userName', {
    cell: (info) => info.getValue(),
    header: t('이름'),
    enableGrouping: false,
  }),
  columnHelper.accessor('userStatus', {
    cell: (info) => info.getValue(),
    header: t('재직여부'),
    enableGrouping: false,
  }),
  columnHelper.accessor('accountStatus', {
    cell: (info) => info.getValue(),
    header: t('계정상태'),
    enableGrouping: false,
  }),
];
