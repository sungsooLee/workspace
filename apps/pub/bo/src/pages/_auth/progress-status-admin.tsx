import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, DatePicker, Input, Select } from '@learnway/ui';
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
  const [date2, setDate2] = useState(new Date());
  const [date3, setDate3] = useState(new Date());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate = (value: any) => {
    setDate(value);
  };
  const handleDate2 = (value: any) => {
    setDate2(value);
  };
  const handleDate3 = (value: any) => {
    setDate3(value);
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
        <div className={signupStyles.auth_info}>
          <p>
            신청 :<strong className={signupStyles.date}>{'YYYY-MM-DD'}</strong>
          </p>
          <p>
            승인일시 :<strong className={signupStyles.date}>{'YYYY-MM-DD'}</strong>
          </p>
        </div>
        <div className={`${formStyles.form_row} ${formStyles.col} ${signupStyles.auth_form}`}>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <strong className={formStyles.form_title}>관리자 권한 신청 정보</strong>
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
            <label htmlFor="name-myname" className={formStyles.form_label}>
              <span className={formStyles.form_text}>이름</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-myname"
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
            <label htmlFor="name-id" className={formStyles.form_label}>
              <span className={formStyles.form_text}>아이디</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-myname"
                type="text"
                value="asdfg@naver.com"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-companyNum" className={formStyles.form_label}>
              <span className={formStyles.form_text}>사번</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-companyNum"
                type="text"
                value="1234567"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-status" className={formStyles.form_label}>
              <span className={formStyles.form_text}>계정 상태</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-status"
                type="text"
                value="정상"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-group" className={formStyles.form_label}>
              <span className={formStyles.form_text}>관리자 그룹</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Select
                className={formStyles.select_option}
                options={[
                  { value: 'type1', label: '관리자 그룹1' },
                  { value: 'type2', label: '관리자 그룹2' },
                ]}
                size="lg"
                readOnly={true}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-type" className={formStyles.form_label}>
              <span className={formStyles.form_text}>관리자 유형</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Select
                className={formStyles.select_option}
                options={[
                  { value: 'type1', label: '채널 소유자' },
                  { value: 'type2', label: '채널 소유자2' },
                ]}
                size="lg"
                readOnly={true}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-type" className={formStyles.form_label}>
              <span className={formStyles.form_text}>권한 신청 기간</span>
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
              <span className={formStyles.dash}></span>
              <DatePicker
                onChange={handleDate2}
                value={date2}
                className={formStyles.datepicker_item}
              />
            </div>
          </div>
        </div>
        <div className={`${formStyles.form_row} ${formStyles.col} ${signupStyles.auth_form}`}>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <strong className={formStyles.form_title}>관리자 권한 승인 정보</strong>
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
            <label htmlFor="name-company2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>회사명</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-company2"
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
                onChange={handleDate3}
                value={date3}
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
