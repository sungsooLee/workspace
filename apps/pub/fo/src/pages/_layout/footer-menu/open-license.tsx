import { createFileRoute } from '@tanstack/react-router';

import styles from '@learnway/styles/fo/pages/_layout/footer-menu/open-license.module.css';

export const Route = createFileRoute('/_layout/footer-menu/open-license')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.license}`}>
      <h2>오픈소스 라이선스</h2>
      <ul>
        <li>오픈소스</li>
        <li>오픈소스</li>
        <li>오픈소스</li>
        <li>오픈소스</li>
        <li>오픈소스</li>
        <li>오픈소스</li>
        <li>오픈소스</li>
        <li>오픈소스</li>
        <li>오픈소스</li>
      </ul>
    </div>
  );
}
