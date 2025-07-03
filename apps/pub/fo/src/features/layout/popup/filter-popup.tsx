import { memo, useState } from 'react';
import { OptionCard, OptionCardItem } from '@learnway/ui';
import { isMobile } from 'react-device-detect';

import { cn } from '@learnway/shared';
// 퍼블수정 20250314 import modal추가
import {
  ChipList,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
} from '@learnway/ui';

import { IcoRefresh02 } from '@learnway/icons';

import styles from './filter-popup.module.css';

const filter = [
  { label: '클래스', value: 'a' },
  { label: '동영상', value: 'b' },
  { label: '이북', value: 'c' },
  { label: '웹', value: 'd' },
];
const filter2 = [
  { label: '수강신청 교육', value: 'a' },
  { label: '수강신청 가능', value: 'b' },
  { label: '수강신청 마감', value: 'c' },
];
const filter3 = [
  { label: '10분 이내', value: 'a' },
  { label: '10분 ~1시간', value: 'b' },
  { label: '1 ~ 4시간', value: 'c' },
  { label: '12시간 이상', value: 'd' },
];
const filter4 = [
  { label: '1일 ~ 2일', value: 'a' },
  { label: '3일 ~ 5일', value: 'b' },
  { label: '6일 ~ 11일', value: 'c' },
  { label: '1개월 이상', value: 'd' },
];
const filter5 = [
  { label: '초급', value: 'a' },
  { label: '중급', value: 'b' },
  { label: '고급', value: 'c' },
];

const options: any[] = [
  { label: '클래스', value: 'A' },
  { label: '동영상', value: 'B' },
  { label: '이북', value: 'C' },
  { label: '웹', value: 'E' },
  { label: '시험', value: 'F' },
];

// 퍼블수정 20250314 modal 컴포넌트 수정으로 전체적 수정
const FilterPopupComponent = () => {
  const { close: closeModal } = useModal();

  // 퍼블수정 20250331 : option card 컴포넌트 수정 value 값 추가
  const [filterValue, setFilterValue] = useState<string[]>();
  const [filterValue2, setFilterValue2] = useState<string[]>();
  const [filterValue3, setFilterValue3] = useState<string[]>();
  const [filterValue4, setFilterValue4] = useState<string[]>();
  const [filterValue5, setFilterValue5] = useState<string[]>();
  return (
    <ModalContainer>
      <ModalTitle>{'필터'}</ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          <ul className={styles.filter_wrap}>
            <li>
              <strong className={styles.tit}>강의유형</strong>
              <div className={styles.filter_box}>
                {/* 퍼블수정 20250508 : mobile에서 2개씩 */}
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filter}
                  multiple
                  value={filterValue}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setFilterValue(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>
            <li>
              <strong className={styles.tit}>수강신청</strong>
              <div className={styles.filter_box}>
                {/* 퍼블수정 20250508 : mobile에서 2개씩 */}
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filter2}
                  multiple
                  value={filterValue2}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setFilterValue2(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>
            <li>
              <strong className={styles.tit}>학습시간</strong>
              <div className={styles.filter_box}>
                {/* 퍼블수정 20250508 : mobile에서 2개씩 */}
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filter3}
                  multiple
                  value={filterValue3}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setFilterValue3(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>
            <li>
              <strong className={styles.tit}>교육기간</strong>
              <div className={styles.filter_box}>
                {/* 퍼블수정 20250508 : mobile에서 2개씩 */}
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filter4}
                  multiple
                  value={filterValue4}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setFilterValue4(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>
            <li>
              <strong className={styles.tit}>난이도</strong>
              <div className={styles.filter_box}>
                {/* 퍼블수정 20250508 : mobile에서 2개씩 */}
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filter5}
                  multiple
                  value={filterValue5}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setFilterValue5(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>
            <li>
              <strong className={styles.tit}>언어</strong>
              <div className={styles.filter_box}>
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filter5}
                  multiple
                  value={filterValue5}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setFilterValue5(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>

            <li>
              <strong className={styles.tit}>언어</strong>
              <div className={styles.filter_box}>
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filter5}
                  multiple
                  value={filterValue5}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setFilterValue5(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>
            <li>
              <strong className={styles.tit}>언어</strong>
              <div className={styles.filter_box}>
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filter5}
                  multiple
                  value={filterValue5}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setFilterValue5(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>
            <li>
              <strong className={styles.tit}>언어</strong>
              <div className={styles.filter_box}>
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filter5}
                  multiple
                  value={filterValue5}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setFilterValue5(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>
          </ul>

          <div className={styles.look}>
            <ChipList
              options={options}
              className={styles.chip_list}
              hideBorder
              type="line"
              size="sm"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className={styles.btn_reset}
          variant={'gray'}
          size={'lg'}
          onClick={() => closeModal()}
        >
          <IcoRefresh02 width={20} height={20} stroke="#4c515e" fill="none"></IcoRefresh02>
          초기화
        </Button>
        <Button variant={'primary'} size={'lg'} onClick={() => closeModal()}>
          적용
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const FilterPopup = memo(FilterPopupComponent);
