import { ContentsRow, DynamicFormField, InputModalSelectorFormField } from '@learnway/ui';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FormRow } from '@shared/ui';
import { ChannelListModal } from '@features/learning/course';
import { UseDynamicFormResult } from '@learnway/hooks';

interface CourseRegistrationProps {
  dynamicForm: UseDynamicFormResult;
}

const CourseRegistrationComponent = forwardRef<HTMLDivElement, CourseRegistrationProps>(
  ({ dynamicForm }, ref) => {
    const { t } = useTranslation();
    const { provider, getValues } = dynamicForm;
    // const { provider, getValues, onSubmit } = useDynamicForm(formConfig);

    const handleOnSubmit = (data: any) => {
      console.log('data {} => ', data);
    };

    return (
      <>
        {/*강의 유형*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'강의 유형'}>
              <InputModalSelectorFormField
                modalConfig={{
                  content: <ChannelListModal />,
                }}
              />
            </DynamicFormField>
          </FormRow>
        </ContentsRow>
      </>
    );
  },
);

export const CourseRegistration = CourseRegistrationComponent;
