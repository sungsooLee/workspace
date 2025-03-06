import { memo } from 'react';
import { Checkbox } from '@learnway/ui';

import styles from './filter-popup.module.css';

const filter = [{ text: '작업중1' }, { text: '작업중2' }, { text: '작업중3' }];

const FilterPopupComponent = () => {
  return (
    <>
      <ul className={styles.filter_wrap}>
        {filter.map((fill, index) => (
          <li key={index}>
            <strong className={styles.tit}>{fill.text}</strong>
            <div className={styles.filter_box}>aaa</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export const FilterPopup = memo(FilterPopupComponent);
