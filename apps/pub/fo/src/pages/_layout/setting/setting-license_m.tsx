import { createFileRoute } from '@tanstack/react-router';

import styles from '@learnway/styles/fo/features/platform/ui/license/license.module.css';

export const Route = createFileRoute('/_layout/setting/setting-license_m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.license_wrap}`}>
      {/* html 화면 */}
      오픈소스 라이선스내용
      <br />
      <br />
      텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트
    </div>
  );
}
