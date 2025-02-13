import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { Input } from './input';
import { Button } from '../button/button';
import styles from './input.module.css';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClick?: () => void; // onClick을 선택적으로 받는다.
  button?: {
    type?: 'submit' | 'button';
    variant?:
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
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // xs(28) , sm(32) , md(36), lg(40), xl(48)
    label?: string;
  };
}

const InputButtonComponent = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ onClick, button = {}, ...props }, ref) => {
    const { type = 'button', variant = 'primary', size = 'sm', label = '선택' } = button;
    const handleButtonOnClick = (e: any) => {
      e.preventDefault();
      onClick && onClick();
    };
    return (
      <div className={styles.input_box}>
        <Input ref={ref} {...props} />
        <Button type={type} variant={variant} size={size} onClick={handleButtonOnClick}>
          {label}
        </Button>
      </div>
    );
  },
);

export const InputButton = InputButtonComponent;
