import { useDynamicForm2 } from '@learnway/hooks';
import { useEffect, useCallback } from 'react';
import {
  useGetExternalPopup,
  useCreateExternalCoursePopup,
  useGetRegistrationLayout,
  useCreateExternalCourseLayout } from '@entities/external-education';

export function useExternalEducationForm(formId?: number) {
  const { provider, getValues, updateFormData, onFormValid } = useDynamicForm2();
  
  // 각 탭의 데이터 조회
  const { data: popupData } = useGetExternalPopup(formId || 0);
  const { data: registrationLayout } = useGetRegistrationLayout({
    externalCourseFormId: formId || 0,
    externalCourseFormEnrollType: 'REGISTRATION' as any });
  const { data: resultLayout } = useGetRegistrationLayout({
    externalCourseFormId: formId || 0,
    externalCourseFormEnrollType: 'RESULT' as any });
  
  // API 호출 함수들
  const { create: createPopup } = useCreateExternalCoursePopup({});
  const { create: createRegistrationLayout } = useCreateExternalCourseLayout({});
  const { create: createResultLayout } = useCreateExternalCourseLayout({});
  
  // 팝업 데이터 로딩시 폼 초기화 (한 번만)
  useEffect(() => {
    if (popupData && formId) {
      const formData = {
        popupTitle: popupData.popupTitle || '',
        popupContent: popupData.popupContent || '',
        isPopupPeriod: popupData.isPopupPeriod || false,
        popupStartDate: popupData.popupStartDate || null,
        popupEndDate: popupData.popupEndDate || null,
        isPopupExposed: popupData.isPopupExposed || false,
        dateRange: { 
          from: popupData.popupStartDate || null, 
          to: popupData.popupEndDate || null 
        } };
      updateFormData(formData);
    }
  }, [popupData?.externalCourseFormPopupId]);
  
  // 팝업 탭 저장 함수
  const savePopup = useCallback(async (): Promise<boolean> => {
    try {
      const isValid = await onFormValid();
      if (!isValid) return false;
      
      const formValues = getValues();
      const createData = {
        externalCourseFormId: formId,
        popupTitle: formValues.popupTitle || '',
        popupContent: formValues.popupContent || '',
        isPopupPeriod: formValues.isPopupPeriod || false,
        popupStartDate: formValues.dateRange?.from || null,
        popupEndDate: formValues.dateRange?.to || null,
        isPopupExposed: formValues.isPopupExposed || false,
        tenantId: 1 };
      
      return new Promise<boolean>((resolve) => {
        createPopup(createData, {
          onSuccess: () => resolve(true),
          onError: () => resolve(false) });
      });
    } catch {
      return false;
    }
  }, [formId, onFormValid, getValues, createPopup]);
  
  // 등록 탭 저장 함수
  const saveRegistration = useCallback(async (): Promise<boolean> => {
    try {
      // 등록 탭은 별도의 validation이 필요하지 않을 수 있음
      const formValues = getValues();
      const applicationItems = formValues.applicationItems || [];
      
      const layouts = applicationItems.map((item: any) => ({
        externalCourseFormComponentId: item.id,
        isMandatory: item.isMandatory,
        sortOrder: item.order }));
      
      const saveData = {
        externalCourseFormId: formId,
        externalCourseFormEnrollType: 'REGISTRATION',
        layouts };
      
      if (formId && layouts.length > 0) {
        return new Promise<boolean>((resolve) => {
          createRegistrationLayout(saveData, {
            onSuccess: () => resolve(true),
            onError: () => resolve(false) });
        });
      }
      return true;
    } catch {
      return false;
    }
  }, [formId, getValues, createRegistrationLayout]);
  
  // 결과 탭 저장 함수
  const saveResult = useCallback(async (): Promise<boolean> => {
    try {
      const formValues = getValues();
      const resultItems = formValues.resultItems || [];
      
      const layouts = resultItems.map((item: any) => ({
        externalCourseFormComponentId: item.id,
        isMandatory: item.isMandatory,
        sortOrder: item.order }));
      
      const saveData = {
        externalCourseFormId: formId,
        externalCourseFormEnrollType: 'RESULT',
        layouts };
      
      if (formId && layouts.length > 0) {
        return new Promise<boolean>((resolve) => {
          createResultLayout(saveData, {
            onSuccess: () => resolve(true),
            onError: () => resolve(false) });
        });
      }
      return true;
    } catch {
      return false;
    }
  }, [formId, getValues, createResultLayout]);
  
  return {
    provider,
    getValues,
    updateFormData,
    onFormValid,
    popupData,
    registrationLayout,
    resultLayout,
    savePopup,
    saveRegistration,
    saveResult };
}