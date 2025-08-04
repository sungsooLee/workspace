import { useEffect, useMemo, useRef, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';

import { useLearningResourceQuestionDetailForm } from '@features/learning-resource/learning-resource-management/service/learning-resource-question-detail-from.hook';
import { useCurrentRoute, useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { QuestionBankTabFormRef } from '@features/learning-resource/learning-resource-management/service/question-bank/type';
import { LearningResourceQuestionBankDetail } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank-detail';
import { LearningResourceQuestionBankQuestion } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank-question';
import { ContentTopButtons, getTooltipContent } from '@features/learning-resource';
import { Tabs } from '@learnway/ui/tabs';
import { ContentCreateType, EnFormMode } from '@types';

enum QuestionTab {
  QUESTION_BASE = 'QUESTION_BASE',
  QUESTION_ITEM = 'QUESTION_ITEM',
}

export const Route = createLazyFileRoute('/_layout/learning/resource/question-bank/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    state: { contentUuid },
  } = useCurrentRoute();

  const { t } = useTranslation();

  const { alert, confirm: openConfirm } = useModal();

  const form = useDynamicForm2();
  const { provider, onSubmit, watch } = form;

  const isExamMapping = watch('isExamMapping');

  const { setBaseInfo, baseInfo, formMode } = useLearningResourceQuestionDetailForm();

  const baseInfoRef = useRef<QuestionBankTabFormRef>(null);
  const questionInfoRef = useRef<QuestionBankTabFormRef>(null);

  const [selectedTabKey, setSelectedTabKey] = useState<string>(QuestionTab.QUESTION_BASE);

  const handleTabChange = (tabKey: string) => {
    setSelectedTabKey(tabKey);
  };

  const handleBeforeTabChange = async (currentTabKey: string, nextTabKey: string) => {
    console.log('formMode', formMode, baseInfo);
    if (nextTabKey === QuestionTab.QUESTION_ITEM && formMode === EnFormMode.ADD) {
      alert({
        title: t('입력한 정보를 저장하세요.'),
        content: t('저장된적 없는 경우 다음단계로 이동할수 없습니다.'),
      });
      return false;
    } else if (contentUuid) {
      const result = await openConfirm({
        title: t('이동 하시겠습니까?'),
        content: t('입력 중인 항목이 초기화됩니다.'),
      });
      return result;
    }

    return true;
  };

  const tabItems = useMemo(
    () => [
      {
        title: t('문제은행 정보'),
        key: QuestionTab.QUESTION_BASE,
        content: <LearningResourceQuestionBankDetail ref={baseInfoRef} form={form} />,
      },
      {
        title: t('문항추가'),
        key: QuestionTab.QUESTION_ITEM,
        content: <LearningResourceQuestionBankQuestion ref={questionInfoRef} />,
      },
    ],
    [provider],
  );

  const handleOnSubmit = async (data: Record<string, any>) => {
    if (baseInfoRef.current) {
      baseInfoRef.current?.save?.(data);
    } else if (questionInfoRef.current) {
      questionInfoRef.current?.complete?.();
    }
  };

  useEffect(() => {
    setBaseInfo(contentUuid);
  }, [contentUuid]);

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer
        tooltipProps={{
          show: isExamMapping,
          content: t(
            getTooltipContent(
              baseInfo?.createType !== ContentCreateType.MANUAL
                ? baseInfo?.createType
                : 'EXAM_MAPPING',
            ),
          ),
          type: baseInfo?.createType,
        }}
      >
        <ContentsButtons>
          <ContentTopButtons provider={provider} hasMapping={isExamMapping} />
        </ContentsButtons>
        <MainContents>
          <Tabs
            selectedTabKey={selectedTabKey}
            items={tabItems}
            type="progress"
            size="sm"
            onTabChange={handleTabChange}
            onBeforeTabChange={handleBeforeTabChange}
          />
        </MainContents>
      </PageContainer>
    </form>
  );
}
