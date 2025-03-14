import { DynamicFormProvider } from '@learnway/hooks';
import { ReactNode } from 'react';
import { Control } from 'react-hook-form';

/**
 * 🔎 Dependency 타입
 * - form 값의 name, value 값을 정의한 타입
 */
export type Dependency = {
  name: string; // 필드 이름
  value: any; // 필드 값 (타입 제한 없이 설정)
};

/**
 * 🔎 FormDisplayProps 타입
 * - FormDisplayComponent에서 사용하는 props 타입 정의
 */
export type FormDisplayProps = {
  provider: DynamicFormProvider;
  children: ReactNode;
  dependencies?: Dependency[]; // 의존성 필드 값 설정
  onDisplay?: (values: Record<string, any>) => boolean; // 필드 값이 조건에 맞는지 확인하는 함수
};

/**
 * 🔎 TranslationField 타입
 * - 번역 필드에서 사용할 객체 구조 정의
 */
export type TranslationField = {
  locale: string; // 번역 언어 코드 (예: 'en', 'kr')
  value?: string; // 번역된 값
};

/**
 * 🔎 I18nFieldProps 타입
 * - FormI18nComponent에서 사용하는 props 타입 정의
 */
export type FormI18nProps = {
  control: Control<any>; // react-hook-form의 control 객체
  name: string; // 컨테이너 이름 (예: 'translations')
  defaultLang: string; // 기본 언어 코드 (예: 'kr')
  children: ReactNode; // 자식 노드 (렌더링 대상)
};
