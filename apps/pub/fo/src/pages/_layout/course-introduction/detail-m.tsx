import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, Tabs, useModal, Accordion, useToast } from '@learnway/ui';
import { IcoHeart, IcoUser01, IcoArrowDown, IcoPlay } from '@learnway/icons';
import { MobileView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import {
  CourseDashboard,
  CourseIntroduction, // 과정소개
  CourseEducation, // 교육일정
  CourseReview, // 후기
  CourseInformationPopup, // 수강신청 불가 팝업창들 및 반려 팝업
  CourseFixedButton, // 수강신청 버튼
  CourseCancelReasonPopup, // 수강신청 취소 사유 입력
  PackageCardList, // 패키지 카드
} from '../../../features/layout';

import packageSideStyles from './package-side.module.css';
import relatedSideStyles from './related-side.module.css';
import thumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import thumnailImgStyles from '../../../shared/ui/thumnail/thumnail-img.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';
import styles from './detail-m.module.css';

// 예시 이미지
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import logoHyundai from '@learnway/styles/fo/assets/images/common/logo_hyundai.png';
import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_layout/course-introduction/detail-m')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const { confirm: openConfirm } = useModal();
  const { alert: openAlert } = useModal();

  // 패키지 자세한 정보 아코디언
  const [packageInformation, setPackageInformation] = useState(true);

  // 탭
  const [selectedTabKey, setSelectedTabKey] = useState<string>('0');
  const [selectedTabTitle, setSelectedTabTitle] = useState<number>(0);

  // 탭 타이틀
  const tabTitle = [
    { title: '대시보드', tabNumber: '0' },
    { title: '과정소개', tabNumber: '1' },
    { title: '교육일정', tabNumber: '1' }, // 과정소개 탭 안에서 교욱일정이 있기 때문에 tabNumber값 동일
    { title: '후기', count: '0', tabNumber: '1' }, // 과정소개 탭 안에서 후기가 있기 때문에 tabNumber값 동일
  ];
  const handleTab = (key: string, index: number) => {
    setSelectedTabKey(key);
    setSelectedTabTitle(index);
  };

  const items = [
    {
      title: '대시보드',
      key: '0',
      content: (
        <div className={styles.dashboard_content}>
          <CourseDashboard />
        </div>
      ),
    },
    {
      title: '과정소개',
      key: '1',
      content: (
        <div className={styles.introduction_content}>
          <CourseIntroduction />
          <CourseEducation />
          <CourseReview />
        </div>
      ),
    },
  ];

  // 수강신청 취소 신청
  // 퍼블수정 20250703 함수명 변경 및 title Fragment 삭제
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
      okButtonLabel: '취소하기',
      cancelButtonLabel: '아니요',
    });
  };

  // 퍼블수정 20250703 수강신청 취소 사유 popup으로 변경 (CourseCancelReasonPopup)

  // 수강취소 완료
  // 퍼블수정 20250703 함수명 변경 및 title Fragment 삭제
  const handleCourseCancelCompleteAlert = () => {
    openAlert({
      title: '수강취소 되었습니다',
    });
  };

  // 수강신청 알림
  // 퍼블수정 20250703 함수명 변경 및 title Fragment 삭제
  const handleCourseAlarmAlert = () => {
    openAlert({
      title: '수강신청 알림',
      content: (
        <>
          수강신청이 가능할 때 연락드리겠습니다.
          <br />
          감사합니다.
        </>
      ),
    });
  };

  // 수강대기자 등록
  // 퍼블수정 20250703 함수명 변경 및 title Fragment 삭제
  const handleCourseWaitAlert = () => {
    openAlert({
      title: '수강대기자 등록',
      content: (
        <>
          본 과정의 수강신청 대기자로 등록되었습니다.
          <br />
          수강 취소 발생시 순차적으로 연락드리겠습니다.
          <br />
          감사합니다.
        </>
      ),
    });
  };

  // 차수 알림 등록
  // 퍼블수정 20250703 함수명 변경 및 title Fragment 삭제
  const handleCourseTimeAlert = () => {
    openAlert({
      title: '차수 알림 등록',
      content: (
        <>
          본 과정의 차수 오픈시 연락드리겠습니다.
          <br />
          감사합니다.
        </>
      ),
    });
  };

  // 공통 컴포넌트 수정 요청중 (수정예정)
  // toast popup
  const { open: openToast } = useToast();
  const handleClickToast = () => {
    openToast({
      title: '채널을 구독하였습니다',
    });
  };

  // 퍼블수정 20250703 패키지 카드 리스트 값 추가
  // 패키지 카드
  const packageCardValue = [
    {
      label: '패키지',
      imgSrc: listImage1,
      text: '필수 개발 과정 Spring Framework OpenAPI 서비스 필수요소 1',
    },
    {
      label: '패키지',
      imgSrc: listImage1,
      text: '필수 개발 과정 Spring Framework OpenAPI 서비스 필수요소 2',
    },
    {
      label: '패키지',
      imgSrc: listImage1,
      text: '필수 개발 과정 Spring Framework OpenAPI 서비스 필수요소 3',
    },
  ];

  // 패키지 아코디언
  const [accordionValue, setAccordionValue] = useState<string>('a');
  // 퍼블수정 20250703 수정
  const accordionValueItems = [
    {
      value: 'a',
      title: (
        <div className={packageSideStyles.sub_package_title}>
          <p>반드시 알아야하는 파이썬 기본지식 반드시 알아야하는 파이썬</p>
        </div>
      ),
      children: (
        <PackageCardList
          cardListData={packageCardValue}
          className={packageSideStyles.sub_package_content}
        />
      ),
    },
    {
      value: 'b',
      title: (
        <div className={packageSideStyles.sub_package_title}>
          <p>관리자 대상 법정 필수 패키지</p>
        </div>
      ),
      children: (
        <PackageCardList
          cardListData={packageCardValue}
          className={packageSideStyles.sub_package_content}
        />
      ),
    },
  ];

  return (
    <div className={`${styles.start} ${styles.package_wrap}`}>
      <div className={styles.thumbnail_img}>
        {/* 플레이 버튼 o */}
        <Button
          onClick={() =>
            openModal({
              width: 'sm',
              content: <CourseCancelReasonPopup />,
            })
          }
        >
          <img src={bnrImage1} alt="" />
          <div className={styles.img_play}>
            <img src={playImg} alt="" />
          </div>
        </Button>
        {/* 플레이 버튼 x */}
        {/* <img src={bnrImage1} alt="" /> */}
      </div>

      <div className={styles.sub_box}>
        {/* package information */}
        <div
          className={`${packageInformationStyles.start} ${packageInformationStyles.information}`}
        >
          <strong className={packageInformationStyles.tit}>
            패키지 타이틀패키지 타이틀패키지 타이틀패키지 타이틀패키지 타이틀
          </strong>
          <div className={packageInformationStyles.count_box}>
            <div className={packageInformationStyles.box}>
              <IcoHeart width={16} height={16} stroke="#6f798b" fill="none" />
              <span>500</span>
            </div>
            <div className={packageInformationStyles.box}>
              <IcoUser01 width={16} height={16} stroke="#6f798b" />
              <span>77,500</span>
            </div>

            <Button
              className={`${packageInformationStyles.btn_acc} ${packageInformation === true ? packageInformationStyles.active : ''}`}
              onClick={() =>
                packageInformation === true
                  ? setPackageInformation(false)
                  : setPackageInformation(true)
              }
            >
              {packageInformation === true ? '닫기' : '자세히'}
              <IcoArrowDown width={16} height={16} stroke="#6f798b" />
            </Button>
          </div>
          {/* 학습정보 */}
          <div
            className={`${packageInformationStyles.list_box} ${packageInformation === true ? packageInformationStyles.active : ''}`}
          >
            {/* definition module */}
            <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
              <dl>
                <dt>학습유형</dt>
                <dd>패키지</dd>
              </dl>
              <dl>
                <dt>카테고리</dt>
                <dd>
                  Quality &gt; Service &gt; Hydrogen/Electricity &gt; Ioniq 5 &gt; NE PE &gt;
                  Technical Information
                </dd>
              </dl>
            </div>
          </div>
          {/* 구독 */}
          <div className={packageInformationStyles.subscribe_box}>
            <span className={packageInformationStyles.channel}>
              <img src={logoHyundai} alt="" />
            </span>
            <strong className={packageInformationStyles.channel_name}>현대오토에버 (elBls)</strong>
            <Button
              className={packageInformationStyles.btn_subscribe}
              variant="primary"
              size="sm"
              onClick={() => handleClickToast()}
            >
              구독하기
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.tab_title}>
        <div className={styles.box}>
          {tabTitle.map((item, index) => (
            // 퍼블수정 20250703 key 값 수정
            <Button
              key={index}
              className={selectedTabTitle === index ? styles.active : ''}
              onClick={() => handleTab(item.tabNumber, index)}
            >
              {item.title}
              <em>{item.count}</em>
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.tab_wrap}>
        <Tabs className={styles.tab} selectedTabKey={selectedTabKey} items={items} type="line" />
      </div>

      {/* sub content */}
      <div className={styles.sub_contents}>
        {/* 패키지 */}
        <div
          className={`${packageSideStyles.start} ${packageSideStyles.package} ${styles.sub_box} `}
        >
          <div className={styles.tit_box}>
            <strong>
              패키지<em>10</em>
            </strong>
          </div>
          <div className={packageSideStyles.package_box}>
            <Accordion
              items={accordionValueItems}
              value={accordionValue}
              className={packageSideStyles.acc_package}
              onValueChange={(value) => setAccordionValue(value as string)}
            />
          </div>
        </div>
      </div>

      {/* button fix */}
      <MobileView>
        <MobileContainerFooter>
          {/* 찜/공유 수강신청 Button */}
          <CourseFixedButton course={true} />
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}
