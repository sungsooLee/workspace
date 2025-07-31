import { forwardRef } from 'react';
import { ThumbnailPublicUpload } from '@learnway/ui/file-upload'; // @learnway/ui에서 ThumbnailImageUpload 컴포넌트 import
import { BaseFormFieldProps, S3_PATH_TYPE } from '@learnway/hooks'; // @learnway/hooks에서 폼 필드 기본 props 타입 import

/**
 * ThumbnailImageUploadFormField 컴포넌트의 props 인터페이스
 * 폼 필드로서 ThumbnailImageUpload 컴포넌트를 래핑하여 폼 시스템과 통합합니다.
 */
interface ThumbnailImageUploadFormFieldV2Props extends BaseFormFieldProps<string[]> {
  /**
   * 더미 속성 (현재 코드에서 사용되지 않음)
   * @deprecated 이 prop은 현재 코드에서 사용되지 않습니다.
   */
  dummy?: any;
  max?: number;
  s3Path?: S3_PATH_TYPE;
}

/**
 * 폼 필드용 썸네일 이미지 업로드 컴포넌트
 * `ThumbnailImageUpload` 컴포넌트를 래핑하여 폼 시스템의 `value`와 `onChange` 패턴을 따릅니다.
 * 이 컴포넌트는 `string[]` 타입의 `value`를 `ImageOption[]` 타입으로 변환하여 내부 `ThumbnailImageUpload`에 전달하고,
 * `ThumbnailImageUpload`의 `ImageOption[]` 변경을 다시 `string[]`으로 변환하여 부모 폼에 전달합니다.
 * `forwardRef`를 사용하여 부모 폼 컴포넌트에서 이 필드의 DOM 요소에 접근할 수 있도록 합니다.
 */
const ThumbnailPublicFormFieldComponent = forwardRef<
  HTMLDivElement, // Ref 타입: 렌더링할 최상위 div 요소
  ThumbnailImageUploadFormFieldV2Props // 컴포넌트 props 타입
>(
  (
    props,
    ref, // forwardRef로 전달받은 Ref 객체
  ) => {
    const {
      clearAllValidators,
      addValidator,
      registerField,
      originalValues,
      onFormChange,
      fieldRefs,
      subText,
      guideText,
      getValues,
      setValue,
      onFormFocus,
      watch,
      error,
      ...newProps
    } = props;
    return (
      <ThumbnailPublicUpload
        ref={ref} // forwardRef로 받은 Ref를 ThumbnailImageUpload 컴포넌트에 연결
        {...newProps} // ThumbnailImageUpload에 전달될 수 있는 나머지 props (예: className)
      />
    );
  },
);

// 폼 필드 컴포넌트 내보내기
export const ThumbnailPublicFormField = ThumbnailPublicFormFieldComponent;
