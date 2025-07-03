import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoCaution, IcoFormRequired, IcoMail, IcoPhone02 } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, ContentsRow, Input, RadioCard, Select, useModal } from '@learnway/ui';

export const Route = createFileRoute('/_auth/progress-status-certify')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedValue, setSelectedValue] = useState<string>('type1');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };
  const { alert: openAlert } = useModal();
  const handleClickAlert = () => {
    openAlert({
      title: <>입력 정보를 확인해 주세요.</>,
      content: (
        <>
          입력하신 정보가 등록되어 있지 않습니다. <br />
          정확한 정보를 다시 입력해 주세요.
        </>
      ),
    });
  };
  return (
    <form className="form_row">
      <div className={`${styles.start} ${signupStyles.auth_wrap} ${signupStyles.search_account}`}>
        <div className={signupStyles.auth_box}>
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
              defaultValue={'type1'}
              onValueChange={handleValueChange}
            />
          </div>

          {/* 인증폼 */}
          <div className={`${formStyles.no_line} ${formStyles.col} ${signupStyles.auth_form}`}>
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
                    <Input
                      id="name-1-6"
                      type="text"
                      placeholder="아이디(hyundai.kim@hyundail.com)"
                    />
                  </div>
                </div>
              </ContentsRow>
            )}
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
                있습니다.
              </dd>
            </dl>
          </div>
          <div className={signupStyles.btn_wrap}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl" onClick={handleClickAlert}>
              인증번호 요청
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
