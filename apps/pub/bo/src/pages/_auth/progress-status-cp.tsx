import { createFileRoute } from '@tanstack/react-router';
import { Button, Input, Select } from '@learnway/ui';
import { IcoCheck02, IcoFormRequired } from '@learnway/icons';
import { cn } from '@learnway/shared';
import formStyles from '../../assets/styles/modules/form.module.css';
import signupStyles from './signup.module.css';

export const Route = createFileRoute('/_auth/progress-status-cp')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${signupStyles.start} ${signupStyles.auth_wrap}`}>
      <div className={signupStyles.auth_box}>
        <div className={signupStyles.success_info}>
          <i className={signupStyles.ico}>
            <IcoCheck02 width={32} height={24} />
          </i>
          <h3 className={signupStyles.title}>CP 회원가입 대기 중입니다.</h3>
          <p className={signupStyles.text}>회원가입 결과는 입력하신 메일로 발송되었습니다.</p>
        </div>
        <div className={signupStyles.auth_info}>
          <p>
            신청일시 :<strong className={signupStyles.date}>{'YYYY-MM-DD'}</strong>
          </p>
        </div>
        <div className={`${formStyles.form_row} ${formStyles.col} ${signupStyles.auth_form}`}>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <strong className={formStyles.form_title}>협력업체 회사 정보</strong>
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
            <label htmlFor="name-registerNum" className={formStyles.form_label}>
              <span className={formStyles.form_text}>사업자 등록 번호</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-registerNum"
                type="text"
                value="123-45-67890"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
        </div>
        <div className={`${formStyles.form_row} ${formStyles.col} ${signupStyles.auth_form}`}>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <strong className={formStyles.form_title}>업무 담당 회사 정보</strong>
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
            <label htmlFor="name-owner" className={formStyles.form_label}>
              <span className={formStyles.form_text}>담당자</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-owner"
                type="text"
                value="김현대"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
        </div>
        <div className={`${formStyles.form_row} ${formStyles.col} ${signupStyles.auth_form}`}>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <strong className={formStyles.form_title}>개인정보</strong>
            <label htmlFor="name-email" className={formStyles.form_label}>
              <span className={formStyles.form_text}>아이디(이메일)</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-email"
                type="text"
                value="hyundai.lee@hyundail.com"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-myName2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>이름</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-myName2"
                type="text"
                value="이현대"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-position" className={formStyles.form_label}>
              <span className={formStyles.form_text}>직위</span>
            </label>
            <div className={formStyles.input_box}>
              <Input
                id="name-position"
                type="text"
                value="책임"
                placeholder=""
                readOnly
                className={formStyles.lg}
              />
            </div>
          </div>
          {/* form_item */}
          <div className={formStyles.form_item}>
            <label htmlFor="name-phoneNum" className={formStyles.form_label}>
              <span className={formStyles.form_text}>휴대폰 번호</span>
            </label>
            <div className={formStyles.input_box}>
              <Select
                className={(formStyles.select_option, formStyles.short)}
                options={[
                  { value: 'type1', label: '+82' },
                  { value: 'type2', label: '+83' },
                ]}
                readOnly
                size="lg"
              />
              <Input
                id="name-phoneNum"
                type="text"
                placeholder="-없이 휴대폰 번호입력(0102345678)"
                readOnly
                value="01012345678"
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
