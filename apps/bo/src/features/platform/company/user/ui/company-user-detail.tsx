import { FC, useState, useEffect } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';

import { Button, TableBox, Tabs } from '@learnway/ui';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';

import { FormSubTitle } from '@shared/ui';

import {
  CompanyUserDetailLearningHistory,
  CompanyUserDetailBase,
} from '@features/platform/company';
import { useFetchUser } from '@entities/users/service/users.hook';

enum EnCompanyUserTab {
  userInfo = 'usrInfo',
  learningHistory = 'learningHistory',
  platformHistory = 'platformHistory',
  loginHistory = 'loginHistory',
}

const CompanyUserDetailComponent: FC<any> = () => {
  const router = useRouter();
  const routerState = useRouterState();

  const userUuid = routerState.location.state.userUuid;
  const { data: userInfo } = useFetchUser(userUuid);

  const [selectedTabKey, setSelectedTabKey] = useState<string>(EnCompanyUserTab.userInfo);

  const handleTabChange = (tabKey: string) => {
    if (tabKey !== selectedTabKey) {
      setSelectedTabKey(tabKey);
    }
  };

  const tabItems = [
    {
      title: '유저 정보',
      key: EnCompanyUserTab.userInfo,
      content: <CompanyUserDetailBase userInfo={userInfo} />,
    },
    {
      title: '교육 이력',
      key: EnCompanyUserTab.learningHistory,
      content: <CompanyUserDetailLearningHistory />,
    },
    {
      title: '플랫폼 이용 이력',
      key: EnCompanyUserTab.platformHistory,
      content: '플랫폼 이용 이력',
    },
    {
      title: '로그인 이력',
      key: EnCompanyUserTab.loginHistory,
      content: '로그인 이력',
    },
  ];

  return (
    <>
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
              <th scope="row">{t('회원 유형')}</th>
              <td>{userInfo?.accountType}</td>
              <th scope="row">{t('이름')}</th>
              <td>{userInfo?.name}</td>
              <th scope="row">{t('사번')}</th>
              <td>{userInfo?.employeeNumber}</td>
            </tr>
            <tr>
              <th scope={'row'}>{'회원가입일'}</th>
              <td>{userInfo?.createdDate}</td>
              <th scope={'row'}>{'최근 접속일'}</th>
              <td>{userInfo?.lastLoginDate}</td>
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
    </>
  );
};

export const CompanyUserDetail = CompanyUserDetailComponent;
