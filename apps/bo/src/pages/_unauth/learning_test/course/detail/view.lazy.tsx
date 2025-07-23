import { Button, Divider, Tabs, ToggleButtonGroup } from '@learnway/ui';
import { CourseDetailTab } from '@pages/_layout/learning/course/-common/type';
import { useCourseDetailPage } from '@pages/_layout/learning/course/-hooks/use-course-detail-page';
import {
  ContentViewType,
  TriggerKey,
  useCourseActions,
} from '@pages/_layout/learning/course/-store/use-course-store';
import { Community } from '@pages/_layout/learning/course/detail/-tabs/community';
import { CourseDetail } from '@pages/_layout/learning/course/detail/-tabs/course-detail';
import { Curriculum } from '@pages/_layout/learning/course/detail/-tabs/curriculum';
import { Sequence } from '@pages/_layout/learning/course/detail/-tabs/sequence';
import { usePageState } from '@shared/lib/use-page-state';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createLazyFileRoute('/_unauth/learning_test/course/detail/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { trigger, setContentViewType } = useCourseActions();

  // 라우터 state에서 courseId 가져오기
  const { courseId, courseType } = usePageState();

  // 커스텀 훅 사용
  const { activeTab, changeTab, getTabValues, visibleButtons } = useCourseDetailPage(courseType);

  const tabItems = useMemo(
    () => [
      {
        title: '과정상세',
        key: CourseDetailTab.COURSE_DETAIL,
        content: <CourseDetail courseId={courseId} />,
      },
      {
        title: '커리큘럼',
        key: CourseDetailTab.CURRICULUM,
        content: <Curriculum courseId={courseId} />,
      },
      {
        title: '차수',
        key: CourseDetailTab.SEQUENCE,
        content: <Sequence courseId={courseId} />,
      },
      {
        title: '커뮤니티',
        key: CourseDetailTab.COMMUNITY,
        content: <Community courseId={courseId} />,
      },
    ],
    [],
  );

  const handleTabChange = (tabKey: string) => {
    changeTab(tabKey as CourseDetailTab);
    setContentViewType(ContentViewType.LIST); // 탭 이동시 목록 뷰로 변경
  };

  return (
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
          label={'Values'}
          onClick={() => console.log('getTabValues', getTabValues())}
        />
        {!!visibleButtons?.isTranslate && (
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'과정 번역'}
            onClick={() => console.log('과정 번역')}
          />
        )}
        {!!visibleButtons?.isCopy && (
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'과정 복사'}
            onClick={() => console.log('과정 복사')}
          />
        )}
        {!!visibleButtons?.isList && (
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'목록'}
            onClick={() => trigger(TriggerKey.LIST)}
          />
        )}
        {!!visibleButtons?.isDivider && <Divider orientation={'vertical'} />}
        {!!visibleButtons?.isDelete && (
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'삭제'}
            onClick={() => trigger(TriggerKey.DELETE)}
            disabled={!courseId}
          />
        )}
        {!!visibleButtons?.isSave && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            label={'저장'}
            onClick={() => trigger(TriggerKey.SAVE)}
          />
        )}
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
