import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@learnway/shared';

import styles from './button.module.css';

export type ButtonVariantType =
  | 'primary'
  | 'line'
  | 'gray'
  | 'gray2'
  | 'secondary'
  | 'search'
  | 'save'
  | 'point'
  | 'text'
  | 'chips'
  | 'expand'
  | 'expand2'
  | 'danger'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'gray-outline'
  | 'ghost'
  | 'link';
export type ButtonSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType; // xs(28) , sm(32) , md(36), lg(40), xl(48)
  icon?: React.ReactNode;
  iconAlign?: 'left' | 'right';
  onlyIcon?: boolean;
  isLoading?: boolean;
  dummy?: boolean;
  className?: string;
  label?: string;
  actionKey?: 'confirm' | 'cancel' | 'reset'; // modal footer 버튼에서 사용
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>(
  ({
    icon,
    iconAlign = 'left',
    onlyIcon = false,
    isLoading,
    disabled,
    children,
    className,
    variant,
    size,
    label,
    type = 'button',
    ...props
  }) => {
    return (
      <button
        {...props}
        type={type}
        className={cn(
          styles.start,
          styles.btn,
          className,
          'nlp--button',
          variant && styles[variant],
          size && styles[size],
        )}
        disabled={disabled || isLoading}>
        {/* loading icon */}
        {isLoading && <Loader2 className="animate-spin" />}

        {/* left icon */}
        {iconAlign === 'left' && icon}

        {/* children */}
        {children || label}

        {/* right icon */}
        {iconAlign === 'right' && icon}
      </button>
    );
  },
);

export const Button = ButtonComponent;
