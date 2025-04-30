import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import { Dropdown, Button, EmptyText } from '@learnway/ui';
import { IcoArray, IcoDotpoints, IcoArrowForward } from '@learnway/icons';
import {
  Arrays,
  Filter,
  IntegratedSearchProcedure,
  IntegratedSearchShorts,
  IntegratedSearchChannel,
  IntegratedSearchRunning,
  IntegratedSearchKnowledge,
  IntegratedSearchCoaching,
  IntegratedSearchButton,
} from '../../../features/layout';

import styles from './integrated-search.module.css';

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
  const [selectedValues, setSelectedValues] = useState<string[]>(['20개씩']);
  const arrays = {
    items: ['정확도순', '최신순'],
    initialSelectedItem: 0, // 초기 선택값
  };

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
      <div className={styles.tab_wrap}>
        {/* tab button */}
        <IntegratedSearchButton
          tabButton={tabButton}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />

        <div className={styles.classify_wrap}>
          <div className={styles.result_txt_box}>
            <div className={styles.filter_box}>
              <Filter></Filter>
            </div>

            <div className={styles.result_txt}>
              <p>
                <strong>"파이씬"</strong> 검색결과
              </p>

              <div className={styles.classify}>
                <Arrays arraysData={arrays}></Arrays>
                <div className={styles.box}>
                  <Dropdown
                    variant="text"
                    options={[
                      { value: '20', label: '20개씩' },
                      { value: '50', label: '50개씩' },
                      { value: '80', label: '80개씩' },
                    ]}
                    value={selectedValues}
                    onChange={(selected) => setSelectedValues(selected)}
                  />
                </div>
                <div className={styles.box}>
                  <Button onClick={list_ui}>
                    {listUi === 'horizontal' ? (
                      <IcoArray width={20} height={20} stroke="#4c515e" fill="none" />
                    ) : (
                      <IcoDotpoints width={20} height={20} stroke="#4c515e" fill="none" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className={styles.proposal_txt}>
              <strong>제안</strong>
              <p>"파이씬" 로 검색한 결과입니다.</p>
              <Link to="">'파이썬' 검색결과 보기</Link>
            </div>
          </div>
        </div>

        {/* 전체 검색결과 없음 */}
        <div className={styles.empty}>
          <EmptyText
            hideTitle
            size="lg"
            description={'검색 결과를 찾을 수 없습니다.'}
            footer={isMobile ? <Button variant={'primary'} size={'lg'} label={'교육요청'} /> : ''}
          />
        </div>

        {/* result content */}
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
              <Button onClick={() => setActiveButton(2)}>
                숏츠 더보기
                <IcoArrowForward width={16} height={16} stroke="#131c30" />
              </Button>
            </div>
            <IntegratedSearchShorts />
          </div>
          <div>
            <div className={styles.tit_box}>
              <strong>채널</strong>
              <Button onClick={() => setActiveButton(3)}>
                채널 더보기
                <IcoArrowForward width={16} height={16} stroke="#131c30" />
              </Button>
            </div>
            <IntegratedSearchChannel />
          </div>
          <div>
            <div className={styles.tit_box}>
              <strong>러닝랩</strong>
              <Button onClick={() => setActiveButton(4)}>
                러닝랩 더보기
                <IcoArrowForward width={16} height={16} stroke="#131c30" />
              </Button>
            </div>
            <IntegratedSearchRunning />
          </div>
          <div>
            <div className={styles.tit_box}>
              <strong>지식공유</strong>
              <Button onClick={() => setActiveButton(5)}>
                지식공유 더보기
                <IcoArrowForward width={16} height={16} stroke="#131c30" />
              </Button>
            </div>
            <IntegratedSearchKnowledge />
          </div>
          <div>
            <div className={styles.tit_box}>
              <strong>코칭</strong>
              <Button onClick={() => setActiveButton(6)}>
                코칭 더보기
                <IcoArrowForward width={16} height={16} stroke="#131c30" />
              </Button>
            </div>
            <IntegratedSearchCoaching />
          </div>
        </div>
      </div>
    </div>
  );
}
