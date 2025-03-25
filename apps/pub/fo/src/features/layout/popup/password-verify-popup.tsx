import { memo } from 'react';
import { cn } from '@learnway/shared';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  useModal,
  Button,
  ContentsRow,
  Input,
} from '@learnway/ui';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/features/layout/popup/password-verify-popup.module.css';

const PasswordVerifyPopupComponent = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'비밀번호 확인'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.pw_verify}`}>
          <p>
            개인정보를 변경 하시려면
            <br />
            비밀번호를 확인해주세요.
          </p>
          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name4" className={formStyles.form_label}>
                <span className={formStyles.form_text}>교육 담당자</span>
              </label>
              <div className={cn(formStyles.input_box, styles.input_box)}>
                <Input id="name4" type="text" value="오창영" className="lg" />
              </div>
            </div>
          </ContentsRow>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const PasswordVerifyPopup = memo(PasswordVerifyPopupComponent);
