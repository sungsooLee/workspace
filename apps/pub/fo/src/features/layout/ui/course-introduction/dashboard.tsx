import { memo, useState, useEffect, useRef } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoCheck } from '@learnway/icons';
import { Button, Dropdown, Panel, Progress, useModal } from '@learnway/ui';
import styles from './dashboard.module.css';
import statusStyles from './status.module.css';
import { NoticeDetailPopup } from '../../../../features/layout';

const CourseDashboardCompoment = () => {
  const [selectedValues, setSelectedValues] = useState<null>(null);
  const options = [
    { value: 'option1', label: '1차 | 25-03-01 ~ 26-03-31' },
    { value: 'option2', label: '2차 | 25-03-01 ~ 26-03-31' },
  ];

  const progress = 80;

  const { open: openModal } = useModal();
  const { close: closeModal } = useModal();

  // 자동모달 띄우기 퍼블 확인용
  // const hasRun = useRef(false);
  // useEffect(() => {
  //   if (!hasRun.current) {
  //     openModal({
  //       width: 'lg', // sm(600px), md(800px), lg(1024px), xl(1400px)
  //       content: <NoticeDetailPopup />, // 페이지 팝업 콤포넌트 or 팝업 내용
  //     });
  //     hasRun.current = true;
  //   }
  // }, [openModal]);

  return (
    <div className={styles.start}>
      <div className={styles.title_box}>
        <h2>대시보드</h2>
        <Dropdown
          options={options}
          value={selectedValues}
          onChange={(selected) => setSelectedValues(selected)}
          placeholder="차수보기"
          variant="text"
          isMulti={false}
          size={'lg'}
          menu-portal-text
        />
      </div>

      <div className={statusStyles.start}>
        <Panel type="rounded" hideHeaderUnderline className={statusStyles.panel_degreey}>
          <div className={statusStyles.list}>
            <h3>이수</h3>
            <div className={statusStyles.date_status}>
              <div className={statusStyles.date_box}>
                교육기간
                <span className={statusStyles.date}>25-03-01 ~ 26-03-31 (374)</span>
              </div>
              <div className={statusStyles.date_box}>
                남은학습기간
                <span className={statusStyles.date}>D-27</span>
              </div>
            </div>
          </div>
        </Panel>

        <Panel type="rounded" hideHeaderUnderline className={statusStyles.progress_box}>
          <div className={statusStyles.progress_rate}>
            <h3>나의진도율</h3>
            <Progress value={progress} className={statusStyles.progress_bar} />
            <div className={statusStyles.info}>
              <span className={statusStyles.progress}>{progress}%</span>
            </div>
          </div>
        </Panel>

        <Panel type="rounded" hideHeaderUnderline className={statusStyles.status_box}>
          <div className={statusStyles.status_list}>
            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>출석 (40%)</span>
              <div className={statusStyles.score}>80%</div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>평가 (1/2, 30%)</span>
              <div className={statusStyles.score}>38점</div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>과제 (30%)</span>
              <div className={statusStyles.score}>90점</div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>설문 (0%)</span>
              <div className={statusStyles.score}>완료</div>
            </div>

            <div className={statusStyles.status_info}>
              <span className={statusStyles.tt}>총점 (100%)</span>
              <div className={statusStyles.score}>
                100점<span className={statusStyles.default}>(80점)</span>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export const CourseDashboard = memo(CourseDashboardCompoment);
