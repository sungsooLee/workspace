import React, { useMemo } from 'react';
import { Button, Tabs } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { BasicInfo } from '../-components/basic-info/basic-info';
import { formConfig as formConfigBasic } from '../-components/basic-info/form-config';
import { CourseRegistration } from '../-components/course-registration/course-registration';

export const Route = createFileRoute('/_unauth/learning_test/course/create/view')({
  component: RouteComponent,
});

function RouteComponent() {
  // const [formConfig, setFormConfig] = useState<DynamicFormConfig>(formConfigBasic);
  const dynamicForm = useDynamicForm(formConfig);
  const { provider, onSubmit, control, getValues, fetchData } = dynamicForm; //useDynamicForm(formConfig);

  const handleListClick = () => {
    console.log('handleExportCourse');
  };

  const handleDeleteClick = () => {
    console.log('handleImportCourse');
    console.log('getValues', getValues());
  };

  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleTabChange = (activeKey: string) => {
    console.log('activeKey', activeKey);
    // 기본정보
    if (activeKey === 'a') {
      // setFormConfig(formConfigBasic);
    }
    // 수강신청 설정
    else if (activeKey === 'b') {
      // setFormConfig(formConfigCourse);
    }
  };

  const tabItems = useMemo(
    () => [
      {
        title: '기본정보 설정',
        key: 'a',
        content: <BasicInfo dynamicForm={dynamicForm} />,
      },
      {
        title: '수강신청 설정',
        key: 'b',
        content: <CourseRegistration dynamicForm={dynamicForm} />,
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
    [],
  );

  return (
    <form onSubmit={onSubmit(handleOnSubmit)}>
      <PageContainer>
        <ContentsButtons>
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'목록'}
            onClick={handleListClick}
          />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'삭제'}
            onClick={handleDeleteClick}
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            label={'저장'}
            onClick={handleOnSubmit}
          />
        </ContentsButtons>
        <MainContents>
          <Tabs type={'progress'} size={'sm'} items={tabItems} onTabChange={handleTabChange} />
        </MainContents>
      </PageContainer>
    </form>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    ...formConfigBasic.builders, // 기본정보
    // ...formConfigCourse.builders, // 수강신청 설정
  ],
};
