import { memo } from 'react';
import { Button } from '@learnway/ui';

import styles from '@learnway/styles/fo/features/layout/ui/popular-searches.module.css';

interface PopularSearchProps {
  className?: string;
}

const PopularSearchComponent = ({ className }: PopularSearchProps) => {
  return (
    <div className={`${styles.start} ${styles.popular}`}>
      <div className={styles.tit_box}>
        <strong>인기 검색어</strong>
      </div>
      <div className={styles.popular_box}>
        {/* 1번째 ~ 5번째 */}
        <ul>
          <li>
            <Button>
              <em>1</em>
              <span>안전교육</span>
            </Button>
          </li>
          <li>
            <Button>
              <em>2</em>
              <span>Ai교육</span>
            </Button>
          </li>
          <li>
            <Button>
              <em>3</em>
              <span>IT</span>
            </Button>
          </li>
          <li>
            <Button>
              <em>4</em>
              <span>마케팅 및 세일즈</span>
            </Button>
          </li>
          <li>
            <Button>
              <em>5</em>
              <span>상품/자동차기술설</span>
            </Button>
          </li>
        </ul>

        {/* 6번째 ~ 10번째 */}
        <ul>
          <li>
            <Button>
              <em>6</em>
              <span>Business Trend</span>
            </Button>
          </li>
          <li>
            <Button>
              <em>7</em>
              <span>성희롱 예방</span>
            </Button>
          </li>
          <li>
            <Button>
              <em>8</em>
              <span>인기</span>
            </Button>
          </li>
          <li>
            <Button>
              <em>9</em>
              <span>GCSO(H)</span>
            </Button>
          </li>
          <li>
            <Button>
              <em>10</em>
              <span>디육</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const PopularSearch = memo(PopularSearchComponent);
