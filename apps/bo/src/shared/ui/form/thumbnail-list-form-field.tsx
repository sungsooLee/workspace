// IA011 / NLP_BO_PMS_1100_05_01
import { Dispatch, forwardRef, SetStateAction, useEffect, useState } from 'react';
import { ImageOption, ThumbnailImageUpload } from '@learnway/ui'; // @learnway/ui에서 ThumbnailImageUpload 컴포넌트 import
import {
  S3UploaderConfig,
  BaseFormFieldProps,
  ThumbnailFileValue,
  useFileManager,
} from '@learnway/hooks'; // @learnway/hooks에서 폼 필드 기본 props 타입 import
import { difference, first, isArray, isEqual, uniq } from 'lodash';

/**
 * ThumbnailImageUploadFormField 컴포넌트의 props 인터페이스
 * 폼 필드로서 ThumbnailImageUpload 컴포넌트를 래핑하여 폼 시스템과 통합합니다.
 */
interface ThumbnailImageUploadFormFieldProps extends BaseFormFieldProps<string[] | string> {
  uploadConfig?: S3UploaderConfig;
  max?: number;
  uuidType: 'files' | 'group';
  showDefault?: boolean;
  isLoading?: boolean;
  selected: string;
  onSelected: (uuid: string) => void;
  // imageStorageType?: 'public' | 'db-manage';
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
      // imageStorageType = 'public',
      value, // 폼 필드의 현재 값 (string[] 타입, 이미지 경로 배열)
      onChange, // 폼 필드 값이 변경될 때 호출되는 콜백 함수
      uploadConfig,
      uuidType = 'group',
      ...props // 나머지 HTMLDivElement 속성들
    },
    ref, // forwardRef로 전달받은 Ref 객체
  ) => {
    const { getGroupInfo, getFileInfo } = useFileManager();

    // keep value
    const [values, setValues] = useState<ThumbnailFileValue>({});
    // console.log('🚀 ~ ThumbnailImageUploadFormFieldComponent ~ values:', values);

    async function fetchFileInfo(uuids: string[]) {
      const fileInfos = await Promise.all(uuids.map(getFileInfo));
      const groupUuids = uniq(fileInfos.map((file) => file.group!.groupUuid));
      setValues({
        groupUuid: first(groupUuids),
        files: fileInfos,
      });
    }

    async function fetchGroupInfo(groupUuid: string) {
      const groupInfo = await getGroupInfo(groupUuid);
      if (groupInfo.files.length === 0)
        return setValues({
          groupUuid,
          files: [],
        });

      return fetchFileInfo(groupInfo.files.map((_) => _.fileUuid));
    }

    useEffect(() => {
      if (uuidType === 'group') {
        if (value) fetchGroupInfo(value as string);
        return;
      }
      if ((value || []).length) fetchFileInfo(value as string[]);
    }, [value]);

    useEffect(() => {
      if (uuidType === 'group' && values.groupUuid) {
        if (value !== values.groupUuid) onChange(values?.groupUuid || '');
        if (values.files?.find((_) => !_.group)) fetchGroupInfo(values.groupUuid);
        return;
      }
      const exists = value as string[];
      const changes = values?.files?.map((_) => _.fileUuid) || [];
      const added = difference(changes, exists);
      const removed = difference(exists, changes);
      if (added.length || removed.length) onChange(changes);
    }, [values]);

    // 폼 필드의 'value' (string[] 타입)를 'ThumbnailImageUpload'에서 사용할 'ImageOption[]' 타입으로 변환하여 내부 상태로 관리
    // const [options, setOptions] = useState<ImageOption[]>(valueToOptions(value));

    /**
     * `ThumbnailImageUpload` 컴포넌트에서 이미지 목록이 변경될 때 호출되는 핸들러입니다.
     * 이 핸들러는 `ThumbnailImageUpload`로부터 받은 `ImageOption[]`을 다시 `string[]`으로 변환하여
     * 폼 필드의 `onChange` 콜백을 호출하고 부모 폼 시스템에 변경된 값을 알립니다.
     * @param newOptions - `ThumbnailImageUpload`에서 전달받은 변경된 ImageOption 배열
     */
    // const handleChange = (newOptions: ImageOption[]) => {
    //   // ImageOption[]을 string[]으로 변환하여 폼 필드의 onChange 콜백 호출
    //   onChange?.(optionsToValue(newOptions));
    // };

    /**
     * `value` prop (부모 폼으로부터 받은 이미지 경로 배열)이 변경될 때마다
     * 내부 `options` 상태를 동기화합니다.
     * 이를 통해 폼 외부에서 `value`가 변경되어도 UI가 올바르게 업데이트됩니다.
     */
    // useEffect(() => {
    //   setOptions(valueToOptions(value));
    // }, [value]); // `value` prop이 변경될 때마다 실행

    // `ThumbnailImageUpload` 컴포넌트를 렌더링하고 필요한 props를 전달합니다.
    return (
      <ThumbnailImageUpload
        ref={ref} // forwardRef로 받은 Ref를 ThumbnailImageUpload 컴포넌트에 연결
        // imageStorageType={imageStorageType}
        values={values}
        onChangeValues={setValues}
        // options={options} // 내부 상태의 ImageOption[] 배열을 options prop으로 전달
        // onChange={handleChange} // ThumbnailImageUpload의 onChange 이벤트를 커스텀 핸들러와 연결
        uploadConfig={uploadConfig}
        {...props} // ThumbnailImageUpload에 전달될 수 있는 나머지 props (예: className)
      />
    );
  },
);

// 폼 필드 컴포넌트 내보내기
export const ThumbnailListFormField = ThumbnailImageUploadFormFieldComponent;
