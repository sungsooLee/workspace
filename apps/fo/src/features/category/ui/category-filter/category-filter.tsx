import { useCallback, useEffect, useState } from 'react';
import { Button, ChipList, OptionCard, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/fo/features/category/category-filter.module.css';

import { IcoFilter, IcoRefresh02 } from '@learnway/icons';
import { CategoryFilterPopup } from './category-filter-popup';

const FilterComponent = ({ onOptionChange }: any) => {
  // modal
  const { open: openModal } = useModal();

  // 선택된 값이 있으면 true 변경
  const [selectCheck, setSelectCheck] = useState(false);

  const [filters, setFilters] = useState<any>({
    categories: [], // OptionCard에서 선택된 카테고리 값들
    types: [], // ChipList에서 선택된 타입 값들
  });

  // OptionCard에서 선택된 옵션 상태
  const [selectedCardOptions, setSelectedCardOptions] = useState([]);

  // ChipList에서 선택된 옵션 상태
  const [selectedChipOptions, setSelectedChipOptions] = useState([]);

  const filter = [
    { label: '클래스', value: 'category_class' },
    { label: '동영상', value: 'category_video' },
    { label: '이북', value: 'category_ebook' },
    { label: '웹', value: 'category_web' },
    { label: '링크', value: 'category_link' },
    { label: '시험', value: 'category_exam' },
    { label: '라이브', value: 'category_live' },
    { label: '패키지', value: 'category_package' },
  ];

  // 선택된 필터 칩에서 카테고리별 필터 값 추출 (팝업 초기값용)
  const getFiltersByCategory = useCallback(() => {
    const filtersByCategory: any = {};

    selectedChipOptions.forEach((chip: any) => {
      if (chip.category) {
        if (!filtersByCategory[chip.category]) {
          filtersByCategory[chip.category] = [];
        }
        filtersByCategory[chip.category].push(chip.value);
      }
    });

    return filtersByCategory;
  }, [selectedChipOptions]);

  // 필터 상태가 변경될 때마다 selectCheck 업데이트 및 통합 필터 업데이트
  useEffect(() => {
    // 선택된 항목이 있는지 확인
    const hasSelections = selectedCardOptions.length > 0 || selectedChipOptions.length > 0;
    setSelectCheck(hasSelections);

    // 통합 필터 상태 업데이트
    setFilters({
      categories: selectedCardOptions.map((item: any) => item.value),
      types: selectedChipOptions.map((item: any) => item.value),
    });
  }, [selectedCardOptions, selectedChipOptions]);

  useEffect(() => {
    onOptionChange(filters);
  }, [filters, onOptionChange]);

  // OptionCard 선택 처리 핸들러
  const handleCardOptionsSelect = (selectedOptions: any) => {
    setSelectedCardOptions(selectedOptions);
    console.log('Card 선택 옵션:', selectedOptions);
  };

  // ChipList 선택 처리 핸들러
  const handleChipOptionsChange = (selectedOptions: any) => {
    setSelectedChipOptions(selectedOptions);
    console.log('Chip 선택 옵션:', selectedOptions);
  };

  // 초기화 버튼 핸들러
  const handleReset = () => {
    setSelectedCardOptions([]);
    setSelectedChipOptions([]);
    setFilters({
      selectedFilters: {},
      selectedChips: [],
    });
  };

  // 필터 모달 열기 핸들러
  const handleOpenFilterModal = () => {
    // 현재 선택된 필터 칩에서 카테고리별 필터 값 추출
    const filtersByCategory = getFiltersByCategory();

    openModal({
      // title: '필터',
      width: 'md',
      content: <CategoryFilterPopup initialFilters={filtersByCategory} />,
      onClose: (data: any) => {
        // 확인 버튼을 눌러 모달이 닫힐 때 데이터를 받음
        if (data && data.selectedChips) {
          console.log('모달에서 선택된 필터:', data);

          // 선택된 필터 칩 목록 업데이트 (바닥에 표시할 칩 목록)
          setSelectedChipOptions(data.selectedChips);
        }
      },
    });
  };

  return (
    <div className={`${styles.start} ${styles.filter_wrap}`}>
      <div className={styles.filter_btn_box}>
        <Button
          className={cn(styles.filter_btn, selectCheck === true ? styles.selected : '')}
          onClick={handleOpenFilterModal}>
          <IcoFilter
            width={20}
            height={20}
            fill="none"
            stroke={selectCheck === true ? '#fff' : '#07287e'}></IcoFilter>
        </Button>
      </div>

      <div className={styles.select_box}>
        <OptionCard
          cols={8}
          options={filter}
          multiple
          className={styles.option_card}
          onOptionsSelect={handleCardOptionsSelect}
          value={selectedCardOptions.map((option: any) => option.value)} // 값만 전달
        />
        <ChipList
          options={selectedChipOptions}
          className={styles.chip_list}
          hideBorder
          type="line"
          size="lg"
          //onChange={handleChipOptionsChange}
        />
      </div>

      <div className={styles.reset}>
        <Button className={styles.btn_reset} onClick={handleReset}>
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
