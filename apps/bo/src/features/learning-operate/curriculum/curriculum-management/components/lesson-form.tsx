import { useEffect } from 'react';
import { ContentsRow, Input, RadioGroupFormField, Textarea } from '@learnway/ui';
import { FormRow3, ResourceChoiceModal } from '@shared/ui';
import { LESSON_TYPE, MODULE_TYPE } from '@types';
import { t } from 'i18next';
import { ContentChoiceModalSelector } from './content-choice-selector';
import { DropdownFormField, DurationTimeFormField } from '@features/form/ui';
import { getHourValueFromTime } from '@pages/_layout/learning/resource/-common/common';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { useQuery } from '@tanstack/react-query';

interface LessonFormProps {
  watch: any;
  setValue?: any;
  loadFormData?: (data: Record<string, any>, options?: any) => void;
  isEditing?: boolean;
  initialData?: any;
  curriculumData?: {
    tenantId?: number;
    channelUuid?: string;
    contentType?: string;
  };
}

export const LessonForm: React.FC<LessonFormProps> = ({
  watch,
  setValue,
  loadFormData,
  isEditing,
  initialData,
  curriculumData,
}) => {
  const lessonType = watch('lessonType') || LESSON_TYPE.GENERAL;
  const contentUuid = watch('contentUuid');
  const contentName = watch('contentName');

  const { data: contentDetail } = useQuery({
    ...learningResourceQueryOptions.getContent(contentUuid),
    enabled: isEditing && !!contentUuid,
  });

  // 편집 모드일 때 초기 데이터 로드, 생성 모드일 때는 기본값으로 초기화
  useEffect(() => {
    if (loadFormData) {
      if (isEditing && initialData) {
        // 편집 모드: 완전 초기화 후 새 데이터 로드
        const formData = {
          ...initialData,
          learningTime: { ...getHourValueFromTime(initialData.learningTime) },
          contentUuid: initialData.contentUuid || '',
          contentName: '', // 초기값은 빈 문자열, contentDetail 로드 후 설정됨
        };
        loadFormData(formData, { clearBeforeLoad: true });
      } else if (!isEditing) {
        // 생성 모드일 때는 기본값으로 초기화
        const formData = {
          lessonType: LESSON_TYPE.GENERAL,
          lessonName: '',
          description: '',
          learningTime: { hour: 0, minute: 0, second: 0 },
          contentUuid: '',
          contentName: '',
        };
        loadFormData(formData, { clearBeforeLoad: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, initialData]);

  useEffect(() => {
    // if(autoCon)
  }, [lessonType]);

  useEffect(() => {
    if (isEditing && contentDetail && setValue) {
      setValue('contentName', contentDetail.contentName);
    }
  }, [isEditing, contentDetail, setValue]);

  const formContent = (
    <>
      <ContentsRow>
        <FormRow3
          name="lessonType"
          label="레슨유형"
          validation={{ required: true }}
          defaultValue={LESSON_TYPE.GENERAL}
          element={
            <RadioGroupFormField
              disabled={isEditing}
              options={[
                { label: '목차', value: LESSON_TYPE.GENERAL },
                { label: '자원', value: LESSON_TYPE.RESOURCE },
              ]}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow3
          name="lessonName"
          label={'레슨명'}
          validation={{ required: true }}
          element={<Input type="text" maxLength={40} />}
        />
      </ContentsRow>

      {lessonType === LESSON_TYPE.RESOURCE && (
        <>
          <ContentsRow>
            <FormRow3
              name="contentType"
              label={t('학습자원 유형')}
              validation={{ required: true }}
              element={
                <DropdownFormField
                  presetOptionLabel={t('LABEL.form.label.select', '선택')}
                  optionsConfig={{
                    codeGroup: 'cms.content.ContentType',
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow3
              name="contentName"
              label={t('학습자원')}
              validation={{ required: true }}
              element={
                <ContentChoiceModalSelector
                  value={contentName || ''}
                  disabled={isEditing}
                  modalConfig={{
                    content: (
                      <ResourceChoiceModal
                        initialTenantId={curriculumData?.tenantId}
                        initialChannelUuid={curriculumData?.channelUuid}
                        // initialContentType={curriculumData?.contentType}
                      />
                    ),
                  }}
                  transformModalData={(data: any) => {
                    console.log(data);
                    const { contentUuid, contentName } = data;
                    if (data) {
                      console.log(contentUuid, contentName);
                      setValue('contentUuid', contentUuid, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setValue('contentName', contentName, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });

                      return contentName;
                    }
                    return contentName;
                  }}
                />
              }
            />
          </ContentsRow>
        </>
      )}
      <ContentsRow>
        <FormRow3
          name="learningTime"
          label={t('학습시간')}
          validation={{
            required: true,
            validate: (value: { hour: number; minute: number; second: number }) => {
              if (!value) return t('학습시간을 입력해주세요.');
              const { hour = 0, minute = 0, second = 0 } = value;
              if (!(hour > 0 || minute > 0 || second > 0)) {
                return t('학습시간은 1초 이상으로 설정하여야 합니다.');
              }
              return true;
            },
          }}
          element={<DurationTimeFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow3 name="description" label="설명" element={<Textarea maxLength={100} />} />
      </ContentsRow>
    </>
  );
  return formContent;
};
