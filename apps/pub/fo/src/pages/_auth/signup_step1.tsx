import { createFileRoute } from '@tanstack/react-router';
import { IcoBuilding01 } from '@learnway/icons';
import { IcoOverseasDealer } from '@learnway/icons';
import authStyles from './auth.module.css';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, RadioCard, Stepper, SelectOption } from '@learnway/ui';

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
            <Stepper items={items} onChange={handleChange} variant="check" selectedStep="step1" />
          </div>
          <div className={signupStyles.signup_select} role="radiogroup">
            <ul className={styles.select_list}>
              <li>
                <Button
                  className={`${styles.select} ${styles.active}`}
                  role="radio"
                  aria-checked="true">
                  <IcoBuilding01 width={48} height={48} stroke="#131C30" />
                  <span>국내 이용자</span>
                </Button>
              </li>
              <li>
                <Button className={styles.select} role="radio" aria-checked="false">
                  <IcoOverseasDealer width={48} height={48} />
                  <span>해외딜러</span>
                </Button>
              </li>
            </ul>
          </div>
          <div className={signupStyles.signup_select} role="radiogroup">
            <RadioCard
              className="card dfsfsf"
              options={[
                {
                  value: 'type1',
                  label: (
                    <div>
                      <IcoBuilding01 width={48} height={48} stroke="#131C30" />
                      <span>휴대폰 인증</span>
                    </div>
                  ),
                },
                {
                  value: 'type2',
                  label: (
                    <div>
                      <IcoOverseasDealer width={48} height={48} />
                      <span>이메일 인증</span>
                    </div>
                  ),
                },
              ]}
            />
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
