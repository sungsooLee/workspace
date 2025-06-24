import { DropdownFormField } from '@features/form/ui/dropdown-form-field';
import { ChannelListModal, ManagerListModal, TeacherListModal } from '@features/learning/course';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import {
  Button,
  ChipListModalSelectorFormField,
  ContentsRow,
  EditorFormField,
  Input,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  PhoneNumberFormField,
  RadioGroupFormField,
  SelectOption,
  useModal,
} from '@learnway/ui';
import { FormRow } from '@shared/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ContentsButtons, MainContents, PageContainer } from '@widgets/layout';
import { SubContents } from '@widgets/layout/ui/container/slot/sub-contents';
import { t } from 'i18next';
import LabelMessagesService from '../../../../entities/label-messages-mock/api/label-messages';

export const Route = createFileRoute('/_unauth/sample/form-filed-sample/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const { provider, onSubmit, control, getValues, watch } = useDynamicForm(formConfig);

  // DropdownCodeGroup 필드 값 감시
  const dropdownCodeGroupValue = watch('DropdownCodeGroup');

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleValidate = () => {
    console.log('getValues => ', getValues());
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button
            type={'button'}
            variant="primary"
            size="sm"
            label={'set value'}
            onClick={() => {
              const { onFormChange } = provider;
              const newValues = {
                라디오커스텀: '2',
                라디오커스텀_모달_아이디: 'channel_id1',
                라디오커스텀_모달_이름: 'channel_name1',
              };
              onFormChange(newValues);
            }}
          />
          <Button
            type={'submit'}
            variant="point"
            size="sm"
            label={'Form submit'}
            onClick={handleOnSubmit}
          />
          <Button
            type={'button'}
            variant="point"
            size="sm"
            label={'Form 유효성 체크'}
            onClick={handleValidate}
          />
        </ContentsButtons>
        <MainContents>
          {/* 라디오 */}
          <ContentsRow>
            <FormRow provider={provider} name={'라디오'} />
          </ContentsRow>
          {/* 라디오 + custom node */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'라디오커스텀'}
              element={
                <RadioGroupFormField
                  optionsConfig={{
                    codeGroup: 'test',
                    transformOptions: (options: SelectOption[]) => {
                      return options.filter((option: SelectOption) => option.value !== 'test4');
                    },
                    optionsNode: [
                      {
                        value: 'value1',
                        node: (
                          <FormRow
                            provider={provider}
                            name={'라디오커스텀_인풋'}
                            element={<Input />}
                          />
                        ),
                      },
                      {
                        value: 'value2',
                        node: (
                          <FormRow
                            provider={provider}
                            name={'라디오커스텀_모달_이름'}
                            element={
                              <InputModalSelectorFormField
                                modalConfig={{
                                  content: <ChannelListModal />,
                                }}
                                transformModalData={(data: any) => ({
                                  라디오커스텀_모달_아이디: data.channelId,
                                  라디오커스텀_모달_이름: data.channelName,
                                })}
                              />
                            }
                          />
                        ),
                      },
                    ],
                  }}
                />
              }
            />
          </ContentsRow>
          {/* dropdown */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'DropdownCodeGroup'}
              element={
                <DropdownFormField
                  optionsConfig={{
                    codeGroup: 'test',
                  }}
                />
              }
            />
          </ContentsRow>
          {/* dropdown */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'DropdownApi'}
              element={
                <DropdownFormField
                  optionsConfig={{
                    labelField: 'cdName',
                    valueField: 'cdId',
                    api: {
                      fn: LabelMessagesService.fetchChannelMock,
                      params: watch('DropdownCodeGroup') || '', // fn 실행시 파라미터 값 전달
                    },
                  }}
                />
              }
            />
          </ContentsRow>
          {/* 채널 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'channelName'}
              element={
                <InputModalSelectorFormField
                  modalConfig={{
                    content: <ChannelListModal />,
                  }}
                />
              }
            />
          </ContentsRow>
          {/* Editor */}
          <ContentsRow>
            <FormRow provider={provider} name={'에디터'} element={<EditorFormField />} />
          </ContentsRow>
          {/* 과정명 */}
          <ContentsRow>
            <FormRow provider={provider} name={'과정명'} />
          </ContentsRow>
          {/* 과정내용 */}
          <ContentsRow>
            <FormRow provider={provider} name={'과정내용'} />
          </ContentsRow>
          {/* 대표이미지 */}
          {/* TODO: className 제거 */}
          <ContentsRow>
            <FormRow provider={provider} name={'대표이미지'} />
          </ContentsRow>
          <ContentsRow>
            <FormRow provider={provider} name={'태그'} />
          </ContentsRow>
          {/* 강사 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'강사'}
              element={
                <ChipListModalSelectorFormField
                  modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
                  chipList={{
                    labelField: 'name',
                    valueField: 'id',
                    wordwrap: true,
                  }}
                />
              }
            />
          </ContentsRow>
          {/* 강사2 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'강사2'}
              element={
                <ChipListModalSelectorFormField
                  showAddButton
                  modalConfig={{ content: <TeacherListModal channelId={getValues()?.channelId} /> }}
                  chipList={{
                    labelField: 'name',
                    valueField: 'id',
                    wordwrap: true,
                  }}
                  actionNode={
                    <Button
                      variant="text"
                      size="sm"
                      label={t('대상자')}
                      onClick={() => openModal({ content: <ManagerListModal /> })}
                    />
                  }
                />
              }
            />
          </ContentsRow>
          {/* 강의실설정 */}
          <ContentsRow>
            <FormRow provider={provider} name={'강의실설정'} />
          </ContentsRow>
          {/* 운영자 & 연락처 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'managerName'}
              element={
                <InputModalSelectorFormField
                  modalConfig={{
                    content: <ManagerListModal />,
                  }}
                  transformModalData={(modalData: any) => ({
                    managerId: modalData?.id,
                    managerName: modalData?.name,
                  })}
                />
              }
            />
          </ContentsRow>
          {/* 테넌트 */}
          <ContentsRow>
            <FormRow provider={provider} name={'테넌트'} />
          </ContentsRow>
          {/* 공개범위 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'공개범위'}
              element={
                <ListModalSelectorFormField
                  modalConfig={{
                    content: <ManagerListModal />,
                  }}
                  transformModalData={(modalData: any) => ({
                    targetId: modalData?.id,
                    targetName: modalData?.name,
                  })}
                  button={{
                    label: t('공개범위 설정'),
                  }}
                  list={{
                    labelField: 'targetName',
                    valueField: 'targetId',
                  }}
                />
              }
            />
          </ContentsRow>
          {/* 썸네일 리스트 */}
          <ContentsRow>
            <FormRow provider={provider} name={'썸네일'} />
          </ContentsRow>
          {/* 폰넘버 */}
          {/* <ContentsRow>
            <FormRow
              provider={provider}
              name={'폰넘버'}
              element={
                <PhoneNumberFormField
                  phoneNumberConfig={{
                    options: [{ value: 'KOR_82', label: '+82' }],
                  }}
                />
              }
            />
          </ContentsRow> */}
        </MainContents>
        <SubContents>
          <Input />
        </SubContents>
      </PageContainer>
    </form>
  );
}

