import { memo } from 'react';

import { Button, Popover } from '@learnway/ui';
import { IcoBell04, IcoClose02, IcoHistory } from '@learnway/icons';
import { cn } from '@learnway/shared';

import styles from './history.module.css';
import popoverInnerStyles from './history-contents.module.css';

const HistoryContents = () => {
  const activityList = [
    {
      subject: '학습과정을 완료 했어요.',
      date: '방금전',
    },
    {
      subject: '학습과정을 완료 했어요.',
      date: '1시간 전',
    },
    {
      subject: '학습과정을 완료 했어요',
      date: '8시간 전',
    },
  ];
  return (
    <div className={`${styles.start} ${popoverInnerStyles.start}`}>
      <div className={popoverInnerStyles.title_area}>
        <h2>최근 학습활동</h2>
        <Popover.Close>
          <Button variant="expand" size="sm" onlyIcon>
            <IcoClose02 className={popoverInnerStyles.btn_close} />
          </Button>
        </Popover.Close>
      </div>

      <div className={styles.history_area}>
        {activityList ? (
          <ul className={styles.history_list}>
            {activityList.map((item, index) => (
              <li key={index} className={index === 0 ? styles.now : ''}>
                <strong className={styles.subject}>{item.subject}</strong>
                <span className={styles.date}>{item.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          // 최근 학습 활동이 없을경우
          <div className={styles.empty}>
            <IcoBell04 width={48} height={48} stroke="#a9afbb" className={styles.ico_bell} />
            <span>최근 학습 활동이 없습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
};

const HistoryComponent = () => {
  return (
    <div className={cn(styles.start, styles.history_info)}>
      <Popover popoverContent={<HistoryContents />} side="bottom" align="end" sideOffset={5}>
        <span className={styles.alarm_info}>
          <IcoHistory width={24} height={24} fill="#131416" />
          <em className={styles.noti}></em>
        </span>
      </Popover>
    </div>
  );
};

export const History = memo(HistoryComponent);
