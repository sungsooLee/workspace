import { useCallback, useEffect, useRef, useState } from 'react';
import { ExamQuestionGenType, TestPaperBasicInfoDetail } from '@types';
import { ExamTab, TabFormRef } from '../-common/type';

export const useExamPaperForm = (data: TestPaperBasicInfoDetail | undefined) => {
  const basicInfoRef = useRef<TabFormRef>(null);
  const questionInfoRef = useRef<TabFormRef>(null);

  const tabRefs = useRef<Record<ExamTab, TabFormRef | null>>({
    [ExamTab.PAPER]: null,
    [ExamTab.QUESTION]: null,
  });

  const setTabRef = useCallback(
    (key: ExamTab, ref: TabFormRef) => (tabRefs.current[key] = ref),
    [],
  );

  const [questionGenType, setQuestionGenType] = useState<ExamQuestionGenType>(
    data?.questionGenType ?? ExamQuestionGenType.FIXED,
  );

  useEffect(() => {
    console.log(questionGenType, tabRefs.current);
    if (tabRefs.current[ExamTab.PAPER]?.updateFormDataByKey) {
      tabRefs.current[ExamTab.PAPER].updateFormDataByKey('questionGenType', questionGenType);

      console.log('getValues()', tabRefs.current[ExamTab.PAPER]?.getValues?.());
    }
  }, [questionGenType]);

  return { tabRefs, setTabRef, basicInfoRef, questionInfoRef, questionGenType, setQuestionGenType };
};
