import { useEffect, useRef } from 'react';
import { ContentsRow, Input, RadioGroupFormField, Textarea } from '@learnway/ui';
import { FormRow2, ResourceChoiceModal } from '@shared/ui';
import { DynamicFormProvider } from '@learnway/hooks';
import { LESSON_TYPE } from '@types';
import { t } from 'i18next';
import { ContentChoiceModalSelector } from './content-choice-selector';
import { DropdownFormField, DurationTimeFormField } from '@features/form/ui';
import { getHourValueFromTime } from '@pages/_layout/learning/resource/-common/common';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { useQuery } from '@tanstack/react-query';
import { useGetLessonDetail } from '../../../../../entities/curriculum';

interface LessonFormProps {
  provider: DynamicFormProvider;
  updateFormData: (data: Record<string, any>) => void;
  watch: any;
  isEditing?: boolean;
  lessonId?: number;
  moduleId?: number;
  clearAllValidators?: () => void;
  curriculumData?: {
    tenantId?: number;
    channelUuid?: string;
    contentType?: string;
  };
  selectedNodeData?: any;
}

export const LessonForm: React.FC<LessonFormProps> = ({
  provider,
  updateFormData,
  watch,
  isEditing,
  lessonId,
  moduleId,
  clearAllValidators,
  curriculumData,
}) => {
  const lessonType = watch('lessonType') || LESSON_TYPE.GENERAL;
  const contentName = watch('contentName');

  const { data: lessonData } = useGetLessonDetail({ lessonId, moduleId });

  // contentUuid가 있을 때만 쿼리 실행
  const { data: contentDetail, refetch: refetchContentDetail } = useQuery({
    ...learningResourceQueryOptions.getContent(lessonData?.contentUuid || ''),
    enabled: !!(isEditing && lessonData?.contentUuid && lessonData.contentUuid.trim() !== ''),
  });

  // 초기 데이터 설정을 한 번만 수행하기 위한 ref
  const initialDataSetRef = useRef(false);

  useEffect(() => {
    if (isEditing && lessonData && !initialDataSetRef.current) {
      setTimeout(() => {
        const initialData = {
          ...lessonData,
          lessonName: lessonData.lessonName,
          lessonType: lessonData.lessonType || LESSON_TYPE.GENERAL,
          lessonDescription: lessonData.lessonDescription,
          learningTime: getHourValueFromTime(lessonData.learningTime),
          contentUuid: lessonData.contentUuid || '',
          contentName: lessonData.contentName || '',
        };

        Object.entries(initialData).forEach(([key, value]) => {
          provider.setValue(key, value);
        });

        initialDataSetRef.current = true;
      }, 50);
    } else if (!isEditing && !initialDataSetRef.current) {
      const defaultData = {
        lessonType: LESSON_TYPE.GENERAL,
        lessonName: '',
        lessonDescription: '',
        learningTime: { hour: 0, minute: 0, second: 0 },
        contentUuid: '',
        contentName: '',
      };

      Object.entries(defaultData).forEach(([key, value]) => {
        provider.setValue(key, value);
      });

      initialDataSetRef.current = true;
    }
    // }
  }, [lessonData, isEditing, provider]);

  useEffect(() => {
    return () => {
      initialDataSetRef.current = false;
    };
  }, []);

  useEffect(() => {
    initialDataSetRef.current = false;
  }, [lessonId, isEditing]);

  useEffect(() => {
    if (isEditing && contentDetail && contentDetail.contentName) {
      provider.setValue('contentName', contentDetail.contentName);
      provider.setValue('contentUuid', contentDetail.contentUuid);
    }
  }, [contentDetail, provider, isEditing]);

  const formContent = (
    <>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="lessonType"
          label="레슨유형"
          format="string"
          validation={{ required: true }}
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
        <FormRow2
          provider={provider}
          name="lessonName"
          label={'레슨명'}
          format="string"
          validation={{ required: true }}
          element={<Input type="text" maxLength={40} />}
        />
      </ContentsRow>

      {lessonType === LESSON_TYPE.RESOURCE && (
        <>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="contentType"
              label={t('학습자원 유형')}
              format="string"
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
            <FormRow2
              provider={provider}
              name="contentName"
              label={t('학습자원')}
              format="string"
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
                    const { contentUuid, contentName } = data;
                    if (data && contentUuid && contentName) {
                      provider.setValue('contentUuid', contentUuid);
                      provider.setValue('contentName', contentName);
                      return contentName;
                    }
                    return '';
                  }}
                />
              }
            />
          </ContentsRow>
        </>
      )}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="learningTime"
          label={t('학습시간')}
          format="object"
          validation={{
            required: true,
            conditions: [
              {
                fn: (values: Record<string, any>) => {
                  const value = values.learningTime;
                  if (!value) return true; // 값이 없으면 에러
                  const { hour = 0, minute = 0, second = 0 } = value;
                  return !(hour > 0 || minute > 0 || second > 0); // 모든 값이 0이면 에러
                },
                message: t('학습시간은 1초 이상으로 설정하여야 합니다.'),
              },
            ],
          }}
          element={
            <DurationTimeFormField
              key={`learningTime-${lessonId || 'new'}-${isEditing ? 'edit' : 'create'}`}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="lessonDescription"
          label="설명"
          format="string"
          element={<Textarea maxLength={100} />}
        />
      </ContentsRow>

      <FormRow2
        provider={provider}
        name="contentUuid"
        format="string"
        element={<input type="hidden" />}
      />
    </>
  );
  return formContent;
};
