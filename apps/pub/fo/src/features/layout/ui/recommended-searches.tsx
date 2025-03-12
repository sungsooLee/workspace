import { memo } from 'react';
import { Button } from '@learnway/ui';

import styles from '@learnway/styles/fo/features/layout/ui/recommended-searches.module.css';

interface RecommendedSearchesProps {
  className?: string;
}

const RecommendedSearchesCompoment = ({ className }: RecommendedSearchesProps) => {
  return (
    <div className={`${styles.start} ${styles.recommended}`}>
      <div className={styles.tit_box}>
        <strong>추천 검색어</strong>
      </div>
      <div className={styles.recommended_box}>
        <Button>기업경영</Button>
        <Button>Ai교육</Button>
        <Button>IT</Button>
        <Button>마케팅 및 세일즈</Button>
        <Button>상품/자동차기술</Button>
        <Button>Business Trend</Button>
        <Button>성희롱 예방</Button>
        <Button>GCSO(H)</Button>
        <Button>파이썬</Button>
        <Button>객체지향언어...</Button>
      </div>
    </div>
  );
};

export const RecommendedSearches = memo(RecommendedSearchesCompoment);
