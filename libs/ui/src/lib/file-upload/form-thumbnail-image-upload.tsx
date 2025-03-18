import { FC } from 'react';
import { ThumbnailImageUpload } from './thumbnail-image-upload';
import { ImageOption } from '../thumbnail/type';

/**
 * 공통 Form Chips List
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const FormThumbnailImageUploadComponent: FC<any> = ({
  value,
  onChange: ownerOnChange,
  ...props
}) => {
  const handleChange = (options: ImageOption[]) => {
    ownerOnChange(options);
  };
  console.log(value);
  return <ThumbnailImageUpload {...props} options={value} onChange={handleChange} />;
};
export const FormThumbnailImageUpload = FormThumbnailImageUploadComponent;
