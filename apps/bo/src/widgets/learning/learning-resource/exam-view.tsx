/* IA118 / NLP_BO_CMS_1203 - 나의 학습자원 > 시험지 등록 및 상세 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  ContentCreateType,
  ExamTemplateType,
  TestPaperBasicInfoDetail,
  TestPaperBasicInfoSaveRes,
} from '@types';
import { useModal } from '@learnway/ui/modal';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import {
  ContentTopButtons,
  getTooltipContent,
  LearningResourceQuestionInfo,
  LearningResourceTestPaperInfo,
} from '@features/learning-resource';
import {
  ExamTab,
  getExamTemplateTextByType,
  getQuestionGenTypeText,
  useExamBasicInfoForm,
  useExamPaperForm,
} from '@features/learning-resource/learning-resource-management/service';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Tabs } from '@learnway/ui/tabs';

interface Props {
  content?: TestPaperBasicInfoDetail;
  hasMapping?: boolean;
}

function ExamViewComponent({ content, hasMapping }: Props) {
  const { t } = useTranslation();

  const queryClient = new QueryClient();

  const router = useRouter();
  const { alert, confirm: openConfirm } = useModal();

  const { basicInfoRef, questionInfoRef, questionGenType, setQuestionGenType } =
    useExamPaperForm(content);

  const contentUuid = content?.contentUuid ?? '';

  const { basicInfoForm, saveBasicInfo } = useExamBasicInfoForm({
    contentUuid,
    onSaveSuccess: (result?: TestPaperBasicInfoSaveRes) => {
      if (!result) {
        return;
      }
      if (result?.examUuid) {
        router.navigate({
          to: '/learning/learning-resource/view',
          state: { contentUuid: result.examUuid },
          replace: true,
        });
      }
    },
    // onUpdateSuccess: async (result?: unknown) => {
    //   const refetchedData = await queryClient.fetchQuery(
    //     learningResourceQueryOptions.getContent<TestPaperBasicInfoDetail>(contentUuid),
    //   );
    // },
  });

  const { provider, onSubmit } = basicInfoForm;

  const handleSubmit = (data: Record<string, any>) => {
    if (basicInfoRef.current) {
      basicInfoRef.current?.save?.(data);
    } else if (questionInfoRef.current) {
      questionInfoRef.current?.complete?.();
    }
  };

  const tabItems = useMemo(
    () => [
      {
        title: `${t('시험지 정보')}${contentUuid ? `(${getExamTemplateTextByType(content?.examTemplateType as ExamTemplateType, t)})` : ''}`,
        key: ExamTab.PAPER,
        content: (
          <LearningResourceTestPaperInfo
            ref={basicInfoRef}
            basicInfoForm={basicInfoForm}
            saveBasicInfo={saveBasicInfo}
            contentUuid={contentUuid}
            data={content}
            hasMapping={hasMapping}
          />
        ),
      },
      {
        title: `${t('문항 관리')}${content?.questionGenType ? `(${getQuestionGenTypeText(content.questionGenType, t)})` : ''}`,
        key: ExamTab.QUESTION,
        content: (
          <LearningResourceQuestionInfo
            ref={questionInfoRef}
            basicInfoForm={basicInfoForm}
            contentUuid={contentUuid}
            data={content}
            hasMapping={hasMapping}
            questionGenType={questionGenType}
            setQuestionGenType={setQuestionGenType}
          />
        ),
      },
    ],
    [provider, content],
  );

  const [selectedTabKey, setSelectedTabKey] = useState<string>(ExamTab.PAPER);

  const handleTabChange = useCallback((tabKey: string) => {
    setSelectedTabKey(tabKey);
  }, []);

  const [saved, setSaved] = useState<boolean>(false);

  const handleBeforeTabChange = useCallback(
    async (currentTabKey: string, nextTabKey: string) => {
      if (nextTabKey === ExamTab.QUESTION && !saved) {
        await alert({
          title: t('입력한 정보를 저장하세요.'),
          content: t('저장된 적 없는 경우 다음 단계로 이동할 수 없습니다.'),
        });
        return false;
      } else if (saved) {
        const result = await openConfirm({
          title: t('이동 하시겠습니까?'),
          content: t('입력 중인 항목이 초기화됩니다.'),
        });
        return result;
      }
      return true;
    },
    [saved],
  );

  useEffect(() => {
    console.log('contentUuid ===>', contentUuid);
    if (contentUuid) {
      setSaved(true);
    }
  }, [contentUuid]);

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <PageContainer
        title={t('시험지 상세')}
        tooltipProps={{
          show: !!hasMapping || content?.createType !== ContentCreateType.MANUAL,
          content: t(getTooltipContent(content?.createType)),
          type: content?.createType,
        }}
      >
        <ContentsButtons>
          <ContentTopButtons provider={provider} />
        </ContentsButtons>

        <MainContents>
          <div className="form-row">
            <div className={styles.main_contents}>
              <Tabs
                type="progress"
                size="sm"
                selectedTabKey={selectedTabKey}
                items={tabItems}
                onTabChange={handleTabChange}
                onBeforeTabChange={handleBeforeTabChange}
              />
            </div>
          </div>
        </MainContents>
      </PageContainer>
    </form>
  );
}

ExamViewComponent.displayName = 'ExamView';

export const ExamView = ExamViewComponent;
