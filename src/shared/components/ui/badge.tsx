import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-ellipsis whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // 2024-07-09 피그마 참조해서 커스터마이징 추가
        info: 'rounded-0 h-20pxr bg-point-light_blue text-white dark:bg-info-darkBg dark:text-info-darkText',
      },
      size: {
        lg: 'text-[12px] md:(text-[14px] h-28pxr) py-4pxr px-10pxr',
        sm: 'text-[12px] md:h-28pxr px-6pxr',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
