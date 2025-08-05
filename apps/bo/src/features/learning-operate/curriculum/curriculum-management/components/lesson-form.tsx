import { LESSON_TYPE, MODULE_TYPE, useGetLessonDetail } from '@entities/curriculum';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { DropdownFormField, DurationTimeFormField } from '@features/form/ui';
import { DynamicFormProvider } from '@learnway/hooks';
import { IcoPlus } from '@learnway/icons';
import { getHourValueFromTime } from '@learnway/shared';
import subTitleStyles from '@learnway/styles/bo/assets/styles/modules/form-sub-title.module.css';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { RadioGroupFormField } from '@learnway/ui/form-field';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { Textarea } from '@learnway/ui/textarea';
import { DropdownOption } from '@learnway/ui/type';
import { FormRow2, ResourceChoiceModal } from '@shared/ui';
import { PreviewLearningWindow } from '@shared/ui/modal/preview-learning-window';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { useEffect } from 'react';
import { ContentChoiceModalSelector } from './content-choice-selector';

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
  parentNode?: any;
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
  parentNode,
}) => {
  const { openModal } = useModal();
  const lessonType = watch('lessonType') || LESSON_TYPE.GENERAL;
  const contentName = watch('contentName');

  // FIXED 모듈의 하위 레슨인지 확인
  const isFixedModuleLesson = parentNode?.data?.moduleType === MODULE_TYPE.FIXED;

  const { data: lessonData, isLoading: isLoadingLesson } = useGetLessonDetail({
    lessonId,
    moduleId,
  });

  // contentUuid가 있을 때만 쿼리 실행
  const { data: contentDetail, isLoading: isLoadingContent } = useQuery({
    ...learningResourceQueryOptions.getContent(lessonData?.contentUuid || ''),
    enabled: !!(isEditing && lessonData?.contentUuid && lessonData.contentUuid.trim() !== ''),
  });

  useEffect(() => {
    if (isEditing && lessonData) {
      const initialData = {
        ...lessonData,
        lessonName: lessonData.lessonName,
        lessonType: lessonData.lessonType || LESSON_TYPE.GENERAL,
        lessonDescription: lessonData.lessonDescription,
        learningTime: { ...getHourValueFromTime(lessonData.learningTime) },
        contentUuid: lessonData.contentUuid || '',
        contentName: contentDetail?.contentName || lessonData.contentName || '',
      };

      Object.entries(initialData).forEach(([key, value]) => {
        provider.setValue(key, value);
      });
    } else if (!isEditing) {
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
    }
    // }
  }, [lessonData]);

  useEffect(() => {
    if (isEditing && contentDetail && contentDetail.contentName && !isLoadingContent) {
      provider.setValue('contentName', contentDetail.contentName);
      provider.setValue('contentUuid', contentDetail.contentUuid);
    }
  }, [contentDetail, isEditing, isLoadingContent]);

  const renderResourceButtons = () => {
    return (
      <div className={subTitleStyles.input_area}>
        <Button variant="text" size="sm" className={subTitleStyles.btn_text}>
          정보보기
        </Button>
        <Button
          variant="text"
          size="sm"
          className={subTitleStyles.btn_text}
          onClick={() => {
            const contentUuid = provider.getValues('contentUuid');
            if (contentUuid)
              openModal({
                width: 'full',
                content: <PreviewLearningWindow contentUuid={contentUuid} />,
              });
          }}
        >
          미리보기
        </Button>
        <Button
          variant="text"
          size="sm"
          className={subTitleStyles.btn_text}
          icon={<IcoPlus stroke={'#4C515E'} />}
          disabled={isEditing}
        >
          자원등록
        </Button>
      </div>
    );
  };

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
              label={t('교육자원 유형')}
              format="string"
              validation={{ required: true }}
              element={
                <DropdownFormField
                  disabled={isEditing}
                  presetOptionLabel={t('LABEL.form.label.select', '선택')}
                  optionsConfig={{
                    codeGroup: 'cms.content.ContentType',
                    transformOptions: (options: any) =>
                      options.filter((opt: DropdownOption) => opt.value !== 'SCORM'),
                  }}
                />
              }
            />
          </ContentsRow>
          {!isFixedModuleLesson && (
            <ContentsRow>
              <FormRow2
                provider={provider}
                name="contentName"
                label={t('교육자원')}
                format="string"
                disabled={isEditing}
                validation={{ required: true }}
                infoNode={renderResourceButtons()}
                element={
                  <ContentChoiceModalSelector
                    value={contentName || ''}
                    disabled={isEditing}
                    modalConfig={{
                      content: (
                        <ResourceChoiceModal
                          initialTenantId={curriculumData?.tenantId}
                          initialChannelUuid={curriculumData?.channelUuid}
                          initialContentType={provider.getValues('contentType') || ''}
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
          )}
        </>
      )}
      {!isFixedModuleLesson && (
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
            element={<DurationTimeFormField />}
          />
        </ContentsRow>
      )}
      {!isFixedModuleLesson && (
        <ContentsRow>
          <FormRow2
            provider={provider}
            name="lessonDescription"
            label="설명"
            format="string"
            element={<Textarea maxLength={100} />}
          />
        </ContentsRow>
      )}

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
