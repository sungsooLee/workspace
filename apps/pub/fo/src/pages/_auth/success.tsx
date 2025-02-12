import { createFileRoute } from '@tanstack/react-router';
import { Input, Checkbox, Button } from '@learnway/ui';
import styles from './success.module.css';
import authStyles from './auth.module.css';
import formStyles from '../../assets/styles/modules/form.module.css';
import { IcoCheck02 } from '@learnway/icons';

export const Route = createFileRoute('/_auth/success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className={authStyles.auth_box}>
        <div className={styles.success_info}>
          <i className={styles.ico}>
            <IcoCheck02 width={32} height={24} stroke="#ffffff" />
          </i>
        </div>
      </div>
    </div>
  );
}
