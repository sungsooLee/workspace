import { cn } from '@learnway/shared';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import {
  IcoArrowDown,
  IcoBook,
  IcoBuilding,
  IcoCategory,
  IcoCaution,
  IcoChair,
  IcoClock01,
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
import {
  CourseDashboard, // 과정소개
  CourseEducation, // 연관과정
  CourseFixedButton,
  CourseIntroduction, // 후기
  CourseRelatedProcess, // 교육일정
  CourseReview, // 수강신청 취소 사유 입력
  PackageCardList,
} from '../../../features/layout';

import styles from '@learnway/styles/fo/pages/_layout/course-introduction/detail.module.css';
import lectureStyles from '@learnway/styles/fo/pages/_layout/course-introduction/lecture.module.css';
import packageInformationStyles from '@learnway/styles/fo/pages/_layout/course-introduction/package-information.module.css';
import packageSideStyles from '@learnway/styles/fo/pages/_layout/course-introduction/package-side.module.css';
import pageContentsStyles from '@learnway/styles/fo/pages/_page-contents.module.css';
import pageFullInner from '@learnway/styles/fo/widgets/layout/ui/container/page-full-inner.module.css';

// 이미지
import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';
import {
  default as bnrImage1,
  default as listImage1,
} from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import { Accordion } from '@learnway/ui/accordion';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { OptionCard, OptionCardItem } from '@learnway/ui/option-card';
import { Panel } from '@learnway/ui/panel';
import { Tabs } from '@learnway/ui/tabs';
import { useToast } from '@learnway/ui/toast';

export const Route = createFileRoute('/_layout/course-introduction/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();
  const { confirm: openConfirm } = useModal();
  const { alert: openAlert } = useModal();

  // 탭 순서
  const [selectedTabTitle, setSelectedTabTitle] = useState<number>(0); // 탭 타이틀 순서
  const [selectedTabContent, setSelectedTabContent] = useState<string>('0'); // 탭 컨텐츠 순서

  // 탭 타이틀
  const tabTitleSwiper = [
    { title: '대시보드', selectTabNumber: '0' },
    { title: '과정소개', selectTabNumber: '1' },
    { title: '교육일정', selectTabNumber: '1' }, // 과정소개 탭 안에서 교욱일정이 있기 때문에 tabNumber값 동일
    { title: '후기', selectTabNumber: '1', count: '0', new: true }, // 과정소개 탭 안에서 후기가 있기 때문에 tabNumber값 동일
  ];

  const handleTab = (selectTabNumber: string, selectTabContentsNumber: number) => {
    setSelectedTabContent(selectTabNumber); // 탭 타이틀 번호
    setSelectedTabTitle(selectTabContentsNumber); // 탭 컨텐츠 번호
  };

  // 탭 컨텐츠
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
          <div className={cn(pageFullInner.start, pageFullInner.inner, pageFullInner.bg_sec1)}>
            <div className={pageFullInner.contents}>
              {/* 퍼블수정 20250724 연관과정 추가 */}
              <CourseRelatedProcess />
            </div>
          </div>
        </div>
      ),
    },
  ];

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

  // 수강신청 있는 과정
  const [courseValues, setCourseValues] = useState<string | undefined>(undefined);
  const courseOptions = [
    {
      label: '스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축',
      value: 'a',
      original: {
        number: '1차',
        date: '2026-01-15 ~ 2026-01-04',
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
        date: '2026-01-15 ~ 2026-01-04',
        info: [
          {
            icon: IcoChair,
            txt: '999',
          },
          {
            icon: IcoLocation,
            txt: '온라인 비대면',
          },
        ],
      },
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

  // 학습유형 리스트 open, close
  const [listCategoryOpen, setListCategoryOpen] = useState<boolean>(true);
  const [listSubTitleOpen, setListSubTitleOpen] = useState<boolean>(false);

  return (
    <div className={`${styles.start} ${styles.package_wrap}`}>
      {/* page contents */}
      <div className={pageContentsStyles.start}>
        {/* main content */}
        <div className={pageContentsStyles.main_contents}>
          <div className={styles.thumbnail_img}>
            {/* 플레이 버튼 o */}
            <Button>
              <img src={bnrImage1} alt="" />
              <div className={styles.img_play}>
                <img src={playImg} alt="" />
              </div>
            </Button>
            {/* 플레이 버튼 x */}
            {/* <img src={bnrImage1} alt="" /> */}
          </div>

          <div className={styles.tab_title}>
            <div className={styles.box}>
              {tabTitleSwiper.map((item, index) => (
                // 클래스
                // active : 선택 표시
                // new : 새로운 표시
                <Button
                  key={index}
                  className={cn(
                    selectedTabTitle === index ? styles.active : '',
                    item.new && styles.new,
                  )}
                  onClick={() => handleTab(item.selectTabNumber, index)}
                >
                  {item.title}
                  <em>{item.count}</em>
                </Button>
              ))}
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
        </div>

        {/* sub content */}
        <div className={pageContentsStyles.sub_contents}>
          <div className={styles.sub_box}>
            {/* packageInformationStyles module */}
            <div
              className={`${packageInformationStyles.start} ${packageInformationStyles.information}`}
            >
              <strong className={packageInformationStyles.tit}>
                패키지 타이틀패키지 타이틀패키지 타이틀패키지 타이틀패키지 타이틀
              </strong>
              {/* 퍼블수정 20250624 아이콘 변경 및 색상 수정 */}
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
              </div>
              {/* 구독 */}
              <div className={packageInformationStyles.subscribe_box}>
                {/* 퍼블수정 20250624 로고 삭제 */}
                <strong className={packageInformationStyles.channel_name}>
                  현대오토에버 (elBls)
                </strong>
                <Button
                  className={packageInformationStyles.btn_subscribe}
                  variant="primary"
                  size="xl"
                  onClick={() => handleSubscribeToast()}
                >
                  구독하기
                </Button>
              </div>
              {/* 학습정보 */}
              <div className={packageInformationStyles.list_box}>
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
                      한국어, Aracic, Chinese Taiwan, Deutsch, English, Frensh, Indonesian,
                      Japanese, Malay, Nepali, Portuguese
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

              {/* 강의 */}
              <div className={packageInformationStyles.lecture_wrap}>
                {/* 수강 신청 차수 없을 시 */}
                <Panel hideHeaderUnderline type="rounded" className={styles.result_box}>
                  <div>
                    <IcoCaution width={40} height={40} stroke={'#A9AFB8'} />
                    {/* 퍼블수정 20250624 태그 수정 */}
                    <strong>현재 수강 신청 가능한 차수가 없습니다.</strong>
                  </div>
                </Panel>
                {/* 인원마감/대기신청 */}
                <Panel hideHeaderUnderline type="rounded" className={styles.result_box}>
                  <div>
                    {/* 퍼블수정 20250624 색상 수정 */}
                    <IcoClock01 width={40} height={40} stroke={'#0056ff'} />
                    <strong>오전 10:00 수강신청이 시작됩니다!</strong>
                    <p>수강신청일시는 예고없이 변경될수 있습니다.</p>
                  </div>
                </Panel>
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
                  onOptionSelect={(option: OptionCardItem) => setCourseValues(option.value)}
                />
              </div>

              {/* 찜/공유 수강신청 Button */}
              <div className={styles.course_btn_wrap}>
                <CourseFixedButton course={true} />
              </div>
            </div>
          </div>

          {/* 패키지 */}
          <div
            className={`${packageSideStyles.start} ${packageSideStyles.package} ${styles.sub_tit}`}
          >
            <div className={styles.tit_box}>
              <strong>
                패키지<em>10</em>
              </strong>
            </div>
            <div className={`${packageSideStyles.package_box}`}>
              <Accordion
                items={accordionValueItems}
                value={accordionValue}
                className={packageSideStyles.acc_package}
                onValueChange={(value) => setAccordionValue(value as string)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
