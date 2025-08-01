import { IcoAiSymbol, IcoHeart, IcoWordArrow } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Badge } from '@learnway/ui/badge';
import { Thumbnail } from '@learnway/ui/thumbnail';

/* images */
import bannerImg from '@learnway/styles/fo/assets/images/banner/img_banner_sample.jpg';
import avatarImg from '@learnway/styles/fo/assets/images/menu/course/img_avatar.jpg';

/* styles */
import styles from './search-submitted.module.css';

export const SearchSubmitted: React.FC = () => {
  const items = ['이러닝', '리더십', '직무필수'];
  return (
    <div className={cn(styles.start, styles.search_submitted)}>
      <div className={styles.message_wrap}>
        {/* question_wrap */}
        <p className={styles.question_wrap}>
          <span className={styles.text}>
            {'리더십'}
            <IcoWordArrow className={styles.icon_arrow} />
          </span>
        </p>
        {/* result_wrap */}
        <div className={styles.result_wrap}>
          {/* title */}
          <div className={styles.title_wrap}>
            <strong className={styles.title}>
              <em className={styles.point}>{'리더십 인기 콘텐츠'}</em>입니다.
            </strong>
            <p className={styles.text}>{'동료들의 추천이 높은 순으로 보여드릴게요.'}</p>
          </div>
          <div className={styles.recommand_view}>
            <Thumbnail path={bannerImg} enableHover={false} />
            <div className={styles.info_wrap}>
              {items.length > 0 && (
                <div className={styles.badge_wrap}>
                  {items.map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      status="gray"
                      size="xs"
                      option={{ label: `${item}`, value: `${index}` }}
                    />
                  ))}
                </div>
              )}

              <p className={styles.title}>{'AI 리더십 : 창의력과 데이터가 만나는 리더십의 미래'}</p>
              <div className={styles.count_info}>
                <span className={styles.attend_view}>
                  <img src={avatarImg} alt="" className={styles.img_avatar} />
                  <em>
                    {`${new Intl.NumberFormat().format(2100)}`}
                    {'명'}
                  </em>
                  이 수강했어요
                </span>
                <span className={styles.favorite_view}>
                  <IcoHeart width={20} height={20} stroke="#F58B75" fill="#F58B75" />
                  <em>{`${new Intl.NumberFormat().format(9999)}`}</em>
                </span>
              </div>
              <div className={styles.summary_view}>
                <strong className={styles.tit_summary}>
                  <IcoAiSymbol width={12} height={12} className={styles.icon_symbol} />
                  {'AI가 요약한 과정 핵심내용'}
                </strong>
                <p>{'목표 없는 지시는 실행되지 않고, 피드백 없는 실행은 반복되지 않습니다. '}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
