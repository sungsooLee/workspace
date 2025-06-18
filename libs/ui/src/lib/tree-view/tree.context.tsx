import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { NodeMovePositionType, TreeNode } from './type';

interface DragState {
  node: TreeNode | null;
  sourceTreeId: string | null;
  isDragging: boolean;
  currentDropTarget?: {
    node: TreeNode;
    position?: NodeMovePositionType;
  } | null;
}

const defaultDragState: DragState = {
  node: null,
  sourceTreeId: null,
  isDragging: false,
  currentDropTarget: null,
};

interface TreeContextType {
  dragState: DragState;
  setDragState: (state: Partial<DragState>) => void;
  resetDragState: () => void;
}

const TreeContext = createContext<TreeContextType>({
  dragState: defaultDragState,
  setDragState: () => {
    //
  },
  resetDragState: () => {
    //
  },
});

export const TreeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dragState, setDragStateInternal] = useState<DragState>(defaultDragState);

  const setDragState = (newState: Partial<DragState>) => {
    setDragStateInternal((prev) => ({ ...prev, ...newState }));
  };

  const resetDragState = () => {
    setDragStateInternal({ ...defaultDragState });
    document.body.classList.remove('dragging-active');
  };

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (dragState.isDragging) {
        resetDragState();
      }
    };

    const handleDragEnd = (e: DragEvent) => {
      if (dragState.isDragging) {
        resetDragState();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dragState.isDragging) {
        resetDragState();
      }
    };

    if (dragState.isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('dragend', handleDragEnd);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = 'none';
      document.body.classList.add('dragging-active');

      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('dragend', handleDragEnd);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.userSelect = '';
        document.body.classList.remove('dragging-active');
      };
    }
  }, [dragState.isDragging]);

  const contextValue: TreeContextType = {
    dragState,
    setDragState,
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
