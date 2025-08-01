import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { Tabs } from '@learnway/ui/tabs';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCourseCreatePage } from '../../hooks/use-course-create-page';
import { TriggerKey } from '../../store/use-course-store';
import { CourseTab } from '../../types/type';
import { BasicInfo } from './tabs/basic-info';
import { CourseRegistration } from './tabs/course-registration';
import { CurriculumByCreate } from './tabs/curriculum';
import { DetailInfo } from './tabs/detail-info';
import { PublishCourse } from './tabs/publish-course';

const Component = () => {
  // 커스텀 훅 사용
  const { changeTab, moveCourseListPage, activeTab, isCreateMode, trigger, handleBeforeChange } =
    useCourseCreatePage();
  const { t } = useTranslation();

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
        disabled: isCreateMode,
      },
      {
        title: '커리큘럼 설정',
        key: CourseTab.STEP3,
        content: <CurriculumByCreate />,
        disabled: isCreateMode,
      },
      {
        title: '상세 설정',
        key: CourseTab.STEP4,
        content: <DetailInfo />,
        disabled: isCreateMode,
      },
      {
        title: '게시 설정',
        key: CourseTab.STEP5,
        content: <PublishCourse />,
        disabled: isCreateMode,
      },
    ],
    [isCreateMode],
  );

  console.log('------- view.lazy page...');

  return (
    <PageContainer>
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
          label={t('목록')}
          onClick={moveCourseListPage}
        />
        <Divider orientation={'vertical'} />
        <Button
          type="button"
          variant="point"
          size="sm"
          label={t('삭제')}
          onClick={() => trigger(TriggerKey.DELETE)}
          disabled={isCreateMode}
        />
        <Button
          type="button"
          variant="primary"
          size="sm"
          label={t('저장')}
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
          onBeforeTabChange={handleBeforeChange}
        />
      </MainContents>
    </PageContainer>
  );
};

export const CourseCreate = Component;
