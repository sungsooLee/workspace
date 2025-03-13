import { useState } from 'react';
import styles from '@learnway/styles/fo/features/integrated-search/integrated-search-procedure.module.css';

const IntegratedSearchProcedureComponent = () => {
  return (
    <div className={`${styles.start} ${styles.procedure}`}>
      <div className={styles.tit_box}>
        <strong>과정</strong>
      </div>
      <div className={styles.procedure_box}></div>
    </div>
  );
};

export const IntegratedSearchProcedure = IntegratedSearchProcedureComponent;
