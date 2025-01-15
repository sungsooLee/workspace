import React, { forwardRef } from 'react';
import * as Primitive from '../shadcn/button';
import { Loader2 } from 'lucide-react';

export interface ButtonComponentProps extends React.ComponentProps<typeof Primitive.Button> {
  variant?: 'primary' | 'secondary' | 'danger' | 'default' | 'destructive' | 'outline' | 'gray-outline' | 'ghost' | 'link'; // override from shadcn.button
  size?: 'xs' | 'sm' | 'md' | 'md-1' | 'lg' | 'icon'; // override from shadcn.button
  icon?: React.ReactNode;
  iconAlign?: 'left' | 'right';
  onlyIcon?: boolean;
  isLoading?: boolean;
}

const ButtonComponent = forwardRef<
  React.ElementRef<typeof Primitive.Button>,
  ButtonComponentProps
>(
  ({ icon, iconAlign = 'left', onlyIcon = false, isLoading, disabled, children, ...props }) => {
    return (
      <Primitive.Button
        {...props}
        disabled={disabled || isLoading}
      >

        {/* loading icon */}
        {isLoading && <Loader2 className="animate-spin" />}

        {/* left icon */}
        {iconAlign === 'left' && icon}

        {/* children */}
        {!onlyIcon && children}

        {/* right icon */}
        {iconAlign === 'right' && icon}

      </Primitive.Button>
    );
  },
);

export const Button = ButtonComponent;
