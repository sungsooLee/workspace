import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChipList, SelectOption, Button, Avatar } from '@learnway/ui';
import { IcoArrowDown } from '@learnway/icons';
import { Review, ReviewRating, Curriculum } from '../../../../features/layout';

import operatorStyles from '../../../../pages/_layout/course-introduction/operator.module.css';
import definitionListStyles from '../../../../pages/_layout/course-introduction/definition-list.module.css';
import bulletStyles from '../../../../pages/_layout/course-introduction/bullet.module.css';
import styles from './introduction.module.css';

import learnImg from '@learnway/styles/fo/assets/images/common/img_learn.png';

const CourseIntroductionCompoment = () => {
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

  // 찜
  const [heart, setHeart] = useState(false);

  return (
    <div className={`${styles.start} ${styles.introduction}`}>
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
              본 과정은 다양한 OPIC 문제에 대한 답변 연습을 통해 고급영어 말하기를 완성할 수 있도록
              도와주는 과정입니다.
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
              스마트팩토리 생산관리 시스템(MES) 기본 지식 습득으로 협장 구축 응용력을 향상시킨다.
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

        {/* curriculum */}
        <Curriculum />
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
              <span className={operatorStyles.txt}>현&#41; 한국산업기술협회 연구원 수석교수</span>
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
        {/* review rating */}
        <ReviewRating className={styles.review_rating} />
        <div className={styles.review_box}>
          <ul className={styles.review_list}>
            {/* review */}
            <li>
              <Review />
            </li>
            <li>
              <Review />
            </li>
          </ul>
          {/* 더보기 */}
          <div className={styles.more_box}>
            <Button className={styles.btn_more}>
              <span>더보기</span>
              <IcoArrowDown width={16} height={16} stroke="#6f798b" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CourseIntroduction = memo(CourseIntroductionCompoment);
