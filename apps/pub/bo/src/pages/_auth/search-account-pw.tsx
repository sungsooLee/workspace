import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoCaution, IcoFormRequired } from '@learnway/icons';
import styles from '@learnway/styles/bo/pages/_auth/change-password.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/bo/shared/ui/notice-box/notice-box.module.css';
import { Button, Input, ContentsRow } from '@learnway/ui';

export const Route = createFileRoute('/_auth/search-account-pw')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_account}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.search_info}>
            비밀번호를 찾고자 하는 아이디를 먼저 확인해 주세요.
          </div>

          {/* 인증폼 */}
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            {/* 이메일 인증일때 */}
            <ContentsRow>
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
            </ContentsRow>
          </div>
          <div className={`${noticeBoxStyles.start} ${styles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>아이디로 사용하는 이메일을 입력해야 비밀번호를 확인할 수 있습니다.</dd>
            </dl>
          </div>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl">
              아이디 확인
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
