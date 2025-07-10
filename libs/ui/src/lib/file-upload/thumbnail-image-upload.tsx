// IA011 / NLP_BO_PMS_1100_05_01
import { Dispatch, forwardRef, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { cn, formatDate, getRandomId } from '@learnway/shared';
import { ImageOption } from '../thumbnail/type';
import { ThumbnailList } from '../thumbnail/thumbnail-list';
import { Button } from '../button/button';
import { Input } from '../input/input';
import styles from './thumbnail-image-upload.module.css';
import { IcoLoading, IcoUploadCloud } from '@learnway/icons';
import {
  formatFileSize,
  S3_PATH,
  S3UploaderConfig,
  ThumbnailFileValue,
  useFileManager,
  useS3Uploader,
} from '@learnway/hooks';
import { compact, difference, map } from 'lodash';

export interface ThumbnailImageUploadProps {
  /**
   * 썸네일 이미지 업로드 타입 (이미지 경로 올릴지 결정되는 값)
   */
  // imageStorageType?: 'public' | 'db-manage';
  /**
   * 썸네일 이미지 옵션 배열 (초기값 또는 부모로부터 제어되는 값)
   */
  // options: Array<ImageOption>;
  /**
   * 컴포넌트에 추가될 CSS 클래스 이름
   */
  className?: string;
  /**
   * 컴포넌트 하단에 표시될 설명 텍스트
   */
  description?: string;
  /**
   * useS3Uploader 호출시 전달할 S3UploaderConfig
   */
  uploadConfig?: S3UploaderConfig;
  /**
   * 업로드 및 썸네일 목록 최대갯수
   */
  max?: number;
  /**
   * 썸네일 항목 클릭 시 호출되는 콜백 함수
   * @param option - 클릭된 ImageOption 객체
   */
  // onItemClick?: (option: ImageOption) => void;
  /**
   * 썸네일 목록 전체가 변경될 때 호출되는 콜백 함수 (주로 업로드/삭제 후)
   * @param options - 변경된 전체 ImageOption 배열
   */
  // onChange?: (options: ImageOption[]) => void;
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
   * 썸네일 정보
   */
  values: ThumbnailFileValue;
  /**
   * 썸네일 변경 콜백
   */
  onChangeValues: Dispatch<SetStateAction<ThumbnailFileValue>>;
  showDefault?: boolean;
}

const ThumbnailImageUploadComponent = forwardRef<HTMLDivElement, ThumbnailImageUploadProps>(
  (
    {
      className,
      // imageStorageType,
      // options: ownerOptions = [],
      description,
      max = 1,
      uploadConfig,
      // onItemClick,
      // onChange,
      values,
      onChangeValues,
      showDefault,
      ...props
    },
    ref,
  ) => {
    // S3 버킷의 기본 경로 TODO: (하드코딩되어 있음, 환경 변수로....)
    // const S3_URL =
    //   'http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/';
    // 파일 입력 필드에 접근하기 위한 Ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    const maxFileCount = useMemo(
      () => (max !== undefined ? max : uploadConfig?.maxFileCount || 10),
      [max, uploadConfig?.maxFileCount],
    );

    // S3 업로드 기능을 제공하는 커스텀 훅 사용
    const {
      groupUuid,
      setGroupUuid,
      addFiles: thumbnailAddFiles,
      onFetch,
      onRemove,
      files: thumbnailFiles,
      stats: { status },
      inputAccept = 'image/*',
    } = useS3Uploader({
      s3Path: S3_PATH['upload/content/thumbnail'],
      affairsType: 'CMS',
      ...uploadConfig,
      maxFileCount,
    });

    const { uploadImageFile, deleteImageFile, getFileInfo } = useFileManager();

    const [checkedFileId, setCheckedFileId] = useState<string | null>(null);

    /**
     * 서버에서 파일정보를 가져와서 files에 추가
     */
    async function fetchFileInfo(uuids: string[]) {
      const fileInfos = await Promise.all(uuids.map(getFileInfo));
      onFetch(fileInfos);
    }

    useEffect(() => {
      if (values.groupUuid !== groupUuid) setGroupUuid(values.groupUuid);

      if ((values.selectedFileUuid || null) !== checkedFileId)
        setCheckedFileId(values.selectedFileUuid || null);
    }, [values]);

    /**
     * values.files가 변경될 때마다 기존 thumbnailFiles와 비교하여 추가된 파일이 있는 경우 서버에서 fetch 실행
     */
    useEffect(() => {
      const uploadFileUuid = compact(
        map(
          thumbnailFiles.filter(({ status }) => ['fetched', 'completed'].includes(status)),
          ({ fileUuid }) => fileUuid,
        ),
      );
      const fileUuids = map(values.files, 'fileUuid');
      const existed = difference(fileUuids, uploadFileUuid);
      if (existed.length) {
        fetchFileInfo(existed);
      }
    }, [values.files]);

    async function onChangeUploaded(uuids: string[]) {
      const files = await Promise.all(uuids.map(getFileInfo));
      onChangeValues((prev) => ({ ...prev, files }));
    }

    /**
     * thumbnailFiles가 변경될 때마다 기존 fileUuid와 비교하여
     * 변경이 있는 경우 onChange를 실행하여 상위 react-form으로 전달함
     */
    useEffect(() => {
      const uploadedFileUuid = compact(
        map(
          thumbnailFiles.filter(({ status }) => ['fetched', 'completed'].includes(status)),
          ({ fileUuid }) => fileUuid,
        ),
      );
      const fileUuids = map(values.files, 'fileUuid');
      const added = difference(uploadedFileUuid, fileUuids);
      const removed = difference(fileUuids, uploadedFileUuid);
      if (added.length || removed.length) {
        onChangeUploaded(uploadedFileUuid);
      }
    }, [thumbnailFiles]);

    const disabled = useMemo(
      () => maxFileCount <= (values.files || []).length,
      [values.files, maxFileCount],
    );

    const multiple = useMemo(() => maxFileCount > 1, [maxFileCount]);

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
      if (files && files.length) {
        // if (imageStorageType === 'db-manage') {
        thumbnailAddFiles(Array.from(files));
        // } else if (imageStorageType === 'public') {
        //   const thumbnailFiles = Array.from(files);
        //   uploadPublicImage(thumbnailFiles);
        // }
      }
    };

    // const uploadPublicImage = async (files: File[]) => {
    //   if (files.length > 0) {
    //     const promises = files.map(async (file) => {
    //       const formData = new FormData();
    //       const today = formatDate(new Date(), 'YYYY/MM/DD');
    //       const extension = file.name.split('.').pop()?.toLowerCase() || ''; // 파일 확장자 추출
    //       const id = getRandomId(); // 각 파일에 고유 ID 생성
    //       formData.append('multipartFile', file);
    //       formData.append('reposType', 'S3'); // S3 || HMG
    //       formData.append(
    //         'filePath',
    //         `${S3_PATH['public/image/thumbnail']}/${today}/${id}.${extension}`,
    //       ); // file Path: 파일경로: (1depth:upload)(2depth:/대분류/소분류)(3depth:/yyyy/mm/dd)(/4depth:파일명) ex public/board/thumbnail/2025/06/02/thumbnail.jpg
    //       const thumbnailImageInfo = await uploadImageFile(formData);
    //       return {
    //         id: thumbnailImageInfo.filePath,
    //         path: thumbnailImageInfo.imageUrl,
    //         size: thumbnailImageInfo.fileSize,
    //         displaySize: formatFileSize(thumbnailImageInfo.fileSize),
    //         fileName: thumbnailImageInfo.originalFileName,
    //         uploadType: thumbnailImageInfo.reposType,
    //       };
    //     });
    //     const array = await Promise.all(promises);
    //     setThumbnailImageInfoList((prev) => prev.concat(array));
    //   }
    // };

    /**
     * `ThumbnailList` 컴포넌트의 `onCheckedChange` 콜백을 받아 부모 컴포넌트에 다시 전달합니다.
     * @param newOptions - 체크 상태가 업데이트된 전체 ImageOption 배열
     */
    // const handleCheckedThumbnailList = (newOptions: ImageOption[]) => {
    //   onCheckedChange?.(newOptions);
    // };

    /**
     * `ThumbnailList` 컴포넌트의 `onRemoveOptions` 콜백을 받아 부모 컴포넌트에 다시 전달합니다.
     * @param newOptions - 제거된 후의 전체 ImageOption 배열
     */
    // const handleRemoveThumbnailList = (newOptions: ImageOption[]) => {
    //   onChange?.(newOptions);
    //   setThumbnailImageInfoList(newOptions);
    // };

    // const handleRemove = (deleteOption: ImageOption) => {
    //   if (imageStorageType === 'public') deleteImageFile(deleteOption.path);
    // };

    const handleRemove = (fileUuid: string) => {
      const file = thumbnailFiles.find((file) => file.fileUuid === fileUuid);
      onRemove(file!.id);
    };

    // /**
    //  * `useS3Uploader` 훅의 `thumbnailStats` 상태가 변경될 때마다 실행됩니다.
    //  * 특히 파일 업로드가 'completed' 상태가 되면, 업로드된 파일 정보를 썸네일 목록에 추가합니다.
    //  */
    // useEffect(() => {
    //   if (status === 'completed') {
    //     const file = thumbnailFiles[0];
    //     if (file) {
    //       const newOption = {
    //         ...file,
    //         id: file?.id,
    //         path: S3_URL + file?.key,
    //       };
    //       const newThumbnailImageInfoList = [...thumbnailImageInfoList, newOption];
    //       setThumbnailImageInfoList(newThumbnailImageInfoList);
    //       onChange?.(newThumbnailImageInfoList);
    //     }
    //   }
    // }, [status]);
    /**
     * `ownerOptions` prop (부모 컴포넌트로부터 받은 썸네일 목록)이 변경될 때마다
     * 내부 `options` 상태를 동기화합니다.
     */
    // useEffect(() => {
    //   if (ownerOptions) {
    //     setThumbnailImageInfoList(ownerOptions);
    //   }
    // }, [ownerOptions]);

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
              direction={'column'}
            >
              <span className={styles.text}>{'썸네일 업로드'}</span>
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              multiple={multiple}
              disabled={disabled}
              className={styles.input_file}
              onChange={handleFilesChange}
              accept={inputAccept}
            />
          </div>

          {values.isLoading && (
            <div className={styles.loading}>
              <span className={styles.text}>
                <IcoLoading width={24} height={24} stroke="#747d91" className={styles.icon} />
                {'동영상 추출중'}
              </span>
            </div>
          )}

          {/*썸네일 리스트*/}
          <ThumbnailList
            showDefault={showDefault}
            files={values.files || []}
            checked={checkedFileId}
            onChecked={setCheckedFileId}
            onRemove={handleRemove}
          />
        </div>
        {/*설명*/}
        <p className={styles.description}>{description}</p>
      </div>
    );
  },
);

export const ThumbnailImageUpload = ThumbnailImageUploadComponent;
