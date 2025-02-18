import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../widgets/layout/ui/container/slot/contents-buttons';
import { Button, Input } from '@learnway/ui';
import { MainContents } from '../../../widgets/layout/ui/container/slot/main-contents';
import { SubContents } from '../../../widgets/layout/ui/container/slot/sub-contents';
import CourseDetailForm from '../../../widgets/learning/ui/form/course-detail-form';

export const Route = createFileRoute('/_layout/learning/')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleOnSubmit = (data: any) => {
    console.log('data {} => ', data);
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="submit" variant="point" size="sm">
          과정복사
        </Button>
        <Button type={'button'} variant="point" size="sm">
          임시저장
        </Button>
        <Button type={'button'} variant="point" size="sm">
          작성완료
        </Button>
        <Button type={'button'} variant="point" size="sm">
          미리보기
        </Button>
        <Button type={'button'} variant="primary" size="sm">
          게시하기
        </Button>
      </ContentsButtons>
      <MainContents>
        <CourseDetailForm />
      </MainContents>
      <SubContents>
        <h3>Sub</h3>
        <Input />
      </SubContents>
    </PageContainer>
  );
}
