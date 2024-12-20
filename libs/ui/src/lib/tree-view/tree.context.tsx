import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TreeNode } from './type';

interface DragState {
  node: TreeNode | null;
  sourceTreeId: string | null;
}

interface TreeContextType {
  dragState: DragState;
  setDragState: (state: DragState) => void;
}

const TreeContext = createContext<TreeContextType | null>(null);

export const TreeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dragState, setDragState] = useState<DragState>({
    node: null,
    sourceTreeId: null,
  });
  return (
    <TreeContext.Provider value={{ dragState, setDragState }}>{children}</TreeContext.Provider>
  );
};

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  return context;
};

export const TreeContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <TreeProvider>{children}</TreeProvider>;
};
