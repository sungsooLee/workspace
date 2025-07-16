import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { t } from 'i18next';

import { Tabs } from '@learnway/ui';

import { LearningResourceQuestionBankDetail } from './learning-resource-question-bank-detail';
import { EnFormMode } from '@types';

enum QuestionTab {
  QUESTION_BASE = 'QUESTION_BASE',
  QUESTION_ITEM = 'QUESTION_ITEM',
}

const LearningResourceQuestionBankComponent = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>(QuestionTab.QUESTION_BASE);
  const [formMode, setFormMode] = useState<EnFormMode>(EnFormMode.ADD);

  const formBaseRef = useRef(1);
  const formQuestionRef = useRef(2);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const items = [
    {
      title: '문제은행 정보',
      key: QuestionTab.QUESTION_BASE,
      content: <LearningResourceQuestionBankDetail />,
    },
    {
      title: '문항추가',
      key: QuestionTab.QUESTION_ITEM,
      content: '문항 추가',
    },
  ];

  return (
    <Tabs
      selectedTabKey={selectedTabKey}
      items={items}
      type="progress"
      size="sm"
      onTabChange={handleTabChange}
    />
  );
};

export const LearningResourceQuestionBank = forwardRef(LearningResourceQuestionBankComponent);
