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
import { IcoFormRequired, IcoCaution } from '@learnway/icons';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import noticeBoxStyles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';
import styles from './password-change-popup.module.css';

const PasswordChangePopupComponent = () => {
  const { alert: openAlert } = useModal();

  // 비밀번호 변경 alert
  const passwordChangeAlert = () => {
    openAlert({
      content: <>비밀번호가 변경되었습니다.</>,
    });
  };

  return (
    <ModalContainer>
      <ModalTitle>{'비밀번호 변경'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.pw_change}`}>
          <div className={styles.input_box}>
            {/* 현재 비밀번호 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="password" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>현재 비밀번호</span>
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={10} height={10} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input id="password" type="password" placeholder="비밀번호" />
                </div>
              </div>
            </ContentsRow>

            {/* 새로운 비밀번호 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="password2" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 비밀번호</span>
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={10} height={10} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="password2"
                    type="password"
                    placeholder="비밀번호(영문자, 숫자, 특수문자 3가지 조합 8자리 이상)"
                  />
                </div>
              </div>
            </ContentsRow>

            {/* 새로운 비밀번호 확인 */}
            <ContentsRow>
              <div className={formStyles.form_item}>
                <label htmlFor="password3" className={formStyles.form_label}>
                  <span className={formStyles.form_text}>새로운 비밀번호 확인</span>
                  <span className={cn(formStyles.status, formStyles.required)}>
                    <IcoFormRequired width={10} height={10} />
                  </span>
                </label>
                <div className={formStyles.input_box}>
                  <Input
                    id="password3"
                    type="password"
                    placeholder="새로운 비밀번호 재입력"
                    error
                  />
                </div>
                {/* error 문구 */}
                <p className={cn(formStyles.guide_text, formStyles.error)}>
                  새로운 비밀번호를 다시 확인해 주세요.
                </p>
              </div>
            </ContentsRow>
          </div>

          {/* 유의사항 */}
          <div className={`${noticeBoxStyles.start} ${styles.notice}`}>
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={16} height={16} stroke="#6F798B" />
                유의사항
              </dt>
              <dd>
                영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 8-20자리로 입력해 주세요.
              </dd>
              <dd>직전에 사용한 비밀번호는 사용하실 수 없습니다.</dd>
              <dd>아이디와 동일한 비밀번호는 사용하실 수 없습니다.</dd>
              <dd>
                생년월일, 전화번호와 동일하거나 일부를 포함한 비밀번호는 사용하실 수 없습니다.
              </dd>
              <dd>
                3글자 이상의 동일한 숫자/문자 또는 연속된 숫자/문자, 키보드 상 연속된 배열의 문자는
                입력하실 수 없습니다.
              </dd>
            </dl>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant="gray" size="lg"></Button>
        <Button
          label={'변경'}
          variant={'primary'}
          size={'lg'}
          onClick={() => passwordChangeAlert()}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const PasswordChangePopup = memo(PasswordChangePopupComponent);
