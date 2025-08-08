import { memo } from 'react';
import { t } from 'i18next';

import styles from '@learnway/styles/fo/pages/_learning/side-panel/popup/curriculum-popup.module.css';
import { ModalBody, ModalContainer, ModalTitle } from '../../../../modal/modal-container';

import { CurriculumItemList } from '../curriculum-item-list';

const CurriculumPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{t('커리큘럼')}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.curriculum_wrap}`}>
          <CurriculumItemList popupClose={true} />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const CurriculumPopup = memo(CurriculumPopupComponent);
