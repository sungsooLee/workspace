import { useEffect } from 'react';
import { ContentsRow, Input, RadioGroupFormField, Textarea } from '@learnway/ui';
import { FormRow3 } from '@shared/ui';
import { MODULE_TYPE } from '@types';
import { t } from 'i18next';

interface ModuleFormProps {
  watch: any;
  setValue?: any;
  loadFormData?: (data: Record<string, any>, options?: any) => void;
  isEditing?: boolean;
  initialData?: any;
}

export const ModuleForm: React.FC<ModuleFormProps> = ({
  watch,
  setValue,
  loadFormData,
  isEditing,
  initialData,
}) => {
  const moduleType = watch('moduleType') || MODULE_TYPE.GENERAL;

  // 편집 모드일 때 초기 데이터 로드, 생성 모드일 때는 기본값으로 초기화
  useEffect(() => {
    if (loadFormData) {
      if (isEditing && initialData) {
        console.log(initialData);
        loadFormData({
          moduleName: initialData.moduleName,
          moduleType: initialData.moduleType || MODULE_TYPE.GENERAL,
          description: initialData.description,
          ...(initialData.moduleOrder && { moduleOrder: initialData.moduleOrder }),
        });
      } else if (!isEditing) {
        // 생성 모드일 때는 기본값으로 초기화
        loadFormData({
          moduleType: MODULE_TYPE.GENERAL,
          moduleName: '',
          description: '',
        });
      }
    }
  }, [isEditing, initialData, loadFormData]);

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
        <ContentsRow>
          <FormRow3 name="moduleOrder" label={t('moduleOrder')} />
        </ContentsRow>
      )}
      <ContentsRow>
        <FormRow3 name="description" label="설명" element={<Textarea maxLength={100} />} />
      </ContentsRow>
    </>
  );
  return formContent;
};
