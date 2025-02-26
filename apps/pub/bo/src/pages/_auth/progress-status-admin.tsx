import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, DatePicker, Input } from '@learnway/ui';
import { IcoCheck02, IcoFormRequired } from '@learnway/icons';
import { cn } from '@learnway/shared';
import formStyles from '../../assets/styles/modules/form.module.css';
import signupStyles from './signup.module.css';

export const Route = createFileRoute('/_auth/progress-status-admin')({
  component: RouteComponent,
});

function RouteComponent() {
  // Date picker
  const [date, setDate] = useState(new Date());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate = (value: any) => {
    setDate(value);
  };
  return (
    <div className={`${signupStyles.start} ${signupStyles.auth_wrap}`}>
      <div className={signupStyles.auth_box}>
        <div className={signupStyles.success_info}>
          <i className={signupStyles.ico}>
            <IcoCheck02 width={32} height={24} />
          </i>
          <h3 className={signupStyles.title}>관리자 권한 신청이 완료되었습니다.</h3>
          <p className={signupStyles.text}>회원가입 결과는 입력하신 메일로 발송되었습니다.</p>
        </div>
        <div
          className={`${formStyles.form_row} ${formStyles.no_line} ${formStyles.col} ${signupStyles.auth_form}`}>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-tenant" className={formStyles.form_label}>
              <span className={formStyles.form_text}>테넌트</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-tenant"
                type="text"
                value="테넌트명"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-company" className={formStyles.form_label}>
              <span className={formStyles.form_text}>회사명</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-company"
                type="text"
                value="회사명"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-admin" className={formStyles.form_label}>
              <span className={formStyles.form_text}>테넌트 관리자</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-admin"
                type="text"
                value="김현대"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-approve" className={formStyles.form_label}>
              <span className={formStyles.form_text}>승인 상태</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-approve"
                type="text"
                value="신청"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-term" className={formStyles.form_label}>
              <span className={formStyles.form_text}>승인일</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <DatePicker
                onChange={handleDate}
                value={date}
                className={formStyles.datepicker_item}
              />
            </div>
          </div>
        </div>
        <div className={signupStyles.btn_wrap}>
          <Button variant="primary" size="xl">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
