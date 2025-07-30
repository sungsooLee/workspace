import {
  IcoArrowDown,
  IcoBook,
  IcoBuilding,
  IcoCategory,
  IcoDivice,
  IcoEye,
  IcoHeart,
  IcoLevel,
  IcoLocation,
  IcoPrize,
  IcoStar,
  IcoSubtitles02,
  IcoTime,
} from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Accordion, Button, Carousel, Tabs, useModal, useToast } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { MobileView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import {
  CourseCancelReasonPopup,
  CourseDashboard, // 과정소개
  CourseEducation, // 연관과정
  CourseFixedButton,
  CourseIntroduction, // 후기
  CourseRelatedProcess, // 교육일정
  CourseReview, // 수강신청 취소 사유 입력
  PackageCardList, // 패키지 카드
} from '../../../features/layout';

import styles from '@learnway/styles/fo/pages/_layout/course-introduction/detail-m.module.css';
import packageInformationStyles from '@learnway/styles/fo/pages/_layout/course-introduction/package-information.module.css';
import packageSideStyles from '@learnway/styles/fo/pages/_layout/course-introduction/package-side.module.css';
import pageFullInner from '@learnway/styles/fo/widgets/layout/ui/container/page-full-inner.module.css';

// 예시 이미지
import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';
import {
  default as bnrImage1,
  default as listImage1,
} from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_layout/course-introduction/detail-m')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();
  const { confirm: openConfirm } = useModal();
  const { alert: openAlert } = useModal();

  // 기본정보 자세히보기 아코디언
  const [packageInformation, setPackageInformation] = useState(true);

  // 탭 순서
  const [selectedTabTitle, setSelectedTabTitle] = useState<number>(0); // 탭 타이틀 순서
  const [selectedTabContent, setSelectedTabContent] = useState<string>('0'); // 탭 컨텐츠 순서

  // 탭 타이틀
  const tabTitle = [
    { title: '대시보드', selectTabNumber: '0' },
    { title: '과정소개', selectTabNumber: '1' },
    { title: '교육일정', selectTabNumber: '1' }, // 과정소개 탭 안에서 교욱일정이 있기 때문에 tabNumber값 동일
    { title: '후기', selectTabNumber: '1', count: '0', new: true }, // 과정소개 탭 안에서 후기가 있기 때문에 tabNumber값 동일
    { title: '수강전 문의', selectTabNumber: '2', new: true },
    { title: '커뮤니티', selectTabNumber: '3', new: true },
    { title: '새소식', selectTabNumber: '4', new: true },
  ];

  const handleTab = (selectTabNumber: string, selectTabContentsNumber: number) => {
    setSelectedTabContent(selectTabNumber); // 탭 타이틀 번호
    setSelectedTabTitle(selectTabContentsNumber); // 탭 컨텐츠 번호
  };

  // 탭 타이틀 스와이퍼
  const tabTitleSwiper = tabTitle.map((item, index) => (
    // 클래스
    // active : 선택 표시
    // new : 새로운 표시
    <Button
      key={index}
      className={cn(selectedTabTitle === index ? styles.active : '', item.new && styles.new)}
      onClick={() => handleTab(item.selectTabNumber, index)}
    >
      {item.title}
      <em>{item.count}</em>
    </Button>
  ));

  const tabTitleContents = [
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
          <div
            className={cn(pageFullInner.start, pageFullInner.inner_mobile, pageFullInner.bg_sec1)}
          >
            <div className={pageFullInner.contents}>
              {/* 퍼블수정 20250724 연관과정 추가 */}
              <CourseRelatedProcess />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '수강전 문의',
      key: '2',
      content: '수강전 문의',
    },
    {
      title: '커뮤니티',
      key: '3',
      content: '커뮤니티',
    },
    {
      title: '새소식',
      key: '4',
      content: '새소식',
    },
  ];

  // Confirm 퍼블수정 20250708 (전체적으로 수정)
  // 인원마감 + 수강대기 안내
  const CourseDeadlineConfirm = () => {
    openConfirm({
      title: '수강인원이 마감되었습니다.',
      content: '수강대기 신청을 하시겠습니까?',
      okButtonLabel: '수강대기 신청',
      cancelButtonLabel: '아니요',
    });
  };

  // 수강중복 안내
  const CourseDuplicateConfirm = () => {
    openConfirm({
      title: '수강중복 안내',
      content: (
        <>
          동일한 기간에 다른 클래스 스케줄이 있습니다.
          <br />
          그래도 수강신청 하시겠습니까?
        </>
      ),
      okButtonLabel: '수강 신청',
      cancelButtonLabel: '아니요',
    });
  };

  // 수강신청 취소 신청
  const CourseCancelConfirm = () => {
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
    });
  };

  // Alert 퍼블수정 20250708 (전체적으로 수정)
  // 수강대기 신청 완료
  const CourseWaitAlert = () => {
    openAlert({
      title: '수강대기 신청',
      content: '수강대기 신청이 완료되었습니다.',
    });
  };

  // 인원마감 안내
  const CourseDeadlineAlert = () => {
    openAlert({
      title: '인원마감 안내',
      content: '수강대기 인원까지 모두 마감되었습니다!',
    });
  };

  // 수강제한 안내 (카테고리 내 제한, 월별 개수 제한)
  const CourseLimitAlert = () => {
    openAlert({
      title: '수강제한 안내',
      content: '더 이상 수강 하실 수 없습니다.',
      // content: '본 과정을 수강 하실 수 없습니다.',
    });
  };

  // 수강취소 완료
  // 퍼블수정 20250703 함수명 변경 및 title Fragment 삭제
  const CourseCancelCompleteAlert = () => {
    openAlert({
      title: '수강취소 되었습니다',
    });
  };

  // 수강신청 알림
  // 퍼블수정 20250703 함수명 변경 및 title Fragment 삭제
  const CourseAlarmAlert = () => {
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
  const CourseWaitRegistrationAlert = () => {
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
  const CourseTimeAlert = () => {
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

  // toast popup (공통)
  const { open: openToast } = useToast();
  const handleSubscribeToast = () => {
    openToast({
      title: '채널을 구독하였습니다.',
      // actionLabel: '버튼',
      type: 'success',
      // onActionClick: () => {
      //   console.log('버튼 클릭');
      // },
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

  // 학습유형 리스트 open, close
  const [listCategoryOpen, setListCategoryOpen] = useState<boolean>(true);
  const [listSubTitleOpen, setListSubTitleOpen] = useState<boolean>(false);

  return (
    <div className={`${styles.start} ${styles.package_wrap}`}>
      <div className={styles.thumbnail_img}>
        {/* 플레이 버튼 o */}
        <Button
          onClick={() =>
            openModal({
              width: 'm_full',
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
              <IcoStar width={16} height={16} stroke="#0056ff" fill="#0056ff" />
              <span>4.2</span>
            </div>
            <div className={packageInformationStyles.box}>
              <IcoHeart width={16} height={16} stroke="#f58b75" fill="#f58b75" />
              <span>500</span>
            </div>
            <div className={packageInformationStyles.box}>
              <IcoEye width={16} height={16} stroke="#0056ff" />
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
            <ul>
              <li>
                <IcoBook width={20} height={20} stroke="#4d525c" fill="none" />
                <p>동영상</p>
              </li>
              <li className={listCategoryOpen === true ? packageInformationStyles.open : ''}>
                <IcoCategory width={20} height={20} fill="#4d525c" />
                <p>Quality Service Hydrogen/Electricitysf Service Hydrogen/Electricitysf</p>
                <Button
                  onClick={() =>
                    listCategoryOpen === true
                      ? setListCategoryOpen(false)
                      : setListCategoryOpen(true)
                  }
                >
                  <IcoArrowDown width={20} height={20} stroke="#4d525c" />
                </Button>
              </li>
              <li>
                <IcoLocation width={20} height={20} stroke="#4d525c" />
                <p>온라인 비대면</p>
              </li>
              <li>
                <IcoTime width={20} height={20} fill="#4d525c" />
                <p>1시간 24분</p>
              </li>
              <li>
                <IcoBuilding width={20} height={20} fill="#4d525c" />
                <p>야나두</p>
              </li>
              <li>
                <IcoDivice width={20} height={20} fill="#4d525c" />
                <p>앱, 웹, 모바일전용, 사외IP전용</p>
              </li>
              <li>
                <IcoLevel width={20} height={20} fill="#4d525c" />
                <p>중급</p>
              </li>
              <li>
                <IcoPrize width={20} height={20} fill="#4d525c" />
                <p>발급</p>
              </li>
              <li className={listSubTitleOpen === true ? packageInformationStyles.open : ''}>
                <IcoSubtitles02 width={20} height={20} fill="#4d525c" />
                <p>
                  한국어, Aracic, Chinese Taiwan, Deutsch, English, Frensh, Indonesian, Japanese,
                  Malay, Nepali, Portuguese
                </p>
                <Button
                  onClick={() =>
                    listSubTitleOpen === true
                      ? setListSubTitleOpen(false)
                      : setListSubTitleOpen(true)
                  }
                >
                  <IcoArrowDown width={20} height={20} stroke="#4d525c" />
                </Button>
              </li>
            </ul>
          </div>
          {/* 구독 */}
          <div className={packageInformationStyles.subscribe_box}>
            <strong className={packageInformationStyles.channel_name}>현대오토에버 (elBls)</strong>
            <Button
              className={packageInformationStyles.btn_subscribe}
              variant="primary"
              size="md"
              onClick={() => handleSubscribeToast()}
            >
              구독하기
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.tab_title}>
        <div className={styles.box}>
          <Carousel
            items={tabTitleSwiper}
            className={`${styles.tab_swiper}`}
            spaceBetween={16}
            slidesPerView="auto"
            showNavigation={true}
            freeMode={true}
            loop={false}
          />
        </div>
      </div>

      <div className={styles.tab_wrap}>
        <Tabs
          className={styles.tab}
          selectedTabKey={selectedTabContent}
          items={tabTitleContents}
          type="line"
        />
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
