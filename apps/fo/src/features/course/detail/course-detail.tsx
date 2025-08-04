import {
  IcoBook,
  IcoCategory,
  IcoChair,
  IcoEye,
  IcoLevel,
  IcoLocation,
  IcoStar,
  IcoSubtitles02,
} from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Accordion } from '@learnway/ui/accordion';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { OptionCard, OptionCardItem } from '@learnway/ui/option-card';
import { Tabs } from '@learnway/ui/tabs';
import { useToast } from '@learnway/ui/toast';
import { useRouterState } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

import {
  CourseDashboard, // 과정소개
  CourseEducation, // 후기
  CourseFixedButton,
  CourseIntroduction, // 교육일정
  CourseReview, // 수강신청 버튼
  PackageCardList,
} from '@widgets/layout';

import lectureStyles from '@learnway/styles/fo/pages/_layout/course-introduction/lecture.module.css';
import packageInformationStyles from '@learnway/styles/fo/pages/_layout/course-introduction/package-information.module.css';
import packageSideStyles from '@learnway/styles/fo/pages/_layout/course-introduction/package-side.module.css';
import pageContentsStyles from '@learnway/styles/fo/pages/_page-contents.module.css';
import pageFullInner from '@learnway/styles/fo/widgets/layout/ui/container/page-full-inner.module.css';

// 이미지
import { useCourseFullDetail, useCourseLike, useCourseSequences } from '@entities/course';
import {
  default as bnrImage1,
  default as listImage1,
} from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

import { useChannelDetail } from '@entities/channel/service/channel.hook';
import { useGetCurriculumnDetail } from '@entities/curriculum';
import styles from '@learnway/styles/fo/pages/_layout/course-introduction/detail.module.css';
import { t } from 'i18next';

