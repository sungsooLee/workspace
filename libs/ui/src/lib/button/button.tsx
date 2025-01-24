import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@learnway/shared';

import styles from './button.module.scss';

export interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'line'
    | 'gray'
    | 'gray2'
    | 'secondary'
    | 'danger'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'gray-outline'
    | 'ghost'
    | 'link'; // override from shadcn.button
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  icon?: React.ReactNode;
  iconAlign?: 'left' | 'right';
  onlyIcon?: boolean;
  isLoading?: boolean;
  dummy?: boolean;
  className?: string;
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
    ...props
  }) => {
    return (
      <button
        {...props}
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
        {children}

        {/* right icon */}
        {iconAlign === 'right' && icon}
      </button>
    );
  },
);

export const Button = ButtonComponent;
