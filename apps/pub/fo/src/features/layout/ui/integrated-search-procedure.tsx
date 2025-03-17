import { useState } from 'react';
import { Button } from '@learnway/ui';

import { IcoArrowForward } from '@learnway/icons';

import styles from '@learnway/styles/fo/features/integrated-search/integrated-search-procedure.module.css';

const IntegratedSearchProcedureComponent = () => {
  return (
    <div className={`${styles.start} ${styles.procedure}`}>
      <div className={styles.procedure_box}></div>
    </div>
  );
};

export const IntegratedSearchProcedure = IntegratedSearchProcedureComponent;
