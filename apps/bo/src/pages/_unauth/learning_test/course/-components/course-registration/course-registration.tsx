import { ContentsRow, RadioGroupFormField } from '@learnway/ui';
import React, { forwardRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormRow, FormSubTitle } from '@shared/ui';
import { UseDynamicFormResult } from '@learnway/hooks';
import { DropdownFormField } from '@features/form';

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
        {/*수강신청*/}
        <FormSubTitle label={t('수강신청')} lineType={'dark'} />
        {/*승인 결재 라인, 정원*/}
        <ContentsRow>
          {/*승인 결재 라인*/}
          <FormRow
            provider={provider}
            name={'승인 결재 라인'}
            element={
              <DropdownFormField
                options={[
                  {
                    label: '결재라인1',
                    value: '결재라인1',
                  },
                  {
                    label: '결재라인2',
                    value: '결재라인2',
                  },
                ]}
              />
            }
          />
          {/*정원*/}
          <FormRow
            provider={provider}
            name={'정원'}
            element={
              <RadioGroupFormField
                options={[
                  {
                    label: 'option1',
                    value: 'option1',
                  },
                  {
                    label: 'option2',
                    value: 'option2',
                  },
                ]}
              />
            }
          />
        </ContentsRow>
        {/*수강신청 대기, 차수 중복수강*/}
        <ContentsRow>
          {/*수강신청 대기*/}
          <FormRow
            provider={provider}
            name={'수강신청 대기'}
            element={
              <RadioGroupFormField
                options={[
                  {
                    label: 'option1',
                    value: 'option1',
                  },
                  {
                    label: 'option2',
                    value: 'option2',
                  },
                ]}
              />
            }
          />
          {/*차수 중복수강*/}
          <FormRow
            provider={provider}
            name={'차수 중복수강'}
            element={
              <RadioGroupFormField
                options={[
                  {
                    label: 'option1',
                    value: 'option1',
                  },
                  {
                    label: 'option2',
                    value: 'option2',
                  },
                ]}
              />
            }
          />
        </ContentsRow>
        {/*사전 레벨테스트, 교재 배송지 수집*/}
        <ContentsRow>
          {/*사전 레벨테스트*/}
          <FormRow
            provider={provider}
            name={'사전 레벨테스트'}
            element={
              <RadioGroupFormField
                options={[
                  {
                    label: 'option1',
                    value: 'option1',
                  },
                  {
                    label: 'option2',
                    value: 'option2',
                  },
                ]}
              />
            }
          />
          {/*교재 배송지 수집*/}
          <FormRow
            provider={provider}
            name={'교재 배송지 수집'}
            element={
              <RadioGroupFormField
                options={[
                  {
                    label: 'option1',
                    value: 'option1',
                  },
                  {
                    label: 'option2',
                    value: 'option2',
                  },
                ]}
              />
            }
          />
        </ContentsRow>
      </div>
    );
  },
);

export const CourseRegistration = CourseRegistrationComponent;
