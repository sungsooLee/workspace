import { IcoCaution } from '@learnway/icons';
import { cn } from '@learnway/shared';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/pages/_auth/search-account/change-password.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import { Button, ContentsRow, Input, useModal } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { BrowserView, MobileView } from 'react-device-detect';
import { AuthTitle } from '../../features/auth';
import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';

export const Route = createFileRoute('/_auth/password-input')({
  component: RouteComponent,
});

function RouteComponent() {
  const { openModal } = useModal();
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap} ${styles.password_input}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          <AuthTitle />
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 비밀번호</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="name"
                    type="text"
                    placeholder="비밀번호(영문자, 숫자, 특수문자 3가지 조합 8자리 이상)"
                    value=""
                  />
                </div>
              </div>
            </ContentsRow>

            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 비밀번호 확인</span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="name" type="text" placeholder="새로운 비밀번호 재입력" value="" />
                </div>
              </div>
            </ContentsRow>
          </div>

          <div className={`${noticeBoxStyles.start} ${styles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution />
                유의사항
              </dt>
              <dd>
                영문자, 숫자, 특수문자 3가지 조합 8자리 이상 또는 2가지 조합 10자리 이상 입력하세요.
              </dd>
              <dd>직전에 사용한 비밀번호는 사용하실 수 없습니다.</dd>

              <dd>
                동일한 숫자/문자 또는 연속된 숫자/문자, 키보드 상 연속된 배열의 문자는 입력하실 수
                없습니다.
              </dd>
              <dd>비밀번호 생성 규칙에 맞는 비밀번호를 사용해 주세요.</dd>
            </dl>
          </div>

          <BrowserView>
            <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
              <Button variant="gray" size="xl">
                취소
              </Button>
              <Button variant="primary" size="xl">
                확인
              </Button>
            </div>
          </BrowserView>

          <MobileView>
            <MobileContainerFooter>
              <Button variant="primary" size="xl">
                확인
              </Button>
            </MobileContainerFooter>
          </MobileView>
        </div>
      </div>
    </form>
  );
}
