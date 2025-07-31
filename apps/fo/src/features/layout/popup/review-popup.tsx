import { IcoStar } from '@learnway/icons';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/features/layout/popup/review-popup.module.css';
import bulletStyles from '@learnway/styles/fo/shared/ui/list/bullet.module.css';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle } from '@learnway/ui/modal';
import { Textarea } from '@learnway/ui/textarea';
import { memo, useState } from 'react';

const ReviewPopupComponent = () => {
  // 임시 초기값 (값 전달 필요)
  const [rating, setRating] = useState([true, true, true, true, false]);

  const ratingHandleClick = (index: number) => {
    const newStates = rating.map((_, i) => i <= index);
    setRating(newStates);
  };

  // textarea
  const [reviewValue, setReviewValue] = useState<string>('Text');
  const handleReviewValueChange = (value: string) => {
    setReviewValue(value);
  };

  return (
    <ModalContainer>
      <ModalTitle>{'후기'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.review_wrap}`}>
          <div className={styles.info_box}>
            <div className={styles.rating_box}>
              <p>학습은 어떠셨나요? 별점을 선택해 주세요.</p>
              <div className={styles.rating}>
                {rating.map((isActive, index) => (
                  <Button key={index} onClick={() => ratingHandleClick(index)}>
                    <IcoStar width={40} height={40} fill={isActive ? '#0056ff' : '#b7bbc3'} />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.info_box}>
            <div className={styles.detail}>
              <ContentsRow>
                <div className={formStyles.form_item}>
                  <label htmlFor="textarea" className={formStyles.form_label}>
                    <span className={formStyles.form_text}>내용작성</span>
                  </label>
                  <div className={formStyles.input_box}>
                    <Textarea
                      id="textarea"
                      resize="none"
                      placeholder=""
                      value={reviewValue}
                      onChange={(e) => handleReviewValueChange(e.target.value)}
                      size="md"
                      maxLength={100}
                      className={formStyles.textarea}
                    />
                  </div>
                </div>
              </ContentsRow>
            </div>
            {/* bullet list */}
            <div className={`${bulletStyles.start} ${bulletStyles.list} ${styles.list}`}>
              <ul>
                <li>작성된 후기는 학습 상세에서 공개되고 있어요.</li>
                <li>
                  욕설, 비 등 학습과 직접적인 관련이 없는 게시물은 등록할 경우 이용상의 제재를 받을
                  수 있어요.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant="gray" size="xl2"></Button>
        <Button label={'확인'} variant={'primary'} size={'xl2'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const ReviewPopup = memo(ReviewPopupComponent);
