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
  PhoneNumber,
  InputTimer,
} from '@learnway/ui';

import { IcoFormRequired } from '@learnway/icons';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './phone-change-popup.module.css';

const PhoneChangePopupComponent = () => {
  const { alert: openAlert } = useModal();

  // 이메일 아이디 변경 alert
  const phoneChangeAlert = () => {
    openAlert({
      content: <>휴대폰 번호가 변경되었습니다.</>,
    });
  };

  return (
    <ModalContainer>
      <ModalTitle>{'휴대폰 번호 변경'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.phone_change}`}>
          <div className={styles.input_box}>
            {/* 현재 휴대폰 번호 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>현재 휴대폰 번호</span>
                </div>
                <div className={`${formStyles.input_box} ${styles.phone_box}`}>
                  <PhoneNumber options={[{ value: 'type1', label: '+82' }]} size="lg" readOnly />
                </div>
              </div>
            </ContentsRow>

            {/* 새로운 휴대폰 번호 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 휴대폰 번호</span>
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={10} height={10} />
                  </span>
                </div>
                <div className={`${formStyles.input_box} ${styles.phone_box}`}>
                  <PhoneNumber
                    options={[{ value: 'type1', label: '+82' }]}
                    size="lg"
                    placeholder="-없이 휴대폰 번호입력"
                    error
                  />
                </div>
                {/* error 문구 */}
                <p className={cn(formStyles.guide_text, formStyles.error)}>
                  휴대폰번호를 다시 확인해 주세요.
                </p>
              </div>
            </ContentsRow>

            {/* 인증번호 */}
            {/* 퍼블수정 20250508 : 인증번호 추가 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>인증번호</span>
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={10} height={10} />
                  </span>
                </div>
                <div className={`${formStyles.input_box} ${styles.phone_box}`}>
                  <InputTimer
                    startTimer={1}
                    initialTime={180}
                    placeholder={'인증번호입력'}
                    resetLabel={'재전송'}
                  />
                </div>
              </div>
            </ContentsRow>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant="gray" size="lg"></Button>
        <Button label={'변경'} variant={'primary'} size={'lg'} onClick={() => phoneChangeAlert()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const PhoneChangePopup = memo(PhoneChangePopupComponent);
