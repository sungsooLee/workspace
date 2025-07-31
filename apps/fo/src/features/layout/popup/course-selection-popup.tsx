import { OptionCard, OptionCardItem } from '@learnway/ui/option-card';
import { memo, useState } from 'react';

import { IcoChair, IcoLocation } from '@learnway/icons';

import { ModalBody, ModalContainer, ModalFooter, ModalTitle } from '@learnway/ui/modal';
import {
  CourseFixedButton, // 수강신청 버튼
} from '../../../features/layout';

import styles from '@learnway/styles/fo/features/layout/popup/course-selection-popup.module.css';
import lectureStyles from '@learnway/styles/fo/pages/_layout/course-introduction/lecture.module.css';

const CourseSelectionPopupComponent = ({
  setParentCourseValues,
}: {
  setParentCourseValues?: any;
}) => {
  // 퍼블수정 20250703 초기값 추가 및 임의 날짜 데이터 수정
  const [courseValues, setCourseValues] = useState<string | undefined>(undefined);
  const courseOptions = [
    {
      label: '스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축',
      value: 'a',
      original: {
        number: '1차',
        date: '2026-01-15 ~ 2026-01-20',
        info: [
          {
            icon: IcoChair,
            txt: '999',
          },
          {
            icon: IcoLocation,
            txt: '온라인',
          },
        ],
      },
    },
    {
      label: '스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축',
      value: 'b',
      original: {
        number: '2차',
        date: '2026-01-15 ~ 2026-01-20',
        info: [
          {
            icon: IcoChair,
            txt: '999',
          },
          {
            icon: IcoLocation,
            txt: '온라인',
          },
        ],
      },
    },
  ];

  return (
    <ModalContainer>
      <ModalTitle>{'차수선택'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.course_selection}`}>
          {/* 강의 정보 */}
          <OptionCard
            cols={1}
            size="lg"
            value={courseValues}
            options={courseOptions}
            itemRenderer={({ label, original }: OptionCardItem, index: number) => (
              // lectureStyles module
              <div
                className={`${lectureStyles.start} ${lectureStyles.course_information} ${lectureStyles.course_option}`}
              >
                <div className={`${lectureStyles.box}`}>
                  <p className={lectureStyles.date}>
                    <span>{original?.date}</span>
                    <span>{original?.number}</span>
                  </p>
                  <strong className={lectureStyles.tit}>{label}</strong>
                </div>
                <div className={`${lectureStyles.box} `}>
                  {original.info.map((item: any, index: number) => (
                    <span key={index} className={`${lectureStyles.info}`}>
                      <item.icon width={20} height={20} />
                      {item.txt}
                    </span>
                  ))}
                </div>
              </div>
            )}
            onOptionSelect={(option: OptionCardItem) => {
              setCourseValues(option.value);
              setParentCourseValues(option.value);
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        {/* 찜/공유 수강신청 Button */}
        <CourseFixedButton course={true} courseValues={courseValues} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const CourseSelectionPopup = memo(CourseSelectionPopupComponent);
