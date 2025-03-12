import { memo } from 'react';
import { Button, EmptyText } from '@learnway/ui';

import styles from '@learnway/styles/fo/features/layout/ui/recent-searches.module.css';

import { IcoSearch, IcoXclose } from '@learnway/icons';

interface RecentSearchesProps {
  className?: string;
}

const RecentSearchesCompoment = ({ className }: RecentSearchesProps) => {
  return (
    <div className={`${styles.start} ${styles.recent} ${className}`}>
      <div className={styles.tit_box}>
        <strong>최근 검색어</strong>
        <Button>전체삭제</Button>
      </div>
      <div className={styles.recent_box}>
        {/* 최근 검색결과 있는 경우 */}
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

        {/* 최근 검색결과 없는 경우 */}
        <div className={styles.empty}>
          <EmptyText text={'최근 검색어가 없어요.'} />
        </div>
      </div>
    </div>
  );
};

export const RecentSearches = memo(RecentSearchesCompoment);
