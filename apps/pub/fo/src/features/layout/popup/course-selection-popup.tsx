import { memo, useState } from 'react';
import {
  OptionCard,
  OptionCardItem,
  ModalBody,
  ModalContainer,
  ModalTitle,
  ModalFooter,
  Button,
} from '@learnway/ui';
import { IcoHeart, IcoUser01, IcoShare, IcoStar } from '@learnway/icons';

import lectureStyles from '../../../pages/_layout/course-introduction/lecture.module.css';
import definitionListStyles from '../../../pages/_layout/course-introduction/definition-list.module.css';
import packageInformationStyles from '../../../pages/_layout/course-introduction/package-information.module.css';
import styles from './course-selection-popup.module.css';

const CourseSelectionPopupComponent = () => {
  // 찜
  const [heart, setHeart] = useState(false);

  const [courseValues, setCourseValues] = useState<string>();
  const courseOptions = [
    {
      label: '스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축',
      value: 'a',
      original: {
        number: '1차',
        date: '2026-01-15 ~ 2026-01-04',
        definitionList: [
          {
            tit: '잔여석',
            txt: '999',
          },
          {
            tit: '장소',
            txt: '온라인 비대면',
          },
        ],
      },
    },
    {
      label: '스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축',
      value: 'b',
      original: {
        number: '2차',
        date: '2026-01-15 ~ 2026-01-04',
        definitionList: [
          {
            tit: '잔여석',
            txt: '111',
          },
          {
            tit: '장소',
            txt: '온라인 비대면',
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
          <OptionCard
            className={packageInformationStyles.course_card}
            cols={1}
            size="lg"
            value={courseValues}
            options={courseOptions}
            itemRenderer={({ label, original }: OptionCardItem, index: number) => (
              // lectureStyles module
              <div
                className={`${lectureStyles.start} ${lectureStyles.course_information} ${lectureStyles.course_option}`}
              >
                <div className={`${lectureStyles.box} ${packageInformationStyles.box}`}>
                  <p className={lectureStyles.date}>
                    <span>{original?.number}</span>
                    <span>{original?.date}</span>
                  </p>
                  <strong className={lectureStyles.tit}>{label}</strong>
                </div>
                <div className={`${packageInformationStyles.box} ${styles.box}`}>
                  {/* definitionListStyles module */}
                  <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
                    {original.definitionList.map((item: any) => (
                      <dl>
                        <dt>{item.tit}</dt>
                        <dd>{item.txt}</dd>
                      </dl>
                    ))}
                  </div>
                </div>
              </div>
            )}
            onOptionSelect={(option: OptionCardItem) => setCourseValues(option.value)}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <div
          className={`${packageInformationStyles.start} ${packageInformationStyles.information}`}
        >
          <div
            className={`${packageInformationStyles.btn_box} ${packageInformationStyles.course_box}`}
          >
            <Button onClick={() => (heart === true ? setHeart(false) : setHeart(true))}>
              <IcoHeart
                width={20}
                height={20}
                stroke={heart === true ? '#ff4646' : '#4c515e'}
                fill={heart === true ? '#ff4646' : 'none'}
              />
            </Button>
            <Button>
              <IcoShare width={20} height={20} stroke="#4c515e" />
            </Button>
            <div className={packageInformationStyles.course}>
              <Button variant="primary">수강신청</Button>
            </div>
          </div>
        </div>
      </ModalFooter>
    </ModalContainer>
  );
};

export const CourseSelectionPopup = memo(CourseSelectionPopupComponent);
