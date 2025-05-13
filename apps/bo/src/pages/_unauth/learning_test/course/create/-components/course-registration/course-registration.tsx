import { ContentsRow, DynamicFormField, InputModalSelectorFormField } from '@learnway/ui';
import React, { forwardRef, useEffect } from 'react';
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
    const { provider, getValues, fetchData } = dynamicForm;
    // const { provider, getValues, onSubmit, fetchData } = useDynamicForm(formConfig);

    const handleOnSubmit = (data: any) => {
      console.log('data {} => ', data);
    };

    useEffect(() => {
      console.log('CourseRegistrationComponent init');
      // fetchData({});
    }, []);

    return (
      <div ref={ref}>
        <button onClick={() => console.log('click')}>XX</button>
        {/*수강신청여부*/}
        <ContentsRow type="horizontal">
          <FormRow provider={provider}>
            <DynamicFormField name={'isCourseApply'} />
          </FormRow>
        </ContentsRow>
        {/*강의 유형*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'강의 유형'}>
              <InputModalSelectorFormField
                modalConfig={{
                  content: <ChannelListModal />,
                }}
                transformModalData={(modalData: any) => ({
                  '강의 유형': modalData?.channelName,
                  '강의 유형 아이디': modalData?.channelId,
                })}
              />
            </DynamicFormField>
          </FormRow>
        </ContentsRow>
      </div>
    );
  },
);

export const CourseRegistration = CourseRegistrationComponent;
