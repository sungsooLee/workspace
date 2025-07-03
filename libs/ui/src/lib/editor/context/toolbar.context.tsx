import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { INITIAL_TOOLBAR_STATE } from '../config/toolbar.config';

// 툴바 상태 타입 정의
type ToolbarState = typeof INITIAL_TOOLBAR_STATE;

// 특정 툴바 상태의 키와 값 타입 추론
type ToolbarStateKey = keyof ToolbarState;
type ToolbarStateValue<Key extends ToolbarStateKey> = ToolbarState[Key];

// Context 데이터 형태 정의
type ContextShape = {
  toolbarState: ToolbarState; // 현재 툴바 상태
  updateToolbarState<Key extends ToolbarStateKey>(key: Key, value: ToolbarStateValue<Key>): void; // 상태 업데이트 함수
};

// React Context 생성
const Context = createContext<ContextShape | undefined>(undefined);

// ToolbarContext Provider 컴포넌트
export const ToolbarContext = ({ children }: { children: ReactNode }): JSX.Element => {
  const [toolbarState, setToolbarState] = useState(INITIAL_TOOLBAR_STATE);

  // 상태 업데이트 함수
  const updateToolbarState = useCallback(
    <Key extends ToolbarStateKey>(key: Key, value: ToolbarStateValue<Key>) => {
      setToolbarState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );
  const contextValue = useMemo(() => {
    return {
      toolbarState,
      updateToolbarState,
    };
  }, [toolbarState, updateToolbarState]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

// Toolbar 상태를 사용하는 커스텀 훅
export const useToolbarState = () => {
  const context = useContext(Context);

  // Context가 없는 경우 에러를 던짐
  if (context === undefined) {
    throw new Error('useToolbarState must be used within a ToolbarProvider');
  }

  return context;
};
