import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { cn, getRandomId } from '@learnway/shared';

import { ImageOption } from '../thumbnail/type';
import { ThumbnailList } from '../thumbnail/thumbnail-list';
import { Button } from '../button/button';

import styles from './thumbnail-image-upload.module.css';
import { Upload } from 'lucide-react';

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
      <div {...props} className={cn(styles.start, className, 'nlp--image-upload', 'flex flex-col')}>
        {/**/}
        <span className={'text-gray-7 text-sm'}>{description}</span>
        {/* ThumbnailList */}
        <div className={cn('flex flex-row')}>
          <Button
            variant={'gray'}
            size={'lg'}
            className={'m-3'}
            icon={<Upload />}
            onClick={handleButtonClick}>
            썸네일업로드
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <ThumbnailList options={options} showCheckbox onChecked={handleCheckedThumbnailList} />
        </div>
      </div>
    );
  },
);

export const ThumbnailImageUpload = ThumbnailImageUploadComponent;
