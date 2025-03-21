import { createFileRoute } from '@tanstack/react-router';

import styles from '@learnway/styles/fo/pages/_layout/setting/setting-license_m.module.css';

export const Route = createFileRoute('/_layout/setting/setting-license_m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.license_wrap}`}>
      <ul>
        <li>{/* <Button></Button> */}</li>
      </ul>
    </div>
  );
}
