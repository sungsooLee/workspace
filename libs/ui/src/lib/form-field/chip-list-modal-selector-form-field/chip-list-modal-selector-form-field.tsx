import React, { forwardRef, useEffect, useState } from 'react';

import { Button, ButtonComponentProps } from '../../button/button';
import { useModal } from '../../modal/modal.hook';
import { ChipList, ChipListComponentProps } from '../../chips/chip-list';
import { ModalConfig } from '../../modal/type';
import { cn } from '@learnway/shared';
import { IcoSearch } from '@learnway/icons';
import styles from './chip-list-modal-selector-form-field.module.css';
import { UseFormReturn } from 'react-hook-form';

export interface ChipListModalSelectorFormFieldProps {
  modalConfig: ModalConfig;
  value?: any;
  onChange?: (value: any) => void;
  button?: ButtonComponentProps;
  chipList?: Partial<ChipListComponentProps>;
  control?: UseFormReturn['control'];
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

    const handleChipListClick = async () => {
      console.log(control);
      const data = await openModal(modalConfig);
      data && appendSelectedChipOptions(data);
      modalConfig?.onClose?.(data); // form config 에서 onClose 설정한 경우 callback 실행
    };

    const handleChipListChange = (newOptions: any[]) => {
      setSelectedChipOptions(newOptions);
    };

    return (
      <div
        ref={ref}
        className={cn('nlp--chip-list-modal-selector-form-field', 'border-1 w-full border-solid')}>
        <div className={'flex flex-row'}>
          <ChipList
            visibleCount={2}
            {...chipListProps}
            size={'sm'}
            options={selectedChipOptions}
            onChange={handleChipListChange}
            // onChipListClick={handleChipListClick}
          />
          <Button type="button" className={cn(styles.clear)} onlyIcon onClick={handleChipListClick}>
            <IcoSearch width={20} height={20} stroke={'#131C30'} />
          </Button>
        </div>
      </div>
    );
  },
);
export const ChipListModalSelectorFormField = ChipListModalSelectorFormFieldComponent;
