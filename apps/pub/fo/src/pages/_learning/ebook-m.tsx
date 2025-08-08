import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { createFileRoute } from '@tanstack/react-router';

import ebookImg from '@learnway/styles/fo/assets/images/temp/img_ebook.png';

export const Route = createFileRoute('/_learning/ebook-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.ebook}`}>
      {/* 퍼블수정 20250808 레슨명 추가 */}
      <div className={styles.lesson_box}>
        <strong>레슨명</strong>
      </div>
      <div className={styles.ebook_contents}>
        {/* 블로그 영역 */}
        <img src={ebookImg} alt="" />
      </div>
    </div>
  );
}
