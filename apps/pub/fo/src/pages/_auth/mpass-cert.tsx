import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoCaution, IcoFaceId01, IcoFormRequired, IcoShieldTick01 } from '@learnway/icons';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import otpToolFormField from './otp-tool-form-field.module.css';
import styles from './mpass-cert.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css'; // 찾기폼
//import searchAccountFormStyles from '@learnway/styles/fo/pages/_auth/search-account/-components/search-account-form.module.css';
import { Button, ContentsRow, Input, RadioCard, useModal } from '@learnway/ui';
import { MpassPopup } from '../../features/auth';

export const Route = createFileRoute('/_auth/mpass-cert')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.mpass_cert}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={`${authFormStyles.search_info} ${styles.search_info}`}>
            {/* 퍼블수정 20250311 : 아이콘 추가, strong 제거 및 txt class 추가 */}
            <IcoCaution width={48} height={48} stroke={'#A9AFB8'} />
            <p className={authFormStyles.txt}>안전한 로그인을 위해 2차 인증을 진행해 주세요.</p>
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
                      <IcoShieldTick01 width={48} height={48} className="ico1" />
                      <span>OTP</span>
                    </div>
                  ),
                },
                {
                  value: 'type2',
                  label: (
                    <div>
                      <IcoFaceId01 width={48} height={48} className="ico2" />
                      <span>FIDO</span>
                    </div>
                  ),
                },
              ]}
            />
          </div>
          {/* 인증선택 모듈 */}

          {/* FIDO 일때 문구출력 */}
          <div className={styles.select_txt}>
            생체인증(지문/안면인식) 인증 옵션을 선택하셨습니다. <br />
            MPASS 인증 버튼 클릭 후 모바일 앱으로 인증을 진행해 주세요.
          </div>

          {/* OTP 인증폼 */}
          <div className={cn(authFormStyles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>OTP 번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="password" placeholder="OTP 번호 입력" value="" />
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
              {/* OTP일때 문구 출력 */}
              <dd>OTP를 선택한 경우 MPASS 앱에서 OTP번호를 확인하고 입력해 주세요.</dd>
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

            {/* 퍼블수정 20250314 : 공통 모달 콤포넌트 수정 */}
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
