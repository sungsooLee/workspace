import { forwardRef, InputHTMLAttributes } from 'react';
import { Input, InputProps } from '../../input/input';
import styles from './input-modal-button-form-field.module.css';
import { useModal } from '../../modal/modal.hook';
import { ModalConfig } from '../../modal/type';
import { cn } from '@learnway/shared';

interface InputModalButtonFormFieldComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  modalConfig: ModalConfig;
  value?: any;
  onChange?: (value: any) => void;
  input?: InputProps;
  onFormChange?: (value?: any) => void;
}

const InputModalButtonFormFieldComponent = forwardRef<
  HTMLInputElement,
  InputModalButtonFormFieldComponentProps
>(
  (
    {
      onClick,
      input: inputProps = {},
      modalConfig,
      value,
      disabled = true,
      onChange: ownerOnChange,
      onFormChange,
      ...props
    },
    ref,
  ) => {
    const { open: openModal } = useModal();

    const handleClick = async () => {
      const data = await openModal(modalConfig);
      onFormChange?.(data);
    };

    return (
      <div
        className={cn(styles.start, 'nlp--input-button-form-field')}
        onClick={() => handleClick()}>
        <Input {...inputProps} ref={ref} value={value} readOnly={true} showSearchIcon />
      </div>
    );
  },
);

export const InputModalButtonFormField = InputModalButtonFormFieldComponent;
