import { Button, Divider, Tabs, ToggleButtonGroup, useModal } from '@learnway/ui';
import { CourseDetailTab } from '@pages/_layout/learning/course/-common/type';
import { useCourseDetailForm } from '@pages/_layout/learning/course/-hooks/use-course-detail-form';
import { Community } from '@pages/_layout/learning/course/detail/-tabs/community';
import { CourseDetail } from '@pages/_layout/learning/course/detail/-tabs/course-detail';
import { Curriculum } from '@pages/_layout/learning/course/detail/-tabs/curriculum';
import { Sequence } from '@pages/_layout/learning/course/detail/-tabs/sequence';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createLazyFileRoute('/_layout/learning/course/detail/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { showSaveComplete, showDeleteComplete, deleteConfirm, saveConfirm } = useModal();

  // 라우터 state에서 courseId 가져오기
  const { courseId, courseType } = router.state.location.state;

  // 커스텀 훅 사용
  const { activeTab, setTabRef, saveTabData, changeTab, getTabValues, deleteTabData } =
    useCourseDetailForm(courseType);

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
    saveTabData();
    // try {
    //   if (await saveConfirm()) {
    //     await saveTabData();
    //     await showSaveComplete();
    //     moveListPage();
    //   }
    // } catch (e) {
    //   console.error('저장 중 에러:', e);
    // }
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
    changeTab(activeKey as CourseDetailTab);
  };

  const tabItems = useMemo(
    () => [
      {
        title: '과정상세',
        key: CourseDetailTab.COURSE_DETAIL,
        content: (
          <CourseDetail
            ref={(ref) => setTabRef(CourseDetailTab.COURSE_DETAIL, ref)}
            courseId={courseId}
          />
        ),
      },
      {
        title: '커리큘럼',
        key: CourseDetailTab.CURRICULUM,
        content: (
          <Curriculum
            ref={(ref) => setTabRef(CourseDetailTab.CURRICULUM, ref)}
            courseId={courseId}
          />
        ),
      },
      {
        title: '차수',
        key: CourseDetailTab.SEQUENCE,
        content: (
          <Sequence ref={(ref) => setTabRef(CourseDetailTab.SEQUENCE, ref)} courseId={courseId} />
        ),
      },
      {
        title: '커뮤니티',
        key: CourseDetailTab.COMMUNITY,
        content: (
          <Community ref={(ref) => setTabRef(CourseDetailTab.COMMUNITY, ref)} courseId={courseId} />
        ),
      },
    ],
    [setTabRef],
  );

  console.log('------- view.lazy page...');

  return (
    <form>
      <PageContainer hideOutLine={true}>
        <ContentsButtons>
          <ToggleButtonGroup
            defaultValue={'과정관리value'}
            options={[
              { label: '과정관리', value: '과정관리value' },
              { label: '수강관리', value: '수강관리value' },
            ]}
            onClick={(value) => console.log('ToggleButtonGroup.onClick', value)}
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
            // onClick={() => loadMockData(4)}
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
    </form>
  );
}
