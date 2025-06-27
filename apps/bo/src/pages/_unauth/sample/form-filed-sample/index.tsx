import { DropdownFormField } from '@features/form/ui/dropdown-form-field';
import { ChannelListModal, ManagerListModal, TeacherListModal } from '@features/learning/course';
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
  TextareaFormField,
  useModal,
} from '@learnway/ui';
import { ChipListFormField, FormRow2, ThumbnailListFormField } from '@shared/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ContentsButtons, MainContents, PageContainer } from '@widgets/layout';
import { t } from 'i18next';
import LabelMessagesService from '../../../../entities/label-messages-mock/api/label-messages';
import { useDynamicForm2 } from '@learnway/hooks';

export const Route = createFileRoute('/_unauth/sample/form-filed-sample/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const { provider, onSubmit, control, getValues, watch } = useDynamicForm2({ builders: [] });

  // DropdownCodeGroup 필드 값 감시
  const dropdownCodeGroupValue = watch('DropdownCodeGroup');

  const handleSetValue = () => {
    const { onFormChange } = provider;
    const newValues = {
      라디오커스텀: '2',
      라디오커스텀_모달_아이디: 'channel_id1',
      라디오커스텀_모달_이름: 'channel_name1',
    };
    onFormChange(newValues);
  };

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
            onClick={handleSetValue}
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
            <FormRow2
              provider={provider}
              name={'radioApi'}
              label={t('라디오 - api')}
              validation={{
                required: true,
                format: 'array',
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
            <FormRow2
              provider={provider}
              name={'radioCodeGroup'}
              label={t('라디오 - 코드그룹')}
              element={<RadioGroupFormField optionsConfig={{ codeGroup: 'test' }} />}
            />
          </ContentsRow>
          {/* 라디오 + custom node */}
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'radioCodeGroupWithNode'}
              label={t('라디오 - 코드그룹 - 노드')}
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
                          <FormRow2
                            provider={provider}
                            name={'라디오커스텀_인풋'}
                            value={''}
                            element={<Input />}
                          />
                        ),
                      },
                      {
                        value: 'test2',
                        node: (
                          <>
                            <FormRow2
                              provider={provider}
                              name={'라디오커스텀_모달_아이디'}
                              type={'hidden'}
                              value={''}
                            />
                            <FormRow2
                              provider={provider}
                              name={'라디오커스텀_모달_이름'}
                              value={''}
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
            <FormRow2
              provider={provider}
              name={'DropdownCodeGroup'}
              label={'Dropdown - DropdownFormField(codeGroup)'}
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
            <FormRow2
              provider={provider}
              name={'DropdownApi'}
              label={'Dropdown - DropdownFormField(api)'}
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
            <FormRow2 provider={provider} name={'channelId'} type={'hidden'} />
            <FormRow2
              provider={provider}
              name={'channelName'}
              label={'채널 - InputModalSelectorFormField'}
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
            <FormRow2
              provider={provider}
              name={'에디터'}
              label={'Editor - EditorFormField'}
              value={
                '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"editor sample text.....","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
              }
              element={<EditorFormField />}
            />
          </ContentsRow>
          {/* 과정명 */}
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'과정명'}
              label={t('과정명')}
              maxLength={10}
              element={<Input />}
            />
          </ContentsRow>
          {/* 과정내용 */}
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'과정내용'}
              label={t('과정내용')}
              element={<TextareaFormField />}
            />
          </ContentsRow>
          {/* ChipListFormField */}
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'태그'}
              label={t('태그 - 인풋 칩 리스트')}
              format={'array'}
              value={['현대자동차 A', '현대자동차 B', '현대자동차 C']}
              element={
                <ChipListFormField
                  chipListConfig={{
                    emptyMessage: 'XCXC',
                  }}
                />
              }
            />
          </ContentsRow>
          {/* 강사 */}
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'강사'}
              label={t('강사 - ChipListModalSelectorFormField')}
              format={'array'}
              value={[]}
              validation={{
                required: true,
                format: 'array',
                conditions: [
                  {
                    fn: (values: any) => values.강사 && values.강사.length > 0,
                    message: '최소 1명 이상의 강사를 선택해주세요.',
                  },
                ],
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
            <FormRow2
              provider={provider}
              name={'강사2'}
              label={t('강사 - ChipListModalSelectorFormField')}
              format={'array'}
              value={[]}
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
            <FormRow2
              provider={provider}
              name={'checkboxCodeGroup'}
              label={t('checkbox - checkboxGroupFormField(codeGroup)')}
              value={[]}
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
            <FormRow2
              provider={provider}
              name={'checkboxApi'}
              label={t('checkbox - checkboxGroupFormField(api)')}
              value={[]}
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
            <FormRow2 provider={provider} name={'managerId'} type={'hidden'} value={''} />
            <FormRow2
              provider={provider}
              name={'managerName'}
              label={t('운영자 - InputModalSelectorFormField')}
              format={'string'}
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
            <FormRow2
              provider={provider}
              name={'테넌트'}
              label={t('테넌트 - 우측 액션버튼 + chip list')}
              format={'array'}
              value={[{ label: 'AA', value: 'value1' }]}
              chipListConfig={{}}
            />
          </ContentsRow>
          {/* 공개범위 */}
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'공개범위'}
              label={t('공개범위 - ListModalSelectorFormField')}
              format={'array'}
              value={[{ targetId: 'target1', targetName: 'targetname1' }]}
              placeholder={''}
              description={''}
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
            <FormRow2
              provider={provider}
              name={'썸네일'}
              label={t('ThumbnailListFormField')}
              format={'array'}
              value={[
                'https://lodash.com/assets/img/lodash.svg',
                'https://lodash.com/assets/img/lodash.svg',
              ]}
              element={<ThumbnailListFormField />}
            />
          </ContentsRow>
          {/* 폰넘버 */}
          {/* <ContentsRow>
            <FormRow2
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
