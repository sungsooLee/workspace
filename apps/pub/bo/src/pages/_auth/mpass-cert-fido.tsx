import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoCaution, IcoFaceId01 } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import otpToolFormField from './otp-tool-form-field.module.css';
import styles from './mpass-cert.module.css';
import noticeBoxStyles from '@learnway/styles/bo/shared/ui/notice-box/notice-box.module.css';
import authFormStyles from '@learnway/styles/bo/features/auth/ui/auth-form/auth-form.module.css'; // 찾기폼
import embededAlert from '@learnway/styles/bo/shared/ui/embeded-alert/embeded-alert.module.css';
import { Button, RadioCard, useModal } from '@learnway/ui';
import { MpassPopup } from '../../features/auth/';

export const Route = createFileRoute('/_auth/mpass-cert-fido')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.mpass_cert}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={`${embededAlert.start} ${styles.search_info}`}>
            <IcoCaution width={48} height={48} stroke={'#A9AFB8'} />
            <p className={embededAlert.txt}>안전한 로그인을 위해 2차 인증을 진행해 주세요.</p>
          </div>

          {/* 인증선택 모듈 */}
          <div
            className={cn(otpToolFormField.signup_select, 'auth--signup-select')}
            role="radiogroup">
            <RadioCard
              options={[
                {
                  value: 'type1',
                  label: (
                    <div>
                      <IcoFaceId01 width={48} height={48} className="ico2" />
                      <span>FIDO</span>
                    </div>
                  ),
                },
              ]}
              defaultValue={'type1'}
            />
          </div>
          {/* 인증선택 모듈 */}

          <div className={styles.select_txt}>
            생체인증(지문/안면인식) 인증 옵션을 선택하셨습니다. <br />
            MPASS 인증 버튼 클릭 후 모바일 앱으로 인증을 진행해 주세요.
          </div>

          {/* 유의사항 모듈 */}
          <div className={`${noticeBoxStyles.start} ${authFormStyles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              {/* FIDO 문구 출력 */}
              <dd>
                FIDO를 선택한 경우 MPASS 앱에서 생체인식(지문/안면) 후 로그인을 진행해 주세요.
              </dd>
            </dl>
          </div>
          {/* 유의사항 모듈 */}

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl">
              취소
            </Button>

            <Button
              size="xl"
              variant="primary"
              onClick={() =>
                openModal({
                  width: 'sm',
                  content: <MpassPopup />,
                })
              }>
              MPASS 인증
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
