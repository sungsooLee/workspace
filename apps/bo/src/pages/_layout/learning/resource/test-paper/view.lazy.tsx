/* IA118 / NLP_BO_CMS_1203 - 나의 학습자원 > 시험지 등록 및 상세 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { Button, Divider, Tabs, useModal } from '@learnway/ui';
import {
  ContentCourseMappingModal,
  ContentsButtons,
  MainContents,
  PageContainer,
} from '@shared/ui';
import { TestPaperBasicInfoSaveRes } from '@types';
import { getExamTemplateTextByType } from './-common/common';
import { ExamTab, PageMode } from './-common/type';
import { useExamLoaderData } from './-hooks/use-exam-loader-data';
import { useExamPaperForm } from './-hooks/use-exam-paper-form';
import { useExamBasicInfoForm } from './-hooks/use-exam-basic-info-form';
import { TestPaperInfo } from './-tabs/test-paper-info';
import { QuestionInfo } from './-tabs/question-info';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/test-paper/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { mode, tenantId, contentUuid, data, hasMapping, listParam } = useExamLoaderData();

  const { alert, open: openModal, confirm: openConfirm } = useModal();

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
    onUpdateSuccess: (result?: unknown) => {
      router.navigate({
        to: '/learning/resource/test-paper/view',
        state: { mode: 'UPDATE', contentUuid: result },
        replace: true,
      });
    },
  });

  const tabItems = useMemo(
    () => [
      {
        title: t(
          `시험지 정보${mode === PageMode.UPDATE ? `(${getExamTemplateTextByType(data?.examTemplateType)})` : ''}`,
        ),
        key: ExamTab.PAPER,
        content: (
          <TestPaperInfo
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
            tenantId={tenantId}
            mode={mode}
            data={data}
            hasMapping={hasMapping}
          />
        ),
      },
      {
        title: t('문항 관리'),
        key: ExamTab.QUESTION,
        content: (
          <QuestionInfo
            ref={questionInfoRef}
            basicInfoForm={{ provider, getValues, updateFormDataByKey, saveBasicInfo }}
            contentUuid={contentUuid}
            tenantId={tenantId}
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

  // 매핑과정 버튼 클릭 시 팝업 오픈
  const handleClickCourseMapping = useCallback(async () => {
    if (!contentUuid) {
      return;
    }

    await openModal({
      content: (
        <ContentCourseMappingModal
          channelUuid={data?.channelUuid ?? ''}
          contentUuid={contentUuid}
        />
      ),
      width: 'lg',
    });
  }, [data]);

  const handleClickGoListButton = useCallback(async () => {
    if (
      await openConfirm({
        title: t('이동 하시겠습니까?'),
        content: t('LABEL.confirm.goList.message'),
      })
    ) {
      router.navigate({ to: '/learning/learning-resource', state: { listParam } });
    }
  }, [listParam]);

  const handleClickSaveButton = () => {
    if (basicInfoRef.current) {
      basicInfoRef.current?.save?.();
    } else if (questionInfoRef.current) {
      questionInfoRef.current?.update?.();
    }
  };

  useEffect(() => {
    console.log('contentUuid ===>', contentUuid);
    if (contentUuid) {
      setSaved(true);
    }
  }, [contentUuid]);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('LABEL.button.list')}
          onClick={handleClickGoListButton}
        />
        <Divider orientation="vertical" />
        <Button
          type="button"
          variant="primary"
          size="sm"
          label={t('LABEL.button.save')}
          onClick={handleClickSaveButton}
        />
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
  );
}
