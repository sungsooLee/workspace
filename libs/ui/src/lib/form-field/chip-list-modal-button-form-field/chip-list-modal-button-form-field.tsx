import { forwardRef, useEffect, useState } from 'react';
import { t } from 'i18next';

import { Button, ButtonComponentProps } from '../../button/button';
import { useModal } from '../../modal/modal.hook';
import { ChipList, ChipListComponentProps } from '../../chips/chip-list';
import { ModalConfig } from '../../modal/type';

export interface ChipListModalButtonFormFieldProps {
  modalConfig: ModalConfig;
  value?: any;
  onChange?: (value: any) => void;
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
const ChipListModalButtonFormFieldComponent = forwardRef<
  HTMLDivElement,
  ChipListModalButtonFormFieldProps
>(
  (
    {
      modalConfig,
      value = [],
      onChange: ownerOnChange,
      button: buttonProps = {
        variant: 'point',
        size: 'sm',
        label: t('선택'),
      },
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
      const isDuplicated = !!selectedChipOptions?.find((d) => d[key] === newOption[key]); // 새로 등록하는 chips 중복 여부
      !isDuplicated && setSelectedChipOptions([...selectedChipOptions, newOption]);
    };

    const handleButtonOnClick = (e: any) => {
      openModal({
        ...modalConfig,
        onClose: (data: any) => {
          console.log('component onClose', data);
          appendSelectedChipOptions(data);
          modalConfig?.onClose?.(data); // optional
        },
      });
    };

    const handleChipListChange = (newOptions: any[]) => {
      setSelectedChipOptions(newOptions);
    };

    return (
      <div ref={ref} className={'flex flex-row items-center gap-3'}>
        <Button {...buttonProps} onClick={handleButtonOnClick} />
        <ChipList
          {...chipListProps}
          options={selectedChipOptions}
          onChange={handleChipListChange}
        />
      </div>
    );
  },
);
export const ChipListModalButtonFormField = ChipListModalButtonFormFieldComponent;
