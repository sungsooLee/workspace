import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { createFileRoute } from '@tanstack/react-router';

import webImg from '@learnway/styles/fo/assets/images/temp/img_web.png';

export const Route = createFileRoute('/_learning/html-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.html}`}>
      {/* 퍼블수정 20250808 레슨명 추가 */}
      <div className={styles.lesson_box}>
        <strong>레슨명</strong>
      </div>
      <div className={styles.html_contents}>
        {/* html 영역 */}
        <img src={webImg} alt="" />
      </div>
    </div>
  );
}
