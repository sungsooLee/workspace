import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-checkbox';
import { IcoCheckboxChecked } from '@learnway/icons';
import { useTranslation } from 'react-i18next';

import { cn, getRandomId } from '@learnway/shared';

import styles from './checkbox.module.css';

export interface CheckboxComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  /**
   * 체크박스의 표시될 레이블
   */
  label?: string;
  /**
   * 레이블 숨김 여부 처리
   */
  hideLabel?: boolean;
  /**
   * 체크 박스 사이즈
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'; // 12, 16, 18, 24(basic)
  /**
   * 체크박스 스타일
   */
  variant?: 'round' | 'default'; // round style
}

const CheckboxComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  CheckboxComponentProps
>(({ value, onChange, disabled, className, label, hideLabel, size, variant, ...props }, ref) => {
  const { t } = useTranslation();
  const uuid = getRandomId();
  return (
    <div className={cn(styles.start, 'nlp--checkbox', className)}>
      <Primitive.Root
        {...props}
        id={uuid}
        ref={ref}
        className={cn(styles.checkbox_root, size && styles[size], variant && styles[variant])}
        disabled={disabled}
        type={'button'}
      >
        <Primitive.Indicator className={styles.checkbox_indicator}>
          <IcoCheckboxChecked width={12} height={13} fill="none" stroke="#ffffff" />
        </Primitive.Indicator>
      </Primitive.Root>
      {!hideLabel && (
        <label className={styles.label} htmlFor={uuid}>
          {t(label ?? '')}
        </label>
      )}
    </div>
  );
});

export const Checkbox = CheckboxComponent;
