import { FormDisplay } from '@features/form';
import { DynamicFormConfig, SearchBoxConfig, useDynamicForm, useSearchBox } from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Divider } from '@learnway/ui/elements';
import { ChipListModalSelectorFormField } from '@learnway/ui/form-field';
import { GridBox, useGridBox, useGridBoxConfig } from '@learnway/ui/grid';
import { FormItem, FormRow, SearchBox, UserGroupOrganizationShuttleModal } from '@shared/ui';
import { createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { EnChannelDetailButtonLayout } from '../../../types/type';

interface ChannelDetailUserProps {
  onButtonLayoutChange?: (layout: EnChannelDetailButtonLayout) => void;
}

const ChannelDetailUserComponent = (props: ChannelDetailUserProps, ref: any) => {
  const { provider, onSubmit, onFormChange } = useDynamicForm(formConfig());
  const { provider: userSearchProvider, getValues: getValuesForUser } = useSearchBox(searchConfig);
  const { provider: excludeUserSearchProvider, getValues: getValuesForExcludeUser } =
    useSearchBox(searchConfig);
  const { config: userGridConfig, gridFetch: gridFetchForUser } = useGridBox(
    gridConfig,
    getValuesForUser,
  );
  const { config: excludeUserGridConfig, gridFetch: gridFetchForExcludeUser } = useGridBox(
    gridConfig,
    getValuesForExcludeUser,
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    props.onButtonLayoutChange &&
      props.onButtonLayoutChange(EnChannelDetailButtonLayout.RESET_AND_SAVE);
  }, [props]);

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

  const handleOnSearchForUser = useCallback((data: any) => {
    gridFetchForUser(data);
  }, []);

  const handleOnSearchForExcludeUser = useCallback((data: any) => {
    gridFetchForExcludeUser(data);
  }, []);

  const handleOnSubmit = async (data: any) => {
    console.log('#### handleOnSubmit', data);
  };

  return (
    <form ref={formRef} onSubmit={onSubmit(handleOnSubmit)}>
      <FormSubTitle label={t('채널 사용자 정보')} lineType={'light'} />
      <ContentsRow>
        <FormRow provider={provider} name={'channelUserSetting'} />
      </ContentsRow>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'channelUserSetting', value: 'USER_GROUP' }]}
      >
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'userGroup'}
            element={
              <ChipListModalSelectorFormField
                showAddButton
                chipList={{
                  showInput: false,
                  labelField: 'pathValue',
                  valueField: 'pathKey',
                  wordwrap: true,
                }}
                modalConfig={{
                  title: '',
                  width: 'xl',
                  height: 'fix',
                  content: <UserGroupOrganizationShuttleModal tenantIds={[1, 2, 3]} />,
                }}
                actionNode={<Button variant="text" label={t('대상자')} />}
              />
            }
          />
        </ContentsRow>
        <Divider className="my-10" />
        <ContentsRow>
          <FormItem label={t('채널 사용자 제외')} />
        </ContentsRow>
        <SearchBox provider={excludeUserSearchProvider} onSearch={handleOnSearchForExcludeUser} />
        <GridBox
          config={excludeUserGridConfig}
          columns={columns}
          multiple
          title={t('채널 대상자 제외 목록')}
          disabledSelectionToggle
          showAdd
          showRemove
        />
      </FormDisplay>
      <FormDisplay
        provider={provider}
        dependencies={[{ name: 'channelUserSetting', value: 'DIRECT' }]}
      >
        <SearchBox provider={userSearchProvider} onSearch={handleOnSearchForUser} />
        <GridBox
          config={userGridConfig}
          columns={columns}
          multiple
          title={t('채널 사용자 목록')}
          disabledSelectionToggle
          showAdd
          showRemove
        />
      </FormDisplay>
    </form>
  );
};

export const ChannelDetailUser = forwardRef(ChannelDetailUserComponent);

const formConfig = (): DynamicFormConfig => ({
  builders: [
    {
      name: 'channelUserSetting',
      type: 'radio-group',
      label: t('채널 사용자 설정'),
      value: 'USER_GROUP',
      options: [
        { label: t('유저그룹 설정'), value: 'USER_GROUP' },
        { label: t('직접 설정'), value: 'DIRECT' },
      ],
      guideText: t('선택한 1개의 방식만 채널 대상자로 설정됩니다.'),
    },
    {
      name: 'userGroup',
      type: 'custom',
      label: t('유저그룹 역할부여'),
      format: 'array',
      value: [],
    },
  ],
  validator: {
    channelUserSetting: true,
    userGroup: true,
  },
});

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
