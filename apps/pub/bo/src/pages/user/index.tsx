import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import styles from './index.module.css';
export const Route = createFileRoute('/user/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to={'/guide'} className="">
        가이드문서
      </Link>
      <Button className={styles.btn}>버튼</Button>
    </div>
  );
}
