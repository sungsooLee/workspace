import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { ContentsRow, RadioGroupFormField } from '@learnway/ui';
import { ChipListFormField, FormRow, FormSubTitle, ThumbnailListFormField } from '@shared/ui';
import { DateRangeFormField } from '@shared/ui/search-box';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TabFormRef } from '../common/tab-form-ref';

interface PublishCourseProps {
  dummy?: any;
  // dynamicForm: UseDynamicFormResult;
  initialData?: any;
}

const PublishCourseComponent = forwardRef<TabFormRef, PublishCourseProps>(
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
      console.log('PuComponent init');
      // 초기 데이터가 있으면 설정
      if (initialData) {
        fetchData(initialData);
      }
    }, [initialData]);

    return (
      <div>
        {/*게시*/}
        <FormSubTitle label={t('게시')} lineType={'dark'} />
        {/*과정 사용유무*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'과정 사용유무'}
            element={
              <RadioGroupFormField
                options={[
                  {
                    label: '옵션1',
                    value: '옵션1',
                  },
                  {
                    label: '옵션2',
                    value: '옵션2',
                  },
                ]}
              />
            }
          />
        </ContentsRow>
        {/*노출 기간*/}
        <ContentsRow>
          <FormRow provider={provider} name={'노출 기간'} element={<DateRangeFormField />} />
        </ContentsRow>
        {/*대표 이미지*/}
        <ContentsRow>
          <FormRow provider={provider} name={'대표 이미지'} element={<ThumbnailListFormField />} />
        </ContentsRow>
        {/*태그*/}
        <ContentsRow>
          <FormRow
            provider={provider}
            name={'태그'}
            element={
              <ChipListFormField
                chipListConfig={{
                  showInput: true,
                  wordwrap: true,
                }}
              />
            }
          />
        </ContentsRow>
      </div>
    );
  },
);

export const PublishCourse = PublishCourseComponent;

const formConfig: DynamicFormConfig = {
  builders: [
    // 과정 사용유무
    {
      name: '과정 사용유무',
      type: 'custom',
      label: '과정 사용유무',
      format: 'string',
      value: '',
    },
    // 노출 기간
    {
      name: '노출 기간',
      type: 'custom',
      label: '노출 기간',
      format: 'string',
      value: '',
    },
    // 대표 이미지
    {
      name: '대표 이미지',
      type: 'custom',
      label: '대표 이미지',
      format: 'string',
      value: '',
    },
    // 태그
    {
      name: '태그',
      type: 'custom',
      label: '태그',
      format: 'array',
      value: [],
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
