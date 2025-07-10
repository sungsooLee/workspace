import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Button, Popover } from '@learnway/ui';
import { IcoArrowDown } from '@learnway/icons';
import { Arrays, Education } from '../../../../features/layout';

import dropdownPopoverStyles from '../../../../shared/ui/dropdown-popover/dropdown-popover.module.css';
import styles from './education.module.css';

const CourseEducationCompoment = () => {
  // 소팅 조건
  const arrays = {
    items: ['수강신청 가능', '전체보기'],
    initialSelectedItem: 0, // 초기 선택값
  };

  // 교육일정 년도별 보기 popover
  const DropdownPopoverCompoment = () => {
    return (
      <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
        <Button>2025년</Button>
        <Button>2024년</Button>
        <Button>2023년</Button>
      </div>
    );
  };

  // 교육일정 더보기
  const [more, setMore] = useState<boolean>(false);

  return (
    <div className={`${styles.start} ${styles.education_wrap}`}>
      <h2>교육일정</h2>
      {/* 퍼블수정 20250708 마크업 수정 */}
      <div className={styles.filter_wrap}>
        <Popover
          className={`${dropdownPopoverStyles.btn} ${dropdownPopoverStyles.text} ${styles.drop_btn}`}
          popoverContent={<DropdownPopoverCompoment />}
          side="bottom"
          align="start"
          sideOffset={5}
        >
          <span>{'2025년'}</span>
          <IcoArrowDown width={16} height={16} stroke="#131C30" />
        </Popover>
        <div className={styles.filter}>
          <Arrays arraysData={arrays} className={styles.array}></Arrays>
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
        </ul>

        {/* 교육일정 접기/펼치기 */}
        <div className={styles.btn_more}>
          <Button
            onClick={() => setMore((prev) => !prev)}
            className={more && true ? styles.active : ''}
          >
            {more === true ? '과정 정보 접기' : '과정 정보 펼치기'}
            <IcoArrowDown width={16} height={16} stroke="#4d525c" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CourseEducation = memo(CourseEducationCompoment);
