import { Button, Divider, Tabs } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import React, { useMemo, useRef } from 'react';
import { BasicInfo } from '../-components/basic-info/basic-info';
import { TabFormRef } from '../-components/common/tab-form-ref';
import { CourseRegistration } from '../-components/course-registration/course-registration';
import { Curriculum } from '../-components/curriculum/curriculum';
import { DetailInfo } from '../-components/detail-info/detail-info';
import { PublishCourse } from '../-components/publish-course/publish-course';

export const Route = createFileRoute('/_unauth/learning_test/course/create/view')({
  component: RouteComponent,
});

function RouteComponent() {
  // 통합된 ref 객체로 관리
  const tabRefs = useRef<Record<string, TabFormRef | null>>({
    a: null, // BasicInfo
    b: null, // CourseRegistration
  });

  const [activeTab, setActiveTab] = React.useState('c');

  // 모든 탭의 폼 데이터를 하나의 객체로 관리
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  const handleListClick = () => {
    console.log('handleExportCourse');
  };

  const handleDeleteClick = () => {
    console.log('handleImportCourse');
  };

  const handleSaveClick = async () => {
    console.log('data {} => ');

    // 활성화된 탭의 유효성 검사 수행
    const currentRef = tabRefs.current[activeTab];
    if (currentRef) {
      const result = await currentRef.validate();

      if (result.isValid) {
        console.log(`${activeTab} 탭 유효성 검사 통과:`, result.data);
        setFormData((prev) => ({ ...prev, ...result.data }));
        // 여기서 저장 로직을 실행
        console.log('저장할 데이터:', result.data);
        // API 호출 등 저장 로직
      } else {
        console.log(`${activeTab} 탭 유효성 검사 실패:`, result.errors);
        // 에러 처리 로직
      }
    } else {
      console.log('해당 탭은 아직 구현되지 않았습니다.');
    }
  };

  const handleTabChange = (activeKey: string) => {
    console.log('activeKey', activeKey);
    setActiveTab(activeKey);
  };

  const tabItems = useMemo(
    () => [
      {
        title: '기본정보 설정',
        key: 'a',
        content: <BasicInfo ref={(ref) => (tabRefs.current.a = ref)} initialData={formData} />,
      },
      {
        title: '수강신청 설정',
        key: 'b',
        content: (
          <CourseRegistration ref={(ref) => (tabRefs.current.b = ref)} initialData={formData} />
        ),
      },
      {
        title: '커리큘럼 설정',
        key: 'c',
        content: <Curriculum ref={(ref) => (tabRefs.current.c = ref)} initialData={formData} />,
      },
      {
        title: '상세 설정',
        key: 'd',
        content: <DetailInfo ref={(ref) => (tabRefs.current.d = ref)} initialData={formData} />,
      },
      {
        title: '강의 설정',
        key: 'e',
        content: <PublishCourse ref={(ref) => (tabRefs.current.e = ref)} initialData={formData} />,
      },
    ],
    [formData],
  );

  return (
    <form>
      <PageContainer>
        <ContentsButtons>
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
