import { useCallback, useMemo, useState } from 'react';
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
import { ExamTab } from './-common/type';
import { useExamLoaderData } from './-hooks/use-exam-loader-data';
import { TestPaperInfo } from './-tabs/test-paper-info';
import { QuestionInfo } from './-tabs/question-info';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';

export const Route = createLazyFileRoute('/_layout/learning/resource/test-paper/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { contentUuid, data, hasMapping } = useExamLoaderData();
  console.log('data by router state', data, hasMapping);

  const { open: openModal, confirm: openConfirm } = useModal();

  const tabItems = useMemo(
    () => [
      {
        title: t('시험지 정보(OMR 시험지)'),
        key: ExamTab.PAPER,
        content: <TestPaperInfo />,
      },
      {
        title: t('문항 추가(랜덤형)'),
        key: ExamTab.QUESTION,
        content: <QuestionInfo />,
      },
    ],
    [],
  );

  const [selectedTabKey, setSelectedTabKey] = useState<string>(ExamTab.PAPER);

  const handleTabChange = (tabKey: string) => {
    setSelectedTabKey(tabKey);
  };

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

  const [saved, setSaved] = useState<boolean>(false);

  const handleClickSaveButton = async () => {
    if (
      await openConfirm({
        title: t('LABEL.confirm.save.title'),
        content: t('입력한 정보로 저장합니다.'),
      })
    ) {
      // router.navigate({
      //   to: '/learning/resource/test-paper/view',
      //   state: { mode: 'UPDATE', contentUuid: '1234' },
      //   replace: true
      // });
      setSaved(true);
    }
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('목록')}
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
        <form className="form_row">
          <div className={styles.main_contents}>
            <Tabs
              type="progress"
              size="sm"
              selectedTabKey={selectedTabKey}
              items={tabItems}
              onTabChange={handleTabChange}
              clickDisabled={!saved}
            />
          </div>
        </form>
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
