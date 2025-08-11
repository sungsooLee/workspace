import {
  useCreateExternalCourseForm,
  useGetExternalEducationDetail,
} from '@entities/external-education';
import { useDynamicForm2 } from '@learnway/hooks';
import { FormRow2, FormSubTitle } from '@learnway/ui/base-form';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { Textarea } from '@learnway/ui/textarea';
import { useCallback, useEffect } from 'react';

interface BasicInfoProps {
  formId?: number; // 등록 시에는 없을 수 있음
  mode: 'create' | 'view';
  onRegisterSave?: (saveFn: () => Promise<boolean>) => void;
  onFormIdCreated?: (formId: number) => void;
}

export function BasicInfo({ formId, mode, onRegisterSave, onFormIdCreated }: BasicInfoProps) {
  const form = useDynamicForm2();
  const { provider, onFormValid, getValues, onSubmit, updateFormData } = form;
  const { data: detailData } = useGetExternalEducationDetail(formId || 0);
  const { create } = useCreateExternalCourseForm({});

  useEffect(() => {
    if (detailData && formId) {
      const formData = {
        externalCourseFormTitle: detailData.externalCourseFormTitle || '',
        externalCourseFormDescription: detailData.externalCourseFormDescription || '',
      };
      updateFormData(formData);
    }
  }, [detailData, formId]);

  const submitApiCall = useCallback(
    async (validatedData: any): Promise<boolean> => {
      try {
        if (mode === 'create') {
          // 등록 모드: 새로운 폼 생성
          const createData = {
            externalCourseFormTitle: validatedData.externalCourseFormTitle || '',
            externalCourseFormDescription: validatedData.externalCourseFormDescription || '',
            externalCourseFormStatusType: 'USE',
            tenantId: 1, // TODO: 실제 테넌트 ID
          };

          const result = await new Promise<boolean>((resolve) => {
            create(createData, {
              onSuccess: (data: any) => {
                if (data && onFormIdCreated) {
                  onFormIdCreated(data);
                }
                resolve(true);
              },
              onError: () => {
                resolve(false);
              },
            });
          });
          return result;
        } else {
          // 수정 모드: 기존 폼 업데이트
          // const saveData = {
          //   tabType: 'BASIC_INFO',
          //   formData: {
          //     externalCourseFormTitle: validatedData.externalCourseFormTitle || '',
          //     externalCourseFormDescription: validatedData.externalCourseFormDescription || '',
          //   },
          // };

          // const result = await ExternalEducationService.saveExternalEducation(formId!, saveData);
          return true;
        }
      } catch (error) {
        return false;
      }
    },
    [mode, formId, create, onFormIdCreated],
  );

  // 폼 제출 핸들러
  const handleFormSubmit = onSubmit(async (validatedData) => {
    await submitApiCall(validatedData);
  });

  const handleSave = useCallback(async (): Promise<boolean> => {
    try {
      const isValid = await onFormValid();
      if (!isValid) {
        return false;
      }
      const formData = getValues();
      return await submitApiCall(formData);
    } catch {
      return false;
    }
  }, [onFormValid, getValues, submitApiCall]);

  useEffect(() => {
    if (onRegisterSave) {
      onRegisterSave(handleSave);
    }
  }, [onRegisterSave, handleSave]);

  return (
    <form onSubmit={handleFormSubmit}>
      <FormSubTitle label="기본 정보" />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'externalCourseFormTitle'}
          label={'신청 양식'}
          validation={{ required: true }}
          element={<Input maxLength={150} />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'externalCourseFormDescription'}
          label={'신청양식 설명'}
          validation={{ required: true }}
          element={<Textarea maxLength={2000} />}
        />
      </ContentsRow>
    </form>
  );
}
