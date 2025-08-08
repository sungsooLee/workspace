import { useDynamicForm2 } from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { FormRow } from '@shared/ui/form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/sample/form-field-sample/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal, saveConfirm } = useModal();
  const { provider, onSubmit, getValues, watch, onFormValid, updateFormData } = useDynamicForm2();

  const handleSetValue = () => {
    const newValues = {
      라디오커스텀: '2',
      라디오커스텀_모달_아이디: 'channel_id1',
      라디오커스텀_모달_이름: 'channel_name1',
      courseValidityRange: {
        from: new Date('2025-01-01'),
        to: new Date('2025-01-22'),
      },
    };
    updateFormData(newValues);
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
      <div>
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
        <div>
          <FormSubTitle label={'Date Picker'} />
          <ContentsRow>
            <FormRow provider={provider} name={'day'} label={'day'} element={<Input />} />
          </ContentsRow>
        </div>
      </div>
    </form>
  );
}

// formConfig는 더 이상 필요하지 않습니다. 각 FormRow에서 fieldConfig prop으로 직접 설정합니다.
