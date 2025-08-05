import { IcoBell04 } from '@learnway/icons';

import styles from './history-contents.module.css';

const HistoryContentsComponent = () => {
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
    <div className={`${styles.start}`}>
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

export const HistoryContents = HistoryContentsComponent;
