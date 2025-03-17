import { useState } from 'react';
import styles from '@learnway/styles/fo/features/integrated-search/integrated-search-knowledge.module.css';

const IntegratedSearchKnowledgeComponent = () => {
  return (
    <div className={`${styles.start} ${styles.knowledge}`}>
      <div className={styles.knowledge_box}></div>
    </div>
  );
};

export const IntegratedSearchKnowledge = IntegratedSearchKnowledgeComponent;
