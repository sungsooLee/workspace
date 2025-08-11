import { useDynamicForm2 } from '@learnway/hooks';
import { FormRow2 } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauth/sample/form-test-sample/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { provider, onSubmit, getValues, watch, onFormValid, updateFormData } = useDynamicForm2();

  const handleSetValue = () => {
    const newValues = {
      text: 'test',
      text2: 'test2',
      radio: 'test3',
      dropdown: 'test3',
      checkbox: ['test3'],
    };
    updateFormData(newValues);
  };

  const handleGetValues = () => {
    console.log('getValues => ', getValues());
  };

  const handleOnSubmit = async (data: any) => {
    console.log('data {} => ', data);
  };

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button
            type={'button'}
            variant="gray2"
            size="sm"
            label={'Set'}
            onClick={handleSetValue}
          />
          <Button
            type={'button'}
            variant="gray2"
            size="sm"
            label={'Get'}
            onClick={handleGetValues}
          />
          <Button type={'submit'} variant="primary" size="sm" label={'Form submit'} />
        </ContentsButtons>
        <MainContents>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'text'}
              label={'text'}
              element={<Input />}
              validation={{ required: true }}
            />
          </ContentsRow>
          {/* <ContentsRow>
            <FormRow2
              provider={provider}
              name={'text2'}
              label={'text2'}
              element={<InputFormField />}
              validation={{ required: true }}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'dropdown'}
              label={'dropdown'}
              element={
                <DropdownFormField
                  optionsConfig={{
                    codeGroup: 'test',
                  }}
                />
              }
              validation={{ required: true }}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'radio'}
              label={'radio'}
              element={
                <RadioGroupFormField
                  optionsConfig={{
                    codeGroup: 'test',
                  }}
                />
              }
              validation={{ required: true }}
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name={'checkbox'}
              label={'checkbox'}
              element={<CheckboxGroupFormField optionsConfig={{ codeGroup: 'test' }} />}
              format={'array'}
              validation={{ required: true }}
            />
          </ContentsRow> */}
        </MainContents>
      </PageContainer>
    </form>
  );
}

// formConfig는 더 이상 필요하지 않습니다. 각 FormRow에서 fieldConfig prop으로 직접 설정합니다.
