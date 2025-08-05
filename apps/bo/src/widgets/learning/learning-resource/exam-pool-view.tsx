/* IA118 / NLP_BO_CMS_1220 - 교육자원 > 문제은행 등록 및 상세 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentCreateType, EnFormMode, QuestionBasicInfoDetail } from '@types';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { Tabs } from '@learnway/ui/tabs';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { ContentTopButtons, getTooltipContent } from '@features/learning-resource';
import {
  QuestionTab,
  QuestionBankTabFormRef,
} from '@features/learning-resource/learning-resource-management/service/question-bank/type';
import { useLearningResourceQuestionDetailForm } from '@features/learning-resource/learning-resource-management/service/learning-resource-question-detail-from.hook';
import { LearningResourceQuestionBankDetail } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank-detail';
import { LearningResourceQuestionBankQuestion } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank-question';

interface Props {
  content?: QuestionBasicInfoDetail;
  hasMapping?: boolean;
}

function ExamPoolViewComponent({ content }: Props) {
  const { t } = useTranslation();

  const { alert, confirm: openConfirm } = useModal();

  const basicInfoForm = useDynamicForm2();
  const { provider, onSubmit, watch } = basicInfoForm;

  const contentUuid = content?.contentUuid ?? '';
  const isExamMapping = watch('isExamMapping');

  const { formMode, setBaseInfo } = useLearningResourceQuestionDetailForm();

  const baseInfoRef = useRef<QuestionBankTabFormRef>(null);
  const questionInfoRef = useRef<QuestionBankTabFormRef>(null);

  const [selectedTabKey, setSelectedTabKey] = useState<string>(QuestionTab.QUESTION_BASE);

  const handleTabChange = useCallback((tabKey: string) => {
    setSelectedTabKey(tabKey);
  }, []);

  const handleBeforeTabChange = useCallback(
    async (currentTabKey: string, nextTabKey: string) => {
      if (nextTabKey === QuestionTab.QUESTION_ITEM && formMode === EnFormMode.ADD) {
        alert({
          title: t('입력한 정보를 저장하세요.'),
          content: t('저장된 적 없는 경우 다음 단계로 이동할 수 없습니다.'),
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
    },
    [contentUuid],
  );

  const tabItems = useMemo(
    () => [
      {
        title: t('문제은행 정보'),
        key: QuestionTab.QUESTION_BASE,
        content: (
          <LearningResourceQuestionBankDetail
            ref={baseInfoRef}
            form={basicInfoForm}
            isExamMapping={isExamMapping}
          />
        ),
      },
      {
        title: t('문항추가'),
        key: QuestionTab.QUESTION_ITEM,
        content: (
          <LearningResourceQuestionBankQuestion
            ref={questionInfoRef}
            isExamMapping={isExamMapping}
          />
        ),
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
        title={t('문제은행 상세')}
        tooltipProps={{
          show: isExamMapping,
          content: t(
            getTooltipContent(
              content?.createType !== ContentCreateType.MANUAL
                ? content?.createType
                : 'EXAM_MAPPING',
            ),
          ),
          type: content?.createType,
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

ExamPoolViewComponent.displayName = 'ExamPoolView';

export const ExamPoolView = ExamPoolViewComponent;
