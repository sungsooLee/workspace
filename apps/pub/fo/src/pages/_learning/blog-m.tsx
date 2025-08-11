import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { createFileRoute } from '@tanstack/react-router';

import blogImg from '@learnway/styles/fo/assets/images/temp/img_blog.png';

export const Route = createFileRoute('/_learning/blog-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.blog}`}>
      <div className={styles.blog_contents}>
        {/* 블로그 영역 */}
        <img src={blogImg} alt="" />
      </div>
    </div>
  );
}
