import { CODE_GROUP, useDynamicForm2 } from '@learnway/hooks';
import { ContentsRow, RadioGroupFormField } from '@learnway/ui';
import { ChipListFormField, FormRow2, FormSubTitle, ThumbnailListFormField } from '@shared/ui';
import { DateRangeFormField } from '@shared/ui/search-box';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseTabBaseProps, TabFormRef } from '../../-common/type';
import { Course } from '@types';

const PublishCourseComponent = forwardRef<TabFormRef, CourseTabBaseProps>(
  ({ onSave, data: { formData, courseConfig } }, ref) => {
    const { t } = useTranslation();
    const { provider, getValues, onFormValid, formState, updateFormData } = useDynamicForm2();

    // 부모 컴포넌트에서 호출할 수 있는 유효성 검사 메서드
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // 모든 필드에 대해 유효성 검사 수행
        const isValid = await onFormValid();
        const data = formDataToRequestData(getValues());
        const errors = formState.errors;

        return {
          isValid,
          data,
          errors,
        };
      },
      getValues: () => {
        console.log('getValues', getValues());
        return getValues();
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
        {/* <ContentsRow>
          <FormRow2
            provider={provider}
            name={'대표 이미지'}
            label={'대표 이미지'}
            element={<ThumbnailListFormField />}
          />
        </ContentsRow> */}
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

/**
 * 게시설정 컴포넌트 폼 데이터를 요청 데이터로 변환하는 함수
 *
 * @component PublishCourse
 * @param {Course} d - 게시설정 폼 데이터
 * @returns {Course} 게시설정 요청 데이터
 */

export const formDataToRequestData = (d: Course) => {
  // 교육공간 라디오 선택에 따라 값 변경 관련 처리 (교육공간=learningSpaceType)
  // 차세데 학습학습 플랫폼
  if (d.learningSpaceType === 'LEARNING_WAY') {
    d.learningSpaceId = undefined; // 교육 장소 ID
    d.learningSpaceName = undefined; // 교육 장소(선택입력)
    d.learningSpaceNameKeyIn = undefined; // 교육 장소 직접입력
  }
  // 공간선택
  else if (d.learningSpaceType === 'REGISTERED') {
    d.learningSpaceNameKeyIn = undefined; // 교육 장소 직접입력
  }
  // 직적입력
  else if (d.learningSpaceType === 'MANUAL') {
    d.learningSpaceId = undefined; // 교육 장소 ID
    d.learningSpaceName = undefined; // 교육 장소(선택입력)
  }
  return d;
};
