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
  const [uuid, setUuid] = useState(undefined);

  const { data: moduleData } = useGetModuleDetail(moduleId || 0);

  const { data: contentDetail, refetch: refetchContentDetail } = useQuery({
    ...learningResourceQueryOptions.getContent(uuid || ''),
    enabled: false,
  });

  const [refetchContentUuid, setRefetchContentUuid] = useState(undefined);
  const { data, refetch } = useGetScormDetail(refetchContentUuid || '');

  useEffect(() => {
    if (updateFormData) {
      if (isEditing && moduleData) {
        updateFormData({
          ...moduleData,
          moduleName: moduleData.moduleName,
          moduleType: moduleData.moduleType || MODULE_TYPE.GENERAL,
          description: moduleData.description,
          contentDuration: { ...getHourValueFromTime(moduleData.totalTime) },
          contentUuid: moduleData.contentUuid || '',
        });

        if (moduleData.contentUuid && moduleData.contentUuid.trim() !== '') {
          setUuid(moduleData.contentUuid);
          refetchContentDetail().then((res) => {
            const { data } = res;
            if (data) {
              provider.setValue('contentName', data?.contentName);
              provider.setValue('contentUuid', data?.contentUuid);
            }
          });
        }
      } else if (!isEditing) {
        // 생성 모드일 때는 기본값으로 초기화
        updateFormData({
          moduleType: MODULE_TYPE.GENERAL,
          moduleName: '',
          description: '',
          contentDuration: { hour: 0, minute: 0, second: 0 },
        });
      }
    }
  }, [moduleData]);

  const formContent = (
    <>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="moduleType"
          label="모듈유형"
          format="string"
          value={MODULE_TYPE.GENERAL}
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
          value=""
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
              value=""
              validation={{ required: true }}
              element={
                <ContentChoiceModalSelector
                  // value={contentName || ''}
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
                    if (data) {
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
              value={{ hour: 0, minute: 0, second: 0 }}
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
          name="description"
          label="설명"
          format="string"
          value=""
          element={<Textarea maxLength={100} />}
        />
      </ContentsRow>

      {/* 숨겨진 필드들 */}
      <FormRow2
        provider={provider}
        name="contentUuid"
        format="string"
        value=""
        element={<input type="hidden" />}
      />
      <FormRow2
        provider={provider}
        name="orgnId"
        format="number"
        value={0}
        element={<input type="hidden" />}
      />
    </>
  );
  return formContent;
};
