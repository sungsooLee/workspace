import { cn } from '@learnway/shared';
import styles from '@learnway/styles/fo/features/category/category-filter.module.css';
import { OptionCard } from '@learnway/ui/option-card';
import { useEffect, useState } from 'react';

import { CategoryFilterPopup } from '@shared/ui/category/category-filter-popup';
import { CODE_GROUP, useCodeStore } from '@learnway/hooks';
import { IcoFilter } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { ChipList } from '@learnway/ui/chips';
import { useModal } from '@learnway/ui/modal';
import { isMobile } from 'react-device-detect';
import { t } from 'i18next';

interface FilterComponentProps {
  onOptionChange: (option: any) => void;
}

const FilterComponent = ({ onOptionChange }: FilterComponentProps) => {
  const showLanguageCode = ['KO', 'EN', 'ZH', 'JA']
  const { getCode } = useCodeStore();

  // modal
  const { openModal } = useModal();
  // 선택된 값이 있으면 true 변경
  const [selectCheck, setSelectCheck] = useState(false);
  // OptionCard에서 선택된 옵션 상태
  const [selectedCardOptions, setSelectedCardOptions] = useState([]);
  // ChipList에서 선택된 옵션 상태
  const [selectedChipOptions, setSelectedChipOptions] = useState([]);

  const [filter, setFilter] = useState<any>();
  const [difficultyCodes, setDifficultyCodes] = useState<any>();
  const [languageCodes, setLanguageCodes] = useState<any>();

  const handleOpenFilterModal = () => {
    // 현재 선택된 필터 칩에서 카테고리별 필터 값 추출
    const codes = {
      lectureType: filter,
      enrollment: [
        {label: t('수강신청 가능'), value: 'allow'},
        {label: t('수강신청 불가능'), value: 'reject'}
      ],
      difficulty: difficultyCodes,
      language: languageCodes,
    }
    openModal({
      // title: '필터',
      width: 'md',
      content: <CategoryFilterPopup initialFilters={selectedCardOptions} filterCodes={codes}/>,
      onClose: (data: any) => {
        if( data ) {
          handleCardOptionsSelect(data)
        }
      },
    });
  };
  // OptionCard 선택 처리 핸들러
  const handleCardOptionsSelect = (selectedOptions: any) => {
    setSelectedCardOptions(selectedOptions);
    onOptionChange(selectedOptions)
  };
  //
  useEffect(() => {
    // 선택된 항목이 있는지 확인
    const hasSelections = selectedCardOptions.length > 0 || selectedChipOptions.length > 0;
    setSelectCheck(hasSelections);
  }, [selectedCardOptions, selectedChipOptions]);

  useEffect(() => {
    (async () => {
      const data = await getCode(CODE_GROUP['lms.course.CourseType']);
      const defaultOptions = data.map((item: any) => {
        return { label: item.cdName, value: item.value };
      });
      const difficultyData = await getCode(CODE_GROUP['lms.course.TrainingLevelType']);
      const difficultyOptions = difficultyData
        .filter((item: any) => item.cdId !== 'NONE')
        .map((item: any) => {
          return { label: item.cdContent, value: item.value };
        });
      const languageData = await getCode(CODE_GROUP['pms.multilingual.LangCountryCode']);
      const languageOptions = languageData
        .filter((item: any) => showLanguageCode.includes(item.cdId) )
        .map((item: any) => {
          return { label: item.referenceVal1.korLanguageName, value: item.value };
        });
      const etcLanguageValue = languageData
        .filter((item: any) => !showLanguageCode.includes(item.cdId) )
        .map((item: any) => item.value);
      languageOptions.push({label: t('기타 언어'), value: etcLanguageValue});

      setFilter(defaultOptions)
      setDifficultyCodes(difficultyOptions)
      setLanguageCodes(languageOptions)
    })();
  }, []);

  return (
    <div className={cn(styles.start, styles.filter_wrap)}>
      <div className={styles.filter_btn_box}>
        <Button
          className={cn(styles.filter_btn, selectCheck === true ? styles.selected : '')}
          onClick={handleOpenFilterModal}
          onlyIcon={true}
          icon={
            <IcoFilter
              width={20}
              height={20}
              fill="none"
              stroke={selectCheck === true ? '#fff' : '#131416'}
            />
          }
        ></Button>
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
        {
          isMobile && (
            <ChipList
              options={selectedChipOptions}
              className={styles.chip_list}
              hideBorder
              type="line"
              size="lg"
              //onChange={handleChipOptionsChange}
            />
          )
        }
      </div>
    </div>
  );
}

export const Filter = FilterComponent;
