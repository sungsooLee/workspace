import { createFileRoute } from '@tanstack/react-router';
import styles from './join.module.css';

export const Route = createFileRoute('/_auth/join')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className={`${styles.start} ${styles.auth_wrap}`}></div>;
}
