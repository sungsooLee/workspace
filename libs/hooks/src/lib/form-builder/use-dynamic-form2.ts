import { zodResolver } from '@hookform/resolvers/zod';
import { buildJodObject, ValidatorConfig, ValidatorFormat } from '@learnway/shared';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DynamicFormConfig, DynamicFormProvider, FormConfig, UseDynamicFormResult } from './type';
import { extractDynamicFormDefaultValues } from './util';

/**
 * 주어진 폼 설정(config)을 기반으로 react-hook-form을 초기화하는 커스텀 훅.
 *
 * @param config - 동적 폼 설정 객체 (DynamicFormConfig)
 * @returns 동적 폼 생성 및 관리에 필요한 메서드와 provider 객체
 */
export const useDynamicForm2 = <T extends DynamicFormConfig>(config?: T): UseDynamicFormResult => {
  // 기본 config 설정
  const defaultConfig: DynamicFormConfig = {
    builders: [],
    validator: {},
  };

  const finalConfig = config || defaultConfig;

  // 동적 필드 관리를 위한 상태
  const [dynamicBuilders, setDynamicBuilders] = useState<FormConfig[]>(finalConfig.builders);
  // console.log('🚀 ~ dynamicBuilders:', dynamicBuilders);
  // 동적 validator 관리를 위한 상태
  const [dynamicValidator, setDynamicValidator] = useState<any>(finalConfig.validator || {});

  // 초기값 생성: 각 빌더의 기본 값을 설정
  const defaultValues = extractDynamicFormDefaultValues(dynamicBuilders);

  // 원본 값 상태 설정
  const [originalValues, setOriginalValues] = useState(defaultValues);

  // console.log('🚀 ~ useDynamicForm2 ~', {
  //   finalConfig,
  //   dynamicBuilders,
  //   dynamicValidator,
  //   defaultValues,
  //   originalValues,
  // });

  /**
   * Dynamic Config 에서는 좀더 편하게 쓰기 위해 약간의 타입이 달라서 buildJodObject 에 맞게 수정 한다.
   */
  const validator = useMemo<ValidatorConfig>(() => {
    const validatorData = dynamicValidator; // 동적 validator 사용
    return dynamicBuilders.reduce((acc, builder) => {
      const key = builder.name;
      const analogyFormat = typeof builder.value as ValidatorFormat;
      let format = builder.format || analogyFormat;

      const existingValidator = validatorData[key] as any;
      if (existingValidator && existingValidator.format) {
        format = existingValidator.format;
      }

      acc[key] = {
        format,
        required: { required: false },
      };
      if (existingValidator) {
        if (typeof existingValidator === 'boolean') {
          acc[key] = {
            ...acc[key],
            required: { required: existingValidator },
          };
        } else if (typeof existingValidator.required === 'function') {
          acc[key] = {
            ...acc[key],
            required: { required: true, fn: existingValidator.required },
          };
        } else if (typeof existingValidator === 'object') {
          acc[key] = {
            ...acc[key],
            required: {
              required: existingValidator['required'] ?? false,
              ...(existingValidator['required']['fn'] && {
                fn: existingValidator['required']['fn'],
              }),
              ...(existingValidator['required']['message'] && {
                message: existingValidator['required']['message'],
              }),
              ...(existingValidator['required']['path'] && {
                path: existingValidator['required']['path'],
              }),
            },
            ...(existingValidator['conditions'] && {
              conditions: existingValidator['conditions'],
            }),
          };
        }
      }
      return acc;
    }, {} as ValidatorConfig);
  }, [dynamicBuilders, dynamicValidator]);

  // Zod 스키마 생성 (유효성 검증 스키마) - dynamicValidator 변경 시 재생성
  const schema = useMemo(() => {
    return buildJodObject(validator);
  }, [validator]);

  // react-hook-form 훅 초기화
  const methods = useForm({
    mode: finalConfig.mode || 'onSubmit', // config에서 mode를 받아오고, 기본값은 'onSubmit'
    reValidateMode: finalConfig.reValidateMode || 'onChange', // 에러 발생 후에는 onChange로 재검증
    defaultValues,
    resolver: zodResolver(schema),
  });

  // schema가 변경될 때마다 form 재초기화
  useEffect(() => {
    methods.clearErrors(); // 기존 에러 클리어
    // 새로운 resolver로 form 재초기화
    const currentValues = methods.getValues();
    methods.reset(currentValues, {
      keepValues: true,
      keepErrors: false,
      keepDirty: false,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    });
  }, [schema, methods]);

  // 각 필드의 DOM 노드를 저장할 ref 객체
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // react-hook-form 메서드 및 속성 추출
  const {
    control,
    handleSubmit,
    setFocus,
    getValues,
    reset,
    formState,
    setError,
    clearErrors,
    setValue,
    trigger,
    watch,
    unregister,
  } = methods;

  /**
   * 필수값 확인 함수
   * @param fieldName
   */
  const isFieldRequired = useCallback(
    (fieldName: string): boolean => {
      // 기본 validator에서 확인
      const config = validator[fieldName];
      if (config && typeof config.required === 'object' && config.required !== null) {
        if (config.required.required) return true;
      }

      // 동적으로 추가된 validator에서도 확인
      const dynamicConfig = dynamicValidator[fieldName];
      if (dynamicConfig) {
        if (typeof dynamicConfig === 'boolean') return dynamicConfig;
        if (typeof dynamicConfig === 'object' && dynamicConfig.required) {
          if (typeof dynamicConfig.required === 'boolean') return dynamicConfig.required;
          if (typeof dynamicConfig.required === 'object' && dynamicConfig.required.required) {
            return dynamicConfig.required.required;
          }
        }
      }

      return false;
    },
    [validator, dynamicValidator],
  );

  /**
   * 필드 포커스를 설정하는 함수.
   *
   * @param fieldName - 포커스를 설정할 필드 이름
   */
  const handleFocus = useCallback(
    (fieldName: string) => {
      const field = fieldRefs.current[fieldName];
      if (field) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        field.focus();
      }
      setFocus(fieldName);
    },
    [setFocus],
  );

  /**
   * 필드 값 초기화
   *
   * @param values - 새로운 초기값 (선택 사항)
   */
  const onFormChange = useCallback(
    (values?: Record<string, any>) => {
      if (values) {
        Object.entries(values).forEach(([key, value]) => {
          setValue(key, value);
          // 값 변경 시 해당 필드의 에러 클리어
          clearErrors(key);
        });
      } else {
        reset(originalValues);
      }
    },
    [setValue, reset, originalValues, clearErrors],
  );

  /**
   * 필드 오류 설정 함수
   *
   * @param fieldName - 필드 이름
   * @param message - 오류 메시지
   */
  const setFormError = useCallback(
    (fieldName: string, message: string) => {
      setError(fieldName, { type: 'manual', message });
      handleFocus(fieldName);
    },
    [setError, handleFocus],
  );

  /**
   * 서버에서 받아온 데이터를 설정하는 함수
   *
   * @param data - 서버에서 받아온 데이터
   */
  const updateFormData = useCallback(
    (data?: Record<string, any>) => {
      reset(data || defaultValues);
      setOriginalValues(data || defaultValues);
    },
    [reset, defaultValues],
  );

  /**
   * 동적으로 필드를 등록하는 함수
   *
   * @param fieldConfig - 등록할 필드 설정
   */
  const registerField = useCallback(
    (fieldConfig: FormConfig) => {
      setDynamicBuilders((prev) => {
        // 이미 등록된 필드인지 확인
        const existingFieldIndex = prev.findIndex((builder) => builder.name === fieldConfig.name);

        if (existingFieldIndex !== -1) {
          // 기존 필드가 있으면 업데이트
          const newBuilders = [...prev];
          newBuilders[existingFieldIndex] = fieldConfig;
          return newBuilders;
        } else {
          // 새 필드 추가
          return [...prev, fieldConfig];
        }
      });

      // react-hook-form에 필드 기본값 설정
      const currentValue = getValues()[fieldConfig.name];
      if (currentValue === undefined) {
        setValue(fieldConfig.name, fieldConfig.value);
      }
    },
    [getValues, setValue],
  );

  /**
   * 동적으로 validator를 추가하는 함수
   *
   * @param fieldName - 필드 이름
   * @param validation - validation 설정
   */
  const addValidator = useCallback((fieldName: string, validation: any) => {
    setDynamicValidator((prev: any) => ({
      ...prev,
      [fieldName]: validation,
    }));
  }, []);

  /**
   * 모든 validator를 초기화하는 함수
   */
  // const clearAllValidators = useCallback(() => {
  //   setDynamicValidator({});
  //   setDynamicBuilders([]);
  //   // 폼 데이터도 완전히 초기화
  //   reset({});
  //   clearErrors();
  //   // fieldRefs도 초기화
  //   fieldRefs.current = {};
  // }, [reset, clearErrors]);
  const clearAllValidators = useCallback(() => {
    // 등록된 모든 필드 이름 가져오기
    const fieldNames = Object.keys(getValues());

    // 모든 필드를 unregister로 완전 제거
    fieldNames.forEach((fieldName) => {
      unregister(fieldName);
    });

    // 나머지 상태 초기화
    setDynamicValidator({});
    setDynamicBuilders([]);
    clearErrors();
    fieldRefs.current = {};
  }, [getValues, unregister, clearErrors]);

  // control 확장: 기본 control에 isFieldRequired 메서드 추가
  const extendedControl: DynamicFormProvider['control'] = useMemo(
    () => ({
      ...control,
      isFieldRequired,
    }),
    [control, isFieldRequired],
  );

  const getInitByBuilders = () => {
    const initData: { [key: string]: any } = {};
    dynamicBuilders.forEach((item) => {
      clearErrors(item.name);
      initData[item.name] = item.value;
    });
    return initData;
  };

  // 커스텀 setValue (값 설정 시 에러 클리어)
  const customSetValue = useCallback(
    (name: string, value: any, options?: any) => {
      setValue(name, value, options);
      clearErrors(name); // 값 변경 시 해당 필드의 에러 클리어
    },
    [setValue, clearErrors],
  );

  // provider 객체를 useMemo로 메모이제이션
  const provider = useMemo(
    () => ({
      control: extendedControl,
      builders: dynamicBuilders,
      fieldRefs,
      formState,
      onFormChange,
      getValues,
      setValue: customSetValue,
      onFormFocus: handleFocus,
      originalValues,
      clearFormError: clearErrors,
      trigger,
      registerField,
      addValidator,
      watch,
      clearAllValidators,
    }),
    [
      extendedControl,
      dynamicBuilders,
      formState,
      originalValues,
      onFormChange,
      handleFocus,
      registerField,
      addValidator,
      clearAllValidators,
      customSetValue,
      trigger,
    ],
  );

  // 커스텀 onFormValid 함수 (최신 schema로 validation 수행)
  const customOnFormValid = useCallback(async () => {
    try {
      const currentValues = getValues();

      // DOM에 실제로 렌더링된 필드들만 검증 대상으로 필터링
      const filteredValues: Record<string, any> = {};
      const renderedFields: string[] = [];

      // fieldRefs에 등록된 필드들만 현재 렌더링된 필드로 간주
      Object.keys(fieldRefs.current).forEach((fieldName) => {
        const fieldElement = fieldRefs.current[fieldName];
        if (fieldElement && fieldElement.isConnected) {
          renderedFields.push(fieldName);
          if (currentValues[fieldName] !== undefined) {
            filteredValues[fieldName] = currentValues[fieldName];
          }
        }
      });

      // 렌더링된 필드들에 대해서만 스키마 검증
      const filteredSchema = Object.keys(validator).reduce((acc, key) => {
        if (renderedFields.includes(key)) {
          acc[key] = validator[key];
        }
        return acc;
      }, {} as ValidatorConfig);

      const validationSchema = buildJodObject(filteredSchema);
      validationSchema.parse(filteredValues);
      clearErrors(); // 기존 에러 클리어
      return true;
    } catch (error: any) {
      clearErrors(); // 기존 에러 클리어
      console.log(error);

      // Zod 에러를 react-hook-form 에러로 변환
      if (error && error.issues) {
        error.issues.forEach((issue: any) => {
          if (issue.path && issue.path.length > 0) {
            // 현재 렌더링된 필드인지 확인
            const fieldName = issue.path[0];
            const fieldElement = fieldRefs.current[fieldName];
            if (fieldElement && fieldElement.isConnected) {
              setError(fieldName, {
                type: 'custom',
                message: issue.message,
              });
            }
          }
        });
      }
      return false;
    }
  }, [validator, getValues, setError, clearErrors, fieldRefs]);

  /**
   * 폼 제출 핸들러를 생성하는 함수.
   *
   * @param onValid - 유효성 검사 통과 시 호출할 콜백 함수
   * @returns 폼 제출 이벤트 핸들러
   */
  const formSubmit = useCallback(
    (onValid: (data: Record<string, any>) => void) => {
      return async (event: FormEvent<HTMLFormElement>) => {
        console.log('🚀 formSubmit called');
        event.preventDefault();

        // 먼저 커스텀 validation 실행
        const isValid = await customOnFormValid();
        console.log('🚀 validation result:', isValid);

        if (!isValid) {
          console.log('Form validation failed, submit canceled', formState.errors);
          // 첫 번째 에러 필드로 포커스 이동
          const errors = formState.errors;
          const firstErrorKey = Object.keys(errors)[0];
          if (firstErrorKey) {
            const errorFieldRef = fieldRefs.current[firstErrorKey] as HTMLDivElement | null;
            if (errorFieldRef) {
              errorFieldRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
              errorFieldRef.focus();
            }
            setFocus(firstErrorKey);
          }
          return; // validation 실패 시 submit 중단
        }

        // validation 통과 시에만 실행
        const data = getValues();
        const objectParams: Record<string, any> = {};
        dynamicBuilders.forEach((prop) => {
          const value = data[prop.name];
          // TODO date-range 에 대한 form data set 변경이 필요한경우 여기에 작성
          objectParams[prop.name] = value;
          // objectParams[prop.name] = value ?? '';
        });

        onValid(objectParams);
      };
    },
    [customOnFormValid, formState.errors, dynamicBuilders, getValues, setFocus],
  );

  const formValues = useMemo(() => {
    return (formState as any).values;
  }, [formState]);

  // provider 객체 반환
  return {
    provider,
    onFormValid: customOnFormValid,
    updateFormData,
    onSubmit: formSubmit,
    setFormError,
    getValues,
    setValue: customSetValue,
    clearFormError: clearErrors,
    formState,
    formValues,
    onFormChange,
    onFormFocus: handleFocus,
    control: extendedControl,
    watch,
    getInitByBuilders,
    clearAllValidators,
    onReset: onFormChange,
  };
};
