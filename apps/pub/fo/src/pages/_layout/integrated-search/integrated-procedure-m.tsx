import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, Popover, Pagination } from '@learnway/ui';
import { IntegratedSearchButton, IntegratedSearchProcedure } from '../../../features/layout';
import { IcoArray, IcoDotpoints, IcoFilter, IcoArrowDown } from '@learnway/icons';

import dropdownPopoverStyles from '../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
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

  // 퍼블수정 20250513 : popover 추가
  const DropdownPopoverCompoment = () => {
    return (
      <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
        <Button>정확도순</Button>
        <Button>최신순</Button>
      </div>
    );
  };

  // 퍼블수정 20250513 : popover 추가
  const DropdownPopoverCompoment2 = () => {
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
                {/* 퍼블수정 20250513 : dropdown > popover로 변경 */}
                <Popover
                  popoverContent={<DropdownPopoverCompoment />}
                  className={`${dropdownPopoverStyles.btn} ${dropdownPopoverStyles.text}`}
                  side="bottom"
                  align="end"
                  sideOffset={10}
                >
                  <span>{'정확도순'}</span>
                  <IcoArrowDown width={16} height={16} stroke="#131C30" />
                </Popover>
              </div>

              <div className={styles.box}>
                {/* 퍼블수정 20250513 : dropdown > popover로 변경 */}
                <Popover
                  popoverContent={<DropdownPopoverCompoment2 />}
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
