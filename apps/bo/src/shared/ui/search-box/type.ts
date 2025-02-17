import { Control } from 'react-hook-form';

/**
 * SearchBoxBuilder
 * 각 검색 필드의 구성을 정의합니다.
 */
export interface SearchBoxBuilder {
  name: string;
  type: 'date-range' | 'multi-dropdown' | 'dropdown' | 'text' | string;
  label?: string;
  /**
   * 1depth 필드에서는 value가 필수.
   * 단, 그룹(하위) 필드에서는 value를 생략할 수 있다.
   */
  value?: any;
  options?: { value: string; label: string }[];
  optionsConfig?: Record<string, any>; // 실제 옵션 설정에 맞게 수정 가능
}

/**
 * SearchBoxConfig
 * useSearchBox 훅에 전달하는 설정 객체의 타입.
 */
export interface SearchBoxConfig {
  builders: SearchBoxBuilder[];
  // validator 객체는 각 필드에 대한 유효성 스키마를 포함합니다.
  validator?: Record<string, any>;
}

/**
 * OnValidCallback
 * 폼 제출 후 유효성 검증에 통과한 데이터를 인자로 받는 콜백 함수 타입.
 */
export type OnValidCallback = (params: Record<string, any>) => void;
