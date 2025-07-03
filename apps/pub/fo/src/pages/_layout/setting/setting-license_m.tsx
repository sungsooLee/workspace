import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';

import styles from '@learnway/styles/fo/features/platform/ui/license/license.module.css';

export const Route = createFileRoute('/_layout/setting/setting-license_m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.license_wrap}`}>
      {/* 퍼블수정 20250402 : 타이틀 추가 */}
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
