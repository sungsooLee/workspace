import { createFileRoute } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import React, { useState } from 'react';
import { Tabs } from '@learnway/ui';
import styles from './edu-licenses-list.module.css';
import { LicensesHistory } from '../../../features/layout/';

export const Route = createFileRoute('/_layout/edu-support/edu-licenses-list')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedTabKey] = useState<string>('');
  const items = [
    {
      title: '자격증 취득 이력',
      key: 'a',
      content: <LicensesHistory />,
    },
    {
      title: '응시료 지원 신청',
      key: 'b',
      content: <h2>Tab B content</h2>,
    },
  ];
  return (
    <div className={styles.start}>
      <Tabs selectedTabKey={selectedTabKey} items={items} type="line" />
    </div>
  );
}
