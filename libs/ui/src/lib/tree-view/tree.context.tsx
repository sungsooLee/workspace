import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { NodeMovePositionType, TreeNode } from './type';

interface DragState {
  node: TreeNode | null;
  sourceTreeId: string | null;
  isDragging: boolean;
  dragPosition: { x: number; y: number } | null;
  currentDropTarget?: {
    node: TreeNode;
    position?: NodeMovePositionType;
  } | null;
}

const defaultDragState: DragState = {
  node: null,
  sourceTreeId: null,
  isDragging: false,
  dragPosition: null,
  currentDropTarget: null,
};

interface TreeContextType {
  dragState: DragState;
  setDragState: (state: Partial<DragState>) => void;
  resetDragState: () => void;
  updateDragPosition: (x: number, y: number) => void;
}

const TreeContext = createContext<TreeContextType>({
  dragState: defaultDragState,
  setDragState: () => {
    //
  },
  resetDragState: () => {
    //
  },
  updateDragPosition: () => {
    //
  },
});

const useEnhancedMultiScroll = () => {
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeScrollersRef = useRef<
    Map<HTMLElement, { direction: 'up' | 'down'; intensity: number }>
  >(new Map());

  const findAllScrollableElements = (): HTMLElement[] => {
    const scrollables: HTMLElement[] = [];

    const treeElements = document.querySelectorAll('.tree_wrap');
    treeElements.forEach((tree) => {
      if (tree.scrollHeight > tree.clientHeight) {
        scrollables.push(tree as HTMLElement);
      }
    });

    if (document.documentElement.scrollHeight > window.innerHeight) {
      scrollables.push(document.documentElement);
    }

    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
      const style = window.getComputedStyle(element);
      const hasScroll =
        (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
        element.scrollHeight > element.clientHeight;

      if (hasScroll && !scrollables.includes(element as HTMLElement)) {
        scrollables.push(element as HTMLElement);
      }
    });

    return scrollables;
  };

  const startMultiAutoScroll = (mouseX: number, mouseY: number) => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }

    const scrollables = findAllScrollableElements();
    activeScrollersRef.current.clear();

    scrollIntervalRef.current = setInterval(() => {
      const scrollZone = 80;
      const baseSpeed = 8;

      scrollables.forEach((scroller) => {
        let rect: DOMRect;
        let scrollTop: number;
        let maxScroll: number;

        if (scroller === document.documentElement) {
          rect = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
          scrollTop = window.pageYOffset;
          maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        } else {
          rect = scroller.getBoundingClientRect();
          scrollTop = scroller.scrollTop;
          maxScroll = scroller.scrollHeight - scroller.clientHeight;
        }

        // 마우스가 스크롤러 영역 내에 있는지 확인
        const isMouseInBounds =
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom;

        if (!isMouseInBounds) return;

        const distanceFromTop = mouseY - rect.top;
        const distanceFromBottom = rect.bottom - mouseY;

        let scrollDirection: 'up' | 'down' | null = null;
        let intensity = 1;

        // 상단 스크롤 영역
        if (distanceFromTop <= scrollZone && scrollTop > 0) {
          scrollDirection = 'up';
          intensity = Math.max(1, 3 - (distanceFromTop / scrollZone) * 2);
        }
        // 하단 스크롤 영역
        else if (distanceFromBottom <= scrollZone && scrollTop < maxScroll) {
          scrollDirection = 'down';
          intensity = Math.max(1, 3 - (distanceFromBottom / scrollZone) * 2);
        }

        if (scrollDirection) {
          const scrollAmount = baseSpeed * intensity;

          if (scroller === document.documentElement) {
            if (scrollDirection === 'up') {
              window.scrollBy(0, -scrollAmount);
            } else {
              window.scrollBy(0, scrollAmount);
            }
          } else {
            if (scrollDirection === 'up') {
              scroller.scrollTop = Math.max(0, scroller.scrollTop - scrollAmount);
            } else {
              scroller.scrollTop = Math.min(maxScroll, scroller.scrollTop + scrollAmount);
            }
          }

          activeScrollersRef.current.set(scroller, { direction: scrollDirection, intensity });
        } else {
          activeScrollersRef.current.delete(scroller);
        }
      });
    }, 16);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    activeScrollersRef.current.clear();
  };

  return { startMultiAutoScroll, stopAutoScroll, activeScrollersRef };
};

export const TreeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dragState, setDragStateInternal] = useState<DragState>(defaultDragState);
  const { startMultiAutoScroll, stopAutoScroll, activeScrollersRef } = useEnhancedMultiScroll();

  const setDragState = (newState: Partial<DragState>) => {
    setDragStateInternal((prev) => ({ ...prev, ...newState }));
  };

  const resetDragState = () => {
    stopAutoScroll();
    setDragStateInternal({ ...defaultDragState });
    document.body.classList.remove('dragging-active');
  };

  const updateDragPosition = (x: number, y: number) => {
    setDragStateInternal((prev) => ({
      ...prev,
      dragPosition: { x, y },
    }));

    if (dragState.isDragging) {
      startMultiAutoScroll(x, y);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragState.isDragging) {
        updateDragPosition(e.clientX, e.clientY);
      }
    };

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
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('dragend', handleDragEnd);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = 'none';
      document.body.classList.add('dragging-active');

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
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
    updateDragPosition,
  };

  return <TreeContext.Provider value={contextValue}>{children}</TreeContext.Provider>;
};

export const useTreeContext = () => {
  return useContext(TreeContext);
};

export const TreeContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <TreeProvider>{children}</TreeProvider>;
};
