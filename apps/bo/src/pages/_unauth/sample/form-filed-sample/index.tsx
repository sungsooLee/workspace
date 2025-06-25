import { DropdownFormField } from '@features/form/ui/dropdown-form-field';
import { ChannelListModal, ManagerListModal, TeacherListModal } from '@features/learning/course';
import { useDynamicForm } from '@learnway/hooks';
import {
  Button,
  CheckboxGroupFormField,
  ChipListModalSelectorFormField,
  ContentsRow,
  EditorFormField,
  Input,
  InputModalSelectorFormField,
  ListModalSelectorFormField,
  RadioGroupFormField,
  SelectOption,
  useModal,
} from '@learnway/ui';
import { FormRow } from '@shared/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ContentsButtons, MainContents, PageContainer } from '@widgets/layout';
import { t } from 'i18next';
import LabelMessagesService from '../../../../entities/label-messages-mock/api/label-messages';

export const Route = createFileRoute('/_unauth/sample/form-filed-sample/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const { provider, onSubmit, control, getValues, watch } = useDynamicForm({ builders: [] });

  // DropdownCodeGroup 필드 값 감시
  const dropdownCodeGroupValue = watch('DropdownCodeGroup');

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleFormData = () => {
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
            type={'button'}
            variant="point"
            size="sm"
            label={'Form 데이터 확인'}
            onClick={handleFormData}
          />
          <Button
            type={'submit'}
            variant="point"
            size="sm"
            label={'Form submit'}
            onClick={handleOnSubmit}
          />
        </ContentsButtons>
        <MainContents>
          {/* 라디오 api*/}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'radioApi'}
              fieldConfig={{
                type: 'custom',
                label: t('라디오 - api'),
                value: [],
                validation: {
                  required: true,
                  format: 'array',
                },
              }}
              element={
                <RadioGroupFormField
                  optionsConfig={{
                    labelField: 'cdName',
                    valueField: 'cdId',
                    api: {
                      fn: LabelMessagesService.fetchChannelMock,
                    },
                  }}
                />
              }
            />
          </ContentsRow>
          {/* 라디오 codeGroup*/}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'radioCodeGroup'}
              fieldConfig={{
                type: 'radio-group',
                label: t('라디오 - 코드그룹'),
                value: [],
              }}
              element={<RadioGroupFormField optionsConfig={{ codeGroup: 'test' }} />}
            />
          </ContentsRow>
          {/* 라디오 + custom node */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'radioCodeGroupWithNode'}
              fieldConfig={{
                type: 'custom',
                label: t('라디오 - 코드그룹 - 노드'),
                value: [],
              }}
              element={
                <RadioGroupFormField
                  optionsConfig={{
                    codeGroup: 'test',
                    transformOptions: (options: SelectOption[]) => {
                      return options.filter((option: SelectOption) => option.value !== 'test4');
                    },
                    optionsNode: [
                      {
                        value: 'test1',
                        node: (
                          <FormRow
                            provider={provider}
                            name={'라디오커스텀_인풋'}
                            fieldConfig={{
                              type: 'custom',
                              value: '',
                            }}
                            element={<Input />}
                          />
                        ),
                      },
                      {
                        value: 'test2',
                        node: (
                          <>
                            <FormRow
                              provider={provider}
                              name={'라디오커스텀_모달_아이디'}
                              fieldConfig={{
                                type: 'hidden',
                                value: '',
                              }}
                            />
                            <FormRow
                              provider={provider}
                              name={'라디오커스텀_모달_이름'}
                              fieldConfig={{
                                type: 'custom',
                                value: '',
                              }}
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
                          </>
                        ),
                      },
                    ],
                  }}
                />
              }
            />
          </ContentsRow>
          {/* dropdown codeGroup*/}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'DropdownCodeGroup'}
              fieldConfig={{
                type: 'custom',
                label: 'Dropdown - DropdownFormField(codeGroup)',
                value: '',
              }}
              element={
                <DropdownFormField
                  optionsConfig={{
                    codeGroup: 'test',
                  }}
                />
              }
            />
          </ContentsRow>
          {/* dropdown api*/}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'DropdownApi'}
              fieldConfig={{
                type: 'custom',
                label: 'Dropdown - DropdownFormField(api)',
                value: '',
              }}
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
              name={'channelId'}
              fieldConfig={{
                type: 'hidden',
                value: '',
              }}
            />
            <FormRow
              provider={provider}
              name={'channelName'}
              fieldConfig={{
                type: 'custom',
                label: '채널 - InputModalSelectorFormField',
                value: '',
              }}
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
            <FormRow
              provider={provider}
              name={'에디터'}
              fieldConfig={{
                type: 'custom',
                label: 'Editor - EditorFormField',
                value:
                  '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"editor sample text.....","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
              }}
              element={<EditorFormField />}
            />
          </ContentsRow>
          {/* 과정명 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'과정명'}
              fieldConfig={{
                type: 'text',
                label: t('과정명'),
                value: '',
                placeholder: '',
                description: '',
                maxLength: 10,
              }}
            />
          </ContentsRow>
          {/* 과정내용 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'과정내용'}
              fieldConfig={{
                type: 'textarea',
                label: t('과정내용'),
                value: '',
                placeholder: '',
                description: '',
              }}
            />
          </ContentsRow>
          {/* 대표이미지 */}
          {/* TODO: className 제거 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'대표이미지'}
              fieldConfig={{
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
              }}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'태그'}
              fieldConfig={{
                type: 'chip-list',
                label: t('태그 - 인풋 칩 리스트'),
                format: 'array',
                value: ['현대자동차 A', '현대자동차 B', '현대자동차 C'],
                description: '',
                chipListConfig: {
                  emptyMessage: 'XCXC',
                },
              }}
            />
          </ContentsRow>
          {/* 강사 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'강사'}
              fieldConfig={{
                type: 'custom',
                label: t('강사 - ChipListModalSelectorFormField'),
                format: 'array',
                value: [],
                placeholder: '',
                description: '',
                validation: {
                  required: true,
                  format: 'array',
                  conditions: [
                    {
                      fn: (values) => values.강사 && values.강사.length > 0,
                      message: '최소 1명 이상의 강사를 선택해주세요.',
                    },
                  ],
                },
              }}
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
              fieldConfig={{
                type: 'custom',
                label: t('강사 - ChipListModalSelectorFormField'),
                format: 'array',
                value: [],
                placeholder: '',
                description: '',
              }}
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
          {/* checkbox codeGroup */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'checkboxCodeGroup'}
              fieldConfig={{
                type: 'custom',
                label: t('checkbox - checkboxGroupFormField(codeGroup)'),
                value: [],
              }}
              element={
                <CheckboxGroupFormField
                  optionsConfig={{ codeGroup: 'test' }}
                  showSelectAll
                  cols={4}
                />
              }
            />
          </ContentsRow>
          {/* checkbox api */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'checkboxApi'}
              fieldConfig={{
                type: 'custom',
                label: t('checkbox - checkboxGroupFormField(api)'),
                value: [],
              }}
              element={
                <CheckboxGroupFormField
                  optionsConfig={{
                    labelField: 'cdName',
                    valueField: 'cdId',
                    api: {
                      fn: LabelMessagesService.fetchChannelMock,
                    },
                  }}
                  showSelectAll
                  cols={4}
                />
              }
            />
          </ContentsRow>
          {/* 운영자 & 연락처 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'managerId'}
              fieldConfig={{
                type: 'hidden',
                value: '',
              }}
            />
            <FormRow
              provider={provider}
              name={'managerName'}
              fieldConfig={{
                type: 'custom',
                label: t('운영자 - InputModalSelectorFormField'),
                format: 'string',
                value: '',
                placeholder: '',
                description: '',
              }}
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
            <FormRow
              provider={provider}
              name={'테넌트'}
              fieldConfig={{
                type: 'chip-list',
                label: t('테넌트 - 우측 액션버튼 + chip list'),
                format: 'array',
                value: [{ label: 'AA', value: 'value1' }],
                placeholder: '',
                description: '',
                chipListConfig: {},
              }}
            />
          </ContentsRow>
          {/* 공개범위 */}
          <ContentsRow>
            <FormRow
              provider={provider}
              name={'공개범위'}
              fieldConfig={{
                type: 'custom',
                label: t('공개범위 - ListModalSelectorFormField'),
                format: 'array',
                value: [{ targetId: 'target1', targetName: 'targetname1' }],
                placeholder: '',
                description: '',
              }}
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
            <FormRow
              provider={provider}
              name={'썸네일'}
              fieldConfig={{
                type: 'thumbnail-list',
                label: t('ThumbnailListFormField'),
                format: 'array',
                value: [
                  'https://lodash.com/assets/img/lodash.svg',
                  'https://lodash.com/assets/img/lodash.svg',
                ],
              }}
            />
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
      </PageContainer>
    </form>
  );
}

// formConfig는 더 이상 필요하지 않습니다. 각 FormRow에서 fieldConfig prop으로 직접 설정합니다.
