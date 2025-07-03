import { memo } from 'react';
import { cn } from '@learnway/shared';
import styles from './google-input-popup.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import { IcoCaution, IcoFormRequired } from '@learnway/icons';
import {
  ContentsRow,
  Input,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Button,
  useModal,
} from '@learnway/ui';

const GoogleInputPopupCompoment = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'FIDO 인증'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.google_input_popup}`}>
          <div className={cn(styles.auth_form, 'no_line', 'col')}>
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
          <div className={styles.txt_info}>구글 OTP 앱을 설치하고 QR 코드를 스캔해 주세요.</div>
          <div className={`${noticeBoxStyles.start} ${styles.signup_noti}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>구글 OTP 앱에서 +를 탭하고 QR코드 스캔을 선택해 주세요.</dd>
              <dd>QR코드 스캔 후 다음 버튼을 클릭해 주세요.</dd>
            </dl>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'lg'} onClick={() => closeModal()} />
        <Button
          label={'구글 OTP 인증'}
          variant={'primary'}
          size={'lg'}
          onClick={() => closeModal()}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const GoogleInputPopup = memo(GoogleInputPopupCompoment);
