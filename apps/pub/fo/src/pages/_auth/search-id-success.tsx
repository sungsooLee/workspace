import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import signupStyles from './signup.module.css';
import { IcoCheck02 } from '@learnway/icons';

export const Route = createFileRoute('/_auth/search-id-success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.search_auth}`}>
      <div className={signupStyles.auth_box}>
        <div className={signupStyles.success_info}>
          <i className={signupStyles.ico}>
            <IcoCheck02 width={32} height={24} />
          </i>
          <h3 className={signupStyles.title}>
            입력하신 정보로 가입된 아이디는
            <br />
            아래와 같습니다.
          </h3>
          <p className={signupStyles.noti_box}>hyundai.kim@hyundai.com</p>
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
