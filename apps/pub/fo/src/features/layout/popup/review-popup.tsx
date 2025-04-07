import { memo, useState } from 'react';
import { cn } from '@learnway/shared';
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalTitle,
  Button,
  ContentsRow,
  Textarea,
} from '@learnway/ui';
import { IcoStar } from '@learnway/icons';

import bulletStyles from '../../../pages/_layout/course-introduction/bullet.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './review-popup.module.css';

const ReviewPopupComponent = () => {
  // 임시 초기값 (값 전달 필요)
  const [rating, setRating] = useState([true, true, true, true, false]);

  const ratingHandleClick = (index: number) => {
    const newStates = rating.map((_, i) => i <= index);
    setRating(newStates);
  };

  return (
    <ModalContainer>
      <ModalTitle>{'후기 작성'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.review_wrap}`}>
          <div className={styles.info_box}>
            <div className={styles.tit_box}>
              <strong>학습만족도</strong>
            </div>
            <div className={styles.rating_box}>
              <p>학습은 어떠셨나요? 별점을 선택해 주세요.</p>
              <div className={styles.rating}>
                {rating.map((isActive, index) => (
                  <Button key={index} onClick={() => ratingHandleClick(index)}>
                    <IcoStar width={40} height={40} fill={isActive ? '#ffb902' : '#d6dae1'} />
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
        <Button label={'취소'} variant="gray" size="lg"></Button>
        <Button label={'확인'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const ReviewPopup = memo(ReviewPopupComponent);
