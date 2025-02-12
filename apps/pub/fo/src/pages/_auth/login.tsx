import { createFileRoute } from '@tanstack/react-router';
import { Input, Checkbox, Button } from '@learnway/ui';
import { IcoAlertCircleGray } from '@learnway/icons';
import { cn } from '@learnway/shared';
import styles from './login.module.css';
import authStyles from './auth.module.css';
import formStyles from '../../assets/styles/modules/form.module.css';
import snsNaverImage from '../../assets/images/common/logo_sns_naver.png';
import snskakaoImage from '../../assets/images/common/logo_sns_kakao.png';
import snsGoogleImage from '../../assets/images/common/logo_sns_google.png';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className={styles.auth_box}>
        <div className={formStyles.form_row}>
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
          </div>
        </div>

        <div className={formStyles.form_row}>
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

        <div className={styles.login_info}>
          <Checkbox label="아이디 저장" className={styles.id_save} />
          <div className={styles.info}>
            <Button>진행현황</Button>
            <Button>아이디/비밀번호찾기</Button>
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
        <IcoAlertCircleGray width={24} height={24} />
        <span>
          아직 회원이 아니시라면 <Button className={styles.btn_join}>회원가입</Button>하세요.
        </span>
      </div>
    </div>
  );
}
