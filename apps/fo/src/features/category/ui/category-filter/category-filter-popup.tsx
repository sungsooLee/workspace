import { memo, useCallback, useEffect, useState } from 'react';
import { OptionCard } from '@learnway/ui';
import { getRandomId } from '@learnway/shared';
import { cn } from '@learnway/shared';
import { ChipList } from '@learnway/ui';

import styles from '@learnway/styles/fo/features/category/category-filter-popup.module.css';

interface FilterPopupComponentProps {
  initialFilters?: any; // 초기 필터 값 (이전에 선택한 값)
  setModalData?: (data: any) => void; // Modal에서 제공하는 데이터 설정 함수
}

// 필터 카테고리 정의 - 상수로 분리하여 관리
const FILTER_CATEGORIES = {
  LECTURE_TYPE: 'lectureType',
  ENROLLMENT: 'enrollment',
  LEARNING_TIME: 'learningTime',
  EDUCATION_PERIOD: 'educationPeriod',
  DIFFICULTY: 'difficulty',
  LANGUAGE: 'language',
};

// 모든 필터 옵션을 하나의 객체로 통합 관리
const FILTER_OPTIONS = {
  [FILTER_CATEGORIES.LECTURE_TYPE]: [
    { label: '클래스', value: 'class' },
    { label: '동영상', value: 'video' },
    { label: '이북', value: 'ebook' },
    { label: '웹', value: 'web' },
  ],
  [FILTER_CATEGORIES.ENROLLMENT]: [
    { label: '수강신청 교육', value: 'education' },
    { label: '수강신청 가능', value: 'available' },
    { label: '수강신청 마감', value: 'closed' },
  ],
  [FILTER_CATEGORIES.LEARNING_TIME]: [
    { label: '10분 이내', value: 'under_10min' },
    { label: '10분 ~1시간', value: '10min_to_1hour' },
    { label: '1 ~ 4시간', value: '1hour_to_4hours' },
    { label: '12시간 이상', value: 'over_12hours' },
  ],
  [FILTER_CATEGORIES.EDUCATION_PERIOD]: [
    { label: '1일 ~ 2일', value: '1day_to_2days' },
    { label: '3일 ~ 5일', value: '3days_to_5days' },
    { label: '6일 ~ 11일', value: '6days_to_11days' },
    { label: '1개월 이상', value: 'over_1month' },
  ],
  [FILTER_CATEGORIES.DIFFICULTY]: [
    { label: '초급', value: 'beginner' },
    { label: '중급', value: 'intermediate' },
    { label: '고급', value: 'advanced' },
  ],
  [FILTER_CATEGORIES.LANGUAGE]: [
    { label: '한국어', value: 'korean' },
    { label: '영어', value: 'english' },
    { label: '일본어', value: 'japanese' },
    { label: '중국어', value: 'chinese' },
    { label: '기타 언어', value: 'others' },
  ],
};

// 카테고리 타이틀 정의
const CATEGORY_TITLES = {
  [FILTER_CATEGORIES.LECTURE_TYPE]: '강의유형',
  [FILTER_CATEGORIES.ENROLLMENT]: '수강신청',
  [FILTER_CATEGORIES.LEARNING_TIME]: '학습시간',
  [FILTER_CATEGORIES.EDUCATION_PERIOD]: '교육기간',
  [FILTER_CATEGORIES.DIFFICULTY]: '난이도',
  [FILTER_CATEGORIES.LANGUAGE]: '언어',
};

const FilterPopupComponent = ({ initialFilters, setModalData }: FilterPopupComponentProps) => {
  // 모든 필터 선택을 하나의 상태로 통합 관리
  const [selectedFilters, setSelectedFilters] = useState({
    [FILTER_CATEGORIES.LECTURE_TYPE]: [],
    [FILTER_CATEGORIES.ENROLLMENT]: [],
    [FILTER_CATEGORIES.LEARNING_TIME]: [],
    [FILTER_CATEGORIES.EDUCATION_PERIOD]: [],
    [FILTER_CATEGORIES.DIFFICULTY]: [],
    [FILTER_CATEGORIES.LANGUAGE]: [],
    ...initialFilters,
  });

  // 선택된 모든 옵션을 하나의 배열로 평탄화하여 ChipList에 표시
  const [selectedChips, setSelectedChips] = useState([]);

  // 필터가 변경될 때마다 선택된 칩 목록 업데이트
  useEffect(() => {
    const allSelectedOptions: any = [];

    // 모든 카테고리를 순회하며 선택된 옵션 수집
    Object.entries(selectedFilters).forEach(([category, selectedValues]: any) => {
      if (selectedValues.length > 0) {
        // 해당 카테고리의 선택된 옵션을 찾아 칩 목록에 추가
        const categoryOptions = FILTER_OPTIONS[category];
        const selectedOptions = categoryOptions.filter((option) =>
          selectedValues.includes(option.value),
        );

        // 카테고리 정보를 포함하여 추가 (나중에 삭제 시 원본 카테고리 식별용)
        selectedOptions.forEach((option) => {
          allSelectedOptions.push({
            ...option,
            category, // 원본 카테고리 정보 추가
            categoryTitle: CATEGORY_TITLES[category], // 카테고리 제목 추가
          });
        });
      }
    });

    setSelectedChips(allSelectedOptions);

    if (setModalData) {
      setModalData({
        selectedFilters,
        selectedChips: allSelectedOptions,
      });
    }
  }, [selectedFilters, setModalData]);

  // 특정 카테고리의 필터 값 변경 핸들러
  const handleFilterChange = useCallback((category: any, selectedOptions: any) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [category]: selectedOptions.map((option: any) => option.value),
    }));
  }, []);

  // 칩 삭제 핸들러
  const handleChipDelete = useCallback((deletedChip: any) => {
    // 삭제된 칩의 카테고리에서 해당 값 제거
    if (deletedChip.category) {
      setSelectedFilters((prev: any) => ({
        ...prev,
        [deletedChip.category]: prev[deletedChip.category].filter(
          (value: any) => value !== deletedChip.value,
        ),
      }));
    }
  }, []);

  return (
    <div>
      <ul className={styles.filter_wrap}>
        {/* 동적으로 모든 필터 카테고리 렌더링 */}
        {Object.entries(FILTER_OPTIONS).map(([category, options]) => (
          <li key={category}>
            <strong className={styles.tit}>{CATEGORY_TITLES[category]}</strong>
            <div className={styles.filter_box}>
              <OptionCard
                cols={4}
                options={options}
                multiple
                value={selectedFilters[category]}
                onOptionsSelect={(selected) => handleFilterChange(category, selected)}
              />
            </div>
          </li>
        ))}
      </ul>

      {selectedChips.length > 0 && (
        <div className={styles.look}>
          <ChipList
            options={selectedChips}
            className={styles.chip_list}
            hideBorder
            type="line"
            size="sm"
            onDelete={handleChipDelete}
          />
        </div>
      )}
    </div>
  );
};

export const CategoryFilterPopup = memo(FilterPopupComponent);
