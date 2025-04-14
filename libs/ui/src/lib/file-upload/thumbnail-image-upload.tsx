import React, { forwardRef, useRef } from 'react';

import { cn, getRandomId } from '@learnway/shared';

import { ImageOption } from '../thumbnail/type';
import { ThumbnailList } from '../thumbnail/thumbnail-list';
import { Button } from '../button/button';
import { Input } from '../input/input';

import styles from './thumbnail-image-upload.module.css';
import { IcoLoading, IcoUploadCloud } from '@learnway/icons';

export interface ThumbnailImageUploadComponentProps {
  className?: string;
  options: Array<ImageOption>;
  description?: string;
  disabled?: boolean;
  onItemClick?: (option: ImageOption) => void;
  onChange?: (options: ImageOption[]) => void;
  onCheckedChange?: (options: ImageOption[]) => void;
  /** onImageSelect */
  onImageSelect?: (options: ImageOption) => void;
}

const ThumbnailImageUploadComponent = forwardRef<
  HTMLDivElement,
  ThumbnailImageUploadComponentProps
>(
  (
    {
      className,
      options,
      description,
      disabled,
      onItemClick,
      onChange,
      onCheckedChange,
      onImageSelect,
      ...props
    },
    ref,
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
      fileInputRef?.current && fileInputRef.current.click();
    };

    const handleFileChange = (event: any) => {
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        const newOption = {
          id: getRandomId(),
          path: URL.createObjectURL(file),
        };
        onImageSelect?.(newOption);
      }
    };

    const handleCheckedThumbnailList = (newOptions: ImageOption[]) => {
      onCheckedChange?.(newOptions);
    };

    return (
      <div {...props} ref={ref} className={cn(styles.start, className, 'nlp--image-upload')}>
        {/**/}
        <p className={styles.description}>{description}</p>
        {/* ThumbnailList */}
        <div className={styles.thumbnail_wrap}>
          {/* <div className={styles.it}></div> */}
          <div className={styles.file_upload}>
            <Button
              className={cn(styles.btn_file, disabled && styles.disabled)}
              icon={<IcoUploadCloud width={24} height={24} stroke="#747d91" />}
              onClick={handleButtonClick}
            >
              <span className={styles.text}>썸네일 업로드</span>
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              disabled={disabled}
              className={styles.input_file}
              onChange={handleFileChange}
            />
          </div>
          {/* 처음에만 노출 */}
          <div className={styles.loading}>
            <span className={styles.text}>
              <IcoLoading width={24} height={24} stroke="#747d91" className={styles.icon} />
              동영상 추출중
            </span>
          </div>
          <ThumbnailList options={options} showCheckbox onChecked={handleCheckedThumbnailList} />
        </div>
      </div>
    );
  },
);

export const ThumbnailImageUpload = ThumbnailImageUploadComponent;
