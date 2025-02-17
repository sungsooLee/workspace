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

    const items = options?.map((d: ImageOption) => (
      <Thumbnail
        path={d.path}
        key={d.id}
        showCheckbox={showCheckbox}
        onCheckedChange={(checked: CheckedState) => handlerCheckChange(checked, d)}
      />
    ));

    return (
      <div
        {...props}
        className={cn(styles.start, className, 'nlp--thumbnail-list', 'p-3', 'overflow-hidden')}>
        <Carousel
          {...props}
          items={items}
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          // navigation={true}
          pagination={{
            clickable: true,
          }}
        />
      </div>
    );
  },
);

export const ThumbnailList = ThumbnailListComponent;
