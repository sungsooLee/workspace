import { IcoBell04, IcoClose02 } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { Popover } from '@learnway/ui/popover';
import { memo } from 'react';
import { BrowserView } from 'react-device-detect';
import popoverInnerStyles from './popover-inner.module.css';

import styles from './history-contents.module.css';

// 퍼블수정 20250801 전체 수정
const HistoryContentsComponent = () => {
  const activityList = [
    {
      subject: '내 정보를 설정했어요.',
      date: '방금전',
    },
    {
      subject: '비밀번호를 변경했어요.',
      date: '1시간 전',
    },
    {
      subject: '알림을 OFF했어요',
      date: '8시간 전',
    },
  ];

  return (
    <div className={`${styles.start} ${popoverInnerStyles.start}`}>
      <BrowserView>
        <div className={popoverInnerStyles.title_area}>
          <h2>최근 학습활동</h2>
          <Popover.Close>
            <Button variant="expand" size="sm" onlyIcon>
              <IcoClose02 className={popoverInnerStyles.btn_close} />
            </Button>
          </Popover.Close>
        </div>
      </BrowserView>

      <div className={styles.history_area}>
        <ul className={styles.history_list}>
          {activityList.map((item, index) => (
            <li key={index} className={index === 0 ? styles.now : ''}>
              <strong className={styles.subject}>{item.subject}</strong>
              <span className={styles.date}>{item.date}</span>
            </li>
          ))}
        </ul>

        {/* 최근 학습 활동이 없을경우*/}
        <div className={styles.empty}>
          <IcoBell04 width={48} height={48} stroke="#a9afbb" className={styles.ico_bell} />
          <span>최근 학습 활동이 없습니다.</span>
        </div>
      </div>
    </div>
  );
};

export const HistoryContents = memo(HistoryContentsComponent);
