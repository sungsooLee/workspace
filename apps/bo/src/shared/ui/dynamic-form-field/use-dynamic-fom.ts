// useDynamicForm.ts
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createZodSchema } from '../search-box/create-jod-schema';
import { DynamicFormConfig } from './type'; // 유효성 스키마 생성 함수
import { ZodObject, ZodArray, ZodOptional, ZodNullable, ZodTypeAny } from 'zod';
/**
 * 주어진 폼 설정(config)을 기반으로 react-hook-form을 초기화하는 커스텀 훅.
 *
 * @param config - 동적 폼 설정 객체 (DetailConfig)
 * @returns 동적 폼 생성 및 관리에 필요한 메서드와 provider 객체
 */
const useDynamicForm = (config: DynamicFormConfig) => {
  // 초기값 생성: 각 빌더의 기본 값을 설정
  const defaultValues = config.builders.reduce((acc: any, prop: any) => {
    // 각 필드의 타입에 따라 초기값을 설정
    switch (prop.type) {
      case 'date-range':
        // date-range의 경우, from과 to 값을 '|' 구분자로 연결하여 저장
        acc[prop.name] = (prop.value.from || new Date()) + '|' + (prop.value.to || new Date());
        break;
      case 'multi-dropdown':
        // multi-dropdown은 배열 타입으로 초기화
        acc[prop.name] = prop.value || [];
        break;
      default:
        // 기본: prop.value가 있으면 사용, 없으면 빈 문자열 할당
        acc[prop.name] = prop.value || '';
        break;
    }
    return acc;
  }, {}); // 초기값을 담은 객체

  // Zod 스키마 생성 (유효성 검증 스키마)
  const schema = createZodSchema(config);

  // react-hook-form 훅 초기화
  const methods = useForm<any>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  // 각 필드의 DOM 노드를 저장할 ref 객체
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // react-hook-form 메서드 및 속성 추출
  const { control, handleSubmit, setFocus, getValues, reset, watch } = methods;

  /**
   * 폼 제출 핸들러를 생성하는 함수.
   *
   * @param onValid - 유효성 검사 통과 시 호출할 콜백 함수
   * @returns 폼 제출 이벤트 핸들러
   */
  const formSubmit = (onValid: (data: any) => void): React.FormEventHandler<HTMLFormElement> => {
    return (event) => {
      event.preventDefault(); // 기본 폼 제출 동작 방지

      handleSubmit(
        (data) => {
          const objectParams: any = {};
          // 각 빌더에 대해 제출된 데이터를 재구성
          config.builders.forEach((prop: any) => {
            const value = data[prop.name];
            if (prop.type === 'date-range') {
              // date-range 타입은 'startDate'와 'endDate'로 분리
              objectParams['startDate'] = value.split('|')[0];
              objectParams['endDate'] = value.split('|')[1];
            } else {
              objectParams[prop.name] = value;
            }
          });
          // 가공된 데이터를 onValid 콜백에 전달
          onValid(objectParams);
        },
        (errors) => {
          console.error('Validation Errors:', errors);
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
   * 확장된 isFieldRequired 함수
   * - fieldName에 대해 중첩(ZodObject, ZodArray) 스키마를 탐색하여
   *   해당 필드가 optional 또는 nullable이면 false, 그렇지 않으면 true를 반환합니다.
   *
   * @param fieldName - 예: "lowerGubun.gubun" 또는 "userInfos.0.user-name"
   * @returns 필드가 required면 true, 아니면 false
   */
  const isFieldRequired = (fieldName: string): boolean => {
    if (!config.validator) return false;

    // fieldName을 '.' 기준으로 분리하여 각 단계의 스키마를 찾아간다.
    const parts = fieldName.split('.');
    let schema: ZodTypeAny | undefined = config.validator[parts[0]];

    for (let i = 1; i < parts.length; i++) {
      if (!schema) return false;

      // 현재 스키마가 객체라면, 해당 속성의 스키마로 내려간다.
      if (schema instanceof ZodObject) {
        schema = schema.shape[parts[i]];
      }
      // 현재 스키마가 배열이면, 배열의 요소 타입으로 내려간다.
      else if (schema instanceof ZodArray) {
        // 만약 parts[i]가 숫자(배열 인덱스)라면 건너뛴다.
        if (!isNaN(Number(parts[i]))) {
          continue;
        } else if (schema._def.type instanceof ZodObject) {
          // 배열 요소가 객체인 경우, 해당 속성으로 내려간다.
          schema = schema._def.type.shape[parts[i]];
        } else {
          // 배열 요소가 객체가 아니라면 더 이상 내려갈 수 없음.
          return false;
        }
      } else {
        // 더 이상 중첩 구조가 아니라면 종료.
        return false;
      }
    }

    if (!schema) return false;

    // 해당 스키마가 optional 또는 nullable 인지 확인.
    if (schema instanceof ZodOptional || schema instanceof ZodNullable) {
      return false;
    }
    return true;
  };

  // control 확장: 기본 control에 isFieldRequired 메서드 추가
  const extendedControl = {
    ...control,
    isFieldRequired: (fieldName: string) => !!(config.validator && config.validator[fieldName]), // 필수 여부 확인,
  };

  const handleFocus = (fieldName: string) => {
    const errorFieldRef = fieldRefs.current[fieldName] as HTMLDivElement | null;
    // 에러 메시지 추출 (기본 메시지: 'Validation error')
    // 에러가 있는 필드로 스크롤 및 포커스 이동
    if (errorFieldRef) {
      errorFieldRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      errorFieldRef.focus();
    }
    setFocus(fieldName);
  };

  /**
   * 폼 리셋 함수.
   * @param values - 새로운 초기값 (선택 사항). 전달하지 않으면 기본값으로 리셋.
   */
  const resetForm = (values?: any) => {
    if (values) {
      reset(values);
    } else {
      reset(defaultValues);
    }
  };

  // provider 객체 구성: 동적 폼에 필요한 모든 정보와 메서드 포함
  return {
    provider: {
      ...config,
      control: extendedControl,
      watch,
      onFormChange: resetForm,
      formSubmit,
      fieldRefs,
      formData: getValues(),
      onFocus: handleFocus,
    },
    control,
    getValues,
    onSubmit: formSubmit,
    reset: resetForm,
  };
};

export default useDynamicForm;
