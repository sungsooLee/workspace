import {
  IcoArrowDown,
  IcoAvatar02,
  IcoCalendar01,
  IcoLocation,
  IcoMoney,
  IcoTeacher,
  IcoTime,
} from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { CourseCancelReasonPopup, EducationPlacePopup } from '../../../features/layout';

import { useCourseEnrollWaiting, useCourseEnrollWaitingCancle } from '@entities/course';
import { useDeleteCourseApplication } from '@entities/enroll';
import { DATE_TIME_FORMAT, formatISODateString } from '@learnway/shared';
import styles from '@learnway/styles/fo/features/layout/ui/education.module.css';
import bulletStyles from '@learnway/styles/fo/shared/ui/list/bullet.module.css';
import { useModalStore } from '@learnway/ui/stores';
import { useNavigate } from '@tanstack/react-router';
import { InstructorType, InstructorTypeLabel } from '@types';

interface EducationProps {
  className?: string;
  edu?: any;
  courseEnrollCompletePopup?: () => void;
  CourseCancelCompletePopup?: () => void;
  dashboardRef?: any;
  goToScrollRef?: any;
  handleTab?: any;
}

const EducationComponent = ({
  className,
  edu,
  courseEnrollCompletePopup,
  CourseCancelCompletePopup,
  dashboardRef,
  goToScrollRef,
  handleTab,
}: EducationProps) => {
  const navigate = useNavigate();

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
  // const { enrollCancleRequest } = useCourseEnrollCancle({
  //   onSuccess: (data: any) => {
  //     console.log('data12121221344231', data);
  //     if (data.code === 200) CourseCancelCompletePopup && CourseCancelCompletePopup();
  //   },
  // });

  const {
    deleteCourseApplication,
    mutate: deleteEnrollMutate,
    isPending: isDeleteEnrollPending,
  } = useDeleteCourseApplication();
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

  // 수강신청 취소 사유 입력 팝업 - confirm팝업 통해서 접근
  const handleCourseCancelReason = () => {
    // console.log('취소이유');
    const openNextReasonModal = () => {
      const currentState = useModalStore.getState();
      if (currentState.modals.length === 0) {
        openModal({
          content: (
            <CourseCancelReasonPopup
              okCallback={handleEnrollCancleRequest}
              closeCallback={closeModal}
            />
          ),
        });
      } else {
        setTimeout(openNextReasonModal, 10);
      }
    };

    openNextReasonModal();
  };

  // 수강신청 취소 신청 confirm 팝업
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
        // closeModal();
        if (value) {
          handleCourseCancelReason();
        }
      },
    });
  };

  // 수강 취소 데이터 전송하기
  const handleEnrollCancleRequest = async (reason: string) => {
    if (isDeleteEnrollPending) return;

    console.log('1', edu.courseSequenceId, reason);

    // return;

    await deleteEnrollMutate(
      { courseSequenceId: edu.courseSequenceId, approvalReason: reason },
      {
        onSuccess: () => {
          console.log('취소되었습니다');
          openAlert({
            title: '수강취소 되었습니다',
          });
        },
        onError: () => {
          console.log('취소 에러입니다');
          openAlert({
            title: '수강취소 ERROR',
          });
        },
      },
    );

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
              {formatISODateString(edu.learningStartDateTime, DATE_TIME_FORMAT.DATE)} ~{' '}
              {formatISODateString(edu.learningEndDateTime, DATE_TIME_FORMAT.DATE)}
            </span>
            {/* {isMobile && (
              <>
                <span className={styles.state}>2차</span>
                <span className={styles.label}>{edu.state}</span>
              </>
            )} */}
          </div>
          <div className={styles.box}>
            <p>{edu.courseSequenceName}</p>
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
              const sendData = { courseSequenceId: edu.courseSequenceId };
              navigate({ to: '/course/registration', state: sendData });
            }}
          >
            수강 신청
          </Button>
          {/* <br /> */}
          {/* 수강취소 - 사유입력 - 신청완료 */}
          <Button variant="line" size="xl" onClick={handleCourseCancelConfirm}>
            수강 취소
          </Button>
          {/* <br /> */}
          {/* 수강대기 신청 - 잔여석 0자리일때 신청 */}
          {/* <Button variant="line" size="xl" onClick={handleEnrollWaitingRequest}>
            수강대기 신청
          </Button> */}
          {/* <br /> */}
          {/* 수강대기 신청 취소 - 잔여석 0자리일때 신청 */}
          {/* <Button variant="gray" size="xl" onClick={handleEnrollWaitingCancleRequest}>
            수강대기 취소
          </Button> */}
          {/* <br /> */}
          {/* 수강신청 불가 팝업 - */}
          {/* <Button variant="line" size="xl">
            수강 신청 - 불가
          </Button> */}
          {/* <br /> */}
          {/* 학습하기 - 학습중,학습하기,학습완료,이수,미이수 모두 강의실로 이동 / 학습완료 중 복습가능,불가능 따라 스타일은 두개 */}
          <Button
            variant="primary"
            size="xl"
            onClick={() => {
              handleTab('0', 0);
              goToScrollRef(dashboardRef);
            }}
          >
            학습하기
          </Button>
        </div>
      </div>
      <div className={styles.info_box}>
        <div className={styles.list}>
          <ul>
            <li>
              <IcoCalendar01 width={20} height={20} stroke="#4d525c" />
              <span>
                {formatISODateString(edu.enrollStartDateTime, DATE_TIME_FORMAT.DATE)} ~
                {formatISODateString(edu.enrollEndDateTime, DATE_TIME_FORMAT.DATE)}
              </span>
            </li>
            <li>
              <IcoAvatar02 width={20} height={20} viewBox="0 0 24 24" fill="#4d525c" />
              <span>
                {edu.enrollCount || 0} / {edu.maxEnrollQuota} (잔여{' '}
                <em>{edu.maxEnrollQuota - edu.enrollCount}</em>)
              </span>
            </li>
            <li>
              <IcoLocation width={20} height={20} stroke="#4d525c" />
              <span>{edu.learningSpaceNameKeyIn}</span>
              {edu.learningSpaceEntity?.address && (
                <Button
                  onClick={() =>
                    openModal({
                      width: isMobile ? 'm_full' : 'md',
                      content: (
                        <EducationPlacePopup
                          address={{
                            postalCode: edu.learningSpaceEntity?.postalCode,
                            roadAddress: edu.learningSpaceEntity?.address,
                          }}
                          addressName={edu.learningSpaceEntity?.learningSpaceName}
                        />
                      ),
                    })
                  }
                >
                  약도보기
                </Button>
              )}
            </li>
            <li>
              <IcoTime width={20} height={20} fill="#4d525c" />
              {/* <span>{edu.info.duration}</span> */}
              <span>00</span>
            </li>
          </ul>
          {/* 추가 list */}
          {detail === true ? (
            <div className={styles.more_list}>
              <ul>
                <li>
                  <IcoTeacher width={20} height={20} fill="#4d525c" />
                  <span>
                    {edu.instructorName}{' '}
                    {InstructorTypeLabel[edu.instructorType as InstructorType] || ''}
                  </span>
                </li>
                <li>
                  <IcoMoney width={20} height={20} fill="#4d525c" />
                  <span>1인당 {edu.trainingCostPerPerson}원</span>
                </li>
              </ul>
              <dl className={styles.full}>
                <dt>이수기준</dt>
                <dd>
                  <div className={styles.evaluation_box}>
                    <ul>
                      {/* {edu.completionCriteria.scores.map((i: any) => (
                        <li>
                          <span>{i.title}</span>
                          <strong>{i.attendance}</strong>
                        </li>
                      ))} */}
                      <li>
                        <span>총점({edu.title}%)</span>
                        <strong>{edu.attendance}점 이상</strong>
                      </li>
                      <li>
                        <span>진도({edu.progressWeights}%)</span>
                        <strong>{edu.progressMinPassScore}점 이상</strong>
                      </li>
                      <li>
                        <span>출석({edu.attendanceWeights}%)</span>
                        <strong>{edu.attendanceMinPassScore}점 이상</strong>
                      </li>
                      <li>
                        <span>평가({edu.examWeights}%)</span>
                        <strong>{edu.examMinPassScore}점 이상</strong>
                      </li>
                      <li>
                        <span>과제({edu.asgmtWeights}%)</span>
                        <strong>{edu.asgmtMinPassScore}점 이상</strong>
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
