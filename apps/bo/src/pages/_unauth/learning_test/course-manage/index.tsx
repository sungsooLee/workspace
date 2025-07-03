import React from 'react';
import { Button, Tabs } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_unauth/learning_test/course-manage/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  const items = [
    {
      title: '기본 정보',
      key: 'a',
      content: <h1>가본 정보 a</h1>,
    },
    {
      title: '화면/사용 설정',
      key: 'b',
      content: <h1>가본 정보 b</h1>,
    },
    {
      title: '기본 정보',
      key: 'c',
      content: <h1>가본 정보 c</h1>,
    },
    {
      title: '기본 정보',
      key: 'd',
      content: <h1>가본 정보 d</h1>,
    },
  ];

  return (
    <PageContainer hideOutLine>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" label={t('LABEL.button.courseOpen')} />
      </ContentsButtons>
      <MainContents>
        <Tabs items={items} type="fill" showContentBorder />
      </MainContents>
    </PageContainer>
  );
}
