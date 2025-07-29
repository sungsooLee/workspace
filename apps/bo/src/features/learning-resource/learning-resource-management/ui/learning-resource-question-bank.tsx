import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Tabs, useModal } from '@learnway/ui';

import { LearningResourceQuestionBankDetail } from './learning-resource-question-bank-detail';
import { EnFormMode } from '@types';
import { LearningResourceQuestionBankQuestion } from './learning-resource-question-bank-question';
import { useLearningResourceQuestionDetailForm } from '../service/learning-resource-question-detail-from.hook';

enum QuestionTab {
  QUESTION_BASE = 'QUESTION_BASE',
  QUESTION_ITEM = 'QUESTION_ITEM',
}

const LearningResourceQuestionBankComponent = () => {
  const { t } = useTranslation();

  const { alert, openModal } = useModal();
  const [selectedTabKey, setSelectedTabKey] = useState<string>(QuestionTab.QUESTION_BASE);
  const { baseInfo, formMode } = useLearningResourceQuestionDetailForm();

  const handleTabChange = (tabKey: string) => {
    setSelectedTabKey(tabKey);
  };
  const handleBeforTabChange = async (currentTabKey: string, nextTabKey: string) => {
    console.log('formMode', formMode, baseInfo);
    if (nextTabKey === QuestionTab.QUESTION_ITEM && formMode === EnFormMode.ADD) {
      alert({
        title: t('입력한 정보를 저장하세요.'),
        content: t('저장된적 없는 경우 다음단계로 이동할수 없습니다.'),
      });
      return false;
    }
    return true;
  };

  const items = [
    {
      title: t('문제은행 정보'),
      key: QuestionTab.QUESTION_BASE,
      content: <LearningResourceQuestionBankDetail />,
    },
    {
      title: t('문항추가'),
      key: QuestionTab.QUESTION_ITEM,
      content: <LearningResourceQuestionBankQuestion />,
    },
  ];

  return (
    <Tabs
      selectedTabKey={selectedTabKey}
      items={items}
      type="progress"
      size="sm"
      onTabChange={handleTabChange}
      onBeforeTabChange={handleBeforTabChange}
    />
  );
};

export const LearningResourceQuestionBank = forwardRef(LearningResourceQuestionBankComponent);
