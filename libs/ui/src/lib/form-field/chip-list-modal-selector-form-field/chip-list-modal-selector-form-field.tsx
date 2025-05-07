import React, { forwardRef, ReactNode, useEffect, useState } from 'react';

import { Button, ButtonComponentProps } from '../../button/button';
import { useModal } from '../../modal/modal.hook';
import { ChipList, ChipListComponentProps } from '../../chips/chip-list';
import { ModalConfig } from '../../modal/type';
import { cn } from '@learnway/shared';
import { IcoSearch } from '@learnway/icons';
import styles from './chip-list-modal-selector-form-field.module.css';
import { BaseFormFieldProps } from '@learnway/hooks';

export interface ChipListModalSelectorFormFieldProps extends BaseFormFieldProps<any> {
  modalConfig: ModalConfig;
  button?: ButtonComponentProps;
  chipList?: Partial<ChipListComponentProps>;
  /** action node */
  actionNode?: ReactNode;
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ChipListModalSelectorFormFieldComponent = forwardRef<
  HTMLDivElement,
  ChipListModalSelectorFormFieldProps
>(
  (
    {
      modalConfig,
      value = [],
      onChange: ownerOnChange,
      chipList: chipListProps = {
        labelField: 'label',
        valueField: 'value',
        visibleCount: 2,
      },
      actionNode,
      control,
    },
    ref,
  ) => {
    const { open: openModal } = useModal();
    const [selectedChipOptions, setSelectedChipOptions] = useState<any[]>(value);

    useEffect(() => {
      ownerOnChange?.(selectedChipOptions);
    }, [selectedChipOptions]);

    const appendSelectedChipOptions = (newOption: any) => {
      const key = chipListProps?.valueField || 'value';
      const isDuplicated = !!selectedChipOptions?.find((d) => d[key] === newOption[key]); // 새로 등록하는 chip 중복 여부
      !isDuplicated && setSelectedChipOptions([...selectedChipOptions, newOption]);
    };

    // Modal Data - Array
    const appendSelectedChipOptionsByArray = (newOption: any) => {
      const key = chipListProps?.valueField || 'value';
      const current = selectedChipOptions.map((d) => d[key]);
      const newOptionList = newOption.filter((n: any) => !current.includes(n[key]));
      setSelectedChipOptions([...selectedChipOptions, ...newOptionList]);
    };

    const handleSearchClick = async () => {
      const data = await openModal(modalConfig);
      console.log('modal data', data);
      if (Array.isArray(data)) {
        appendSelectedChipOptionsByArray(data);
      } else {
        data && appendSelectedChipOptions(data);
      }
      modalConfig?.onClose?.(data); // form config 에서 onClose 설정한 경우 callback 실행
    };

    const handlerChipDelete = (option: any) => {
      const key = chipListProps?.valueField || 'value';
      const newOptions = selectedChipOptions?.filter((d) => d[key] !== option[key]);
      setSelectedChipOptions(newOptions);
      console.log('handlerChipDelete', newOptions);
    };

    return (
      <div
        ref={ref}
        className={cn(
          styles.start,
          styles.chips_modal_wrap,
          'nlp--chip-list-modal-selector-form-field',
        )}
      >
        <ChipList
          {...chipListProps}
          size={'xs'}
          hideBorder
          options={selectedChipOptions}
          onChipDeleteClick={handlerChipDelete}
        />
        <Button
          type="button"
          className={cn(styles.btn_search)}
          onlyIcon
          onClick={handleSearchClick}
        >
          <IcoSearch width={20} height={20} stroke={'#131C30'} />
        </Button>
      </div>
    );
  },
);
export const ChipListModalSelectorFormField = ChipListModalSelectorFormFieldComponent;
