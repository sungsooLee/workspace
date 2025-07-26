import {
  ContentsRow,
  EditorFormField,
  FormSubTitle,
  Input,
  RadioGroupFormField,
} from '@learnway/ui';
import { FormRow2, SwitchFormField } from '@shared/ui';
import { useDynamicForm2 } from '@learnway/hooks';
import { useEffect, useCallback } from 'react';
import { useCreateExternalCoursePopup, useGetExternalPopup } from '@entities/external-education';
import { DateRangePickerFormField } from '@features/form';

interface PopupProps {
  formId?: number; // 등록 시에는 없을 수 있음
  onRegisterSave?: (saveFn: () => Promise<boolean>) => void;
}

export function Popup({ formId, onRegisterSave }: PopupProps) {
  const form = useDynamicForm2();
  const { provider, onFormValid, getValues, onSubmit, updateFormData, watch } = form;
  const isPopupPeriod = watch('isPopupPeriod');
  const { data } = useGetExternalPopup(formId || 0);
  const { create } = useCreateExternalCoursePopup({});

  useEffect(() => {
    if (data && formId) {
      const formData = {
        popupTitle: data.popupTitle || '',
        popupContent: data.popupContent || '',
        isPopupPeriod: data.isPopupPeriod || false,
        popupStartDate: data.popupStartDate || null,
        popupEndDate: data.popupEndDate || null,
        isPopupExposed: data.isPopupExposed || false,
      };
      updateFormData(formData);
    }
  }, [data, formId]);

  const submitApiCall = useCallback(
    async (validatedData: any): Promise<boolean> => {
      try {
        // 등록 모드: 새로운 폼 생성
        const createData = {
          externalCourseFormId: formId,
          popupTitle: validatedData.popupTitle || '',
          popupContent: validatedData.popupContent || '',
          isPopupPeriod: validatedData.isPopupPeriod || false,
          // popupStartDate: validatedData.popupStartDate || null,
          // popupEndDate: validatedData.popupEndDate || false,
          tenantId: 1, // TODO: 실제 테넌트 ID
        };

        const result = await new Promise<boolean>((resolve) => {
          create(createData, {
            onSuccess: (data: any) => {
              resolve(true);
            },
            onError: () => {
              resolve(false);
            },
          });
        });
        return result;
      } catch (error) {
        return false;
      }
    },
    [formId],
  );

  // 폼 저장 함수
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

  // 컴포넌트 마운트 시 저장 함수 등록
  useEffect(() => {
    if (onRegisterSave) {
      onRegisterSave(handleSave);
    }
  }, [onRegisterSave, handleSave]);

  const handleFormSubmit = onSubmit(async (validatedData) => {
    await submitApiCall(validatedData);
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <FormSubTitle label="팝업" />
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'popupTitle'}
          label="제목"
          format="string"
          validation={{ required: true }}
          element={<Input />}
        />
      </ContentsRow>
      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'popupContent'}
          label="팝업내용"
          format="object"
          validation={{ required: true }}
          element={<EditorFormField />}
        />
      </ContentsRow>
      <ContentsRow type="horizontal">
        <FormRow2
          provider={provider}
          name={'isPopupPeriod'}
          label="게시기간"
          format="boolean"
          // validation={{ required: true }}
          element={
            <SwitchFormField
              switchConfig={{
                label: (value: boolean) => (value ? '기간 설정' : '미설정'),
              }}
            />
          }
        />
      </ContentsRow>
      {isPopupPeriod && (
        <ContentsRow type="horizontal">
          <FormRow2
            provider={provider}
            name={'dateRange'}
            format={'object'}
            element={<DateRangePickerFormField />}
          />
        </ContentsRow>
      )}

      <ContentsRow>
        <FormRow2
          provider={provider}
          name={'isPopupExposed'}
          label="팝업 노출 여부"
          // validation={{ required: true }}
          defaultValue={false}
          format={'boolean'}
          element={
            <RadioGroupFormField
              options={[
                { label: '노출', value: true },
                { label: '비노출', value: false },
              ]}
            />
          }
        />
      </ContentsRow>
    </form>
  );
}
