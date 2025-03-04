import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { IcoFormRequired, IcoSucess } from '@learnway/icons';
import signupStyles from './signup.module.css';
import formStyles from '../../assets/styles/modules/form.module.css';
import { Button, Stepper, SelectOption, Input, Checkbox, Select } from '@learnway/ui';

export const Route = createFileRoute('/_auth/progress-status')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.signup_step}`}>
      <div className={signupStyles.auth_box}>
        <div className={signupStyles.success_info}>
          <i className={signupStyles.ico}>
            {/* 정상처리 */}
            <IcoSucess width={56} height={56} fill="#06226A" />
          </i>
          <h3 className={signupStyles.title}>회원가입이 대기 중입니다.</h3>
          <p className={signupStyles.noti}>회원가입 결과는 입력하신 메일로 발송되었습니다.</p>
          <div className={`${signupStyles.noti_box} ${signupStyles.type2}`}>
            신청일시 : <strong>YYYY-MM-DD</strong>
          </div>
        </div>

        <h4 className={signupStyles.title}>협력업체 회사 정보</h4>

        <div className={`${formStyles.form_row} ${formStyles.no_line} ${formStyles.col}`}>
          <div className={formStyles.row}>
            <div className={formStyles.form_item}>
              <label htmlFor="name" className={formStyles.form_label}>
                <span className={formStyles.form_text}>회사명</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="name" type="text" placeholder="" value="현대오토애버" readOnly />
              </div>
              <p className={cn(formStyles.guide_text)}>사업자 등록 번호가 확인 되었습니다.</p>
            </div>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.form_item}>
              <label htmlFor="name" className={formStyles.form_label}>
                <span className={formStyles.form_text}>사업자 등록 번호</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="name" type="text" placeholder="" value="123-45-67890" readOnly />
              </div>
            </div>
          </div>
        </div>

        <hr className={formStyles.divider} />

        <h4 className={signupStyles.title}>개인정보</h4>

        <div className={`${formStyles.form_row} ${formStyles.no_line} ${formStyles.col}`}>
          <div className={formStyles.row}>
            <div className={formStyles.form_item}>
              <label htmlFor="name" className={formStyles.form_label}>
                <span className={formStyles.form_text}>아이디(이메일)</span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name"
                  type="text"
                  placeholder="아이디(hyundai.kim@hyundail.com)"
                  value=""
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.form_item}>
              <label htmlFor="name" className={formStyles.form_label}>
                <span className={formStyles.form_text}>이름</span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="name" type="text" placeholder="김현대" value="" />
              </div>
            </div>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.form_item}>
              <label htmlFor="name" className={formStyles.form_label}>
                <span className={formStyles.form_text}>직위</span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="name" type="text" placeholder="컨버전스 본부 / 책임" value="" />
              </div>
            </div>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.form_item}>
              <label htmlFor="name-1-6" className={formStyles.form_label}>
                <span className={formStyles.form_text}>휴대폰번호</span>
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
                <Input id="name-1-6" type="text" placeholder="- 제외한 숫자만 입력" />
              </div>
            </div>
          </div>
        </div>

        <div className={signupStyles.btn_wrap}>
          <Button variant="primary" size="xl">
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
