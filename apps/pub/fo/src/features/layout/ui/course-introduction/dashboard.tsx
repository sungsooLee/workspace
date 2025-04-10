import { memo, useState, useEffect } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoMessageText, IcoCheck } from '@learnway/icons';
import { Button, Dropdown, Panel, Progress, useModal } from '@learnway/ui';
import styles from './dashboard.module.css';
import statusStyles from './status.module.css';
import { NoticeDetailPopup } from '../../../../features/layout';

const CourseDashboardCompoment = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '1차 | 25-03-01 ~ 26-03-31' },
    { value: 'option2', label: '2차 | 25-03-01 ~ 26-03-31' },
  ];

  const progress = 80;

  const { open: openModal } = useModal();
  const { close: closeModal } = useModal();

  return (
    <div className={styles.start}>
      <div className={styles.title_box}>
        <h2>대시보드</h2>
        <Dropdown
          options={options}
          value={selectedValues}
          onChange={(selected) => setSelectedValues(selected)}
          placeholder="전체 차수보기"
          variant="text"
          isMulti={false}
          size={'lg'}
          menu-portal-text
        />
      </div>
      {/* 
        학습전 : status_before 
        학습중 : status_progress
        학습완료 (이수) : status_completed
        학습미완료 (미이수) : status_incomplete
      */}
      <div className={`${statusStyles.start} ${statusStyles.status_before}`}>
        <div className={statusStyles.panel_degreey}>
          <div className={statusStyles.list}>
            <h3>
              <span className={statusStyles.ico}>
                <IcoMessageText />
              </span>
              이수
            </h3>
            <span className={statusStyles.date}>25-03-01 ~ 26-03-31</span>
          </div>
        </div>

        <div className={statusStyles.status_box}>
          <div className={statusStyles.progress_rate}>
            <Progress value={progress} className={statusStyles.progress_bar} />
            <div className={statusStyles.info}>
              <span className={statusStyles.txt}>진도율</span>
              <span className={statusStyles.progress}>{progress}%</span>
            </div>
          </div>

          <div className={statusStyles.status_list}>
            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>출석 (40%)</span>
              <div className={statusStyles.score}>
                <span className={statusStyles.ico}>
                  <IcoCheck width={20} height={20} stroke="#000" />
                </span>
                80%
              </div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>평가 (1/2, 30%)</span>
              <div className={statusStyles.score}>
                <span className={statusStyles.ico}>
                  <IcoCheck width={20} height={20} stroke="#000" />
                </span>
                38점
              </div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>과제 (30%)</span>
              <div className={statusStyles.score}>
                <span className={statusStyles.ico}>
                  <IcoCheck width={20} height={20} stroke="#000" />
                </span>
                90점
              </div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>설문 (0%)</span>
              <div className={statusStyles.score}>
                <span className={statusStyles.ico}>
                  <IcoCheck width={20} height={20} stroke="#000" />
                </span>
                완료
              </div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>총점 (100%)</span>
              <div className={statusStyles.score}>
                <span className={statusStyles.ico}>
                  <IcoCheck width={20} height={20} stroke="#000" />
                </span>
                100점
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CourseDashboard = memo(CourseDashboardCompoment);
