import {
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import {
  learningResourceQueryOptions,
  MutationResponse,
  QuestionItem,
  QuestionSortItem,
  useChangeQuestionOrder,
} from '@entities/learning-resource';
import { ContentType } from '@shared/types/enums';
import { QueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback } from 'react';

export const useQuestionSort = (options: {
  contentUuid: string;
  contentType: ContentType;
  questionItemList: QuestionItem[];
  setQuestionItemList: Dispatch<SetStateAction<QuestionItem[]>>;
}) => {
  const queryClient = new QueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor, {}),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const getTargetWithIndex = useCallback(
    (list: QuestionItem[] = [], targetId: UniqueIdentifier) => {
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.sortSeq === targetId) {
          return { examQuestionUuid: item.examQuestionUuid, sortSeq: item.sortSeq, index: i };
        }
      }
      return { examQuestionUuid: undefined, sortSeq: 0, index: -1 };
    },
    [],
  );

  const { sort: sortQuestions } = useChangeQuestionOrder({
    onSuccess: async ({ result }: MutationResponse) => {
      if (result) {
        const data = await queryClient.fetchQuery(
          learningResourceQueryOptions.getQuestionItemList(options.contentUuid),
        );
        options.setQuestionItemList(data);
      }
    },
  });

  const handleOnDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;

      if (!over || active.id === over.id) {
        return;
      }

      const oldTarget = getTargetWithIndex(options.questionItemList, active.id);
      const newTarget = getTargetWithIndex(options.questionItemList, over.id);

      console.log(oldTarget, newTarget);

      const oldIndex = oldTarget.index;
      const newIndex = newTarget.index;

      if (oldIndex !== -1 && newIndex !== -1) {
        // arrayMove를 사용하여 부드러운 재배열
        const reorderedItems = arrayMove(options.questionItemList, oldIndex, newIndex);

        // sortSeq 필드를 새로운 순서로 업데이트
        // const updatedItems = reorderedItems.map((item, index) => ({
        //   ...item,
        //   sortSeq: index + 1,
        // }));
        // console.log('updatedItems', reorderedItems);

        const reorderedPrevTarget = { ...oldTarget, sortSeq: newTarget.sortSeq };
        const reorderedNextTarget = { ...newTarget, sortSeq: oldTarget.sortSeq };

        sortQuestions({
          contentUuid: options.contentUuid,
          contentType: options.contentType,
          mappingList: [reorderedPrevTarget, reorderedNextTarget].map(
            (item) =>
              ({
                examQuestionUuid: item.examQuestionUuid as string,
                sortSeq: item.sortSeq,
              }) satisfies QuestionSortItem,
          ),
        });
      }
    },
    [options.questionItemList],
  );

  return { sensors, handleOnDragEnd };
};
