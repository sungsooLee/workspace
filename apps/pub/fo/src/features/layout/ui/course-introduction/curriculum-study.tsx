import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { Button, useModal } from '@learnway/ui';
import styles from './curriculum-study.module.css';
import { IcoArrowDown } from '@learnway/icons';
import { NoticeDetailPopup } from '../../../../features/layout';

interface CurriculumStudyProps {
  className?: string;
}

const CurriculumStudyComponent = ({ className }: CurriculumStudyProps) => {
  const { open: openModal } = useModal();
  return (
    <div className={`${styles.start} ${styles.curriculum} ${styles.className}`}>
      <ol>
        <li>
          <div className={styles.tit_box}>
            <strong>[리얼법전] 김정근, 이지애와 함께하는 직장 내 성희롱 예방교육</strong>
            <span>1시간</span>
          </div>
          <div className={styles.txt_box}>
            <ul>
              <li>
                <span className={styles.subject}>
                  1. (리얼법전) 김정근, 이지애와 함께하는 직장 내 성희롱 예방교육
                </span>
                <div className={styles.stats_div}>
                  <span className={styles.stats}>
                    <em className={styles.learning}>학습완료</em>
                    <Button
                      onClick={() =>
                        openModal({
                          width: isMobile ? 'm_full' : 'sm',
                          content: <NoticeDetailPopup />,
                        })
                      }
                    >
                      학습이력
                    </Button>
                  </span>
                  {/* 학습전 variant="line" 학습중 variant="primary" */}
                  <Button variant="line" size={isMobile ? 'ts' : 'sm'} className={styles.btn}>
                    학습하기
                  </Button>
                </div>
              </li>
              {/* 학습중 styles.ing */}
              <li className={styles.ing}>
                <span className={styles.subject}>2. (파악하기) 직장 내 성희롱, 판단 기준은?</span>
                <div className={styles.stats_div}>
                  <span className={styles.stats}>
                    <em className={styles.learning}>학습중</em>
                    <Button
                      onClick={() =>
                        openModal({
                          width: isMobile ? 'm_full' : 'sm',
                          content: <NoticeDetailPopup />,
                        })
                      }
                    >
                      학습이력
                    </Button>
                  </span>
                  <Button variant="primary" size={isMobile ? 'ts' : 'sm'} className={styles.btn}>
                    학습하기
                  </Button>
                </div>
              </li>
              <li>
                <span className={styles.subject}>3. (파악하기) 직장 내 성희롱, 판단 기준은?</span>
                <div className={styles.stats_div}>
                  <span className={styles.stats}>
                    <em>학습전 (15분)</em>
                  </span>
                  <Button variant="primary" size={isMobile ? 'ts' : 'sm'} className={styles.btn}>
                    학습하기
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.tit_box}>
            <strong>[리얼법전] 김정근, 이지애와 함께하는 직장 내 성희롱 예방교육</strong>
            <span>1시간</span>
          </div>
          <div className={styles.txt_box}>
            <ul>
              <li>
                <span className={styles.subject}>
                  1. (리얼법전) 김정근, 이지애와 함께하는 직장 내 성희롱 예방교육
                </span>
                <div className={styles.stats_div}>
                  <span className={styles.stats}>
                    <em className={styles.learning}>학습완료</em>
                    <Button
                      onClick={() =>
                        openModal({
                          width: isMobile ? 'm_full' : 'sm',
                          content: <NoticeDetailPopup />,
                        })
                      }
                    >
                      학습이력
                    </Button>
                  </span>
                  {/* 학습전 variant="line" 학습중 variant="primary" */}
                  <Button variant="line" size={isMobile ? 'ts' : 'sm'} className={styles.btn}>
                    학습하기
                  </Button>
                </div>
              </li>
              {/* 학습중 styles.ing */}
              <li className={styles.ing}>
                <span className={styles.subject}>2. (파악하기) 직장 내 성희롱, 판단 기준은?</span>
                <div className={styles.stats_div}>
                  <span className={styles.stats}>
                    <em className={styles.learning}>학습중</em>
                    <Button
                      onClick={() =>
                        openModal({
                          width: isMobile ? 'm_full' : 'sm',
                          content: <NoticeDetailPopup />,
                        })
                      }
                    >
                      학습이력
                    </Button>
                  </span>
                  <Button variant="primary" size={isMobile ? 'ts' : 'sm'} className={styles.btn}>
                    학습하기
                  </Button>
                </div>
              </li>
              <li>
                <span className={styles.subject}>3. (파악하기) 직장 내 성희롱, 판단 기준은?</span>
                <div className={styles.stats_div}>
                  <span className={styles.stats}>
                    <em>학습전 (15분)</em>
                  </span>
                  <Button variant="primary" size={isMobile ? 'ts' : 'sm'} className={styles.btn}>
                    학습하기
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  );
};

export const CurriculumStudy = memo(CurriculumStudyComponent);
