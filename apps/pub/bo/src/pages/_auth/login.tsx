import { createFileRoute, Link } from '@tanstack/react-router';
import { Input, Checkbox, Button } from '@learnway/ui';
import { cn } from '@learnway/shared';

import signupStyles from './signup.module.css';
import formStyles from '../../assets/styles/modules/form.module.css';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.login}`}>
      <div className={signupStyles.auth_box}>
        <div className={formStyles.row}>
          <div className={formStyles.form_item}>
            <label htmlFor="name5" className={formStyles.form_label}>
              <span className={formStyles.form_text}>아이디/이메일</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name5"
                type="text"
                value=""
                placeholder="아이디 또는 회사 이메일을 입력하세요."
                className={formStyles.lg}
              />
            </div>
            <p className={cn(formStyles.guide_text)}>기본 메시지</p>
          </div>
        </div>

        <div className={`${formStyles.row} ${formStyles.no_line}`}>
          <div className={formStyles.form_item}>
            <label htmlFor="name5" className={formStyles.form_label}>
              <span className={formStyles.form_text}>비밀번호</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name5"
                type="password"
                value=""
                placeholder="비밀번호를 입력하세요."
                className={formStyles.lg}
              />
            </div>
            <p className={cn(formStyles.guide_text, formStyles.error)}>에러 메시지</p>
          </div>
        </div>

        <div className={signupStyles.login_info}>
          <Checkbox label="아이디 저장" className={signupStyles.id_save} />
          <div className={signupStyles.info}>
            <Link to="/search-account">아이디 찾기</Link>
            <Link to="/search-account-pw">비밀번호 찾기</Link>
          </div>
        </div>

        <div className={signupStyles.btn_box}>
          <Button size="xl" variant="primary" className={signupStyles.btn}>
            로그인
          </Button>
        </div>
      </div>

      <div className={signupStyles.login_guide}>
        <span>
          <Link to="/progress-status">회원 가입 현황</Link>
          <Link to="/signup-step1">관리자 회원가입</Link>
        </span>
      </div>
    </div>
  );
}
