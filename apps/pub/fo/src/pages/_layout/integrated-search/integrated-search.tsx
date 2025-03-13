import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Tabs } from '@learnway/ui';
import { IntegratedSearchProcedure } from '../../../features/layout/ui/integrated-search-procedure'; // 과정
import { IntegratedSearchShorts } from '../../../features/layout/ui/integrated-search-shorts'; // 숏츠
import { IntegratedSearchChannel } from '../../../features/layout/ui/integrated-search-channel'; // 채널
import { IntegratedSearchRunning } from '../../../features/layout/ui/integrated-search-running'; // 러닝랩
import { IntegratedSearchKnowledge } from '../../../features/layout/ui/integrated-search-knowledge'; // 지식공유
import { IntegratedSearchCoaching } from '../../../features/layout/ui/integrated-search-coaching'; // 코칭

import styles from '@learnway/styles/fo/pages/_layout/integrated-search/integrated-search.module.css';

export const Route = createFileRoute('/_layout/integrated-search/integrated-search')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedTabKey, selectedTabKey2] = useState<string>('a');
  const items = [
    {
      title: '전체',
      key: 'a',
      count: true,
      number: '5',
      content: (
        <div className={styles.tab01}>
          <div className={styles.result_txt_box}>
            <div className={styles.result_txt}>
              <p>
                <strong>"파이씬"</strong> 검색결과
              </p>
            </div>

            <div className={styles.proposal_txt}>
              <strong>제안</strong>
              <p>"파이씬" 로 검색한 결과입니다.</p>
              <Link to="">'파이썬' 검색결과 보기</Link>
            </div>
          </div>

          {/* 과정 */}
          <IntegratedSearchProcedure />
        </div>
      ),
    },
    {
      title: '과정',
      key: 'b',
      count: true,
      number: '5',
      content: (
        <div className={styles.tab01}>
          <div className={styles.result_txt_box}>
            <div className={styles.result_txt}>
              <p>
                <strong>"파이씬"</strong> 검색결과
              </p>
            </div>

            <div className={styles.proposal_txt}>
              <strong>제안</strong>
              <p>"파이씬" 로 검색한 결과입니다.</p>
              <Link to="">'파이썬' 검색결과 보기</Link>
            </div>
          </div>

          {/* 과정 */}
          <IntegratedSearchProcedure />
        </div>
      ),
    },
    {
      title: '숏츠',
      key: 'c',
      count: true,
      number: '5',
      content: (
        <div className={styles.tab01}>
          <div className={styles.result_txt_box}>
            <div className={styles.result_txt}>
              <p>
                <strong>"파이씬"</strong> 검색결과
              </p>
            </div>

            <div className={styles.proposal_txt}>
              <strong>제안</strong>
              <p>"파이씬" 로 검색한 결과입니다.</p>
              <Link to="">'파이썬' 검색결과 보기</Link>
            </div>
          </div>

          {/* 숏츠 */}
          <IntegratedSearchShorts />
        </div>
      ),
    },
    {
      title: '채널',
      key: 'd',
      count: true,
      number: '5',
      content: (
        <div className={styles.tab01}>
          <div className={styles.result_txt_box}>
            <div className={styles.result_txt}>
              <p>
                <strong>"파이씬"</strong> 검색결과
              </p>
            </div>

            <div className={styles.proposal_txt}>
              <strong>제안</strong>
              <p>"파이씬" 로 검색한 결과입니다.</p>
              <Link to="">'파이썬' 검색결과 보기</Link>
            </div>
          </div>

          {/* 채널 */}
          <IntegratedSearchChannel />
        </div>
      ),
    },
    {
      title: '러닝랩',
      key: 'e',
      count: true,
      number: '5',
      content: (
        <div className={styles.tab01}>
          <div className={styles.result_txt_box}>
            <div className={styles.result_txt}>
              <p>
                <strong>"파이씬"</strong> 검색결과
              </p>
            </div>

            <div className={styles.proposal_txt}>
              <strong>제안</strong>
              <p>"파이씬" 로 검색한 결과입니다.</p>
              <Link to="">'파이썬' 검색결과 보기</Link>
            </div>
          </div>

          {/* 러닝랩 */}
          <IntegratedSearchRunning />
        </div>
      ),
    },
    {
      title: '지식공유',
      key: 'f',
      count: true,
      number: '5',
      content: (
        <div className={styles.tab01}>
          <div className={styles.result_txt_box}>
            <div className={styles.result_txt}>
              <p>
                <strong>"파이씬"</strong> 검색결과
              </p>
            </div>

            <div className={styles.proposal_txt}>
              <strong>제안</strong>
              <p>"파이씬" 로 검색한 결과입니다.</p>
              <Link to="">'파이썬' 검색결과 보기</Link>
            </div>
          </div>

          {/* 지식공유 */}
          <IntegratedSearchKnowledge />
        </div>
      ),
    },
    {
      title: '코칭',
      key: 'g',
      count: true,
      number: '5',
      content: (
        <div className={styles.tab01}>
          <div className={styles.result_txt_box}>
            <div className={styles.result_txt}>
              <p>
                <strong>"파이씬"</strong> 검색결과
              </p>
            </div>

            <div className={styles.proposal_txt}>
              <strong>제안</strong>
              <p>"파이씬" 로 검색한 결과입니다.</p>
              <Link to="">'파이썬' 검색결과 보기</Link>
            </div>
          </div>

          {/* 코칭 */}
          <IntegratedSearchCoaching />
        </div>
      ),
    },
  ];

  return (
    <div className={`${styles.start} ${styles.integrated}`}>
      <Tabs selectedTabKey={selectedTabKey} items={items} type="line" />
    </div>
  );
}
