import { z } from 'zod';
import { ButtonVariantType, SelectOption } from '@learnway/ui';
import { CODE_GROUP } from '@learnway/config';
import { FormState, UseFormGetValues } from 'react-hook-form/dist/types/form';

/*======================================
=            API 관련 타입             =
======================================*/

/**
 * API 응답의 제네릭 인터페이스.
 * @template T - 응답 데이터의 타입.
 */
export interface ApiResponse<T> {
  /** API에서 반환하는 데이터 배열 */
  data: T[];
}

/**
 * API 함수를 표현하는 타입.
 * @template T - 반환 데이터의 타입.
 */
export type ApiFunction<T> = () => Promise<ApiResponse<T>>;

/**
 * API 응답을 Option 배열로 변환하는 콜백 함수 타입.
 * @template T - API 응답 데이터의 타입.
 */
export type ApiCallback<T> = (response: ApiResponse<T>) => SelectOption[];

/*=====  End of API 관련 타입  =====*/

/*======================================
=          옵션 및 OptionsConfig          =
======================================*/

/**
 * 동적으로 옵션을 생성할 때 사용하는 설정.
 * @template T - API 응답 데이터의 타입.
 */
export interface OptionsConfig<T = any> {
  type?: 'self' | 'target'; // 옵션 생성 방식: 'self'는 자체 옵션, 'target'은 타 필드에 의존. 기본값 self
  codeGroup?: CODE_GROUP; // 옵션을 가져오기 위한 코드 그룹.
  target?: string; // 타 필드의 이름. optionsConfig가 다른 필드에 의존할 경우 사용.
  api?: any; // 옵션을 가져오기 위한 API 함수.
  callback?: ApiCallback<T>; // API 응답 데이터를 SelectOption 배열로 변환하는 콜백 함수.
  options?: SelectOption[]; // 미리 정의된 정적 옵션
}

/*=====  End of 옵션 및 OptionsConfig  =====*/

/*======================================
=        빌더(폼 필드) 관련 타입         =
======================================*/

/**
 * 기본 속성을 정의하는 인터페이스 (value는 여기서 포함하지 않음)
 */
interface BaseBuilderConfig {
  name: string; // 각 필드의 고유 이름
  type?: string; // 필드의 타입 (예: 'text', 'dropdown', 'object', 'array' 등)
  label?: string; // 사용자에게 보여질 라벨 (선택 사항)
  description?: string; // 필드에 대한 추가 설명 (선택 사항)
  placeholder?: string; // 입력 필드의 플레이스홀더 (선택 사항)
  [key: string]: any;
}

/**
 * ─── 최상위(루트) 빌더 설정 ──────────────────────────────
 * 1depth에서는 value가 필수입니다.
 */

/**
 * 루트 레벨의 일반(leaf) 필드: value는 **필수**
 */
export interface RootLeafBuilderConfig extends BaseBuilderConfig {
  type: Exclude<string, 'object' | 'array'>;
  value: any;
}

/**
 * 루트 레벨의 그룹 필드: object 또는 array 타입
 * 그룹 필드는 하위 필드들을 가지며, 여기서는 value가 필수입니다.
 */
export interface RootGroupBuilderConfig extends BaseBuilderConfig {
  type: 'object' | 'array';
  fields: NestedBuilderConfig[]; // 그룹 내부의 필드는 Nested 타입 사용
  value: any;
}

/**
 * ─── Nested(하위) 빌더 설정 ──────────────────────────────
 * 그룹 필드 내부에 들어가는 필드들은 value가 선택적(optional)입니다.
 */

/**
 * 하위(leaf) 필드: value는 **선택적(optional)**
 */
export interface NestedLeafBuilderConfig extends BaseBuilderConfig {
  type: Exclude<string, 'object' | 'array'>;
  value?: any;
}

/**
 * 하위 그룹 필드: object 또는 array 타입
 * 하위 그룹 내부에서는 value가 선택적(optional)입니다.
 */
export interface NestedGroupBuilderConfig extends BaseBuilderConfig {
  type: 'object' | 'array';
  fields: NestedBuilderConfig[];
  value?: any;
}

/**
 * Nested 빌더 설정 유니온 타입 (그룹의 fields 배열에 사용)
 */
export type NestedBuilderConfig = NestedLeafBuilderConfig | NestedGroupBuilderConfig;

/**
 * 최상위 빌더 설정 유니온 타입 (config 파일의 최상위 builders 배열에 사용)
 */
export type RootBuilderConfig = RootLeafBuilderConfig | RootGroupBuilderConfig;

/**
 * 최종적으로 DynamicFormConfig에서 사용할 빌더 설정 타입.
 * 최상위에서는 RootBuilderConfig를 사용합니다.
 */
export type BuilderConfig = RootBuilderConfig;

/**
 * ─── 개별 필드 타입 인터페이스 ──────────────────────────────
 */

/**
 * 텍스트 입력 필드 설정.
 */
export interface TextBuilderConfig extends RootLeafBuilderConfig {
  type: 'text';
  maxLength?: number; // 입력 가능한 최대 문자 수 (선택 사항)
}

/**
 * 텍스트 팝업 버튼 필드 설정.
 */
