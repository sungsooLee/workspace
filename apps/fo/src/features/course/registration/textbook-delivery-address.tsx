import { cn } from '@learnway/shared';
import dynamicFormStyles from '@learnway/styles/fo/assets/styles/modules/dynamic.form.module.css';
import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from '@learnway/styles/fo/pages/_layout/course/textbook.module.css';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Input } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { PhoneNumber } from '@learnway/ui/phone-number';
import { Address, AddressSearchResult } from '@shared/types/common';
import { AddressSearchModal } from '@shared/ui';
import { ChangeEvent, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

type Props = {
  recipientName: string;
  onChangeRecipientName: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addressDetail: string;
  onChangeAddressDetail: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAddressSearchResult: (value: Address) => void;
};

const TextbookDeliveryAddressComponent = ({
  recipientName,
  onChangeRecipientName,
  addressDetail,
  onChangeAddressDetail,
  onAddressSearchResult,
}: Props) => {
  const { openModal } = useModal();
  const [address, setAddress] = useState<AddressSearchResult>();

  const handleAddressSearchResult = async () => {
    const newAddress: AddressSearchResult = await openModal({
      width: 'sm',
      content: <AddressSearchModal />,
    });
    setAddress(newAddress);
    const { zipNo, roadAddr } = newAddress;
    onAddressSearchResult({ postalCode: zipNo, roadAddress: roadAddr });
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
                value={recipientName}
                onChange={onChangeRecipientName}
                placeholder="이름을 입력해주세요"
                inputSize={'lg'}
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
                      value={address?.roadAddr}
                      readOnly
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
                    value={addressDetail}
                    onChange={onChangeAddressDetail}
                  />
                </BrowserView>
                {/* mo */}
                <MobileView>
                  <Input
                    id="addr4"
                    type="text"
                    placeholder="주소를 입력해주세요"
                    inputSize={'lg'}
                    value={addressDetail}
                    onChange={onChangeAddressDetail}
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
