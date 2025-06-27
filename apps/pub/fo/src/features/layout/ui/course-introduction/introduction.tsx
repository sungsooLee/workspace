import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChipList, SelectOption, Button, Avatar } from '@learnway/ui';
import { IcoArrowDown, IcoSymbol } from '@learnway/icons';
import { Review, ReviewRating, Curriculum } from '../../../../features/layout';

import operatorStyles from '../../../../pages/_layout/course-introduction/operator.module.css';
import definitionListStyles from '../../../../pages/_layout/course-introduction/definition-list.module.css';
import dataNoticeStyles from '../../../../shared/ui/data-display/notice.module.css';
import bulletStyles from '../../../../shared/ui/list/bullet.module.css';
import styles from './introduction.module.css';

import learnImg from '@learnway/styles/fo/assets/images/common/img_learn.png';
import discriminationImg from '@learnway/styles/fo/assets/images/temp/img_discrimination.png';

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

  return (
    <div className={`${styles.start} ${styles.introduction}`}>
      <h2>과정 한눈에 파악하기</h2>

      {/* dataNoticeStyles module */}
      <div className={`${dataNoticeStyles.start} ${dataNoticeStyles.notice} ${styles.notice}`}>
        <div className={dataNoticeStyles.tit}>
          <IcoSymbol width={20} height={20} />
          AI가 요약한 과정 핵심내용
        </div>
        <p className={dataNoticeStyles.txt}>
          본 과정에서는 데이터 자동화, 보고서 생성, 반복 업무 최적화 등 실무에 바로 적용 가능한
          파이썬 활용을 손쉽게 해결하는 방법을 단계별로 배웁니다. 비전공자도 이해할 수 있도록
          단계별로 구성되어 있어 실무 문제 해결 역량 향상을 목표로 합니다.
        </p>
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
        {/* bullet number module */}
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
        {/* bullet module */}
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

      {/* 이런 학습자에게 유익해요! */}
      <div className={styles.info_box}>
        <div className={styles.tit_box}>
          <strong>이런 학습자에게 유익해요!</strong>
        </div>
        {/* bullet module */}
        <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
          <ul>
            <li>제조실행시스템(MES) 적용방법 이해</li>
            <li>제조실행시스템(MES)을 활용한 기업의 생산 및 품질관리 능력 배양</li>
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

      {/* 이수기준 */}
      <div className={styles.info_box}>
        <div className={styles.tit_box}>
          <strong>이수기준</strong>
        </div>
        <div className={styles.evaluation_box}>
          <ul>
            <li>
              <span>총점(100%)</span>
              <strong>70점 이상</strong>
            </li>
            <li>
              <span>진도/출석(50%)</span>
              <strong>70점 이상</strong>
            </li>
            <li>
              <span>진행단계평가 (10%)</span>
              <strong>70점 이상</strong>
            </li>
            <li>
              <span>최종평가 (20%)</span>
              <strong>70점 이상</strong>
            </li>
            <li>
              <span>과제평가 (20%)</span>
              <strong>70점 이상</strong>
            </li>
          </ul>
          {/* bulletStyles */}
          <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
            <ul>
              <li>항목의 이수기준을 교육기간 내 충족해야 수료 처리됩니다.</li>
              <li>
                최종평가, 과제평가가 있을 시 반드시 기한 내 제출해야 합니다. (단, 제출기회는 1회)
              </li>
              <li>과제물은 반드시 문서보안을 해제해 등록해야 평가가 가능합니다.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 퍼블수정 20250519 : 자료실 삭제 */}

      {/* 다른 강의와의 차별점 */}
      <div className={styles.info_box}>
        <div className={styles.tit_box}>
          <strong>다른 강의와의 차별점</strong>
        </div>

        <div className={styles.img_box}>
          <img src={discriminationImg} alt="" />
        </div>
      </div>

      {/* 과정 및 학습제한 안내 */}
      <div className={styles.info_box}>
        <div className={styles.tit_box}>
          <strong>과정 및 학습제한 안내</strong>
        </div>
        {/* bullet module */}
        <div className={`${bulletStyles.start} ${bulletStyles.list}`}>
          <ul>
            <li>
              연계학습 : 본 과정은 야나두 웹사이트 및 앱을 사용하는 과정입니다. 앱을 다운로드
              받아주세요.
            </li>
            <li>
              보안프로그램 : 본 과정은 보안프로그램을 설치해야 하는 과정입니다. 학습 전,
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
        {/* operator module */}
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
        {/* operator module */}
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
              {/* definition module */}
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
  );
};

export const CourseIntroduction = memo(CourseIntroductionCompoment);