/**
 * 필수값 : name, type
 */
const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'DropdownCodeGroup',
      type: 'custom',
      label: 'Dropdown - DropdownFormField(codeGroup)',
      value: '',
    },
    {
      name: 'DropdownApi',
      type: 'custom',
      label: 'Dropdown - DropdownFormField(api)',
      value: '',
    },
    {
      name: '폰넘버',
      type: 'custom',
      label: '폰넘버 - PhoneNumberFormField',
      value: '',
    },
    {
      name: 'channelId',
      type: 'hidden',
      value: '',
    },
    {
      name: 'channelName',
      type: 'custom',
      label: '채널 - InputModalSelectorFormField',
      value: '',
    },
    {
      name: '에디터',
      type: 'custom',
      label: 'Editor - EditorFormField',
      value:
        '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"editor sample text.....","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    },
    {
      name: '과정명',
      type: 'text',
      label: t('과정명'),
      value: '',
      placeholder: '',
      description: '',
      maxLength: 10,
    },
    {
      name: '과정내용',
      type: 'textarea',
      label: t('과정내용'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '대표이미지',
      type: 'thumbnail-image-upload',
      label: t('대표이미지'),
      format: 'array',
      value: [
        { id: '1', path: 'https://lodash.com/assets/img/lodash.svg' },
        { id: '2', path: 'https://lodash.com/assets/img/lodash.svg' },
        { id: '3', path: 'https://lodash.com/assets/img/lodash.svg' },
        { id: '4', path: 'https://lodash.com/assets/img/lodash.svg' },
      ],
      placeholder: '',
      description: '',
    },
    {
      name: '태그',
      type: 'chip-list',
      label: t('태그 - 인풋 칩 리스트'),
      format: 'array',
      value: ['현대자동차 A', '현대자동차 B', '현대자동차 C'],
      // placeholder: '',
      description: '',
      chipListConfig: {
        emptyMessage: 'XCXC',
      },
    },
    {
      name: '강사',
      type: 'custom',
      label: t('강사 - ChipListModalSelectorFormField'),
      format: 'array',
      value: [],
      placeholder: '',
      description: '',
    },
    {
      name: '강사2',
      type: 'custom',
      label: t('강사 - ChipListModalSelectorFormField'),
      format: 'array',
      value: [],
      placeholder: '',
      description: '',
    },
    {
      name: '라디오',
      type: 'radio-group',
      label: t('라디오'),
      options: [
        {
          label: '없음',
          value: '',
        },
        {
          label: '초급',
          value: '1',
        },
        {
          label: '중급',
          value: '2',
        },
      ],
      value: [],
      placeholder: '',
      description: '',
    },
    {
      name: '라디오커스텀',
      type: 'custom',
      label: t('라디오커스텀'),
      value: [],
      placeholder: '',
      description: '',
    },
    {
      name: '라디오커스텀_인풋',
      type: 'custom',
      value: '',
    },
    {
      name: '라디오커스텀_모달_아이디',
      type: 'hidden',
      value: '',
    },
    {
      name: '라디오커스텀_모달_이름',
      type: 'custom',
      value: '',
    },
    {
      name: '강의실설정',
      type: 'checkbox-group',
      label: t('강의실 설정'),
      format: 'array',
      options: Array(10)
        .fill(null)
        .map((d, i) => ({ value: `value${i}`, label: `label${i}`, disabled: i === 1 })),
      value: ['value1'],
      placeholder: '',
      description: '',
      showSelectAll: true,
      cols: 4,
    },
    {
      name: 'managerId',
      type: 'hidden',
      value: '',
    },
    {
      name: 'managerName',
      type: 'custom',
      label: t('운영자 - InputModalSelectorFormField'),
      format: 'string',
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '연락처',
      type: 'custom',
      label: t('연락처 - 인풋 + label + 인풋'),
      value: '',
      placeholder: '',
      description: '',
    },
    {
      name: '테넌트',
      type: 'chip-list',
      label: t('테넌트 - 우측 액션버튼 + chip list'),
      format: 'array',
      value: [{ label: 'AA', value: 'value1' }],
      placeholder: '',
      description: '',
      chipListConfig: {},
    },
    {
      name: '공개범위',
      type: 'custom',
      label: t('공개범위 - ListModalSelectorFormField'),
      format: 'array',
      value: [{ targetId: 'target1', targetName: 'targetname1' }],
      placeholder: '',
      description: '',
    },
    {
      name: '썸네일',
      type: 'thumbnail-list',
      label: t('ThumbnailListFormField'),
      format: 'array',
      value: [
        'https://lodash.com/assets/img/lodash.svg',
        'https://lodash.com/assets/img/lodash.svg',
      ],
    },
  ],
};
