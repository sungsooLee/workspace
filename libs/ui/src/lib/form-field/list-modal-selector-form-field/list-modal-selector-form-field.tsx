import React, { forwardRef, useState } from 'react';

import { Button, ButtonComponentProps } from '../../button/button';
import { useModal } from '../../modal/modal.hook';
import { List, ListProps } from '../../list/list';
import { ModalConfig } from '../../modal/type';
import { addOrRemoveItemByKey, cn } from '@learnway/shared';
import styles from './list-modal-selector-form-field.module.css';
import { BaseFormFieldProps } from '@learnway/hooks';
import { useTranslation } from 'react-i18next';
import { IcoPlus } from '@learnway/icons';

// ListModalSelectorFormFieldProps: 폼 필드에서 사용할 prop 타입 정의
export interface ListModalSelectorFormFieldProps extends BaseFormFieldProps<any[]> {
  /** 모달 컴포넌트에 전달할 설정값 */
  modalConfig: ModalConfig | (() => ModalConfig);
  /** 버튼 컴포넌트에 전달할 props */
  button?: ButtonComponentProps;
  /** 리스트 컴포넌트에 전달할 props */
  listConfig?: Partial<ListProps>;
  /** 모달에서 받은 데이터를 조작하는 함수 (onFormChange 시 사용) */
  transformModalData?: (modalData?: any) => void;
  /** 선택 option 항목을 표시하기위해 */
  selectedValue: string | number;
  onSelected: (option: any) => void;
}

/**
 * 공통 form select chip list
 * @param value - 현재 선택된 값 배열
 * @param onChange - 값 변경 시 호출되는 콜백
 * @param props - 기타 props
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
      listConfig,
      selectedValue,
      control,
      onSelected,
    },
    ref,
  ) => {
    const { open: openModal } = useModal();

    // const [selectedValue, setSelectedValue] = useState<any>();

    const valueField = listConfig?.valueField || 'value';
    const labelField = listConfig?.labelField || 'label';

    // 새로운 옵션을 기존 value에 중복 없이 추가하는 함수
    const appendSelectedChipOptions = (newOption: any) => {
      const newOptions = Array.isArray(newOption) ? newOption : [newOption];
      const existingKeys = new Set(value.map((item) => item[valueField]));
      const merged = [
        ...value,
        ...newOptions.filter((option) => !existingKeys.has(option[valueField])),
      ];

      ownerOnChange(merged);
    };

    // 추가 버튼 클릭 시 모달을 열고, 선택된 데이터를 value에 추가
    const handleButtonClick = async () => {
      const data = await openModal(modalConfig);
      // transformModalData가 있으면 변환, 없으면 원본 사용
      const transformData = transformModalData && data ? transformModalData(data) : data;
      console.log(transformData);
      transformData && appendSelectedChipOptions(transformData);
    };

    // 리스트 항목 선택시 selectedValue 스테디트 저장
    const handleOptionSelect = (option: any) => {
      // setSelectedValue((state: any) => option[valueField]);
      onSelected?.(option);
    };

    // 리스트의 항목 삭제 버튼 클릭 시 value에서 해당 항목 제거
    const handleOptionDeleteClick = (option: any) => {
      const newValue = addOrRemoveItemByKey(value, option, valueField);
      ownerOnChange(newValue);
    };

    console.log('3333 ', value);
    return (
      <div
        ref={ref}
        className={cn(
          styles.start,
          styles.modal_select_wrap,
          'nlp--list-modal-selector-form-field',
        )}
      >
        {/* 추가 버튼 영역 */}
        <div className={styles.btn_wrap}>
          <Button
            className={styles.btn}
            {...buttonProps}
            variant={'text'}
            size={'sm'}
            label={'추가'}
            icon={<IcoPlus width={16} height={16} stroke={'#4C515E'} />}
            onClick={handleButtonClick}
          />
        </div>

        {/* 선택된 항목 리스트 영역 */}
        <List
          {...listConfig}
          valueField={valueField}
          labelField={labelField}
          className={styles.list}
          options={value}
          value={selectedValue}
          onOptionSelect={handleOptionSelect}
          onOptionDeleteClick={handleOptionDeleteClick}
        />
      </div>
    );
  },
);

// 외부에서 사용할 수 있도록 export
export const ListModalSelectorFormField = ListModalSelectorFormFieldComponent;
