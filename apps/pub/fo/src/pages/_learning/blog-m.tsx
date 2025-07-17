import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import blogImg from '@learnway/styles/fo/assets/images/temp/img_blog.png';

export const Route = createFileRoute('/_learning/blog-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.blog}`}>
      {/* 퍼블수정 20250717 전체수정 */}

      <div className={styles.blog_contents}>
        {/* 블로그 영역 */}
        <img src={blogImg} alt="" />
      </div>
    </div>
  );
}
