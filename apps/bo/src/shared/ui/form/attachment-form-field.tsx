// IA011 / NLP_BO_PMS_1100_5
import { forwardRef, useEffect, useState } from 'react';
import { Attachment } from '@learnway/ui'; // @learnway/ui에서 Attachment 컴포넌트 import
import {
  BaseFormFieldProps,
  S3UploaderConfig,
  useFileManager,
  useS3Uploader,
} from '@learnway/hooks'; // @learnway/hooks에서 폼 필드 기본 props 타입 import
import { compact, difference, map } from 'lodash';

/**
 * AttachmentFormField 컴포넌트의 props 인터페이스
 * 폼 필드로서 Attachment 컴포넌트를 래핑하여 폼 시스템과 통합합니다.
 */
interface AttachmentFormFieldProps extends BaseFormFieldProps<string[] | string | null> {
  uploadConfig: S3UploaderConfig;
  uuidType: 'files' | 'group';
}

/**
 * 폼 필드용 썸네일 이미지 업로드 컴포넌트
 * `Attachment` 컴포넌트를 래핑하여 폼 시스템의 `value`와 `onChange` 패턴을 따릅니다.
 * 이 컴포넌트는 `string[]` 타입의 `value`를 `ImageOption[]` 타입으로 변환하여 내부 `Attachment`에 전달하고,
 * `Attachment`의 `ImageOption[]` 변경을 다시 `string[]`으로 변환하여 부모 폼에 전달합니다.
 * `forwardRef`를 사용하여 부모 폼 컴포넌트에서 이 필드의 DOM 요소에 접근할 수 있도록 합니다.
 */
const AttachmentFormFieldComponent = forwardRef<
  HTMLDivElement, // Ref 타입: 렌더링할 최상위 div 요소
  AttachmentFormFieldProps // 컴포넌트 props 타입
>(
  (
    {
      uploadConfig,
      name,
      value,
      onChange,
      type,
      uuidType = 'files',
      ...props // 나머지 HTMLDivElement 속성들
    },
    ref, // forwardRef로 전달받은 Ref 객체
  ) => {
    const {
      s3Path,
      affairsType,
      languageCode,
      groupUuid: _groupUuid,
      groupMode = 'batch',
      auto = true,
      async = true,
      acceptFiles = [],
      maxFileCount = 10,
      maxFileSize = 5 * 1024 * 1024,
    } = uploadConfig;

    const { getFileInfo, getGroupInfo } = useFileManager();
    const {
      stats,
      files,
      addFiles,
      onPause,
      onRetry,
      onResume,
      onRemove,
      onFetch,
      inputAccept,
      groupUuid,
    } = useS3Uploader({
      s3Path,
      affairsType,
      languageCode,
      groupUuid: _groupUuid,
      groupMode,
      auto,
      async,
      acceptFiles,
      maxFileCount,
      maxFileSize,
    });

    const [fileUuids, setFileUuids] = useState<string[]>([]);

    /**
     * 서버에서 파일정보를 가져와서 files에 추가
     */
    async function fetchFileInfo(uuids: string[]) {
      const fileInfos = await Promise.all(uuids.map(getFileInfo));
      onFetch(fileInfos);
    }

    async function fetchGroupInfo(groupUuid: string) {
      const groupInfo = await getGroupInfo(groupUuid);
      fetchFileInfo(groupInfo.files.map((_) => _.fileUuid));
    }

    /**
     * uuidType이 files일 때
     * value 가 변경될 때마다 fileUuids를 set
     *
     * uuidType이 group일 때
     * value 가 변경될 때마다 group 데이터를 fetch함
     */
    useEffect(() => {
      if (uuidType === 'group') {
        if (value && value !== groupUuid) fetchGroupInfo(value as string);
        return;
      }

      setFileUuids(value as string[]);
    }, [value]); // `value` prop이 변경될 때마다 실행

    /**
     * fileUuid가 변경될 때마다 기존 files와 비교하여 추가된 파일이 있는 경우 서버에서 fetch 실행
     */
    useEffect(() => {
      if (uuidType === 'group') return;
      const uploadFileUuid = compact(
        map(
          files.filter(({ status }) => ['fetched', 'completed'].includes(status)),
          ({ fileUuid }) => fileUuid,
        ),
      );
      const existed = difference(fileUuids, uploadFileUuid);
      if (existed.length) {
        fetchFileInfo(existed);
      }
    }, [fileUuids]);

    /**
     * files가 변경될 때마다 기존 fileUuid와 비교하여
     * 변경이 있는 경우 onChange를 실행하여 상위 react-form으로 전달함
     */
    useEffect(() => {
      if (uuidType === 'group') return;
      const uploadedFileUuid = compact(
        map(
          files.filter(({ status }) => ['fetched', 'completed'].includes(status)),
          ({ fileUuid }) => fileUuid,
        ),
      );
      const added = difference(uploadedFileUuid, fileUuids);
      const removed = difference(fileUuids, uploadedFileUuid);
      if (added.length || removed.length) {
        onChange(uploadedFileUuid);
      }
    }, [files]);

    /**
     * uuidType이 group일 때 groupUUid 변경시
     * onChange를 실행하여 상위 react-form으로 전달함
     */
    useEffect(() => {
      if (uuidType !== 'group' || value === groupUuid) return;
      onChange(groupUuid);
    }, [groupUuid]);

    return (
      <>
        <Attachment
          files={files}
          addFiles={addFiles}
          onRemove={onRemove}
          onPause={onPause}
          onResume={onResume}
          onRetry={onRetry}
          inputAccept={inputAccept}
          maxFileCount={maxFileCount}
          maxFileSize={maxFileSize}
          wrapSize={'lg'}
          {...props}
        />
        <input type="hidden" name={name} value={fileUuids} />
      </>
    );
  },
);

// 폼 필드 컴포넌트 내보내기
export const AttachmentFormField = AttachmentFormFieldComponent;
