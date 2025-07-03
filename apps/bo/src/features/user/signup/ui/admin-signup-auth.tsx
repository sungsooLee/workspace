import { useRouter } from '@tanstack/react-router';
import { AuthForm, AuthFormData } from '@learnway/auth/features/auth';
import { useSignupStore } from '@features/user/signup';
import { cn } from '@learnway/shared';
import { Button, Stepper } from '@learnway/ui';
import { useState } from 'react';
import styles from './admin-signup-auth.module.css';
import { adminItems } from '@features/user/signup/ui/signup-select';

export function AdminSignupAuth() {
  const { setAdminPage } = useSignupStore((state) => state);
  const router = useRouter();

  const [defaultAuthValues, setDefaultAuthValues] = useState<AuthFormData>();

  function handleSuccess(data: any): void {
    setAdminPage('signup');
  }

  function handleCancel(): void {
    router.navigate({ to: '/login' });
  }

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={styles.signup_info}>
          <div className={styles.step_box}>
            <Stepper items={adminItems} variant="check" selectedStep="step3" />
          </div>
        </div>
        <div className={cn(styles.signup_select, 'auth--signup-select')} role="radiogroup">
          <AuthForm
            defaultValues={defaultAuthValues}
            onSuccess={(data: any) => handleSuccess(data)}
            onCancel={() => handleCancel()}
            noticeBoxLabel="LABEL.message.adminSignupNotice"
          />
        </div>
        <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl">
            취소
          </Button>
          <Button variant="primary" size="xl" onClick={() => setAdminPage('signup')}>
            {'다음(테스트)'}
          </Button>
        </div>
      </div>
    </div>
  );
}
