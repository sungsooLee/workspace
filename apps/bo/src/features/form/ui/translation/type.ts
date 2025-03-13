// Translation 필드의 데이터 구조
import { Control, UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

export interface TranslationField {
  id: string; // 필수, react-hook-form에서 id는 항상 포함됨
  locale: string; // 언어 코드 (ex: "en", "ko")
  [key: string]: any; // 다른 동적 필드를 허용
}

// TranslationBodyComponent Props 타입 정의
export interface TranslationBodyProps {
  control?: UseFormReturn['control']; // react-hook-form의 Control 객체
  defaultLang?: string; // 기준 언어
  locale?: string; // 활성화된 번역 언어 (TranslationContainer에서 전달)
  children?: ReactNode; // 자식 컴포넌트
}

export interface TranslationContainerProps {
  control: UseFormReturn['control']; // react-hook-form의 Control 객체
  defaultLang: string; // 기본 언어 코드 (예: "en")
  children: ReactNode; // 자식 컴포넌트
}

export interface TranslationPopupProps {
  translations: Record<string, any>[]; // 기존 번역 데이터
  config: any; // 폼 내 동적인 동작을 정의하기 위한 구성 객체
  defaultLang: string; // 기본 언어 코드 (예: 'en', 'ko', 'ja')
}
