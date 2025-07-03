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
  EmptyText,
} from '@learnway/ui';
import { IcoSucess02 } from '@learnway/icons';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './password-verify-popup.module.css';

const PasswordVerifyPopupComponent = () => {
  const { alert: openAlert } = useModal();

  const passwordError = () => {
    openAlert({
      title: <>비밀번호를 입력해주세요.</>,
      content: (
        <>
          비밀번호를 정확하게 입력해 주세요.
          <br />
          5회 이상 비밀번호 오류 시 계정이 잠기며 비밀번호 변경 후에 로그인 할 수 있습니다.
          <div className="error">오류 횟수 1/5</div>
        </>
      ),
      okButtonLabel: '확인',
    });
  };

  const passwordLock = () => {
    openAlert({
      title: <>로그인 계정이 잠겼습니다. </>,
      content: (
        <>
          5회 이상 비밀번호 오류로 인해 60분 동안 계정이 잠기어 남은 시간 동안 로그인이 불가합니다.
          <br />
          비밀번호 분실 시 그룹웨어에서 비밀번호를 변경해 주세요.
          <div className="error">남은 시간 59:59</div>
        </>
      ),
      okButtonLabel: '확인',
    });
  };

  return (
    <ModalContainer>
      <ModalTitle>{'비밀번호 확인'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.pw_verify}`}>
          <div className={styles.confirm}>
            <IcoSucess02 width={32} height={32} stroke="#a9afb8"></IcoSucess02>
            <p>
              개인정보를 변경 하시려면
              <br />
              비밀번호를 확인해주세요.
            </p>
          </div>

          <ContentsRow>
            <div className={formStyles.form_item}>
              <label htmlFor="name4" className={formStyles.form_label}>
                <span className={formStyles.form_text}>비밀번호</span>
              </label>
              <div className={cn(formStyles.input_box, styles.input_box)}>
                <Input id="name4" type="text" placeholder="비밀번호를 입력하세요." className="lg" />
              </div>
            </div>
          </ContentsRow>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => passwordError()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const PasswordVerifyPopup = memo(PasswordVerifyPopupComponent);
