import { IcoCaution, IcoFormRequired, IcoMail02, IcoPhone03 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';
import { createFileRoute } from '@tanstack/react-router';
import { AuthTitle } from '../../features/auth';
// import searchAccountFormStyles from './search-account-form.module.css';

import authToolFormFieldStyles from './auth-tool-form-field.module.css';

import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
// import googleOtpGuideButtonStyles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide-button.module.css';

import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import { Button, ContentsRow, Input, InputTimer, RadioCard, useModal } from '@learnway/ui';

import { BrowserView, MobileView } from 'react-device-detect';
import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';

export const Route = createFileRoute('/_auth/dormant-account')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();

  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_account}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <AuthTitle />

          <ContentsRow>
            <div className={formStyles.form_item}>
              {/* 인증선택 모듈 */}
              <div
                className={cn(authToolFormFieldStyles.signup_select, 'auth--signup-select')}
                role="radiogroup"
              >
                <RadioCard
                  options={[
                    {
                      value: 'type1',
                      label: (
                        <div>
                          <IcoPhone03 width={48} height={48} className="ico1" />
                          <span>휴대폰 인증</span>
                        </div>
                      ),
                    },
                    {
                      value: 'type2',
                      label: (
                        <div>
                          <IcoMail02 width={48} height={48} className="ico2" />
                          <span>이메일 인증</span>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
              {/* 인증선택 모듈 */}
            </div>
          </ContentsRow>
          {/* 인증폼 */}

          <div className={cn(authFormStyles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>이름</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="이름(김현대)" value="" inputSize="lg" />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>생년월일</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name"
                    type="text"
                    placeholder="생년월일(19991229)"
                    value=""
                    inputSize="lg"
                  />
                </div>
              </div>
            </ContentsRow>

            {/* 휴대폰 인증일때 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name-1-6" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>휴대폰 번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name-1-6"
                    type="text"
                    placeholder="-없이 휴대폰 번호입력(0102345678)"
                    inputSize="lg"
                  />
                </div>
              </div>
            </ContentsRow>

            {/* 이메일 인증일때 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name-1-6" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>이메일</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name-1-6"
                    type="text"
                    placeholder="생년월일(19991229)"
                    inputSize="lg"
                  />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>인증번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <InputTimer
                    startTimer={1}
                    initialTime={300}
                    placeholder="인증번호 입력"
                    resetLabel="재전송"
                    inputSize="lg"
                  />
                </div>
              </div>
            </ContentsRow>

            <div className={`${noticeBoxStyles.start} ${authFormStyles.signup_noti}`}>
              <dl className={noticeBoxStyles.check_point}>
                <dt>
                  <IcoCaution />
                  유의사항
                </dt>
                <dd>
                  {/* 휴대폰 인증 내용 */} 인증번호 문자를 받지 못하셨으면 휴대폰번호가 정확한지
                  확인하세요.{/* 이메일 인증 내용 : 인증번호는 계정 이메일로 발송됩니다. */}
                </dd>
              </dl>
            </div>
            {/* 유의사항 모듈 */}

            {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
            <BrowserView>
              <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
                <Button variant="gray" size="xl">
                  취소
                </Button>
                <Button variant="primary" size="xl">
                  {/* 인증완료후 "인증번호 확인"으로 텍스트변경*/}
                  인증번호 요청
                </Button>
              </div>
            </BrowserView>

            <MobileView>
              <MobileContainerFooter>
                <Button variant="primary" size="xl">
                  {/* 인증완료후 "인증번호 확인"으로 텍스트변경*/}
                  인증번호 요청
                </Button>
              </MobileContainerFooter>
            </MobileView>
          </div>
        </div>
      </div>
    </form>
  );
}
