import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { IcoCaution, IcoFormRequired } from '@learnway/icons';
import formStyles from '../../assets/styles/modules/form.module.css';
import signupStyles from './signup.module.css';
import styles from './signup.module.css';
import { Button, ContentsRow, Input, useModal } from '@learnway/ui';

export const Route = createFileRoute('/_auth/progress-status')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert } = useModal();
  const handleClickAlert = () => {
    openAlert({
      title: <>진행현황이 없습니다.</>,
      content: (
        <>
          입력하신 아이디의 진행현황이 없습니다.
          <br />
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
            진행현황 확인을 위해 이메일을 입력해 주세요.
          </div>

          {/* 인증폼 */}
          <div className={`${formStyles.no_line} ${formStyles.col} ${signupStyles.auth_form}`}>
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

          <div className={signupStyles.signup_noti}>
            <dl className={styles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>아이디로 사용하는 이메일을 입력해야 진행현황을 확인할 수 있습니다.</dd>
            </dl>
          </div>
          <div className={signupStyles.btn_wrap}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl" onClick={() => handleClickAlert()}>
              진행현황 확인
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
