import { isMobile } from 'react-device-detect';
import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, Input, ContentsRow, useModal } from '@learnway/ui';
import styles from './password-input.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import googleOtpGuideButtonStyles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide-button.module.css';
import { IcoCaution } from '@learnway/icons';
import { GoogleCertGuidePopup } from '../../features/auth';

export const Route = createFileRoute('/_auth/password-input')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.password_input}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 비밀번호</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name"
                    type="text"
                    placeholder="비밀번호(영문자, 숫자, 특수문자 3가지 조합 8자리 이상)"
                    value=""
                  />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 비밀번호 확인</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="새로운 비밀번호 재입력" value="" />
                </div>
              </div>
            </ContentsRow>
          </div>

          <div className={`${noticeBoxStyles.start} ${styles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>
                영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 8-20자리로 입력해 주세요.
              </dd>
              <dd>직전에 사용한 비밀번호는 사용하실 수 없습니다.</dd>

              <dd>아이디와 동일한 비밀번호는 사용하실 수 없습니다.</dd>
              <dd>
                생년월일, 전화번호와 동일하거나 일부를 포함한 비밀번호는 사용하실 수 없습니다.
              </dd>
              <dd>
                3글자 이상의 동일한 숫자/문자 또는 연속된 숫자/문자, 키보드 상 연속된 배열의 문자는
                입력하실 수 없습니다.
              </dd>
              <dd>
                법인명의 휴대전화(법인폰)는 통신사에서 본인인증 서비스 신청 후 휴대폰 인증을 하실 수
                있습니다.
                <Button
                  className={`${googleOtpGuideButtonStyles.start} ${noticeBoxStyles.link}`}
                  onClick={() =>
                    openModal({
                      title: 'FIDO 인증',
                      width: 'md',
                      content: <GoogleCertGuidePopup />,
                      footer: false,
                    })
                  }>
                  구글 OTP 인증 가이드
                </Button>
              </dd>
            </dl>
          </div>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl">
              확인
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
