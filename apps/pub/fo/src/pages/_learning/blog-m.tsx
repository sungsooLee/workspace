import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { createFileRoute } from '@tanstack/react-router';

import blogImg from '@learnway/styles/fo/assets/images/temp/img_blog.png';

export const Route = createFileRoute('/_learning/blog-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.blog}`}>
      {/* 퍼블수정 20250808 레슨명 추가 */}
      <div className={styles.lesson_box}>
        <strong>레슨명</strong>
      </div>
      <div className={styles.blog_contents}>
        {/* 블로그 영역 */}
        <img src={blogImg} alt="" />
      </div>
    </div>
  );
}
