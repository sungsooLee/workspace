import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { isMobile } from 'react-device-detect';
import { Popover, Button, Pagination } from '@learnway/ui';
import { IcoArray, IcoDotpoints, IcoArrowDown } from '@learnway/icons';
import {
  Arrays,
  Filter,
  IntegratedSearchProcedure,
  IntegratedSearchButton,
} from '../../../features/layout';

import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import styles from './integrated-procedure.module.css';

import ImgNotice from '@learnway/styles/fo/assets/images/thumb/img_notice_01.png';

export const Route = createFileRoute('/_layout/integrated-search/integrated-procedure')({
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
  };

  // 퍼블수정 20250513 : popover 추가
  const DropdownPopoverCompoment = () => {
    return (
      <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
        <Button>20개씩</Button>
        <Button>50개씩</Button>
        <Button>80개씩</Button>
      </div>
    );
  };

  // pagenation
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
                  {/* 퍼블수정 20250513 : dropdown > popover로 변경 */}
                  <Popover
                    popoverContent={<DropdownPopoverCompoment />}
                    className={`${dropdownPopoverStyles.btn} ${dropdownPopoverStyles.text}`}
                    side="bottom"
                    align="end"
                    sideOffset={10}
                  >
                    <span>{'20개씩'}</span>
                    <IcoArrowDown width={16} height={16} stroke="#131C30" />
                  </Popover>
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

        {/* result content */}
        <div className={styles.result_wrap}>
          {/* 과정 컨텐츠 */}
          <div>
            <IntegratedSearchProcedure />
            {/* pagination */}
            <Pagination
              className={cn(styles.pagenation, styles.paginationItem)}
              count={3}
              page={page}
              onChange={handlePageChange}
            />
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
