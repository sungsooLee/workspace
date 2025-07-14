import { memo, useState } from 'react';
import { Button, useModal } from '@learnway/ui';
import { isMobile } from 'react-device-detect';
import {
  IcoArrowDown,
  IcoCalendar01,
  IcoLocation,
  IcoTime,
  IcoAvatar02,
  IcoTeacher,
  IcoMoney,
} from '@learnway/icons';
import { EducationPlacePopup } from '../../../features/layout';

import definitionListStyles from '../../../pages/_layout/course-introduction/definition-list.module.css';
import bulletStyles from '../../../shared/ui/list/bullet.module.css';
import styles from './education.module.css';

interface EducationProps {
  className?: string;
}

const EducationComponent = ({ className }: EducationProps) => {
  const { open: openModal } = useModal();
  const [detail, setDetail] = useState<boolean>();
  const [disabled, setDisabled] = useState(false); // 기간만료, 인원마감 등 case

  return (
    <div
      className={`${styles.start} ${styles.education} ${disabled === true ? styles.disabled : ''} ${styles.className}`}
    >
      <div className={styles.info_box}>
        <div className={styles.txt_box}>
          <div className={styles.box}>
            <span className={styles.date}>2026-01-01 ~ 2026-01-31</span>
            {isMobile && (
              <>
                <span className={styles.state}>2차</span>
                <span className={styles.label}>접수중</span>
              </>
            )}
          </div>
          <div className={styles.box}>
            <p>스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축</p>
          </div>
        </div>
        <div className={styles.btn_box}>
          <Button variant="primary" size="xl">
            수강 신청
          </Button>
          <Button variant="gray" size="xl">
            학습완료
          </Button>
          <Button variant="line" size="xl">
            수강 취소
          </Button>
          <Button variant="primary" size="xl" disabled>
            인원 마감
          </Button>
        </div>
      </div>
      <div className={styles.info_box}>
        <div className={styles.list}>
          <ul>
            <li>
              <IcoCalendar01 width={20} height={20} stroke="#4d525c" />
              <span>26-01-15 10:00 ~ 26-01-14 23:59</span>
            </li>
            <li>
              <IcoAvatar02 width={20} height={20} viewBox="0 0 24 24" fill="#4d525c" />
              <span>
                493 / 500 (잔여 <em>7</em>)
              </span>
            </li>
            <li>
              <IcoLocation width={20} height={20} stroke="#4d525c" />
              <span>온라인 비대면</span>
              <Button
                onClick={() =>
                  openModal({
                    width: isMobile ? 'm_full' : 'md',
                    content: <EducationPlacePopup />,
                  })
                }
              >
                약도보기
              </Button>
            </li>
            <li>
              <IcoTime width={20} height={20} fill="#4d525c" />
              <span>2시간 33분</span>
            </li>
          </ul>
          {/* 추가 list */}
          {detail === true ? (
            <div className={styles.more_list}>
              <ul>
                <li>
                  <IcoTeacher width={20} height={20} fill="#4d525c" />
                  <span>현대리 사외강사</span>
                </li>
                <li>
                  <IcoMoney width={20} height={20} fill="#4d525c" />
                  <span>2시간 33분</span>
                </li>
              </ul>
              <dl className={styles.full}>
                <dt>이수기준</dt>
                <dd>
                  <div className={styles.evaluation_box}>
                    <ul>
                      <li>
                        <span>총점(100%)</span>
                        <strong>70점 이상</strong>
                      </li>
                      <li>
                        <span>진도/출석(50%)</span>
                        <strong>70점 이상</strong>
                      </li>
                      <li>
                        <span>진행단계평가 (10%)</span>
                        <strong>70점 이상</strong>
                      </li>
                      <li>
                        <span>최종평가 (20%)</span>
                        <strong>70점 이상</strong>
                      </li>
                      <li>
                        <span>과제평가 (20%)</span>
                        <strong>70점 이상</strong>
                      </li>
                    </ul>
                    {/* bulletStyles */}
                    <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
                      <ul>
                        <li>항목의 이수기준을 교육기간 내 충족해야 수료 처리됩니다.</li>
                        <li>
                          최종평가, 과제평가가 있을 시 반드시 기한 내 제출해야 합니다. (단,
                          제출기회는 1회)
                        </li>
                        <li>과제물은 반드시 문서보안을 해제해 등록해야 평가가 가능합니다.</li>
                      </ul>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.btn_action}>
        <Button
          className={detail === true ? styles.active : ''}
          onClick={() => (detail === true ? setDetail(false) : setDetail(true))}
        >
          <span>{detail === true ? '닫기' : '자세히'}</span>
          <IcoArrowDown width={16} height={16} stroke="#131c30" />
        </Button>
      </div>
    </div>
  );
};

export const Education = memo(EducationComponent);
