/* eslint-disable import/first */
import { Tabs } from '@learnway/ui/tabs';
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';

export const Route = createFileRoute('/_layout/pms/menu-tenant-user-management')({
  component: RouteComponent,
});

/* tab contents */
import { TenantMemberApply } from './-tabcontents/tenant-member-apply'; // 회원가입 신청
import { TenantUser } from './-tabcontents/tenant-user'; // 유저

function RouteComponent() {
  const items = [
    {
      title: '유저',
      key: 'a',
      content: <TenantUser />,
    },
    {
      title: '회원가입 신청',
      key: 'b',
      content: <TenantMemberApply />,
    },
  ];
  return (
    <form className="form_row">
      <PageContainer hideOutLine={true}>
        <Tabs items={items} type="fill" className={'page_tabs'} showContentBorder={true} />
      </PageContainer>
    </form>
  );
}
