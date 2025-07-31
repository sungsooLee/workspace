import { isMobile } from 'react-device-detect';

import styles from '@learnway/styles/fo/features/layout/ui/integrated-search/integrated-search-shorts.module.css';
import { EmptyText } from '@learnway/ui/empty-text';
import { Button } from '@learnway/ui/button';

const IntegratedSearchShortsComponent = () => {
  return (
    <div className={`${styles.start} ${styles.shorts}`}>
      {/* 검색결과 없음 */}
      <div className={styles.empty}>
        <EmptyText
          hideTitle
          size="lg"
          description={'검색 결과를 찾을 수 없습니다.'}
          footer={isMobile ? <Button variant={'primary'} size={'sm'} label={'교육요청'} /> : ''}
        />
      </div>
    </div>
  );
};

export const IntegratedSearchShorts = IntegratedSearchShortsComponent;