export interface TextPopupButtonBuilderConfig extends RootLeafBuilderConfig {
  type: 'text-popup-button';
  /**
   * 텍스트 필드 옆에 표시될 버튼 설정.
   */
  button?: {
    label: string; // 버튼에 표시될 텍스트
    variant: ButtonVariantType; // 버튼의 스타일 변형 (예: primary, gray 등)
    size: string; // 버튼의 크기 (예: sm, lg 등)
  };
}

/**
 * 드롭다운 필드 설정.
 */
export interface DropdownBuilderConfig extends RootLeafBuilderConfig {
  type: 'dropdown';
  options: SelectOption[]; // 드롭다운에 표시될 옵션 배열
  optionsConfig?: OptionsConfig; // 동적 옵션 생성 및 추가 설정 (선택 사항)
}

/**
 * 라디오 그룹 필드 설정.
 */
export interface RadioGroupBuilderConfig extends RootLeafBuilderConfig {
  type: 'radio-group';
  options: SelectOption[]; // 라디오 그룹 내의 옵션 배열
}

/**
 * 체크박스 필드 설정.
 */
export interface CheckboxBuilderConfig extends RootLeafBuilderConfig {
  type: 'checkbox';
  checkLabel?: string; // 체크박스 옆에 표시될 라벨 (선택 사항)
}

/**
 * 여러 체크박스를 그룹으로 묶은 필드 설정.
 */
export interface CheckBoxGroupBuilderConfig extends RootLeafBuilderConfig {
  type: 'checkbox-group';
  options: SelectOption[]; // 그룹에 포함될 체크박스 옵션 배열
}

/**
 * 배열 타입의 필드 설정.
 * - 최상위에서는 value가 필수 (여러 객체를 포함하는 배열)
 * - 내부 필드들은 NestedBuilderConfig를 따릅니다.
 */
export interface ArrayBuilderConfig extends RootGroupBuilderConfig {
  type: 'array';
  fields: NestedBuilderConfig[];
  value: any[];
}

/**
 * 오브젝트 타입의 필드 설정.
 * - 최상위에서는 value가 필수 (객체 형태의 초기값)
 * - 내부 필드들은 NestedBuilderConfig를 따릅니다.
 */
export interface ObjectBuilderConfig extends RootGroupBuilderConfig {
  type: 'object';
  fields: NestedBuilderConfig[];
  value: Record<string, any>;
}

/*=====  End of 빌더(폼 필드) 관련 타입  =====*/

/*======================================
=           Validator 관련 타입          =
======================================*/

/**
 * 각 필드에 대한 유효성 검증 스키마를 담는 객체.
 */
export interface ValidatorConfig {
  [key: string]: z.ZodTypeAny;
}

/*=====  End of Validator 관련 타입  =====*/

/*======================================
=         전체 폼 설정 인터페이스         =
======================================*/

/**
 * 전체 폼 설정 인터페이스.
 */
export interface DynamicFormConfig {
  builders: BuilderConfig[]; // 최상위 빌더는 RootBuilderConfig를 따릅니다.
  validator: ValidatorConfig;
}

/*=====  End of 전체 폼 설정 인터페이스  =====*/

/*======================================
=         기타 동적 폼 관련 인터페이스        =
======================================*/

/**
 * Builder 인터페이스
 * - 각 필드의 설정 정보를 나타냅니다.
 */
export interface Builder {
  name: string;
  type?: string;
  label?: string;
  fields?: Builder[];
  [key: string]: any;
}

// 반환 타입 정의: 현재 설정과 최상위(depth 0)의 이름을 포함
export interface BuilderConfigResult {
  /** 해당 필드의 설정 정보 */
  config: Partial<Builder>;
  /** 최상위(부모) 필드의 이름 */
  topLevelName: string;
}

/**
 * DynamicFormProvider 인터페이스
 * - 폼 필드 생성을 위한 프로바이더 객체입니다.
 */
export interface DynamicFormProvider {
  control: any & {
    // 필수 여부 체크 함수 (react-hook-form에서 기본 제공하지 않는 경우 커스텀)
    isFieldRequired: (name: string) => boolean;
  };
  builders: Builder[];
  // 필드 DOM 노드를 저장하는 ref 객체
  fieldRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  // react-hook-form의 watch 함수
  watch: (name?: string | string[]) => any;
  onFormChange: (value?: any) => void;
  formData : UseFormGetValues<any>,
  onFocus:(fieldName:string) => void
}

/**
 * DynamicFormFieldProps 인터페이스
 * - DynamicFormField 컴포넌트의 props 타입입니다.
 */
export interface DynamicFormFieldProps {
  provider: DynamicFormProvider;
  name: string;
  type?: string;
  disabled?: boolean;
  children?: React.ReactNode;

  [key: string]: any;
}

/**
 * FormParams 인터페이스
 * - 각 동적 폼 필드 컴포넌트에 전달할 공통 파라미터 타입을 정의합니다.
 */
export interface FormParams {
  watch: (name?: string | string[]) => any;
  ref: React.Ref<any>;
  type?: string;
  name: string;
  onChange: (value: any) => void;
  onBlur: () => void;
  value: any;
  disabled: boolean;
  [key: string]: any;
}
