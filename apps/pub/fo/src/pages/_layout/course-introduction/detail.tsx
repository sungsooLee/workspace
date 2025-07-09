import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import {
  Button,
  Tabs,
  Accordion,
  OptionCard,
  OptionCardItem,
  useModal,
  Panel,
  useToast,
  Carousel,
  SelectOption,
  ChipList,
  ProgressBar,
  Avatar,
} from '@learnway/ui';
import {
  IcoHeart,
  IcoStar,
  IcoCaution,
  IcoClock01,
  IcoAvatar,
  IcoSymbol,
  IcoBook,
  IcoBuilding,
  IcoCategory,
  IcoDivice,
  IcoLevel,
  IcoLocation,
  IcoPrize,
  IcoSubtitles02,
  IcoTime,
  IcoEye,
  IcoArrowDown,
} from '@learnway/icons';
import {
  CourseDashboard,
  CourseIntroduction, // 과정소개
  CourseEducation, // 교육일정
  CourseReview, // 후기
  CourseFixedButton, // 수강신청 버튼
  CourseCancelReasonPopup, // 수강신청 취소 사유 입력
  PackageCardList, // 패키지 카드
} from '../../../features/layout';

import pageContentsStyles from '../../_page-contents.module.css';
import pageFullInner from '../../../widgets/layout/ui/container/page-full-inner.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';
import lectureStyles from './lecture.module.css';
import packageSideStyles from './package-side.module.css';

import styles from './detail.module.css';

// 이미지
import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_layout/course-introduction/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const { confirm: openConfirm } = useModal();
  const { alert: openAlert } = useModal();

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

  // 공통 컴포넌트 수정 요청중 (수정예정)
  // toast popup
  const { open: openToast } = useToast();
  const handleClickToast = () => {
    openToast({
      title: '채널을 구독하였습니다',
    });
  };

  // 탭 컨텐츠
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
          <div className={cn(pageFullInner.start, pageFullInner.inner, pageFullInner.bg_sec1)}>
            <div className={pageFullInner.contents}>abcdefg</div>
          </div>
        </div>
      ),
    },
  ];

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

  const options: SelectOption[] = [
    { label: '실무세례 중심 학습', value: 'A' },
    { label: '현직자 피드백 제공', value: 'B' },
    { label: '프로그래밍 스킬 성장', value: 'C' },
    { label: '중급 이상 난이도에 적합', value: 'D' },
    { label: '타 과정에 비해 수료가 쉬운 편', value: 'E' },
  ];

  // 퍼블수정 20250625 swiper (작업 진행 예정)
  const itemSwiper = [
    <Panel hideHeaderUnderline actions="" className={styles.card_panel} type="rounded">
      <div className={styles.left}>
        <strong className={styles.tit}>이 과정을 꼭 들어야 하는 이유</strong>
        <p className={styles.txt}>
          <IcoSymbol width={16} height={16} />
          AI가 요약한 이 과정의 핵심 포인트
        </p>
        <div className={styles.chip}>
          <ChipList options={options} hideCloseButton />
        </div>
      </div>
      <div className={`${styles.right} ${styles.line}`}>
        <strong className={styles.tit}>
          “실무에 적용하기 유용”하다는 점에서 이 과정을 많이 추천했어요.
        </strong>
        <div className={styles.progress}>
          <ProgressBar progress={89} />
          <span>89%</span>
        </div>
        <div className={styles.avatar}>
          <div className={styles.img}>
            <Avatar imageUrl="https://github.com/shadcn.png" />
            <Avatar imageUrl="https://github.com/shadcn.png" />
            <Avatar imageUrl="https://github.com/shadcn.png" />
          </div>
          <p>
            <em>472명</em>의 동료들이 응답
          </p>
        </div>
      </div>
    </Panel>,
    <div>2</div>,
  ];

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
            <Button onClick={() => CourseCancelCompleteAlert()}>
              <img src={bnrImage1} alt="" />
              <div className={styles.img_play}>
                <img src={playImg} alt="" />
              </div>
            </Button>
            {/* 플레이 버튼 x */}
            {/* <img src={bnrImage1} alt="" /> */}
          </div>

          {/* 퍼블 홀딩 */}
          {/* <Carousel
            items={itemSwiper}
            className={`${styles.card_swiper}`}
            spaceBetween={0}
            slidesPerView={1}
            showNavigation={true}
          /> */}

          <div className={styles.tab_title}>
            <div className={styles.box}>
              {tabTitle.map((item, index) => (
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
            <Tabs
              className={styles.tab}
              selectedTabKey={selectedTabKey}
              items={items}
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
                  size="sm"
                  onClick={() => handleClickToast()}
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
                      <IcoArrowDown width={20} height={20} fill="#4d525c" />
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
                      <div className={`${lectureStyles.box} ${packageInformationStyles.box}`}>
                        <p className={lectureStyles.date}>
                          <span>{original?.date}</span>
                          <span>{original?.number}</span>
                        </p>
                        <strong className={lectureStyles.tit}>{label}</strong>
                      </div>
                      <div className={`${lectureStyles.box} ${packageInformationStyles.box}`}>
                        {/* definitionListStyles module */}
                        <div
                          className={`${definitionListStyles.start} ${definitionListStyles.list}`}
                        >
                          {original.definitionList.map((item: any, index: number) => (
                            <dl key={index}>
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
