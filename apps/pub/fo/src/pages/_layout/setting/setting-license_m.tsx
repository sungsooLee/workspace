import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';

import styles from './setting-license_m.module.css';

export const Route = createFileRoute('/_layout/setting/setting-license_m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.license_wrap}`}>
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
