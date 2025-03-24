import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { IntegratedSearchButton } from '../../../features/layout';

import styles from '@learnway/styles/fo/pages/_layout/integrated-search/integrated-search_m.module.css';

export const Route = createFileRoute('/_layout/integrated-search/integrated-search_m')({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeButton, setActiveButton] = useState<number>(1);
  const tabButton = {
    items: [
      { title: '전체', count: '0' },
      { title: '과정', count: '5,000' },
      { title: '숏츠', count: '10' },
      { title: '채널', count: '0' },
      { title: '러닝랩', count: '0' },
      { title: '지식공유', count: '0' },
      { title: '코칭', count: '200' },
    ],
    // initialSelectedButton: 0, // 초기값
  };

  return (
    <div className={`${styles.start} ${styles.integrated}`}>
      <IntegratedSearchButton
        tabButton={tabButton}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
    </div>
  );
}
