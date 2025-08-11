import styles from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { createFileRoute } from '@tanstack/react-router';

import webImg from '@learnway/styles/fo/assets/images/temp/img_web.png';

export const Route = createFileRoute('/_learning/html-m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.html}`}>
      <div className={styles.html_contents}>
        {/* html 영역 */}
        <img src={webImg} alt="" />
      </div>
    </div>
  );
}
