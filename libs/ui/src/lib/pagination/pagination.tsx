import React, { forwardRef } from 'react';

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
  page?: number; // 현제 페이지
  count: number; // 전체 페이지 수
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
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  // prop 자세한 내용은 https://mui.com/material-ui/react-pagination/#api 참조
}

const PaginationComponent = forwardRef<HTMLDivElement, PaginationComponentProps>(
  (
    {
      className,
      page = 0,
      color = 'standard',
      disabled = false,
      size = 'medium',
      variant = 'text',
      pageSizeOptions = [10, 20, 50, 100],
      ...props
    },
    ref,
  ) => {
    const { items, currentPage, totalPages } = usePagination({
      ...props,
      componentName: 'Pagination',
    });

    console.log({ items, currentPage, totalPages });

    const options: DropdownOption[] = pageSizeOptions?.map((size) => ({
      value: size.toString(),
      label: `${size}개씩 보기`,
    }));

    const handleChange = (value?: DropdownOption) => {
      if (value) {
        // onPageSizeChange(Number(value));
      }
    };

    return (
      <div ref={ref} className={cn(styles.root, styles.pagination, className, 'nlp--pagination')}>
        <div className={styles.select_area}>
          <Dropdown value={page.toString()} onChange={handleChange} options={options} />
        </div>
        {/* 페이지 번호들 */}
        <div className={styles.page_num}>
          {items.map((item: any, index: number) => (
            <PaginationItem
              key={index}
              {...item}
              page={page}
              color={color}
              size={size}
              variant={variant}
              className={styles.btn_number}
            />
          ))}
        </div>
        <span className={styles.count_wrap}>{`${currentPage + 1} / ${totalPages}`}</span>
      </div>
    );
  },
);

export const Pagination = PaginationComponent;
