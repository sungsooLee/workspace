import { isMobile } from 'react-device-detect';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { cn } from '@learnway/shared';
import { IcoPhone02, IcoMail, IcoCaution, IcoFormRequired } from '@learnway/icons';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';
// import searchAccountFormStyles from './search-account-form.module.css';

import authToolFormFieldStyles from './auth-tool-form-field.module.css';

import { GoogleCertGuidePopup } from '../../features/auth';

import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
// import googleOtpGuideButtonStyles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide-button.module.css';

import authFormStyles from '@learnway/styles/fo/widgets/auth/ui/auth-form/auth-form.module.css';
import hightlightMessageBoxStyles from '@learnway/styles/fo/shared/ui/highlight-message-box/highlight-message-box.module.css';

import {
  Button,
  RadioCard,
  Tabs,
  Input,
  Select,
  InputTimer,
  ContentsRow,
  useModal,
  PhoneNumber,
} from '@learnway/ui';

export const Route = createFileRoute('/_auth/dormant-account')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();

  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_account}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={`${authFormStyles.search_info} ${styles.search_info} ${styles.dormant}`}>
            <IcoCaution width={48} height={48} stroke={'#A9AFB8'} />
            <p className={authFormStyles.txt}>본인인증 후 휴면계정 해제할 수 있습니다.</p>
          </div>

          <div className={`${hightlightMessageBoxStyles.start} ${styles.noti_box}`}>
            마지막 이용일 : <strong>YYYY-MM-DD</strong>
            <br />
            휴면 전환일 : <strong>YYYY-MM-DD</strong>
            <br />
            별도 분리 보관 정보항목 : <strong>아이디 및 회원정보</strong>
          </div>

          <ContentsRow>
            <div className={formStyles.form_item}>
              {/* 인증선택 모듈 */}
              <div
                className={cn(authToolFormFieldStyles.signup_select, 'auth--signup-select')}
                role="radiogroup">
                <RadioCard
                  options={[
                    {
                      value: 'type1',
                      label: (
                        <div>
                          <IcoPhone02 width={48} height={48} className="ico1" />
                          <span>휴대폰 인증</span>
                        </div>
                      ),
                    },
                    {
                      value: 'type2',
                      label: (
                        <div>
                          <IcoMail width={48} height={48} className="ico2" />
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
                  <Input id="name" type="text" placeholder="이름(김현대)" value="" />
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
                  <Input id="name" type="text" placeholder="생년월일(19991229)" value="" />
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
                  {/* 퍼블수정 20250313 : 공통 변경 */}
                  <PhoneNumber
                    options={[
                      { value: 'type1', label: '+82' },
                      { value: 'type2', label: '+83' },
                    ]}
                    size="lg"
                    placeholder="-없이 휴대폰 번호입력(0102345678)"
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
                  <Input id="name-1-6" type="text" placeholder="생년월일(19991229)" />
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
                  {/* 퍼블수정 20250313 : 인증번호 콤포넌트 추가 */}
                  <InputTimer
                    startTimer={1}
                    initialTime={300}
                    placeholder="인증번호 입력"
                    resetLabel="재전송"
                  />
                </div>
              </div>
            </ContentsRow>

            {/* 유의사항 모듈 - 아이디 찾기일때 내용 */}
            <div className={`${noticeBoxStyles.start} ${authFormStyles.signup_noti}`}>
              <dl className={noticeBoxStyles.check_point}>
                <dt>
                  <IcoCaution width={16} height={16} stroke="#6F798B" />
                  유의사항
                </dt>
                <dd>본인 명의의 인증 수단 정보를 정확히 입력해 주세요.</dd>
              </dl>
            </div>
            {/* 유의사항 모듈 */}

            <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
              <Button variant="gray" size="xl">
                취소
              </Button>
              <Button variant="primary" size="xl">
                {/* 인증완료후 "인증번호 확인"으로 텍스트변경*/}
                인증번호 요청
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
