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
import { CourseCancelReasonPopup, EducationPlacePopup } from '../../../features/layout';

import bulletStyles from '@learnway/styles/fo/shared/ui/list/bullet.module.css';
import styles from '@learnway/styles/fo/features/layout/ui/education.module.css';
import {
  // useCourseEnroll,
  useCourseEnrollCancle,
  useCourseEnrollWaiting,
  useCourseEnrollWaitingCancle,
  useCourseLike,
} from '@entities/course';

interface EducationProps {
  className?: string;
  edu?: any;
  courseEnrollCompletePopup?: () => void;
  CourseCancelCompletePopup?: () => void;
}

const EducationComponent = ({
  className,
  edu,
  courseEnrollCompletePopup,
  CourseCancelCompletePopup,
}: EducationProps) => {
  const { openModal } = useModal();
  const { confirm: openConfirm } = useModal();
  const { alert: openAlert } = useModal();
  const { closeModal } = useModal();

  const [detail, setDetail] = useState<boolean>();
  const [disabled, setDisabled] = useState(false); // 기간만료, 인원마감 등 case

  // 수강 신청하기
  // const { enrollRequest } = useCourseEnroll({
  //   onSuccess: (data: any) => {
  //     console.log('data121212', data);
  //     if (data.code === 200) courseEnrollCompletePopup && courseEnrollCompletePopup();
  //   },
  // });
  // 수강 취소하기
  const { enrollCancleRequest } = useCourseEnrollCancle({
    onSuccess: (data: any) => {
      console.log('data12121221344231', data);
      if (data.code === 200) CourseCancelCompletePopup && CourseCancelCompletePopup();
    },
  });
  // 수강대기 하기
  const { enrollWaitingRequest } = useCourseEnrollWaiting({
    onSuccess: (data: any) => {
      console.log('data121212', data);
      if (data.code === 200) courseEnrollCompletePopup && courseEnrollCompletePopup();
    },
  });
  // 수강대기 취소하기
  const { enrollWaitingCancleRequest } = useCourseEnrollWaitingCancle({
    onSuccess: (data: any) => {
      console.log('data121212', data);
      if (data.code === 200) courseEnrollCompletePopup && courseEnrollCompletePopup();
    },
  });
  // 찜하기
  const { courseLikeRequest } = useCourseLike({
    onSuccess: (data: any) => {
      console.log('data121212', data);
      if (data.code === 200) courseEnrollCompletePopup && courseEnrollCompletePopup();
    },
  });

  const handleCourseCancelReason = () => {
    console.log('넘어와');

    setTimeout(() => {
      openModal({
        content: (
          <CourseCancelReasonPopup
            okCallback={handleEnrollCancleRequest}
            closeCallback={closeModal}
          />
        ),
      });
    }, 50);
  };

  // 수강신청 취소 신청
  const handleCourseCancelConfirm = () => {
    openConfirm({
      title: '수강 신청을 취소하시겠습니까?',
      content: (
        <>
          지금 취소하실 경우,
          <br />
          다시 수강신청을 해주셔야 합니다.
        </>
      ),
      okButtonLabel: '확인',
      cancelButtonLabel: '아니요',
      onClose: (value: boolean) => {
        console.log('####', value);
        // closeModal();
        if (value) {
          handleCourseCancelReason();
        }
      },
    });
  };

  // 수강 신청하기
  // const handleEnrollRequest = () => {
  //   console.log('1');

  //   enrollRequest({ courseId: '111111' });

  //   // if (courseEnrollCompletePopup) courseEnrollCompletePopup();
  // };

  // 수강 취소하기
  const handleEnrollCancle = () => {
    handleCourseCancelConfirm();
  };
  const handleEnrollCancleRequest = (reason: string) => {
    console.log('1', reason);

    enrollCancleRequest({ courseId: '111111', cancelReason: reason });

    // if (courseEnrollCompletePopup) courseEnrollCompletePopup();
  };

  // 수강대기 하기
  const handleEnrollWaitingRequest = () => {
    console.log('1');

    enrollWaitingRequest({ courseId: '111111' });

    // if (courseEnrollCompletePopup) courseEnrollCompletePopup();
  };

  // 수강대기 취소하기
  const handleEnrollWaitingCancleRequest = () => {
    console.log('1');

    enrollWaitingCancleRequest({ courseId: '111111' });

    // if (courseEnrollCompletePopup) courseEnrollCompletePopup();
  };

  return (
    <div
      className={`${styles.start} ${styles.education} ${disabled === true ? styles.disabled : ''} ${className || ''}`}
    >
      <div className={styles.info_box}>
        <div className={styles.txt_box}>
          <div className={styles.box}>
            <span className={styles.date}>
              {edu.startDate} ~ {edu.endDate}
            </span>
            {isMobile && (
              <>
                <span className={styles.state}>2차</span>
                <span className={styles.label}>{edu.state}</span>
              </>
            )}
          </div>
          <div className={styles.box}>
            <p>{edu.name}</p>
          </div>
        </div>
        <div className={styles.btn_box}>
          {/* 파란버튼 */}
          {/* <Button variant="primary" size="xl">
            수강 신청
          </Button> */}
          {/* 흰색흑백버튼 */}
          {/* <Button variant="gray" size="xl">
            학습완료
          </Button> */}
          {/* 흰색파란버튼 */}
          {/* <Button variant="line" size="xl">
            수강 취소
          </Button> */}
          {/* 비활성 */}
          {/* <Button variant="primary" size="xl" disabled>
            인원 마감
          </Button> */}

          {/* 수강개설 알림 신청 - 250718 알림기능 미오픈으로 추후로 미룸*/}
          {/* 수강신청 - 수강하기 */}
          <Button
            variant="primary"
            size="xl"
            onClick={() => {
              window.alert('수강신청 페이지 이동');
            }}
          >
            수강 신청
          </Button>
          <br />
          {/* 수강취소 - 사유입력 - 신청완료 */}
          <Button variant="line" size="xl" onClick={handleCourseCancelConfirm}>
            수강 취소
          </Button>
          <br />
          {/* 수강대기 신청 - 잔여석 0자리일때 신청 */}
          <Button variant="line" size="xl" onClick={handleEnrollWaitingRequest}>
            수강대기 신청
          </Button>
          <br />
          {/* 수강대기 신청 취소 - 잔여석 0자리일때 신청 */}
          <Button variant="gray" size="xl" onClick={handleEnrollWaitingCancleRequest}>
            수강대기 취소
          </Button>
          <br />
          {/* 수강신청 불가 팝업 - */}
          <Button variant="line" size="xl">
            수강 신청 - 불가
          </Button>
          <br />
          {/* 학습하기 - 학습중,학습하기,학습완료,이수,미이수 모두 강의실로 이동 / 학습완료 중 복습가능,불가능 따라 스타일은 두개 */}
          <Button variant="primary" size="xl">
            학습중
          </Button>
        </div>
      </div>
      <div className={styles.info_box}>
        <div className={styles.list}>
          <ul>
            <li>
              <IcoCalendar01 width={20} height={20} stroke="#4d525c" />
              <span>
                {edu.info.startTime} ~ {edu.info.endTime}
              </span>
            </li>
            <li>
              <IcoAvatar02 width={20} height={20} viewBox="0 0 24 24" fill="#4d525c" />
              <span>
                {edu.info.seats.current} / {edu.info.seats.total} (잔여{' '}
                <em>{edu.info.seats.remaining}</em>)
              </span>
            </li>
            <li>
              <IcoLocation width={20} height={20} stroke="#4d525c" />
              <span>{edu.info.location}</span>
              {edu.info.address && (
                <Button
                  onClick={() =>
                    openModal({
                      width: isMobile ? 'm_full' : 'md',
                      content: <EducationPlacePopup address={edu.info.address} />,
                    })
                  }
                >
                  약도보기
                </Button>
              )}
            </li>
            <li>
              <IcoTime width={20} height={20} fill="#4d525c" />
              <span>{edu.info.duration}</span>
            </li>
          </ul>
          {/* 추가 list */}
          {detail === true ? (
            <div className={styles.more_list}>
              <ul>
                <li>
                  <IcoTeacher width={20} height={20} fill="#4d525c" />
                  <span>{edu.info.teacher}</span>
                </li>
                <li>
                  <IcoMoney width={20} height={20} fill="#4d525c" />
                  <span>{edu.info.price}</span>
                </li>
              </ul>
              {edu.completionCriteria && (
                <dl className={styles.full}>
                  <dt>이수기준</dt>
                  <dd>
                    <div className={styles.evaluation_box}>
                      <ul>
                        {edu.completionCriteria.scores.map((i: any) => (
                          <li>
                            <span>{i.title}</span>
                            <strong>{i.attendance}</strong>
                          </li>
                        ))}
                      </ul>
                      {/* bulletStyles */}
                      <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
                        <ul>
                          {edu.completionCriteria.description.map((i: any) => (
                            <li>{i.text}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </dd>
                </dl>
              )}
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
