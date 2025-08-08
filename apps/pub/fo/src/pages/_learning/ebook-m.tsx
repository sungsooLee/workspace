import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { createFileRoute } from '@tanstack/react-router';

import ebookImg from '@learnway/styles/fo/assets/images/temp/img_ebook.png';

export const Route = createFileRoute('/_learning/ebook-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.ebook}`}>
      <div className={styles.ebook_contents}>
        {/* 블로그 영역 */}
        <img src={ebookImg} alt="" />
      </div>
    </div>
  );
}
