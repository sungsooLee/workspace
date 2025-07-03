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
  pageNumber?: number; // 현제 페이지
  totalPages: number; // 전체 페이지 수
  size?: string; // 버튼 size
  boundaryCount?: number; // ellipsis 전후로 표시할 page 버튼 개수
  siblingCount?: number; // 현제 페이지 전후로 표시할 page 버튼 개수
  color?: string; // 버튼 color
  disabled?: boolean;
  variant?: string;
  onChange?: (newPage: number) => void;
  /**
   * 페이지 정보 사용 유무
   */
  hidePageInfo?: boolean;

  pageSize?: number;
  /**
   * 페이지 크기 선택 옵션 배열입니다.
   */
  pageSizeOptions?: number[];
  /**
   * 페이지 크기 선택 옵션 사용 유무
   */
  hidePageSizeOptions?: boolean;
  /**
   * 페이지 크기 변경 시 호출되는 콜백 함수입니다.
   * @param {number} pageSize 변경된 페이지 크기
   */
  onPageSizeChange?: (pageSize: number) => void;
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
      hidePageInfo,
      pageSize = 20,
      pageSizeOptions = [10, 20, 50, 100, 500, 1000],
      hidePageSizeOptions,
      onPageSizeChange,
      ...props
    },
    ref,
  ) => {
    // const [pageSize, setPageSize] = useState<number>(pageSizeOptions[0]);
    const { items, pageNumber, totalPages } = usePagination({
      ...props,
      componentName: 'Pagination',
    });

    const options: DropdownOption[] = pageSizeOptions?.map((size) => ({
      value: size,
      label: String(size),
    }));

    const handlePageSizeChange = (newValue?: any) => {
      // setPageSize(newValue);
      onPageSizeChange?.(newValue);
    };

    // console.log('pagination.tsx ', {
    //   items,
    //   pageNumber,
    //   totalPages,
    //   pageSize,
    //   options,
    //   disabled: totalPages === 0,
    //   props,
    // });

    return (
      <div
        ref={ref}
        className={cn(
          styles.root,
          styles.pagination,
          className,
          totalPages === 0 && styles.disabled,
          'nlp--pagination',
        )}
      >
        <div className={styles.select_area}>
          {!hidePageSizeOptions && (
            <Dropdown value={pageSize} onChange={handlePageSizeChange} options={options} />
          )}
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
        <span className={styles.count_wrap}>
          {!hidePageInfo && `${pageNumber + 1} / ${totalPages}`}
        </span>
      </div>
    );
  },
);

export const Pagination = PaginationComponent;
