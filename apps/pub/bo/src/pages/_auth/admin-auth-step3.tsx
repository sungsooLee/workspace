import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, Stepper, ContentsRow, Input, RadioCard, Select, InputTimer } from '@learnway/ui';
import { IcoCaution, IcoFormRequired, IcoPhone02, IcoMail } from '@learnway/icons';
import styles from './admin-auth-step3.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/bo/shared/ui/notice-box/notice-box.module.css';

export const Route = createFileRoute('/_auth/admin-auth-step3')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: '회원유형선택', value: 'step1' },
    { label: '아이디 확인', value: 'step2' },
    { label: '본인인증', value: 'step3' },
    { label: '권한정보입력', value: 'step4' },
  ];

  const [selectedValue, setSelectedValue] = useState<string>('type1');
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const [showArea, setShowArea] = useState(false);
  const handleClick = () => {
    if (!showArea) {
      setShowArea(true); // 처음 클릭 시에만 true로 설정
    }
  };

  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={styles.signup_info}>
          <div className={styles.step_box}>
            <Stepper items={items} variant="check" selectedStep="step3" />
          </div>
        </div>
        <div className={cn(styles.signup_select, 'auth--signup-select')} role="radiogroup">
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
            defaultValue={'type1'}
            onValueChange={handleValueChange}
          />
        </div>
        <div className={cn(styles.auth_form, 'no_line', 'col')}>
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
          {selectedValue === 'type1' ? (
            <ContentsRow>
              {/* 휴대폰 인증일때 */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-1-6" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>휴대폰 번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Dropdown
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
          ) : (
            <ContentsRow>
              {/* 이메일 인증일때 */}
              <div className={formStyles.form_item}>
                <label htmlFor="name-1-6" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>이메일</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name-1-6" type="text" placeholder="아이디(hyundai.kim@hyundail.com)" />
                </div>
              </div>
            </ContentsRow>
          )}
          {showArea && (
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>인증번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={14} height={14} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <InputTimer
                    startTimer={1}
                    initialTime={300}
                    placeholder="인증번호 입력"
                    resetLabel="인증번호 재전송"
                  />
                </div>
              </div>
            </ContentsRow>
          )}
        </div>
        <div className={`${noticeBoxStyles.start} ${styles.signup_noti}`}>
          <dl className={noticeBoxStyles.check_point}>
            <dt>
              <IcoCaution width={16} height={16} stroke="#6F798B" />
              유의사항
            </dt>
            <dd>본인인증 후 관리자 권한 신청을 할 수 있습니다.</dd>
          </dl>
        </div>
        <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl">
            취소
          </Button>
          <Button variant="primary" size="xl" onClick={handleClick}>
            인증번호 요청
          </Button>
        </div>
      </div>
    </div>
  );
}
