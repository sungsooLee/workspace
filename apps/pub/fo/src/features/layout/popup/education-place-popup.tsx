import { memo, useState } from 'react';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, Button, Dropdown } from '@learnway/ui';

import styles from './education-place-popup.module.css';

import mapImage from '@learnway/styles/fo/assets/images/temp/img_map.png';

const EducationPlacePopupComponent = () => {
  const [dropdownValues, setDropdownValues] = useState<string[]>([]);
  const dropdownOptions = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
  ];

  return (
    <ModalContainer>
      <ModalTitle>{'교육장소'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.education_wrap}`}>
          <Dropdown
            options={dropdownOptions}
            value={dropdownValues}
            onChange={(selected) => setDropdownValues(selected)}
            variant="text"
            isMulti={false}
            size={'sm'}
          />
          <div className={styles.addr_box}>
            <strong>루첸빌딩 지하 1층</strong>
            <dl className={styles.number}>
              <dt>전화번호 : </dt>
              <dd>02-999-8888</dd>
            </dl>
            <dl className={styles.addr}>
              <dt>주소 : </dt>
              <dd>
                서울 강남구 테헤란로 510<Button> 주소복사</Button>
              </dd>
            </dl>
          </div>
          <div className={styles.map}>
            <img src={mapImage} alt="" />
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

export const EducationPlacePopup = memo(EducationPlacePopupComponent);
