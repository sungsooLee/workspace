import { useState } from 'react';
import { Button, useModal } from '@learnway/ui';
import { FilterPopup } from '../popup/filter-popup';

import styles from './filter.module.css';

import { IcoFilter } from '@learnway/icons';

const FilterComponent = () => {
  // modal
  const { open: openModal } = useModal();

  const [selectCheck, setSelectCheck] = useState(false);
  const selectBtn = [
    { text: '클래스', checked: false },
    { text: '동영상', checked: false },
    { text: '이북', checked: false },
  ];

  return (
    <div className={styles.filter_wrap}>
      <div className={styles.filter_btn_box}>
        <Button
          className={styles.filter_btn}
          onClick={() =>
            openModal({
              title: '필터',
              width: 'md',
              content: <FilterPopup />,
              footer: true,
            })
          }>
          <IcoFilter width={20} height={20} fill="none" stroke="#07287e"></IcoFilter>
        </Button>
      </div>

      <div className={styles.select_box}>
        {selectBtn.map((select, index) => (
          <Button className={styles.select_btn} key={index}>
            클래스
          </Button>
        ))}
      </div>
    </div>
  );
};

export const Filter = FilterComponent;
