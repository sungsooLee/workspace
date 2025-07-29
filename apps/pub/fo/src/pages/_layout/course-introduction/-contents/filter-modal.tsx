import { FC, useState } from 'react';
import { cn } from '@learnway/shared';
import {
  OptionCard,
  Button,
  useModal,
  OptionCardItem,
  ModalContainer,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from '@learnway/ui';
import { IcoArrowForward } from '@learnway/icons';
import { isMobile } from 'react-device-detect';

/* style */
import styles from './filter-modal.module.css';

const filter = [
  { label: '전체', value: 'a' },
  { label: 'AI 입문부터 시작', value: 'b' },
  { label: '현업에서 바로 쓰는 데이터 분석', value: 'c' },
  { label: '요즘 뜨는 AI 트렌드 코스', value: 'd' },
  { label: '직무별 AI 실정 패키지', value: 'e' },
  { label: 'AI 윤리 & 보안 한눈에 보기', value: 'f' },
  { label: '업무자동화 RPA 모음집', value: 'g' },
  { label: '라이브', value: 'h' },
  { label: '패키지', value: 'i' },
  { label: '클래스', value: 'j' },
  { label: '동영상', value: 'k' },
  { label: '이북', value: 'l' },
  { label: '웹', value: 'm' },
];

const FilterModalComponent: FC = () => {
  const { openModal } = useModal();

  const [filterValue, setFilterValue] = useState<string[]>();

  return (
    <div className={cn(styles.start, styles.filter_wrap)}>
      <OptionCard
        options={filter.slice(0, 6)}
        multiple
        className={styles.option_card}
        value={filterValue}
        onOptionsSelect={(options: OptionCardItem[]) =>
          setFilterValue(options.map((d: OptionCardItem) => d.value))
        }
      />
      <div className={styles.btn_wrap}>
        <Button
          variant={'text'}
          label={'더보기'}
          icon={<IcoArrowForward width={20} height={20} stroke="#4D525C" />}
          iconAlign={'right'}
          size={'sm'}
          className={styles.btn_more}
          onClick={() =>
            openModal({
              width: isMobile ? 'm_full' : 'md', // sm(600px), md(800px), lg(1024px), xl(1400px)
              content: <FilterPopup />,
            })
          }
        />
      </div>
    </div>
  );
};

const FilterPopup = () => {
  const { closeModal } = useModal();

  const [filterValue2, setFilterValue2] = useState<string[]>();

  return (
    <ModalContainer>
      <ModalTitle>{'키워드 노출'}</ModalTitle>
      <ModalBody>
        <div className={cn(styles.start, styles.pop_filter)}>
          <OptionCard
            options={filter.slice(1)}
            multiple
            className={styles.option_card}
            value={filterValue2}
            onOptionsSelect={(options: OptionCardItem[]) =>
              setFilterValue2(options.map((d: OptionCardItem) => d.value))
            }
            cols={!isMobile ? 3 : 2}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant={'primary'} size={'lg'} onClick={() => closeModal()} label={'확인'} />
      </ModalFooter>
    </ModalContainer>
  );
};

FilterModalComponent.displayName = 'FilterModal';
export const FilterModal = FilterModalComponent;
