import { ContentsRow, DynamicFormField } from '@learnway/ui';
import React, { forwardRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormRow } from '@shared/ui';
import { UseDynamicFormResult } from '@learnway/hooks';

interface CourseRegistrationProps {
  dynamicForm: UseDynamicFormResult;
}

const CourseRegistrationComponent = forwardRef<HTMLDivElement, CourseRegistrationProps>(
  ({ dynamicForm }, ref) => {
    const { t } = useTranslation();
    const { provider, getValues, fetchData } = dynamicForm;
    // const { provider, getValues, onSubmit } = useDynamicForm(formConfig);

    const handleOnSubmit = (data: any) => {
      console.log('data {} => ', data);
    };

    useEffect(() => {
      console.log('CourseRegistrationComponent init');
      // fetchData({});
    }, []);

    return (
      <div ref={ref}>
        {/*수강신청여부*/}
        <ContentsRow type="horizontal">
          <FormRow provider={provider}>
            <DynamicFormField name={'수강신청여부'} />
          </FormRow>
        </ContentsRow>
      </div>
    );
  },
);

export const CourseRegistration = CourseRegistrationComponent;
