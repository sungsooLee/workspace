import { useEffect } from 'react';
import { ContentsRow, Input, RadioGroupFormField, Textarea } from '@learnway/ui';
import { FormRow3, ResourceChoiceModal } from '@shared/ui';
import { MODULE_TYPE } from '@types';
import { t } from 'i18next';
import { ContentChoiceModalSelector } from './content-choice-selector';
import { DurationTimeFormField } from '@features/form/ui';
import { getHourValueFromTime } from '@pages/_layout/learning/resource/-common/common';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { useQuery } from '@tanstack/react-query';

interface ModuleFormProps {
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

export const ModuleForm: React.FC<ModuleFormProps> = ({
  watch,
  setValue,
  loadFormData,
  isEditing,
  initialData,
  curriculumData,
}) => {
  const moduleType = watch('moduleType') || MODULE_TYPE.GENERAL;
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
        loadFormData({
          ...initialData,
          moduleName: initialData.moduleName,
          moduleType: initialData.moduleType || MODULE_TYPE.GENERAL,
          description: initialData.description,
          contentDuration: { ...getHourValueFromTime(initialData.totalTime) },
          contentUuid: initialData.contentUuid || '',
          contentName: '', // 초기값은 빈 문자열, contentDetail 로드 후 설정됨
        });
      } else if (!isEditing) {
        // 생성 모드일 때는 기본값으로 초기화
        loadFormData({
          moduleType: MODULE_TYPE.GENERAL,
          moduleName: '',
          description: '',
          contentDuration: { hour: 0, minute: 0, second: 0 },
        });
      }
    }
    // loadFormData를 의존성에서 제거하여 무한 루프 방지
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, initialData]);

  useEffect(() => {
    if (isEditing && contentDetail && setValue) {
      setValue('contentName', contentDetail.contentName);
    }
  }, [isEditing, contentDetail, setValue]);

  const formContent = (
    <>
      <ContentsRow>
        <FormRow3
          name="moduleType"
          label="모듈유형"
          validation={{ required: true }}
          defaultValue={MODULE_TYPE.GENERAL}
          element={
            <RadioGroupFormField
              disabled={isEditing}
              options={[
                { label: '목차', value: MODULE_TYPE.GENERAL },
                { label: '스콤', value: MODULE_TYPE.FIXED },
              ]}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow3
          name="moduleName"
          label={'모듈명'}
          validation={{ required: true }}
          element={<Input type="text" maxLength={40} />}
        />
      </ContentsRow>

      {moduleType === MODULE_TYPE.FIXED && (
        <>
          <ContentsRow>
            <FormRow3
              name="contentUuid"
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
                        initialContentType={curriculumData?.contentType || 'SCORM'}
                      />
                    ),
                  }}
                  transformModalData={(data: any) => {
                    if (data && data.contentUuid) {
                      return {
                        contentUuid: data.contentUuid,
                        contentName: data.contentName,
                      };
                    }
                    return {
                      contentUuid: '',
                      contentName: '',
                    };
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow3
              name="contentDuration"
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
        </>
      )}
      <ContentsRow>
        <FormRow3 name="description" label="설명" element={<Textarea maxLength={100} />} />
      </ContentsRow>
    </>
  );
  return formContent;
};
