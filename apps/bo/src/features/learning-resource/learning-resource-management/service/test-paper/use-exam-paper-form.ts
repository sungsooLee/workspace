import { useRef, useState } from 'react';
import { ExamQuestionGenType, TestPaperBasicInfoDetail } from '@types';
import { TabFormRef } from './type';

export const useExamPaperForm = (data: TestPaperBasicInfoDetail | undefined) => {
  const basicInfoRef = useRef<TabFormRef>(null);
  const questionInfoRef = useRef<TabFormRef>(null);

  const [questionGenType, setQuestionGenType] = useState<ExamQuestionGenType>(
    data?.questionGenType ?? ExamQuestionGenType.FIXED,
  );

  return { basicInfoRef, questionInfoRef, questionGenType, setQuestionGenType };
};
