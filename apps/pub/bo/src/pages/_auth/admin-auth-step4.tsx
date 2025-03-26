import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import {
  Button,
  Stepper,
  ContentsRow,
  Input,
  DropdownList,
  DropdownOption,
  DatePicker,
  Textarea,
} from '@learnway/ui';
import { IcoFormRequired } from '@learnway/icons';
import styles from './admin-auth-step3.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';

export const Route = createFileRoute('/_auth/admin-auth-step4')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: '회원유형선택', value: 'step1' },
    { label: '아이디 확인', value: 'step2' },
    { label: '본인인증', value: 'step3' },
    { label: '권한정보입력', value: 'step4' },
  ];

  const initialValue: DropdownOption = { value: 'option2', label: '채널 소유자2' };
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[] | null>([initialValue]);
  const options = [
    { value: 'option1', label: '채널 소유자' },
    { value: 'option2', label: '채널 소유자2' },
    { value: 'option3', label: '채널 소유자3' },
  ];

  // Date picker
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate = (value: any) => {
    setDate(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate2 = (value: any) => {
    setDate2(value);
  };
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={styles.signup_info}>
          <div className={styles.step_box}>
            <Stepper items={items} variant="check" selectedStep="step4" />
          </div>
        </div>
        <h4 className={cn(styles.title, 'auth--title')}>{'관리자 권한 신청 정보'}</h4>
        <div className={cn(styles.auth_form, 'no_line', 'col')}>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name" className={formStyles.form_label}>
                <span className={formStyles.form_text}>회사명</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name"
                  type="text"
                  placeholder="이름(김현대)"
                  value="현대오토에버"
                  readOnly
                />
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
                <Input id="name" type="text" placeholder="이름(김현대)" value="김현대" readOnly />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-id" className={formStyles.form_label}>
                <span className={formStyles.form_text}>아이디</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-id"
                  type="text"
                  placeholder="이름(김현대)"
                  value="asdfgggg@gmail.com"
                  readOnly
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-company-num" className={formStyles.form_label}>
                <span className={formStyles.form_text}>사번</span>
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
                  value="12345678"
                  readOnly
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-status" className={formStyles.form_label}>
                <span className={formStyles.form_text}>계정 상태</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="name-status" type="text" placeholder="입력" value="정상" readOnly />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-status" className={formStyles.form_label}>
                <span className={formStyles.form_text}>관리자 유형</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <DropdownList
                  options={options}
                  value={selectedOptions}
                  onChange={(selected) => setSelectedOptions(selected as DropdownOption[])}
                  variant="default"
                  size={'lg'}
                  isReadonly={true}
                />
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-term" className={formStyles.form_label}>
                <span className={formStyles.form_text}>권한 신청 기간</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <div className={dynamicFormStyles.datepicker_wrap}>
                  <DatePicker
                    onChange={handleDate}
                    value={date}
                    className={dynamicFormStyles.datepicker_item}
                    size={'lg'}
                  />
                  <span className={dynamicFormStyles.dash}></span>
                  <DatePicker
                    onChange={handleDate2}
                    value={date2}
                    className={dynamicFormStyles.datepicker_item}
                    size={'lg'}
                  />
                </div>
              </div>
            </div>
          </ContentsRow>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name-reason" className={formStyles.form_label}>
                <span className={formStyles.form_text}>신청 사유</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Textarea
                  id="name-reason"
                  rows={5}
                  cols={33}
                  resize="none"
                  value=""
                  placeholder="입력"
                  maxLength={100}
                />
              </div>
            </div>
          </ContentsRow>
        </div>
        <hr className={`${formStyles.divider} ${styles.divider}`} />
        <h4 className={cn(styles.title, 'auth--title')}>{'관리자 권한 승인 정보'}</h4>
        <div className={cn(styles.auth_form, 'no_line', 'col')}></div>
        <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl">
            취소
          </Button>
          <Button variant="primary" size="xl">
            관리자 권한 신청
          </Button>
        </div>
      </div>
    </div>
  );
}
