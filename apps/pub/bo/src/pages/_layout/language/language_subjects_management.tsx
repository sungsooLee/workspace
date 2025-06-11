/* eslint-disable import/first */

import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Tabs } from '@learnway/ui';

export const Route = createFileRoute('/_layout/language/language_subjects_management')({
  component: RouteComponent,
});

/* tab contents */
import { TestLists } from './-tabcontents/test-lists'; // 어학시험 과목 목록
import { RegistrationApplyStatus } from './-tabcontents/registration-apply-status'; // 등록신청 현황

function RouteComponent() {
  const items = [
    {
      title: '어학시험 과목 목록',
      key: 'a',
      content: <TestLists />,
    },
    {
      title: '등록신청 현황',
      key: 'b',
      content: <RegistrationApplyStatus />,
    },
  ];
  return (
    <form className="form_row">
      <PageContainer>
        <Tabs items={items} type={'line'} size={'sm'} />
      </PageContainer>
    </form>
  );
}
