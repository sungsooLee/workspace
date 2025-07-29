import { memo } from 'react';
import { ModalBody, ModalContainer, ModalTitle, Popover } from '@learnway/ui';
import { isMobile } from 'react-device-detect';

import styles from '@learnway/styles/fo/features/layout/popup/education-place-popup.module.css';

import mapImage from '@learnway/styles/fo/assets/images/temp/img_map.png';
import { Address } from '@types';

// 약도보기 popover
const CopyPopoverComponent = () => {
  return <p className={styles.copy}>준비중인 기능입니다{/*주소를 복사하였습니다*/}</p>;
};

type Props = {
  address?: string;
  addressName?: string;
};

const EducationPlacePopupComponent = ({ address, addressName }: Props) => {
  return (
    <ModalContainer>
      <ModalTitle>{'교육장소'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.education_wrap}`}>
          <div className={styles.addr_box}>
            <strong>{addressName}</strong>
            <dl className={styles.number}>
              <dt>전화번호 :</dt>
              <dd>00000000000000000000000</dd>
            </dl>
            {/* 퍼블수정 20250708 마크업 수정 */}
            <p className={styles.addr}>
              {address}
              <Popover
                popoverContent={<CopyPopoverComponent />}
                side="bottom"
                align={isMobile ? 'center' : 'start'}
                sideOffset={15}
                forceCloseFocusOutside={true}
                autoClose={true}
              >
                <span
                  onClick={() => {
                    console.log(address);
                  }}
                >
                  주소복사
                </span>
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
