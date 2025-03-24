import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoCaution, IcoFormRequired } from '@learnway/icons';
import styles from '@learnway/styles/bo/pages/_auth/change-password.module.css';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/bo/shared/ui/notice-box/notice-box.module.css';
import hightlightMessageBoxStyles from '@learnway/styles/bo/shared/ui/highlight-message-box/highlight-message-box.module.css';
import { Button, Input, useModal, ContentsRow } from '@learnway/ui';

export const Route = createFileRoute('/_auth/password-modify')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert } = useModal();
  const handleClickAlert = () => {
    openAlert({
      title: <>비밀번호가 변경되었습니다.</>,
      description: <>변경된 비밀번호로 다시 로그인해 주세요.</>,
    });
  };
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_account}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <div className={styles.success_info}>
            <div className={`${hightlightMessageBoxStyles.start} ${styles.noti_box}`}>
              마지막 변경일 : <strong>{'2025-01-01(목) 12:50:52'}</strong>
            </div>
          </div>
          {/* 인증폼 */}
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="pw-now" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>현재 비밀번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="pw-now" type="password" placeholder="비밀번호" value="" />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="pw-new" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 비밀번호</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="pw-new"
                    type="password"
                    placeholder="비밀번호(영문자, 숫자, 특수문자 3가지 조합 8자리 이상)"
                    value=""
                  />
                </div>
              </div>
            </ContentsRow>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="pw-new-confirm" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 비밀번호 확인</span>
                  {/* 필수 케이스 */}
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={12} height={12} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="pw-new-confirm"
                    type="password"
                    placeholder="새로운 비밀번호 재입력"
                    value=""
                  />
                </div>
              </div>
            </ContentsRow>
          </div>
          {/* 180일 경과 */}
          <div className={styles.noti_info_txt}>
            <Button className={styles.btn_txt}>{'1개월 후에 변경'}</Button>
          </div>
          <div className={`${noticeBoxStyles.start} ${styles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>
                영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 8-20자리로 입력해 주세요.
              </dd>
              <dd>직전에 사용한 비밀번호는 사용하실 수 없습니다.</dd>
              <dd>아이디와 동일한 비밀번호는 사용하실 수 없습니다.</dd>
              <dd>
                생년월일, 전화번호와 동일하거나 일부를 포함한 비밀번호는 사용하실 수 없습니다.
              </dd>
              <dd>
                3글자 이상의 동일한 숫자/문자 또는 연속된 숫자/문자, 키보드 상 연속된 배열의 문자는
                입력하실 수 없습니다.
              </dd>
            </dl>
          </div>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl" onClick={handleClickAlert}>
              확인
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
