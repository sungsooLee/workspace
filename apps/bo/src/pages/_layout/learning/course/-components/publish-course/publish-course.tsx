import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { ContentsRow, RadioGroupFormField } from '@learnway/ui';
import { ChipListFormField, FormRow2, FormSubTitle, ThumbnailListFormField } from '@shared/ui';
import { DateRangeFormField } from '@shared/ui/search-box';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TabFormRef } from '../common/tab-form-ref';
import { Course, CourseConfig } from '@types';

interface PublishCourseProps {
  dummy?: any;
  // dynamicForm: UseDynamicFormResult;
  data: { formData: Course; courseConfig: CourseConfig };
}

const PublishCourseComponent = forwardRef<TabFormRef, PublishCourseProps>(
  ({ dummy, data: { formData, courseConfig } }, ref) => {
    const { t } = useTranslation();
    // const { provider, getValues, fetchData } = dynamicForm;
    const { provider, getValues, onSubmit, onFormValid, formState, updateFormData } =
      useDynamicForm2();

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
          data,
          errors,
        };
      },
    }));

    useEffect(() => {
      console.log('PuComponent init');
      // 초기 데이터가 있으면 설정
      if (formData) {
        updateFormData(formData);
      }
    }, [formData]);

    return (
      <div>
        {/*게시*/}
        <FormSubTitle label={t('게시')} />
        {/*과정 사용유무*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'과정 사용유무'}
            label={'과정 사용유무'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
          />
        </ContentsRow>
        {/*노출 기간*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'노출 기간'}
            label={'노출 기간'}
            element={<DateRangeFormField />}
          />
        </ContentsRow>
        {/*대표 이미지*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'대표 이미지'}
            label={'대표 이미지'}
            element={<ThumbnailListFormField />}
          />
        </ContentsRow>
        {/*태그*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'태그'}
            label={'태그'}
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
