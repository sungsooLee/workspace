import { createFileRoute, useRouter } from '@tanstack/react-router';
import { pageRouteConfig } from '@features/auth/index';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { Button, Divider, Switch, Tabs, ToggleButtonGroup, useModal } from '@learnway/ui';
import { t } from 'i18next';
// import { RoundList } from '@features/learning-operate/round';
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { useMemo, useState } from 'react';
import { IcoArrowDown } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { Enrollment } from '@features/learning-operate/learning-sequence/enrollment-application/ui/enrollment';
import { SequenceTab } from '../-common/type';
import { useSequenceForm } from '../-hook/use-sequence-form';

/**
 * [NLP_BO_LMS_0035] 수강신청 목록 조회
 */
export const Route = createFileRoute('/_layout/learning/learning-sequence/enrollment-application/')(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  const router = useRouter();
  const [btnState, setBtnState] = useState<string>('edu');
  const { showSaveComplete, showDeleteComplete, deleteConfirm, saveConfirm } = useModal();
  // 커스텀 훅 사용
  const { activeTab, setTabRef, saveTabData, changeTab, getTabValues, deleteTabData } =
    useSequenceForm('1');

  const moveListPage = () => {
    router.navigate({
      to: '/learning/learning-sequence/enrollment-application',
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
        // content: (
        //   <StudentManagement />
        //   />
        // ),
      },
      {
        title: '평가/과제/설문 관리',
        key: SequenceTab.EVALUATION_MANAGEMENT,
        // content: (
        //   <EvaluationManagement />
        // ),
      },
    ],
    [setTabRef],
  );

  return (
    <PageContainer>
      <ContentsButtons>
        <ToggleButtonGroup
          defaultValue={'edu'}
          options={[
            { label: '과정관리', value: 'course' },
            { label: '수강관리', value: 'edu' },
          ]}
          onChange={(value) => setBtnState(value)}
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
