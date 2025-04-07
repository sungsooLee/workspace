import { memo, useState, useEffect } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoMessageText } from '@learnway/icons';
import { Button, Dropdown, Panel } from '@learnway/ui';
import styles from './dashboard.module.css';
import statusStyles from './status.module.css';

const CourseDashboardCompoment = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options = [
    { value: 'option1', label: '1차 | 25-03-01 ~ 26-03-31' },
    { value: 'option2', label: '2차 | 25-03-01 ~ 26-03-31' },
  ];
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
        />
      </div>
      {/* 
        학습전 : status_before 
        학습중 : status_progress
        학습완료 (이수) : status_completed
        학습미완료 (미이수) : status_incomplete
      */}
      <div className={`${statusStyles.start} ${statusStyles.status_incomplete}`}>
        <div className={statusStyles.panel_degreey}>
          <div className={statusStyles.list}>
            <h3>
              <span className={statusStyles.ico}>
                <IcoMessageText />
              </span>
              학습전
            </h3>
            <span className={statusStyles.date}>25-03-01 ~ 26-03-31</span>
          </div>
        </div>

        <div className={statusStyles.status_box}></div>
      </div>
    </div>
  );
};

export const CourseDashboard = memo(CourseDashboardCompoment);
