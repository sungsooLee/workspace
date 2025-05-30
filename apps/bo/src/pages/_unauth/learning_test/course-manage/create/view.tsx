import React, { useMemo } from 'react';
import { Button, StepperTabs } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { BasicInfo } from '../-components/basic-info/basic-info';
import { formConfig as formConfigBasic } from '../-components/basic-info/form-config';
import { CourseRegistration } from '../-components/course-registration/course-registration';
import { formConfig as formConfigCourse } from '../-components/course-registration/form-config';

export const Route = createFileRoute('/_unauth/learning_test/course-manage/create/view')({
  component: RouteComponent,
});

function RouteComponent() {
  // const [formConfig, setFormConfig] = useState<DynamicFormConfig>(formConfigBasic);
  const dynamicForm = useDynamicForm(formConfig);
  const { provider, onSubmit, control, getValues, fetchData } = dynamicForm; //useDynamicForm(formConfig);

  const [test, setTest] = React.useState<any>('');

  const handleImport = () => {
    console.log('handleImportCourse');
    setTest((state: any) => state + '.');
  };

  const handleCopy = () => {
    console.log('handleCopyCourse');
  };

  const handleExport = () => {
    console.log('handleExportCourse');
  };

  const handlePreview = () => {
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
        title: '기본정보',
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
        title: '상세정보 설정',
        key: 'd',
        content: <h2>Tab C content</h2>,
      },
      {
        title: '강의 게시 설정',
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
            label={'과정 가져오기'}
            onClick={handleImport}
          />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'과정 복사'}
            onClick={handleCopy}
          />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'과정 내보내기'}
            onClick={handleExport}
          />
          <Button
            type="button"
            variant="point"
            size="sm"
            label={'미리보기'}
            onClick={handlePreview}
          />
          <Button type="submit" variant="primary" size="sm" label={'저장'} />
        </ContentsButtons>
        <MainContents>
          <StepperTabs
            type={'sub-progress'}
            size={'md'}
            items={tabItems}
            onTabChange={handleTabChange}
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
