import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { cn } from '@learnway/shared';
import { IcoPhone02, IcoMail, IcoCaution, IcoFormRequired } from '@learnway/icons';
import formStyles from '../../assets/styles/modules/form.module.css';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, RadioCard, Tabs, Input, Select } from '@learnway/ui';

export const Route = createFileRoute('/_auth/search-account')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedTabKey, selectedTabKey2] = useState<string>('');
  const items = [
    {
      title: '아이디 찾기',
      key: 'a',
      content: (
        <>
          <div className={signupStyles.search_info}>
            <strong>본인인증</strong> 후<br /> 아이디를 확인 할 수 있습니다.
          </div>
          <div className={signupStyles.signup_select} role="radiogroup">
            <RadioCard
              className={styles.radio_card}
              options={[
                {
                  value: 'type1',
                  label: (
                    <div>
                      <IcoPhone02 width={48} height={48} className={styles.ico1} />
                      <span>휴대폰 인증</span>
                    </div>
                  ),
                },
                {
                  value: 'type2',
                  label: (
                    <div>
                      <IcoMail width={48} height={48} className={styles.ico2} />
                      <span>이메일 인증</span>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* 인증폼 */}
          <div
            className={`${formStyles.form_row} ${formStyles.no_line} ${formStyles.col} ${signupStyles.auth_form}`}>
            <div className={formStyles.row}>
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
            </div>

            <div className={formStyles.row}>
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
            </div>

            {/* 휴대폰 인증일때 */}
            <div className={formStyles.row}>
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
            </div>

            {/* 이메일 인증일때 */}
            <div className={formStyles.row}>
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
            </div>

            <div className={formStyles.row}>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>인증번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="인증번호 입력" value="" />
                  <Button variant="gray" size="lg">
                    재전송
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className={signupStyles.signup_noti}>
            <dl className={styles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>본인 명의의 인증 수단 정보를 정확히 입력해 주세요.</dd>
            </dl>
          </div>
        </>
      ),
    },
    {
      title: '비밀번호 찾기',
      key: 'b',
      content: (
        <>
          <div className={signupStyles.search_info}>
            <strong>본인인증</strong> 후<br /> 비밀번호를 재설정 할 수 있습니다.
          </div>
          <div className={signupStyles.signup_select} role="radiogroup">
            <RadioCard
              className={styles.radio_card}
              options={[
                {
                  value: 'type1',
                  label: (
                    <div>
                      <IcoPhone02 width={48} height={48} className={styles.ico1} />
                      <span>휴대폰 인증</span>
                    </div>
                  ),
                },
                {
                  value: 'type2',
                  label: (
                    <div>
                      <IcoMail width={48} height={48} className={styles.ico2} />
                      <span>이메일 인증</span>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* 인증폼 */}
          <div
            className={`${formStyles.form_row} ${formStyles.no_line} ${formStyles.col} ${signupStyles.auth_form}`}>
            <div className={formStyles.row}>
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
            </div>

            <div className={formStyles.row}>
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
            </div>

            <div className={formStyles.row}>
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
            </div>

            {/* 휴대폰 인증일때 */}
            <div className={formStyles.row}>
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
            </div>

            {/* 이메일 인증일때 */}
            <div className={formStyles.row}>
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
            </div>

            <div className={formStyles.row}>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>인증번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="인증번호 입력" value="" />
                  <Button variant="gray" size="lg">
                    재전송
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className={signupStyles.signup_noti}>
            <dl className={styles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>본인 명의의 인증 수단 정보를 정확히 입력해 주세요.</dd>
              <dd>
                법인명의 휴대전화(법인폰)는 통신사에서 본인인증 서비스 신청 후 휴대폰 인증을 하실 수
                있습니다.{' '}
                <Link to="" className={signupStyles.link}>
                  구글 OTP 인증 가이드
                </Link>
              </dd>
            </dl>
          </div>
        </>
      ),
    },
  ];
  return (
    <div className={`${styles.start} ${signupStyles.auth_wrap} ${signupStyles.search_account}`}>
      <div className={signupStyles.auth_box}>
        <Tabs selectedTabKey={selectedTabKey} items={items} type="fill" color="primary" />

        <div className={signupStyles.btn_wrap}>
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
  );
}
