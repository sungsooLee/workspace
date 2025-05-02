import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoArrowForward } from '@learnway/icons';
import { isMobile } from 'react-device-detect';
import { Button, EmptyText } from '@learnway/ui';

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

export const IntegratedSearchKnowledge = IntegratedSearchKnowledgeComponent;
