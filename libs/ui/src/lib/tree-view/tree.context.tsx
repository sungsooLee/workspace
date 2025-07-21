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
import { restrictToVerticalAxis, snapCenterToCursor } from '@dnd-kit/modifiers';
// import { restrictToTreeContainer } from './dnd-modifiers';
import { IcoFile01, IcoFolder } from '@learnway/icons';
import styles from './tree.module.css'; // Tree module CSS

interface DragState {
  node: TreeNode | null;
  sourceTreeId: string | null;
  isDragging: boolean;
  isShuttleMode?: boolean; // 셔틀 모드인지 여부 (트리 간 이동이 아닌 경우)
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
  isShuttleMode: false,
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
      resetLocalDragState?: () => void;
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

  // 셔틀 모드일 때 추가적으로 제한 modifier를 적용
  const modifiers = dragState.isShuttleMode
    ? [snapCenterToCursor, restrictToVerticalAxis]
    : [snapCenterToCursor];

  const setDragState = useCallback((newState: Partial<DragState>) => {
    setDragStateInternal((prev) => ({ ...prev, ...newState }));
  }, []);

  const resetDragState = useCallback(() => {
    setDragStateInternal({ ...defaultDragState });
    setActiveId(null);
    document.body.classList.remove('dragging-active');
    document.body.style.userSelect = '';
    // document.body.style.overflow = '';

    treeCallbacksRef.current.forEach((callbacks) => {
      if (callbacks.resetLocalDragState) {
        callbacks.resetLocalDragState();
      }
    });
  }, []);

  const registerTreeCallbacks = useCallback((treeId: string, callbacks: any) => {
    treeCallbacksRef.current.set(treeId, callbacks);
  }, []);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
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
        modifiers={modifiers}
      >
        {children}
        {/* 드래그 오버레이 */}
        <DragOverlay>
          {activeId && dragState.node ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                backgroundColor: 'white',
                border: '1px solid #2196f3',
                borderRadius: '4px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                fontSize: '12px',
                fontWeight: '400',
                color: '#333',
                maxWidth: '250px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'grabbing',
                // transform: 'rotate(2deg)',
                // transition: 'transform 0.2s ease',
              }}
            >
              <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                {dragState.node.children && dragState.node.children.length > 0 ? (
                  <IcoFolder stroke="#131C30" className={styles.icon_folder} />
                ) : (
                  <IcoFile01 width={'16'} height={'16'} stroke={'#131C30'} fill={'none'} />
                )}
              </span>
              <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {dragState.node.title}
              </span>
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
