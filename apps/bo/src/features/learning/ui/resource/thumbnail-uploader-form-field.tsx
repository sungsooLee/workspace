import { FC } from 'react';
import { ThumbnailImageUpload } from '@learnway/ui';
import { ImageOption } from '@/libs/ui/src/lib/thumbnail/type';
import defaultImg from '../../../../assets/images/thumb/img_thumb_default.jpg';
const ThumbnailUploaderFormFieldComponent: FC<any> = () => {
  return (
    <ThumbnailImageUpload
      options={[
        /* 동영상 추출 전 */
        // { id: '1', path: defaultImg },
        /* 동영상 추출 후 */
        { id: '1', path: 'https://picsum.photos/200' },
        { id: '6', path: defaultImg } /* default 추천 썸네일 */,
      ]}
      onChange={(options: ImageOption[]) => console.log('onChange', options)}
      onCheckedChange={(options: ImageOption[]) => console.log('onCheckedChange', options)}
    />
  );
};

export const ThumbnailUploaderFormField = ThumbnailUploaderFormFieldComponent;
