import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Button, Popover } from '@learnway/ui';
import { IcoArrowDown, IcoFormRequired } from '@learnway/icons';
import { Arrays, Education } from '../../../../features/layout';

import dropdownPopoverStyles from '../../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import styles from './education.module.css';

const CourseEducationCompoment = () => {
  // 소팅 조건
  const arrays = {
    items: ['수강신청만', '전체보기'],
    initialSelectedItem: 0, // 초기 선택값
  };

  // 교육일정 년도별 보기 popover
  const DropdownPopoverCompoment = () => {
    return (
      <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
        <Button>년도별 보기1</Button>
        <Button>년도별 보기2</Button>
        <Button>년도별 보기3</Button>
        <Button>년도별 보기444444444</Button>
      </div>
    );
  };

  // 교육일정 더보기 버튼
  const [btnEducation, setBtnEducation] = useState<boolean>(false);

  return (
    <div className={`${styles.start} ${styles.education_wrap}`}>
      <h2>교육일정</h2>
      <div className={styles.filter_wrap}>
        {isMobile ? '' : <span className={styles.date}>2026년</span>}
        <div className={styles.filter}>
          <Arrays arraysData={arrays} className={styles.array}></Arrays>
          {/* dropdownpopover module */}
          {isMobile ? (
            ''
          ) : (
            <Popover
              className={`${dropdownPopoverStyles.btn} ${dropdownPopoverStyles.text} ${styles.drop_btn}`}
              popoverContent={<DropdownPopoverCompoment />}
              side="bottom"
              align="end"
              sideOffset={5}
            >
              <span>{'년도별 보기'}</span>
              <IcoArrowDown width={16} height={16} stroke="#131C30" />
            </Popover>
          )}
        </div>
      </div>
      <div className={styles.education_box}>
        <ul>
          <li>
            <Education />
          </li>
          <li>
            <Education />
          </li>
          <li>
            <Education />
          </li>
          <li>
            <Education />
          </li>
        </ul>
        {/* 더보기 */}
        <div className={styles.more_box}>
          <Button
            className={`${styles.btn_more} ${btnEducation === true ? styles.active : ''}`}
            onClick={() => (btnEducation === true ? setBtnEducation(false) : setBtnEducation(true))}
          >
            <span>{btnEducation === true ? '접기' : '더보기'}</span>
            <IcoArrowDown width={16} height={16} stroke="#6f798b" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CourseEducation = memo(CourseEducationCompoment);
