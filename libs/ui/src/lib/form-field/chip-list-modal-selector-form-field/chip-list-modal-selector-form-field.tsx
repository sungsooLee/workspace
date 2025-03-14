import React, { forwardRef, useEffect, useState } from 'react';

import { ButtonComponentProps } from '../../button/button';
import { useModal } from '../../modal/modal.hook';
import { ChipList, ChipListComponentProps } from '../../chips/chip-list';
import { ModalConfig } from '../../modal/type';
import { BaseFormFieldProps, FormFieldProps } from '@learnway/hooks';

export interface ChipListModalSelectorFormFieldProps {
  modalConfig: ModalConfig;
  // value?: any;
  // onChange?: (value: any) => void;
  button?: ButtonComponentProps;
  chipList?: Partial<ChipListComponentProps>;
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const ChipListModalSelectorFormFieldComponent: FormFieldProps<
  ChipListModalSelectorFormFieldProps,
  HTMLDivElement,
  any[]
> = forwardRef<HTMLDivElement, BaseFormFieldProps<any[]> & ChipListModalSelectorFormFieldProps>(
  (
    {
      modalConfig,
      value = [],
      onChange: ownerOnChange,
      chipList: chipListProps = {
        labelField: 'label',
        valueField: 'value',
      },
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
      const data = await openModal(modalConfig);
      appendSelectedChipOptions(data);
      modalConfig?.onClose?.(data); // form config 에서 onClose 설정한 경우 callback 실행
    };

    const handleChipListChange = (newOptions: any[]) => {
      setSelectedChipOptions(newOptions);
    };

    return (
      <ChipList
        {...chipListProps}
        // value={value}
        options={selectedChipOptions}
        onChange={handleChipListChange}
        onChipListClick={handleChipListClick}
      />
      // <div ref={ref} className={'border-1 h-[50px] w-full bg-amber-500'}>
      //   {/*<Button {...buttonProps} onClick={handleButtonOnClick} />*/}
      //   <ChipList
      //     {...chipListProps}
      //     onChipListClick={handleChipListClick}
      //     options={selectedChipOptions}
      //     onChange={handleChipListChange}
      //   />
      // </div>
    );
  },
);
export const ChipListModalSelectorFormField = ChipListModalSelectorFormFieldComponent;
