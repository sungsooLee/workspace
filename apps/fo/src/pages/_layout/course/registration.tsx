import { IcoAvatar02, IcoCalendar01, IcoLocation, IcoTime } from '@learnway/icons';
import { formatMinutesToHours } from '@learnway/shared';
import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';

import { useCourseSequenceOne } from '@entities/course';
import { FormSection } from '@features/course';
import { EducationPlacePopup } from '@features/layout';
import educationStyles from '@learnway/styles/fo/pages/_layout/course/education.module.css';
import styles from '@learnway/styles/fo/pages/_layout/course/registration.module.css';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { Address } from '@types';
import dayjs from 'dayjs';
import { useSearchParam } from 'react-use';
export const Route = createFileRoute('/_layout/course/registration')({
  component: RouteComponent,
});

type COURSE_REGISTRATION_FORMAT = 'ALL' | 'LEVEL_TEST' | 'TEXTBOOK';

function RouteComponent() {
  const { openModal, alert: openAlert, confirm: openConfirm } = useModal();
  const path = useSearchParam('format');
  const DEFAULT_COURSE_REGISTRATION_FORMAT = 'ALL';
  const currentCourseRegistrationFormat =
    (path as COURSE_REGISTRATION_FORMAT) || DEFAULT_COURSE_REGISTRATION_FORMAT;

  const routerState = useRouterState();
  const { courseSequenceId } = routerState.location.state;
  const { data } = useCourseSequenceOne(courseSequenceId);

  const address: Address = {
    detail: '루첸빌딩 지하 1층',
    roadAddress: '서울시 강남구 테헤란로 510',
    postalCode: '12345',
  };

  return (
    <div className={`${styles.start} ${styles.course}`}>
      <h2>수강신청</h2>

      {/* 수강신청 정보 */}
      {data && (
        <div
          className={`${educationStyles.start} ${educationStyles.education} ${styles.education}`}
        >
          <div className={educationStyles.info_box}>
            <div className={educationStyles.txt_box}>
              <div className={educationStyles.box}>
                <span
                  className={educationStyles.date}
                >{`${dayjs(data.learningStartDateTime).format('YYYY-MM-DD')} ~ ${dayjs(data.learningEndDateTime).format('YYYY-MM-DD')}`}</span>
              </div>
              <div className={educationStyles.box}>
                <p>{data.courseSequenceName}</p>
              </div>
            </div>
          </div>
          {isMobile || (
            <div className={educationStyles.info_box}>
              <div className={educationStyles.list}>
                <ul>
                  <li>
                    <IcoCalendar01 width={20} height={20} stroke="#4d525c" />
                    <span>{`${dayjs(data.enrollStartDateTime).format('YYYY-MM-DD HH:mm')} ~ ${dayjs(data.enrollEndDateTime).format('YYYY-MM-DD HH:mm')}`}</span>
                  </li>
                  <li>
                    <IcoAvatar02 width={20} height={20} viewBox="0 0 24 24" fill="#4d525c" />
                    <span>
                      {data?.enrollCount ?? 0} / {data?.maxEnrollQuota ?? 0} (잔여{' '}
                      <em>{data?.maxEnrollQuota ?? 0}</em>)
                    </span>
                  </li>
                  {/* 시간이 없을 시 클래스 educationStyles.full 추가 */}
                  <li>
                    <IcoLocation width={20} height={20} stroke="#4d525c" />
                    <span>온라인 비대면</span>
                    <Button
                      onClick={() =>
                        openModal({
                          width: isMobile ? 'm_full' : 'md',
                          content: <EducationPlacePopup address={address} />,
                        })
                      }
                    >
                      약도보기
                    </Button>
                  </li>
                  <li>
                    <IcoTime width={20} height={20} fill="#4d525c" />
                    <span>{formatMinutesToHours(data?.recognizedStudyMinutes ?? 0)}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 입력정보 */}
      <FormSection
        courseSequenceId={courseSequenceId}
        currentCourseRegistrationFormat={currentCourseRegistrationFormat}
      />
    </div>
  );
}
