import { forwardRef } from 'react';
import './form-contents-thumbnail.css';
import { Checkbox } from '@learnway/ui';
import { CheckedState } from '@radix-ui/react-checkbox';

const FormContentsThumbnailComponent = forwardRef<HTMLDivElement, any>(
  ({ name, value, onChange }, ref) => {
    const handleOnClick = () => {
      onChange([...value, { url: 'https://placehold.co/100x100', selected: false }]);
    };

    const handleSelectedChange = (checked: CheckedState, index: number) => {
      const newValue = value.map((item: any, idx: number) =>
        idx === index ? { ...item, selected: checked } : { ...item },
      );
      onChange(newValue);
    };

    // const handleDeleteThumbnail = (index) => {
    //   onChange(value.filter((_, idx) => idx !== index));
    // };
    return (
      <div ref={ref}>
        <div className={'fct-button'}>
          <button type={'button'} onClick={handleOnClick}>
            썸네일 업로드
          </button>
        </div>
        <div className={'fct-thumbnails'}>
          {value?.map((item: any, index: number) => (
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
                  onCheckedChange={(checked: CheckedState) => handleSelectedChange(checked, index)}
                />
              </div>
              <img src={item.url} alt="Placeholder Image" />
            </div>
          ))}
        </div>
      </div>
    );
  },
);
export const FormContentsThumbnail = FormContentsThumbnailComponent;
