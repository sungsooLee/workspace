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
  SubContents,
} from '@shared/ui';
import { ExamTab, PageMode, TabFormRef } from './-common/type';
import { useExamLoaderData } from './-hooks/use-exam-loader-data';
import { TestPaperInfo } from './-tabs/test-paper-info';
import { QuestionInfo } from './-tabs/question-info';

import { getExamTemplateTextByType } from './-common/common';
import { useExamPaperForm } from './-hooks/use-exam-paper-form';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/test-paper/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { mode, tenantId, contentUuid, data, hasMapping } = useExamLoaderData();
  console.log('data by router state', data, hasMapping);

  const { alert, open: openModal, confirm: openConfirm } = useModal();

  const { tabRefs, setTabRef, questionGenType, setQuestionGenType } = useExamPaperForm(data);

  const tabItems = useMemo(
    () => [
      {
        title: t(
          `시험지 정보${mode === PageMode.UPDATE ? `(${getExamTemplateTextByType(data?.examTemplate)})` : ''}`,
        ),
        key: ExamTab.PAPER,
        content: (
          <TestPaperInfo
            ref={(ref: TabFormRef) => setTabRef(ExamTab.PAPER, ref)}
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
            ref={(ref: TabFormRef) => setTabRef(ExamTab.QUESTION, ref)}
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
    [data],
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
        title: t('LABEL.confirm.goList.title'),
        content: t('LABEL.confirm.goList.message'),
      })
    ) {
      router.navigate({ to: '/learning/learning-resource' });
    }
  }, []);

  const handleClickSaveButton = () => {
    if (tabRefs.current?.[ExamTab.PAPER]) {
      tabRefs.current?.[ExamTab.PAPER]?.save();
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

      {selectedTabKey === ExamTab.PAPER && (
        <SubContents>
          <div>
            <strong className={styles.title}>{t('cms.content.ContentType.EXAM')}</strong>
          </div>
        </SubContents>
      )}
    </PageContainer>
  );
}
