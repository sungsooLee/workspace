import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoCaution, IcoFormRequired } from '@learnway/icons';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/bo/pages/_auth/signup-progress/signup-progress.module.css';
import noticeBoxStyles from '@learnway/styles/bo/shared/ui/notice-box/notice-box.module.css';
import authFormStyles from '@learnway/styles/bo/features/auth/ui/auth-form/auth-form.module.css'; // 영역
import embededAlert from '@learnway/styles/bo/shared/ui/embeded-alert/embeded-alert.module.css';

import { Button, Input, ContentsRow } from '@learnway/ui';

export const Route = createFileRoute('/_auth/progress-status-email')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="form_row">
      <div className={`${styles.start} ${styles.auth_wrap}`}>
        <div className={cn(styles.auth_box, 'auth--box')}>
          {/* 퍼블수정 20250319 : embededAlert */}
          <div className={`${embededAlert.start} ${styles.search_info}`}>
            <IcoCaution width={48} height={48} stroke={'#A9AFB8'} />
            <p className={embededAlert.txt}>진행현황 확인을 위해 이메일을 입력해 주세요.</p>
          </div>

          {/* OTP 인증폼 */}
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
            <ContentsRow>
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
                </div>
              </div>
            </ContentsRow>
          </div>

          {/* 유의사항 모듈 */}
          <div className={`${noticeBoxStyles.start} ${authFormStyles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>아이디로 사용하는 이메일을 입력해야 진행현황을 확인할 수 있습니다.</dd>
            </dl>
          </div>
          {/* 유의사항 모듈 */}

          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl">
              취소
            </Button>

            <Button size="xl" variant="primary">
              진행현황 확인
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
