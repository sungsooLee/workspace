import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoPhone02, IcoMail, IcoCaution, IcoFormRequired } from '@learnway/icons';
import formStyles from '../../assets/styles/modules/form.module.css';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, RadioCard, Input, Select, useModal } from '@learnway/ui';

export const Route = createFileRoute('/_auth/search-account')({
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
      description: (
        <>
          입력하신 정보가 등록되어 있지 않습니다. <br />
          정확한 정보를 다시 입력해 주세요.
        </>
      ),
    });
  };
  return (
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
        <div
          className={`${formStyles.form_row} ${formStyles.no_line} ${formStyles.col} ${signupStyles.auth_form}`}>
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
          </div>

          {selectedValue === 'type1' ? (
            <div className={formStyles.row}>
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
                  <Select
                    className={formStyles.select_option}
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
            </div>
          ) : (
            <div className={formStyles.row}>
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
            </div>
          )}
        </div>

        <div className={signupStyles.signup_noti}>
          <dl className={styles.check_point}>
            <dt>
              <IcoCaution width={16} height={16} stroke="#6F798B" />
              유의사항
            </dt>
            <dd>관리자 계정의 정보를 정확하게 입력해야 본인인증을 할 수 있습니다. </dd>
          </dl>
        </div>
        <div className={signupStyles.btn_wrap}>
          <Button variant="gray" size="xl">
            취소
          </Button>
          <Button variant="primary" size="xl" onClick={handleClickAlert}>
            {/* 인증완료후 "인증번호 확인"으로 텍스트변경*/}
            인증번호 요청
          </Button>
        </div>
      </div>
    </div>
  );
}
