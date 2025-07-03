import { memo } from 'react';

import styles from './curriculum.module.css';

interface CurriculumProps {
  className?: string;
}

const CurriculumComponent = ({ className }: CurriculumProps) => {
  return (
    <div className={`${styles.start} ${styles.curriculum} ${styles.className}`}>
      <ol>
        <li>
          <div className={styles.tit_box}>
            <strong>1. 안전교육 | 강사 이승훈(현대오토에버 L&D플랫폼팀)</strong>
            <span>완료</span>
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
  );
};

export const Curriculum = memo(CurriculumComponent);
