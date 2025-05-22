import React, { forwardRef, useEffect } from 'react';
import { ThumbnailImageUpload } from '@learnway/ui'; // @learnway/ui에서 ThumbnailImageUpload 컴포넌트 import
import { ImageOption } from '@/libs/ui/src/lib/thumbnail/type'; // ImageOption 타입 import (절대 경로 사용)
import { BaseFormFieldProps } from '@learnway/hooks'; // @learnway/hooks에서 폼 필드 기본 props 타입 import

/**
 * ThumbnailImageUploadFormField 컴포넌트의 props 인터페이스
 * 폼 필드로서 ThumbnailImageUpload 컴포넌트를 래핑하여 폼 시스템과 통합합니다.
 */
interface ThumbnailImageUploadFormFieldProps extends BaseFormFieldProps<string[]> {
  /**
   * 더미 속성 (현재 코드에서 사용되지 않음)
   * @deprecated 이 prop은 현재 코드에서 사용되지 않습니다.
   */
  dummy?: any;
}

/**
 * 폼 필드용 썸네일 이미지 업로드 컴포넌트
 * `ThumbnailImageUpload` 컴포넌트를 래핑하여 폼 시스템의 `value`와 `onChange` 패턴을 따릅니다.
 * 이 컴포넌트는 `string[]` 타입의 `value`를 `ImageOption[]` 타입으로 변환하여 내부 `ThumbnailImageUpload`에 전달하고,
 * `ThumbnailImageUpload`의 `ImageOption[]` 변경을 다시 `string[]`으로 변환하여 부모 폼에 전달합니다.
 * `forwardRef`를 사용하여 부모 폼 컴포넌트에서 이 필드의 DOM 요소에 접근할 수 있도록 합니다.
 */
const ThumbnailImageUploadFormFieldComponent = forwardRef<
  HTMLDivElement, // Ref 타입: 렌더링할 최상위 div 요소
  ThumbnailImageUploadFormFieldProps // 컴포넌트 props 타입
>(
  (
    {
      value, // 폼 필드의 현재 값 (string[] 타입, 이미지 경로 배열)
      onChange, // 폼 필드 값이 변경될 때 호출되는 콜백 함수
      ...props // 나머지 HTMLDivElement 속성들
    },
    ref, // forwardRef로 전달받은 Ref 객체
  ) => {
    // 폼 필드의 'value' (string[] 타입)를 'ThumbnailImageUpload'에서 사용할 'ImageOption[]' 타입으로 변환하여 내부 상태로 관리
    const [options, setOptions] = React.useState<ImageOption[]>(valueToOptions(value));

    /**
     * `ThumbnailImageUpload` 컴포넌트에서 이미지 목록이 변경될 때 호출되는 핸들러입니다.
     * 이 핸들러는 `ThumbnailImageUpload`로부터 받은 `ImageOption[]`을 다시 `string[]`으로 변환하여
     * 폼 필드의 `onChange` 콜백을 호출하고 부모 폼 시스템에 변경된 값을 알립니다.
     * @param newOptions - `ThumbnailImageUpload`에서 전달받은 변경된 ImageOption 배열
     */
    const handleChange = (newOptions: ImageOption[]) => {
      // ImageOption[]을 string[]으로 변환하여 폼 필드의 onChange 콜백 호출
      onChange?.(optionsToValue(newOptions));
    };

    /**
     * `value` prop (부모 폼으로부터 받은 이미지 경로 배열)이 변경될 때마다
     * 내부 `options` 상태를 동기화합니다.
     * 이를 통해 폼 외부에서 `value`가 변경되어도 UI가 올바르게 업데이트됩니다.
     */
    useEffect(() => {
      setOptions(valueToOptions(value));
    }, [value]); // `value` prop이 변경될 때마다 실행

    // `ThumbnailImageUpload` 컴포넌트를 렌더링하고 필요한 props를 전달합니다.
    return (
      <ThumbnailImageUpload
        ref={ref} // forwardRef로 받은 Ref를 ThumbnailImageUpload 컴포넌트에 연결
        options={options} // 내부 상태의 ImageOption[] 배열을 options prop으로 전달
        onChange={handleChange} // ThumbnailImageUpload의 onChange 이벤트를 커스텀 핸들러와 연결
        {...props} // ThumbnailImageUpload에 전달될 수 있는 나머지 props (예: className)
      />
    );
  },
);

// 폼 필드 컴포넌트 내보내기
export const ThumbnailListFormField = ThumbnailImageUploadFormFieldComponent;

/**
 * `string[]` 타입의 이미지 경로 배열을 `ImageOption[]` 타입으로 변환하는 헬퍼 함수입니다.
 * 각 경로 문자열은 `ImageOption` 객체의 `id`와 `path` 속성으로 매핑됩니다.
 * @param value - 이미지 경로 문자열 배열 (예: ['/path/to/image1.jpg', '/path/to/image2.png'])
 * @returns `ImageOption` 객체 배열
 */
const valueToOptions = (value: string[]): ImageOption[] => {
  // value가 null 또는 undefined인 경우 빈 배열 반환
  if (!value) {
    return [];
  }
  return value.map((path: string, index: number) => ({
    id: path + index, // 경로를 ID로 사용
    path, // 경로를 path로 사용
    // ImageOption의 다른 속성 (checked, readonly 등)은 기본값 또는 필요에 따라 추가
  }));
};

/**
 * `ImageOption[]` 타입의 배열을 `string[]` (이미지 경로 배열) 타입으로 변환하는 헬퍼 함수입니다.
 * 각 `ImageOption` 객체의 `path` 속성만 추출합니다.
 * @param options - `ImageOption` 객체 배열
 * @returns 이미지 경로 문자열 배열 (예: ['/path/to/image1.jpg', '/path/to/image2.png'])
 */
const optionsToValue = (options: ImageOption[]): string[] => {
  // options가 null 또는 undefined인 경우 빈 배열 반환
  if (!options) {
    return [];
  }
  return options.map((d: ImageOption) => d.path);
};
