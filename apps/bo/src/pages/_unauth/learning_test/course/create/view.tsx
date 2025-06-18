import React, { useMemo, useRef } from 'react';
import { Button, Divider, Tabs } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { DynamicFormConfig } from '@learnway/hooks';
import { BasicInfo } from '../-components/basic-info/basic-info';
import { formConfig as formConfigBasic } from '../-components/basic-info/form-config';
import { formConfig as formConfigCourse } from '../-components/course-registration/form-config';
import { CourseRegistration } from '../-components/course-registration/course-registration';
import { TabFormRef } from '../-components/common/tab-form-ref';

export const Route = createFileRoute('/_unauth/learning_test/course/create/view')({
  component: RouteComponent,
});

function RouteComponent() {
  // 통합된 ref 객체로 관리
  const tabRefs = useRef<Record<string, TabFormRef | null>>({
    a: null, // BasicInfo
    b: null, // CourseRegistration
  });

  const [activeTab, setActiveTab] = React.useState('a');

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
        content: <h2>Tab C content</h2>,
      },
      {
        title: '상세 설정',
        key: 'd',
        content: <h2>Tab C content</h2>,
      },
      {
        title: '강의 설정',
        key: 'e',
        content: <h2>Tab C content</h2>,
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

const formConfig: DynamicFormConfig = {
  builders: [
    ...formConfigBasic.builders, // 기본정보
    ...formConfigCourse.builders, // 수강신청 설정
  ],
};
