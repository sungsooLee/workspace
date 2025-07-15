import { FC, memo } from 'react';
import styles from '@learnway/styles/fo/pages/_learning/side-panel/popup/next-learning-popup.module.css';
import {
  ModalBody,
  ModalContainer,
  ModalTitle,
  ModalFooter,
  Button,
  useLearningWindow,
  useModal,
} from '@learnway/ui';
import { IcoRefresh02, IcoPrevNext } from '@learnway/icons';

const NextLearningPopupComponent: FC<any> = ({ isNext }) => {
  const { open: openModal, close: closeModal } = useModal();
  const { playIndex, playList, gotoNextLesson, gotoBeforeLesson } = useLearningWindow();
  const addValue = isNext ? 1 : -1;
  const hanldeNextButtonClick = () => {
    const retval = isNext ? gotoNextLesson() : gotoBeforeLesson();
    if (retval) closeModal();
  };
  return (
    <ModalContainer>
      <ModalTitle>{isNext ? '다음 강의' : '이전 강의'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.learning}`}>
          {playList ? playList[playIndex + addValue].moduleName : ''} (
          {playList ? playList[playIndex + addValue].lessonName : ''})
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant={'gray'} size={'lg'} className={styles.btn_refresh}>
          <IcoRefresh02 width={24} height={24} stroke="#6f798b" fill="#fff" />
          <span>다시보기</span>
        </Button>
        <Button
          variant={'primary'}
          size={'lg'}
          className={styles.btn_learning}
          preventDefault
          onClick={hanldeNextButtonClick}
        >
          <span>{isNext ? '다음 강의' : '이전 강의'}</span>
          <IcoPrevNext width={24} height={24} stroke="#fff" />
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const NextLearningPopup = memo(NextLearningPopupComponent);
