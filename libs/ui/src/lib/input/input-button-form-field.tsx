import { forwardRef, InputHTMLAttributes } from 'react';
import { t } from 'i18next';
import { Input, InputProps } from './input';
import { Button, ButtonComponentProps } from '../button/button';
import styles from './input.module.css';
import { useModalControl } from '../modal/modal.hook';
import { ModalConfig2 } from '../modal/type';

interface InputButtonFormFieldComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  modalConfig: ModalConfig2;
  onChange?: (value: any) => void;
  value?: any;
  valueField?: string; // input value 설정시 사용할 key ex) value={value[valueField]}
  input?: InputProps;
  button?: ButtonComponentProps;
}

const InputButtonFormFieldComponent = forwardRef<
  HTMLInputElement,
  InputButtonFormFieldComponentProps
>(
  (
    {
      onClick,
      input: inputProps = {},
      button: buttonProps = {},
      modalConfig,
      valueField = 'name',
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const { open2: openModal } = useModalControl();
    const handleButtonOnClick = (e: any) => {
      openModal({
        ...modalConfig,
        onClose: handleOnClose,
      });
    };
    const handleOnClose = (data: any) => {
      console.log('component onClose', data);
      onChange?.(data);
      modalConfig?.onClose?.(data);
    };
    return (
      <div className={styles.input_box}>
        <Input
          {...inputProps}
          ref={ref}
          value={value?.[valueField]}
          disabled={inputProps?.disabled ?? true}
        />
        <Button
          {...buttonProps}
          label={buttonProps?.label || t('선택')}
          variant={buttonProps?.variant || 'point'}
          size={buttonProps?.size || 'sm'}
          onClick={handleButtonOnClick}
        />
      </div>
    );
  },
);

export const InputButtonFormField = InputButtonFormFieldComponent;
