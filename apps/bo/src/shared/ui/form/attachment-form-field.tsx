import { forwardRef, useEffect, useState } from 'react';
import { Attachment } from '@learnway/ui'; // @learnway/ui에서 Attachment 컴포넌트 import
import { BaseFormFieldProps, useS3Uploader } from '@learnway/hooks'; // @learnway/hooks에서 폼 필드 기본 props 타입 import
import { LEARNING_TYPE } from '@learnway/config';
import { t } from 'i18next';

/**
 * AttachmentFormField 컴포넌트의 props 인터페이스
 * 폼 필드로서 Attachment 컴포넌트를 래핑하여 폼 시스템과 통합합니다.
 */
interface AttachmentFormFieldProps extends BaseFormFieldProps<string[]> {
  /**
   * 더미 속성 (현재 코드에서 사용되지 않음)
   * @deprecated 이 prop은 현재 코드에서 사용되지 않습니다.
   */
  dummy?: any;

  type: LEARNING_TYPE;
}

const acceptFiles = {
  [LEARNING_TYPE.VIDEO]: [
    'MP4',
    'WMV',
    'TS',
    'AVI',
    'MKV',
    'MTS',
    'MOV',
    'MXF',
    'MPEG',
    'MPG',
    'WEBM',
    'ASF',
    'SKM',
    'K3G',
  ],
};

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
      value, // 폼 필드의 현재 값 (string[] 타입, 이미지 경로 배열)
      onChange, // 폼 필드 값이 변경될 때 호출되는 콜백 함수
      type,
      ...props // 나머지 HTMLDivElement 속성들
    },
    ref, // forwardRef로 전달받은 Ref 객체
  ) => {
    const maxFileCount = 3;
    const maxFileSize = 1024 * 1024 * 10;
    const { stats, files, addFiles, onPause, onRetry, onResume, onRemove } = useS3Uploader({
      s3Path: 'upload/content/original',
      maxFileCount,
      acceptFiles: acceptFiles[type],
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleAddFiles = (files: File[]) => {
      setErrorMessage('');
      addFiles(files);
    };

    /**
     * `value` prop (부모 폼으로부터 받은 이미지 경로 배열)이 변경될 때마다
     * 내부 `options` 상태를 동기화합니다.
     * 이를 통해 폼 외부에서 `value`가 변경되어도 UI가 올바르게 업데이트됩니다.
     */
    useEffect(() => {
      // setFiles(valueToOptions(value));
    }, [value]); // `value` prop이 변경될 때마다 실행

    // `Attachment` 컴포넌트를 렌더링하고 필요한 props를 전달합니다.
    return (
      <Attachment
        files={files}
        maxFileCount={maxFileCount}
        maxFileSize={maxFileSize}
        addFiles={handleAddFiles}
        acceptFiles={acceptFiles[type]}
        onRemove={onRemove}
        onPause={onPause}
        onResume={onResume}
        onRetry={onRetry}
        guideText={t('LABEL.message.learningResourceFileUploadModal.uploaderGuideText')}
        errorMessage={errorMessage}
        wrapSize={'lg'}
        {...props} // Attachment에 전달될 수 있는 나머지 props (예: className)
      />
    );
  },
);

// 폼 필드 컴포넌트 내보내기
export const AttachmentFormField = AttachmentFormFieldComponent;
