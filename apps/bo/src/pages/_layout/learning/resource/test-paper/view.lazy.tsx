import { useModal } from '@learnway/ui/modal';
import { Tabs } from '@learnway/ui/tabs';
/* IA118 / NLP_BO_CMS_1203 - 나의 학습자원 > 시험지 등록 및 상세 */
import {
  ContentTopButtons,
  LearningResourceQuestionInfo,
  LearningResourceTestPaperInfo,
} from '@features/learning-resource';
import {
  ExamTab,
  getExamTemplateTextByType,
  getQuestionGenTypeText,
  PageMode,
  useExamBasicInfoForm,
  useExamLoaderData,
  useExamPaperForm,
} from '@features/learning-resource/learning-resource-management/service';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useBlocker, useRouter } from '@tanstack/react-router';
import { ExamTemplateType, TestPaperBasicInfoSaveRes } from '@types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/test-paper/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  const router = useRouter();

  const { mode, contentUuid, data, refetchContentDetail, hasMapping, listParam } =
    useExamLoaderData();

  const { alert, confirm: openConfirm } = useModal();

  const { basicInfoRef, questionInfoRef, questionGenType, setQuestionGenType } =
    useExamPaperForm(data);

  const {
    basicInfoProvider: provider,
    getBasicInfoValues: getValues,
    updateBasicInfoFormData: updateFormData,
    updateFormDataByKey,
    onBasicInfoFormChange: onFormChange,
    onSubmit,
    saveBasicInfo,
    formState,
  } = useExamBasicInfoForm({
    mode,
    contentUuid,
    onSaveSuccess: (result?: TestPaperBasicInfoSaveRes) => {
      if (!result) {
        return;
      }
      if (result?.examUuid) {
        router.navigate({
          to: '/learning/resource/test-paper/view',
          state: { mode: 'UPDATE', contentUuid: result.examUuid },
          replace: true,
        });
      }
    },
    onUpdateSuccess: async (result?: unknown) => {
      await refetchContentDetail();
    },
  });

  useBlocker({
    shouldBlockFn: async () => {
      if (!formState.isDirty) {
        return false;
      }
      return !(await openConfirm({
        title: t('이동 하시겠습니까?'),
        content: t('입력 중인 항목이 초기화됩니다.'),
      }));
    },
  });

  const tabItems = useMemo(
    () => [
      {
        title: `${t('시험지 정보')}${mode === PageMode.UPDATE ? `(${getExamTemplateTextByType(data?.examTemplateType as ExamTemplateType, t)})` : ''}`,
        key: ExamTab.PAPER,
        content: (
          <LearningResourceTestPaperInfo
            ref={basicInfoRef}
            basicInfoForm={{
              provider,
              getValues,
              updateFormData,
              onFormChange,
              onSubmit,
              saveBasicInfo,
            }}
            contentUuid={contentUuid}
            mode={mode}
            data={data}
            hasMapping={hasMapping}
          />
        ),
      },
      {
        title: `${t('문항 관리')}${data?.questionGenType ? `(${getQuestionGenTypeText(data.questionGenType, t)})` : ''}`,
        key: ExamTab.QUESTION,
        content: (
          <LearningResourceQuestionInfo
            ref={questionInfoRef}
            basicInfoForm={{ provider, getValues, updateFormDataByKey, saveBasicInfo }}
            contentUuid={contentUuid}
            mode={mode}
            data={data}
            hasMapping={hasMapping}
            questionGenType={questionGenType}
            setQuestionGenType={setQuestionGenType}
          />
        ),
      },
    ],
    [provider, data],
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

  const handleSubmit = (data: Record<string, any>) => {
    if (basicInfoRef.current) {
      basicInfoRef.current?.save?.(data);
    } else if (questionInfoRef.current) {
      questionInfoRef.current?.complete?.();
    }
  };

  useEffect(() => {
    console.log('contentUuid ===>', contentUuid);
    if (contentUuid) {
      setSaved(true);
    }
  }, [contentUuid]);

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <ContentTopButtons provider={provider} />
        </ContentsButtons>

        <MainContents>
          <div className="form_row">
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
