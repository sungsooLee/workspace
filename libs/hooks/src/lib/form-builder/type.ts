import {
  FormEvent,
  FormEventHandler,
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
  RefAttributes,
  RefObject,
} from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CODE_GROUP_TYPE } from '../code/constants';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  subLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  extra?: any;
}

/*===================================
    useDynamicForm Type 정의
  ===================================*/
/**
 * 모든 폼 필드에 공통으로 사용되는 속성을 정의합니다.
 */
export type BaseFormFieldConfigProps<T = string> = {
  /** 필드의 값 (제네릭으로 정의) */
  value: T;
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

  format?: 'string' | 'number' | 'date' | 'datetime' | 'email' | 'array' | 'object' | 'boolean';
  [key: string]: any;
};

export type ApiType = (param?: any) => {
  queryKey: any;
  queryFn: () => Promise<any>;
  [key: string]: any;
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
      /** 필드 타입이 스위치인 경우 */
      type: 'switch';
      switchConfig?: {
        label: string | ((value: boolean, getValues: UseFormReturn['getValues']) => string);
        guideText?: (value: boolean, getValues: UseFormReturn['getValues']) => string;
      };
    })
  | (BaseFormFieldConfigProps<boolean> & {
      /** 필드 타입이 체크박스인 경우 */
      type: 'checkbox';
      checkConfig?: {
        reverse?: boolean;
      };
    })
  | (BaseFormFieldConfigProps<string> & {
      /** 필드 타입이 드롭다운인 경우 */
      type: 'dropdown' | 'multi-dropdown';
      dropdownConfig?: {
        variant?: string; // ReactSelectComponentProps.variant
      };
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
        api?: ApiType;
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
      type: 'hidden' | string;
    });

export type FormValidatorConfig = {
  [key: string]:
    | boolean // 단순히 필수 값일 경우 true/false로 설정
    | {
        /**
         * 데이터 형식 지정 (옵션)
         * - 'string' → 문자열
         * - 'number' → 숫자
         * - 'date' → 날짜
         * - 'datetime' → 날짜 + 시간
         * - 'email' → 이메일 형식
         * - 'array' → 배열 형식
         * - 'object' → 객체 형식
         */
        format?:
          | 'string'
          | 'number'
          | 'date'
          | 'datetime'
          | 'email'
          | 'array'
          | 'object'
          | 'password'
          | 'phone-number';
        /**
         * 필수 값 설정
         * - true → 필수 값 설정
         * - 함수 → 다른 값에 따라 동적으로 필수 여부 결정 가능
         * - 객체 → 필수 값 조건 및 메시지 처리 가능
         */
        required?:
          | boolean
          | ((values: Record<string, any>) => boolean) // 값 기반 동적 필수 설정
          | {
              /**
               * 필수 값 검증 함수
               * - 값이 유효한 경우 true 반환
               * - 값이 유효하지 않은 경우 false 반환
               * @param values - 전체 값 객체
               */
              fn?: (values: Record<string, any>) => boolean;
              // 필수 값 오류 발생 시 표시할 메시지 (옵션)
              message?: string;
              // 필수 값 오류 발생 위치
              path?: string;
            };
        /**
         * 값의 유효성 조건 설정 (다중 조건 가능)
         * - 여러 개의 조건을 배열로 설정 가능
         */
        conditions?: {
          /**
           * 값 검증 함수
           * - 값이 유효한 경우 true 반환
           * - 값이 유효하지 않은 경우 false 반환
           * @param values - 전체 값 객체
           */
          fn: (values: Record<string, any>) => boolean;

          /**
           * 오류 발생 시 표시할 메시지 (옵션)
           */
          message?: string;

          /**
           * 오류가 발생한 값의 위치 설정 (옵션)
           * - 값이 속한 필드 이름 설정 가능
           */
          path?: string;
        }[];
      };
};

/**
 * 폼 설정 객체 타입 정의
 */
export type DynamicFormConfig = {
  /** 개별 필드 설정 배열 */
  builders: FormConfig[];
  /** 유효성 검사 스키마 (zod 기반) */
  validator?: FormValidatorConfig;
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
  /** focus 변경 */
  onFormFocus: (fieldName: string) => void;
  /** 필드 값 가져오기 */
  getValues: UseFormReturn['getValues'];
  /** 초기 필드 값 */
  originalValues: Record<string, any>;
  /** 필드 에러 제거 */
  clearFormError: (field: string) => void;
};

/**
 * useDynamicForm 훅에서 반환되는 객체 타입 정의
 */
