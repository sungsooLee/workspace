import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_learning/iframe-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      {/* 퍼블수정 20250808 레슨명 추가 */}
      <div className={styles.lesson_box}>
        <strong>레슨명</strong>
      </div>
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
