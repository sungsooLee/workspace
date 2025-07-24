import { ContentsRow, Input, PhoneNumber, Button, useModal } from '@learnway/ui';
import { cn } from '@learnway/shared';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';
import { BrowserView, MobileView } from 'react-device-detect';
import { AddressSearchModal } from '@shared/ui';
import styles from '@learnway/styles/fo/pages/_layout/course/textbook.module.css';

const TextbookDeliveryAddressComponent = () => {
  const { open: openModal } = useModal();

  const handleAddressSearchResult = async () => {
    const address = await openModal({
      width: 'sm',
      content: <AddressSearchModal />,
    });
    console.log(address, 'address');
    // setEditionValue({ postalCode: address.zipNo, address: address.roadAddr });
  };

  return (
    <div className={styles.input_area}>
      <div className={styles.tit_box}>
        <strong>교재 배송지</strong>
      </div>
      <div className={styles.box}>
        {/* 이름 */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <label htmlFor="name2" className={formStyles.form_label}>
              <span className={formStyles.form_text}>이름</span>
            </label>
            <div className={cn(formStyles.input_box, styles.input_box)}>
              <Input
                id="name2"
                type="text"
                value="text"
                placeholder="이름을 입력해주세요"
                inputSize={'lg'}
                readOnly
              />
            </div>
          </div>
        </ContentsRow>
        {/* 휴대폰 번호 */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <div className={formStyles.form_label}>
              <span className={formStyles.form_text}>휴대폰 번호</span>
            </div>
            <div className={formStyles.input_box}>
              <PhoneNumber
                options={[
                  { value: 'type1', label: '010' },
                  { value: 'type2', label: '011' },
                ]}
                size="lg"
                placeholder="-없이 휴대폰 번호입력(01023459876)"
              />
            </div>
          </div>
        </ContentsRow>
        {/* 주소 */}
        <ContentsRow>
          <div className={formStyles.form_item}>
            <label htmlFor="addr" className={formStyles.form_label}>
              <span className={formStyles.form_text}>주소</span>
            </label>
            <div className={formStyles.input_box}>
              <div className={`${dynamicFormStyles.item_col_full} ${styles.item_col_full}`}>
                {/* pc */}
                <BrowserView>
                  <div className={dynamicFormStyles.flex_plus}>
                    <Input
                      id="addr"
                      type="text"
                      placeholder="주소를 입력해주세요"
                      inputSize={'lg'}
                      value=""
                    />
                    <Button variant="gray" size="lx" onClick={handleAddressSearchResult}>
                      주소 찾기
                    </Button>
                  </div>
                  <Input
                    id="addr2"
                    type="text"
                    placeholder="상세주소를 입력해주세요"
                    inputSize={'lg'}
                    value=""
                  />
                  <Input
                    id="addr3"
                    type="text"
                    placeholder="상세주소를 입력해주세요"
                    inputSize={'lg'}
                    value=""
                  />
                </BrowserView>
                {/* mo */}
                <MobileView>
                  <Input
                    id="addr4"
                    type="text"
                    placeholder="주소를 입력해주세요"
                    inputSize={'lg'}
                    value=""
                  />
                  <Input
                    id="addr5"
                    type="text"
                    placeholder="주소를 입력해주세요"
                    inputSize={'lg'}
                    value=""
                  />
                  <Button variant="gray" size="lx" onClick={handleAddressSearchResult}>
                    주소 찾기
                  </Button>
                </MobileView>
              </div>
            </div>
          </div>
        </ContentsRow>
      </div>
    </div>
  );
};

export const TextbookDeliveryAddress = TextbookDeliveryAddressComponent;
