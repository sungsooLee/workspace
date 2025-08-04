import { Address, BookDeliveryInfo, LangLevelTest } from '@types';
import { useState } from 'react';
import { useInput } from './input-hook';

const useFormSection = () => {
  const { value: familyName, onChange: onChangeFamilyName } = useInput();
  const { value: firstName, onChange: onChangeFirstName } = useInput();
  const { value: recipientName, onChange: onChangeRecipientName } = useInput();
  const { value: telNo, onChange: onChangeTelNo } = useInput('01011111111');
  const { value: addressDetail, onChange: onChangeAddressDetail } = useInput();

  const [addressResult, setAddressResult] = useState<Address>();

  const onAddressSearchResult = (value: Address) => {
    setAddressResult(value);
  };

  const langLevelTest: LangLevelTest = {
    familyName,
    firstName,
    countryCode: '+82',
    telNo,
    preferGender: 'FEMALE',
    availableTestDate1: '2025-07-21T07:51:26.236Z',
    availableTestDate2: '2025-07-21T07:51:26.236Z',
    preferLearnDate1: '2025-07-21T07:51:26.236Z',
    preferLearnDate2: '2025-07-21T07:51:26.236Z',
  };
  const bookDeliveryInfo: BookDeliveryInfo = {
    recipientName,
    countryCode: '+82',
    telNo,
    postalCode: addressResult?.postalCode ?? '',
    address: addressResult?.roadAddress ?? '',
    addressDetail,
  };

  return {
    familyName,
    onChangeFamilyName,
    firstName,
    onChangeFirstName,
    recipientName,
    onChangeRecipientName,
    telNo,
    onChangeTelNo,
    addressDetail,
    onChangeAddressDetail,
    addressResult,
    onAddressSearchResult,
    langLevelTest,
    bookDeliveryInfo,
  };
};

export { useFormSection };
