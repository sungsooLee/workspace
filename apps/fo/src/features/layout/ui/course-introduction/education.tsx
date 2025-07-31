import { IcoArrowDown } from '@learnway/icons';
import { Popover } from '@learnway/ui/popover';
import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Arrays, Education } from '../../../../features/layout/';

import styles from '@learnway/styles/fo/features/layout/ui/course-introduction/education.module.css';
import dropdownPopoverStyles from '@learnway/styles/fo/shared/ui/dropdown-popover/dropdown-popover.module.css';
import { Button } from '@learnway/ui/button';
import { Dropdown } from '@learnway/ui/dropdown';

const CourseEducationCompoment = ({ educations }: { educations: any }) => {
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

  // mobile 년도별 보기 dropdown
  const [dateValues, setDateValues] = useState<string[]>(['2025']);
  const dateValuesOptions = [
    { value: 'option1', label: '2025' },
    { value: 'option2', label: '2024' },
    { value: 'option3', label: '2023' },
  ];

  // 교육일정 더보기
  const [more, setMore] = useState<boolean>(false);

  return (
    <div className={`${styles.start} ${styles.education_wrap}`}>
      <h2>교육일정</h2>
      {/* 퍼블수정 20250708 마크업 수정 */}
      <div className={styles.filter_wrap}>
        {isMobile ? (
          <strong className={styles.date}>2026년</strong>
        ) : (
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
        )}

        <div className={styles.filter}>
          <Arrays arraysData={arrays} className={styles.array}></Arrays>
        </div>
      </div>
      {isMobile && (
        <Dropdown
          className={styles.date_drop}
          options={dateValuesOptions}
          value={dateValues}
          onChange={(selected) => setDateValues(selected)}
          placeholder="년도별 옵션"
          variant="default"
          isMulti={false}
          size={'md'}
        />
      )}
      <div className={styles.education_box}>
        <ul>
          {educations.classes.map((edu: any) => (
            <li>
              <Education edu={edu} />
            </li>
          ))}
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
