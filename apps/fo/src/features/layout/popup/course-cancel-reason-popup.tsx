import { useState, memo } from 'react';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/features/layout/popup/course-cancel-reason-popup.module.css';
import { Button } from '@learnway/ui/button';
import { ModalTitle, ModalBody, ModalContainer, ModalFooter } from '@learnway/ui/modal';
import { Textarea } from '@learnway/ui/textarea';

const CourseCancelReasonPopupComponent = ({
  okCallback,
  closeCallback,
}: {
  okCallback: (value: string) => void;
  closeCallback: () => void;
}) => {
  const [reasonValue, setReasonValue] = useState<string>('Text');
  const handleReasonValueChange = (value: string) => {
    setReasonValue(value);
  };

  const handleCancleReason = () => {
    closeCallback();
    okCallback(reasonValue);
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
        <Button label={'취소'} variant={'gray'} size={'xl'} onClick={closeCallback}></Button>
        <Button label={'확인'} variant={'primary'} size={'xl'} onClick={handleCancleReason} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const CourseCancelReasonPopup = memo(CourseCancelReasonPopupComponent);
