import React, { forwardRef, useEffect, useState } from 'react';

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
}

const ThumbnailListComponent = forwardRef<HTMLElement, ThumbnailListComponentProps>(
  ({ className, options = [], showCheckbox, onChecked, ...props }) => {
    const [selectedImages, setSelectedImages] = useState<ImageOption[]>([]);

    useEffect(() => {
      onChecked?.(selectedImages);
    }, [selectedImages]);

    const handlerCheckChange = (checked: CheckedState, currentOption: ImageOption) => {
      const appendedImages = [...selectedImages, currentOption];
      const deletedImages = selectedImages?.filter((d: ImageOption) => d.id !== currentOption.id);
      const newSelectedImages = checked ? appendedImages : deletedImages;
      setSelectedImages(newSelectedImages);
    };

    const items = options?.map((d: ImageOption, index: number) => (
      <Thumbnail
        path={d.path}
        key={d.id}
        showCheckbox={showCheckbox}
        onCheckedChange={(checked: CheckedState) => handlerCheckChange(checked, d)}
        showDeleteBtn={index === 0}
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