export function CourseDetail() {
  const routerState = useRouterState();
  const courseId = routerState.location.state?.courseId;
  const dashboardRef = useRef(null);
  const introduceRef = useRef(null);
  const educationRef = useRef(null);
  const reviewRef = useRef(null);

  const testCourseId = 7;

  const [openingYear, setOpeningYear] = useState(2025);
  const [isAll, setIsAll] = useState(true);

  const { data: courseData } = useCourseFullDetail(courseId || testCourseId);
  const { data: sequencesData } = useCourseSequences(courseId || testCourseId, {
    openingYear,
    isAll,
  });
  // const sequencesData = {};
  const { courseLikeRequest, mutate: toggleLikeMutate, isPending: isLikePending } = useCourseLike();
  console.log('@', courseId, courseData, sequencesData);
  const { data: channelData } = useChannelDetail(courseData?.channelUuid || '');
  const { data: curriculumData } = useGetCurriculumnDetail(courseData?.curriculumId);

  const { openModal } = useModal();
  const { confirm: openConfirm } = useModal();
  const { alert: openAlert } = useModal();

  const [likeCount, setLikeCount] = useState<number>(courseData?.course.courseLike);
  const [likeChk, setLikeChk] = useState<boolean>(courseData?.course.courseLikeChk);

  // 탭 순서
  const [selectedTabTitle, setSelectedTabTitle] = useState<number>(0); // 탭 타이틀 순서
  const [selectedTabContent, setSelectedTabContent] = useState<string>('0'); // 탭 컨텐츠 순서

  // 탭 타이틀
  interface TabTitleSwiper {
    title: string;
    isEroll: boolean;
    selectTabNumber: string;
    new?: boolean;
    targetRef?: React.RefObject<HTMLElement> | null;
  }
  const tabTitleSwiper: TabTitleSwiper[] = [
    { title: t('대시보드'), isEroll: false, selectTabNumber: '0' },
    { title: t('과정소개'), isEroll: false, selectTabNumber: '1' /* targetRef: introduceRef */ },
    { title: t('교육일정'), isEroll: true, selectTabNumber: '1', targetRef: educationRef }, // 과정소개 탭 안에서 교욱일정이 있기 때문에 tabNumber값 동일
    { title: t('후기'), isEroll: false, selectTabNumber: '1', new: true, targetRef: reviewRef }, // 과정소개 탭 안에서 후기가 있기 때문에 tabNumber값 동일
    { title: t('수강전 문의'), isEroll: true, selectTabNumber: '2', new: true },
    { title: t('커뮤니티'), isEroll: false, selectTabNumber: '3', new: true },
    { title: t('새소식'), isEroll: false, selectTabNumber: '4', new: true },
  ];

  const handleTab = (selectTabNumber: string, selectTabContentsNumber: number) => {
    setSelectedTabContent(selectTabNumber); // 탭 타이틀 번호
    setSelectedTabTitle(selectTabContentsNumber); // 탭 컨텐츠 번호
  };

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

  // 수강신청 완료
  const CourseEnrollComplete = () => {
    openAlert({
      title: '수강신청완료',
      content: '수강신청이 완료되었습니다.',
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

  // 수강취소 사유 입력
  // 퍼블수정 20250703 함수명 변경 및 title Fragment 삭제
  const CourseCancelReasonModal = () => {
    // openModal({
    //   content: <CourseCancelReasonPopup />,
    // });
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

  const goToScrollRef = async (targetRef: any) => {
    try {
      await waitForRef(targetRef);
      const target = targetRef?.current;
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: top - 50,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      console.warn('타겟을 못찾음', error);
    }
  };

  // 탭 컨텐츠
  const tabTitleContents = [
    {
      title: t('대시보드'),
      key: '0',
      content: (
        <div className={styles.dashboard_content}>
          <CourseDashboard ref={dashboardRef} />
        </div>
      ),
    },
    {
      title: t('과정소개'),
      key: '1',
      content: (
        <div className={styles.introduction_content}>
          {courseData?.introduction && (
            <CourseIntroduction
              ref={introduceRef}
              preRequired={courseData?.preqCourseList}
              introduction={courseData?.introduction}
              curriculum={curriculumData}
            />
          )}
          {sequencesData && (
            <CourseEducation
              ref={educationRef}
              educationsTemp={courseData?.educations}
              educations={sequencesData}
              courseEnrollCompletePopup={CourseEnrollComplete}
              CourseCancelCompletePopup={CourseCancelCompleteAlert}
              setOpeningYear={setOpeningYear}
              setIsAll={setIsAll}
              isAll={isAll}
              dashboardRef={dashboardRef}
              goToScrollRef={goToScrollRef}
              handleTab={handleTab}
            />
          )}
          {courseData?.reviews && <CourseReview ref={reviewRef} reviews={courseData?.reviews} />}
          {/* 연관과정 썸네일 공통 컴포넌트 작업 예정 (현재 작업 x) */}
          <div className={cn(pageFullInner.start, pageFullInner.inner, pageFullInner.bg_sec1)}>
            <div className={pageFullInner.contents}>공통 컴포넌트 대기중</div>
          </div>
        </div>
      ),
    },
    {
      title: t('수강전 문의'),
      key: '2',
      content: <div>수강전 문의</div>,
    },
    {
      title: t('커뮤니티'),
      key: '3',
      content: <div>커뮤니티</div>,
    },
    {
      title: t('새소식'),
      key: '4',
      content: <div>새소식</div>,
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

  // 과정 찜하기
  const handleCourseLike = async () => {
    if (isLikePending) return;

    await toggleLikeMutate(courseId || testCourseId, {
      onSuccess: () => {
        setLikeChk((prev) => !prev);
        setLikeCount((prev) => prev + (likeChk ? -1 : 1));

        const message = likeChk
          ? t('좋아요 목록에서 삭제하였습니다')
          : t('좋아요 목록에 추가하였습니다');
        openToast({
          title: message,
          type: 'success',
        });
      },
      onError: () => {
        console.log('좋아요 실패하였습니다');
      },
    });
    // try {

    //   const data = await courseLikeRequest(courseId || testCourseId);
    //   if (data) {
    //     setLikeCount((prev) => prev); // 증가
    //     setLikeChk(!likeChk);
    //   } else {
    //     setLikeCount((prev) => prev - 1); // 감소
    //     setLikeChk(false);
    //   }
    // } catch (err) {
    //   console.error('like course error', err);
    // }
  };

  const packageCardValueFn = (arr: Array<any>) => {
    return arr.map((a) => ({
      label: a.type,
      // imgSrc: a.thumbnail,
      imgSrc: listImage1,
      text: a.name,
    }));
  };

  // 퍼블수정 20250703 패키지 카드 리스트 값 추가
  // 패키지 카드
  // const packageCardValue = [
  //   {
  //     label: '패키지',
  //     imgSrc: listImage1,
  //     text: '필수 개발 과정 Spring Framework OpenAPI 서비스 필수요소 1',
  //   },
  //   {
  //     label: '패키지',
  //     imgSrc: listImage1,
  //     text: '필수 개발 과정 Spring Framework OpenAPI 서비스 필수요소 2',
  //   },
  //   {
  //     label: '패키지',
  //     imgSrc: listImage1,
  //     text: '필수 개발 과정 Spring Framework OpenAPI 서비스 필수요소 3',
  //   },
  // ];

  // 패키지 아코디언
  const [accordionValue, setAccordionValue] = useState<string>('p01');
  // 퍼블수정 20250703 수정
  // const accordionValueItems = [
  //   {
  //     value: 'a',
  //     title: (
  //       <div className={packageSideStyles.sub_package_title}>
  //         <p>반드시 알아야하는 파이썬 기본지식 반드시 알아야하는 파이썬</p>
  //       </div>
  //     ),
  //     children: (
  //       <PackageCardList
  //         cardListData={packageCardValue}
  //         className={packageSideStyles.sub_package_content}
  //       />
  //     ),
  //   },
  //   {
  //     value: 'b',
  //     title: (
  //       <div className={packageSideStyles.sub_package_title}>
  //         <p>관리자 대상 법정 필수 패키지</p>
  //       </div>
  //     ),
  //     children: (
  //       <PackageCardList
  //         cardListData={packageCardValue}
  //         className={packageSideStyles.sub_package_content}
  //       />
  //     ),
  //   },
  // ];
  const accordionValueItems = courseData?.package?.map((p: any) => ({
    value: p.id,
    title: (
      <div className={packageSideStyles.sub_package_title}>
        <p>{p.name}</p>
      </div>
    ),
    children: (
      <PackageCardList
        cardListData={packageCardValueFn(p.classes)}
        className={packageSideStyles.sub_package_content}
      />
    ),
  }));

  // 수강신청 있는 과정
  const [courseValues, setCourseValues] = useState<string | undefined>(undefined);
  // const courseOptions = [
  //   {
  //     label: '스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축',
  //     value: 'a',
  //     original: {
  //       number: '1차',
  //       date: '2026-01-15 ~ 2026-01-04',
  //       info: [
  //         {
  //           icon: IcoChair,
  //           txt: '999',
  //         },
  //         {
  //           icon: IcoLocation,
  //           txt: '온라인',
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     label: '스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축',
  //     value: 'b',
  //     original: {
  //       number: '2차',
  //       date: '2026-01-15 ~ 2026-01-04',
  //       info: [
  //         {
  //           icon: IcoChair,
  //           txt: '999',
  //         },
  //         {
  //           icon: IcoLocation,
  //           txt: '온라인 비대면',
  //         },
  //       ],
  //     },
  //   },
  // ];

  const courseOptions = courseData?.class?.map((c: any) => ({
    label: c.name,
    value: c.id,
    original: {
      number: `${c.number}차`,
      date: `${c.startDate} ~ ${c.endDate}`,
      info: [
        {
          icon: IcoChair,
          txt: `${c.remainingSeats}`,
        },
        {
          icon: IcoLocation,
          txt: `${c.location}`,
        },
      ],
    },
  }));

  // 학습유형 리스트 open, close
  const [listCategoryOpen, setListCategoryOpen] = useState<boolean>(true);
  const [listSubTitleOpen, setListSubTitleOpen] = useState<boolean>(true);

  const waitForRef = (ref: any, maxWaitTime = 3000) => {
    return new Promise((resolve, reject) => {
      if (ref.current) {
        resolve(ref.current);
        return;
      }

      let timeoutId: any;
      const observer = new MutationObserver(() => {
        if (ref.current) {
          clearTimeout(timeoutId);
          observer.disconnect();
          resolve(ref.current);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      timeoutId = setTimeout(() => {
        observer.disconnect();
        reject(new Error('Element not found within timeout'));
      }, maxWaitTime);
    });
  };

  useEffect(() => {
    if (!courseData?.course.courseLike) return;

    setLikeCount(courseData.course.courseLike);
    setLikeChk(courseData.course.courseLikeChk);
  }, [courseData?.course.courseLike]);

  return (
    <div className={`${styles.start} ${styles.package_wrap}`}>
      {/* page contents */}
      <div className={pageContentsStyles.start}>
        {/* main content */}
        <div className={pageContentsStyles.main_contents}>
          <div className={styles.thumbnail_img}>
            {/* 플레이 버튼 o */}
            {/* <Button> */}
            <img src={bnrImage1} alt="" />
            {/* <div className={styles.img_play}>
                <img src={playImg} alt="" />
              </div> */}
            {/* </Button> */}
            {/* 플레이 버튼 x */}
            {/* <img src={bnrImage1} alt="" /> */}
          </div>

          {/* <div>
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseDeadlineConfirm();
              }}
            >
              인원마감 + 수강대기 안내
            </Button>{' '}
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseDuplicateConfirm();
              }}
            >
              수강중복 안내
            </Button>{' '}
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseCancelConfirm();
              }}
            >
              수강신청 취소 신청
            </Button>{' '}
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseWaitAlert();
              }}
            >
              수강대기 신청 완료
            </Button>{' '}
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseDeadlineAlert();
              }}
            >
              인원마감 안내
            </Button>{' '}
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseLimitAlert();
              }}
            >
              수강제한 안내 (카테고리 내 제한, 월별 개수 제한)
            </Button>{' '}
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseCancelReasonModal();
              }}
            >
              수강취소 사유
            </Button>{' '}
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseCancelCompleteAlert();
              }}
            >
              수강취소 완료
            </Button>{' '}
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseAlarmAlert();
              }}
            >
              수강신청 알림
            </Button>{' '}
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseWaitRegistrationAlert();
              }}
            >
              수강대기자 등록
            </Button>{' '}
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseTimeAlert();
              }}
            >
              차수 알림 등록
            </Button>
            .
            <Button
              variant="chips"
              size="sm"
              onClick={() => {
                CourseEnrollComplete();
              }}
            >
              수강신청 완료
            </Button>
          </div> */}

          {courseData && (
            <>
              <div className={styles.tab_title}>
                <div className={styles.box}>
                  {(courseData?.isEnrollRequired
                    ? tabTitleSwiper
                    : tabTitleSwiper.filter((t) => t.isEroll === false)
                  ).map((item, index) => (
                    // 클래스
                    // active : 선택 표시
                    // new : 새로운 표시
                    <Button
                      key={index}
                      className={cn(
                        selectedTabTitle === index ? styles.active : '',
                        item.new && styles.new,
                      )}
                      onClick={() => {
                        handleTab(item.selectTabNumber, index);

                        if (item.targetRef) goToScrollRef(item.targetRef);
                      }}
                    >
                      {item.title}
                      {/* <em>{item.count}</em> */}
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
            </>
          )}
        </div>

        {/* sub content */}
        <div className={pageContentsStyles.sub_contents}>
          <div className={styles.sub_box}>
            {/* packageInformationStyles module */}
            <div
              className={`${packageInformationStyles.start} ${packageInformationStyles.information}`}
            >
              <strong className={packageInformationStyles.tit}>
                {courseData?.course?.courseName}
              </strong>
              {/* 퍼블수정 20250624 아이콘 변경 및 색상 수정 */}
              <div className={packageInformationStyles.count_box}>
                <div className={packageInformationStyles.box}>
                  <IcoStar width={16} height={16} stroke="#0056ff" fill="#0056ff" />
                  <span>{likeCount || courseData?.course?.courseStar}</span>
                </div>
                <div className={packageInformationStyles.box}>
                  <IcoEye width={16} height={16} stroke="#0056ff" />
                  <span>{courseData?.course?.courseViews}</span>
                </div>
              </div>
              {/* 구독 */}
              {channelData && channelData.isDisplay && (
                <div className={packageInformationStyles.subscribe_box}>
                  {/* 퍼블수정 20250624 로고 삭제 */}
                  <strong className={packageInformationStyles.channel_name}>
                    {channelData.channelName}
                  </strong>
                  {/* <Button
                    className={packageInformationStyles.btn_subscribe}
                    variant="primary"
                    size="xl"
                    onClick={() => handleSubscribeToast()}
                  >
                    구독하기
                  </Button> */}{' '}
                  {/* 채널 구독정보 아직 미완 */}
                </div>
              )}
              {/* 학습정보 */}
              <div className={packageInformationStyles.list_box}>
                <ul>
                  {courseData?.course?.data.type && (
                    <li>
                      <IcoBook width={20} height={20} stroke="#4d525c" fill="none" />
                      <p>{courseData?.course?.data.type}</p>
                    </li>
                  )}
                  {courseData?.course?.data.category && (
                    <li className={listCategoryOpen === true ? packageInformationStyles.open : ''}>
                      <IcoCategory width={20} height={20} fill="#4d525c" />
                      <p>
                        <span>{courseData?.course?.data.category}</span>
                      </p>
                      {/* <Button
                        onClick={() =>
                          listCategoryOpen === true
                            ? setListCategoryOpen(false)
                            : setListCategoryOpen(true)
                        }
                      >
                        <IcoArrowDown width={20} height={20} stroke="#4d525c" />
                      </Button> */}
                    </li>
                  )}
                  {/* <li>
                    <IcoLocation width={20} height={20} stroke="#4d525c" />
                    <p>{courseData?.course?.data.place}</p>
                  </li> */}
                  {/* <li>
                    <IcoTime width={20} height={20} fill="#4d525c" />
                    <p>{courseData?.course?.data.duration}</p>
                  </li> */}
                  {/* <li>
                    <IcoBuilding width={20} height={20} fill="#4d525c" />
                    <p>{courseData?.course?.data.outchannel}</p>
                  </li>
                  <li>
                    <IcoDivice width={20} height={20} fill="#4d525c" />
                    <p>{courseData?.course?.data.lernType}</p>
                  </li> */}
                  {courseData?.course?.data.level && (
                    <li>
                      <IcoLevel width={20} height={20} fill="#4d525c" />
                      <p>{courseData?.course?.data.level}</p>
                    </li>
                  )}
                  {/* <li>
                    <IcoPrize width={20} height={20} fill="#4d525c" />
                    <p>{courseData?.course?.data.certificate}</p>
                  </li> */}
                  {courseData?.course?.data.captionLanguage && (
                    <li className={listSubTitleOpen === true ? packageInformationStyles.open : ''}>
                      <IcoSubtitles02 width={20} height={20} fill="#4d525c" />
                      <p>{courseData?.course?.data.captionLanguage}</p>
                      {/* <Button
                        onClick={() =>
                          listSubTitleOpen === true
                            ? setListSubTitleOpen(false)
                            : setListSubTitleOpen(true)
                        }
                      >
                        <IcoArrowDown width={20} height={20} stroke="#4d525c" />
                      </Button> */}
                    </li>
                  )}
                </ul>
              </div>

              {/* 강의 */}
              <div className={packageInformationStyles.lecture_wrap}>
                {/* 수강 신청 차수 없을 시 */}
                {/* <Panel hideHeaderUnderline type="rounded" className={styles.result_box}>
                  <div>
                    <IcoCaution width={40} height={40} stroke={'#A9AFB8'} />
                    <strong>{t('현재 수강 신청 가능한 차수가 없습니다.')}</strong>
                  </div>
                </Panel> */}
                {/* 인원마감/대기신청 */}
                {/* <Panel hideHeaderUnderline type="rounded" className={styles.result_box}>
                  <div>
                    <IcoClock01 width={40} height={40} stroke={'#0056ff'} />
                    <strong>{t('오전 10:00 수강신청이 시작됩니다!')}</strong>
                    <p>{t('수강신청일시는 예고없이 변경될수 있습니다.')}</p>
                  </div>
                </Panel> */}
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
                <CourseFixedButton
                  course={courseData?.class.length}
                  likeCount={likeCount}
                  heart={likeChk}
                  handleCourseLike={handleCourseLike}
                  courseValues={courseValues}
                  setCourseValues={setCourseValues}
                />
              </div>
            </div>
          </div>

          {/* 패키지 */}
          <div
            className={`${packageSideStyles.start} ${packageSideStyles.package} ${styles.sub_tit}`}
          >
            <div className={styles.tit_box}>
              <strong>
                {t('패키지')}
                <em>10</em>
              </strong>
            </div>
            <div className={`${packageSideStyles.package_box}`}>
              {courseData && (
                <Accordion
                  items={accordionValueItems}
                  value={accordionValue}
                  className={packageSideStyles.acc_package}
                  onValueChange={(value) => setAccordionValue(value as string)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
