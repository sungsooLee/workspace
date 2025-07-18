import { DateTimeRangePickerFormField } from '@features/form/ui';
import { CODE_GROUP, S3_PATH, useDynamicForm2 } from '@learnway/hooks';
import { ContentsRow, FormSubTitle, RadioGroupFormField, TextareaFormField } from '@learnway/ui';
import { ChipListFormField, FormRow2, ThumbnailListFormField } from '@shared/ui';
import { Course } from '@types';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseTabBaseProps, CourseTabFormRef } from '../../../-common/type';

const PublishCourseComponent = forwardRef<CourseTabFormRef, CourseTabBaseProps>(
  ({ onSave, data: { formData, courseConfig } }, ref) => {
    const { t } = useTranslation();
    const { provider, getValues, onFormValid, formState, updateFormData, formValues } =
      useDynamicForm2();

    // 부모 컴포넌트에서 호출할 수 있는 메서드
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // 모든 필드에 대해 유효성 검사 수행
        const isValid = await onFormValid();
        const data = formDataToRequestData(formValues as Course);
        const errors = formState.errors;

        return {
          isValid,
          data,
          errors,
        };
      },
      getValues: () => formDataToRequestData(formValues as Course),
    }));

    useEffect(() => {
      // 초기 데이터가 있으면 설정
      if (formData) {
        console.log('updateFormData init', formData);
        updateFormData(responseDataToFormData(formData));
      }
    }, [formData]);

    return (
      <div>
        {/*게시*/}
        <FormSubTitle label={t('게시')} />
        {/*과정 사용*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'isUsed'}
            label={'과정 사용'}
            format={'boolean'}
            element={
              <RadioGroupFormField
                optionsConfig={{
                  codeGroup: CODE_GROUP['mock.options.use'],
                }}
              />
            }
            validation={{ required: true }}
          />
        </ContentsRow>
        {/*노출 기간*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'courseValidityRange'}
            label={'노출 기간'}
            format={'object'}
            element={<DateTimeRangePickerFormField />}
            validation={{ required: true }}
          />
        </ContentsRow>
        {/*썸네일*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'thumbnailFileGroupUuid'}
            label={t('대표 이미지')}
            format={'string'}
            element={
              <ThumbnailListFormField
                uuidType={'group'}
                uploadConfig={{
                  affairType: 'LMS',
                  s3Path: S3_PATH['upload/course/thumbnail'],
                }}
                // selected={selectedThumbnail1}
                // onSelected={handleSelected}
              />
            }
          />
        </ContentsRow>
        {/*태그*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'tagNames'}
            label={'태그'}
            format={'array'}
            element={
              <ChipListFormField
                chipListConfig={{
                  showInput: true,
                  wordwrap: true,
                  labelField: 'tagName',
                  valueField: 'tagId',
                }}
              />
            }
            validation={{ required: true }}
          />
        </ContentsRow>
        {/*AI 과정 요약(AI 자동추출)*/}
        <ContentsRow>
          <FormRow2
            provider={provider}
            name={'courseSummary'}
            label={'AI 과정 요약(AI 자동추출)'}
            element={<TextareaFormField maxLength={500} />}
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
const responseDataToFormData = (d: Course): Course => {
  // 리턴
  return {
    ...d,
    courseValidityRange: [
      d.courseValidityStartDate, // 과정 유효 시작일
      d.courseValidityEndDate, // 과정 유효 종료일
    ],
    // tagNameArray: d.tagNames?.map((item) => item.value), // 태그
  };
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
    courseValidityStartDate: d.courseValidityRange?.[0], // 과정 유효 시작일
    courseValidityEndDate: d.courseValidityRange?.[1], // 과정 유효 종료일
    courseValidityStartHour: 0, // 과정 노출 시작 시각 (삭제 후 courseValidityStartDate에 통합 예정)
    courseValidityEndHour: 23, // 과정 노출 종료 시각 (삭제 후 courseValidityEndDate에 통합 예정)
    // thumbnailFileGroupUuid: '1', // 썸네일 이미지 Group UUID
    primaryThumbnailFileUuid: '1', // 대표 썸네일 이미지 UUID
    tagNames: d.tagNames?.map((item: any) => ({ value: item?.tagName })), // 태그
  };
};
