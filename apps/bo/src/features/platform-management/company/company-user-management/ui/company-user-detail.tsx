import { FC, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { Tabs } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { FormSubTitle } from '@shared/ui';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';

import {
  CompanyUserDetailLearningHistory,
  CompanyUserDetailBase,
} from '@features/platform-management/company';
import { useFetchUser } from '@entities/users/service/users.hook';

enum EnCompanyUserTab {
  userInfo = 'usrInfo',
  learningHistory = 'learningHistory',
  platformHistory = 'platformHistory',
  loginHistory = 'loginHistory',
}

const CompanyUserDetailComponent: FC<any> = () => {
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
      title: t('유저 정보'),
      key: EnCompanyUserTab.userInfo,
      content: <CompanyUserDetailBase userInfo={userInfo} />,
    },
    {
      title: t('교육 이력'),
      key: EnCompanyUserTab.learningHistory,
      content: <CompanyUserDetailLearningHistory />,
    },
    {
      title: t('플랫폼 이용 이력'),
      key: EnCompanyUserTab.platformHistory,
      content: '플랫폼 이용 이력',
    },
    {
      title: t('로그인 이력'),
      key: EnCompanyUserTab.loginHistory,
      content: '로그인 이력',
    },
  ];

  return (
    <>
      <FormSubTitle label={t('유저정보')} noLine />
      <div className={cn(tableStyles.start, tableStyles.wrap, 'pb-10')}>
        <table>
          <caption>{t('유저정보')}</caption>
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
              <th scope={'row'}>{t('회원가입일')}</th>
              <td>{userInfo?.createdDate}</td>
              <th scope={'row'}>{t('최근 접속일')}</th>
              <td colSpan={3}>{userInfo?.lastLoginDate}</td>
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
