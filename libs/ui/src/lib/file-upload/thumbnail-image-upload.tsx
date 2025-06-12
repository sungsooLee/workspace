import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { cn } from '@learnway/shared';

import { ImageOption } from '../thumbnail/type';
import { ThumbnailList } from '../thumbnail/thumbnail-list';
import { Button } from '../button/button';
import { Input } from '../input/input';

import styles from './thumbnail-image-upload.module.css';
import { IcoLoading, IcoUploadCloud } from '@learnway/icons';
import { S3UploaderConfig, useS3Uploader } from '@learnway/hooks';

export interface ThumbnailImageUploadProps {
  /**
   * 썸네일 이미지 옵션 배열 (초기값 또는 부모로부터 제어되는 값)
   */
  options: Array<ImageOption>;
  /**
   * 컴포넌트에 추가될 CSS 클래스 이름
   */
  className?: string;
  /**
   * 컴포넌트 하단에 표시될 설명 텍스트
   */
  description?: string;
  /**
   * 업로드 및 썸네일 목록 조작 기능 비활성화 여부
   */
  disabled?: boolean;
  /**
   * useS3Uploader 호출시 전달할 S3UploaderConfig
   */
  uploadConfig?: S3UploaderConfig;
  /**
   * 썸네일 항목 클릭 시 호출되는 콜백 함수
   * @param option - 클릭된 ImageOption 객체
   */
  onItemClick?: (option: ImageOption) => void;
  /**
   * 썸네일 목록 전체가 변경될 때 호출되는 콜백 함수 (주로 업로드/삭제 후)
   * @param options - 변경된 전체 ImageOption 배열
   */
  onChange?: (options: ImageOption[]) => void;
  /**
   * 이미지 선택 시 호출되는 콜백 함수 (현재 코드에서는 사용되지 않음)
   * @deprecated 이 prop은 현재 코드에서 사용되지 않습니다.
   * @param options - 선택된 ImageOption 객체
   */
  onImageSelect?: (options: ImageOption) => void;
  /**
   * 파일 변경 시 호출되는 콜백 함수 (현재 코드에서는 사용되지 않음)
   * @deprecated 이 prop은 현재 코드에서 사용되지 않습니다.
   * @param options - 변경된 ImageOption 객체
   */
  onFilesChange?: (options: ImageOption) => void;
  /**
   * 썸네일의 체크 상태가 변경될 때 호출되는 콜백 함수
   * @param options - 체크 상태가 업데이트된 전체 ImageOption 배열
   */
  onCheckedChange?: (options: ImageOption[]) => void;
}

const ThumbnailImageUploadComponent = forwardRef<HTMLDivElement, ThumbnailImageUploadProps>(
  (
    {
      className,
      options: ownerOptions,
      description,
      disabled,
      uploadConfig,
      onItemClick,
      onChange,
      onCheckedChange,
      ...props
    },
    ref,
  ) => {
    // S3 버킷의 기본 경로 TODO: (하드코딩되어 있음, 환경 변수로....)
    const S3_PATH =
      'http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/';
    // 파일 입력 필드에 접근하기 위한 Ref
    const fileInputRef = useRef<HTMLInputElement>(null);
    // 썸네일 목록을 관리하는 내부 상태 (ownerOptions prop으로 초기화 및 동기화)
    const [options, setOptions] = useState<ImageOption[]>(ownerOptions);
    // S3 업로드 기능을 제공하는 커스텀 훅 사용
    const {
      addFiles: thumbnailAddFiles,
      files: thumbnailFiles,
      stats: thumbnailStats,
    } = useS3Uploader({
      s3Path: 'public/thumbnail',
      ...uploadConfig,
    });

    /**
     * '업로드' 버튼 클릭 시 숨겨진 파일 선택창을 엽니다.
     */
    const handleButtonClick = () => {
      fileInputRef?.current && fileInputRef.current.click();
    };

    /**
     * 파일 입력 필드의 `onChange` 이벤트 발생 시 호출되는 핸들러입니다.
     * 선택된 파일들을 `useS3Uploader` 훅을 통해 S3에 업로드하도록 요청합니다.
     * @param event - 파일 입력 필드의 변경 이벤트 객체
     */
    const handleFilesChange = (event: any) => {
      const files = fileInputRef.current?.files;
      if (files?.length) {
        thumbnailAddFiles(Array.from(files));
      }
    };

    /**
     * `ThumbnailList` 컴포넌트의 `onCheckedChange` 콜백을 받아 부모 컴포넌트에 다시 전달합니다.
     * @param newOptions - 체크 상태가 업데이트된 전체 ImageOption 배열
     */
    const handleCheckedThumbnailList = (newOptions: ImageOption[]) => {
      onCheckedChange?.(newOptions);
    };

    /**
     * `ThumbnailList` 컴포넌트의 `onRemoveOptions` 콜백을 받아 부모 컴포넌트에 다시 전달합니다.
     * @param newOptions - 제거된 후의 전체 ImageOption 배열
     */
    const handleRemoveThumbnailList = (newOptions: ImageOption[]) => {
      onChange?.(newOptions);
    };

    /**
     * `useS3Uploader` 훅의 `thumbnailStats` 상태가 변경될 때마다 실행됩니다.
     * 특히 파일 업로드가 'completed' 상태가 되면, 업로드된 파일 정보를 썸네일 목록에 추가합니다.
     */
    useEffect(() => {
      if (thumbnailStats.status === 'completed') {
        const file = thumbnailFiles[0];
        if (file) {
          const newOption = {
            ...file,
            id: file?.id,
            path: S3_PATH + file?.key,
          };
          const newOptions = [...options, newOption];
          setOptions(newOptions);
          onChange?.(newOptions);
        }
      }
    }, [thumbnailStats]);

    /**
     * `ownerOptions` prop (부모 컴포넌트로부터 받은 썸네일 목록)이 변경될 때마다
     * 내부 `options` 상태를 동기화합니다.
     */
    useEffect(() => {
      if (ownerOptions) {
        setOptions(ownerOptions);
      }
    }, [ownerOptions]);

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
          <ThumbnailList
            options={options}
            onCheckedChange={handleCheckedThumbnailList}
            onRemoveOptions={handleRemoveThumbnailList}
          />
        </div>
      </div>
    );
  },
);

export const ThumbnailImageUpload = ThumbnailImageUploadComponent;
