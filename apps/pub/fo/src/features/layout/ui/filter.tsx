import { useState } from 'react';
import { Button, useModal } from '@learnway/ui';
import { FilterPopup } from '../popup/filter-popup';
import { cn } from '@learnway/shared';

import styles from './filter.module.css';

import { IcoFilter, IcoRefresh02 } from '@learnway/icons';

const FilterComponent = () => {
  // modal
  const { open: openModal } = useModal();

  // 선택된 값이 있으면 true 변경
  const [selectCheck, setSelectCheck] = useState(true);
  const selectBtn = [
    { text: '클래스', checked: false },
    { text: '동영상', checked: false },
    { text: '이북', checked: false },
  ];

  return (
    <div className={styles.filter_wrap}>
      <div className={styles.filter_btn_box}>
        <Button
          className={cn(styles.filter_btn, selectCheck === true ? styles.selected : '')}
          onClick={() =>
            openModal({
              title: '필터',
              width: 'md',
              content: <FilterPopup />,
              footer: true,
            })
          }>
          <IcoFilter
            width={20}
            height={20}
            fill="none"
            stroke={selectCheck === true ? '#fff' : '#07287e'}></IcoFilter>
        </Button>
      </div>

      <div className={styles.select_box}>
        {selectBtn.map((select, index) => (
          <Button className={styles.select_btn} key={index}>
            클래스
          </Button>
        ))}
        <div className={styles.reset}>
          <Button className={styles.btn_reset}>
            <IcoRefresh02
              className={styles.ico_reset}
              width={20}
              height={20}
              fill="none"
              stroke="#131c30"></IcoRefresh02>
            초기화
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Filter = FilterComponent;
