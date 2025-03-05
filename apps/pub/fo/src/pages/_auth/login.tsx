import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Input, Checkbox, Button, ContentsRow } from '@learnway/ui';
import { IcoAlertCircleGray } from '@learnway/icons';

import signupStyles from './signup.module.css';
import formStyles from '../../assets/styles/modules/form.module.css';
import snsNaverImage from '../../assets/images/common/logo_sns_naver.png';
import snskakaoImage from '../../assets/images/common/logo_sns_kakao.png';
import snsGoogleImage from '../../assets/images/common/logo_sns_google.png';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="form_row">
      <div className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.login}`}>
        <div className={signupStyles.auth_box}>
          <div className="no_line col">
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
                    placeholder="아이디(hyundai.kim@hyundail.com)"
                    className={formStyles.lg}
                  />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
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
            </ContentsRow>
          </div>

          <ContentsRow className={signupStyles.login_info}>
            <Checkbox label="아이디 저장" className={signupStyles.id_save} />
            <div className={signupStyles.info}>
              <Link to="/search-account">아이디/비밀번호찾기</Link>
            </div>
          </ContentsRow>

          <div className={signupStyles.btn_box}>
            <Button size="xl" variant="primary" className={signupStyles.btn}>
              로그인
            </Button>
          </div>

          <div className={signupStyles.sns_login}>
            <h3 className={signupStyles.tit_sns}>소셜 로그인</h3>
            <ul className={signupStyles.list}>
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
            <div className={signupStyles.noti}>
              회사 메일로 회원가입 이후 SNS 간편회원으로 로그인 할 수 있습니다.
            </div>
          </div>
        </div>

        <div className={signupStyles.login_guide}>
          <span>
            <Link to="/progress-status">회원 가입 현황</Link>
            <Link to="/signup-step1">회원가입</Link>
          </span>
        </div>
      </div>
    </form>
  );
}
