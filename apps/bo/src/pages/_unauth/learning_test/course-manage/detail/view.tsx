import React, { useRef } from 'react';
import { Button, Tabs } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { BasicInfo } from '../-components/basic-info/basic-info';
import { CourseRegistration } from '../-components/course-registration/course-registration';
import { formConfig as formConfigBasic } from '../-components/basic-info/form-config';
import { formConfig as formConfigCourse } from '../-components/course-registration/form-config';

export const Route = createFileRoute('/_unauth/learning_test/course-manage/detail/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const dynamicForm = useDynamicForm(formConfig);
  const { provider, onSubmit, control, getValues } = dynamicForm;
  // const { provider, onSubmit, control, getValues } = useDynamicForm(formConfig);

  const BasicInfoRef = useRef<HTMLDivElement>(null);
  const CourseRegistrationRef = useRef<HTMLDivElement>(null);

  const handleImport = () => {
    console.log('handleImportCourse');
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

  const handleValidate = (data: any) => {
    console.log('data {} => ', data);
  };

  const handleTabChange = (activeKey: string) => {
    console.log('activeKey', activeKey);
    const targetRef =
      activeKey === 'a' ? BasicInfoRef : activeKey === 'b' ? CourseRegistrationRef : null;
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // 기본정보
    // if (activeKey === 'a') {
    //   setFormConfig(formConfigBasic);
    // }
    // // 수강신청 설정
    // else if (activeKey === 'b') {
  };

  const tabItems = [
    {
      title: '기본정보',
      key: 'a',
    },
    {
      title: '수강신청 설정',
      key: 'b',
    },
    {
      title: '커리큘럼 설정',
      key: 'c',
    },
    {
      title: '상세정보 설정',
      key: 'd',
    },
    {
      title: '강의 게시 설정',
      key: 'e',
    },
  ];

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          type="button"
          variant="point"
          size="sm"
          label={'과정 가져오기'}
          onClick={handleImport}
        />
        <Button type="button" variant="point" size="sm" label={'과정 복사'} onClick={handleCopy} />
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
        <Tabs type={'sub-progress'} size={'md'} items={tabItems} onTabChange={handleTabChange} />
        {/*기본정보*/}
        <BasicInfo ref={BasicInfoRef} dynamicForm={dynamicForm} />
        {/*수강신청 설정*/}
        <CourseRegistration ref={CourseRegistrationRef} dynamicForm={dynamicForm} />
      </MainContents>
    </PageContainer>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    ...formConfigBasic.builders, // 기본정보
    ...formConfigCourse.builders, // 수강신청 설정
  ],
};
