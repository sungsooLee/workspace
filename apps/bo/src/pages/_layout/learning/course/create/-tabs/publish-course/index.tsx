import { DateRangePickerFormField } from '@features/form/ui';
import { CODE_GROUP, S3_PATH, useDynamicForm2 } from '@learnway/hooks';
import { ContentsRow, FormSubTitle, RadioGroupFormField, TextareaFormField } from '@learnway/ui';
import { ChipListFormField, FormRow2, ThumbnailListFormField } from '@shared/ui';
import { Course } from '@types';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseTabBaseProps, CourseTabFormRef } from '../../../-common/type';
import { useCourseCreateSubPage } from '../../../-hooks/use-course-create-sub-page';

const PublishCourseComponent = forwardRef<CourseTabFormRef, CourseTabBaseProps>((_, ref) => {
  const { t } = useTranslation();

  const form = useDynamicForm2();
  const { provider, getValues, watch, onFormChange } = form;

  const { courseConfig } = useCourseCreateSubPage(form);

  const channelUuid = watch('channelUuid');
  const courseType = watch('courseType');

  console.log('----- basic', {
    channelUuid,
    courseType,
    values: getValues(),
  });

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
          element={<DateRangePickerFormField displayType={'day-time-h'} />}
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
              selected={getValues()?.primaryThumbnailFileUuid}
              onSelected={(selectedThumbnail1: string) =>
                onFormChange({ primaryThumbnailFileUuid: selectedThumbnail1 })
              }
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
});

export const PublishCourse = PublishCourseComponent;

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (d: Course): Course => {
  // 리턴
  return {
    ...d,
    courseValidityRange: {
      from: d.courseValidityStartDateTime, // 과정 유효 시작일
      to: d.courseValidityEndDateTime, // 과정 유효 종료일
    },
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
    courseValidityStartDateTime: d.courseValidityRange?.from, // 과정 유효 시작일
    courseValidityEndDateTime: d.courseValidityRange?.to, // 과정 유효 종료일
    // courseValidityStartHour: 0, // 과정 노출 시작 시각 (삭제 후 courseValidityStartDate에 통합 예정)
    // courseValidityEndHour: 23, // 과정 노출 종료 시각 (삭제 후 courseValidityEndDate에 통합 예정)
    // thumbnailFileGroupUuid: '1', // 썸네일 이미지 Group UUID
    // primaryThumbnailFileUuid: '1', // 대표 썸네일 이미지 UUID
    // tagNames: d.tagNames?.map((item: any) => ({ value: item?.tagName })), // 태그
  };
};
