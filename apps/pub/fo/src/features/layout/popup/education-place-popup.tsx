import { memo } from 'react';
import { ModalBody, ModalContainer, ModalTitle, Button, Tooltip } from '@learnway/ui';

import styles from './education-place-popup.module.css';

import mapImage from '@learnway/styles/fo/assets/images/temp/img_map.png';

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
            <dl className={styles.addr}>
              <dt>주소 :</dt>
              <dd>
                서울 강남구 테헤란로 510
                <Tooltip side="bottom" align="start" content={'주소를 복사하였습니다'}>
                  주소복사
                </Tooltip>
              </dd>
            </dl>
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
