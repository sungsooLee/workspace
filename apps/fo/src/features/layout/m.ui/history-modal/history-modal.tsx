import { ModalBody, ModalContainer, ModalTitle } from '@learnway/ui/modal';
import { HistoryContents } from './history-contents';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/gnb-popup-m.module.css';

// 최근 학습활동 Modal
const HistoryModalComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'최근 학습활동'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.history_modal}`}>
          <HistoryContents />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const HistoryModal = HistoryModalComponent;
