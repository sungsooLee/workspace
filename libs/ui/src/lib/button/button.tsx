import React, { forwardRef } from 'react';
import * as Primitive from '../shadcn/button';
import { Loader2 } from 'lucide-react';

export interface ButtonComponentProps extends React.ComponentProps<typeof Primitive.Button> {
  className?: string;
  isLoading?: boolean;
  label?: string;
  icon?: React.ReactNode;
  iconAlign?: 'left' | 'right';
}

const ButtonComponent = forwardRef<React.ElementRef<typeof Primitive.Button>, ButtonComponentProps>(
  ({ label, icon, iconAlign = 'left', isLoading, disabled, ...props }) => {
    return (
      <Primitive.Button {...props} disabled={disabled || isLoading}>
        {isLoading && <Loader2 className="animate-spin" />}
        {icon && iconAlign === 'left' && icon}
        {label}
        {icon && iconAlign === 'right' && icon}
      </Primitive.Button>
    );
  },
);

export const Button = ButtonComponent;
