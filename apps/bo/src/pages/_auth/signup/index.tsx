import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { pageRouteConfig } from '@features/auth/index';
import { IcoBuilding01, IcoUser01 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Button, RadioCard, Stepper } from '@learnway/ui';

import { adminItems, cpItems } from '@features/user/signup/ui/signup-select';
import styles from '@features/user/signup/ui/signup-select.module.css';

export const Route = createFileRoute('/_auth/signup/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '관리자 회원가입',
    },
  }),
});

function RouteComponent() {
  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState<string>('type1');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const showStepperItems = useMemo(
    () => (selectedValue === 'type1' ? cpItems : adminItems),
    [selectedValue],
  );

  const handleCancel = () => {
    router.navigate({ to: '/login' });
  };

  const handleNext = () => {
    selectedValue === 'type1' && router.navigate({ to: '/signup/cp' });
    selectedValue === 'type2' && router.navigate({ to: '/signup/admin' });
  };

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={styles.step_box}>
          <Stepper items={showStepperItems} variant="check" selectedStep="step1" />
        </div>
        <div className={cn(styles.signup_select, 'auth--signup-select')} role="radiogroup">
          <RadioCard
            className={styles.radio_card}
            options={[
              {
                value: 'type1',
                label: (
                  <div>
                    <IcoBuilding01 width={48} height={48} className={styles.ico1} />
                    <span>CP사 회원가입</span>
                  </div>
                ),
              },
              {
                value: 'type2',
                label: (
                  <div>
                    <IcoUser01 width={48} height={48} className={styles.ico2} />
                    <span>관리자 권한 신청</span>
                  </div>
                ),
              },
            ]}
            defaultValue={'type1'}
            onValueChange={handleValueChange}
          />
        </div>
        <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="primary" size="xl" onClick={handleNext}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
