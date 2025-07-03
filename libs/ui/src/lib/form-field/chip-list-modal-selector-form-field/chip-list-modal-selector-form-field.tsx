import React, { forwardRef, ReactNode } from 'react';

import { Button, ButtonComponentProps } from '../../button/button';
import { useModal } from '../../modal/modal.hook';
import { ChipList, ChipListComponentProps } from '../../chips/chip-list';
import { ModalConfig } from '../../modal/type';
import { cn } from '@learnway/shared';
import { IcoPlus, IcoSearch } from '@learnway/icons';
import styles from './chip-list-modal-selector-form-field.module.css';
import { BaseFormFieldProps } from '@learnway/hooks';

export interface ChipListModalSelectorFormFieldProps extends BaseFormFieldProps<any[]> {
  modalConfig: ModalConfig;
  button?: ButtonComponentProps;
  chipList?: Partial<ChipListComponentProps>;
  /** action node */
  actionNode?: ReactNode;
  /** 추가 버튼 */
  showAddButton?: boolean;
  /** 1개만 선택 가능 */
  selectOnlyOne?: boolean;
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
const ChipListModalSelectorFormFieldComponent = forwardRef<
  HTMLDivElement,
  ChipListModalSelectorFormFieldProps
>(
  (
    {
      modalConfig,
      value = [],
      showAddButton,
      selectOnlyOne,
      transformModalData,
      chipList: chipListProps = {
        labelField: 'label',
        valueField: 'value',
        visibleCount: 2,
      },
      actionNode,
      control,
      disabled,
      onChange: ownerOnChange,
    },
    ref,
  ) => {
    const { open: openModal } = useModal();

    const mergeValue = (modalData: any) => {
      if (!modalData) {
        return value;
      }
      if (selectOnlyOne) {
        return Array.isArray(modalData) ? modalData[0] : [modalData];
      }
      const key = chipListProps?.valueField || 'value';
      const list = Array.isArray(modalData) ? modalData : [modalData];
      const filters = list.filter((d: any) => !value.find((n: any) => n[key] === d[key]));
      return [...value, ...filters];
    };

    const handleSearchClick = async () => {
      const modalData = await openModal(modalConfig);
      const newValue = mergeValue(modalData);
      const transformData = transformModalData ? transformModalData(newValue) : newValue;
      // form onChange
      ownerOnChange?.(transformData);
      // form config 에서 onClose 설정한 경우 callback 실행
      modalConfig?.onClose?.(transformData);
    };

    const handlerChipDelete = (option: any) => {
      const key = chipListProps?.valueField || 'value';
      const newValue = value?.filter((d: any) => d[key] !== option[key]);
      ownerOnChange?.(newValue);
    };

    return (
      <div
        className={cn(
          styles.start,
          chipListProps?.wordwrap && styles.type_wordwrap,
          'nlp--chip-list-modal-selector-form-field',
        )}
      >
        {/* actionNode or 추가버튼 둘중 하나라도 설정 되어있을때 노출*/}
        {(actionNode || showAddButton) && (
          <div className={styles.custom_btn_wrap}>
            {/* action node*/}
            {actionNode ?? actionNode}
            {/*추가버튼*/}
            {showAddButton && (
              <Button
                icon={<IcoPlus width={16} height={16} stroke="#4C515E" />}
                variant={'text'}
                size={'sm'}
                label={'추가'}
                disabled={disabled}
                onClick={handleSearchClick}
              />
            )}
          </div>
        )}
        <div ref={ref} className={cn(styles.chips_modal_wrap)}>
          <ChipList
            {...chipListProps}
            size={'xs'}
            hideBorder
            options={value}
            onChipDeleteClick={handlerChipDelete}
            disabled={disabled}
            className={cn(styles.chip_list, disabled && styles.disabled)}
          />
          {!showAddButton && !disabled && (
            <Button
              type={'button'}
              className={cn(styles.btn_search, 'btn_search')}
              disabled={disabled}
              onlyIcon
              onClick={handleSearchClick}
            >
              <IcoSearch width={20} height={20} stroke={'#131C30'} />
            </Button>
          )}
        </div>
      </div>
    );
  },
);
export const ChipListModalSelectorFormField = ChipListModalSelectorFormFieldComponent;
