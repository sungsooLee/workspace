import React, { useEffect } from 'react';
import {
  InputModalSelectorFormField,
  TreeNode,
  ContentsRow,
  TextareaFormField,
} from '@learnway/ui';
import {
  ChannelChoiceModal,
  FormRow3,
  ManagerChoiceModal,
  SwitchFormFieldSimple,
  PhoneNumberFormFieldSimple,
} from '@shared/ui';
import { Input, Button } from '@learnway/ui';
import { DropdownFormField } from '@features/form';

interface CurriculumFormSimpleProps {
  parentNode: TreeNode | null;
  selectedNode: TreeNode | null;
  isEditing: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  watch: any;
  setValue: any; // React Hook Form의 setValue 함수
  loadFormData: (data: Record<string, any>, options?: any) => void; // 새로 추가된 데이터 로딩 함수
  initialData?: any; // 수정 모드일 때 초기 데이터
}

export const CurriculumFormSimple: React.FC<CurriculumFormSimpleProps> = ({
  parentNode,
  selectedNode,
  isEditing,
  onSubmit,
  onCancel,
  watch,
  setValue,
  loadFormData,
  initialData,
}) => {
  // React Hook Form의 watch를 사용해서 폼 값 감시
  const isVendored = watch('isVendored') || false;

  // 초기 데이터가 변경될 때 폼에 데이터 로드 (useDynamicForm3의 loadFormData 사용)
  useEffect(() => {
    if (initialData && isEditing && loadFormData) {
      console.log('폼 데이터 로딩:', initialData);
      loadFormData(initialData);
    }
  }, [initialData, isEditing, loadFormData]);

  const formContent = (
    <>
      <ContentsRow>
        <FormRow3
          name="channelName"
          label="채널"
          element={
            <InputModalSelectorFormField
              placeholder="채널을 선택하세요"
              modalConfig={{ content: <ChannelChoiceModal /> }}
              disabled={isEditing}
              transformModalData={(data: any) => {
                console.log('선택된 채널:', data);

                // React Hook Form의 setValue를 사용해서 폼 값 설정
                if (data?.channelUuid || data?.uuid) {
                  setValue('channelUuid', data.channelUuid || data.uuid);

                  // 추가로 다른 필드들도 설정 가능
                  if (data?.channelName) {
                    setValue('channelName', data.channelName);
                  }
                }

                // 표시용으로는 이름이나 설명을 반환
                return data?.channelName || data?.name || '';
              }}
            />
          }
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow3
          name="curriculumType"
          label="유형"
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
        <FormRow3
          name="languageCountryCode"
          label="언어"
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
        <FormRow3
          name="curriculumName"
          label="커리큘럼명"
          validation={{ required: true }}
          element={<Input />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow3 name="curriculumDescription" label="설명" element={<TextareaFormField />} />
      </ContentsRow>
      <ContentsRow>
        <FormRow3
          name="coordinatorName"
          label="담당자"
          element={<Input />}
        />
        <FormRow3
          name="coordinatorTelNo"
          label="연락처"
          element={<PhoneNumberFormFieldSimple />}
        />
      </ContentsRow>
      <ContentsRow type={'horizontal'}>
        <FormRow3 name="isVendored" label="외주개발업체 정보" element={<SwitchFormFieldSimple />} />
      </ContentsRow>
      {isVendored && (
        <>
          <ContentsRow>
            <FormRow3
              name="vendorCoordinatorUuid"
              label="외주개발업체"
              element={
                <InputModalSelectorFormField
                  placeholder="외주개발업체를 선택하세요"
                  modalConfig={{ content: <ManagerChoiceModal /> }}
                  transformModalData={(data: any) => {
                    console.log('선택된 매니저:', data);

                    // React Hook Form의 setValue로 여러 필드 설정
                    if (data?.managerId || data?.uuid) {
                      setValue('vendorCoordinatorUuid', data.managerId || data.uuid);
                    }

                    // 매니저 이름도 자동으로 설정
                    if (data?.managerName || data?.name) {
                      setValue('vendorCoordinatorName', data.managerName || data.name);
                    }

                    // 연락처가 있으면 자동으로 설정
                    if (data?.phone || data?.tel) {
                      setValue('vendorTelNo', data.phone || data.tel);
                    }

                    // 표시용으로는 매니저 이름 반환
                    return data?.managerName || data?.name || '';
                  }}
                />
              }
            />
          </ContentsRow>
          <ContentsRow>
            <FormRow3
              name="vendorCoordinatorName"
              label="외주개발업체 담당자명"
              element={<Input />}
            />
            <FormRow3
              name="vendorTelNo"
              label="외주개발업체 연락처"
              element={<Input />}
            />
          </ContentsRow>
        </>
      )}
    </>
  );

  return formContent;
};
