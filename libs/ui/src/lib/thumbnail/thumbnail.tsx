import React, { forwardRef } from 'react';

import { CheckedState } from '@radix-ui/react-checkbox';

import { cn } from '@learnway/shared';
import { Checkbox } from '../checkbox/checkbox';
import styles from './thumbnail.module.css';

export interface ThumbnailComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  className?: string;
  path: string;
  showCheckbox?: boolean;
  onCheckedChange?: (checked: CheckedState) => any;
  // checked?: boolean;
}

const ThumbnailComponent = forwardRef<HTMLElement, ThumbnailComponentProps>(
  ({ className, variant, size, path, showCheckbox, onCheckedChange, ...props }) => {
    return (
      <div {...props} className={cn(styles.start, className, 'nlp--thumbnail', 'border')}>
        {/* checkbox */}
        {showCheckbox && (
          <Checkbox
            className={cn(styles.checkbox, 'm-1')}
            size={'xs'}
            onCheckedChange={onCheckedChange}
          />
        )}
        <img src={path} className={'h-[80px] w-[120px]'} />
      </div>
    );
  },
);

export const Thumbnail = ThumbnailComponent;
