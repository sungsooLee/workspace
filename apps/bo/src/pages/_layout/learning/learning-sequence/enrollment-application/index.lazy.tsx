import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { useModal } from '@learnway/ui/modal';
import { ToggleButtonGroup } from '@learnway/ui/toggle-button-group';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { useRouter, createLazyFileRoute } from '@tanstack/react-router';
// import { RoundList } from '@features/learning-operate/round';
import { Enrollment } from '@features/learning-operate/learning-sequence/enrollment-application/ui/enrollment';
import { StudentsManagement } from '@features/learning-operate/learning-sequence/students-management/students-management';
import { Tabs } from '@learnway/ui/tabs';
import { usePageState } from '@shared/lib';
import { useMemo } from 'react';
import { SequenceTab } from '../-common/type';
import { useSequenceForm } from '../-hook/use-sequence-form';

export interface EnrollmentApplicationProps {
  courseId?: number; // 과정 ID
  courseName?: string; // 과정명
  courseType?: string; // 과정 타입
  sequenceId?: number; // 차수 ID
}

/**
 * [NLP_BO_LMS_0035] 수강신청 목록 조회
 * @state: courseIdKey, courseSequenceIdKey
 */
export const Route = createLazyFileRoute('/_layout/learning/learning-sequence/enrollment-application/')(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  const router = useRouter();
  const { courseId, courseName, courseType, sequenceId } =
    usePageState<EnrollmentApplicationProps>();
  const { showSaveComplete, showDeleteComplete, deleteConfirm, saveConfirm } = useModal();
  // 커스텀 훅 사용
  const { activeTab, setTabRef, saveTabData, changeTab, getTabValues, deleteTabData } =
    useSequenceForm('1');

  const moveListPage = () => {
    router.navigate({
      to: '/learning/learning-sequence/enrollment-application',
      state: {
        courseId,
        courseName,
        courseType,
        sequenceId,
      },
    });
  };

  const handleListClick = () => {
    console.log('handleListClick');
    moveListPage();
  };

  const handleSaveClick = async () => {
    try {
      if (await saveConfirm()) {
        await saveTabData();
        await showSaveComplete();
        moveListPage();
      }
    } catch (e) {
      console.error('저장 중 에러:', e);
    }
  };

  const handleDeleteClick = async () => {
    try {
      if (await deleteConfirm()) {
        await deleteTabData();
        await showDeleteComplete();
        moveListPage();
      }
    } catch (e) {
      // 에러는 상위에서 처리하거나, 필요시 여기서 처리
      console.error('삭제 중 에러:', e);
    }
  };

  const handleTabChange = (activeKey: string) => {
    console.log('activeKey', activeKey);
    changeTab(activeKey as SequenceTab);
  };

  const tabItems = useMemo(
    () => [
      {
        title: '수강신청 관리',
        key: SequenceTab.ENROLLMENT_APPLICATION,
        content: <Enrollment />,
      },
      {
        title: '수강생 관리',
        key: SequenceTab.STUDENT_MANAGEMENT,
        content: <StudentsManagement />,
      },
      {
        title: '평가/과제/설문 관리',
        key: SequenceTab.EVALUATION_MANAGEMENT,
        // content: (
        //   <EvaluationManagement />
        // )
      },
    ],
    [setTabRef],
  );

  return (
    <PageContainer hideOutLine={true}>
      <ContentsButtons>
        <ToggleButtonGroup
          defaultValue={'edu'}
          options={[
            { label: '과정관리', value: 'course' },
            { label: '수강관리', value: 'edu' },
          ]}
          onClick={(value) =>
            router.navigate({
              to: `/learning/course`,
            })
          }
        />
        <Divider orientation="vertical" />
        <>
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'목록'}
            onClick={handleListClick}
          />
          <Divider orientation={'vertical'} />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'삭제'}
            onClick={handleDeleteClick}
            //   disabled={!sequenceId}
          />
          <Button
            type="button"
            variant="primary"
            size="sm"
            label={'저장'}
            onClick={handleSaveClick}
          />
        </>
      </ContentsButtons>
      <MainContents>
        <Tabs
          type={'fill'}
          size={'sm'}
          items={tabItems}
          onTabChange={handleTabChange}
          selectedTabKey={activeTab}
          showContentBorder={true}
          // onBeforeTabChange={async (currentTabKey, nextTabKey) => await saveConfirm()}
        />
      </MainContents>
    </PageContainer>
  );
}
