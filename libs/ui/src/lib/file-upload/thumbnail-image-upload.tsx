import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { cn } from '@learnway/shared';

import { ImageOption } from '../thumbnail/type';
import { ThumbnailList } from '../thumbnail/thumbnail-list';
import { Button } from '../button/button';
import { Input } from '../input/input';

import styles from './thumbnail-image-upload.module.css';
import { IcoLoading, IcoUploadCloud } from '@learnway/icons';
import { useS3Uploader } from '@learnway/hooks';

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
  onFilesChange?: (options: ImageOption) => void;
}

const ThumbnailImageUploadComponent = forwardRef<
  HTMLDivElement,
  ThumbnailImageUploadComponentProps
>(
  (
    {
      className,
      options: ownerOptions,
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
    const S3_PATH =
      'http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com';
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [options, setOptions] = useState<ImageOption[]>(ownerOptions);

    const {
      addFiles: thumbnailAddFiles,
      files: thumbnailFiles,
      stats: thumbnailStats,
    } = useS3Uploader({
      s3Path: 'public/thumbnail',
    });

    /**
     * 업로드 버튼 클릭 시 파일 선택창 열기
     */
    const handleButtonClick = () => {
      fileInputRef?.current && fileInputRef.current.click();
    };

    // test function
    // const handleFileChange = (event: any) => {
    //   const file = fileInputRef.current?.files?.[0];
    //   if (file) {
    //     const newOption = {
    //       id: getRandomId(),
    //       path: URL.createObjectURL(file),
    //     };
    //     onImageSelect?.(newOption);
    //   }
    // };

    const handleFilesChange = (event: any) => {
      const files = fileInputRef.current?.files;
      if (files?.length) {
        thumbnailAddFiles(Array.from(files));
      }
    };

    const handleCheckedThumbnailList = (newOptions: ImageOption[]) => {
      onCheckedChange?.(newOptions);
    };

    useEffect(() => {
      console.log('stats => ', thumbnailStats);
      if (thumbnailStats.status === 'completed') {
        console.log('thumbnailFiles =>', thumbnailFiles);
        const file = thumbnailFiles[0];
        if (file) {
          const newOption = {
            id: file?.key,
            path: S3_PATH + file?.key,
          };
          const newOptions = [...options, newOption];
          setOptions(newOptions);
          onChange?.(newOptions);
        }
      }
    }, [thumbnailStats]);

    return (
      <div {...props} ref={ref} className={cn(styles.start, className, 'nlp--image-upload')}>
        {/**/}
        <p className={styles.description}>{description}</p>
        {/* ThumbnailList */}
        <div className={styles.thumbnail_wrap}>
          {/*썸네일 업로드*/}
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
              onChange={handleFilesChange}
            />
          </div>
          {/*동영상 추출중 (처음에만 노출)*/}
          <div className={styles.loading}>
            <span className={styles.text}>
              <IcoLoading width={24} height={24} stroke="#747d91" className={styles.icon} />
              동영상 추출중
            </span>
          </div>
          {/*썸네일 리스트*/}
          <ThumbnailList options={options} showCheckbox onChecked={handleCheckedThumbnailList} />
        </div>
      </div>
    );
  },
);

export const ThumbnailImageUpload = ThumbnailImageUploadComponent;
