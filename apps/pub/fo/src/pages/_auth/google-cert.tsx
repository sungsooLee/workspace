import { createFileRoute } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { IcoCaution, IcoFormRequired, IcoShieldTick01 } from '@learnway/icons';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './google-cert.module.css';
import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css'; // 영역
import otpToolFormFieldStyles from './otp-tool-form-field.module.css'; // 라디오 카드
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css'; // 유의사항
import googleOtpGuideButtonStyles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide-button.module.css'; // 구글 otp 가이드 버튼
import embededAlert from '@learnway/styles/fo/shared/ui/embeded-alert/embeded-alert.module.css';
import { Button, ContentsRow, Input, RadioCard, useModal } from '@learnway/ui';
import {
  GoogleCertGuidePopup,
  GoogleInputPopup,
  GoogleQrcodePopup,
  MpassPopup,
} from '../../features/auth';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';

export const Route = createFileRoute('/_auth/google-cert')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();

  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.mpass_cert}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          {/* 퍼블수정 20250319 : embededAlert */}
          <div className={`${embededAlert.start} ${styles.search_info}`}>
            <IcoCaution width={48} height={48} stroke={'#A9AFB8'} />
            <p className={embededAlert.txt}>안전한 로그인을 위해 2차 인증을 진행해 주세요.</p>
          </div>
          <div className={cn(otpToolFormFieldStyles.signup_select, 'auth--signup-select')}>
            <RadioCard
              options={[
                {
                  value: 'type1',
                  label: (
                    <div>
                      <IcoShieldTick01 width={48} height={48} className="ico1" />
                      <span>OTP</span>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* OTP 인증폼 */}
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
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

          {/* 유의사항 모듈 */}
          <div className={`${noticeBoxStyles.start} ${authFormStyles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
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
                {/* 퍼블수정 20250324 : 모바일 분기처리 */}
                <Button
                  className={`${googleOtpGuideButtonStyles.start} ${noticeBoxStyles.link}`}
                  onClick={() =>
                    openModal({
                      //title: 'FIDO 인증',
                      width: isMobile ? 'm_full' : 'md',
                      content: <GoogleCertGuidePopup />,
                    })
                  }>
                  구글 OTP 인증 가이드
                </Button>
              </dd>
            </dl>
          </div>
          {/* 유의사항 모듈 */}

          <div className={styles.noti_info_txt}>
            {/* 퍼블수정 20250324 : 모바일 분기처리 */}
            <Button
              className={styles.btn_txt}
              onClick={() =>
                openModal({
                  width: isMobile ? 'm_full' : 'sm',
                  content: <GoogleQrcodePopup />,
                })
              }>
              QR코드로 인증키 생성
            </Button>
          </div>

          {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
          <BrowserView>
            <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
              <Button variant="gray" size="xl">
                취소
              </Button>

              <Button
                size="xl"
                variant="primary"
                onClick={() =>
                  openModal({
                    //title: '구글 OTP 인증',
                    width: 'sm',
                    content: <MpassPopup />,
                  })
                }>
                구글 OTP 인증
              </Button>
            </div>
          </BrowserView>

          <MobileView>
            <MobileContainerFooter>
              <Button
                size="xl"
                variant="primary"
                onClick={() =>
                  openModal({
                    //title: '구글 OTP 인증',
                    width: 'm_full',
                    content: <MpassPopup />,
                  })
                }>
                구글 OTP 인증
              </Button>
            </MobileContainerFooter>
          </MobileView>
        </div>
      </div>
    </form>
  );
}
