import { createFileRoute } from '@tanstack/react-router';
import styles from './signup.module.css';

export const Route = createFileRoute('/_auth/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className={`${styles.start} ${styles.auth_wrap}`}></div>;
}
