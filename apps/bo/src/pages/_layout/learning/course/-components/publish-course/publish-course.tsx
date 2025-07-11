import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { ContentsRow, RadioGroupFormField } from '@learnway/ui';
import { ChipListFormField, FormRow2, FormSubTitle } from '@shared/ui';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseTabBaseProps, TabFormRef } from '../../-common/type';
import { Course } from '@types';
import { DateRangePickerFormField } from '@features/form/ui';

const PublishCourseComponent = forwardRef<TabFormRef, CourseTabBaseProps>(
  ({ onSave, data: { formData, courseConfig } }, ref) => {
    const { t } = useTranslation();
    const { provider, getValues, onFormValid, formState, updateFormData } = useDynamicForm2();

    // 부모 컴포넌트에서 호출할 수 있는 유효성 검사 메서드
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // 모든 필드에 대해 유효성 검사 수행
        const isValid = await onFormValid();
        const data = formDataToRequestData(getValues() as Course);
        const errors = formState.errors;

        return {
          isValid,
          data,
          errors,
        };
      },
      getValues: () => formDataToRequestData(getValues() as Course),
    }));

    useEffect(() => {
      console.log('PuComponent init');
      // 초기 데이터가 있으면 설정
      if (formData) {
        updateFormData(responseDataToFormData(formData));
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
            name={'isUsed'}
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
            name={'courseValidityStartHour'}
            label={'노출 기간'}
            element={<DateRangePickerFormField />}
          />
        </ContentsRow>
        {/*대표 이미지*/}
        {/* <ContentsRow>
          <FormRow2
            provider={provider}
            name={'thumbnailFileGroupUuid'}
            label={'대표 이미지'}
            element={<ThumbnailListFormField />}
          />
        </ContentsRow> */}
        {/*태그*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'tagNames'}
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

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (response: Course): Course => {
  // 리턴
  return response;
};

/**
 * 상세정보 컴포넌트 폼 데이터를 요청 데이터로 변환하는 함수
 *
 * @component Curriculum
 * @param {Course} d - 상세정보 폼 데이터
 * @returns {Course} 상세정보 요청 데이터
 */

export const formDataToRequestData = (d: Course) => {
  return {
    ...d,
  };
};
