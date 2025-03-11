import { isMobile } from 'react-device-detect';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { cn } from '@learnway/shared';
import { IcoPhone02, IcoMail, IcoCaution, IcoFormRequired } from '@learnway/icons';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './search-account.module.css';
import searchAccountFormStyles from './search-account-form.module.css';
import authToolFormFieldStyles from './auth-tool-form-field.module.css';

import { GoogleCertGuidePopup } from '../../features/auth';

import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import googleOtpGuideButtonStyles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide-button.module.css';

import {
  Button,
  RadioCard,
  Tabs,
  Input,
  Select,
  InputTimer,
  ContentsRow,
  useModal,
} from '@learnway/ui';

export const Route = createFileRoute('/_auth/search-account')({
  component: RouteComponent,
});

function RouteComponent() {
  const { open: openModal } = useModal();
  const [selectedTabKey, selectedTabKey2] = useState<string>('');
  const items = [
    {
      title: '아이디 찾기',
      key: 'a',
      content: (
        <>
          <div className={searchAccountFormStyles.search_info}>
            <strong>본인인증</strong> 후<br /> 아이디를 확인 할 수 있습니다.
          </div>

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

          {/* 인증폼 */}
          <div className={cn(searchAccountFormStyles.auth_form, 'no_line', 'col')}>
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
                  <Select
                    className={formStyles.short}
                    options={[
                      { value: 'type1', label: '+82' },
                      { value: 'type2', label: '+83' },
                    ]}
                    size="lg"
                  />
                  <Input
                    id="name-1-6"
                    type="text"
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
          </div>
        </>
      ),
    },
    {
      title: '비밀번호 찾기',
      key: 'b',
      content: (
        <>
          <div className={searchAccountFormStyles.search_info}>
            <strong>본인인증</strong> 후<br /> 비밀번호를 재설정 할 수 있습니다.
          </div>

          {/* 인증선택 모듈 */}
          <div
            className={cn(authToolFormFieldStyles.signup_select, 'auth--signup-select')}
            role="radiogroup">
            <RadioCard
              className="radio_card"
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

          {/* 인증폼 */}
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>아이디/이메일</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name"
                    type="text"
                    placeholder="이메일(hyundai.kim@hyundai.com)"
                    value=""
                  />
                  <Button variant="gray" size="lg">
                    아이디확인
                  </Button>
                </div>
              </div>
            </ContentsRow>

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
                  <Select
                    className={formStyles.short}
                    options={[
                      { value: 'type1', label: '+82' },
                      { value: 'type2', label: '+83' },
                    ]}
                    size="lg"
                  />
                  <Input
                    id="name-1-6"
                    type="text"
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
          </div>
        </>
      ),
    },
  ];
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_account}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <Tabs selectedTabKey={selectedTabKey} items={items} type="fill" variant="primary" />

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
                {/* 인증번호 콤포넌트 추가 */}
                <InputTimer startTimer={1} initialTime={300} placeholder="인증번호 입력" />
                <Button variant="gray" size="lg">
                  재전송
                </Button>
              </div>
            </div>
          </ContentsRow>

          {/* 유의사항 모듈 - 아이디 찾기일때 내용 */}
          <div
            className={`${noticeBoxStyles.start} ${noticeBoxStyles.signup_noti} ${styles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>본인 명의의 인증 수단 정보를 정확히 입력해 주세요.</dd>
            </dl>
          </div>
          {/* 유의사항 모듈 */}

          {/* 유의사항 모듈 - 비번 찾기일때 내용 */}
          <div
            className={`${noticeBoxStyles.start} ${noticeBoxStyles.signup_noti} ${styles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>본인 명의의 인증 수단 정보를 정확히 입력해 주세요.</dd>
              <dd>
                법인명의 휴대전화(법인폰)는 통신사에서 본인인증 서비스 신청 후 휴대폰 인증을 하실 수
                있습니다.
                <Button
                  className={cn(styles.link, 'auth--otp-guide-link')}
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
          {/* 유의사항 모듈 */}

          <div
            className={`${googleOtpGuideButtonStyles.start} ${googleOtpGuideButtonStyles.btn_wrap} ${styles.btn_wrap}`}>
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
    </form>
  );
}
