import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { isMobile } from 'react-device-detect';
import { ThumnailList } from '../../../../features/layout';

import { IcoArrowForward } from '@learnway/icons';

import styles from './integrated-search-procedure.module.css';

const IntegratedSearchProcedureComponent = () => {
  // pagenation
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // list (가로형, 세로형) 변경
  const [listUi, setListUi] = useState('vertical');
  const list_ui = () => {
    if (listUi === 'vertical') {
      setListUi('horizontal'); // 가로형
    } else {
      setListUi('vertical'); // 세로형
    }
  };

  return (
    <div className={`${styles.start} ${styles.procedure}`}>
      {/* 과정탭에서 노출 x */}
      <div className={styles.tit_box}>
        <strong>과정</strong>
        <Link to="">
          과정 더보기
          <IcoArrowForward width={16} height={16} stroke="#131c30" />
        </Link>
      </div>

      {/* 검색결과 있음 */}
      <div className={styles.list}>
        <div className={cn(styles.list_box, styles[listUi])}>
          <ThumnailList direction={listUi}></ThumnailList>
          <ThumnailList direction={listUi}></ThumnailList>
          <ThumnailList direction={listUi}></ThumnailList>
          <ThumnailList direction={listUi}></ThumnailList>
          <ThumnailList direction={listUi}></ThumnailList>
          <ThumnailList direction={listUi}></ThumnailList>
          <ThumnailList direction={listUi}></ThumnailList>
          <ThumnailList direction={listUi}></ThumnailList>
        </div>
      </div>

      {/* 검색결과 없음 */}
      {/* <div className={styles.empty}>
        <EmptyText
          hideTitle
          size="lg"
          description={'검색 결과를 찾을 수 없습니다.'}
          footer={isMobile ? <Button variant={'primary'} size={'sm'} label={'교육요청'} /> : ''}
        />
      </div> */}
    </div>
  );
};

export const IntegratedSearchProcedure = IntegratedSearchProcedureComponent;
