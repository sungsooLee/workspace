import { memo, useState } from 'react';

import styles from '@learnway/styles/fo/features/layout/ui/recent-searches.module.css';
import { Button, EmptyText } from '@learnway/ui';
import { IcoSearch, IcoXclose } from '@learnway/icons';

interface RecentSearchesProps {
  className?: string;
}

const RecentSearchesComponent = ({ className }: RecentSearchesProps) => {
  const [result, setResult] = useState(false);

  return (
    <div className={`${styles.start} ${styles.recent} ${className}`}>
      <div className={styles.tit_box}>
        <strong>최근 검색어</strong>
        <Button>전체삭제</Button>
      </div>
      <div className={styles.recent_box}>
        {result === true ? (
          <ul>
            <li>
              <Button>
                <i>
                  <IcoSearch width={20} height={20} stroke="#4c515e"></IcoSearch>
                </i>
                기업경영
              </Button>
              <Button>
                <IcoXclose width={16} height={16} stroke="#6f798b"></IcoXclose>
              </Button>
            </li>
            <li>
              <Button>
                <i>
                  <IcoSearch width={20} height={20} stroke="#4c515e"></IcoSearch>
                </i>
                Ai교육
              </Button>
              <Button>
                <IcoXclose width={16} height={16} stroke="#6f798b"></IcoXclose>
              </Button>
            </li>
          </ul>
        ) : (
          // 최근 검색결과 없는 경우
          <div className={styles.empty}>
            <EmptyText text={'최근 검색어가 없어요.'} />
          </div>
        )}
      </div>
    </div>
  );
};

export const RecentSearches = memo(RecentSearchesComponent);
