// IA011 / NLP_BO_PMS_1100_05_01
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { cn, formatDate, getRandomId, splitFileName } from '@learnway/shared';

import { ThumbnailList } from '../thumbnail/thumbnail-list';
import { Button } from '../button/button';
import { Input } from '../input/input';
import styles from './thumbnail-image-upload.module.css';
import { IcoUploadCloud } from '@learnway/icons';
import { FileInfo, S3_PATH, S3_PATH_TYPE, useFileManager } from '@learnway/hooks';
import { difference, isEmpty } from 'lodash';

export interface ThumbnailImageUploadV2Props {
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
  s3Path?: S3_PATH_TYPE;
  value?: string[];
  onChange?: (value: string[]) => void;
}

const ThumbnailImageUploadV2Component = forwardRef<HTMLDivElement, ThumbnailImageUploadV2Props>(
  (
    {
      className,
      description,
      max = 0,
      s3Path = S3_PATH['public/image/thumbnail'],
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const S3_URL = import.meta.env.VITE_AXIOS_S3_URL + '/';
    // 파일 입력 필드에 접근하기 위한 Ref
    const fileInputRef = useRef<HTMLInputElement>(null);
    // 썸네일 목록을 관리하는 내부 상태 (ownerOptions prop으로 초기화 및 동기화)
    const [files, setFiles] = useState<FileInfo[]>([]);

    useEffect(() => {
      if (!value || isEmpty(value)) return;
      const filePaths = files.map((_) => _.filePath);
      const added = difference(value, filePaths);
      const removed = difference(filePaths, value);
      if (!added.length && !removed.length) return;
      const newFiles: FileInfo[] = value.map((filePath) => {
        const pathArr = filePath.split('/');
        const serverFileName = pathArr.pop() || '';
        const { base: fileUuid } = splitFileName(serverFileName);
        const exist = files.find((_) => _.fileUuid === fileUuid);
        if (exist) return exist;
        const day = pathArr.pop() || '';
        const month = pathArr.pop() || '';
        const year = pathArr.pop() || '';
        const detailPath = '/' + [year, month, day].join('/');
        return {
          fileUuid,
          filePath,
          fileUrl: S3_URL + filePath,
          fileSize: 0,
          originalFileName: serverFileName,
          serverFileName,
          detailPath,
        };
      });

      setFiles(newFiles);
    }, [value]);

    useEffect(() => {
      const filePaths = files.map((file) => file.filePath);
      onChange?.(filePaths);
    }, [files]);

    const { uploadImageFile, deleteImageFile } = useFileManager();

    const disabled = useMemo(() => max <= files.length, [files, max]);

    const multiple = useMemo(() => max > 1, [max]);

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

    const upload = async (fileList: File[]) => {
      if (fileList.length > 0) {
        const promises: Promise<FileInfo>[] = fileList.map(async (file) => {
          const formData = new FormData();
          const fileUuid = getRandomId(); // 각 파일에 고유 ID 생성
          const detailPath = formatDate(new Date(), '/YYYY/MM/DD');
          const { ext } = splitFileName(file.name);
          const serverFileName = ext ? fileUuid + '.' + ext : fileUuid;
          formData.append('multipartFile', file);
          formData.append('reposType', 'S3'); // S3 || HMG
          formData.append('filePath', `${s3Path}${detailPath}/${serverFileName}`); // file Path: 파일경로: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명) ex public/board/thumbnail/2025/06/02/thumbnail.jpg
          const thumbnailImageInfo = await uploadImageFile(formData);
          return {
            fileUuid,
            filePath: thumbnailImageInfo.filePath,
            fileUrl: thumbnailImageInfo.imageUrl,
            fileSize: thumbnailImageInfo.fileSize,
            originalFileName: thumbnailImageInfo.originalFileName,
            serverFileName,
            detailPath,
          };
        });
        const files = await Promise.all(promises);
        setFiles((prev) => [...prev, ...files]);
      }
    };

    const handleRemove = (uuid: string) => {
      const deleting = files.find((_) => _.fileUuid === uuid);
      if (!deleting) return;
      deleteImageFile(deleting.fileUrl!);
      setFiles((prev) => prev.filter((_) => _.fileUuid !== uuid));
    };

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
              multiple={multiple}
              disabled={disabled}
              className={styles.input_file}
              onChange={handleFilesChange}
              accept="image/*"
            />
          </div>
          {/* 썸네일 리스트 */}
          <ThumbnailList files={files || []} showCheckbox={false} onRemove={handleRemove} />
        </div>
        {/*설명*/}
        <p className={styles.description}>{description}</p>
      </div>
    );
  },
);

export const ThumbnailImageUploadV2 = ThumbnailImageUploadV2Component;
