import { FormEvent, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DynamicFormProvider, UseDynamicFormResult, DynamicFormConfig } from './type';
import { z, ZodArray, ZodNullable, ZodObject, ZodOptional, ZodTypeAny } from 'zod';

/**
 * 주어진 폼 설정(config)을 기반으로 react-hook-form을 초기화하는 커스텀 훅.
 *
 * @param config - 동적 폼 설정 객체 (DynamicFormConfig)
 * @returns 동적 폼 생성 및 관리에 필요한 메서드와 provider 객체
 */
const useDynamicForm2 = <T extends DynamicFormConfig>(config: T): UseDynamicFormResult => {
  // 초기값 생성: 각 빌더의 기본 값을 설정
  const defaultValues = useMemo<Record<string, any>>(
    () =>
      config.builders.reduce((acc: Record<string, any>, prop) => {
        // TODO 날짜 형식의 경우 변환해야 한다면 여기에 구현 가능
        switch (prop.type) {
          /*case 'date-range':
            // date-range의 경우, from과 to 값을 '|' 구분자로 연결하여 저장
            acc[prop.name] = `${prop.value?.from || ''}|${prop.value?.to || ''}`;
            break;
          case 'multi-dropdown':
            // multi-dropdown은 배열 타입으로 초기화
            acc[prop.name] = prop.value || [];
            break;*/
          default:
            // 기본: prop.value가 있으면 사용, 없으면 빈 문자열 할당
            acc[prop.name] = prop.value ?? '';
            break;
        }
        return acc;
      }, {}),
    [config.builders],
  );

  // 원본 값 상태 설정
  const [originalValues, setOriginalValues] = useState(defaultValues);

  const createSchema = (config: DynamicFormConfig) => {
    const schemaConfig = config.builders.reduce(
      (schema, field) => {
        const { type, required, message } = field.validation || {};

        let fieldSchema: z.ZodType<any> = z.any();

        // ✅ 타입 체크 설정
        if (type === 'string') {
          fieldSchema = z.string();
        } else if (type === 'number') {
          fieldSchema = z.number();
        } else if (type === 'boolean') {
          fieldSchema = z.boolean();
        }

        // ✅ 기본 필수 값 검사 (refine 사용)
        if (required) {
          fieldSchema = fieldSchema.refine(
            (value) => value !== undefined && value !== null && value !== '',
            { message: message || `${field.label}은 필수값입니다.` },
          );
        }

        schema[field.name] = fieldSchema;
        return schema;
      },
      {} as Record<string, z.ZodType<any>>,
    );

    // ✅ 상태 기반 검사 (superRefine 사용)
    const schema = z.object(schemaConfig).superRefine((data, ctx) => {
      config.builders.forEach((field) => {
        const { dependsOn } = field.validation || {};

        if (dependsOn) {
          const targetValue = data[dependsOn.path];

          // 🔥 값이 존재할 때만 검사
          if (typeof dependsOn.condition === 'function') {
            if (!dependsOn.condition(targetValue)) {
              ctx.addIssue({
                code: 'custom',
                path: [field.name],
                message: dependsOn.message || `${field.label}의 값이 유효하지 않습니다.`,
              });
            }
          }
        }
      });
    });

    return schema;
  }; /*

  // Zod 스키마 생성 (유효성 검증 스키마)
  const schema = createZodSchema(config);*/

  // react-hook-form 훅 초기화
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(createSchema(config)),
  });

  // 각 필드의 DOM 노드를 저장할 ref 객체
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // react-hook-form 메서드 및 속성 추출
  const { control, handleSubmit, setFocus, getValues, reset, formState, setError, clearErrors } =
    methods;

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
            /* if (prop.type === 'date-range' && value) {
              const [from, to] = value.split('|');
              objectParams['startDate'] = from;
              objectParams['endDate'] = to;
            } else {

            }*/
            objectParams[prop.name] = value ?? '';
          });
          onValid(objectParams);
        },
        (errors) => {
          console.log('Validation Errors:', errors);
          // 첫 번째 에러 필드의 키를 추출
          const firstErrorKey = Object.keys(errors)[0];
          if (firstErrorKey) {
            const errorFieldRef = fieldRefs.current[firstErrorKey] as HTMLDivElement | null;
            // 에러 메시지 추출 (기본 메시지: 'Validation error')
            const errorMessage = errors[firstErrorKey]?.message || 'Validation error';
            // 에러가 있는 필드로 스크롤 및 포커스 이동
            if (errorFieldRef) {
              errorFieldRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
              errorFieldRef.focus();
            }
            setFocus(firstErrorKey);
          }
        },
      )();
    };
  };

  /**
   * 필드가 필수인지 확인하는 함수.
   *
   * @param fieldName - 필드 이름
   * @returns 필드가 필수라면 true, 그렇지 않으면 false 반환
   */
  const isFieldRequired = (fieldName: string): boolean => {
    if (!config.validator || !fieldName) return false;

    const parts = fieldName.split('.');
    let schema: ZodTypeAny | undefined = (config.validator as Record<string, ZodTypeAny>)[parts[0]];

    for (let i = 1; i < parts.length; i++) {
      if (!schema) return false;

      if (schema instanceof ZodObject) {
        schema = schema.shape[parts[i]];
      } else if (schema instanceof ZodArray) {
        if (!isNaN(Number(parts[i]))) continue;
        if (schema._def.type instanceof ZodObject) {
          schema = schema._def.type.shape[parts[i]];
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    if (!schema) return false;

    if (schema instanceof ZodOptional || schema instanceof ZodNullable) {
      return false;
    }

    return true;
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
    reset(values ?? originalValues);
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
  const fetchData = (data: Record<string, any>) => {
    setOriginalValues(data);
    reset(data);
  };

  // control 확장: 기본 control에 isFieldRequired 메서드 추가
  const extendedControl: DynamicFormProvider['control'] = {
    ...control,
    isFieldRequired,
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
      onFocus: handleFocus,
      originalValues,
    },
    fetchData,
    onSubmit: formSubmit,
    reset,
    setFormError,
    getValues,
    clearFormError: clearErrors,
    formState,
    onFormChange,
    control: extendedControl,
  };
};

export default useDynamicForm2;
