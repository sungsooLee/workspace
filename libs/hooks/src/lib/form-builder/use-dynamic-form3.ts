import { FormEvent, useMemo, useRef, useState, useCallback, useEffect } from 'react';
import {
  useForm,
  Control,
  FieldErrors,
  UseFormReturn,
  FieldValues,
  DefaultValues,
} from 'react-hook-form';
import { AutoFormContextValue, FieldInfo } from './auto-form-context';

export interface DynamicFormProvider3<T extends FieldValues = FieldValues> {
  control: Control<T>;
  formState: {
    errors: FieldErrors<T>;
    isDirty: boolean;
    isValid: boolean;
    isSubmitting: boolean;
  };
  fieldRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  getValues: UseFormReturn<T>['getValues'];
  setValue: UseFormReturn<T>['setValue'];
  watch: UseFormReturn<T>['watch'];
  reset: UseFormReturn<T>['reset'];
  handleSubmit: UseFormReturn<T>['handleSubmit'];
  clearErrors: UseFormReturn<T>['clearErrors'];
  setError: UseFormReturn<T>['setError'];
}

export interface ClearFormFieldsOptions {
  resetToDefaults?: boolean;
  clearErrors?: boolean;
  resetValidation?: boolean;
  unregisterFields?: string[];
  clearAll?: boolean;
}

export interface SwitchFormTypeOptions {
  preserveFields?: string[];
  clearAll?: boolean;
  resetToDefaults?: boolean;
}

export interface UseDynamicFormResult3<T extends FieldValues = FieldValues> {
  provider: DynamicFormProvider3<T>;
  control: Control<T>;
  formState: {
    errors: FieldErrors<T>;
    isDirty: boolean;
    isValid: boolean;
    isSubmitting: boolean;
  };
  getValues: UseFormReturn<T>['getValues'];
  setValue: UseFormReturn<T>['setValue'];
  watch: UseFormReturn<T>['watch'];
  reset: UseFormReturn<T>['reset'];
  handleSubmit: UseFormReturn<T>['handleSubmit'];
  clearErrors: UseFormReturn<T>['clearErrors'];
  setError: UseFormReturn<T>['setError'];
  onSubmit: (onValid: (data: T) => void) => (event: FormEvent<HTMLFormElement>) => void;

  autoFormContext: AutoFormContextValue<T>;

  loadFormData: (data: Record<string, any>, options?: LoadFormDataOptions) => void;
  clearFormData: () => void;
  updateFormField: (fieldName: string, value: any) => void;

  clearFormFields: (options?: ClearFormFieldsOptions) => void;
  switchFormType: (options?: SwitchFormTypeOptions) => void;
  safeReset: (newValues?: Partial<T>) => void;
}

export interface LoadFormDataOptions {
  excludeFields?: string[];
  includeOnlyFields?: string[];
  clearBeforeLoad?: boolean;
  triggerValidation?: boolean;
}

