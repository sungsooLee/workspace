import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@learnway/shared';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-secondary text-secondary-foreground shadow hover:bg-secondary/80 disabled:bg-gray-3 disabled:text-gray-6',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-secondary text-secondary bg-background shadow-sm hover:bg-accent hover:text-accent-foreground disabled:border-gray-4 disabled:text-gray-5',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        'gray-outline':
          'border border-gray-6 text-gray-8 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground disabled:border-gray-4 disabled:text-gray-5 disabled:bg-gray-1',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-secondary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-7 rounded px-1.5 py-1.8 text-sm',
        sm: 'h-8 rounded px-2 py-1.5 text-base font-bold tracking-[-.019em]',
        md: 'h-10 rounded px-3 py-2.5 text-base font-bold tracking-[-.019em]',
        'md-1': 'h-10 rounded px-3 py-2.5 text-[0.813rem] font-bold tracking-[-.019em]',
        lg: 'h-14 rounded-lg p-5 text-lg font-semibold tracking-[-.019em]',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
