import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from '@learnway/styles/fo/pages/_learning/learning.module.css';

import webImg from '@learnway/styles/fo/assets/images/temp/img_web.png';

export const Route = createFileRoute('/_learning/html')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.html}`}>
      {/* 퍼블수정 20250717 전체 수정 */}
      <div className={styles.html_contents}>
        {/* html 영역 */}
        <img src={webImg} alt="" />
      </div>
    </div>
  );
}
