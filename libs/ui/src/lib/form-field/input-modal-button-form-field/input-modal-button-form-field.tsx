import { forwardRef, InputHTMLAttributes } from 'react';
import { t } from 'i18next';
import { Input, InputProps } from '../../input/input';
import { Button, ButtonComponentProps } from '../../button/button';
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
  button?: ButtonComponentProps;
}

const InputModalButtonFormFieldComponent = forwardRef<
  HTMLInputElement,
  InputModalButtonFormFieldComponentProps
>(
  (
    {
      onClick,
      input: inputProps = {},
      button: buttonProps = {},
      modalConfig,
      valueField = 'name',
      value,
      onChange: ownerOnChange,
      ...props
    },
    ref,
  ) => {
    const { open: openModal } = useModal();

    const handleButtonOnClick = (e: any) => {
      openModal({
        ...modalConfig,
        onClose: (data: any) => {
          console.log('component onClose', data);
          ownerOnChange?.(data); // set form value
          modalConfig?.onClose?.(data); // optional
        },
      });
    };

    return (
      <div className={cn(styles.start, 'nlp--input-button-form-field')}>
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

export const InputModalButtonFormField = InputModalButtonFormFieldComponent;
