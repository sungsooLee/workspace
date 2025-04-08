import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Tabs, Accordion } from '@learnway/ui';
import { IcoHeart, IcoUser01, IcoShare, IcoStar } from '@learnway/icons';
import { CourseDashboard, CourseIntroduction } from '../../../features/layout';

import pageContentsStyles from '../../_page-contents.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';
import lectureStyles from './lecture.module.css';

import styles from './detail.module.css';

// 이미지
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import logoHyundai from '@learnway/styles/fo/assets/images/common/logo_hyundai.png';

export const Route = createFileRoute('/_layout/course-introduction/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  // 찜
  const [heart, setHeart] = useState(false);

  // 탭
  const [selectedTabKey, setSelectedTabKey] = useState<string>('');
  const items = [
    {
      title: '대시보드',
      key: 'a',
      content: (
        <div className={styles.dashboard_content}>
          <CourseDashboard />
        </div>
      ),
    },
    {
      title: '과정소개',
      key: 'b',
      content: (
        <div className={styles.introduction_content}>
          <CourseIntroduction />
        </div>
      ),
    },
    {
      title: '후기',
      key: 'c',
    },
  ];

  // 패키지 아코디언
  const [value2, setValue2] = useState<string>('');
  const dummyItems2 = [
    {
      value: 'a',
      title: (
        <div className={styles.sub_package_title}>
          <strong>패키지 1</strong>
        </div>
      ),
      children: (
        <div className={styles.sub_package_content}>
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
        <div className={styles.sub_package_title}>
          <strong>패키지 2</strong>
        </div>
      ),
      children: <div className={styles.sub_package_content}>Content B</div>,
    },
  ];

  return (
    <div className={`${styles.start} ${styles.package_wrap}`}>
      {/* page contents */}
      <div className={pageContentsStyles.start}>
        {/* main content */}
        <div className={pageContentsStyles.main_contents}>
          <div className={styles.thumbnail_img}>
            {/* 플레이 버튼 o */}
            {/* <Button>
              <img src={bnrImage1} alt="" />
              <div className={styles.img_play}>
                <img src={playImg} alt="" />
              </div>
            </Button> */}
            {/* 플레이 버튼 x */}
            <img src={bnrImage1} alt="" />
          </div>

          <div className={styles.tab_wrap}>
            <Tabs selectedTabKey={selectedTabKey} items={items} type="line" />
          </div>
        </div>

        {/* sub content */}
        <div className={pageContentsStyles.sub_contents}>
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
                  <IcoStar width={16} height={16} stroke="#ffb902" fill="#ffb902" />
                  <span>4.2</span>
                </div>
                <div className={packageInformationStyles.box}>
                  <IcoHeart width={16} height={16} stroke="#6f798b" fill="none" />
                  <span>500</span>
                </div>
                <div className={packageInformationStyles.box}>
                  <IcoUser01 width={16} height={16} stroke="#6f798b" />
                  <span>77,500</span>
                </div>
              </div>
              {/* 구독 */}
              <div className={packageInformationStyles.subscribe_box}>
                <span className={packageInformationStyles.channel}>
                  <img src={logoHyundai} alt="" />
                </span>
                <strong className={packageInformationStyles.channel_name}>
                  현대오토에버 (elBls)
                </strong>
                <Button
                  className={packageInformationStyles.btn_subscribe}
                  variant="primary"
                  size="sm"
                >
                  구독하기
                </Button>
              </div>
              {/* 학습정보 */}
              <div className={packageInformationStyles.list_box}>
                {/* definition list */}
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
                {/* 강의 정보 */}
                <div className={`${lectureStyles.start} ${lectureStyles.course_information}`}>
                  <div className={`${lectureStyles.box} ${packageInformationStyles.box}`}>
                    <p className={lectureStyles.date}>
                      <span>1차교육</span>
                      <span>2026-01-01 ~ 2026-01-31 </span>
                    </p>
                    <strong className={lectureStyles.tit}>
                      스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축
                    </strong>
                  </div>
                  <div className={`${lectureStyles.box} ${packageInformationStyles.box}`}>
                    {/* definition list */}
                    <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
                      <dl>
                        <dt>잔여석</dt>
                        <dd>999</dd>
                      </dl>
                      <dl>
                        <dt>장소</dt>
                        <dd>온라인 비대면</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                {/* 강의 정보 */}
                <div className={`${lectureStyles.start} ${lectureStyles.course_information}`}>
                  <div className={`${lectureStyles.box} ${packageInformationStyles.box}`}>
                    <p className={lectureStyles.date}>
                      <span>2차교육</span>
                      <span>2026-01-01 ~ 2026-01-31 </span>
                    </p>
                    <strong className={lectureStyles.tit}>
                      스마트제조를 위한 스마트공장 구축 및 추진실무 - MES 구축
                    </strong>
                  </div>
                  <div className={`${lectureStyles.box} ${packageInformationStyles.box}`}>
                    {/* definition list */}
                    <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
                      <dl>
                        <dt>잔여석</dt>
                        <dd>999</dd>
                      </dl>
                      <dl>
                        <dt>장소</dt>
                        <dd>온라인 비대면</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* button */}
              <div className={packageInformationStyles.btn_box}>
                <Button onClick={() => (heart === true ? setHeart(false) : setHeart(true))}>
                  <IcoHeart
                    width={20}
                    height={20}
                    stroke={heart === true ? '#ff4646' : '#4c515e'}
                    fill={heart === true ? '#ff4646' : 'none'}
                  />
                </Button>
                <Button>
                  <IcoShare width={20} height={20} stroke="#4c515e" />
                </Button>
              </div>
            </div>
          </div>

          {/* 패키지 */}
          <div className={styles.sub_box}>
            <div className={styles.tit_box}>
              <strong>
                패키지<em>10</em>
              </strong>
            </div>
            <div className={styles.package_box}>
              <Accordion
                items={dummyItems2}
                value={value2}
                className={styles.acc_package}
                onValueChange={(value2) => setValue2(value2 as string)}
                type={'multiple'}
              />
            </div>
          </div>

          {/* 연관 과정 */}
          <div className={styles.sub_box}>
            <div className={styles.tit_box}>
              <strong>
                연관 과정<em>20</em>
              </strong>
            </div>
            <div className={styles.procedure_box}>contents</div>
          </div>
        </div>
      </div>
    </div>
  );
}
