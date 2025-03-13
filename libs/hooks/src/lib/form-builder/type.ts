import { SelectOption } from '@learnway/ui';
import {
  ComponentType,
  FormEventHandler,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  RefObject,
} from 'react';
import { ZodObject, ZodTypeAny } from 'zod';
import { UseFormReturn } from 'react-hook-form';
/*===================================
    useDynamicForm Type 정의
  ===================================*/
/**
 * 모든 폼 필드에 공통으로 사용되는 속성을 정의합니다.
 */
export type BaseFormFieldConfigProps<T = string> = {
  /** 필드의 값 (제네릭으로 정의) */
  value?: T;
  /** 필드의 이름 (고유 값) */
  name: string;
  /** 필드의 레이블 (화면에 표시될 이름) */
  label?: string;
  /** 필드 설명 (추가 정보 제공) */
  description?: string;
  /** 필드의 입력란에 표시될 플레이스홀더 */
  placeholder?: string;
  /* 툴팁 */
  tooltip?: string;
  /* 가이드 텍스트 */
  guideText?: string;
  /* 서브 텍스트 */
  subText?: string;
};

/**
 * 동적 폼에서 사용되는 개별 필드의 속성을 정의합니다.
 * 필드 타입에 따라 추가 속성이 달라집니다.
 */
export type FormConfig =
  | (BaseFormFieldConfigProps<string> & {
      /** 필드 타입이 텍스트 또는 텍스트 영역인 경우 */
      type: 'text' | 'textarea';
      /** 입력 가능한 최대 길이 */
      maxLength?: number;
    })
  | (BaseFormFieldConfigProps<boolean> & {
      /** 필드 타입이 스위치 또는 체크박스인 경우 */
      type: 'switch' | 'checkbox';
      dpOptions?: {
        label?: string;
      };
    })
  | (BaseFormFieldConfigProps<string> & {
      /** 필드 타입이 드롭다운인 경우 */
      type: 'dropdown' | 'multi-dropdown';
      /** 드롭다운 옵션 항목 목록 */
      options: SelectOption[];
      /** 옵션 구성 설정 */
      optionsConfig?: {
        /** 옵션 타입: self → 고정값, target → 다른 필드에서 동적 값 */
        type: 'self' | 'target';
        /** 타겟 필드 이름 (type이 'target'일 경우) */
        target?: string;
        /** 코드 그룹 (서버에서 받아온 코드 그룹) */
        codeGroup?: string;
        /** 옵션 API (서버에서 값을 받아오는 경우) */
        api?: (param?: any) => {
          queryKey: any;
          queryFn: () => Promise<any>;
          [key: string]: any;
        };
        /* 초기값 */
        options?: SelectOption[];
        /** 응답 후 데이터 변환 콜백 */
        callback?: (response: any) => SelectOption[];
      };
    })
  | (BaseFormFieldConfigProps<any> & {
      /** 필드 타입이 객체 또는 배열인 경우 */
      type: 'object' | 'array';
      /** 하위 필드 정의 */
      fields?: FormConfig[];
    })
  | (BaseFormFieldConfigProps<any> & {
      /** 필드 타입이 사용자 정의 컴포넌트인 경우 */
      type: 'custom';
      options?: SelectOption[];
    })
  | (BaseFormFieldConfigProps<any> & {
      /** 필드 타입이 Display 하지 않을 경우 */
      type: 'hidden';
    });

/**
 * 폼 설정 객체 타입 정의
 */
export type DynamicFormConfig = {
  /** 개별 필드 설정 배열 */
  builders: FormConfig[];
  /** 유효성 검사 스키마 (zod 기반) */
  validator?: { [key: string]: ZodTypeAny };
};

/**
 * 동적 폼에서 사용하는 상태 및 메서드 타입 정의
 */
export type DynamicFormProvider = {
  /** react-hook-form에서 제공하는 컨트롤 객체 */
  control: UseFormReturn['control'] & {
    /** 필드가 필수인지 확인하는 함수 */
    isFieldRequired: (fieldName: string) => boolean;
  };
  /** 동적 폼 필드 설정 목록 */
  builders: FormConfig[];
  /** 필드의 DOM 참조 객체 */
  fieldRefs: RefObject<Record<string, any | null>>;
  /** 폼 상태 정보 */
  formState: UseFormReturn['formState'];
  /** 필드 값 변경 핸들러 */
  onFormChange: (values?: Record<string, any>) => void;
  /** 필드 값 가져오기 */
  getValues: UseFormReturn['getValues'];
  /** 필드에 포커스를 설정하는 함수 */
  onFocus: (fieldName: string) => void;
  /** 초기 필드 값 */
  originalValues: Record<string, any>;
};

/**
 * useDynamicForm 훅에서 반환되는 객체 타입 정의
 */
export type UseDynamicFormResult = {
  /** 동적 폼 프로바이더 객체 */
  provider: DynamicFormProvider;
  /** 서버에서 받은 데이터를 기반으로 값 업데이트 */
  fetchData: (data: Record<string, any>) => void;
  /** 제출 이벤트 핸들러 */
  onSubmit: (onValid: (data: Record<string, any>) => void) => FormEventHandler<HTMLFormElement>;
  /** 필드 값 초기화 */
  reset: (values?: Record<string, any>) => void;
  /** 필드에 에러 메시지 설정 */
  setFormError: (fieldName: string, message: string) => void;
  /** 필드 에러 제거 */
  clearFormError: () => void;
  /** 현재 폼 상태 */
  formState: UseFormReturn['formState'];

  /** 필드 값 변경 핸들러 */
  onFormChange: (values?: Record<string, any>) => void;

  /** react-hook-form에서 제공하는 컨트롤 객체 */
  control: UseFormReturn['control'] & {
    /** 필드가 필수인지 확인하는 함수 */
    isFieldRequired: (fieldName: string) => boolean;
  };
};

// dynamic form config value 추적을 위한 타입 정의
export type DynamicFormValues<T extends DynamicFormConfig> = {
  [K in T['builders'][number]['name']]: any; // 각 필드의 이름을 Key로 추가
};

/*===================================
    useFormRow Type 정의
  ===================================*/
/**
 * 필드 상태 타입
 */
export type ErrorState = {
  isError: boolean;
  message?: string;
};

// 공통으로 넘겨줄 props 정의
export interface BaseFormFieldProps<T = any> {
  control: UseFormReturn['control'] & {
    isFieldRequired: (fieldName: string) => boolean;
  };
  value?: T;
  name: string; // name은 필수로 넘겨줘야 함
  onChange: (value: T) => void;
  disabled?: boolean;
}

// 컴포넌트에서 추가적으로 사용할 props 정의
export type FormFieldProps<P = {}, R = HTMLDivElement, T = any> = ForwardRefExoticComponent<
  BaseFormFieldProps<T> & P & RefAttributes<R>
>;

export type FormFieldConfig = Record<string, FormFieldProps<any>>;

export interface FormRowProps {
  className?: string;
  provider: DynamicFormProvider;
  children: ReactNode;
  name?: string;
}
