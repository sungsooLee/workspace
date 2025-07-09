import { memo } from 'react';
import { ModalBody, ModalContainer, ModalTitle, Popover } from '@learnway/ui';
import { isMobile } from 'react-device-detect';

import styles from './education-place-popup.module.css';

import mapImage from '@learnway/styles/fo/assets/images/temp/img_map.png';

// 약도보기 popover
const CopyPopoverComponent = () => {
  return <p className={styles.copy}>주소를 복사하였습니다</p>;
};

const EducationPlacePopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'교육장소'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.education_wrap}`}>
          <div className={styles.addr_box}>
            <strong>루첸빌딩 지하 1층</strong>
            <dl className={styles.number}>
              <dt>전화번호 :</dt>
              <dd>02-999-8888</dd>
            </dl>
            {/* 퍼블수정 20250708 마크업 수정 */}
            <p className={styles.addr}>
              서울 강남구 테헤란로 510
              <Popover
                popoverContent={<CopyPopoverComponent />}
                side="bottom"
                align={isMobile ? 'center' : 'start'}
                sideOffset={15}
              >
                <span>주소복사</span>
              </Popover>
            </p>
          </div>
          <div className={styles.map}>
            <img src={mapImage} alt="" />
          </div>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const EducationPlacePopup = memo(EducationPlacePopupComponent);
