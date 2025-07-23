import React, { useEffect, useRef } from 'react';
import {
  InputModalSelectorFormField,
  TreeNode,
  ContentsRow,
  TextareaFormField,
} from '@learnway/ui';
import {
  ChannelChoiceModal,
  FormRow2,
  ManagerChoiceModal,
  SwitchFormFieldSimple,
  PhoneNumberFormFieldSimple,
} from '@shared/ui';
import { Input } from '@learnway/ui';
import { DropdownFormField } from '@features/form';
import { DynamicFormProvider } from '@learnway/hooks';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { useIsManager } from '../hooks/use-role-info';
import { useGetCurriculumDetail } from '@entities/curriculum';

interface CurriculumFormProps {
  parentNode: TreeNode | null;
  selectedNode: TreeNode | null;
  isEditing: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  provider: DynamicFormProvider;
  updateFormData: (data: Record<string, any>) => void;
  watch: any;
  curriculumId?: number;
}

export const CurriculumForm: React.FC<CurriculumFormProps> = ({
  parentNode,
  selectedNode,
  isEditing,
  onSubmit,
  onCancel,
  provider,
  updateFormData,
  watch,
  curriculumId,
}) => {
  const { data: loginUser } = useFetchAuthUser();
  const { data: curriculumData } = useGetCurriculumDetail(curriculumId || 0);
  const isManager = useIsManager({ loginUser });
  const isVendored = watch('isVendored') || false;
  useEffect(() => {
    if (isEditing && curriculumData) {
      const initialData = {
        ...curriculumData,
        coordinatorTelNo: {
          nationCode: curriculumData.coordinatorTelCountryCode || '',
          number: curriculumData.coordinatorTelNo || '',
        },
        vendorTelNo: {
          nationCode: curriculumData.vendorTelCountryCode || '',
          number: curriculumData.vendorTelNo || '',
        },
      };

      Object.entries(initialData).forEach(([key, value]) => {
        provider.setValue(key, value);
      });
    } else if (!isEditing) {
      // 생성 모드일 때는 기본값으로 초기화
      const defaultData = {
        curriculumName: '',
        curriculumDescription: '',
        coordinatorName: '',
        coordinatorTelNo: { nationCode: '', number: '' },
        vendorTelNo: { nationCode: '', number: '' },
        isVendored: false,
      };

      Object.entries(defaultData).forEach(([key, value]) => {
        provider.setValue(key, value);
      });
    }
  }, [curriculumData]);

  const formContent = (
    <>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="channelName"
          label="채널"
          format="string"
          value=""
          validation={{ required: true }}
          element={
            <InputModalSelectorFormField
              placeholder="채널을 선택하세요"
              modalConfig={{ content: <ChannelChoiceModal /> }}
              disabled={!isManager || isEditing}
              transformModalData={(data: any) => {
                if (data?.channelUuid || data?.uuid) {
                  provider.setValue('channelUuid', data.channelUuid || data.uuid);
                  if (data?.channelName) {
                    provider.setValue('channelName', data.channelName);
                  }
                }
                return data?.channelName || data?.name || '';
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="curriculumType"
          label="유형"
          format="string"
          value=""
          validation={{ required: true }}
          element={
            <DropdownFormField
              optionsConfig={{
                options: [{ value: '', label: 'LABEL.form.label.select' }],
                codeGroup: 'cms.curriculum.CurriculumType',
              }}
              placeholder="유형을 선택하세요"
              disabled={isEditing}
            />
          }
        />
        <FormRow2
          provider={provider}
          name="languageCountryCode"
          label="언어"
          format="string"
          value=""
          validation={{ required: true }}
          element={
            <DropdownFormField
              optionsConfig={{
                options: [{ value: '', label: 'LABEL.form.label.select' }],
                codeGroup: 'pms.multilingual.LangCountryCode',
              }}
              placeholder="언어를 선택하세요"
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="curriculumName"
          label="커리큘럼명"
          format="string"
          value=""
          validation={{ required: true }}
          element={<Input />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="curriculumDescription"
          label="설명"
          format="string"
          value=""
          element={<TextareaFormField />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="coordinatorName"
          label="담당자"
          format="string"
          value=""
          element={<Input />}
        />
        <FormRow2
          provider={provider}
          name="coordinatorTelNo"
          label="연락처"
          format="object"
          value={{}}
          element={<PhoneNumberFormFieldSimple />}
        />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow2
          provider={provider}
          name="isVendored"
          label="외주개발업체 정보"
          format="boolean"
          value={false}
          element={<SwitchFormFieldSimple />}
        />
      </ContentsRow>
      {isVendored && (
        <>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="vendorCoordinatorUuid"
              label="외주개발업체"
              format="string"
              value=""
              element={
                <InputModalSelectorFormField
                  placeholder="외주개발업체를 선택하세요"
                  modalConfig={{ content: <ManagerChoiceModal /> }}
                  transformModalData={(data: any) => {
                    if (data?.managerId || data?.uuid) {
                      provider.setValue('vendorCoordinatorUuid', data.managerId || data.uuid);
                    }
                    if (data?.managerName || data?.name) {
                      provider.setValue('vendorCoordinatorName', data.managerName || data.name);
                    }
                    if (data?.phone || data?.tel) {
                      provider.setValue('vendorTelNo', data.phone || data.tel);
                    }
                    return data?.managerName || data?.name || '';
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow2
              provider={provider}
              name="vendorCoordinatorName"
              label="외주개발업체 담당자명"
              format="string"
              value=""
              element={<Input />}
            />
            <FormRow2
              provider={provider}
              name="vendorTelNo"
              label="외주개발업체 연락처"
              format="object"
              value={{}}
              element={<PhoneNumberFormFieldSimple />}
            />
          </ContentsRow>
        </>
      )}

      {/* 숨겨진 필드들 */}
      <FormRow2
        provider={provider}
        name="channelUuid"
        format="string"
        value=""
        element={<input type="hidden" />}
      />
      <FormRow2
        provider={provider}
        name="vendorCode"
        format="string"
        value=""
        element={<input type="hidden" />}
      />
      <FormRow2
        provider={provider}
        name="vendorName"
        format="string"
        value=""
        element={<input type="hidden" />}
      />
    </>
  );

  return formContent;
};
