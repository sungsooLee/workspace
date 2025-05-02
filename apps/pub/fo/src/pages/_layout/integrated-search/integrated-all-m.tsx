import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import {
  IntegratedSearchButton,
  IntegratedSearchProcedure,
  IntegratedSearchShorts,
  IntegratedSearchChannel,
  IntegratedSearchRunning,
  IntegratedSearchKnowledge,
  IntegratedSearchCoaching,
} from '../../../features/layout';

import styles from './integrated-all-m.module.css';

export const Route = createFileRoute('/_layout/integrated-search/integrated-all-m')({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeButton, setActiveButton] = useState<number>(0);
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
  };

  return (
    <div className={`${styles.start} ${styles.integrated}`}>
      <IntegratedSearchButton
        tabButton={tabButton}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />

      <div className={styles.classify_wrap}>
        <div className={styles.result_txt_box}>
          {/* 제안 검색결과 보기 */}
          <div className={styles.proposal_txt}>
            <strong>제안</strong>
            <div>
              <p>
                "파이씬" 로 검색한 결과입니다.
                <br />
                <Link to="">'파이썬' 검색결과 보기</Link>
              </p>
            </div>
          </div>

          {/* 입력 데이터 검색결과 보기 */}
          <div className={styles.result_txt}>
            <p className={styles.txt}>"파이썬" 검색결과</p>
            <p className={styles.txt2}>"파이썬" 검색어를 찾으셨습니까?</p>
            <Link to="">'파이썬'</Link>
          </div>
        </div>
      </div>

      <div className={styles.result_wrap}>
        {/* 과정 컨텐츠 */}
        <IntegratedSearchProcedure />

        {/* 숏츠 컨텐츠 */}
        <IntegratedSearchShorts />

        {/* 채널 컨텐츠 */}
        <IntegratedSearchChannel />

        {/* 러닝랩 컨텐츠 */}
        <IntegratedSearchRunning />

        {/* 지식공유 컨텐츠 */}
        <IntegratedSearchKnowledge />

        {/* 코칭 컨텐츠 */}
        <IntegratedSearchCoaching />
      </div>
    </div>
  );
}
