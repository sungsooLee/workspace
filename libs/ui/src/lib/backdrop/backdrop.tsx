import { memo } from 'react';
import { isFunction } from 'lodash';

import { cn } from '@learnway/shared';

/* eslint-disable-next-line */
export interface BackDropProps {
  className?: string;
  onClick?: any;
}

export function BackDrop({ className, onClick }: BackDropProps) {
  const handleClick = () => {
    if (isFunction(onClick)) onClick();
  };

  return <div className={cn(className)} onClick={handleClick}></div>;
}

//export const BackDrop = memo(BackDrop);
