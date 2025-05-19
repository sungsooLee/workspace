import React, { forwardRef, useState } from 'react';

import { cn } from '@learnway/shared';

import styles from './pagination.module.css';

import usePagination from './pagination.hook';
import { PaginationItem } from './Pagination-item';
import { Dropdown } from '../dropdown/dropdown';
import { DropdownOption } from '../type';

export interface PaginationComponentProps {
  className?: string;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  pageNumber?: number; // 현제 페이지
  totalPages: number; // 전체 페이지 수
  size?: string; // 버튼 size
  boundaryCount?: number; // ellipsis 전후로 표시할 page 버튼 개수
  siblingCount?: number; // 현제 페이지 전후로 표시할 page 버튼 개수
  color?: string; // 버튼 color
  disabled?: boolean;
  variant?: string;
  /**
   * 페이지 크기 선택 옵션 배열입니다.
   */
  pageSizeOptions?: number[];
  onChange?: (newPage: number) => void;
  // prop 자세한 내용은 https://mui.com/material-ui/react-pagination/#api 참조
}

const PaginationComponent = forwardRef<HTMLDivElement, PaginationComponentProps>(
  (
    {
      className,
      color = 'standard',
      disabled = false,
      size = 'medium',
      variant = 'text',
      pageSizeOptions = [10, 20, 50, 100],
      ...props
    },
    ref,
  ) => {
    const [pageSize, setPageSize] = useState<number>(pageSizeOptions[0]);
    const { items, pageNumber, totalPages } = usePagination({
      ...props,
      componentName: 'Pagination',
    });

    const options: DropdownOption[] = pageSizeOptions?.map((size) => ({
      value: size,
      label: `${size}개씩 보기`,
    }));

    const handlePageSizeChange = (newValue?: any) => {
      setPageSize(newValue);
    };

    const handlePageNumberChange = (pageNumber: number) => {};

    console.log({ items, pageNumber, totalPages, pageSize, options, props });
    return (
      <div ref={ref} className={cn(styles.root, styles.pagination, className, 'nlp--pagination')}>
        <div className={styles.select_area}>
          <Dropdown value={pageSize} onChange={handlePageSizeChange} options={options} />
        </div>
        {/* 페이지 번호들 */}
        <div className={styles.page_num}>
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
        <span className={styles.count_wrap}>{`${pageNumber + 1} / ${totalPages}`}</span>
      </div>
    );
  },
);

export const Pagination = PaginationComponent;
