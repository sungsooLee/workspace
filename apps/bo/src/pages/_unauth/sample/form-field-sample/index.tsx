import { DateRangePickerFormField, PeriodPickerFormField } from '@features/form';
import { useDynamicForm2 } from '@learnway/hooks';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { useModal } from '@learnway/ui/modal';
import { ContentsButtons, FormRow2, MainContents, PageContainer } from '@shared/ui';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';

export const Route = createFileRoute('/_unauth/sample/form-field-sample/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal, saveConfirm } = useModal();
  const { provider, onSubmit, getValues, watch, onFormValid } = useDynamicForm2();

  // DropdownCodeGroup 필드 값 감시
  // const radioCodeGroup = watch('radioCodeGroup');
  // const dropdownCodeGroup = watch('DropdownCodeGroup');
  const dropdownCodeGroup = 'test';

  // console.log('radioCodeGroup => ', radioCodeGroup);

  const handleSetValue = () => {
    const { onFormChange } = provider;
    const newValues = {
      라디오커스텀: '2',
      라디오커스텀_모달_아이디: 'channel_id1',
      라디오커스텀_모달_이름: 'channel_name1',
      courseValidityRange: {
        from: new Date('2025-01-01'),
        to: new Date('2025-01-22'),
      },
    };
    onFormChange(newValues);
  };

  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
    await saveConfirm();
  };

  const handleValidate = async () => {
    const result = await onFormValid();
    const errors = provider.formState.errors;
    console.log('validate => ', { result, errors });
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
            type={'button'}
            variant="point"
            size="sm"
            label={'validate'}
            onClick={handleValidate}
          />
          <Button type={'submit'} variant="point" size="sm" label={'Form submit'} />
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'periodPicker'}
              label={t('기간 선택')}
              element={<PeriodPickerFormField datePickerConfig={{ displayType: 'day-time-h' }} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'periodPicker'}
              label={t('기간 선택')}
              element={<PeriodPickerFormField datePickerConfig={{ displayType: 'day-time-h' }} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'courseValidityRange'}
              label={t('노출 기간')}
              format={'object'}
              validation={{ required: true, format: 'object' }}
              element={<DateRangePickerFormField displayType={'day-time-h'} />}
            />
          </ContentsRow>
          {/* <ContentsRow>
            <FormRow2
              provider={provider}
              name={'periodPickerDayTime'}
              label={t('기간 선택 (day-time)')}
              element={<PeriodPickerFormField datePickerConfig={{ displayType: 'day-time' }} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'radioCodeGroup'}
              label={t('라디오 - 코드그룹')}
              element={<RadioGroupFormField optionsConfig={{ codeGroup: 'test' }} />}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'radioCodeGroupWithNode'}
              label={t('라디오 - 코드그룹 - 커스텀노드')}
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
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'DropdownApi'}
              label={'Dropdown - api 사용'}
              element={
                <DropdownFormField
                  optionsConfig={{
                    labelField: 'cdName',
                    valueField: 'cdId',
                    api: {
                      fn: (param?: string) => LabelMessagesService.fetchChannelMock(param),
                    },
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'DropdownCodeGroupRelation'}
              label={`Dropdown - codeGroup ('Dropdown - codeGroup 사용' 변경시 재조회)`}
              element={
                <DropdownFormField
                  key={`dropdown-relation-${dropdownCodeGroup}`}
                  optionsConfig={{
                    codeGroup: 'test',
                    transformOptions: (options: SelectOption[]) => {
                      return options.filter(
                        (option: SelectOption) => option.value !== dropdownCodeGroup,
                      );
                    },
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'DropdownApiRelation'}
              label={`Dropdown - api ('Dropdown - codeGroup 사용' 변경시 재조회)`}
              element={
                <DropdownFormField
                  key={`dropdown-api-relation-${dropdownCodeGroup}`}
                  optionsConfig={{
                    labelField: 'cdName',
                    valueField: 'cdId',
                    api: {
                      fn: () => {
                        console.log('dropdownCodeGroup =>=>=>=>=> ', dropdownCodeGroup);
                        return LabelMessagesService.fetchChannelMock(dropdownCodeGroup);
                      },
                    },
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'courseValidityRange'}
              label={t('노출 기간')}
              format={'object'}
              validation={{ required: true, format: 'object' }}
              element={<DateRangePickerFormField displayType={'day-time-h'} />}
            />
          </ContentsRow> */}
        </MainContents>
      </PageContainer>
    </form>
  );
}

// formConfig는 더 이상 필요하지 않습니다. 각 FormRow에서 fieldConfig prop으로 직접 설정합니다.
