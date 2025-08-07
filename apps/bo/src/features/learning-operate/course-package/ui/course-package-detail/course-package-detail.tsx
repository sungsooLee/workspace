import { Button } from '@learnway/ui/button';
import { Divider } from '@learnway/ui/elements';
import { useModal } from '@learnway/ui/modal';
import { Tabs } from '@learnway/ui/tabs';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useCoursePackageDetailPage } from '../../hooks/use-course-package-detail-page';
import { TriggerKey, useCoursePackageActions } from '../../store/use-course-package-store';
import { CoursePackageDetailTab } from '../../types/type';
import { BasicInfo } from './tabs/basic-info';
import { PackageInfo } from './tabs/package-info';

const CoursePackageDetailComponent = () => {
  const { trigger } = useCoursePackageActions();
  const { alert } = useModal();

  // 커스텀 훅 사용
  const { activeTab, changeTab } = useCoursePackageDetailPage();

  const tabItems = useMemo(
    () => [
      {
        title: t('기본정보'),
        key: CoursePackageDetailTab.BASIC_INFO,
        content: <BasicInfo />,
      },
      {
        title: t('패키지 구성'),
        key: CoursePackageDetailTab.PACKAGE_INFO,
        content: <PackageInfo />,
      },
    ],
    [],
  );

  const handleTabChange = (tabKey: string) => {
    changeTab(tabKey as CoursePackageDetailTab);
  };

  return (
    <PageContainer hideOutLine={true}>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={'목록'}
          onClick={() => trigger(TriggerKey.LIST)}
        />
        <Divider orientation={'vertical'} />
        <Button
          type="button"
          variant="point"
          size="sm"
          label={'삭제'}
          onClick={() => trigger(TriggerKey.DELETE)}
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
          showContentBorder={true}
          // onBeforeTabChange={async (currentTabKey, nextTabKey) => await saveConfirm()}
        />
      </MainContents>
    </PageContainer>
  );
};

export const CoursePackageDetail = CoursePackageDetailComponent;
