import { Tabs, TreeBox, TreeNode } from '@learnway/ui';
import { useState } from 'react';

import styles from '@learnway/styles/bo/assets/styles/modules/page-contents.module.css';
import { Role } from './role';
import { RoleMenu } from './role-menu';
import { RoleGrant } from './role-grant';

const TAB_KEYS = {
  FO_ROLE: '학습자 역할정보',
  FO_MENU: '학습자 메뉴설정',
  FO_ROLEGRANT: '학습자 역할부여',
  BO_ROLE: 'HRD센터 역할정보',
  BO_MENU: 'HRD센터 메뉴설정',
  BO_ROLEGRANT: 'HRD센터 역할부여',
} as const;

type TabKeyName = keyof typeof TAB_KEYS;

const items = [
  {
    title: TAB_KEYS.FO_ROLE,
    key: 'FO_ROLE',
    content: <Role type={'FO'} />,
  },
  {
    title: TAB_KEYS.FO_MENU,
    key: 'FO_MENU',
    content: <RoleMenu type={'FO'} />,
  },
  {
    title: TAB_KEYS.FO_ROLEGRANT,
    key: 'FO_ROLEGRANT',
    content: <RoleGrant type={'FO'} />,
  },
  {
    title: TAB_KEYS.BO_ROLE,
    key: 'BO_ROLE',
    content: '4',
  },
  {
    title: TAB_KEYS.BO_MENU,
    key: 'BO_MENU',
    content: '5',
  },
  {
    title: TAB_KEYS.BO_ROLEGRANT,
    key: 'BO_ROLEGRANT',
    content: '6',
  },
];

const RoleInfoComponent = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<TabKeyName>('FO_ROLE');

  return (
    <Tabs selectedTabKey={selectedTabKey} type="line" items={items} className={styles.tab_wrap} />
  );
};

export const RoleInfo = RoleInfoComponent;
