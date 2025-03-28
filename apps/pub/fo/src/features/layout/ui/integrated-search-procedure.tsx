import { useState } from 'react';
import { Button, EmptyText } from '@learnway/ui';
import { isMobile } from 'react-device-detect';

import { IcoArrowForward } from '@learnway/icons';

import styles from '@learnway/styles/fo/features/integrated-search/integrated-search-procedure.module.css';

const IntegratedSearchProcedureComponent = () => {
  return (
    <div className={`${styles.start} ${styles.procedure}`}>
      {/* 검색 없음 */}
      <div className={styles.empty}>
        <EmptyText
          hideTitle
          size="lg"
          description={'검색 결과를 찾을 수 없습니다.'}
          footer={isMobile ? <Button variant={'primary'} size={'lg'} label={'교육요청'} /> : ''}
        />
      </div>

      {/* 검색 있음 */}
      <div className={styles.procedure_box}></div>
    </div>
  );
};

export const IntegratedSearchProcedure = IntegratedSearchProcedureComponent;
