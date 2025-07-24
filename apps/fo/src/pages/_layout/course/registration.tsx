import { createFileRoute } from '@tanstack/react-router';
import { Button, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { IcoCaution, IcoLocation, IcoCalendar01, IcoAvatar02, IcoTime } from '@learnway/icons';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';
import { isMobile } from 'react-device-detect';

import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';

import educationStyles from '@learnway/styles/fo/pages/_layout/course/education.module.css';
import styles from '@learnway/styles/fo/pages/_layout/course/registration.module.css';
import { useCreateSingleCourseApplicationQueue } from '@entities/enroll';
import { LangLevelTest } from '@types';
import { EducationPlacePopup } from '@shared/ui';
import { PreLevelTest, TextbookDeliveryAddress } from '@features/course';
import { useMemo } from 'react';
import { useSearchParam } from 'react-use';
export const Route = createFileRoute('/_layout/course/registration')({
  component: RouteComponent,
});

type COURSE_REGISTRATION_FORMAT = 'ALL' | 'LEVEL_TEST' | 'TEXTBOOK';

function RouteComponent() {
  const { open: openModal, alert: openAlert } = useModal();
  const path = useSearchParam('format');
  const DEFAULT_COURSE_REGISTRATION_FORMAT = 'ALL';
  const currentCourseRegistrationFormat =
    (path as COURSE_REGISTRATION_FORMAT) || DEFAULT_COURSE_REGISTRATION_FORMAT;

  const isShowLevelTest = useMemo(
    () => ['ALL', 'LEVEL_TEST'].includes(currentCourseRegistrationFormat),
    [currentCourseRegistrationFormat],
  );

  const isShowTextbook = useMemo(
    () => ['ALL', 'TEXTBOOK'].includes(currentCourseRegistrationFormat),
    [currentCourseRegistrationFormat],
  );

  const alert = () => {
    openAlert({
      title: <>날짜를 선택해주세요</>,
      content: (
        <>
          사전 레벨테스트는 전화로 진행됩니다
          <br />
          전화통화 가능한 날짜를 선택해주세요
        </>
      ),
    });
  };

  // const courseSequenceUuid = '';
  // const bookDeliveryInfo: BookDeliveryInfo = {
  //   recipientName: '김지훈',
  //   countryCode: '+82',
  //   telNo: '01011111111',
  //   postalCode: '06123',
  //   address: '서울 강남구 테헤란로 5길 7 위워크',
  //   addressDetail: '10층 빅데이터기술팀 김지훈',
  // };

  // const { mutateAsync: createSingleCourseApplicationQueue } = useCreateSingleCourseApplicationQueue(
  //   { courseSequenceUuid, additionalInfo: { bookDeliveryInfo } },
  // );

  const courseSequenceUuid = '798873e6-36a8-4542-bfad-7ee8e46455f0';
  const langLevelTest: LangLevelTest = {
    familyName: 'Kim',
    firstName: 'Ji Hun',
    countryCode: '+82',
    telNo: '01011111111',
    preferGender: 'FEMALE',
    availableTestDate1: '2025-07-21T07:51:26.236Z',
    availableTestDate2: '2025-07-21T07:51:26.236Z',
    preferLearnDate1: '2025-07-21T07:51:26.236Z',
    preferLearnDate2: '2025-07-21T07:51:26.236Z',
  };

  const { mutateAsync: createSingleCourseApplicationQueue } = useCreateSingleCourseApplicationQueue(
    { courseSequenceUuid, additionalInfo: { langLevelTest } },
  );

  const submit = async () => {
    await createSingleCourseApplicationQueue();
  };

  return (
    <div className={`${styles.start} ${styles.course}`}>
      <h2>수강신청</h2>

      {/* 수강신청 정보 */}
      <div className={`${educationStyles.start} ${educationStyles.education} ${styles.education}`}>
        <div className={educationStyles.info_box}>
          <div className={educationStyles.txt_box}>
            <div className={educationStyles.box}>
              <span className={educationStyles.date}>2026-01-01 ~ 2026-01-31</span>
            </div>
            <div className={educationStyles.box}>
              <p>스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축</p>
            </div>
          </div>
        </div>
        {isMobile || (
          <div className={educationStyles.info_box}>
            <div className={educationStyles.list}>
              <ul>
                <li>
                  <IcoCalendar01 width={20} height={20} stroke="#4d525c" />
                  <span>25-01-15 10:00 ~ 26-01-14 23:59</span>
                </li>
                <li>
                  <IcoAvatar02 width={20} height={20} viewBox="0 0 24 24" fill="#4d525c" />
                  <span>
                    493 / 500 (잔여 <em>7</em>)
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
            </div>
          </div>
        )}
      </div>

      {/* 입력정보 */}
      <div className={styles.input_wrap}>
        {/* 사전 레벨테스트 */}
        {isShowLevelTest && <PreLevelTest />}
        {currentCourseRegistrationFormat === 'ALL' && (
          <div className="my-12 h-1 w-full bg-[#EFF0F1]" />
        )}
        {/* 교재 배송지 */}
        {isShowTextbook && <TextbookDeliveryAddress />}
      </div>

      {/* 안내사항 */}
      <div className={`${noticeBoxStyles.start} ${styles.notice}`}>
        <dl className={noticeBoxStyles.check_point}>
          <dt>
            <IcoCaution width={24} height={24} stroke="#4d525c" />
            안내사항
          </dt>
          <dd>강사배정은 상황에 따라 변동될 수 있습니다.</dd>
          <dd>동일과정을 연속 신청하실 경우 레벨테스트가 없습니다.</dd>
        </dl>
      </div>

      {/* button */}
      <BrowserView>
        <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl" className="min">
            취소
          </Button>
          <Button variant="primary" size="xl" onClick={() => submit()}>
            신청
          </Button>
        </div>
      </BrowserView>

      <MobileView>
        <MobileContainerFooter>
          <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" className="min">
              취소
            </Button>
            <Button variant="primary" size="xl" onClick={() => submit()}>
              신청
            </Button>
          </div>
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}
