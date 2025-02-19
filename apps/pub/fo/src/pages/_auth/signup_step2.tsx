import { isMobile } from 'react-device-detect';

import { createFileRoute } from '@tanstack/react-router';
import { IcoBuilding01 } from '@learnway/icons';
import { IcoOverseasDealer, IcoCaution } from '@learnway/icons';
import authStyles from './auth.module.css';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, RadioCard, Stepper, SelectOption } from '@learnway/ui';

export const Route = createFileRoute('/_auth/signup_step2')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: '회원유형선택', subLabel: '', value: 'step1' },
    { label: '사업자 정보 조회', subLabel: '', value: 'step2' },
    { label: '회원정보입력', subLabel: '', value: 'step3' },
  ];
  const handleChange = (event: SelectOption) => {
    console.log(event);
  };
  return (
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className={authStyles.auth_box}>
        <div className={signupStyles.signup_info}>
          <div className={signupStyles.signup_step}>
            <Stepper items={items} onChange={handleChange} variant="check" selectedStep="step2" />
          </div>
        </div>
        <div className={authStyles.btn_wrap}>
          <Button variant="gray" size="xl">
            취소
          </Button>
          <Button variant="primary" size="xl">
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
