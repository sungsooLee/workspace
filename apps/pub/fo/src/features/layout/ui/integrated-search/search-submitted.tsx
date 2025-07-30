import { IcoWordArrow } from '@learnway/icons';
import { cn } from '@learnway/shared';
import styles from './search-submitted.module.css';

export const SearchSubmitted: React.FC = () => {
  return (
    <div className={cn(styles.start, styles.search_submitted)}>
      <div className={styles.message_wrap}>
        <p className={styles.question_wrap}>
          <span className={styles.text}>
            {'리더십'}
            <IcoWordArrow className={styles.icon_arrow} />
          </span>
        </p>
        <div className={styles.result_wrap}>
          {/* title */}
          <div className={styles.title_wrap}>
            <strong className={styles.title}>
              <em className={styles.point}>{'리더십 인기 콘텐츠'}</em>입니다.
            </strong>
            <p className={styles.text}>{'동료들의 추천이 높은 순으로 보여드릴게요.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
