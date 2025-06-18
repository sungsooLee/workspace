import { ContentsRow, RadioGroupFormField } from '@learnway/ui';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { FormRow, FormSubTitle } from '@shared/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { DropdownFormField } from '@features/form';
import { TabFormRef } from '../common/tab-form-ref';

interface CourseRegistrationProps {
  dummy?: any;
  // dynamicForm: UseDynamicFormResult;
  initialData?: any;
}

const CourseRegistrationComponent = forwardRef<TabFormRef, CourseRegistrationProps>(
  ({ dummy, initialData }, ref) => {
    const { t } = useTranslation();
    // const { provider, getValues, fetchData } = dynamicForm;
    const { provider, getValues, onSubmit, onFormValid, formState, fetchData } =
      useDynamicForm(formConfig);

    const handleOnSubmit = (data: any) => {
      console.log('data {} => ', data);
    };

    // 부모 컴포넌트에서 호출할 수 있는 유효성 검사 메서드
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // 모든 필드에 대해 유효성 검사 수행
        const isValid = await onFormValid();
        const data = getValues();
        const errors = formState.errors;

        return {
          isValid,
          data: isValid ? data : undefined,
          errors: isValid ? undefined : errors,
        };
      },
    }));

    useEffect(() => {
      console.log('CourseRegistrationComponent init');
      // 초기 데이터가 있으면 설정
      if (initialData) {
        fetchData(initialData);
      }
    }, [initialData]);

    return (
      <div>
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

const formConfig: DynamicFormConfig = {
  builders: [
    // 승인 결재 라인
    {
      name: '승인 결재 라인',
      type: 'custom',
      label: '승인 결재 라인',
      format: 'string',
      value: '',
    },
    // 정원
    {
      name: '정원',
      type: 'custom',
      label: '정원',
      format: 'string',
      value: '',
    },
    // 수강신청 대기
    {
      name: '수강신청 대기',
      type: 'custom',
      label: '수강신청 대기',
      format: 'string',
      value: '',
    },
    // 차수 중복수강
    {
      name: '차수 중복수강',
      type: 'custom',
      label: '차수 중복수강',
      format: 'string',
      value: '',
    },
    // 사전 레벨테스트
    {
      name: '사전 레벨테스트',
      type: 'custom',
      label: '사전 레벨테스트',
      format: 'string',
      value: '',
    },
    // 교재 배송지 수집
    {
      name: '교재 배송지 수집',
      type: 'custom',
      label: '교재 배송지 수집',
      format: 'string',
      value: '',
    },
  ],
  // validator: {
  //   '승인 결재 라인': {
  //     format: 'string',
  //     required: true,
  //   },
  //   정원: {
  //     format: 'string',
  //     required: true,
  //   },
  //   '수강신청 대기': {
  //     format: 'string',
  //     required: true,
  //   },
  //   '차수 중복수강': {
  //     format: 'string',
  //     required: true,
  //   },
  //   '사전 레벨테스트': {
  //     format: 'string',
  //     required: true,
  //   },
  //   '교재 배송지 수집': {
  //     format: 'string',
  //     required: true,
  //   },
  // },
};
