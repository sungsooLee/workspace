import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChipList, SelectOption, Button, Tabs, Avatar } from '@learnway/ui';
import { IcoHeart, IcoUser01, IcoShare } from '@learnway/icons';

import pageContentsStyles from '../../_page-contents.module.css';
import operatorStyles from './operator.module.css';
import definitionListStyles from './definition-list.module.css';
import packageInformationStyles from './package-information.module.css';
import bulletStyles from './bullet.module.css';
import styles from './detail.module.css';

// 이미지
import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';
import logoHyundai from '@learnway/styles/fo/assets/images/common/logo_hyundai.png';
import learnImg from '@learnway/styles/fo/assets/images/common/img_learn.png';

export const Route = createFileRoute('/_layout/course-introduction/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const options: SelectOption[] = [
    { label: '스마트팩토리', value: 'A' },
    { label: '디지털혁신', value: 'B' },
    { label: '정보보안기술', value: 'C' },
    { label: '스마트팩토리', value: 'D' },
    { label: '스마트팩토리', value: 'E' },
    { label: '스마트팩토리', value: 'F' },
    { label: '스마트팩토리', value: 'G' },
    { label: '스마트팩토리', value: 'H' },
    { label: '스마트팩토리', value: 'I' },
    { label: '스마트팩토리', value: 'J' },
    { label: '스마트팩토리', value: 'K' },
    { label: '스마트팩토리', value: 'L' },
    { label: '스마트팩토리', value: 'M' },
  ];

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
      content: (
        <div className={styles.detail_content}>
          <h2>과정소개</h2>

          {/* notice */}
          <div className={styles.learn_box}>
            <div className={styles.tit_box}>
              <img src={learnImg} alt="" />
              <strong>이런 걸 배워요!</strong>
            </div>
            {/* bullet list */}
            <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
              <ul>
                <li>
                  본 과정은 다양한 OPIC 문제에 대한 답변 연습을 통해 고급영어 말하기를 완성할 수
                  있도록 도와주는 과정입니다.
                </li>
                <li>
                  OPIC IH 이상의 등급을 받는 데 도움을 받을 수 있는 과정이며 다양한 OPIC 문제에 대한
                  답변 연습을 통해 고급 영어 말하기 능력을 키울 수 있습니다.
                </li>
              </ul>
            </div>
          </div>

          {/* chip */}
          <div className={styles.package_box}>
            <div className={styles.chip_box}>
              <ChipList options={options} prefixCharacter="#" hideCloseButton />
            </div>
          </div>

          {/* 교육목표 */}
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>교육목표</strong>
            </div>
            {/* bullet list number */}
            <div className={`${bulletStyles.start} ${bulletStyles.list_number}`}>
              <ol>
                <li>스마트팩토리 추진 사례를 통한 현업 적용과 실천 방향을 습득한다.</li>
                <li>
                  스마트팩토리 생산관리 시스템(MES) 기본 지식 습득으로 협장 구축 응용력을
                  향상시킨다.
                </li>
                <li>스마트팩토리 MES에 대한 이해를 바탕으로 적용 방안을 활용한다.</li>
              </ol>
            </div>
          </div>

          {/* 교육내용 */}
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>교육내용</strong>
            </div>
            {/* bullet list */}
            <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
              <ul>
                <li>4차 산업혁명, 디지털 혁신</li>
                <li>스마트 설비 설계</li>
                <li>클라우드시스템, AR MES&ERP 실무</li>
                <li>스마트 공장 프로세스</li>
                <li>스마트 공장 구축사례</li>
                <li>스마트 공장 핵심기술 이해 및 적용</li>
                <li>스마트 공장 설비 최적화</li>
                <li>스마트 공장 설비 최적화</li>
              </ul>
            </div>
          </div>

          {/* 커리큘럼 */}
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>커리큘럼</strong>
            </div>

            <div className={styles.curriculum}>
              <ol>
                <li>
                  <div className={styles.tit_box}>
                    <strong>1. 안전교육 | 강사 이승훈(현대오토에버 L&D플랫폼팀)</strong>
                  </div>
                  <div className={styles.txt_box}>
                    <ul>
                      <li>
                        <p>산업안전보건/공정안전관리/산업보건관리/물질안전보건/일반안전관리</p>
                        <span>8시간</span>
                      </li>
                      <li>
                        <p>산업안전보건/공정안전관리/산업보건관리/물질안전보건/일반안전관리</p>
                        <span>8시간</span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className={styles.tit_box}>
                    <strong>2. 사업장 교육 1 (강사 김지선)</strong>
                  </div>
                  <div className={styles.txt_box}>
                    <ul>
                      <li>
                        <p>산업안전보건/공정안전관리/산업보건관리/물질안전보건/일반안전관리</p>
                        <span>8시간</span>
                      </li>
                      <li>
                        <p>산업안전보건/공정안전관리/산업보건관리/물질안전보건/일반안전관리</p>
                        <span>8시간</span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className={styles.tit_box}>
                    <strong>3. 사업장 교육 2 (강사 : 이승훈 )</strong>
                  </div>
                  <div className={styles.txt_box}>
                    <ul>
                      <li>
                        <p>냉연공정의 이해(PL/TCM, CAL 등)</p>
                        <span>2시간</span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* 과정 및 학습제한 안내 */}
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>과정 및 학습제한 안내</strong>
            </div>
            {/* bullet list */}
            <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
              <ul>
                <li>
                  연계학습 : 본 과정은 야나두 웹사이트 및 앱을 사용하는 과정입니다. 앱을 다운로드
                  받아주세요.
                </li>
                <li>
                  보안프로그램 : 본 과정은 보안프로그램을 설치해야 하는 과정입니다. 학습 전,{' '}
                  <Link to="">보안프로그램</Link>을 먼저 설치해주세요.
                </li>
                <li>승인필요 : 본 과정은 수강신청 후 팀장 및 교육담당자 승인이 필요합니다.</li>
                <li>학습장소 : 본 과정은 사내에서만 학습 하실 수 있습니다.</li>
                <li>학습시간 : 근무시간(오전9시 ~ 오후 6시)에는 학습 하실 수 없습니다.</li>
                <li>학습시간 : 근무시간(오전9시 ~ 오후 6시)에만 학습 하실 수 있습니다.</li>
                <li>1일 진도 : 하루에 30%만 학습 하실 수 있습니다.</li>
                <li>복습제한 : 본 과정은 복습을 하실 수 없습니다.</li>
                <li>중복수강 : 본 과정은 중복 수강을 하실 수 없습니다.</li>
              </ul>
            </div>
          </div>

          {/* 강사소개 */}
          <div className={styles.operator_box}>
            <strong>강사소개</strong>
            {/* operator */}
            <div className={`${operatorStyles.start} ${operatorStyles.operator}`}>
              <div className={operatorStyles.avatar}>
                <Avatar imageUrl="https://github.com/shadcn.png" className={styles.info_avata} />
              </div>
              <div className={operatorStyles.txt_box}>
                <div className={operatorStyles.profile}>
                  <strong>김현대 사외강사</strong>
                </div>
                <div className={operatorStyles.definition_list}>
                  <span className={operatorStyles.txt}>
                    현&#41; 한국산업기술협회 연구원 수석교수
                  </span>
                  <span className={operatorStyles.txt}>현&#41; 표면처리기술사</span>
                  <span className={operatorStyles.txt}>현&#41; 한국산업인력공단 NSC 개발위원</span>
                </div>
              </div>
            </div>
          </div>

          {/* 과정 운영자 */}
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

          <div className={styles.review_wrap}>
            <h2>
              후기<span>999,999+</span>
            </h2>
          </div>
        </div>
      ),
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

          <div>
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
