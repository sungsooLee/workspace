import { useState, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import {
  Button,
  Tabs,
  Accordion,
  EmptyText,
  OptionCard,
  OptionCardItem,
  useModal,
  Textarea,
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
  IcoUser01,
  IcoStar,
  IcoCaution,
  IcoClock01,
  IcoPlay,
  IcoAvatar,
  IcoSymbol,
} from '@learnway/icons';
import {
  CourseDashboard,
  CourseIntroduction, // 과정소개
  CourseEducation, // 교육일정
  CourseReview, // 후기
  CourseInformationPopup, // 수강신청 불가 팝업창들 및 반려 팝업
  CourseFixedButton, // 수강신청 버튼
} from '../../../features/layout';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import pageContentsStyles from '../../_page-contents.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';
import lectureStyles from './lecture.module.css';
import thumnailStyles from '../../../shared/ui/thumnail/thumnail.module.css';
import thumnailImgStyles from '../../../shared/ui/thumnail/thumnail-img.module.css';
import packageSideStyles from './package-side.module.css';
import relatedSideStyles from './related-side.module.css';

import styles from './detail.module.css';

// 이미지
import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import logoHyundai from '@learnway/styles/fo/assets/images/common/logo_hyundai.png';
import listImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_layout/course-introduction/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const { confirm: openConfirm } = useModal();
  const { alert: openAlert } = useModal();

  // 탭
  const [selectedTabKey, setSelectedTabKey] = useState<string>('1');
  const [selectedTabTitle, setSelectedTabTitle] = useState<number>(0);

  // 탭 타이틀
  const tabTitle = [
    { title: '대시보드', tabNumber: '1' },
    { title: '과정소개', tabNumber: '2' },
    { title: '교육일정', tabNumber: '2' }, // 과정소개 탭 안에서 교욱일정이 있기 때문에 tabNumber값 동일
    { title: '후기', count: '0', tabNumber: '2' }, // 과정소개 탭 안에서 후기가 있기 때문에 tabNumber값 동일
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
      key: '1',
      content: (
        <div className={styles.dashboard_content}>
          <CourseDashboard />
        </div>
      ),
    },
    {
      title: '과정소개',
      key: '2',
      content: (
        <div className={styles.introduction_content}>
          <CourseIntroduction />
          <CourseEducation />
          <CourseReview />
        </div>
      ),
    },
  ];

  // 패키지 아코디언
  const [accordionValue, setAccordionValue] = useState<string>('');
  const accordionValueItems = [
    {
      value: 'a',
      title: (
        <div className={packageSideStyles.sub_package_title}>
          <div
            className={cn(
              thumnailStyles.start,
              thumnailStyles.thumbnail,
              thumnailStyles.horizontal,
            )}
          >
            {/* link (찜 기능과 겹침으로 따로 빠짐) */}
            <Link to="" className={thumnailStyles.link}></Link>

            <div className={thumnailStyles.thumnail_box}>
              {/* img */}
              <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                <ul className={thumnailImgStyles.label}>
                  <li style={{ backgroundColor: '#00afd5' }}>New</li>
                </ul>
                <div className={thumnailImgStyles.img}>
                  <img src={listImage1} alt="" />
                </div>
              </div>
              {/* txt */}
              <div className={thumnailStyles.text_box}>
                <p className={thumnailStyles.text}>
                  필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정필수개발과정
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      children: (
        <div className={packageSideStyles.sub_package_content}>
          <p>필수 개발 과정 Spring Framework활한 OpenAPI 서비스 개발</p>
          <p>필수 개발 과정 Spring Framework활한 OpenAPI 서비스 개발</p>
          <p>필수 개발 과정 Spring Framework활한 OpenAPI 서비스 개발</p>
          <p>필수 개발 과정 Spring Framework활한 OpenAPI 서비스 개발</p>
        </div>
      ),
    },
    {
      value: 'b',
      title: (
        <div className={packageSideStyles.sub_package_title}>
          <div
            className={cn(
              thumnailStyles.start,
              thumnailStyles.thumbnail,
              thumnailStyles.horizontal,
            )}
          >
            {/* link (찜 기능과 겹침으로 따로 빠짐) */}
            <Link to="" className={thumnailStyles.link}></Link>

            <div className={thumnailStyles.thumnail_box}>
              {/* img */}
              <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                <ul className={thumnailImgStyles.label}>
                  <li style={{ backgroundColor: '#00afd5' }}>New</li>
                </ul>
                <div className={thumnailImgStyles.img}>
                  <img src={listImage1} alt="" />
                </div>
              </div>
              {/* txt */}
              <div className={thumnailStyles.text_box}>
                <p className={thumnailStyles.text}>필수개발과정</p>
              </div>
            </div>
          </div>
        </div>
      ),
      children: <div className={packageSideStyles.sub_package_content}>Content B</div>,
    },
  ];

  // 수강신청 있는 과정
  const [courseValues, setCourseValues] = useState<string>();
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

  // 수강신청 취소 신청
  const CourseCencelConfirm = () => {
    openConfirm({
      title: <>수강 신청을 취소하시겠습니까?</>,
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

  // 수강신청 취소 사유 입력
  const CourseCencelReasonConfirm = () => {
    openConfirm({
      title: <>수강신청 취소 사유를 입력해주세요</>,
      content: (
        <div className={`${formStyles.form_item} ${styles.form_item}`}>
          <div className={formStyles.input_box}>
            <Textarea
              id="textarea"
              rows={2}
              cols={2}
              resize="none"
              placeholder="Text"
              maxLength={100}
              className={formStyles.textarea}
            />
          </div>
        </div>
      ),
      okButtonLabel: '확인',
      cancelButtonLabel: '취소',
    });
  };

  // 수창취소 완료
  const CourseCencelCompleteAlert = () => {
    openAlert({
      title: <>수강취소 되었습니다</>,
    });
  };

  // 수강신청 알림
  const CourseAlarmAlert = () => {
    openAlert({
      title: <>수강신청 알림</>,
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
  const CourseWaitAlert = () => {
    openAlert({
      title: <>수강대기자 등록</>,
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
  const CourseTimeAlert = () => {
    openAlert({
      title: <>차수 알림 등록</>,
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

          <Carousel
            items={itemSwiper}
            className={`${styles.card_swiper}`}
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
          />

          <div className={styles.tab_title}>
            <div className={styles.box}>
              {tabTitle.map((item, index) => (
                <Button
                  key={item.tabNumber}
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
                  <IcoAvatar width={16} height={16} fill="#a1c2ff" />
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
                {/* definitionListStyles module */}
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
                  className={packageInformationStyles.course_card}
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
                          {original.definitionList.map((item: any) => (
                            <dl>
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
                type={'multiple'}
              />
            </div>
          </div>

          {/* 연관 과정 */}
          <div
            className={`${relatedSideStyles.start} ${relatedSideStyles.related} ${styles.sub_box} `}
          >
            <div className={styles.tit_box}>
              <strong>
                연관 과정<em>20</em>
              </strong>
            </div>
            <ul className={relatedSideStyles.procedure_box}>
              <li>
                {/* thumnail module */}
                <div
                  className={cn(
                    thumnailStyles.start,
                    thumnailStyles.thumbnail,
                    thumnailStyles.horizontal,
                  )}
                >
                  {/* link (찜 기능과 겹침으로 따로 빠짐) */}
                  <Link to="" className={thumnailStyles.link}></Link>

                  <div className={thumnailStyles.thumnail_box}>
                    {/* img */}
                    <div className={`${thumnailImgStyles.start} ${thumnailImgStyles.img_box}`}>
                      <ul className={thumnailImgStyles.label}>
                        <li style={{ backgroundColor: '#00afd5' }}>New</li>
                      </ul>
                      <div className={thumnailImgStyles.img}>
                        <img src={listImage1} alt="" />
                      </div>
                    </div>
                    {/* txt */}
                    <div className={thumnailStyles.text_box}>
                      <div className={thumnailStyles.type}>
                        {/* type */}
                        <span className={thumnailStyles.txt}>동영상</span>
                        <span className={thumnailStyles.time}>
                          {/* time icon */}
                          <IcoPlay width={12} height={12} fill="#6f798b" />
                          {/* time */}
                          04:59
                        </span>
                      </div>
                      <p className={thumnailStyles.text}>필수개발과정</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
