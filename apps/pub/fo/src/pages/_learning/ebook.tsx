import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from '@learnway/styles/fo/pages/_learning/learning.module.css';

import ebookImg from '@learnway/styles/fo/assets/images/temp/img_ebook.png';

export const Route = createFileRoute('/_learning/ebook')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.ebook}`}>
      {/* 퍼블수정 20250717 전체수정 */}

      <div className={styles.ebook_contents}>
        {/* 블로그 영역 */}
        <img src={ebookImg} alt="" />
      </div>
    </div>
  );
}
