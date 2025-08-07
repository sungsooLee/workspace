import { useContext } from 'react';
import { IcoMenu01 } from '@learnway/icons';
import { DragHandleContext } from '@learnway/ui/grid';
import { cn } from '@learnway/shared';

const LearningResourceQuestionDragHandleComponent = ({
  hasMapping = false,
}: {
  hasMapping?: boolean;
}) => {
  const dragContext = useContext(DragHandleContext);
  const { listeners, attributes, setActivatorNodeRef } = dragContext || {};

  return (
    <div
      ref={setActivatorNodeRef}
      className={cn(
        'flex h-full w-full items-center justify-center text-gray-400 hover:text-gray-600',
        hasMapping ? 'cursor-default' : 'cursor-move',
      )}
      {...attributes}
      {...listeners}
      onClick={(e) => e.stopPropagation()} // 드래그 핸들 클릭이 행 클릭으로 전파되지 않도록
    >
      <IcoMenu01
        width={24}
        height={24}
        fill="#A9AFB8"
        stroke={hasMapping ? 'var(--gray5)' : '#4c515e'}
      />
    </div>
  );
};

LearningResourceQuestionDragHandleComponent.displayName = 'QuestionDragHandle';

export const QuestionDragHandle = LearningResourceQuestionDragHandleComponent;
