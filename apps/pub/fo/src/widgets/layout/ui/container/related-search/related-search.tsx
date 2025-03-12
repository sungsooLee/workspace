import { memo, useState } from 'react';

import styles from '@learnway/styles/fo/widgets/layout/ui/container/related-search.module.css';

function RelatedSearchComponent() {
  return (
    <div className={`${styles.start} ${styles.related}`}>
      <div className={styles.tit_box}>
        <strong>연관 검색어</strong>
      </div>
    </div>
  );
}

export const RelatedSearch = memo(RelatedSearchComponent);
