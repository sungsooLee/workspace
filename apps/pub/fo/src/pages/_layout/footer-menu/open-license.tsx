import { createFileRoute } from '@tanstack/react-router';

import styles from './open-license.module.css';

export const Route = createFileRoute('/_layout/footer-menu/open-license')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.license}`}>
      <h2>오픈소스 라이선스</h2>
      <p>내용 진행중</p>
    </div>
  );
}
