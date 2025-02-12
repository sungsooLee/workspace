import { createFileRoute } from '@tanstack/react-router';
import { Input, Checkbox, Button } from '@learnway/ui';
import styles from './success.module.css';

export const Route = createFileRoute('/_auth/success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className={styles.auth_box}></div>
    </div>
  );
}
