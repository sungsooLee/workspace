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
  // 퍼블수정 20250718 수정
  const passwordChangeAlert = () => {
    openAlert({
      title: '비밀번호가 변경되었습니다.',
      content: '새로운 비밀번호로 변경되었습니다.',
    });
  };

  return (
    <ModalContainer>
      <ModalTitle>{'비밀번호 변경'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.pw_change}`}>
          {/* 퍼블수정 20250718 input에 inputSize 옵션 추가 */}
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
                  <Input id="password" type="password" placeholder="비밀번호" inputSize="lg" />
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
                    inputSize="lg"
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
                    inputSize="lg"
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
            {/* 퍼블수정 20250718 아이콘 수정 및 문구 수정 */}
            <dl className={noticeBoxStyles.check_point}>
              <dt>
                <IcoCaution width={24} height={24} stroke="#4d525c" />
                유의사항
              </dt>
              <dd>
                영문자, 숫자, 특수문자 3가지 조합 8자리 이상 또는 2가지 조합 10자리 이상 입력하세요.
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
        {/* 퍼블수정 20250718 사이즈 수정 */}
        <Button label={'취소'} variant="gray" size="xl"></Button>
        <Button
          label={'변경'}
          variant={'primary'}
          size={'xl'}
          onClick={() => passwordChangeAlert()}
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export const PasswordChangePopup = memo(PasswordChangePopupComponent);
