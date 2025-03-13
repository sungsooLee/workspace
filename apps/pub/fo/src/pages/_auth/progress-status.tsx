import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { IcoFormRequired, IcoSucess, IcoComplete, IcoCaution02 } from '@learnway/icons';
import styles from './progress-status.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import hightlightMessageBoxStyles from '@learnway/styles/fo/shared/ui/highlight-message-box/highlight-message-box.module.css';
import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css'; // 결과모듈
import { Button, Input, Select, ContentsRow } from '@learnway/ui';

export const Route = createFileRoute('/_auth/progress-status')({
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
              회원가입이 대기 중입니다.
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
              신청일시 : <strong>YYYY-MM-DD</strong>
              {/* 승인완료 
              승인일시 : <strong>YYYY-MM-DD</strong>*/}
              {/* 반려 
              반려일시 : <strong>YYYY-MM-DD</strong>*/}
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
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="" value="현대오토애버" readOnly />
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
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="" value="123-45-67890" readOnly />
                </div>
              </div>
            </ContentsRow>
          </div>

          <hr className={`${formStyles.divider} ${styles.divider}`} />

          <h4 className={cn(styles.title, 'auth--title')}>개인정보</h4>

          <div className="no_line col">
            <ContentsRow>
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
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>이름</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="김현대" value="" />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>직위</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="컨버전스 본부 / 책임" value="" />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
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
            </ContentsRow>
          </div>

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="primary" size="xl">
              로그인
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
