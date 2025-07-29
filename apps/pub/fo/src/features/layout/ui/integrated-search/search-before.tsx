import { IcoNudge01, IcoNudge03, IcoNudge04, IcoNudge05 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import styles from './search-before.module.css';
import { SearchInputWrap } from './search-input-wrap';

export const SearchBefore: React.FC = () => {
  const items = [
    '실무세례 중심 학습',
    '현직자 피드백 제공',
    '프로그래밍 스킬 성장',
    '중급 이상 난이도에 적합',
    '프로그래밍 스킬 성장',
    '마케터 필수 역량',
    '경쟁사 벤치마크 잘하는 방법',
    '소셜 캠페인 트렌드',
  ];

  const items2 = ['AI 교육', '현직자 피드백 제공', '리더십', '데이터 드리븐', '아이오닉9'];
  return (
    <div className={cn(styles.start, styles.search_before)}>
      <SearchInputWrap
        buttonActive={false}
        placeholder={'처음엔 다 어려워요! 추천 키워드부터 가볍게 출발~'}
      />
      <div className={styles.title_wrap}>
        <IcoNudge03 width={24} height={24} className={styles.title_icon} />
        <strong className={styles.title}>{'처음이라면 가볍게 시작해보는게 어떠세요?'}</strong>
      </div>

      {items.length > 0 && (
        <div className={styles.btn_list}>
          {items.map((item, index) => (
            <Button key={index} label={item} className={styles.btn} size={'md'} />
          ))}
        </div>
      )}

      <div className={styles.title_wrap}>
        <IcoNudge01 width={24} height={24} className={styles.title_icon} />
        <strong className={styles.title}>
          {'벌써 감 잡으셨나요? 어울릴 만한 과정도 골라봤어요!'}
        </strong>
      </div>

      {items2.length > 0 && (
        <div className={styles.btn_list}>
          {items2.map((item, index) => (
            <Button key={index} label={item} className={styles.btn} size={'md'} />
          ))}
        </div>
      )}

      <div className={styles.title_wrap}>
        <IcoNudge04 width={24} height={24} className={styles.title_icon} />
        <strong className={styles.title}>
          {'벌써 감 잡으셨나요? 어울릴 만한 과정도 골라봤어요!'}
        </strong>
      </div>
      <div className={styles.title_wrap}>
        <IcoNudge05 width={24} height={24} className={styles.title_icon} />
        <strong className={styles.title}>{'열정적인 당신, 요즘 핫한 키워드 추천해요!'}</strong>
      </div>
    </div>
  );
};
