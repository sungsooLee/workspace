import { forwardRef } from 'react';
import { Input, InputProps } from '../../input/input';
import styles from './input-modal-selector-form-field.module.css';
import { useModal } from '../../modal/modal.hook';
import { ModalConfig } from '../../modal/type';
import { cn } from '@learnway/shared';
import { BaseFormFieldProps } from '@learnway/hooks';

interface InputModalSelectorFormFieldComponentProps extends BaseFormFieldProps<string> {
  /** 모달 설정 */
  modalConfig: ModalConfig;
  /** 입력 필드 Props */
  inputProps?: InputProps;
  /** 모달 데이터 변환 함수 (onFormChange 시 사용) */
  transformModalData?: (modalData?: any) => void;
}

const InputModalSelectorFormFieldComponent = forwardRef<
  HTMLInputElement,
  InputModalSelectorFormFieldComponentProps
>(
  (
    {
      inputProps = {},
      modalConfig,
      value,
      readOnly = true,
      disabled = true,
      placeholder,
      onChange,
      onFormChange,
      transformModalData,
      ...props
    },
    ref,
  ) => {
    const { open: openModal } = useModal();

    const handleClick = async () => {
      const data = await openModal(modalConfig);
      const transformData = transformModalData ? transformModalData(data) : data;
      console.log('modal data', data, transformData);
      onFormChange?.(transformData);
    };

    return (
      <div
        className={cn(styles.start, styles.search_wrap, 'nlp--input-modal-selector-form-field')}
        role="button"
        onClick={() => handleClick()}
      >
        <Input
          {...inputProps}
          ref={ref}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          showSearchIcon
        />
      </div>
    );
  },
);

export const InputModalSelectorFormField = InputModalSelectorFormFieldComponent;
