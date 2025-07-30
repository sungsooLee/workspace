import { useDynamicForm2 } from '@learnway/hooks';
import { Button, ContentsRow, Input, useModal } from '@learnway/ui';
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
  const dropdownCodeGroup = watch('DropdownCodeGroup');

  const handleSetValue = () => {
    const { onFormChange } = provider;
    const newValues = {
      라디오커스텀: '2',
      라디오커스텀_모달_아이디: 'channel_id1',
      라디오커스텀_모달_이름: 'channel_name1',
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
        </MainContents>
      </PageContainer>
    </form>
  );
}

// formConfig는 더 이상 필요하지 않습니다. 각 FormRow에서 fieldConfig prop으로 직접 설정합니다.
