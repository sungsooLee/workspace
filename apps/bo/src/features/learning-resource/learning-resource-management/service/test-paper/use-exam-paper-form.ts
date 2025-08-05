import { ExamQuestionGenType, TestPaperBasicInfoDetail } from '@entities/learning-resource';
import { useRef, useState } from 'react';
import { TabFormRef } from './type';

export const useExamPaperForm = (data: TestPaperBasicInfoDetail | undefined) => {
  const basicInfoRef = useRef<TabFormRef>(null);
  const questionInfoRef = useRef<TabFormRef>(null);

  const [questionGenType, setQuestionGenType] = useState<ExamQuestionGenType>(
    data?.questionGenType ?? ExamQuestionGenType.FIXED,
  );

  return { basicInfoRef, questionInfoRef, questionGenType, setQuestionGenType };
};
