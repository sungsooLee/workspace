import { useState } from 'react';
import { Button, ChipList, useModal } from '@learnway/ui';
import { FilterPopup } from '../popup/filter-popup';
import { cn, getRandomId } from '@learnway/shared';
import { OptionCard, OptionCardItem } from '@learnway/ui';
import styles from './filter.module.css';

import { IcoFilter, IcoRefresh02 } from '@learnway/icons';

const FilterComponent = () => {
  // modal
  const { open: openModal } = useModal();

  // 선택된 값이 있으면 true 변경
  const [selectCheck, setSelectCheck] = useState(true);

  // 퍼블수정 20250331 : option card 컴포넌트 수정 value 값 추가
  const [filterValue, setFilterValue] = useState<string[]>();

  const filter = [
    { label: '클래스', value: 'a' },
    { label: '동영상', value: 'b' },
    { label: '이북', value: 'c' },
    { label: '웹', value: 'd' },
    { label: '링크', value: 'e' },
    { label: '시험', value: 'f' },
    { label: '라이브', value: 'g' },
    { label: '패키지', value: 'h' },
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
    <div className={`${styles.start} ${styles.filter_wrap}`}>
      <div className={styles.filter_btn_box}>
        <Button
          className={cn(styles.filter_btn, selectCheck === true ? styles.selected : '')}
          onClick={() =>
            // 퍼블수정 20250314 : title 삭제
            openModal({
              width: 'md',
              content: <FilterPopup />,
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
        {/* 퍼블수정 20250331 : 옵션 추가 */}
        <OptionCard
          cols={8}
          options={filter}
          multiple
          className={styles.option_card}
          value={filterValue}
          onOptionsSelect={(options: OptionCardItem[]) =>
            setFilterValue(options.map((d: OptionCardItem) => d.value))
          }
        />
        <ChipList options={options} className={styles.chip_list} hideBorder type="line" size="lg" />
      </div>

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
  );
};

export const Filter = FilterComponent;
