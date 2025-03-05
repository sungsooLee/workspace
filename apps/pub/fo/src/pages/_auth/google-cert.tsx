import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoShieldTick01, IcoCaution, IcoFormRequired } from '@learnway/icons';
import formStyles from '../../assets/styles/modules/form.module.css';
import signupStyles from './signup.module.css';
import { Button, RadioCard, Input, useModal, ContentsRow } from '@learnway/ui';
import { MpassPopup, GoogleCert1Popup } from '../../features/auth';

export const Route = createFileRoute('/_auth/google-cert')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();

  return (
    <form className="form_row">
      <div className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.mpass_cert}`}>
        <div className={signupStyles.auth_box}>
          <div className={signupStyles.search_info}>
            안전한 로그인을 위해 <strong>2차 인증</strong>을 진행해 주세요.
          </div>
          <div className={signupStyles.signup_select} role="radiogroup">
            <RadioCard
              className={signupStyles.radio_card}
              options={[
                {
                  value: 'type1',
                  label: (
                    <div>
                      <IcoShieldTick01 width={48} height={48} className={signupStyles.ico1} />
                      <span>OTP</span>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* OTP 인증폼 */}
          <div className={cn(signupStyles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>구글 OTP 번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="password" placeholder="구글 OTP 번호 입력" value="" />
                </div>
              </div>
            </ContentsRow>
          </div>

          <div className={signupStyles.signup_noti}>
            <dl className={signupStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>
                구글 Authenficator 앱을 설치한 후에 QR코드로 차세대 학습 플랫폼 OTP를 생성한 후에
                구글 OTP 인증을 할 수 있습니다.
              </dd>
              <dd>
                구글 OTP 인증 가이드를 보고 이용 방법을 확인해 보세요.
                <Link to="" className={signupStyles.link}>
                  구글 OTP 인증 가이드
                </Link>
              </dd>
            </dl>
          </div>

          <div className={signupStyles.noti_info_txt}>
            <Button
              className={signupStyles.btn_txt}
              onClick={() =>
                openModal({
                  title: '구글 OTP 인증키 생성',
                  width: 'sm',
                  content: <GoogleCert1Popup />,
                  footer: true,
                })
              }>
              QR코드로 인증키 생성
            </Button>
          </div>

          <div className={signupStyles.btn_wrap}>
            <Button variant="gray" size="xl">
              취소
            </Button>

            <Button
              size="xl"
              variant="primary"
              onClick={() =>
                openModal({
                  title: '구글 OTP 인증',
                  width: 'sm',
                  content: <MpassPopup />,
                  footer: true,
                })
              }>
              구글 OTP 인증
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
