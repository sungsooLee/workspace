/* eslint-disable import/first */
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { Tabs } from '@learnway/ui';

export const Route = createFileRoute('/_layout/pms/menu-tenant-user-management')({
  component: RouteComponent,
});

/* tab contents */
import { TenantUser } from './-tabcontents/tenant-user'; // 유저
import { TenantMemberApply } from './-tabcontents/tenant-member-apply'; // 회원가입 신청

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
