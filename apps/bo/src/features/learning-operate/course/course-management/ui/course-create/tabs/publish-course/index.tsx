import { CODE_GROUP, S3_PATH, useDynamicForm2 } from '@learnway/hooks';
import { FormRow2, FormSubTitle } from '@learnway/ui/base-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import { RadioGroupFormField, TextareaFormField } from '@learnway/ui/form-field';

import { ChipListFormField, PeriodPickerFormField, ThumbnailListFormField } from '@shared/ui/form';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCourseCreateSubPage } from '../../../../hooks/use-course-create-sub-page';
import { CourseTabBaseProps } from '../../../../types/type';

const PublishCourseComponent = forwardRef<HTMLElement, CourseTabBaseProps>((_, ref) => {
  const { t } = useTranslation();

  const form = useDynamicForm2();
  const { provider, getValues, watch, onFormChange } = form;
  const { isUpdateMode } = useCourseCreateSubPage(form);

  return (
    <div>
      {/*게시*/}
      <FormSubTitle label={t('게시')} />
      {/*과정 사용*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'isUsed'}
          label={t('과정 사용')}
          format={'boolean'}
          element={
            <RadioGroupFormField
              optionsConfig={{
                codeGroup: CODE_GROUP['mock.options.use'],
              }}
            />
          }
          validation={{ required: true, format: 'boolean' }}
        />
      </ContentsRow>
      {/*노출 기간*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'courseValidityRange'}
          label={t('노출 기간')}
          format={'object'}
          validation={{ required: true, format: 'object' }}
          element={<PeriodPickerFormField datePickerConfig={{ displayType: 'day-time-h' }} />}
        />
      </ContentsRow>
      {/*썸네일*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'thumbnailFileGroupUuid'}
          label={t('대표 이미지')}
          validation={{ required: true, format: 'string' }}
          format={'string'}
          element={
            <ThumbnailListFormField
              uuidType={'group'}
              showDefault={getValues()?.courseType}
              uploadConfig={{
                affairType: 'LMS',
                s3Path: S3_PATH['upload/course/thumbnail'],
              }}
              selected={getValues()?.primaryThumbnailFileUuid}
              onSelected={(selectedThumbnail1: string) =>
                onFormChange({ primaryThumbnailFileUuid: selectedThumbnail1 })
              }
            />
          }
        />
      </ContentsRow>
      {/*태그*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'tagNames'}
          label={t('태그')}
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
          validation={{ required: true, format: 'array' }}
        />
      </ContentsRow>
      {/*AI 과정 요약(AI 자동추출)*/}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'courseSummary'}
          label={t('AI 과정 요약(AI 자동추출)')}
          element={<TextareaFormField maxLength={500} />}
        />
      </ContentsRow>
    </div>
  );
});

export const PublishCourse = PublishCourseComponent;
