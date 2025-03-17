import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Input, Checkbox, Button } from '@learnway/ui';
import styles from './login.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import snsNaverImage from '../../assets/images/common/logo_sns_naver.png';
import snskakaoImage from '../../assets/images/common/logo_sns_kakao.png';
import snsGoogleImage from '../../assets/images/common/logo_sns_google.png';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.login}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={formStyles.form_row}>
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
                  placeholder="아이디(hyundai.kim@hyundail.com)"
                  className={formStyles.lg}
                />
              </div>
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
            </div>
          </div>
        </div>

        <div className={styles.login_info}>
          <Checkbox label="아이디 저장" className={styles.id_save} />
          <div className={styles.info}>
            <Link to="/search-account">아이디/비밀번호찾기</Link>
          </div>
        </div>

        <div className={styles.btn_box}>
          <Button size="xl" variant="primary" className={styles.btn}>
            로그인
          </Button>
        </div>

        <div className={styles.sns_login}>
          <h3 className={styles.tit_sns}>소셜 로그인</h3>
          <ul className={styles.list}>
            <li>
              <Button>
                <img src={snsNaverImage} alt="naver" />
              </Button>
            </li>
            <li>
              <Button>
                <img src={snskakaoImage} alt="kakao" />
              </Button>
            </li>
            <li>
              <Button>
                <img src={snsGoogleImage} alt="google" />
              </Button>
            </li>
          </ul>
          <div className={styles.noti}>
            회사 메일로 회원가입 이후 SNS 간편회원으로 로그인 할 수 있습니다.
          </div>
        </div>
      </div>

      <div className={styles.login_guide}>
        <span>
          <Link to="/progress-status-cert">회원 가입 현황</Link>
          <Link to="/signup-step1">회원가입</Link>
        </span>
      </div>
    </div>
  );
}
