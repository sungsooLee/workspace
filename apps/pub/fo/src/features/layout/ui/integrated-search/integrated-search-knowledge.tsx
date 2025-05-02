import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoArrowForward } from '@learnway/icons';

import styles from './integrated-search-knowledge.module.css';

const IntegratedSearchKnowledgeComponent = () => {
  return (
    <div className={`${styles.start} ${styles.knowledge}`}>
      <div className={styles.tit_box}>
        <strong>지식공유</strong>
        <Link to="">
          지식공유 더보기
          <IcoArrowForward width={16} height={16} stroke="#131c30" />
        </Link>
      </div>

      <div className={styles.knowledge_box}></div>
    </div>
  );
};

export const IntegratedSearchKnowledge = IntegratedSearchKnowledgeComponent;
