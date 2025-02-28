import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import signupStyles from './signup.module.css';
import { IcoComplete } from '@learnway/icons';

export const Route = createFileRoute('/_auth/success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.success}`}>
      <div className={signupStyles.auth_box}>
        <div className={signupStyles.success_info}>
          <i className={signupStyles.ico}>
            {/* 정상처리 */}
            <IcoComplete width={32} height={24} className={signupStyles.ico1} />
          </i>
          <h3 className={signupStyles.title}>가입 신청완료</h3>
          <p className={signupStyles.noti}>
            가입승인은 신청일부터 최대 5일 이내 완료됩니다.
            <br /> 회원가입 시 입력된 메일 주소로 가입승인 메일이 발송됩니다.
          </p>
          <div className={signupStyles.btn_txt}>
            <Link to="/progress-status">진행현황 확인</Link>
          </div>
        </div>

        <div className={signupStyles.btn_wrap}>
          <Button variant="primary" size="xl">
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
