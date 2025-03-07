import { useState } from 'react';
import { Button, useModal, ChipList } from '@learnway/ui';
import { FilterPopup } from '../popup/filter-popup';
import { cn, getRandomId } from '@learnway/shared';
import { OptionCard } from '@/libs/ui/src';
import styles from './filter.module.css';

import { IcoFilter, IcoRefresh02 } from '@learnway/icons';

const FilterComponent = () => {
  // modal
  const { open: openModal } = useModal();

  // 선택된 값이 있으면 true 변경
  const [selectCheck, setSelectCheck] = useState(true);

  const filter = [
    { label: '클래스', value: getRandomId() },
    { label: '동영상', value: getRandomId() },
    { label: '이북', value: getRandomId() },
    { label: '웹', value: getRandomId() },
    { label: '링크', value: getRandomId() },
    { label: '시험', value: getRandomId() },
    { label: '라이브', value: getRandomId() },
    { label: '패키지', value: getRandomId() },
  ];

  const options: any[] = [
    { label: '클래스', value: 'A' },
    { label: '동영상', value: 'B' },
    { label: '이북', value: 'C' },
    { label: '웹', value: 'E' },
    { label: '시험', value: 'F' },

    { label: '클래스', value: 'G' },
    { label: '동영상', value: 'H' },
    { label: '이북', value: 'I' },
    { label: '웹', value: 'J' },
    { label: '시험', value: 'K' },
    { label: '클래스', value: 'L' },
    { label: '동영상', value: 'M' },
    { label: '이북', value: 'N' },
    { label: '웹', value: 'O' },
    { label: '시험', value: 'P' },
    { label: '클래스', value: 'Q' },
    { label: '동영상', value: 'R' },
    { label: '이북', value: 'S' },
    { label: '웹', value: 'T' },
    { label: '시험', value: 'U' },
    { label: '클래스', value: 'V' },
    { label: '동영상', value: 'W' },
    { label: '이북', value: 'X' },
    { label: '웹', value: 'Y' },
    { label: '시험', value: 'Z' },
    { label: '클래스', value: 'A1' },
    { label: '동영상', value: 'B2' },
    { label: '이북', value: 'C3' },
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
        <OptionCard cols={8} options={filter} multiple />
        <ChipList options={options} className={styles.chip_list} hideBorder type="line" size="lg" />

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
