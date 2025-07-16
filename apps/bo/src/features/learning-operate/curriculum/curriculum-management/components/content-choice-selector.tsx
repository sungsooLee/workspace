import { forwardRef } from 'react';
import styles from './content-choice-selector.module.css';
import { cn } from '@learnway/shared';
import { BaseFormFieldProps } from '@learnway/hooks';
import { t } from 'i18next';
import { ModalConfig, Input, InputProps, useModal } from '@learnway/ui';

interface ComplexFieldValue {
  [key: string]: string;
}

interface ContentChoiceModalSelectorComponentProps extends BaseFormFieldProps<string> {
  /** 모달 설정 */
  modalConfig: ModalConfig;
  /** 입력 필드 Props */
  inputProps?: InputProps;
  /** 모달 데이터 변환 함수 (onFormChange 시 사용) */
  transformModalData?: (modalData?: any) => ComplexFieldValue;
}

const ContentChoiceModalSelectorComponent = forwardRef<
  HTMLInputElement,
  ContentChoiceModalSelectorComponentProps
>(
  (
    {
      inputProps = {},
      modalConfig,
      value,
      readOnly = false,
      disabled = false,
      placeholder = t('LABEL.form.input.select'),
      onChange,
      onFormChange,
      transformModalData,
      transformComplexData,
      ...props
    },
    ref,
  ) => {
    const { open: openModal } = useModal();

    const handleModalOpen = async () => {
      const data = await openModal(modalConfig);
      const transformData = transformModalData ? transformModalData(data) : data;
      console.log('modal data', data, transformData);
      onFormChange?.(transformData);
      // 복합 서치일 경우에
      if (transformComplexData) transformComplexData?.(transformData);
    };

    const handleClear = () => {
      console.log('clear ----------------------', value);
      // 값 초기화시 transformModalData 함수 호출 - 모달 선택시 transformModalData 통해 추가 설정한 데이터를 모두 초기화 하기 위해
      const transformData = transformModalData ? transformModalData({}) : { [props.name]: '' };
      onFormChange?.(transformData);

      // const clearEvent = { target: { value: '' } } as any;
      // onChange?.(clearEvent);
    };

    return (
      <div
        className={cn(styles.start, styles.search_wrap, 'nlp--input-modal-selector-form-field')}
        role="button"
      >
        <Input
          {...inputProps}
          ref={ref}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          showSearchIcon
          onEnterKeyDown={handleModalOpen}
          onChange={(event) => {
            if (event.target.value === '') {
              handleClear();
            }
          }}
          disabled={disabled}
        />
      </div>
    );
  },
);

export const ContentChoiceModalSelector = ContentChoiceModalSelectorComponent;
