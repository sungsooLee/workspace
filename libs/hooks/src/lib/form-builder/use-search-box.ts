import { DynamicFormProvider, SearchBoxConfig, UseSearchBoxReturn } from './type';
import { useForm } from 'react-hook-form';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { extractSearchBoxDefaultValues } from './util';
import { buildJodObject, ValidatorConfig, ValidatorFormat } from '@learnway/shared';
import { zodResolver } from '@hookform/resolvers/zod';
/**
 * 동적 으로 검색 영역에 대한 지원을 하는 훅 (useSearchBox)
 *
 * @param config - SearchConfig 객체
 * @returns 동적 폼 상태 및 제어 함수 제공
 */
const useSearchBoxHook = <T extends SearchBoxConfig>(config: T): UseSearchBoxReturn => {
  // 기본값 추출
  const defaultValues = extractSearchBoxDefaultValues(config);
  // 원본값 상태 관리
  const [originalValues, setOriginalValues] = useState(defaultValues);
  const validator = useMemo<ValidatorConfig>(() => {
    const { builders, validator = {} } = config;

    const flattenBuilders = (list: any[]): any[] => {
      const result: any[] = [];
      list.forEach((item) => {
        if (Array.isArray(item)) {
          result.push(...flattenBuilders(item));
        } else if (item.type === 'group' && Array.isArray(item.builders)) {
          result.push(...flattenBuilders(item.builders));
        } else {
          result.push(item);
        }
      });
      return result;
    };

    const flatBuilders = flattenBuilders(builders);

    return flatBuilders.reduce((acc, builder) => {
      const key = builder.name;
      if (!key) return acc;

      const analogyFormat = typeof builder.value as ValidatorFormat;
      let format = builder.format || analogyFormat;

      const existingValidator = validator[key] as any;
      if (existingValidator?.format) {
        format = existingValidator.format;
      }

      acc[key] = {
        format,
        required: { required: false },
      };

      if (existingValidator) {
        if (typeof existingValidator === 'boolean') {
          acc[key].required = { required: existingValidator };
        } else if (typeof existingValidator.required === 'function') {
          acc[key].required = { required: true, fn: existingValidator.required };
        } else if (typeof existingValidator === 'object') {
          acc[key].required = {
            required: existingValidator.required ?? false,
            ...(existingValidator.required?.fn && { fn: existingValidator.required.fn }),
            ...(existingValidator.required?.message && {
              message: existingValidator.required.message,
            }),
            ...(existingValidator.required?.path && {
              path: existingValidator.required.path,
            }),
          };
          if (existingValidator.conditions) {
            acc[key].conditions = existingValidator.conditions;
          }
        }
      }

      return acc;
    }, {} as ValidatorConfig);
  }, [config]);

  // Zod 스키마 생성 (유효성 검증 스키마)
  const schema = buildJodObject(validator);
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  // 각 필드의 DOM 노드를 저장할 ref 객체
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
          // TODO date-range 에 대한 form data set 변경이 필요한경우 여기에 작성
          /*const objectParams: Record<string, any> = {};
          config.builders.forEach((prop) => {
            const value = data[prop.name];
            objectParams[prop.name] = value ?? '';
          });*/
          onValid(data);
        },
        (errors) => {
          console.log('Validation Errors:', errors);
          // 첫 번째 에러 필드의 키를 추출
          const firstErrorKey = Object.keys(errors)[0];
          if (firstErrorKey) {
            setFocus(firstErrorKey);
          }
        },
      )();
    };
  };

  /**
   * 필드 포커스를 설정하는 함수.
   *
   * @param fieldName - 포커스를 설정할 필드 이름
   */
  const handleFocus = (fieldName: string) => {
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

  // control 확장: 기본 control에 isFieldRequired 메서드 추가
  const extendedControl: DynamicFormProvider['control'] = {
    ...control,
    isFieldRequired: (fieldName: string) => false,
  };

  /**
   * 서버에서 받아온 데이터를 설정하는 함수 원본데이터를 변경한다.
   *
   * @param data - 서버에서 받아온 데이터
   */
  const fetchData = (data: Record<string, any>) => {
    reset(data);
    setOriginalValues(data);
  };

  // provider 객체 반환
  return {
    provider: {
      control: extendedControl,
      builders: config.builders,
      formState,
      onFormChange,
      getValues,
      onFormFocus: handleFocus,
      originalValues,
      onSubmit: formSubmit,
    },
    fetchData,
    setFormError,
    getValues,
    clearFormError: clearErrors,
    formState,
    onFormChange,
    onFormFocus: handleFocus,
    control: extendedControl,
  };
};

export const useSearchBox = useSearchBoxHook;
