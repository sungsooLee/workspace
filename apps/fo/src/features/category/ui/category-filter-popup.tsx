import { OptionCard } from '@learnway/ui/option-card';
import { memo, useCallback, useEffect, useState } from 'react';

import styles from '@learnway/styles/fo/features/category/category-filter-popup.module.css';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { t } from 'i18next';
import { isMobile } from 'react-device-detect';
import { ChipList } from '@learnway/ui/chips';

interface FilterPopupComponentProps {
  filterCodes: any,
  initialFilters?: any; // 초기 필터 값 (이전에 선택한 값)
  setModalData?: (data: any) => void; // Modal에서 제공하는 데이터 설정 함수
}

const FilterPopupComponent = ({ filterCodes, initialFilters, setModalData }: FilterPopupComponentProps) => {
  const exceptValue = [ 'ELEARNING1', 'LIVE', 'SURVEY' ]

  const { closeModal } = useModal();
  const [filterOptions, setFilterOptions] = useState(() => {
    const initial = new Map<number, object>();
    initial.set(1, {
      lectureType: {
        title: t('과정유형'),
        options: filterCodes.lectureType,
      }
    });
    initial.set(2, {
      enrollment: {
        title: t('수강신청'),
        options: filterCodes.enrollment,
      }
    });
    initial.set(3, {
      difficulty: {
        title: t('난이도'),
        options: filterCodes.difficulty,
      }
    });
    initial.set(4, {
      language: {
        title: t('언어'),
        options: filterCodes.language,
      },
    });
    return initial;
  });
  const [selectedOptions, setSelectedOptions] = useState(initialFilters);

  const handleFilterChange = (selectedOption: any) => {
    const checkOptions = selectedOption.filter( (option: any) => exceptValue.includes(option.value));
    if( checkOptions.length > 0 ){
      setFilterOptions((prev: any) => {
        const newMap = new Map<number, object>();
        for(const [key, value] of prev.entries()) {
          if( key !== 2 ) newMap.set(key, value)
        }
        console.log('### newMap', newMap)
        return newMap;
      })
    } else {
      setFilterOptions(prev => {
        const newMap = new Map(prev);
        newMap.set(2, {
          enrollment: {
            title: t('수강신청'),
            options: filterCodes.enrollment,
          }
        })
        const sortedEntries = Array.from(newMap.entries()).sort(
          ([a], [b]) => Number(a) - Number(b)
        );

        return new Map(sortedEntries);
      });
    }
    setSelectedOptions(selectedOption)
  }
  const handleClearFilter = () => {
    if( selectedOptions.length !== 0 ) {
      setSelectedOptions([])
    }
  }
  const handleCloseModal = () => {
    closeModal(selectedOptions)
  }

  useEffect(() => {
    if(initialFilters && initialFilters.length > 0) {
      const checkOptions = initialFilters.filter((option: any) => exceptValue.includes(option.value));
      if( checkOptions.length > 0 ){
        setFilterOptions((prev: any) => {
          const newMap = new Map<number, object>();
          for(const [key, value] of prev.entries()) {
            if( key !== 2 ) newMap.set(key, value)
          }
          return newMap;
        })
      }
    }
  }, [initialFilters]);

  return (
    <ModalContainer>
      <ModalTitle>{t('필터')}</ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          <ul className={styles.filter_wrap}>
            {/* 동적으로 모든 필터 카테고리 렌더링 */
              Array.from(filterOptions.entries()).map(([number, category], idx) => {
                return (
                  <li key={idx}>
                    {
                      Object.entries(category).map(([key, value]) => (
                        <>
                          <strong className={styles.tit}>{value.title}</strong>
                          <div className={styles.filter_box}>
                            <OptionCard
                              cols={isMobile ? 2 : 4}
                              options={value.options}
                              multiple
                              value={selectedOptions.map((filter: any) => filter.value)}
                              onOptionsSelect={handleFilterChange}
                            />
                          </div>
                        </>
                      ))
                    }
                  </li>
                )
              })
            }
          </ul>
          {/*<div className={styles.look}>*/}
          {/*  <ChipList*/}
          {/*    options={selectedOptions}*/}
          {/*    className={styles.chip_list}*/}
          {/*    hideBorder*/}
          {/*    type="line"*/}
          {/*    size="sm"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className={styles.btn_reset}
          variant={'gray'}
          size={'lg'}
          onClick={handleClearFilter}
          label={t('초기화')}
        />
        <Button variant={'primary'} size={'lg'} onClick={handleCloseModal} label={t('적용')} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const CategoryFilterPopup = memo(FilterPopupComponent);
