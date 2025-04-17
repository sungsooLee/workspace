import { memo } from 'react';

import { Progress, useModal } from '@learnway/ui';
import { IcoMessageText, IcoCheck, IcoShare, IcoStar } from '@learnway/icons';

import type { EmbedWidgetProps } from '../widget-container/widget-container';
//import { CompletionStatusModal } from './widget-preview-modal';
//import type { Widget } from '../../../../types';
import styles from './completion-status.module.css';
import statusStyles from './completion-status-status.module.css';

const CompletionStatusComponent = ({ data }: EmbedWidgetProps) => {
  const progress = 80;
  return (
    <div className={styles.start}>
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

export const CompletionStatusWidget = memo(CompletionStatusComponent);
