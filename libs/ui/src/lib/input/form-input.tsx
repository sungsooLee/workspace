import { InputHTMLAttributes, FC } from 'react';
import styles from './form.module.css';
import { Controller } from 'react-hook-form';
import { cn } from '@learnway/shared';
import { clsx } from 'clsx';
import { Input } from './input';
import { FormDialogProps } from '../type';
import { IcoFormRequired } from '@learnway/icons';

type ExtendedInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & FormDialogProps;

const FormInputComponent: FC<ExtendedInputProps> = ({
  control,
  placeholder,
  label,
  type,
  name,
  description,
  disabled,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref }, formState: { errors } }) => {
        const isRequired = control.isFieldRequired(name);
        const errorClass = clsx({
          error: errors && errors[name],
        });
        return (
          <div className={styles.form_item}>
            {label && (
              <label htmlFor={name} className={styles.form_label}>
                {label}
                {isRequired && (
                  <span
                    className={cn(styles.status, {
                      [styles.error]: errorClass === 'error', // 에러가 있는 경우 styles.error 추가
                      [styles.required]: errorClass !== 'error', // 에러가 없는 경우 styles.required 추가
                    })}>
                    <IcoFormRequired width={8} height={8} />
                  </span>
                )}
              </label>
            )}
            <div className={styles.input_box}>
              <Input
                ref={ref}
                type={type}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                className={errorClass}
              />
            </div>
            {errorClass !== 'error' && description && (
              <p className={cn(styles.guide_text)}>{description}</p>
            )}
            {errorClass === 'error' && (
              <p className={cn(styles.guide_text, styles.error)}>
                {String(errors[name]?.message || '')}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export const FormInput = FormInputComponent;
