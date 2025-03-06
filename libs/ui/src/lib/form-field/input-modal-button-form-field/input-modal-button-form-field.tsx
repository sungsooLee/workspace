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
  valueField?: string; // input value 설정시 사용할 key ex) value={value[valueField]}
  input?: InputProps;
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
      valueField = 'name',
      value,
      onChange: ownerOnChange,
      ...props
    },
    ref,
  ) => {
    const { open: openModal } = useModal();

    const handleClick = () => {
      console.log('xxx');
      openModal({
        ...modalConfig,
        onClose: (data: any) => {
          ownerOnChange?.(data); // set form value
          modalConfig?.onClose?.(data); // optional
        },
      });
    };

    return (
      <div className={cn(styles.start, 'nlp--input-button-form-field')} onClick={handleClick}>
        <Input
          {...inputProps}
          ref={ref}
          value={value?.[valueField]}
          disabled={inputProps?.disabled ?? true}
          showSearchIcon
        />
        {/*<Button*/}
        {/*  {...buttonProps}*/}
        {/*  label={buttonProps?.label || t('선택')}*/}
        {/*  variant={buttonProps?.variant || 'point'}*/}
        {/*  size={buttonProps?.size || 'sm'}*/}
        {/*  onClick={handleButtonOnClick}*/}
        {/*/>*/}
      </div>
    );
  },
);

export const InputModalButtonFormField = InputModalButtonFormFieldComponent;
