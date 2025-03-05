import { memo } from 'react';
import { Checkbox } from '@learnway/ui';

import styles from './filter-popup.module.css';

const FilterPopupComponent = () => {
  return (
    <>
      <ul className={styles.filter_wrap}>
        <li>
          <strong className={styles.tit}>aaa</strong>
          <div className={styles.filter_box}></div>
        </li>
      </ul>
    </>
  );
};

export const FilterPopup = memo(FilterPopupComponent);
