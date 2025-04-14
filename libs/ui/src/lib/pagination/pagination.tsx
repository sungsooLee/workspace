import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import styles from './pagination.module.css';

import usePagination from './pagination.hook';
import { PaginationItem } from './Pagination-item';

export interface PaginationComponentProps {
  className?: string;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  page?: number; // 현제 페이지
  count: number; // 전체 페이지 수
  size?: string; // 버튼 size
  boundaryCount?: number; // ellipsis 전후로 표시할 page 버튼 개수
  siblingCount?: number; // 현제 페이지 전후로 표시할 page 버튼 개수
  color?: string; // 버튼 color
  disabled?: boolean;
  variant?: string;
  // prop 자세한 내용은 https://mui.com/material-ui/react-pagination/#api 참조
}

const PaginationComponent = forwardRef<HTMLButtonElement, PaginationComponentProps>(
  (
    {
      className,
      color = 'standard',
      disabled = false,
      size = 'medium',
      variant = 'text',
      ...props
    },
    ref,
  ) => {
    const { items } = usePagination({ ...props, componentName: 'Pagination' });
    console.log(items);

    return (
      <div className={cn(styles.root, styles.pagination, className, 'nlp--pagination')}>
        {items.map((item: any, index: number) => (
          <PaginationItem
            key={index}
            {...item}
            color={color}
            size={size}
            variant={variant}
            className={styles.btn_number}
          />
        ))}
      </div>
    );
  },
);

export const Pagination = PaginationComponent;
