import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ChipList, SelectOption, Button, Tabs } from '@learnway/ui';
import { IcoHeart, IcoUser01, IcoShare } from '@learnway/icons';

import pageContentsStyles from '../../_page-contents.module.css';
import operatorStyles from './operator.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';
import styles from './package.module.css';

// 이미지
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import logoHyundai from '@learnway/styles/fo/assets/images/common/logo_hyundai.png';
import playImg from '@learnway/styles/fo/assets/images/common/img_play.png';

export const Route = createFileRoute('/_layout/course-introduction/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedTabKey, selectedTabKey2] = useState<string>('');
  const items = [
    {
      title: '대시보드',
      key: 'a',
      content: <h2>a</h2>,
    },
    {
      title: '과정소개',
      key: 'b',
      content: <h2>Tab B content</h2>,
    },
  ];

  const options: SelectOption[] = [
    { label: '스마트팩토리', value: 'A' },
    { label: '디지털혁신', value: 'B' },
    { label: '정보보안기술', value: 'C' },
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

          <div>
            <Tabs selectedTabKey={selectedTabKey} items={items} type="line" />
          </div>

          <div className={styles.package_box}>
            <div className={styles.chip_box}>
              <ChipList options={options} prefixCharacter="#" hideCloseButton />
            </div>
          </div>

          <div className={styles.operator_box}>
            <strong>과정 운영자</strong>
            {/* operator */}
            <div className={`${operatorStyles.start} ${operatorStyles.operator}`}>
              <div className={operatorStyles.avatar}>
                <span>김</span>
              </div>
              <div className={operatorStyles.txt_box}>
                <div className={operatorStyles.profile}>
                  <strong>김지민 책임</strong>
                  <div>
                    <span>현대오토에버</span>
                    <span>L&D플랫폼팀</span>
                  </div>
                </div>
                <div className={operatorStyles.definition_list}>
                  {/* definition list */}
                  <div className={`${definitionListStyles.start} ${definitionListStyles.list}`}>
                    <dl>
                      <dt>이메일</dt>
                      <dd>abc@hyundai.conm</dd>
                    </dl>
                    <dl>
                      <dt>전화</dt>
                      <dd>02-555-2323</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* sub content */}
        <div className={pageContentsStyles.sub_contents}>
          <div className={styles.sub_box}>
            {/* package information */}
            <div
              className={`${packageInformationStyles.start} ${packageInformationStyles.information}`}>
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
                  size="sm">
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
              {/* button */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
