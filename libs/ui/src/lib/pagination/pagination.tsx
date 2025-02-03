import React, { forwardRef, useEffect } from 'react';

import { cn } from '@learnway/shared';

import styles from './pagination.module.scss';

import { Button } from '../button/button';


interface PaginationItemProps {
  page?: number;
  isButton?: boolean;
}

const PaginationItem = ({ page }: PaginationItemProps) => {
  return (
    <Button>{page}</Button>
  )
}

export interface PaginationComponentProps {
  className?: string
  pageNumber: number;
  pageSize: number;
  buttonCount?: number;
  boundaryCount?: number;
  siblingCount?: number;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: () => void,
  showFirstButton?: boolean;
  showLastButton?: boolean;
  size?: string;
}

const PaginationComponent = forwardRef<HTMLButtonElement, PaginationComponentProps>(
  ({
   className,
   buttonCount = 10,
    ...props
  }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const items: any = getItems(buttonCount, currentPage);

    console.log(items)

    // useEffect(() => {
    //   setCurrentPage()
    // })

    return (
      <div
        className={cn(styles.start, className, 'nlp--pagination')}
      >
        {items.map((d: any) => <PaginationItem page={d.page} key={d.page} />)}
      </div>
    );
  },
);

const getItems = (buttonCount: number, currentPage: number) => {
  const start = currentPage * buttonCount - buttonCount + 1;
  const end = currentPage * buttonCount;
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };
  const items = range(start, end).map(d => ({
    page: d,
  }))

  return items;
}



export const Pagination = PaginationComponent;
