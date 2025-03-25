import { useState } from 'react';
import { Button, EmptyText } from '@learnway/ui';

import { IcoArrowForward } from '@learnway/icons';

import styles from '@learnway/styles/fo/features/integrated-search/integrated-search-procedure.module.css';

const IntegratedSearchProcedureComponent = () => {
  return (
    <div className={`${styles.start} ${styles.procedure}`}>
      <div className={styles.procedure_box}>
        <div className={styles.empty}>
          <EmptyText
            hideTitle
            description={'검색 결과를 찾을 수 없습니다.'}
            footer={<Button variant={'primary'} size={'lg'} label={'교육요청'} />}
          />
        </div>
      </div>
    </div>
  );
};

export const IntegratedSearchProcedure = IntegratedSearchProcedureComponent;
