import { createFileRoute } from '@tanstack/react-router';
import styles from './login.module.css';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className={`${styles.start} ${styles.login_wrap}`}></div>;
}
