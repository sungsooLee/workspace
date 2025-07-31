import { BaseFormFieldProps } from '@learnway/hooks';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { Button } from '@learnway/ui/button';
import { Input, InputProps } from '@learnway/ui/input';
import { useModal } from '@learnway/ui/modal';
import { AddressSearchModal } from '@shared/ui';
import { isEqual } from 'lodash';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface AddressFormFieldProps extends BaseFormFieldProps<string> {
  fields?: {
    postalCode: string;
    address: string;
  };
}

interface AddressValue {
  postalCode: string;
  address: string;
}

const AddressSearchFormFieldComponent = forwardRef<HTMLDivElement, AddressFormFieldProps>(
  (
    {
      value,
      control,
      onFormChange,
      fields = { postalCode: 'postalCode', address: 'address' },
      disabled,
    },
    _,
  ) => {
    console.log('### AddressSearchFormField value', value);
    const postalCode = useWatch({ control, name: fields.postalCode });

    // value 객체를 메모이제이션하여 불필요한 재생성 방지
    const addressValue = useMemo(
      () => ({
        postalCode: postalCode || '',
        address: value || '',
      }),
      [postalCode, value],
    );

    const handleOnChange = (changeValue: AddressValue) => {
      console.log('### AddressSearchFormField handleOnChange', changeValue);
      onFormChange({
        [fields.postalCode]: changeValue.postalCode,
        [fields.address]: changeValue.address,
      });
    };

    return <AddressSearch value={addressValue} onChange={handleOnChange} disabled={disabled} />;
  },
);

export const AddressSearchFormField = AddressSearchFormFieldComponent;

interface AddressSearchComponentProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: AddressValue;
  onChange?: (value: AddressValue) => void;
}

const AddressSearchComponent = function ({
  value,
  disabled,
  onChange,
  ...props
}: AddressSearchComponentProps) {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const [editionValue, setEditionValue] = useState<AddressValue>({
    postalCode: value?.postalCode,
    address: value?.address,
  } as AddressValue);

  useEffect(() => {
    if (isEqual(value, editionValue)) {
      return;
    }
    onChange?.(editionValue);
  }, [editionValue]);

  useEffect(() => {
    if (!value || isEqual(value, editionValue)) {
      return;
    }
    setEditionValue(value);
  }, [value]);

  const handleAddressSearchButtonClick = async () => {
    console.log('#### handleAddressSearchButtonClick');
    const address = await openModal({
      width: 'sm',
      content: <AddressSearchModal />,
    });
    setEditionValue({ postalCode: address.zipNo, address: address.roadAddr });
  };

  return (
    <div className={dynamicFormStyles.address_wrap}>
      <div className={dynamicFormStyles.info_address}>
        <Input
          type="text"
          placeholder={t('우편번호')}
          readOnly
          className={dynamicFormStyles.post_input}
          value={editionValue?.postalCode}
          disabled={disabled}
        />
        <Input
          type="text"
          placeholder={t('기본주소')}
          readOnly
          className={dynamicFormStyles.address_input}
          value={editionValue?.address}
          disabled={disabled}
        />
        <Button
          className={dynamicFormStyles.btn_find}
          size={'sm'}
          variant={'gray'}
          stopPropagation
          onClick={handleAddressSearchButtonClick}
          disabled={disabled}
        >
          {t('우편번호찾기')}
        </Button>
      </div>
    </div>
  );
};

export const AddressSearch = AddressSearchComponent;
