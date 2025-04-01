import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { IcoArrowForward } from '@learnway/icons';
import {
  IntegratedSearchButton,
  IntegratedSearchProcedure,
  IntegratedSearchShorts,
  IntegratedSearchChannel,
  IntegratedSearchRunning,
  IntegratedSearchKnowledge,
  IntegratedSearchCoaching,
} from '../../../features/layout';

import styles from './integrated-search_m.module.css';

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
        <div>
          <div className={styles.tit_box}>
            <strong>과정</strong>
            <Button onClick={() => setActiveButton(1)}>
              과정 더보기
              <IcoArrowForward width={16} height={16} stroke="#131c30" />
            </Button>
          </div>
          <IntegratedSearchProcedure />
        </div>

        <div>
          <div className={styles.tit_box}>
            <strong>숏츠</strong>
            <Button onClick={() => setActiveButton(1)}>
              숏츠 더보기
              <IcoArrowForward width={16} height={16} stroke="#131c30" />
            </Button>
          </div>
          <IntegratedSearchShorts />
        </div>

        <div>
          <div className={styles.tit_box}>
            <strong>채널</strong>
            <Button onClick={() => setActiveButton(1)}>
              채널 더보기
              <IcoArrowForward width={16} height={16} stroke="#131c30" />
            </Button>
          </div>
          <IntegratedSearchChannel />
        </div>

        <div>
          <div className={styles.tit_box}>
            <strong>러닝랩</strong>
            <Button onClick={() => setActiveButton(1)}>
              러닝랩 더보기
              <IcoArrowForward width={16} height={16} stroke="#131c30" />
            </Button>
          </div>
          <IntegratedSearchRunning />
        </div>

        <div>
          <div className={styles.tit_box}>
            <strong>지식공유</strong>
            <Button onClick={() => setActiveButton(1)}>
              지식공유 더보기
              <IcoArrowForward width={16} height={16} stroke="#131c30" />
            </Button>
          </div>
          <IntegratedSearchKnowledge />
        </div>

        <div>
          <div className={styles.tit_box}>
            <strong>코칭</strong>
            <Button onClick={() => setActiveButton(1)}>
              코칭 더보기
              <IcoArrowForward width={16} height={16} stroke="#131c30" />
            </Button>
          </div>
          <IntegratedSearchCoaching />
        </div>
      </div>
    </div>
  );
}
