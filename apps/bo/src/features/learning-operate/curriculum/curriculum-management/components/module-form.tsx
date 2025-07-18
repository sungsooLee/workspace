import { useEffect, useState, useRef } from 'react';
import { ContentsRow, Input, RadioGroupFormField, Textarea } from '@learnway/ui';
import { FormRow2, ResourceChoiceModal } from '@shared/ui';
import { DynamicFormProvider } from '@learnway/hooks';
import { MODULE_TYPE } from '@types';
import { t } from 'i18next';
import { ContentChoiceModalSelector } from './content-choice-selector';
import { DurationTimeFormField } from '@features/form/ui';
import { getHourValueFromTime } from '@pages/_layout/learning/resource/-common/common';
import { learningResourceQueryOptions } from '@entities/learning-resource';
import { useQuery } from '@tanstack/react-query';
import { useGetScormDetail } from '@entities/contents';
import { useGetModuleDetail } from '@entities/curriculum';

interface ModuleFormProps {
  provider: DynamicFormProvider;
  updateFormData: (data: Record<string, any>) => void;
  watch: any;
  isEditing?: boolean;
  moduleId?: number;
  curriculumData?: {
    tenantId?: number;
    channelUuid?: string;
    contentType?: string;
  };
}

export const ModuleForm: React.FC<ModuleFormProps> = ({
  provider,
  updateFormData,
  watch,
  isEditing,
  moduleId,
  curriculumData,
}) => {
  const moduleType = watch('moduleType') || MODULE_TYPE.GENERAL;
  const contentName = watch('contentName');

  const { data: moduleData } = useGetModuleDetail(moduleId || 0);

  // contentUuid가 있을 때만 쿼리 실행
  const { data: contentDetail, isLoading: isLoadingContent } = useQuery({
    ...learningResourceQueryOptions.getContent(moduleData?.contentUuid || ''),
    enabled: !!(isEditing && moduleData?.contentUuid && moduleData.contentUuid.trim() !== ''),
  });

  const [refetchContentUuid, setRefetchContentUuid] = useState(undefined);
  const { data, refetch } = useGetScormDetail(refetchContentUuid || '');

  // 초기 데이터 설정을 한 번만 수행하기 위한 ref

  useEffect(() => {
    if (isEditing && moduleData) {
      const initialData = {
        ...moduleData,
        moduleName: moduleData.moduleName,
        moduleType: moduleData.moduleType || MODULE_TYPE.GENERAL,
        moduleDescription: moduleData.moduleDescription,
        contentDuration: { ...getHourValueFromTime(moduleData.totalTime) },
        contentUuid: moduleData.contentUuid || '',
        contentName: moduleData.contentName || '',
      };

      Object.entries(initialData).forEach(([key, value]) => {
        provider.setValue(key, value);
      });
    } else if (!isEditing) {
      const defaultData = {
        moduleType: MODULE_TYPE.GENERAL,
        moduleName: '',
        moduleDescription: '',
        contentDuration: { hour: 0, minute: 0, second: 0 },
        contentUuid: '',
        contentName: '',
      };

      Object.entries(defaultData).forEach(([key, value]) => {
        provider.setValue(key, value);
      });
    }
  }, [moduleData]);

  // contentDetail이 로드되면 contentName 설정 (편집 모드에서만)
  useEffect(() => {
    if (isEditing && contentDetail && contentDetail.contentName && !isLoadingContent) {
      console.log(contentDetail.contentName);
      provider.setValue('contentName', contentDetail.contentName);
      provider.setValue('contentUuid', contentDetail.contentUuid);
    }
  }, [contentDetail, isEditing, isLoadingContent]);

  const formContent = (
    <>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="moduleType"
          label="모듈유형"
          format="string"
          validation={{ required: true }}
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
        <FormRow2
          provider={provider}
          name="moduleName"
          label={'모듈명'}
          format="string"
          validation={{ required: true }}
          element={<Input type="text" maxLength={40} />}
        />
      </ContentsRow>

      {moduleType === MODULE_TYPE.FIXED && (
        <>
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
                        initialContentType={curriculumData?.contentType || 'SCORM'}
                      />
                    ),
                  }}
                  transformModalData={(data: any) => {
                    const { contentUuid, contentName } = data;
                    if (data && contentUuid && contentName) {
                      console.log(data);
                      setRefetchContentUuid(contentUuid);
                      setTimeout(() => {
                        refetch().then((res) => {
                          const { data } = res;
                          if (data && data.children) {
                            const orgnId = data.children[0].orgnId;
                            if (orgnId) provider.setValue('orgnId', orgnId);
                          }
                        });
                      }, 0);
                      provider.setValue('contentName', contentName);
                      provider.setValue('contentUuid', contentUuid);
                      return contentName;
                    }
                    return '';
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="contentDuration"
              label={t('학습시간')}
              format="object"
              validation={{
                required: true,
                conditions: [
                  {
                    fn: (values: Record<string, any>) => {
                      const value = values.contentDuration;
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
        </>
      )}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="moduleDescription"
          label="설명"
          format="string"
          element={<Textarea maxLength={100} />}
        />
      </ContentsRow>

      {/* 숨겨진 필드들 */}
      <FormRow2
        provider={provider}
        name="contentUuid"
        format="string"
        element={<input type="hidden" />}
      />
      <FormRow2
        provider={provider}
        name="orgnId"
        format="number"
        element={<input type="hidden" />}
      />
    </>
  );
  return formContent;
};
