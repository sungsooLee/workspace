import React, { forwardRef } from 'react';
import { InputProps, ThumbnailImageUpload } from '@learnway/ui';
import { ImageOption } from '@/libs/ui/src/lib/thumbnail/type';
import { BaseFormFieldProps } from '@learnway/hooks';
import { ModalConfig } from '@/libs/ui/src/lib/modal/type';

interface ThumbnailImageUploadFormFieldProps extends BaseFormFieldProps<ImageOption[]> {
  modalConfig: ModalConfig;
  input?: InputProps;
  onClick?: (value?: any) => void;
  /** modalData 에서 받은 내용의 조작을 위한 함수 - onFormChange(modalData) 시 사용 */
  transformModalData?: (modalData?: any) => void;
}

const ThumbnailImageUploadFormFieldComponent = forwardRef<
  HTMLDivElement,
  ThumbnailImageUploadFormFieldProps
>(({ value, onChange }, ref) => {
  const handleChange = (options: ImageOption[]) => {
    onChange?.(options);
  };

  return (
    <ThumbnailImageUpload
      options={value}
      onChange={handleChange}
      // onImageSelect={handlerImageSelect}
      // onChange={(options: ImageOption[]) => console.log('onChange', options)}
      // onCheckedChange={(options: ImageOption[]) => console.log('onCheckedChange', options)}
    />
  );
});

export const ThumbnailListFormField = ThumbnailImageUploadFormFieldComponent;
