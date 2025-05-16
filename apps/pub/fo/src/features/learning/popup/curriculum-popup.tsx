import { ReactNode, useState } from 'react';
import { memo } from 'react';
import { ModalBody, ModalContainer, ModalTitle, ModalFooter, Button } from '@learnway/ui';
import { SidePanel } from '../../../features/learning';

import styles from './curriculum-popup.module.css';

interface ChildData {
  panelState: boolean;
}

const CurriculumPopupComponent = () => {
  const [childInfo, setChildInfo] = useState<boolean>();
  const handleChildData = (data: ChildData) => {
    setChildInfo(data.panelState);
  };

  return (
    <ModalContainer>
      <ModalTitle>{'커리큘럼'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.curriculum_wrap}`}>커리큘럼</div>
      </ModalBody>
      {/* <ModalFooter>
        <SidePanel onValueChange={handleChildData} />
      </ModalFooter> */}
    </ModalContainer>
  );
};

export const CurriculumPopup = memo(CurriculumPopupComponent);
