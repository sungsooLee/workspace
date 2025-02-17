import { createFileRoute } from '@tanstack/react-router';
import { IcoBuilding01 } from '@learnway/icons';
import { IcoOverseasDealer } from '@learnway/icons';
import authStyles from './auth.module.css';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, Checkbox } from '@learnway/ui';

export const Route = createFileRoute('/_auth/signup_step1 copy')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className={authStyles.auth_box}>
        <div className={signupStyles.signup_info}>
          <div className={signupStyles.signup_step}>step</div>
          <div className={signupStyles.signup_check}>
            <div className={signupStyles.check_all}>
              <Checkbox label="전체 약관 동의" />
            </div>
            <ul className={signupStyles.check_list}>
              <li>
                <Checkbox label="러닝웨이 이용약관(필수)" />
                <Button>자세히 보기</Button>
              </li>
              <li>
                <Checkbox label="개인정보 이용동의(필수)" />
                <Button>자세히 보기</Button>
              </li>
              <li>
                <Checkbox label="고유식별 정보 처리 동의(필수)" />
                <Button>자세히 보기</Button>
              </li>
              <li>
                <Checkbox label="개인정보 이용동의(필수)" />
                <Button>자세히 보기</Button>
              </li>
              <li>
                <Checkbox label="러닝웨이 회원가입 및 이용 개인정보 제3자 제공동의(필수)" />
                <Button>자세히 보기</Button>
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
