import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Tabs, Select, Button } from '@learnway/ui';
import { IcoArray, IcoDotpoints } from '@learnway/icons';
import {
  Arrays,
  IntegratedSearchProcedure,
  IntegratedSearchShorts,
  IntegratedSearchChannel,
  IntegratedSearchRunning,
  IntegratedSearchKnowledge,
  IntegratedSearchCoaching,
} from '../../../features/layout';

import styles from '@learnway/styles/fo/pages/_layout/integrated-search/integrated-search.module.css';

export const Route = createFileRoute('/_layout/integrated-search/integrated-search')({
  component: RouteComponent,
});

function RouteComponent() {
  // 과정 탭 list (가로형, 세로형) 변경
  const [listUi, setListUi] = useState('vertical');
  const list_ui = () => {
    if (listUi === 'vertical') {
      setListUi('horizontal'); // 가로형
    } else {
      setListUi('vertical'); // 세로형
    }
  };

  // 과정 탭 소팅 필터
  const arrays = {
    items: ['정확도순', '최신순'],
    initialSelectedItem: 0, // 초기 선택값
  };

  const [selectedTabKey, selectedTabKey2] = useState<string>('a');
  const items = [
    {
      title: '전체',
      key: 'a',
      count: true,
      number: '5',
      content: (
        <div className={styles.tab_all}>
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
          {/* 숏츠 */}
          <IntegratedSearchShorts />
          {/* 채널 */}
          <IntegratedSearchChannel />
          {/* 러닝랩 */}
          <IntegratedSearchRunning />
          {/* 지식공유 */}
          <IntegratedSearchKnowledge />
          {/* 코칭 */}
          <IntegratedSearchCoaching />
        </div>
      ),
    },
    {
      title: '과정',
      key: 'b',
      count: true,
      number: '5',
      content: (
        <div className={styles.tab_procedure}>
          <div className={styles.result_txt_box}>
            <div className={styles.result_txt}>
              <p>
                <strong>"파이씬"</strong> 검색결과
              </p>
            </div>
            <div className={styles.classify}>
              <Arrays arraysData={arrays}></Arrays>
              <div className={styles.box}>
                <Select
                  options={[
                    { value: '20', label: '20개씩' },
                    { value: '50', label: '50개씩' },
                    { value: '80', label: '80개씩' },
                  ]}
                />
              </div>
              <div className={styles.box}>
                <Button onClick={list_ui}>
                  {listUi === 'horizontal' ? (
                    <IcoArray width={24} height={24} stroke="#4c515e" fill="none" />
                  ) : (
                    <IcoDotpoints width={24} height={24} stroke="#4c515e" fill="none" />
                  )}
                </Button>
              </div>
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
        <div className={styles.tab_shorts}>
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
        <div className={styles.tab_channel}>
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
        <div className={styles.tab_running}>
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
        <div className={styles.tab_knowledge}>
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
        <div className={styles.tab_coaching}>
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
