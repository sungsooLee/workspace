import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import { Button } from '../button/button';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import styles from './pagination-item.module.scss';

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
    return type === 'start-ellipsis' || type === 'end-ellipsis' ? (
      <span>...</span>
    ) : (
      <>
        <Button
          className={cn(className, 'nlp-pagination-button', selected && styles.selected)}
          icon={type === 'previous' ? <ChevronLeft /> : type === 'next' ? <ChevronRight /> : null}
          onClick={() => onClick?.()}>
          {type === 'page' && page}
        </Button>
        {/*{type === 'page' && (*/}
        {/*  <button>{page}</button>*/}
        {/*)}*/}
        {/*{type !== 'page' && (*/}
        {/*  <button>{type}</button>*/}
        {/*)}*/}
      </>
    );
  },
);

export const PaginationItem = PaginationItemComponent;
