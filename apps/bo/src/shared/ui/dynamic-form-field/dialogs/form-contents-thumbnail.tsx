import { FC } from 'react';
import './form-contents-thumbnail.css';
import { Checkbox } from '@learnway/ui';
const FormContentsThumbnailComponent: FC<any> = ({ name, fieldRefs, onChange, value }) => {
  const handleOnClick = () => {
    onChange([...value, { url: 'https://placehold.co/100x100', selected: false }]);
  };

  const handleSelectedChange = (selected, index) => {
    onChange(value.map((item, idx) => (idx === index ? { ...item, selected } : { ...item })));
  };

  const handleDeleteThumbnail = (index) => {
    onChange(value.filter((_, idx) => idx !== index));
  };
  return (
    <div ref={(ref) => (fieldRefs.current[name] = ref)} className={'form-contents-thumbnail'}>
      <div className={'fct-button'}>
        <button type={'button'} onClick={handleOnClick}>
          썸네일 업로드
        </button>
      </div>
      <div className={'fct-thumbnails'}>
        {value &&
          value.map((item, index) => (
            <div className="thumbnail" key={index}>
              {/* <button
                type={'button'}
                className={'delete'}
                onClick={() => handleDeleteThumbnail(idx)}>
                X
              </button>*/}
              <div className={'check-area'}>
                <Checkbox
                  checked={item.selected}
                  onCheckedChange={(checked) => handleSelectedChange(checked, index)}
                />
              </div>
              <img src={item.url} alt="Placeholder Image" />
            </div>
          ))}
      </div>
    </div>
  );
};
export const FormContentsThumbnail = FormContentsThumbnailComponent;
