import React, { forwardRef } from 'react';

import { Button, ButtonComponentProps } from '../../button/button';
import { useModal } from '../../modal/modal.hook';
import { List, ListComponentProps } from '../../list/list';
import { ModalConfig } from '../../modal/type';
import { addOrRemoveItemByKey, cn } from '@learnway/shared';
import styles from './list-modal-selector-form-field.module.css';
import { BaseFormFieldProps } from '@learnway/hooks';
import { useTranslation } from 'react-i18next';

export interface ListModalSelectorFormFieldProps extends BaseFormFieldProps<any[]> {
  /** Modal component props */
  modalConfig: ModalConfig;
  /** Button component props */
  button?: ButtonComponentProps;
  /** List component props */
  list?: Partial<ListComponentProps>;
  /** modalData 에서 받은 내용의 조작을 위한 함수 - onFormChange(modalData) 시 사용 */
  transformModalData?: (modalData?: any) => void;
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ListModalSelectorFormFieldComponent = forwardRef<
  HTMLDivElement,
  ListModalSelectorFormFieldProps
>(
  (
    {
      modalConfig,
      value = [],
      onChange: ownerOnChange,
      button: buttonProps,
      transformModalData,
      list: listProps = {
        labelField: 'label',
        valueField: 'value',
      },
      control,
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { open: openModal } = useModal();

    const appendSelectedChipOptions = (newOption: any) => {
      const key = listProps?.valueField || 'value';
      const isDuplicated = !!value?.find((d) => d[key] === newOption[key]); // 새로 등록하는 chip 중복 여부
      !isDuplicated && ownerOnChange([...value, newOption]);
    };

    const handleButtonClick = async () => {
      const data = await openModal(modalConfig);
      const transformData = transformModalData ? transformModalData(data) : data;
      console.log(transformData);
      transformData && appendSelectedChipOptions(transformData);
    };

    const handleOptionDeleteClick = (option: any) => {
      const newValue = addOrRemoveItemByKey(value, option, listProps?.valueField);
      ownerOnChange(newValue);
    };

    return (
      <div
        ref={ref}
        className={cn(
          styles.start,
          styles.modal_select_wrap,
          'nlp--list-modal-selector-form-field',
        )}>
        <Button
          className={styles.btn}
          {...buttonProps}
          variant={'gray'}
          size={'md'}
          onClick={handleButtonClick}
        />
        <List
          className={styles.list}
          {...listProps}
          options={value}
          onOptionDeleteClick={handleOptionDeleteClick}
        />
      </div>
    );
  },
);
export const ListModalSelectorFormField = ListModalSelectorFormFieldComponent;
