import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, Dropdown, Pagination } from '@learnway/ui';
import { IntegratedSearchButton, IntegratedSearchProcedure } from '../../../features/layout';
import { IcoArray, IcoDotpoints, IcoFilter } from '@learnway/icons';

import styles from './integrated-procedure-m.module.css';

export const Route = createFileRoute('/_layout/integrated-search/integrated-procedure-m')({
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
  };

  // dropdown
  const [arrayValues, setArrayValues] = useState<string[]>(['최신순']);
  const [countValues, setCountValues] = useState<string[]>(['20개씩']);

  // filter 선택된 값이 있으면 true 변경
  const [selectCheck, setSelectCheck] = useState(true);

  // list (가로형, 세로형) 변경
  const [listUi, setListUi] = useState('horizontal');
  const list_ui = () => {
    if (listUi === 'vertical') {
      setListUi('horizontal'); // 가로형
    } else {
      setListUi('vertical'); // 세로형
    }
  };

  // pagenation
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
          <div className={styles.filter_wrap}>
            <div className={styles.count_box}>
              <span>
                00<em>개</em>
              </span>
            </div>
            <div className={styles.filter_box}>
              <div className={styles.box}>
                <Dropdown
                  className={styles.array}
                  variant="text"
                  options={[
                    { value: 'a', label: '최신순' },
                    { value: 'b', label: '과정명순' },
                    { value: 'c', label: '조회순' },
                  ]}
                  value={arrayValues}
                  onChange={(selected) => setArrayValues(selected)}
                />
              </div>

              <div className={styles.box}>
                <Dropdown
                  className={styles.count}
                  variant="text"
                  options={[
                    { value: '20', label: '20개씩' },
                    { value: '50', label: '50개씩' },
                    { value: '80', label: '80개씩' },
                  ]}
                  value={countValues}
                  onChange={(selected) => setCountValues(selected)}
                />
              </div>

              <div className={styles.box}>
                <Button onClick={list_ui}>
                  {listUi === 'horizontal' ? (
                    <IcoArray width={16} height={16} stroke="#4c515e" fill="none" />
                  ) : (
                    <IcoDotpoints width={16} height={16} stroke="#4c515e" fill="none" />
                  )}
                </Button>
              </div>

              <div className={styles.box}>
                <Button className={cn(selectCheck === true ? styles.selected : '')}>
                  <IcoFilter width={20} height={20} stroke="#4c515e" fill="none" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}
