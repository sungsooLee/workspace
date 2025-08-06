import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { useModal } from '@learnway/ui/modal';
import { Tabs } from '@learnway/ui/tabs';
import { ToggleButtonGroup } from '@learnway/ui/toggle-button-group';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCourseDetailPage } from '../../hooks/use-course-detail-page';
import { TriggerKey, useCourseActions } from '../../store/use-course-store';
import { CourseDetailTab } from '../../types/type';
import { Community } from './tabs/community';
import { CourseDetailInfo } from './tabs/course-detail-info';
import { CurriculumByDetail } from './tabs/curriculum';
import { Sequence } from './tabs/sequence';

const Component = () => {
  const { t } = useTranslation();
  const { trigger } = useCourseActions();
  const { alert } = useModal();

  // 커스텀 훅 사용
  const { activeTab, courseName, changeTab, visibleButtons, moveEnrollmentManagementPage } =
    useCourseDetailPage();

  const tabItems = useMemo(
    () => [
      {
        title: t('과정상세'),
        key: CourseDetailTab.COURSE_DETAIL,
        content: <CourseDetailInfo />,
      },
      {
        title: t('커리큘럼'),
        key: CourseDetailTab.CURRICULUM,
        content: <CurriculumByDetail />,
      },
      {
        title: t('차수'),
        key: CourseDetailTab.SEQUENCE,
        content: <Sequence />,
      },
      {
        title: t('커뮤니티'),
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
            { label: t('과정관리'), value: '과정관리' },
            { label: t('수강관리'), value: '수강관리' },
          ]}
          onClick={(value) => value === '수강관리' && moveEnrollmentManagementPage()}
        />
        {/* <Button type="button" variant="point" size="sm" label={'Values'} /> */}
        {!!visibleButtons?.isTranslate && (
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'과정 번역'}
            onClick={() => trigger(TriggerKey.TRANSLATE)}
          />
        )}
        {!!visibleButtons?.isCopy && (
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'과정 복사'}
            onClick={() => trigger(TriggerKey.COPY)}
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
};

export const CourseDetail = Component;
