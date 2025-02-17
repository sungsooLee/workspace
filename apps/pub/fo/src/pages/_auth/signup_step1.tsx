import { createFileRoute } from '@tanstack/react-router';
import { IcoBuilding01 } from '@learnway/icons';
import { IcoOverseasDealer } from '@learnway/icons';
import authStyles from './auth.module.css';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, Radio, Stepper, SelectOption } from '@learnway/ui';

export const Route = createFileRoute('/_auth/signup_step1')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: '회원유형선택', subLabel: '', value: 'step1' },
    { label: '약관동의', subLabel: '', value: 'step2' },
    { label: '본인인증', subLabel: '', value: 'step3' },
    { label: '회원정보입력', subLabel: '', value: 'step4' },
  ];
  const handleChange = (event: SelectOption) => {
    console.log(event);
  };
  return (
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className={authStyles.auth_box}>
        <div className={signupStyles.signup_info}>
          <div className={signupStyles.signup_step}>
            <Stepper items={items} onChange={handleChange} variant="check" />
          </div>
          <div className={signupStyles.signup_select}>
            <ul className={styles.select_list}>
              <li>
                <Button className={`{styles.select} {styles.active}`}>
                  <IcoBuilding01 width={48} height={48} stroke="#131C30" />
                  <span>휴대폰 인증</span>
                </Button>
              </li>
              <li>
                <Button className={styles.select}>
                  <IcoOverseasDealer width={48} height={48} />
                  <span>이메일 인증</span>
                </Button>
              </li>
            </ul>
          </div>
          <div className={authStyles.btn_wrap}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl">
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
