import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import signupStyles from './signup.module.css';
import { IcoCaution02, IcoComplete } from '@learnway/icons';

export const Route = createFileRoute('/_auth/search-id-success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.search_auth}`}>
      <div className={signupStyles.auth_box}>
        <div className={signupStyles.success_info}>
          <i className={signupStyles.ico}>
            {/* 정상처리 */}
            <IcoComplete width={32} height={24} className={signupStyles.ico1} />
            {/* 확인불가 */}
            <IcoCaution02 width={32} height={24} className={signupStyles.ico2} />
          </i>
          <h3 className={signupStyles.title}>
            {/* 정상처리 */}
            입력하신 정보로 가입된 아이디는
            <br />
            아래와 같습니다.
            {/* 확인불가 */}
            입력하신 정보로 가입된 아이디를
            <br />
            찾을 수 없습니다.
          </h3>
          <div className={signupStyles.noti_box}>hyundai.kim@hyundai.com</div>
          <div className={signupStyles.btn_txt}>
            <Link to="/progress-status">비밀번호 찾기</Link>
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
