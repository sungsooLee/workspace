import { createFileRoute, Link } from '@tanstack/react-router';
import { Input, Checkbox, Button, ContentsRow } from '@learnway/ui';
import { cn } from '@learnway/shared';

//import styles from './signup.module.css';
import styles from '@learnway/styles/bo/pages/_auth/login.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.login}`}>
        <div className={styles.auth_box}>
          <ContentsRow>
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
          </ContentsRow>
          <ContentsRow className={formStyles.no_line}>
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
          </ContentsRow>

          <div className={styles.login_info}>
            <Checkbox label="아이디 저장" className={styles.id_save} />
            <div className={styles.info}>
              <Link to="/search-account">아이디 찾기</Link>
              <Link to="/search-account-pw">비밀번호 찾기</Link>
            </div>
          </div>

          <div className={styles.btn_box}>
            <Button size="xl" variant="primary" className={styles.btn}>
              로그인
            </Button>
          </div>
        </div>

        <div className={styles.login_guide}>
          <span>
            <Link to="/progress-status-email">회원 가입 현황</Link>
            <Link to="/signup-step1">관리자 회원가입</Link>
          </span>
        </div>
      </div>
    </form>
  );
}
