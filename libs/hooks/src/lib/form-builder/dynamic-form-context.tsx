import React, { createContext, ReactNode, useContext, useState } from 'react';
import { DynamicFormContextType } from './type';

/**
 * 검색 박스 상태를 Context에 주입하는 Provider 컴포넌트
 *
 * @param value - 검색 박스 상태 및 메서드 값
 * @param children - 자식 컴포넌트
 */
export const DynamicFormContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [guideText, onChangeGuideText] = useState<any>('');
  const [infoArea, onChangeInfoArea] = useState<ReactNode | null>(null);
  return (
    <DynamicFormContext.Provider
      value={{ guideText, infoArea, onChangeGuideText, onChangeInfoArea }}
    >
      {children}
    </DynamicFormContext.Provider>
  );
};

// 기본값 설정
const DynamicFormContext = createContext<DynamicFormContextType | null>(null);

/**
 * Context에서 값을 추출하는 커스텀 훅
 * - 값이 없으면 에러 발생
 *
 * @returns DynamicFormProvider 값 반환
 */
export const useDynamicFormContext = (): DynamicFormContextType => {
  const context = useContext(DynamicFormContext);
  if (!context) {
    throw new Error('useDynamicFormContext DynamicFormProvider 내에서 사용해야 합니다.');
  }
  return context;
};
