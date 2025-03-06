import { memo } from 'react';
import { cn } from '@learnway/shared';
import styles from './google-input-popup.module.css';
import signupStyles from '../../../pages/_auth/signup.module.css';
import formStyles from '../../../assets/styles/modules/form.module.css';
import { IcoCaution, IcoFormRequired } from '@learnway/icons';
import { ContentsRow, Input } from '@learnway/ui';

const GoogleInputPopupCompoment = () => {
  return (
    <div className={`${styles.start} ${styles.google_input_popup}`}>
      <div className={cn(signupStyles.auth_form, 'no_line', 'col')}>
        <ContentsRow>
          <div className={formStyles.form_item}>
            <label htmlFor="name" className={formStyles.form_label}>
              <span className={formStyles.form_text}>구글 OTP 번호</span>
              {/* 필수 케이스 */}
              <span className={cn(formStyles.status, formStyles.required)}>
                <IcoFormRequired width={12} height={12} />
              </span>
            </label>
            <div className={formStyles.input_box}>
              <Input id="name" type="password" placeholder="구글 OTP 번호 입력" value="" />
            </div>
          </div>
        </ContentsRow>
      </div>
      <div className={signupStyles.signup_noti}>
        <dl className={signupStyles.check_point}>
          <dt>
            <IcoCaution width={16} height={16} stroke="#6F798B" />
            유의사항
          </dt>
          <dd>구글 OTP 앱에서 +를 탭하고 QR코드 스캔을 선택해 주세요.</dd>
          <dd>QR코드 스캔 후 다음 버튼을 클릭해 주세요.</dd>
        </dl>
      </div>
    </div>
  );
};

export const GoogleInputPopup = memo(GoogleInputPopupCompoment);
