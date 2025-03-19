import { forwardRef } from 'react';
import { Input, InputProps } from '../../input/input';
import styles from './input-modal-selector-form-field.module.css';
import { useModal } from '../../modal/modal.hook';
import { ModalConfig } from '../../modal/type';
import { cn } from '@learnway/shared';
import { BaseFormFieldProps } from '@learnway/hooks';

interface InputModalSelectorFormFieldComponentProps extends BaseFormFieldProps<string> {
  modalConfig: ModalConfig;
  input?: InputProps;
  onClick?: (value?: any) => void;
  /** modalData 에서 받은 내용의 조작을 위한 함수 - onFormChange(modalData) 시 사용 */
  transformModalData?: (modalData?: any) => void;
}

const InputModalSelectorFormFieldComponent = forwardRef<
  HTMLInputElement,
  InputModalSelectorFormFieldComponentProps
>(
  (
    {
      onClick,
      input: inputProps = {},
      modalConfig,
      value,
      disabled = true,
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
        onClick={() => handleClick()}>
        <Input {...inputProps} ref={ref} value={value} readOnly={true} showSearchIcon />
      </div>
    );
  },
);

export const InputModalSelectorFormField = InputModalSelectorFormFieldComponent;

const convertF = (data: any) => {};
