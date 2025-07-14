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
  convertUploadFilesToFileInfos,
  S3_PATH,
  S3UploaderConfig,
  ThumbnailFileValue,
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
  isLoading?: boolean;
  selected: string;
  onSelected: (uuid: string) => void;
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
      isLoading,
      ...props
    },
    ref,
  ) => {
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

    const [selected, onSelected] = useState<string | null>(null);

    useEffect(() => {
      if (props.selected !== selected) onSelected(props.selected);
    }, [props.selected]);

    function handleSelect(uuid: string | null) {
      onSelected(uuid);
      props.onSelected(uuid || '');
    }

    useEffect(() => {
      setGroupUuid(values.groupUuid || '');
    }, [values.groupUuid]);

    useEffect(() => {
      if (groupUuid !== values.groupUuid) onChangeValues((prev) => ({ ...prev, groupUuid }));
    }, [groupUuid]);

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
      if (existed.length > 0)
        onFetch(values.files?.filter((_) => existed.includes(_.fileUuid)) || []);
    }, [values.files]);

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
        onChangeValues((prev) => ({
          ...prev,
          files: convertUploadFilesToFileInfos(thumbnailFiles),
        }));
      }
    }, [thumbnailFiles]);

    const disabled = useMemo(
      () =>
        maxFileCount <=
        (values.files?.filter((file) => !file.originalFileName.startsWith('sys-')) || []).length,
      [values.files, maxFileCount],
    );

    const multiple = useMemo(() => maxFileCount > 1, [maxFileCount]);

    /**
     * '업로드' 버튼 클릭 시 파일 선택창을 엽니다.
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
        thumbnailAddFiles(Array.from(files));
      }
    };

    const handleRemove = (fileUuid: string) => {
      const file = thumbnailFiles.find((file) => file.fileUuid === fileUuid);
      onRemove(file!.id);
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

          {isLoading && (
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
            checked={selected}
            onChecked={handleSelect}
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
