import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import { Button } from '../button/button';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import styles from './pagination-item.module.css';

export interface PaginationItemComponentProps {
  className?: string;
  pageNumber: number;
  pageSize: number;
  buttonCount?: number;
  boundaryCount?: number;
  siblingCount?: number;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: () => void;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  page: number;
  count: number;
  size?: string;
  color?: string;
  disabled?: boolean;
  variant?: string;
  selected?: boolean;
  type: string;
  onClick?: () => void;
}

const PaginationItemComponent = forwardRef<HTMLButtonElement, PaginationItemComponentProps>(
  ({
    className,
    color = 'standard',
    disabled = false,
    page,
    selected = false,
    size = 'medium',
    type = 'page',
    variant = 'text',
    onClick,
    ...other
  }) => {
    // button icon
    const icon = {
      previous: <IcoChevronLeft width={32} height={32} fill="#4C515E" />,
      next: <ChevronRight />,
      first: <IcoChevronLeftDouble width={32} height={32} fill="#4C515E" />,
      last: <ChevronsRight />,
    }[type];

    return type === 'start-ellipsis' || type === 'end-ellipsis' ? (
      <span className={styles.ellipsis}>...</span>
    ) : (
      <Button
        className={cn(className, 'nlp-pagination-button', selected && styles.selected)}
        icon={icon}
        onClick={() => onClick?.()}>
        {type === 'page' && page}
      </Button>
    );
  },
);

export const PaginationItem = PaginationItemComponent;