export function useDynamicForm3<T extends FieldValues = FieldValues>(): UseDynamicFormResult3<T> {
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  // 자동 필드 수집을 위한 상태
  const [fields, setFields] = useState<Map<string, FieldInfo>>(new Map());
  const [isInitialized, setIsInitialized] = useState(false);
  const [autoDefaultValues, setAutoDefaultValues] = useState<DefaultValues<T>>(
    {} as DefaultValues<T>,
  );

  // 대기 중인 로드 데이터
  const [pendingLoadData, setPendingLoadData] = useState<{
    data: Record<string, any>;
    options: LoadFormDataOptions;
  } | null>(null);

  // 필드 등록 함수
  const registerField = useCallback((fieldInfo: FieldInfo) => {
    setFields((prev) => {
      const newFields = new Map(prev);
      newFields.set(fieldInfo.name, fieldInfo);
      return newFields;
    });
  }, []);

  // 필드 해제 함수
  const unregisterField = useCallback((name: string) => {
    setFields((prev) => {
      const newFields = new Map(prev);
      newFields.delete(name);
      return newFields;
    });
  }, []);

  const generateAutoDefaultValues = useCallback(() => {
    if (fields.size === 0) return {} as DefaultValues<T>;

    const values = {} as any;
    fields.forEach((fieldInfo) => {
      if (fieldInfo.defaultValue !== undefined) {
        values[fieldInfo.name] = fieldInfo.defaultValue;
      } else {
        // 타입에 따른 기본값 설정
        switch (fieldInfo.type) {
          case 'number':
            values[fieldInfo.name] = 0;
            break;
          case 'boolean':
            values[fieldInfo.name] = false;
            break;
          default:
            values[fieldInfo.name] = '';
        }
      }
    });
    return values as DefaultValues<T>;
  }, [fields]);

  const resolvedDefaultValues = autoDefaultValues;

  // react-hook-form 훅 초기화
  const methods = useForm<T>({
    mode: 'onSubmit',  // 폼 제출 시에만 검증
    reValidateMode: 'onSubmit',  // 재검증도 제출 시에만 실행
    defaultValues: resolvedDefaultValues as DefaultValues<T>,
  });

  // 필드 수집이 완료되면 폼 리셋 (항상 자동 모드)
  useEffect(() => {
    if (fields.size > 0 && !isInitialized) {
      const newDefaultValues = generateAutoDefaultValues();
      setAutoDefaultValues(newDefaultValues);
      methods.reset(newDefaultValues);
      setIsInitialized(true);
    }
  }, [fields, isInitialized, generateAutoDefaultValues, methods]);

  // 필드 초기화 완료 후 대기 중인 데이터 로드
  useEffect(() => {
    if (isInitialized && pendingLoadData) {
      const { data, options } = pendingLoadData;

      // 실제 데이터 로드 로직 실행
      const { excludeFields = [], includeOnlyFields, clearBeforeLoad = false } = options;

      // 필터링된 데이터 준비
      const filteredData = Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (excludeFields.includes(key)) {
            return acc;
          }

          // 포함 필드만 처리하는 경우
          if (includeOnlyFields && !includeOnlyFields.includes(key)) {
            return acc;
          }

          if (value !== null && value !== undefined) {
            acc[key] = value;
          }

          return acc;
        },
        {} as Record<string, any>,
      );

      if (clearBeforeLoad) {
        // 완전 초기화 후 새 데이터로 리셋
        methods.reset(filteredData as DefaultValues<T>);
      } else {
        // 기존 데이터와 병합하여 리셋
        const currentValues = methods.getValues();
        const mergedData = { ...currentValues, ...filteredData };
        methods.reset(mergedData as DefaultValues<T>);
      }

      // 대기 데이터 클리어
      setPendingLoadData(null);
    }
  }, [isInitialized, pendingLoadData, methods]);

  // react-hook-form 메서드 및 속성 추출
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState,
    watch,
    clearErrors,
    setError,
  } = methods;

  /**
   * 폼 제출 핸들러를 생성하는 함수.
   */
  const formSubmit = useCallback(
    (onValid: (data: T) => void) => {
      return (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(onValid as any, (errors) => {
          console.log('useDynamicForm3 validation errors:', errors);

          // 첫 번째 에러 필드로 포커스 이동
          const firstErrorKey = Object.keys(errors)[0];
          if (firstErrorKey) {
            const errorFieldRef = fieldRefs.current[firstErrorKey];
            if (errorFieldRef) {
              errorFieldRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
              errorFieldRef.focus();
            }
          }
        })();
      };
    },
    [handleSubmit],
  );

  // 데이터 로딩 함수들
  const loadFormData = useCallback(
    (data: Record<string, any>, options: LoadFormDataOptions = {}) => {
      // 필드 초기화가 완료되지 않았으면 대기 데이터로 저장
      if (!isInitialized) {
        setPendingLoadData({ data, options });
        return;
      }

      // 이미 초기화가 완료된 경우 즉시 로드
      const { excludeFields = [], includeOnlyFields, clearBeforeLoad = false } = options;

      // 필터링된 데이터 준비
      const filteredData = Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (excludeFields.includes(key)) {
            return acc;
          }

          // 포함 필드만 처리하는 경우
          if (includeOnlyFields && !includeOnlyFields.includes(key)) {
            return acc;
          }

          if (value !== null && value !== undefined) {
            acc[key] = value;
          }

          return acc;
        },
        {} as Record<string, any>,
      );

      if (clearBeforeLoad) {
        // 완전 초기화 후 새 데이터로 리셋
        methods.reset(filteredData as DefaultValues<T>);
      } else {
        // 기존 데이터와 병합하여 리셋
        const currentValues = methods.getValues();
        const mergedData = { ...currentValues, ...filteredData };
        methods.reset(mergedData as DefaultValues<T>);
      }
    },
    [methods, isInitialized],
  );

  const clearFormData = useCallback(() => {
    methods.reset();
  }, [methods]);

  const updateFormField = useCallback(
    (fieldName: string, value: any) => {
      setValue(fieldName as any, value);

      // mode가 'onSubmit'이 아닐 때만 검증 실행
      // onSubmit 모드에서는 제출 시에만 검증하도록 함
      // setTimeout(() => {
      //   methods.trigger(fieldName as any);
      // }, 10);
    },
    [setValue, methods],
  );

  // 폼 필드 정리 메서드
  const clearFormFields = useCallback(
    (options: ClearFormFieldsOptions = {}) => {
      const {
        resetToDefaults = false,
        clearErrors = true,
        resetValidation = true,
        unregisterFields = [],
        clearAll = false,
      } = options;

      // 모든 필드 완전 제거
      if (clearAll) {
        // 현재 등록된 모든 필드를 unregister
        fields.forEach((fieldInfo, fieldName) => {
          methods.unregister(fieldName as any);
        });

        // 필드 맵과 초기화 상태 리셋
        setFields(new Map());
        setIsInitialized(false);
        
        // 모든 에러 상태 완전 클리어
        methods.clearErrors();
      } else if (unregisterFields.length > 0) {
        // 특정 필드들만 완전 제거
        unregisterFields.forEach((fieldName) => {
          methods.unregister(fieldName as any);
        });
      }

      // 기본값으로 리셋 또는 빈 값으로 리셋
      if (resetToDefaults) {
        const defaultValues = generateAutoDefaultValues();
        methods.reset(defaultValues);
      } else {
        methods.reset({} as DefaultValues<T>);
      }

      // 에러 클리어
      if (clearErrors) {
        methods.clearErrors();
      }

      // 검증 상태 초기화
      if (resetValidation) {
        // 모든 필드의 터치 상태 초기화
        Object.keys(methods.formState.touchedFields).forEach((fieldName) => {
          methods.resetField(fieldName as any);
        });
      }
    },
    [methods, generateAutoDefaultValues, fields, setFields, setIsInitialized],
  );

  // 폼 타입 전환 메서드
  const switchFormType = useCallback(
    (options: SwitchFormTypeOptions = {}) => {
      const { preserveFields = [], clearAll = true, resetToDefaults = false } = options;

      if (clearAll) {
        // 모든 필드 클리어
        if (resetToDefaults) {
          const defaultValues = generateAutoDefaultValues();
          methods.reset(defaultValues);
        } else {
          methods.reset({} as DefaultValues<T>);
        }
        methods.clearErrors();
      } else if (preserveFields.length > 0) {
        // 특정 필드만 보존하고 나머지 클리어
        const currentValues = methods.getValues();
        const preservedValues = preserveFields.reduce((acc, field) => {
          if (currentValues[field] !== undefined) {
            acc[field] = currentValues[field];
          }
          return acc;
        }, {} as any);

        methods.reset(preservedValues);
        methods.clearErrors();
      }

      // 필드 등록 상태 초기화하여 새로운 폼 구조 수용
      setIsInitialized(false);
    },
    [methods, generateAutoDefaultValues, setIsInitialized],
  );

  // 안전한 리셋 메서드 (에러 처리 포함)
  const safeReset = useCallback(
    (newValues?: Partial<T>) => {
      try {
        if (newValues) {
          methods.reset(newValues as DefaultValues<T>);
        } else {
          const defaultValues = generateAutoDefaultValues();
          methods.reset(defaultValues);
        }
        methods.clearErrors();
      } catch (error) {
        console.warn('Form reset failed:', error);
        // 폴백: 빈 객체로 리셋
        methods.reset({} as DefaultValues<T>);
        methods.clearErrors();
      }
    },
    [methods, generateAutoDefaultValues],
  );

  // provider 객체를 useMemo로 메모이제이션
  const provider: DynamicFormProvider3<T> = useMemo(
    () => ({
      control,
      formState: {
        errors: formState.errors,
        isDirty: formState.isDirty,
        isValid: formState.isValid,
        isSubmitting: formState.isSubmitting,
      },
      fieldRefs,
      getValues,
      setValue,
      watch,
      reset,
      handleSubmit,
      clearErrors,
      setError,
    }),
    [
      control,
      formState.errors,
      formState.isDirty,
      formState.isValid,
      formState.isSubmitting,
      getValues,
      setValue,
      watch,
      reset,
      handleSubmit,
      clearErrors,
      setError,
    ],
  );

  // 자동 폼 컨텍스트 생성
  const autoFormContext: AutoFormContextValue<any> = useMemo(
    () => ({
      control: control as any,
      methods: methods as any,
      formState: {
        errors: formState.errors,
        isDirty: formState.isDirty,
        isValid: formState.isValid,
        isSubmitting: formState.isSubmitting,
      },
      fields,
      registerField,
      unregisterField,
      isInitialized,
      setInitialized: setIsInitialized,
    }),
    [
      control,
      methods,
      formState.errors,
      formState.isDirty,
      formState.isValid,
      formState.isSubmitting,
      fields,
      registerField,
      unregisterField,
      isInitialized,
      setIsInitialized,
    ],
  );

  // 결과 반환
  return {
    provider,
    control,
    formState: {
      errors: formState.errors,
      isDirty: formState.isDirty,
      isValid: formState.isValid,
      isSubmitting: formState.isSubmitting,
    },
    getValues,
    setValue,
    watch,
    reset,
    handleSubmit,
    clearErrors,
    setError,
    onSubmit: formSubmit,
    autoFormContext,

    // 기존 데이터 로딩 함수들
    loadFormData,
    clearFormData,
    updateFormField,

    // 새로 추가된 폼 정리 메서드들
    clearFormFields,
    switchFormType,
    safeReset,
  };
}
