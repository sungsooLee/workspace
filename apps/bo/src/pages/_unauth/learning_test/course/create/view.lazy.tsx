import { Button, Divider, Tabs } from '@learnway/ui';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import React, { useEffect, useMemo } from 'react';
import { BasicInfo } from '../-components/basic-info/basic-info';
import { CourseRegistration } from '../-components/course-registration/course-registration';
import { Curriculum } from '../-components/curriculum/curriculum';
import { DetailInfo } from '../-components/detail-info/detail-info';
import { PublishCourse } from '../-components/publish-course/publish-course';
import { useCourseForm } from '../-hooks/use-course-form';

export const Route = createLazyFileRoute('/_unauth/learning_test/course/create/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  // 라우터 state에서 courseId 가져오기
  const courseId = router.state.location.state?.courseId;

  // 커스텀 훅 사용
  const {
    formData,
    isLoading,
    activeTab,
    setTabRef,
    loadCourseData,
    saveCurrentTab,
    changeTab,
    setFormDataComplete,
  } = useCourseForm();

  // 최초 데이터 로드
  useEffect(() => {
    if (courseId) {
      loadCourseData(courseId);
    }
  }, [courseId]);

  const handleListClick = () => {
    console.log('handleListClick');
    router.navigate({
      to: '/learning/course',
    });
  };

  const handleDeleteClick = () => {
    console.log('handleImportCourse');
  };

  const handleSaveClick = async () => {
    console.log('data {} => ');
    const result = await saveCurrentTab();

    if (result.success) {
      console.log('저장 성공:', result.data);
      // 저장 성공 후 재조회
      await loadCourseData(courseId);
    } else {
      console.error('저장 실패:', result.error);
      // TODO: 실패 시 처리 로직 (예: 에러 메시지 표시)
    }
  };

  const handleTabChange = (activeKey: string) => {
    console.log('activeKey', activeKey);
    changeTab(activeKey);
  };

  const handleLoadDummyData = async () => {
    await loadCourseData(courseId);
  };

  const tabItems = useMemo(
    () => [
      {
        title: '기본정보 설정',
        key: 'a',
        content: <BasicInfo ref={(ref) => setTabRef('a', ref)} initialData={formData} />,
      },
      {
        title: '수강신청 설정',
        key: 'b',
        content: <CourseRegistration ref={(ref) => setTabRef('b', ref)} initialData={formData} />,
      },
      {
        title: '커리큘럼 설정',
        key: 'c',
        content: <Curriculum ref={(ref) => setTabRef('c', ref)} initialData={formData} />,
      },
      {
        title: '상세 설정',
        key: 'd',
        content: <DetailInfo ref={(ref) => setTabRef('d', ref)} initialData={formData} />,
      },
      {
        title: '강의 설정',
        key: 'e',
        content: <PublishCourse ref={(ref) => setTabRef('e', ref)} initialData={formData} />,
      },
    ],
    [formData, setTabRef],
  );

  return (
    <form>
      <PageContainer>
        <ContentsButtons>
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'SET'}
            onClick={handleLoadDummyData}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'목록'}
            onClick={handleListClick}
            disabled={isLoading}
          />
          <Divider orientation={'vertical'} />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'삭제'}
            onClick={handleDeleteClick}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="primary"
            size="sm"
            label={isLoading ? '저장 중...' : '저장'}
            onClick={handleSaveClick}
            disabled={isLoading}
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
