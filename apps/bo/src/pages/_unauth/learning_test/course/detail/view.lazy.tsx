import { Button, Divider, Tabs, ToggleButtonGroup, useModal } from '@learnway/ui';
import { CourseDetailTab } from '@pages/_layout/learning/course/-common/type';
import { useCourseDetailForm } from '@pages/_layout/learning/course/-hooks/use-course-detail-form';
import { Community } from '@pages/_layout/learning/course/detail/-tabs/community';
import { CourseDetail } from '@pages/_layout/learning/course/detail/-tabs/course-detail';
import { Curriculum } from '@pages/_layout/learning/course/detail/-tabs/curriculum';
import { Sequence } from '@pages/_layout/learning/course/detail/-tabs/sequence';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo } from 'react';

export const Route = createLazyFileRoute('/_unauth/learning_test/course/detail/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { showSaveComplete, showDeleteComplete, deleteConfirm, saveConfirm } = useModal();

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
  } = useCourseDetailForm(courseType);

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

  const handleSaveClick = async () => {
    try {
      if (await saveConfirm()) {
        await saveCurrentTab();
        await showSaveComplete();
        moveListPage();
      }
    } catch (e) {
      // 에러는 상위에서 처리하거나, 필요시 여기서 처리
      console.error('저장 중 에러:', e);
    }
  };

  const handleDeleteClick = async () => {
    try {
      if (await deleteConfirm()) {
        await deleteCourseData(courseId);
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
    changeTab(activeKey as CourseDetailTab);
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
        title: '과정상세',
        key: CourseDetailTab.COURSE_DETAIL,
        content: (
          <CourseDetail
            ref={(ref) => setTabRef(CourseDetailTab.COURSE_DETAIL, ref)}
            data={data}
            onConfigPropChange={handleConfigPropChange}
          />
        ),
      },
      {
        title: '커리큘럼',
        key: CourseDetailTab.CURRICULUM,
        content: (
          <Curriculum ref={(ref) => setTabRef(CourseDetailTab.CURRICULUM, ref)} data={data} />
        ),
      },
      {
        title: '차수',
        key: CourseDetailTab.SEQUENCE,
        content: <Sequence ref={(ref) => setTabRef(CourseDetailTab.SEQUENCE, ref)} data={data} />,
      },
      {
        title: '커뮤니티',
        key: CourseDetailTab.COMMUNITY,
        content: <Community ref={(ref) => setTabRef(CourseDetailTab.COMMUNITY, ref)} data={data} />,
      },
    ],
    [data, setTabRef],
  );

  console.log('------- view.lazy page...');

  return (
    <form>
      <PageContainer>
        <ContentsButtons>
          <ToggleButtonGroup
            options={[
              { label: '과정관리', value: '과정관리value' },
              { label: '수강관리', value: '수강관리value' },
            ]}
            onChange={(value) => console.log('ToggleButtonGroup.onChange', value)}
          />
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
            onClick={() => loadMockData(4)}
          />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'과정 번역'}
            onClick={() => console.log('과정 번역')}
          />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'과정 복사'}
            onClick={() => console.log('과정 복사')}
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