export type UseDynamicFormResult = {
  /** 동적 폼 프로바이더 객체 */
  provider: DynamicFormProvider;
  /** 서버에서 받은 데이터를 기반으로 값 업데이트 */
  fetchData: (data?: Record<string, any>) => void;
  /** 제출 이벤트 핸들러 */
  onSubmit: (onValid: (data: Record<string, any>) => void) => FormEventHandler<HTMLFormElement>;
  /** 필드에 에러 메시지 설정 */
  setFormError: (fieldName: string, message: string) => void;
  /** 필드 에러 제거 */
  clearFormError: (field: string) => void;
  /** focus 변경 */
  onFormFocus: (fieldName: string) => void;
  /** 현재 폼 상태 */
  formState: UseFormReturn['formState'];
  /** 현재 폼 데이터 가져오기 */
  getValues: UseFormReturn['getValues'];
  /** 현재 폼 유효성 강제 체크 하기 */
  onFormValid: UseFormReturn['trigger'];
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

type CustomConfig = {
  // 2025-05-29 , 다른 field 값에 따라 placeholder 가 변경되어야 하는 요건이 있어서 추가함
  placeholder?: {
    target: string;
    placeholder: string | ((data: Record<string, any>) => string);
  };
};

// 공통으로 넘겨줄 props 정의
export interface BaseFormFieldProps<T = any> {
  control: UseFormReturn['control'];
  value: T;
  name: string; // name은 필수로 넘겨줘야 함
  onChange: (value: T) => void;
  disabled: boolean;
  onChangeGuideText: (guidText: string) => void;
  onChangeInfoArea: (children: ReactNode) => void;
  onFormChange: (values: Record<string, any>) => void;
  getValues: UseFormReturn['getValues'];
  customConfig: CustomConfig;
  [key: string]: any;
}

// ✅ 컴포넌트별 추가 props 정의 (자유롭게 정의 가능)
type FormFieldProps<Props = {}> = ForwardRefExoticComponent<
  BaseFormFieldProps<any> & Props & RefAttributes<any>
>;

export type FormFieldConfig = Record<string, FormFieldProps<any>>;

export interface FormRowProps {
  className?: string;
  provider: DynamicFormProvider;
  children?: ReactNode;
  name: string;
  element?: ReactElement;
  formFieldConfig: FormFieldConfig;
  style?: 'bo' | 'fo';
}

/*===================================
    searchBox Type 정의
  ===================================*/
/**
 * OnValidCallback
 * 폼 제출 후 유효성 검증에 통과한 데이터를 인자로 받는 콜백 함수 타입.
 */
export type OnValidCallback = (params: Record<string, any>) => void;

export type ApiCallback<T> = (response: any) => SelectOption[];
/**
 * 동적으로 옵션을 생성할 때 사용하는 설정.
 * @template T - API 응답 데이터의 타입.
 */
export interface OptionsConfig<T = any> {
  codeGroup?: CODE_GROUP_TYPE; // 옵션을 가져오기 위한 코드 그룹.
  options?: SelectOption[]; // 미리 정의된 정적 옵션
}
// TODO. Form 은 외부에서 주입이 가능하지만 SearchBox 는 외부 주입이 불가능 하므로 아래와 같은
// TODO. 옵션을 이용하던지 SearchBox에서 외부 options 를 주입하는 방식도 좋아 보입니다.
// EX) options = {name : [...nameOptions], code: [...codeOptions]}
/**
 * target?: string; // 타 필드의 이름. optionsConfig가 다른 필드에 의존할 경우 사용.
 * excludeValues?: string[];
 *  type?: 'self' | 'target'; // 옵션 생성 방식: 'self'는 자체 옵션, 'target'은 타 필드에 의존. 기본값 self
 *   filter?: {
 *     target: string;
 *     value: string;
 *     fn: (options: SelectOption[]) => SelectOption[];
 *   };
 */

/*===================================
    searchBox Type 정의
  ===================================*/

/* 그룹 타입 추가 */
/* 그룹 타입 추가 (name을 선택 속성으로 설정) */
export type GroupConfig = Omit<BaseFormFieldConfigProps, 'name'> & {
  type: 'group';
  builders: FormConfig[];
};

/**
 * 동적 폼 설정 객체 타입 정의
 */
/**
 * 검색 박스 설정 타입
 * - 동적으로 생성되는 폼 필드 설정을 정의
 * - 중첩된 구조를 지원하기 위해 재귀적인 타입 정의
 */
export type SearchBoxConfig = {
  /** 빌더 설정 배열 (2차원 배열) */
  builders: (FormConfig | GroupConfig)[][];
  /** 유효성 검사 스키마 (zod 기반) */
  validator?: { [key: string]: any };
};

/**
 * 검색 박스에서 사용하는 상태 및 제어 객체 타입
 * - react-hook-form과 연결된 상태와 메서드를 제공
 */
export type SearchBoxProvider = {
  /** react-hook-form에서 제공하는 컨트롤 객체 */
  control: UseFormReturn['control'] & {
    /**
     * 필드가 필수인지 확인하는 함수
     *
     * @param fieldName - 확인할 필드 이름
     * @returns 필드가 필수일 경우 true 반환
     */
    isFieldRequired: (fieldName: string) => boolean;
  };

  /** 빌더 설정 배열 */
  builders: (FormConfig | GroupConfig)[][];

  /** react-hook-form의 상태 정보 */
  formState: UseFormReturn['formState'];

  /**
   * 필드 값 변경 함수
   *
   * @param values - 변경할 값 객체
   * - key는 필드 이름, value는 해당 필드의 값
   */
  onFormChange: (values?: Record<string, any>) => void;

  /**
   * 폼의 현재 값 가져오기 함수
   *
   * @returns 현재 필드 값 객체 반환
   */
  getValues: UseFormReturn['getValues'];

  /**
   * 특정 필드에 포커스를 설정하는 함수
   *
   * @param fieldName - 포커스를 설정할 필드 이름
   */
  onFormFocus: (fieldName: string) => void;

  /** 초기 필드 값 객체 (최초 값 상태) */
  originalValues: Record<string, any>;

  /**
   * 폼 제출 함수
   *
   * @param onValid - 유효성 검사 통과 시 호출할 콜백 함수
   * @returns 폼 제출 이벤트 핸들러 반환
   */
  onSubmit: (
    onValid: (data: Record<string, any>) => void,
  ) => (event: FormEvent<HTMLFormElement>) => void;
};

/* ================================
 * 검색 박스 훅 반환 타입 정의
 * ================================ */

/**
 * 검색 박스 훅 반환 타입
 * - 검색 박스를 제어하는 메서드 및 상태 제공
 */
export type UseSearchBoxReturn = {
  /** 검색 박스 상태 및 제어 객체 */
  provider: SearchBoxProvider;

  /**
   * 서버에서 받아온 데이터를 설정하는 함수
   *
   * @param data - 서버에서 받아온 값 객체
   * - key는 필드 이름, value는 해당 필드의 값
   */
  fetchData: (data: Record<string, any>) => void;

  /**
   * 특정 필드에 에러 메시지 설정 함수
   *
   * @param fieldName - 필드 이름
   * @param message - 설정할 에러 메시지
   */
  setFormError: (fieldName: string, message: string) => void;

  /**
   * 폼의 현재 값 가져오기 함수
   *
   * @returns 현재 필드 값 객체 반환
   */
  getValues: UseFormReturn['getValues'];

  /**
   * 설정된 폼의 에러 메시지를 제거하는 함수
   */
  clearFormError: UseFormReturn['clearErrors'];

  /** react-hook-form의 상태 정보 */
  formState: UseFormReturn['formState'];

  /**
   * 필드 값 변경 함수
   *
   * @param values - 변경할 값 객체
   * - key는 필드 이름, value는 해당 필드의 값
   */
  onFormChange: (values?: Record<string, any>) => void;

  /** 현재 폼 유효성 강제 체크 하기 */
  onFormValid: UseFormReturn['trigger'];
  /**
   * 특정 필드에 포커스를 설정하는 함수
   *
   * @param fieldName - 포커스를 설정할 필드 이름
   */
  onFormFocus: (fieldName: string) => void;

  /** react-hook-form에서 제공하는 컨트롤 객체 */
  control: UseFormReturn['control'] & {
    /**
     * 필드가 필수인지 확인하는 함수
     * @param fieldName - 확인할 필드 이름
     * @returns 필드가 필수일 경우 true 반환
     */
    isFieldRequired: (fieldName: string) => boolean;
  };
};

export type DynamicFormContextType = {
  guideText: string; // 가이드 택스트
  infoArea: ReactNode | null; // Info Araea
  onChangeGuideText: (text: string | ReactNode) => void;
  onChangeInfoArea: (text: ReactNode | null) => void;
};

export type UseFormOptionsProps = {
  options?: SelectOption[];
  optionsConfig?: OptionsConfig;
};
