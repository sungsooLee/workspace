import { useDynamicForm2 } from '@learnway/hooks';
import { useEffect, useRef } from 'react';
import { useGetExternalPopup, useCreateExternalCoursePopup } from '@entities/external-education';

export function useExternalEducationPopup(formId?: number, isActive?: boolean) {
  const { provider, getValues, updateFormData, onSubmit, watch, onFormValid } = useDynamicForm2();
  const { data, isLoading } = useGetExternalPopup(formId || 0);
  const { create } = useCreateExternalCoursePopup({});

  const isDataLoadedRef = useRef<boolean>(false);
  const currentFormValuesRef = useRef<any>({});

  const isPopupPeriod = watch('isPopupPeriod');

  useEffect(() => {
    const subscription = watch((values) => {
      currentFormValuesRef.current = values;
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const responseDataToFormData = (serverData: any) => {
    return {
      popupTitle: serverData.popupTitle || '',
      popupContent: serverData.popupContent || '',
      isPopupPeriod: serverData.isPopupPeriod || false,
      popupStartDate: serverData.popupStartDate || null,
      popupEndDate: serverData.popupEndDate || null,
      isPopupExposed: serverData.isPopupExposed || false,
      dateRange: {
        from: serverData.popupStartDate || null,
        to: serverData.popupEndDate || null,
      },
    };
  };

  // 폼 데이터를 API 요청 데이터로 변환
  const formDataToRequestData = (formData: any) => {
    return {
      externalCourseFormId: formId,
      popupTitle: formData.popupTitle || '',
      popupContent: formData.popupContent || '',
      isPopupPeriod: formData.isPopupPeriod || false,
      popupStartDate: formData.dateRange?.from || null,
      popupEndDate: formData.dateRange?.to || null,
      isPopupExposed: formData.isPopupExposed || false,
      tenantId: 1,
    };
  };

  // 탭이 활성화될 때 데이터 로드 플래그 리셋
  useEffect(() => {
    if (isActive && formId) {
      // 탭이 활성화되면 데이터를 다시 로드할 수 있도록 플래그 리셋
      isDataLoadedRef.current = false;
    }
  }, [isActive, formId]);

  // 데이터 초기화
  useEffect(() => {
    if (data && formId && !isLoading && !isDataLoadedRef.current) {
      const formData = responseDataToFormData(data);
      updateFormData(formData);
      isDataLoadedRef.current = true;
    }
  }, [data, formId, isLoading, updateFormData]);

  // 저장 함수
  const saveFunction = async (): Promise<boolean> => {
    try {
      const currentValues = currentFormValuesRef.current;
      // if (!currentValues.popupTitle || currentValues.popupTitle.trim() === '') {
      //   return false;
      // }

      const requestData = formDataToRequestData(currentValues);
      return new Promise<boolean>((resolve) => {
        create(requestData, {
          onSuccess: () => {
            resolve(true);
          },
        });
      });
    } catch (error) {
      return false;
    }
  };

  // 폼 제출 핸들러
  const handleFormSubmit = onSubmit(async (validatedData) => {
    const requestData = formDataToRequestData(validatedData);
    create(requestData);
  });

  return {
    provider,
    getValues,
    updateFormData,
    saveFunction,
    handleFormSubmit,
    isPopupPeriod,
    data,
    isLoading,
  };
}
