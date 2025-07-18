import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TestPaperBasicInfoDetail } from '@types';
import { learningResourceQueryOptions, useCreateQuestionItem } from '@entities/learning-resource';

export const useExamQuestionInfoInput = (basicInfo: TestPaperBasicInfoDetail) => {
  const { contentUuid, questionGenType, questionCount } = basicInfo;

  const { data: questionList } = useQuery(
    learningResourceQueryOptions.getQuestionList(contentUuid),
  );
  console.log(questionList);

  const { create: createQuestionItem } = useCreateQuestionItem();

  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  const getScorePerQuestion = useCallback((count?: number): number => {
    if (!count || isNaN(count) || Number(count) === 0) {
      return 100;
    }
    return Math.round((100 / count) * 10) / 10;
  }, []);

  const scorePerQuestion = getScorePerQuestion(questionCount);

  return { selectedQuestions, scorePerQuestion, createQuestionItem };
};
