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
  InputTimer,
} from '@learnway/ui';
import { IcoFormRequired, IcoSucess02 } from '@learnway/icons';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/features/layout/popup/id-change-popup.module.css';

const IdChangePopupComponent = () => {
  const { alert: openAlert } = useModal();

  // 이메일 아이디 변경 alert
  const idChangeAlert = () => {
    openAlert({
      content: <>이메일 아이디가 변경되었습니다.</>,
    });
  };

  return (
    <ModalContainer>
      <ModalTitle>{'이메일 아이디 변경'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.id_change}`}>
          <div className={styles.confirm}>
            <IcoSucess02 width={32} height={32} stroke="#a9afb8"></IcoSucess02>
            <p>
              개인정보를 변경 하시려면
              <br />
              비밀번호를 확인해주세요.
            </p>
          </div>
          <div className={styles.input_box}>
            {/* 현재 이메일 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="email" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>현재 이메일</span>
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={10} height={10} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="email" type="text" placeholder="현재 이메일" />
                </div>
              </div>
            </ContentsRow>

            {/* 새로운 이메일 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="email2" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 이메일</span>
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={10} height={10} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="email2" type="text" placeholder="새로운 이메일" />
                </div>
              </div>
            </ContentsRow>

            {/* 이메일 인증번호 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="email3" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>이메일 인증번호</span>
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={10} height={10} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <InputTimer
                    startTimer={1}
                    initialTime={180}
                    placeholder={'이메일 인증번호'}
                    resetLabel={'재전송'}
                    error
                  />
                </div>
                {/* error 문구 */}
                <p className={cn(formStyles.guide_text, formStyles.error)}>
                  인증번호가 일치하지 않습니다.
                  <br />
                  인증번호를 다시 확인해 주세요.
                </p>
              </div>
            </ContentsRow>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant="gray" size="lg"></Button>
        <Button label={'변경'} variant={'primary'} size={'lg'} onClick={() => idChangeAlert()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const IdChangePopup = memo(IdChangePopupComponent);
