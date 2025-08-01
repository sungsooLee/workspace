import { useCallback, useState } from 'react';
import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { QuestionItem } from '@types';
import { arrayMove } from '@dnd-kit/sortable';
import { useChangeQuestionOrder } from '@entities/learning-resource';

export const useQuestionSort = (contentUuid: string, questionItemList: QuestionItem[]) => {
  const [items, setItems] = useState<QuestionItem[]>(questionItemList);

  const getTargetWithIndex = (list: QuestionItem[] = [], targetId: UniqueIdentifier) => {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.sortSeq === targetId) {
        return { examQuestionUuid: item.examQuestionUuid, sortSeq: item.sortSeq, index: i };
      }
    }
    return { examQuestionUuid: undefined, sortSeq: 0, index: -1 };
  };

  const { sort } = useChangeQuestionOrder();

  const handleOnDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;

      if (!over || active.id === over.id) {
        return;
      }

      const oldTarget = getTargetWithIndex(questionItemList, active.id);
      const newTarget = getTargetWithIndex(questionItemList, over.id);

      console.log(oldTarget, newTarget);

      const oldIndex = oldTarget.index;
      const newIndex = newTarget.index;

      if (oldIndex !== -1 && newIndex !== -1) {
        // arrayMove를 사용하여 부드러운 재배열
        const reorderedItems = arrayMove(questionItemList, oldIndex, newIndex);

        // sortSeq 필드를 새로운 순서로 업데이트
        const updatedItems = reorderedItems.map((item, index) => ({
          ...item,
          sortSeq: index + 1,
        }));

        setItems(updatedItems);
      }
    },
    [questionItemList],
  );

  return { handleOnDragEnd };
};
