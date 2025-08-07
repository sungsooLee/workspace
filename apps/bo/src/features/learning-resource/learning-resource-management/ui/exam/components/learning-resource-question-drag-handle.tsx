import { useContext } from 'react';
import { IcoMenu01 } from '@learnway/icons';
import { DragHandleContext } from '@learnway/ui/grid';

const LearningResourceQuestionDragHandleComponent = () => {
  const dragContext = useContext(DragHandleContext);
  const { listeners, attributes, setActivatorNodeRef } = dragContext || {};
  return (
    <div
      ref={setActivatorNodeRef}
      className="flex h-full w-full cursor-move items-center justify-center text-gray-400 hover:text-gray-600"
      {...attributes}
      {...listeners}
      onClick={(e) => e.stopPropagation()} // 드래그 핸들 클릭이 행 클릭으로 전파되지 않도록
    >
      <IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#4c515e" />
    </div>
  );
};

LearningResourceQuestionDragHandleComponent.displayName = 'QuestionDragHandle';

export const QuestionDragHandle = LearningResourceQuestionDragHandleComponent;
