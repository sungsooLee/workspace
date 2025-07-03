import { useState, memo } from 'react';
import { ModalTitle, ModalBody, ModalContainer, ModalFooter, Button, Textarea } from '@learnway/ui';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './course-cancel-reason-popup.module.css';

const CourseCancelReasonPopupComponent = () => {
  const [reasonValue, setReasonValue] = useState<string>('Text');
  const handleReasonValueChange = (value: string) => {
    setReasonValue(value);
  };
  return (
    <ModalContainer>
      <ModalTitle>{'수강신청 취소 사유를 입력해주세요'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start}`}>
          <div className={formStyles.input_box}>
            <Textarea
              id="textarea"
              rows={2}
              cols={2}
              resize="none"
              placeholder="Text"
              value={reasonValue}
              onChange={(e) => handleReasonValueChange(e.target.value)}
              maxLength={100}
              className={formStyles.textarea}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant={'gray'} size={'xl'}></Button>
        <Button label={'확인'} variant={'primary'} size={'xl'} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const CourseCancelReasonPopup = memo(CourseCancelReasonPopupComponent);
