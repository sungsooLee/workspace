import { Button, Divider, Tabs, useModal } from '@learnway/ui';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { BasicInfo } from '../-components/basic-info/basic-info';
import { CourseRegistration } from '../-components/course-registration/course-registration';
import { Curriculum } from '../-components/curriculum/curriculum';
import { DetailInfo } from '../-components/detail-info/detail-info';
import { PublishCourse } from '../-components/publish-course/publish-course';
import { useCourseForm } from '../-hooks/use-course-form';
import { MainContents, PageContainer, ContentsButtons } from '@shared/ui';

export const Route = createLazyFileRoute('/_layout/learning/course/create/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { showSaveComplete } = useModal();

  // 라우터 state에서 courseId 가져오기
  const { courseId, courseType } = router.state.location.state;

  // 커스텀 훅 사용
  const {
    data,
    activeTab,
    setTabRef,
    loadCourseData,
    saveCurrentTab,
    changeTab,
    loadMockData,
    getTabValues,
  } = useCourseForm(courseType);

  // 최초 데이터 로드
  useEffect(() => {
    if (courseId) {
      loadCourseData(courseId);
    }
  }, [courseId]);

  const moveListPage = () => {
    router.navigate({
      to: '/learning_test/course',
    });
  };

  const handleListClick = () => {
    console.log('handleListClick');
    moveListPage();
  };

  const handleDeleteClick = () => {
    console.log('handleImportCourse');
  };

  const handleSaveClick = async () => {
    console.log('data {} => ');
    const result = await saveCurrentTab();
    if (result.success) {
      await showSaveComplete();
      moveListPage();
    }
  };

  const handleTabChange = (activeKey: string) => {
    console.log('activeKey', activeKey);
    changeTab(activeKey);
  };

  const tabItems = useMemo(
    () => [
      {
        title: '기본정보 설정',
        key: 'STEP1',
        content: <BasicInfo ref={(ref) => setTabRef('STEP1', ref)} data={data} />,
      },
      {
        title: '수강신청 설정',
        key: 'STEP2',
        content: <CourseRegistration ref={(ref) => setTabRef('STEP2', ref)} data={data} />,
      },
      {
        title: '커리큘럼 설정',
        key: 'STEP3',
        content: <Curriculum ref={(ref) => setTabRef('STEP3', ref)} data={data} />,
      },
      {
        title: '상세 설정',
        key: 'STEP4',
        content: <DetailInfo ref={(ref) => setTabRef('STEP4', ref)} data={data} />,
      },
      {
        title: '게시 설정',
        key: 'STEP5',
        content: <PublishCourse ref={(ref) => setTabRef('STEP5', ref)} data={data} />,
      },
    ],
    [data, setTabRef],
  );

  console.log('------- view.lazy page...');

  return (
    <form>
      <PageContainer>
        <ContentsButtons>
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'getTabValues'}
            onClick={() => getTabValues()}
          />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'SET'}
            onClick={() => loadMockData()}
          />
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
            disabled={!courseId}
          />
          <Button
            type="button"
            variant="primary"
            size="sm"
            label={'저장'}
            onClick={handleSaveClick}
          />
        </ContentsButtons>
        <MainContents>
          <Tabs
            type={'progress'}
            size={'sm'}
            items={tabItems}
            onTabChange={handleTabChange}
            selectedTabKey={activeTab}
          />
        </MainContents>
      </PageContainer>
    </form>
  );
}
