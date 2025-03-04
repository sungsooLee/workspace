import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute } from '@tanstack/react-router';
import { IcoFormRequired } from '@learnway/icons';
import signupStyles from './signup.module.css';
import formStyles from '../../assets/styles/modules/form.module.css';
import { Button, Stepper, SelectOption, Input, Checkbox, Select } from '@learnway/ui';

export const Route = createFileRoute('/_auth/signup-step3')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    { label: '회원유형선택', subLabel: '', value: 'step1' },
    { label: '사업자 정보 조회', subLabel: '', value: 'step2' },
    { label: '회원정보입력', subLabel: '', value: 'step3' },
  ];
  const handleChange = (event: SelectOption) => {
    console.log(event);
  };
  return (
    <div className={`${signupStyles.start} ${signupStyles.auth_wrap} ${signupStyles.signup_step}`}>
      <div className={signupStyles.auth_box}>
        <div className={signupStyles.signup_info}>
          <div className={signupStyles.step_box}>
            <Stepper items={items} onChange={handleChange} variant="check" selectedStep="step3" />
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

        <h4 className={signupStyles.title}>개인정보 입력</h4>

        <div className={`${formStyles.form_row} ${formStyles.no_line} ${formStyles.col}`}>
          <div className={formStyles.row}>
            <div className={formStyles.form_item}>
              <label htmlFor="name" className={formStyles.form_label}>
                <span className={formStyles.form_text}>이메일</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name"
                  type="text"
                  placeholder="아이디(hyundai.kim@hyundail.com)"
                  value=""
                />
                <Button variant="gray" size="lg">
                  확인
                </Button>
              </div>
            </div>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.form_item}>
              <label htmlFor="name" className={formStyles.form_label}>
                <span className={formStyles.form_text}>비밀번호</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input
                  id="name"
                  type="password"
                  placeholder="비밀번호 (영문 대소문자, 숫자, 특수문자를 조합하여 8~16자리)"
                  value=""
                />
              </div>
              <div className={formStyles.input_box}>
                <Input id="name" type="password" placeholder="비밀번호 확인" value="" />
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
                <span className={formStyles.form_text}>직위</span>
                {/* 필수 케이스 */}
                <span className={cn(formStyles.status, formStyles.required)}>
                  <IcoFormRequired width={12} height={12} />
                </span>
              </label>
              <div className={formStyles.input_box}>
                <Input id="name" type="text" placeholder="컨버전스 본부 / 책임" value="" />
              </div>
            </div>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.form_item}>
              <label htmlFor="name-1-6" className={formStyles.form_label}>
                <span className={formStyles.form_text}>연락처</span>
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
                <Input id="name-1-6" type="text" placeholder="- 제외한 숫자만 입력" />
              </div>
            </div>
          </div>
        </div>

        <div className={signupStyles.title_box}>
          <h4 className={signupStyles.title}>이용약관 및 개인정보정책 동의</h4>
          <p className={signupStyles.txt_info}>아래의 내용을 주의 깊게 확인 후 동의해주세요.</p>
        </div>

        <div className={signupStyles.signup_check}>
          <div className={signupStyles.check_all}>
            <Checkbox label="전체 약관 동의(선택항목 포함)" />
          </div>
          <ul className={signupStyles.check_list}>
            <li>
              <Checkbox label="러닝웨이 이용약관(필수)" />
              <Button className={signupStyles.btn_view}>자세히 보기</Button>
            </li>
            <li>
              <Checkbox label="개인정보 이용동의(필수)" />
              <Button className={signupStyles.btn_view}>자세히 보기</Button>
            </li>
            <li>
              <Checkbox label="고유식별 정보 처리 동의(필수)" />
              <Button className={signupStyles.btn_view}>자세히 보기</Button>
            </li>
            <li>
              <Checkbox label="회원가입 및 이용 개인정보 제3자 제공동의(필수)" />
              <Button className={signupStyles.btn_view}>자세히 보기</Button>
            </li>
            <li>
              <Checkbox label="민감정보 수집 및 이용(선택)" />
              <Button className={signupStyles.btn_view}>자세히 보기</Button>
            </li>
          </ul>
        </div>

        <div className={signupStyles.btn_wrap}>
          <Button variant="gray" size="xl">
            이전
          </Button>
          <Button variant="primary" size="xl">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
