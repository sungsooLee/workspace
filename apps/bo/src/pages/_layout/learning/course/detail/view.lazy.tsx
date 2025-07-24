import { Button, Divider, Tabs, ToggleButtonGroup } from '@learnway/ui';
import { CourseDetailTab } from '@pages/_layout/learning/course/-common/type';
import { useCourseDetailPage } from '@pages/_layout/learning/course/-hooks/use-course-detail-page';
import { Community } from '@pages/_layout/learning/course/detail/-tabs/community';
import { CourseDetail } from '@pages/_layout/learning/course/detail/-tabs/course-detail';
import { Curriculum } from '@pages/_layout/learning/course/detail/-tabs/curriculum';
import { Sequence } from '@pages/_layout/learning/course/detail/-tabs/sequence';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { ContentViewType, TriggerKey, useCourseActions } from '../-store/use-course-store';

export const Route = createLazyFileRoute('/_layout/learning/course/detail/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const { trigger } = useCourseActions();

  // 커스텀 훅 사용
  const { activeTab, changeTab, visibleButtons, moveEnrollmentManagementPage } =
    useCourseDetailPage();

  const tabItems = useMemo(
    () => [
      {
        title: '과정상세',
        key: CourseDetailTab.COURSE_DETAIL,
        content: <CourseDetail />,
      },
      {
        title: '커리큘럼',
        key: CourseDetailTab.CURRICULUM,
        content: <Curriculum />,
      },
      {
        title: '차수',
        key: CourseDetailTab.SEQUENCE,
        content: <Sequence />,
      },
      {
        title: '커뮤니티',
        key: CourseDetailTab.COMMUNITY,
        content: <Community />,
      },
    ],
    [],
  );

  const handleTabChange = (tabKey: string) => {
    changeTab(tabKey as CourseDetailTab);
  };

  return (
    <PageContainer hideOutLine={true}>
      <ContentsButtons>
        <ToggleButtonGroup
          defaultValue={'과정관리'}
          options={[
            { label: '과정관리', value: '과정관리' },
            { label: '수강관리', value: '수강관리' },
          ]}
          onClick={(value) => value === '수강관리' && moveEnrollmentManagementPage()}
        />
        <Button type="button" variant="point" size="sm" label={'Values'} />
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
