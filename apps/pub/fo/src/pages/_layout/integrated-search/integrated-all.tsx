import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import { Button } from '@learnway/ui';
import {
  IntegratedSearchProcedure,
  IntegratedSearchShorts,
  IntegratedSearchChannel,
  IntegratedSearchRunning,
  IntegratedSearchKnowledge,
  IntegratedSearchCoaching,
  IntegratedSearchButton,
} from '../../../features/layout';

import styles from './integrated-all.module.css';

import ImgNotice from '@learnway/styles/fo/assets/images/thumb/img_notice_01.png';

export const Route = createFileRoute('/_layout/integrated-search/integrated-all')({
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
  const [selectedValues, setSelectedValues] = useState<string[]>(['20개씩']);
  const arrays = {
    items: ['정확도순', '최신순'],
    initialSelectedItem: 0, // 초기 선택값
  };

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
      <div className={styles.tab_wrap}>
        {/* tab button */}
        <IntegratedSearchButton
          tabButton={tabButton}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />

        <div className={styles.classify_wrap}>
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
        </div>

        {/* result content */}
        <div className={styles.result_wrap}>
          {/* 과정 컨텐츠 */}
          <div>
            <IntegratedSearchProcedure />
          </div>

          {/* 숏츠 컨텐츠 */}
          <div>
            <IntegratedSearchShorts />
          </div>

          {/* 채널 컨텐츠 */}
          <div>
            <IntegratedSearchChannel />
          </div>

          {/* 러닝랩 컨텐츠 */}
          <div>
            <IntegratedSearchRunning />
          </div>

          {/* 지식공유 컨텐츠 */}
          <div>
            <IntegratedSearchKnowledge />
          </div>

          {/* 코칭 컨텐츠 */}
          <div>
            <IntegratedSearchCoaching />
          </div>
        </div>

        {/* 안내영역 */}
        <div className={styles.notice}>
          <img src={ImgNotice} alt="" />
          <div className={styles.txt_box}>
            <strong>“파이썬” 관련해 만족할 만한 결과를 찾지 못하셨나요?</strong>
            <p>필요한 교육 과정이나 채널이 있다면 요청해 주세요.</p>
          </div>
          <div className={styles.btn_box}>
            <Button variant="gray" size="lg">
              교육 요청
            </Button>
            <Button variant="gray" size="lg">
              채널 요청
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
