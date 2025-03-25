import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { IcoFormRequired, IcoSucess, IcoComplete, IcoCaution02 } from '@learnway/icons';
import styles from './progress-status-result.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import hightlightMessageBoxStyles from '@learnway/styles/fo/shared/ui/highlight-message-box/highlight-message-box.module.css';
import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css'; // 결과모듈
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';
import { Button, Input, Select, ContentsRow, PhoneNumber } from '@learnway/ui';

export const Route = createFileRoute('/_auth/progress-status-result-en')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.signup_step}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={`${proccessResultStyles.start} ${styles.success_info}`}>
            <i className={proccessResultStyles.ico}>
              {/* 대기중 */}
              <IcoSucess width={56} height={56} fill="#06226A" />
              {/* 승인완료 */}
              {/* <IcoComplete width={56} height={56} stroke="#00AFD5" /> */}
              {/* 반려 */}
              {/* <IcoCaution02 width={56} height={56} stroke="#FFB902" /> */}
            </i>
            <h3 className={proccessResultStyles.title}>
              {/* 대기중 */}
              Waiting for administrator approval.
              {/* 승인완료 
              회원가입 승인완료되었습니다.*/}
              {/* 반려 
              회원가입이 반려되었습니다.*/}
            </h3>
            <p className={proccessResultStyles.noti}>
              he result of your registration has been sent to the email you provided.
            </p>
            {/* 퍼블수정 20250312 : 모듈화로 인한 className변경 */}
            <div className={`${hightlightMessageBoxStyles.start} ${styles.noti_box}`}>
              Date of Application : <strong>YYYY-MM-DD TT:MM:SS</strong>
              {/* 승인완료 
              승인일시 : <strong>YYYY-MM-DD</strong>*/}
              {/* 반려 
              반려일시 : <strong>YYYY-MM-DD</strong>*/}
            </div>
          </div>

          <h4 className={cn(styles.title, 'auth--title')}>Organization</h4>
          <div className="no_line col">
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.input_box}>
                  <div className={dynamicFormStyles.item_col_full}>
                    <Input id="name" type="text" placeholder="" value="North America" readOnly />
                    <Input
                      id="name"
                      type="text"
                      placeholder=""
                      value="United State States of America(the)_Hyundai Motor America"
                      readOnly
                    />
                    <Input id="name" type="text" placeholder="" value="Dealer " readOnly />
                  </div>
                </div>
              </div>
            </ContentsRow>
          </div>

          <hr className={`${formStyles.divider} ${styles.divider}`} />

          <h4 className={cn(styles.title, 'auth--title')}>Required Information</h4>

          <div className="no_line col">
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>Name</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="" value="Hyundai" readOnly />
                  <Input id="name" type="text" placeholder="" value="Kim" readOnly />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>ID(email)</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name"
                    type="text"
                    placeholder=""
                    value="hyundai.lee@hyundai.com"
                    readOnly
                  />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name-1-6" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>Mobile phone Number </span>
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
                    value="0102345678"
                    readOnly
                  />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>Job Domin</span>
                </label>
                <div className={formStyles.input_box}>
                  <div className={dynamicFormStyles.item_col_full}>
                    <div className={dynamicFormStyles.flex_plus}>
                      <Input id="name" type="text" placeholder="" value="CV Sales" readOnly />
                      <Input id="name" type="text" placeholder="" value="Manager" readOnly />
                    </div>

                    <div className={dynamicFormStyles.flex_plus}>
                      <Input id="name" type="text" placeholder="" value="CV Sales" readOnly />
                      <Input id="name" type="text" placeholder="" value="Manager" readOnly />
                      <Input id="name" type="text" placeholder="" value="CV Sales" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </ContentsRow>
          </div>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="primary" size="xl">
              OK
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
