import React, { memo } from 'react';
import {
  ModalBody,
  ModalContainer,
  ModalTitle,
  ContentsRow,
  Input,
  Button,
  Pagination,
} from '@learnway/ui';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/features/layout/popup/address-popup.module.css';

const AddressPopupComponent = () => {
  // pagenation
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <ModalContainer>
      <ModalTitle>{'주소 찾기'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.address}`}>
          <div className={styles.input_box}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.input_box}>
                  <Input id="email" type="text" placeholder="도로명, 지번, 건물명 검색" />
                  <Button variant="primary" size="lg">
                    검색
                  </Button>
                </div>
              </div>
            </ContentsRow>
          </div>

          {/* 검색 예시 */}
          <div className={styles.example_box}>
            <p>이렇게 검색해보세요!</p>
            <div className={styles.box}>
              <dl>
                <dt>도로명 + 건물번호</dt>
                <dd>예&#41; 510, 샘플하나더</dd>
              </dl>
              <dl>
                <dt>동/읍/면/리 + 번지</dt>
                <dd>예&#41; 삼성동 171-2, 샘플 하나더</dd>
              </dl>
            </div>
          </div>
          {/* 주소 리스트 */}
          <div className={styles.address_list}>
            <ul>
              <li>
                <Button>
                  <p>
                    <strong>서울 강남구 테헤란로 5길 7 (KG Tower)</strong>
                    <span>지번 역삼동 819-5</span>
                    <span>우 06134</span>
                  </p>
                  <span>선택</span>
                </Button>
              </li>
              <li>
                <Button>
                  <p>
                    <strong>서울 강남구 테헤란로 5길 7 (KG Tower)</strong>
                    <span>지번 역삼동 819-5</span>
                    <span>우 06134</span>
                  </p>
                  <span>선택</span>
                </Button>
              </li>
            </ul>

            <Pagination
              className={styles.pagenation}
              count={3}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const AddressPopup = memo(AddressPopupComponent);
