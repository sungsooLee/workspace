import { FormEvent, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DynamicFormConfig, DynamicFormProvider, UseDynamicFormResult } from './type';
import { extractDynamicFormDefaultValues } from './util';
import { buildJodObject, ValidatorConfig, ValidatorFormat } from '@learnway/shared';

/**
 * 주어진 폼 설정(config)을 기반으로 react-hook-form을 초기화하는 커스텀 훅.
 *
 * @param config - 동적 폼 설정 객체 (DynamicFormConfig)
 * @returns 동적 폼 생성 및 관리에 필요한 메서드와 provider 객체
 */
export const useDynamicForm = <T extends DynamicFormConfig>(config: T): UseDynamicFormResult => {
  // 초기값 생성: 각 빌더의 기본 값을 설정
  const defaultValues = extractDynamicFormDefaultValues(config.builders);

  // 원본 값 상태 설정
  const [originalValues, setOriginalValues] = useState(defaultValues);

  /**
   * Dynamic Config 에서는 좀더 편하게 쓰기 위해 약간의 타입이 달라서 buildJodObject 에 맞게 수정 한다.
   */
  const validator = useMemo<ValidatorConfig>(() => {
    const { builders, validator = {} } = config; // validator가 없으면 빈 객체로 설정
    return builders.reduce((acc, builder) => {
      const key = builder.name;
      const analogyFormat = typeof builder.value as ValidatorFormat;
      let format = builder.format || analogyFormat;

      const existingValidator = validator[key] as any;
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
  }, []);
  // Zod 스키마 생성 (유효성 검증 스키마)
  const schema = buildJodObject(validator);
  // react-hook-form 훅 초기화
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(schema),
  });

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
  } = methods;
  /**
   * 폼 제출 핸들러를 생성하는 함수.
   *
   * @param onValid - 유효성 검사 통과 시 호출할 콜백 함수
   * @returns 폼 제출 이벤트 핸들러
   */
  const formSubmit = (onValid: (data: Record<string, any>) => void) => {
    return (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSubmit(
        (data) => {
          const objectParams: Record<string, any> = {};
          config.builders.forEach((prop) => {
            const value = data[prop.name];
            // TODO date-range 에 대한 form data set 변경이 필요한경우 여기에 작성
            objectParams[prop.name] = value ?? '';
          });

          onValid(objectParams);
        },
        (errors) => {
          // 첫 번째 에러 필드의 키를 추출 - builders 순서에 따라
          const firstErrorKey = config.builders.find((builder) => errors[builder.name])?.name;

          if (firstErrorKey) {
            // 현재 포커스된 요소가 이미 에러 필드 중 하나인지 확인
            const currentFocusedField = document.activeElement;
            const errorFieldNames = Object.keys(errors);
            const isAlreadyFocusedOnErrorField = errorFieldNames.some((errorFieldName) => {
              const errorField = fieldRefs.current[errorFieldName];
              return errorField && errorField.contains(currentFocusedField);
            });

            // 이미 에러 필드에 포커스가 있다면 추가로 포커스를 변경하지 않음
            if (!isAlreadyFocusedOnErrorField) {
              // 다른 setError 호출이 완료된 후에 포커스를 설정하도록 지연
              setTimeout(() => {
                const errorFieldRef = fieldRefs.current[firstErrorKey] as HTMLDivElement | null;

                if (errorFieldRef) {
                  // 에러가 있는 필드로 스크롤 이동
                  errorFieldRef.scrollIntoView({ behavior: 'smooth', block: 'center' });

                  // 해당 필드 내의 실제 input 요소를 찾아서 포커스 설정
                  // DuplicateCheckTextField가 정상적으로 포커스 안되어서 해당 소스 추가
                  const inputElement = errorFieldRef.querySelector(
                    'input, textarea, select',
                  ) as HTMLElement;
                  if (inputElement) {
                    inputElement.focus();
                  } else {
                    errorFieldRef.focus();
                  }
                }
              }, 50);
            }
          }
        },
      )();
    };
  };
  /**
   * 필수값 확인 함수
   * @param fieldName
   */
  const isFieldRequired = (fieldName: string): boolean => {
    const config = validator[fieldName];
    if (!config || typeof config.required !== 'object' || config.required === null) return false;
    return config.required.required || false;
  };

  /**
   * 필드 포커스를 설정하는 함수.
   *
   * @param fieldName - 포커스를 설정할 필드 이름
   */
  const handleFocus = (fieldName: string) => {
    const field = fieldRefs.current[fieldName];
    if (field) {
      field.scrollIntoView({ behavior: 'smooth', block: 'center' });
      field.focus();
    }
    setFocus(fieldName);
  };

  /**
   * 필드 값 초기화
   *
   * @param values - 새로운 초기값 (선택 사항)
   */
  const onFormChange = (values?: Record<string, any>) => {
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      reset(originalValues);
    }
  };

  /**
   * 필드 오류 설정 함수
   *
   * @param fieldName - 필드 이름
   * @param message - 오류 메시지
   */
  const setFormError = (fieldName: string, message: string) => {
    setError(fieldName, { type: 'manual', message });
    handleFocus(fieldName);
  };

  /**
   * 서버에서 받아온 데이터를 설정하는 함수
   *
   * @param data - 서버에서 받아온 데이터
   */
  const updateFormData = (data?: Record<string, any>) => {
    reset(data || defaultValues);
    setOriginalValues(data || defaultValues);
  };

  // control 확장: 기본 control에 isFieldRequired 메서드 추가
  const extendedControl: DynamicFormProvider['control'] = {
    ...control,
    isFieldRequired,
  };

  const getInitByBuilders = () => {
    const initData: { [key: string]: any } = {};
    config.builders.forEach((item) => {
      clearErrors(item.name);
      initData[item.name] = item.value;
    });
    return initData;
  };

  // provider 객체 반환
  return {
    provider: {
      control: extendedControl,
      builders: config.builders,
      fieldRefs,
      formState,
      onFormChange,
      getValues,
      setValue,
      onFormFocus: handleFocus,
      originalValues,
      clearFormError: clearErrors,
      registerField: () => null,
      addValidator: () => null,
    },
    onFormValid: trigger,
    updateFormData,
    onSubmit: formSubmit,
    setFormError,
    getValues,
    setValue,
    clearFormError: clearErrors,
    formState,
    onFormChange,
    onFormFocus: handleFocus,
    control: extendedControl,
    watch,
    getInitByBuilders,
  };
};
