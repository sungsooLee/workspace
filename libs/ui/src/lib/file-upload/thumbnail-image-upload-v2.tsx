import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { cn, formatDate, getRandomId } from '@learnway/shared';

import { ImageOption } from '../thumbnail/type';
import { ThumbnailList } from '../thumbnail/thumbnail-list';
import { Button } from '../button/button';
import { Input } from '../input/input';
import styles from './thumbnail-image-upload.module.css';
import { IcoUploadCloud } from '@learnway/icons';
import { useFileManager } from '@learnway/hooks';

export interface ThumbnailImageUploadV2Props {
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
   * 업로드 및 썸네일 목록 최대갯수
   */
  max?: number;
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

const ThumbnailImageUploadV2Component = forwardRef<HTMLDivElement, ThumbnailImageUploadV2Props>(
  (
    {
      className,
      options: ownerOptions,
      description,
      max,
      onItemClick,
      onChange,
      onCheckedChange,
      ...props
    },
    ref,
  ) => {
    // 파일 입력 필드에 접근하기 위한 Ref
    const fileInputRef = useRef<HTMLInputElement>(null);
    // 썸네일 목록을 관리하는 내부 상태 (ownerOptions prop으로 초기화 및 동기화)
    const [thumbnailImageInfoList, setThumbnailImageInfoList] =
      useState<ImageOption[]>(ownerOptions);
    const { uploadImageFile, deleteImageFile } = useFileManager();
    const disabled = useMemo(
      () => max === thumbnailImageInfoList.length,
      [thumbnailImageInfoList, max],
    );

    /**
     * '업로드' 버튼 클릭 시 숨겨진 파일 선택창을 엽니다.
     */
    const handleButtonClick = () => {
      fileInputRef?.current && fileInputRef.current.click();
    };

    /**
     * 파일 입력 필드의 `onChange` 이벤트 발생 시 호출되는 핸들러입니다.
     */
    const handleFilesChange = () => {
      const files = fileInputRef.current?.files;
      if (files?.length) {
        // setThumbnailFiles(Array.from(files));
        const thumbnailFiles = Array.from(files);

        upload(thumbnailFiles);
      }
    };

    const upload = async (files: File[]) => {
      if (files.length > 0) {
        const promises = files.map(async (file) => {
          const formData = new FormData();
          const today = formatDate(new Date(), 'YYYY/MM/DD');
          const extension = file.name.split('.').pop()?.toLowerCase() || ''; // 파일 확장자 추출
          const id = getRandomId(); // 각 파일에 고유 ID 생성
          formData.append('multipartFile', file);
          formData.append('reposType', 'S3'); // S3 || HMG
          formData.append('filePath', `public/image/thumbnail/${today}/${id}.${extension}`); // file Path: 파일경로: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명) ex public/board/thumbnail/2025/06/02/thumbnail.jpg
          const thumbnailImageInfo = await uploadImageFile(formData);
          return {
            id: thumbnailImageInfo.filePath,
            path: thumbnailImageInfo.imageUrl,
            size: thumbnailImageInfo.fileSize,
            displaySize: '40',
            fileName: thumbnailImageInfo.originalFileName,
            uploadType: thumbnailImageInfo.reposType,
          };
        });
        const array = await Promise.all(promises);
        setThumbnailImageInfoList((prev) => prev.concat(array));
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
      setThumbnailImageInfoList(newOptions);
    };

    const handleRemove = (deleteOption: ImageOption) => {
      deleteImageFile(deleteOption.path);
    };

    /**
     * `useS3Uploader` 훅의 `thumbnailStats` 상태가 변경될 때마다 실행됩니다.
     * 특히 파일 업로드가 'completed' 상태가 되면, 업로드된 파일 정보를 썸네일 목록에 추가합니다.
     */
    // useEffect(() => {
    //   if (status === 'completed') {
    //     const file = thumbnailFiles[0];
    //     if (file) {
    //       const newOption = {
    //         ...file,
    //         id: file?.id,
    //         path: S3_PATH + file?.key,
    //       };
    //       const newOptions = [...options, newOption];
    //       setOptions(newOptions);
    //       onChange?.(newOptions);
    //     }
    //   }
    // }, [status]);

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.start, className, 'nlp--image-upload flex flex-col gap-2')}
      >
        {/* ThumbnailList */}
        <div className={styles.thumbnail_wrap}>
          {/*썸네일 업로드*/}
          <div className={styles.file_upload}>
            <Button
              className={cn(styles.btn_file, disabled && styles.disabled)}
              disabled={disabled}
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

          {/*썸네일 리스트*/}
          <ThumbnailList
            options={thumbnailImageInfoList}
            onCheckedChange={handleCheckedThumbnailList}
            onRemoveOptions={handleRemoveThumbnailList}
            onRemove={handleRemove}
          />
        </div>
        {/*설명*/}
        <p className={styles.description}>{description}</p>
      </div>
    );
  },
);

export const ThumbnailImageUploadV2 = ThumbnailImageUploadV2Component;
