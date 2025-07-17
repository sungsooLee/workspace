import { useFetchUser } from '@entities/users/service/users.hook';
import {
  CompanyUserDetailBase,
  CompanyUserDetailLearningHistory,
} from '@features/platform-management/company';
import { cn, DATE_TIME_FORMAT, getDateToString } from '@learnway/shared';
import { FormSubTitle, Tabs } from '@learnway/ui';
import { useRouterState } from '@tanstack/react-router';
import { EnGlobalConst } from '@types';
import { t } from 'i18next';
import { useState } from 'react';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import tableStyles from '@learnway/styles/bo/assets/styles/modules/table.module.css';

enum EnCompanyUserTab {
  userInfo = 'usrInfo',
  learningHistory = 'learningHistory',
  platformHistory = 'platformHistory',
  loginHistory = 'loginHistory',
}

const CompanyUserDetailComponent = ({ formRef }: { formRef: any }) => {
  const routerState = useRouterState();

  const userUuid = routerState.location.state.userUuid;
  const { data: user } = useFetchUser(userUuid);
  console.log('### user', user);

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
      content: <CompanyUserDetailBase ref={formRef} userInfo={user} />,
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
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">{t('회원 유형')}</th>
              <td>
                {user?.linkageSystem
                  ? t(
                      `${EnGlobalConst.SYSTEM_COMMON_CODE}.pms.company.LinkageSystem.${user.linkageSystem}`,
                    )
                  : '-'}
              </td>
              <th scope="row">{t('이름')}</th>
              <td>{user?.name}</td>
              <th scope="row">{t('사번')}</th>
              <td>{user?.employeeNumber}</td>
            </tr>
            <tr>
              <th scope={'row'}>{t('회원가입일')}</th>
              <td>
                {user?.linkageSystem === null
                  ? user?.createdDate
                    ? getDateToString(new Date(user?.createdDate), DATE_TIME_FORMAT.DATETIME_SEC)
                    : '-'
                  : user?.joinDate
                    ? getDateToString(new Date(user?.joinDate), DATE_TIME_FORMAT.DATETIME_SEC)
                    : '-'}
              </td>
              <th scope={'row'}>{t('최근 접속일')}</th>
              <td>
                {user?.lastLoginDate
                  ? getDateToString(new Date(user.lastLoginDate), DATE_TIME_FORMAT.DATETIME_SEC)
                  : '-'}
              </td>
              <td></td>
              <td></td>
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
