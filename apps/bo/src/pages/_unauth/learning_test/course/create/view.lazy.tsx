import { Button, Divider, Tabs, useModal } from '@learnway/ui';
import { CourseTab } from '@pages/_layout/learning/course/-common/type';
import { useCourseCreatePage } from '@pages/_layout/learning/course/-hooks/use-course-create-page';
import { TriggerKey } from '@pages/_layout/learning/course/-store/use-course-store';
import { BasicInfo } from '@pages/_layout/learning/course/create/-tabs/basic-info';
import { CourseRegistration } from '@pages/_layout/learning/course/create/-tabs/course-registration';
import { Curriculum } from '@pages/_layout/learning/course/create/-tabs/curriculum';
import { DetailInfo } from '@pages/_layout/learning/course/create/-tabs/detail-info';
import { PublishCourse } from '@pages/_layout/learning/course/create/-tabs/publish-course';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createLazyFileRoute('/_unauth/learning_test/course/create/view')({
  component: RouteComponent,
});

function RouteComponent() {
  // 커스텀 훅 사용
  const { changeTab, moveCourseListPage, activeTab, isCreateMode, trigger } = useCourseCreatePage();

  const handleTabChange = (activeKey: string) => {
    console.log('activeKey', activeKey);
    changeTab(activeKey as CourseTab);
  };

  // 기본정보 설정 컴포넌트에서 유형과 채널이 변경되었을 때 호출되는 함수
  // const handleConfigPropChange = useCallback(
  //   (config: { courseType: string; channelUuid: string }) => {
  //     console.log('handleConfigPropChange', config);
  //     loadCourseConfig(config.courseType, config.channelUuid);
  //   },
  //   [loadCourseConfig],
  // );

  const tabItems = useMemo(
    () => [
      {
        title: '기본정보 설정',
        key: CourseTab.STEP1,
        content: <BasicInfo />,
      },
      {
        title: '수강신청 설정',
        key: CourseTab.STEP2,
        content: <CourseRegistration />,
      },
      {
        title: '커리큘럼 설정',
        key: CourseTab.STEP3,
        content: <Curriculum />,
      },
      {
        title: '상세 설정',
        key: CourseTab.STEP4,
        content: <DetailInfo />,
      },
      {
        title: '게시 설정',
        key: CourseTab.STEP5,
        content: <PublishCourse />,
      },
    ],
    [],
  );

  console.log('------- view.lazy page...');

  return (
    <PageContainer>
      s
      <ContentsButtons>
        {/* <Button
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
        /> */}
        <Button
          type="button"
          variant="point"
          size="sm"
          label={'목록'}
          onClick={moveCourseListPage}
        />
        <Divider orientation={'vertical'} />
        <Button
          type="button"
          variant="point"
          size="sm"
          label={'삭제'}
          onClick={() => trigger(TriggerKey.DELETE)}
          disabled={isCreateMode}
        />
        <Button
          type="button"
          variant="primary"
          size="sm"
          label={'저장'}
          onClick={() => trigger(TriggerKey.SAVE)}
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
  );
}
