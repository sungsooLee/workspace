import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import bnrImage1 from '@learnway/styles/fo/assets/images/temp/category_product_01.png';

export const Route = createFileRoute('/_learning/video-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    // 퍼블수정 20250717 마크업 수정
    <div className={`${styles.start} ${styles.video}`}>
      <div className={styles.video_wrap}>
        <div className={styles.video_area}>
          <div className={styles.video_contents}>
            {/* 비디오 영역 */}
            <img src={bnrImage1} alt="" />
          </div>
          <div className={styles.detail_lesson}>
            <strong>레슨명</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
