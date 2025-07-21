import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import webImg from '@learnway/styles/fo/assets/images/temp/img_web.png';

export const Route = createFileRoute('/_learning/iframe-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      {/* 퍼블수정 20250717 전체수정 */}
      <div className={styles.iframe_contents}>
        {/* 예시 아이프레임 */}
        <iframe
          src="https://www.hyundai.com/"
          title="example Page"
          loading="lazy"
          className={styles.iframe}
        ></iframe>
      </div>
    </div>
  );
}
