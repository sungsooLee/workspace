import { OptionCard, OptionCardItem } from '@learnway/ui/option-card';
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
}

const FilterPopupComponent = ({ filterCodes, initialFilters }: FilterPopupComponentProps) => {
  const exceptValue = [ 'ELEARNING1', 'LIVE', 'SURVEY' ]

  const { closeModal } = useModal();
  const [lectureFilter, setLectureFilter] = useState(filterCodes.lectureType);
  const [enrollmentFilter, setEnrollmentFilter] = useState(filterCodes.enrollment);
  const [difficultyFilter, setDifficultyFilter] = useState(filterCodes.difficulty);
  const [languageFilter, setLanguageFilter] = useState(filterCodes.language);
  const [isShowEnrollment, setIsShowEnrollment] = useState(true);

  const handleLectureFilter = (selected: any) => {
    const checkValue = selected.map((d: OptionCardItem) => d.value).filter((item: any) => exceptValue.includes(item))
    if( checkValue && checkValue.length > 0 ) {
      setIsShowEnrollment(false)
    } else {
      setIsShowEnrollment(true)
    }
    setLectureFilter(selected.map((d: OptionCardItem) => d.value))
  }

  const handleClearFilter = () => {
    setLectureFilter([])
    setEnrollmentFilter([])
    setDifficultyFilter([])
    setLanguageFilter([])
  }
  const handleCloseModal = () => {
    const selectedOptions: any[] = []
    Object.values(filterCodes).flat().forEach((item: any) => {
      if( lectureFilter.includes(item.value) || difficultyFilter.includes(item.value)
          || enrollmentFilter.includes(item.value) || languageFilter.includes(item.value)) {
        selectedOptions.push(item)
      }
    })
    closeModal(selectedOptions)
  }

  useEffect(() => {
    if(initialFilters && initialFilters.length > 0) {
      const init = initialFilters.map((filter: any) => filter.value);
      const check = init.filter((item: any) => exceptValue.includes(item));
      if( check && check.length > 0 ) setIsShowEnrollment(false)
      setLectureFilter(initialFilters.map((filter: any) => filter.value))
    }
  }, [initialFilters]);

  return (
    <ModalContainer>
      <ModalTitle>{t('필터')}</ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          <ul className={styles.filter_wrap}>
            <li>
              <strong className={styles.tit}>{t('과정 유형')}</strong>
              <div className={styles.filter_box}>
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filterCodes.lectureType}
                  multiple
                  value={lectureFilter}
                  onOptionsSelect={handleLectureFilter}
                />
              </div>
            </li>
            {
              isShowEnrollment && (
                <li>
                  <strong className={styles.tit}>{t('수강 신청')}</strong>
                  <div className={styles.filter_box}>
                    <OptionCard
                      cols={isMobile ? 2 : 4}
                      options={filterCodes.enrollment}
                      multiple
                      value={enrollmentFilter}
                      onOptionsSelect={(options: OptionCardItem[]) =>
                        setEnrollmentFilter(options.map((d: OptionCardItem) => d.value))
                      }
                    />
                  </div>
                </li>
              )
            }
            <li>
              <strong className={styles.tit}>{t('난이도')}</strong>
              <div className={styles.filter_box}>
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filterCodes.difficulty}
                  multiple
                  value={difficultyFilter}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setDifficultyFilter(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>
            <li>
              <strong className={styles.tit}>{t('언어')}</strong>
              <div className={styles.filter_box}>
                <OptionCard
                  cols={isMobile ? 2 : 4}
                  options={filterCodes.language}
                  multiple
                  value={languageFilter}
                  onOptionsSelect={(options: OptionCardItem[]) =>
                    setLanguageFilter(options.map((d: OptionCardItem) => d.value))
                  }
                />
              </div>
            </li>
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
