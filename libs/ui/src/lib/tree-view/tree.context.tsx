import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { NodeMovePositionType, TreeNode } from './type';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';

interface DragState {
  node: TreeNode | null;
  sourceTreeId: string | null;
  isDragging: boolean;
  currentDropTarget?: {
    node: TreeNode;
    position?: NodeMovePositionType;
    treeId?: string;
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
  // DnD 관련 콜백들
  onDragStart?: (event: DragStartEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  registerTreeCallbacks: (
    treeId: string,
    callbacks: {
      onDragStart?: (event: DragStartEvent) => void;
      onDragOver?: (event: DragOverEvent) => void;
      onDragEnd?: (event: DragEndEvent) => void;
      removeNode?: (nodeKey: string) => void;
    },
  ) => void;
}

const TreeContext = createContext<TreeContextType>({
  dragState: defaultDragState,
  setDragState: () => {
    //
  },
  resetDragState: () => {
    //
  },
  registerTreeCallbacks: () => {
    //
  },
});

export const TreeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dragState, setDragStateInternal] = useState<DragState>(defaultDragState);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const treeCallbacksRef = useRef<Map<string, any>>(new Map());

  const setDragState = useCallback((newState: Partial<DragState>) => {
    setDragStateInternal((prev) => ({ ...prev, ...newState }));
  }, []);

  const resetDragState = useCallback(() => {
    setDragStateInternal({ ...defaultDragState });
    setActiveId(null);
    document.body.classList.remove('dragging-active');
    document.body.style.userSelect = '';
    // document.body.style.overflow = '';
  }, []);

  const registerTreeCallbacks = useCallback((treeId: string, callbacks: any) => {
    treeCallbacksRef.current.set(treeId, callbacks);
  }, []);

  // DnD 센서 설정
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 3,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // 통합된 드래그 이벤트 핸들러들
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);

    // 모든 트리의 onDragStart 콜백 호출
    treeCallbacksRef.current.forEach((callbacks) => {
      if (callbacks.onDragStart) {
        callbacks.onDragStart(event);
      }
    });
  }, []);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      // 전역에서 드롭 상태 업데이트
      const { over } = event;
      if (over) {
        const dropData = over.data.current as any;
        if (dropData && dropData.node && dropData.position) {
          setDragState({
            currentDropTarget: {
              node: dropData.node,
              position: dropData.position,
              treeId: dropData.treeId,
            },
          });
        }
      } else {
        setDragState({
          currentDropTarget: null,
        });
      }

      // 모든 트리의 onDragOver 콜백 호출
      treeCallbacksRef.current.forEach((callbacks) => {
        if (callbacks.onDragOver) {
          callbacks.onDragOver(event);
        }
      });
    },
    [setDragState],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const dragData = active.data.current as any;
      const dropData = over?.data.current as any;

      // 크로스 트리 이동 시 소스 트리에서 노드 제거
      if (dragData && dropData && dragData.node && dropData.treeId) {
        const sourceTreeId = dragState.sourceTreeId;
        const targetTreeId = dropData.treeId;

        // 다른 트리로 이동하는 경우 소스 트리에서 노드 제거
        if (sourceTreeId && targetTreeId && sourceTreeId !== targetTreeId) {
          const sourceTreeCallbacks = treeCallbacksRef.current.get(sourceTreeId);
          if (sourceTreeCallbacks && sourceTreeCallbacks.removeNode) {
            sourceTreeCallbacks.removeNode(dragData.node.key);
          }
        }
      }

      // 모든 트리의 onDragEnd 콜백 호출
      treeCallbacksRef.current.forEach((callbacks) => {
        if (callbacks.onDragEnd) {
          callbacks.onDragEnd(event);
        }
      });

      resetDragState();
    },
    [resetDragState, dragState.sourceTreeId],
  );

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
      // document.body.style.overflow = 'hidden';
      document.body.classList.add('dragging-active');

      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('dragend', handleDragEnd);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.userSelect = '';
        // document.body.style.overflow = '';
        document.body.classList.remove('dragging-active');
      };
    }
  }, [dragState.isDragging, resetDragState]);

  const contextValue: TreeContextType = {
    dragState,
    setDragState,
    resetDragState,
    registerTreeCallbacks,
  };

  return (
    <TreeContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[snapCenterToCursor]}
      >
        {children}
        {/* 드래그 오버레이 */}
        <DragOverlay>
          {activeId && dragState.node ? (
            <div
              style={{
                padding: '8px 12px',
                backgroundColor: 'white',
                border: '2px solid #2196f3',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333',
                maxWidth: '200px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'grabbing',
              }}
            >
              {dragState.node.title}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </TreeContext.Provider>
  );
};

export const useTreeContext = () => {
  return useContext(TreeContext);
};

export const TreeContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <TreeProvider>{children}</TreeProvider>;
};
