import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { NodeMovePositionType, TreeNode } from './type';

interface DragState {
  node: TreeNode | null;
  sourceTreeId: string | null;
  currentDropTarget?: {
    node: TreeNode;
    position?: NodeMovePositionType;
  } | null;
}

// 기본 Context 값 설정
const defaultDragState: DragState = {
  node: null,
  sourceTreeId: null,
  currentDropTarget: null,
};

interface TreeContextType {
  dragState: DragState;
  setDragState: (state: DragState) => void;
  resetDragState: () => void;
}

const defaultContextValue: TreeContextType = {
  dragState: defaultDragState,
  setDragState: () => {
    //
  },
  resetDragState: () => {
    //
  },
};

const TreeContext = createContext<TreeContextType>(defaultContextValue);

const globalDragState: DragState = { ...defaultDragState };

export const TreeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dragState, setDragState] = useState<DragState>(defaultDragState);

  const updateDragState = (newState: DragState) => {
    globalDragState.node = newState.node ? JSON.parse(JSON.stringify(newState.node)) : null;
    globalDragState.sourceTreeId = newState.sourceTreeId;

    setDragState({
      node: newState.node ? JSON.parse(JSON.stringify(newState.node)) : null,
      sourceTreeId: newState.sourceTreeId,
      currentDropTarget: newState.currentDropTarget,
    });
  };

  // 드래그 상태 리셋
  const resetDragState = () => {
    // 전역 변수 리셋
    globalDragState.node = null;
    globalDragState.sourceTreeId = null;
    globalDragState.currentDropTarget = null;
    // state 리셋
    setDragState({ ...defaultDragState });
  };

  // 컨텍스트 값 - 항상 최신 전역 변수 값 반환
  const contextValue: TreeContextType = {
    get dragState() {
      return { ...globalDragState };
    },
    setDragState: updateDragState,
    resetDragState,
  };

  return <TreeContext.Provider value={contextValue}>{children}</TreeContext.Provider>;
};

export const useTreeContext = () => {
  return useContext(TreeContext);
};

export const TreeContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <TreeProvider>{children}</TreeProvider>;
};
