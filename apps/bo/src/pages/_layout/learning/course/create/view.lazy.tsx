import { Button, Divider, Tabs, useModal } from '@learnway/ui';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo } from 'react';
import { BasicInfo } from '../-components/basic-info/basic-info';
import { CourseRegistration } from '../-components/course-registration/course-registration';
import { Curriculum } from '../-components/curriculum/curriculum';
import { DetailInfo } from '../-components/detail-info/detail-info';
import { PublishCourse } from '../-components/publish-course/publish-course';
import { useCourseForm } from '../-hooks/use-course-form';
import { MainContents, PageContainer, ContentsButtons } from '@shared/ui';
import { CourseTab } from '../-common/type';

export const Route = createLazyFileRoute('/_layout/learning/course/create/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { showSaveComplete, showDeleteComplete } = useModal();

  // 라우터 state에서 courseId 가져오기
  const { courseId, courseType } = router.state.location.state;

  // 커스텀 훅 사용
  const {
    data,
    activeTab,
    setTabRef,
    loadCourseData,
    loadCourseConfig,
    saveCurrentTab,
    changeTab,
    loadMockData,
    getTabValues,
    deleteCourseData,
  } = useCourseForm(courseType);

  // 최초 데이터 로드
  useEffect(() => {
    if (courseId) {
      loadCourseData(courseId);
    }
  }, [courseId]);

  const moveListPage = () => {
    router.navigate({
      to: '/learning/course',
    });
  };

  const handleListClick = () => {
    console.log('handleListClick');
    moveListPage();
  };

  const handleSaveClick = async () => {
    try {
      await saveCurrentTab();
      await showSaveComplete();
      moveListPage();
    } catch (e) {
      // 에러는 상위에서 처리하거나, 필요시 여기서 처리
      console.error('저장 중 에러:', e);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteCourseData(courseId);
      await showDeleteComplete();
      moveListPage();
    } catch (e) {
      // 에러는 상위에서 처리하거나, 필요시 여기서 처리
      console.error('삭제 중 에러:', e);
    }
  };

  const handleTabChange = (activeKey: string) => {
    console.log('activeKey', activeKey);
    changeTab(activeKey as CourseTab);
  };

  // 기본정보 설정 컴포넌트에서 유형과 채널이 변경되었을 때 호출되는 함수
  const handleConfigPropChange = useCallback(
    (config: { courseType: string; channelUuid: string }) => {
      console.log('handleConfigPropChange', config);
      loadCourseConfig(config.courseType, config.channelUuid);
    },
    [loadCourseConfig],
  );

  const tabItems = useMemo(
    () => [
      {
        title: '기본정보 설정',
        key: CourseTab.STEP1,
        content: (
          <BasicInfo
            ref={(ref) => setTabRef(CourseTab.STEP1, ref)}
            data={data}
            onConfigPropChange={handleConfigPropChange}
          />
        ),
      },
      {
        title: '수강신청 설정',
        key: CourseTab.STEP2,
        content: <CourseRegistration ref={(ref) => setTabRef(CourseTab.STEP2, ref)} data={data} />,
      },
      {
        title: '커리큘럼 설정',
        key: CourseTab.STEP3,
        content: <Curriculum ref={(ref) => setTabRef(CourseTab.STEP3, ref)} data={data} />,
      },
      {
        title: '상세 설정',
        key: CourseTab.STEP4,
        content: <DetailInfo ref={(ref) => setTabRef(CourseTab.STEP4, ref)} data={data} />,
      },
      {
        title: '게시 설정',
        key: CourseTab.STEP5,
        content: <PublishCourse ref={(ref) => setTabRef(CourseTab.STEP5, ref)} data={data} />,
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
            label={'Tab Values'}
            onClick={() => console.log('getTabValues', getTabValues())}
          />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'SET'}
            onClick={() => loadMockData(1)}
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
