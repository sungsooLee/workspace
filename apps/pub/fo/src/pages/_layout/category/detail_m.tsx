import { createFileRoute, Link } from '@tanstack/react-router';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@learnway/shared';
import { Button, ContentsRow, Input, Select, Pagination } from '@learnway/ui';
import { IcoArrowDown, IcoArrowForward, IcoFilter, IcoArray, IcoDotpoints } from '@learnway/icons';

import styles from './detail_m.module.css';

// 예시 이미지

export const Route = createFileRoute('/_layout/category/detail_m')({
  component: RouteComponent,
});

function RouteComponent() {
  // 필터 선택된 값이 있으면 true 변경
  const [selectCheck, setSelectCheck] = useState(true);

  const [listUi, setListUi] = useState('type');
  const list_ui = () => {
    if (listUi === 'type') {
      setListUi('type2');
    } else {
      setListUi('type');
    }
  };

  // pagenation
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className={`${styles.start} ${styles.detail_m}`}>
      <ul className={styles.category_box}>
        <li>
          <Button>
            서비스
            <span>
              <IcoArrowDown width={16} height={16} stroke="#6f798b"></IcoArrowDown>
            </span>
            <IcoArrowForward
              width={12}
              height={12}
              stroke="#6f798b"
              className={styles.arr}></IcoArrowForward>
          </Button>
        </li>
        <li>
          <Button>
            차량정보
            <span>
              <IcoArrowDown width={16} height={16} stroke="#6f798b"></IcoArrowDown>
            </span>
            <IcoArrowForward
              width={12}
              height={12}
              stroke="#6f798b"
              className={styles.arr}></IcoArrowForward>
          </Button>
        </li>
        <li>
          <Button>
            수소/전기차
            <span>
              <IcoArrowDown width={16} height={16} stroke="#6f798b"></IcoArrowDown>
            </span>
          </Button>
        </li>
      </ul>

      <div className={styles.gray_box}>
        <div className={styles.box}>
          <Select
            className={styles.select}
            options={[
              { value: 'a', label: '분류선택' },
              { value: 'b', label: 'ST1' },
              { value: 'c', label: '아이오닉 6' },
              { value: 'd', label: '아이오닉 5' },
              { value: 'e', label: '코나' },
              { value: 'f', label: '넥쏘' },
              { value: 'g', label: '포터' },
              { value: 'h', label: '캐스퍼' },
            ]}
          />
        </div>
        <div className={styles.box}>
          <ContentsRow className={styles.search}>
            <Input id="" type="text" placeholder="과정명 검색" showSearchIcon={true} />
          </ContentsRow>

          <div className={styles.filter_wrap}>
            <Button className={cn(styles.btn_filter, selectCheck === true ? styles.selected : '')}>
              <IcoFilter
                width={20}
                height={20}
                fill="none"
                stroke={selectCheck === true ? '#fff' : '#07287e'}></IcoFilter>
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.lists_wrap}>
        <div className={styles.align}>
          <div className={styles.left}>
            <span className={styles.txt}>
              <em>32</em>개
            </span>
          </div>
          <div className={styles.right}>
            <div className={styles.box}>
              <Select
                options={[
                  { value: 'a', label: '최신순' },
                  { value: 'b', label: '과정명순' },
                  { value: 'c', label: '조회순' },
                ]}
              />
            </div>
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
                {listUi === 'type2' ? (
                  <IcoArray width={24} height={24} stroke="#4c515e" fill="none" />
                ) : (
                  <IcoDotpoints width={24} height={24} stroke="#4c515e" fill="none" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Pagination
        className={cn(styles.pagenation, styles.paginationItem)}
        count={3}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
