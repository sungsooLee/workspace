import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute } from '@tanstack/react-router';
import { IcoFormRequired, IcoArrowForward } from '@learnway/icons';
import styles from './signup-step3.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';
import {
  Button,
  Stepper,
  SelectOption,
  Input,
  Checkbox,
  Select,
  ContentsRow,
  PhoneNumber,
  InputTimer,
} from '@learnway/ui';

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
    <div className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.signup_info}>
            <div className={styles.step_box}>
              <Stepper items={items} onChange={handleChange} variant="check" selectedStep="step3" />
            </div>
          </div>

          <h4 className={cn(styles.title, 'auth--title')}>협력업체 회사 정보</h4>

          <div className="no_line col">
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>회사명</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={14} height={14} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="" value="현대오토에버" readOnly />
                </div>
                <p className={cn(formStyles.guide_text)}>사업자 등록 번호가 확인 되었습니다.</p>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>사업자 등록 번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={14} height={14} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="" value="123-45-67890" readOnly />
                </div>
              </div>
            </ContentsRow>
          </div>

          <hr className={`${formStyles.divider} ${styles.divider}`} />

          <h4 className={cn(styles.title, 'auth--title')}>개인정보 입력</h4>

          <div className="no_line col">
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>이메일</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={14} height={14} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name"
                    type="text"
                    placeholder="아이디(hyundai.kim@hyundail.com)"
                    value=""
                  />
                  {/* 퍼블수정 20250319 : 버튼 수정 */}

                  <Button variant="gray" size="lg" className="min-w-min">
                    확인
                  </Button>
                </div>
              </div>
            </ContentsRow>

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

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>비밀번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={14} height={14} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={dynamicFormStyles.item_col_full}>
                    <Input
                      id="name"
                      type="password"
                      placeholder="비밀번호 (영문 대소문자, 숫자, 특수문자를 조합하여 8~16자리)"
                      value=""
                    />
                    <Input id="name" type="password" placeholder="비밀번호 확인" value="" />
                  </div>
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>이름</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={14} height={14} />
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
                  <span className={formStyles.form_text}>직위</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={14} height={14} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="컨버전스 본부 / 책임" value="" />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name-1-6" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>연락처</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={14} height={14} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  {/* 퍼블수정 20250313 : 공통 변경 */}
                  <PhoneNumber
                    options={[
                      { value: 'type1', label: '+82' },
                      { value: 'type2', label: '+83' },
                    ]}
                    size="lg"
                    placeholder="-없이 휴대폰 번호입력(0102345678)"
                  />
                </div>
              </div>
            </ContentsRow>
          </div>

          <div className={styles.title_box}>
            <h4 className={styles.title}>이용약관 및 개인정보정책 동의</h4>
            <p className={styles.txt_info}>아래의 내용을 주의 깊게 확인 후 동의해주세요.</p>
          </div>

          <div className={styles.signup_check}>
            <div className={styles.check_all}>
              <Checkbox label="전체 약관 동의(선택항목 포함)" />
            </div>
            <ul className={styles.check_list}>
              <li>
                <Checkbox label="러닝웨이 이용약관(필수)" />
                <Button className={styles.btn_view}>
                  <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
                </Button>
              </li>
              <li>
                <Checkbox label="개인정보 이용동의(필수)" />
                <Button className={styles.btn_view}>
                  <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
                </Button>
              </li>
              <li>
                <Checkbox label="고유식별 정보 처리 동의(필수)" />
                <Button className={styles.btn_view}>
                  <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
                </Button>
              </li>
              <li>
                <Checkbox label="회원가입 및 이용 개인정보 제3자 제공동의(필수)" />
                <Button className={styles.btn_view}>
                  <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
                </Button>
              </li>
              <li>
                <Checkbox label="민감정보 수집 및 이용(선택)" />
                <Button className={styles.btn_view}>
                  <IcoArrowForward width={14} height={14} stroke="#131C30" />{' '}
                </Button>
              </li>
            </ul>
          </div>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl">
              이전
            </Button>
            <Button variant="primary" size="xl">
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
