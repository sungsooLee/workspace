/* eslint-disable @nx/enforce-module-boundaries */
import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '../../../widgets/layout/ui/container/page-container';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '../../../../../../bo/src/shared/ui/form';
import { Tabs } from '@learnway/ui';

/* styles */
import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';

/* tab contents */
import { TenantUserInfo } from './-tabcontents/tenant-user-info';

export const Route = createFileRoute('/_layout/pms/menu-tenant-user-education')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: '유저 정보',
      key: 'a',
      content: <TenantUserInfo />,
    },
    {
      title: '교육 이력',
      key: 'b',
      content: <TenantUserInfo />,
    },
    {
      title: '플랫폼 이용 이력',
      key: 'c',
      content: <TenantUserInfo />,
    },
    {
      title: '로그인 이력',
      key: 'd',
      content: <TenantUserInfo />,
    },
  ];
  return (
    <PageContainer>
      {/* main_contents */}
      <div className={styles.main_contents}>
        <FormSubTitle label={'유저 정보'} noLine />
        <div className={cn(tableStyles.start, tableStyles.wrap)}>
          <table>
            <caption>{'기본정보'}</caption>
            <colgroup>
              <col style={{ width: '240px' }} />
              <col />
              <col style={{ width: '240px' }} />
              <col />
              <col style={{ width: '240px' }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope={'row'}>{'회원유형'}</th>
                <td>{'연동회원'}</td>
                <th scope={'row'}>{'이름'}</th>
                <td>{'김현대'}</td>
                <th scope={'row'}>{'사번'}</th>
                <td>{'1234567'}</td>
              </tr>
              <tr>
                <th scope={'row'}>{'회원가입일'}</th>
                <td>{'2025-01-01 14:25:11'}</td>
                <th scope={'row'}>{'최근 접속일'}</th>
                <td colSpan={3}>{'2025-01-01 14:25:11'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Tabs items={items} type="line" size={'sm'} />
      </div>
    </PageContainer>
  );
}
