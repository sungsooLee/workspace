import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Tabs } from '@learnway/ui';
import { IcoHeart, IcoUser01, IcoShare, IcoArrowDown } from '@learnway/icons';
import { MobileView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import {
  CourseDashboard,
  CourseIntroduction,
  CourseInformationPopup,
} from '../../../features/layout';

import operatorStyles from './operator.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';
import styles from './detail-m.module.css';

// 예시 이미지
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import logoHyundai from '@learnway/styles/fo/assets/images/common/logo_hyundai.png';
import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';

export const Route = createFileRoute('/_layout/course-introduction/detail-m')({
  component: RouteComponent,
});

function RouteComponent() {
  // 패키지 자세한 정보 아코디언
  const [packageInformation, setPackageInformation] = useState(true);

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

  return (
    <div className={`${styles.start} ${styles.package_wrap}`}>
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
            <Button className={packageInformationStyles.btn_subscribe} variant="primary" size="sm">
              구독하기
            </Button>
          </div>

          {/* button fix */}
          <MobileView>
            <MobileContainerFooter>
              <div className={packageInformationStyles.btn_box}>
                <Button>
                  <IcoHeart width={20} height={20} stroke="#4c515e" fill="none" />
                  {/* 찜 상태 */}
                  {/* <IcoHeart width={20} height={20} stroke="#ff4646" fill="#ff4646" /> */}
                </Button>
                <Button>
                  <IcoShare width={20} height={20} stroke="#4c515e" />
                </Button>
              </div>
            </MobileContainerFooter>
          </MobileView>
        </div>
      </div>

      <div className={styles.tab_wrap}>
        <Tabs selectedTabKey={selectedTabKey} items={items} type="line" />
      </div>
    </div>
  );
}
