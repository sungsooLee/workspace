import { ContentsRow, DynamicFormField } from '@learnway/ui';
import React, { forwardRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormRow, FormSubTitle } from '@shared/ui';
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
        <ContentsRow type={'horizontal'} className={'inactive'}>
          <FormRow provider={provider}>
            <DynamicFormField name={'수강신청여부'} />
          </FormRow>
        </ContentsRow>
        {/*수강신청 기본정보*/}
        <FormSubTitle label={'수강신청 기본정보'} />
        {/*수강신청 기본정보 > 수강신청 승인자*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'수강신청 승인자'} />
          </FormRow>
        </ContentsRow>
        {/*수강신청 기본정보 > 수강신청 정원*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'수강신청 정원'} />
          </FormRow>
        </ContentsRow>
        {/*수강신청 기본정보 > 수강신청 대기자*/}
        <ContentsRow type={'horizontal'} className={'inactive'}>
          <FormRow provider={provider}>
            <DynamicFormField name={'수강신청 대기자'} />
          </FormRow>
        </ContentsRow>
        {/*수강신청 기본정보 > 수강신청 취소 기간*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'수강신청 취소 기간'} />
          </FormRow>
        </ContentsRow>
        {/*수강신청 기본정보 > 중복 수강 신청*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'중복 수강 신청'} />
          </FormRow>
        </ContentsRow>
        {/*수강신청 기본정보 > 학습기간 중복예외 처리*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'학습기간 중복예외 처리'} />
          </FormRow>
        </ContentsRow>
        {/*수강신청 시 수집 정보*/}
        <FormSubTitle label={'수강신청 시 수집 정보'} />
        {/*수강신청 시 수집 정보 > 사전 레벨테스트*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'사전 레벨테스트'} />
          </FormRow>
        </ContentsRow>
        {/*수강신청 시 수집 정보 > 교재 배송지 입력 여부*/}
        <ContentsRow>
          <FormRow provider={provider}>
            <DynamicFormField name={'교재 배송지 입력 여부'} />
          </FormRow>
        </ContentsRow>
      </div>
    );
  },
);

export const CourseRegistration = CourseRegistrationComponent;
