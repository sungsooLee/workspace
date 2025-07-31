import { memo } from 'react';
import { cn } from '@learnway/shared';

import { IcoFormRequired } from '@learnway/icons';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './phone-change-popup.module.css';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input, InputTimer } from '@learnway/ui/input';
import { useModal, ModalContainer, ModalTitle, ModalBody, ModalFooter } from '@learnway/ui/modal';

const PhoneChangePopupComponent = () => {
  const { alert: openAlert } = useModal();

  // 휴대폰번호 변경 alert
  // 퍼블수정 20250718 수정
  const phoneChangeAlert = () => {
    openAlert({
      title: '휴대폰 번호가 변경되었습니다.',
      content: '새로운 번호로 변경되었습니다.',
    });
  };

  return (
    <ModalContainer>
      <ModalTitle>{'휴대폰 번호 변경'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.phone_change}`}>
          {/* 퍼블수정 20250718 input 수정 */}
          <div className={styles.input_box}>
            {/* 현재 휴대폰 번호 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.form_label}>
                  <span className={formStyles.form_text}>현재휴대폰 번호</span>
                </div>
                <div className={`${formStyles.input_box}`}>
                  <Input type="text" placeholder="" value="01012341234" inputSize="lg" readOnly />
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
                <div className={`${formStyles.input_box}`}>
                  <Input type="text" placeholder="" value="01012341234" inputSize="lg" readOnly />
                </div>
                {/* error 문구 */}
                <p className={cn(formStyles.guide_text, formStyles.error)}>
                  휴대폰번호를 다시 확인해 주세요.
                </p>
              </div>
            </ContentsRow>

            {/* 인증번호 */}
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
                    placeholder={'인증번호 입력'}
                    inputSize="lg"
                    resetLabel={'재전송'}
                  />
                </div>
              </div>
            </ContentsRow>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        {/* 퍼블수정 20250718 사이즈 및 문구 수정 */}
        <Button label={'취소'} variant="gray" size="xl"></Button>
        <Button
          label={'인증번호 확인'}
          variant={'primary'}
          size={'xl'}
          onClick={() => phoneChangeAlert()}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const PhoneChangePopup = memo(PhoneChangePopupComponent);
