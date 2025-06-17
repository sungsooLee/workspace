import { useState, useEffect } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { t } from 'i18next';
import { PageContainer, ContentsButtons, MainContents } from '@widgets/layout';
import { Button, TableBox, Tabs } from '@learnway/ui';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { formUtils } from '@entities/form-utils';
import { FormSubTitle } from '@shared/ui';

import { CompanyUserDetailBase } from '@features/platform/company/ui/company-user-detail-base';
import { CompanyUserDetailLearningHistory } from '@features/platform/company/ui/company-user-detail-learning-history';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';

export const Route = createFileRoute('/_layout/platform/company/user/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const [selectedTabKey, setSelectedTabKey] = useState<string>('userInfo');

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const tabItems = [
    {
      title: '유저 정보',
      key: 'userInfo',
      content: <CompanyUserDetailBase />,
    },
    {
      title: '교육 이력',
      key: 'learningHistory',
      content: <CompanyUserDetailLearningHistory />,
    },
    {
      title: '플랫폼 이용 이력',
      key: 'platformHistory',
      content: '플랫폼 이용 이력',
    },
    {
      title: '로그인 이력',
      key: 'loginHistory',
      content: '로그인 이력',
    },
  ];

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            variant="point"
            size="sm"
            onClick={() => router.navigate({ to: '/platform/company/user' })}
          >
            {t('LABEL.button.list')}
          </Button>
        </LinkBox>
        <Button variant="point" size="sm">
          {t('LABEL.button.reset')}
        </Button>
        <Button type="submit" variant="primary" size="sm">
          {t('LABEL.button.save')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <FormSubTitle label={'유저정보'} />
        <div className={cn(tableStyles.start, tableStyles.wrap, 'pb-10')}>
          <table>
            <caption>{'유저정보'}</caption>
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
                <th scope={'row'}>{'회원 유형'}</th>
                <td>{'GIM'}</td>
                <th scope={'row'}>{'이름'}</th>
                <td>{'김현대'}</td>
                <th scope={'row'}>{'사번'}</th>
                <td>{'1234567'}</td>
              </tr>
              <tr>
                <th scope={'row'}>{'회원가입일'}</th>
                <td>{'2025-01-01 14:25:11'}</td>
                <th scope={'row'}>{'최근 접속일'}</th>
                <td>{'2025-01-01 14:25:11'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Tabs
          items={tabItems}
          type="line"
          size={'sm'}
          className={styles.tab_wrap}
          selectedTabKey={selectedTabKey}
          onTabChange={handleTabChange}
        />
      </MainContents>
    </PageContainer>
  );
}
