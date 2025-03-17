import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Thumbnail, ThumbnailComponentProps } from './thumbnail';
import { Carousel } from '../carousel/carousel';

import styles from './thumbnail-list.module.css';
import { ImageOption } from './type';

export interface ThumbnailListComponentProps
  extends Omit<ThumbnailComponentProps, 'onCheckedChange' | 'path'> {
  options: ImageOption[];
  showCheckbox?: boolean;
  onChecked?: (options: ImageOption[]) => void;
  /** 썸네일 체크 변경 */
  onChangeChecked?: (option: ImageOption) => void;
}

const ThumbnailListComponent = forwardRef<HTMLElement, ThumbnailListComponentProps>(
  ({ className, options = [], showCheckbox, onChecked, onChangeChecked, ...props }) => {
    const handlerCheckChange = (checked: CheckedState, currentOption: ImageOption) => {
      const newOption = { ...currentOption, checked: !!checked };
      onChangeChecked?.(newOption);
    };

    const items = options?.map((d: ImageOption, index: number) => (
      <Thumbnail
        path={d.path}
        key={d.id}
        onCheckedChange={(checked: CheckedState) => handlerCheckChange(checked, d)}
        showCheckbox={!d.readonly}
        showDeleteBtn={!d.readonly}
        selected={d.checked}
      />
    ));

    return (
      <div
        {...props}
        className={cn(styles.start, styles.thumbnail_list, className, 'nlp--thumbnail-list')}>
        <Carousel
          {...props}
          items={items}
          slidesPerView={'auto'}
          spaceBetween={12}
          freeMode={true}
          grabCursor={true}
          className={styles.thumbnail_carousel}
          // navigation={true}
          // pagination={{
          //   clickable: true,
          // }}
        />
      </div>
    );
  },
);

export const ThumbnailList = ThumbnailListComponent;
