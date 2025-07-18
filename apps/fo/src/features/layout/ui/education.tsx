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

import bulletStyles from '@learnway/styles/fo/shared/ui/list/bullet.module.css';
import styles from '@learnway/styles/fo/features/layout/ui/education.module.css';

interface EducationProps {
  className?: string;
  data?: any;
}

const EducationComponent = ({ className, data }: EducationProps) => {
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
            <span className={styles.date}>{data.startDate} ~ {data.endDate}</span>
            {isMobile && (
              <>
                <span className={styles.state}>2차</span>
                <span className={styles.label}>{data.state}</span>
              </>
            )}
          </div>
          <div className={styles.box}>
            <p>{data.name}</p>
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
              <span>{data.info.startTime} ~ {data.info.endTime}</span>
            </li>
            <li>
              <IcoAvatar02 width={20} height={20} viewBox="0 0 24 24" fill="#4d525c" />
              <span>
                {data.info.seats.current} / {data.info.seats.total} (잔여 <em>{data.info.seats.remaining}</em>)
              </span>
            </li>
            <li>
              <IcoLocation width={20} height={20} stroke="#4d525c" />
              <span>{data.info.location}</span>
              {data.info.address &&
              <Button
                onClick={() =>
                  openModal({
                    width: isMobile ? 'm_full' : 'md',
                    content: <EducationPlacePopup address={data.info.address} />,
                  })
                }
              >
                약도보기
              </Button>}
            </li>
            <li>
              <IcoTime width={20} height={20} fill="#4d525c" />
              <span>{data.info.duration}</span>
            </li>
          </ul>
          {/* 추가 list */}
          {detail === true ? (
            <div className={styles.more_list}>
              <ul>
                <li>
                  <IcoTeacher width={20} height={20} fill="#4d525c" />
                  <span>{data.info.teacher}</span>
                </li>
                <li>
                  <IcoMoney width={20} height={20} fill="#4d525c" />
                  <span>{data.info.price}</span>
                </li>
              </ul>
              {data.completionCriteria && 
                <dl className={styles.full}>
                  <dt>이수기준</dt>
                  <dd>
                    <div className={styles.evaluation_box}>
                      <ul>
                        {data.completionCriteria.scores.map((i: any) => (
                          <li>
                            <span>{i.title}</span>
                            <strong>{i.attendance}</strong>
                          </li>
                        ))}
                      </ul>
                      {/* bulletStyles */}
                      <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
                        <ul>
                          {data.completionCriteria.description.map((i: any) => (
                            <li>{i.text}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </dd>
                </dl>
              }
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
