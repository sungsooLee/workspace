import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, DatePicker, Input, Select, Textarea } from '@learnway/ui';
import { IcoCheck02, IcoFormRequired, IcoComplete, IcoSucess, IcoCaution02 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/bo/pages/_auth/signup-progress/result.module.css';
import hightlightMessageBoxStyles from '@learnway/styles/bo/shared/ui/highlight-message-box/highlight-message-box.module.css';
import proccessResultStyles from '@learnway/styles/bo/widgets/auth/ui/proccess-result.module.css'; // 결과모듈
import authFormStyles from '@learnway/styles/bo/features/auth/ui/auth-form/auth-form.module.css';

export const Route = createFileRoute('/_auth/progress-status-admin')({
  component: RouteComponent,
});

function RouteComponent() {
  // Date picker
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [date3, setDate3] = useState(new Date());
  const [date4, setDate4] = useState(new Date());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate = (value: any) => {
    setDate(value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate2 = (value: any) => {
    setDate2(value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate3 = (value: any) => {
    setDate3(value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDate4 = (value: any) => {
    setDate4(value);
  };
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_account}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={`${proccessResultStyles.start} ${styles.success_info}`}>
            <i className={proccessResultStyles.ico}>
              {/* 대기중 */}
              {/* <IcoSucess width={56} height={56} fill="#06226A" /> */}
              {/* 승인완료 */}
              <IcoComplete width={56} height={56} stroke="#00AFD5" />
              {/* 반려 */}
              {/* <IcoCaution02 width={56} height={56} stroke="#FFB902" /> */}
            </i>
            <h3 className={proccessResultStyles.title}>
              {/* 대기중 */}
              관리자 권한 신청이 완료되었습니다.
              {/* 승인완료 
              회원가입 승인완료되었습니다.*/}
              {/* 반려 
              회원가입이 반려되었습니다.*/}
            </h3>
            <p className={proccessResultStyles.noti}>
              회원가입 결과는 입력하신 메일로 발송되었습니다.
            </p>
            {/* 퍼블수정 20250312 : 모듈화로 인한 className변경 */}
            <div className={`${hightlightMessageBoxStyles.start} ${styles.noti_box}`}>
              <p>
                신청일시 : <strong>YYYY-MM-DD</strong>
              </p>
              <p>
                승인일시 : <strong>YYYY-MM-DD</strong>
              </p>
              {/* 승인완료 
              승인일시 : <strong>YYYY-MM-DD</strong>*/}
              {/* 반려 
              반려일시 : <strong>YYYY-MM-DD</strong>*/}
            </div>
          </div>
          <h4 className={cn(styles.title, 'auth--title')}>{'아이디 확인'}</h4>
          <div className={cn(authFormStyles.auth_form, 'no_line', 'col')}>
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
                <Dropdown
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
                <Dropdown
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
                  disabled
                  className={formStyles.datepicker_item}
                  size={'lg'}
                />
                <span className={formStyles.dash}></span>
                <DatePicker
                  onChange={handleDate2}
                  value={date2}
                  disabled
                  className={formStyles.datepicker_item}
                  size={'lg'}
                />
              </div>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-date" className={formStyles.form_label}>
                <span className={formStyles.form_text}>권한 신청일</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <DatePicker
                  onChange={handleDate3}
                  value={date3}
                  disabled
                  size={'lg'}
                  className={formStyles.datepicker_item}
                />
              </div>
            </div>
            {/* form_item */}
            <div className={formStyles.form_item}>
              <label htmlFor="name-myStatus" className={formStyles.form_label}>
                <span className={formStyles.form_text}>권한 상태</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name-myStatus"
                  type="text"
                  value="대기"
                  placeholder=""
                  readOnly
                  className={formStyles.lg}
                />
              </div>
            </div>
            {/* form_item */}
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
                  placeholder=""
                  value="관리자 권한 신청시 입력한 사유 출력(없는 경우 출력 안함)"
                  resize="none"
                  size="sm"
                  className={formStyles.textarea}
                  readOnly
                />
              </div>
            </div>
          </div>
          <hr className={`${styles.divider} ${styles.divider}`} />
          <h4 className={cn(styles.title, 'auth--title')}>{'관리자 권한 승인 정보'}</h4>
          <div className={`${formStyles.col} ${authFormStyles.auth_form}`}>
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
                  onChange={handleDate4}
                  value={date4}
                  disabled
                  size={'lg'}
                  className={formStyles.datepicker_item}
                />
              </div>
            </div>
          </div>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="primary" size="xl">
              확인
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
