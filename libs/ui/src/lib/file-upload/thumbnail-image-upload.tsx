import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { cn, getRandomId } from '@learnway/shared';

import { ImageOption } from '../thumbnail/type';
import { ThumbnailList } from '../thumbnail/thumbnail-list';
import { Button } from '../button/button';
import { Input } from '../input/input';

import styles from './thumbnail-image-upload.module.css';
import { IcoUploadCloud, IcoLoading } from '@learnway/icons';

export interface ThumbnailImageUploadComponentProps {
  className?: string;
  options: Array<ImageOption>;
  description?: string;
  onItemClick?: (option: ImageOption) => void;
  onChange?: (options: ImageOption[]) => void;
  onCheckedChange?: (options: ImageOption[]) => void;
}

const ThumbnailImageUploadComponent = forwardRef<HTMLElement, ThumbnailImageUploadComponentProps>(
  ({
    className,
    options: ownerOptions = [],
    description,
    onItemClick,
    onChange,
    onCheckedChange,
    ...props
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [options, setOptions] = useState<ImageOption[]>(ownerOptions);

    useEffect(() => {
      onChange?.(options);
    }, [options]);

    const handleButtonClick = () => {
      fileInputRef?.current && fileInputRef.current.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]; // 첫 번째 파일 가져오기
      if (file) {
        const imageUrl = URL.createObjectURL(file); // 선택한 파일의 URL 생성
        // setImageSrc(imageUrl); // 상태 업데이트
        setOptions([{ id: getRandomId(), path: imageUrl }, ...options]);
      }
    };

    const handleCheckedThumbnailList = (newOptions: ImageOption[]) => {
      onCheckedChange?.(newOptions);
    };

    return (
      <div {...props} className={cn(styles.start, className, 'nlp--image-upload')}>
        {/**/}
        <p className={styles.description}>{description}</p>
        {/* ThumbnailList */}
        <div className={styles.thumbnail_wrap}>
          {/* <div className={styles.it}></div> */}
          <div className={styles.file_upload}>
            <Button
              className={styles.btn_file}
              icon={<IcoUploadCloud width={24} height={24} stroke="#747d91" />}
              onClick={handleButtonClick}>
              <span className={styles.text}>썸네일 업로드</span>
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
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
