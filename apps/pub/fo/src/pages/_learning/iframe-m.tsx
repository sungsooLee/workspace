import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_learning/iframe-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.iframe}`}>
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
