import { forwardRef, useEffect, useState } from 'react';
import {
  Button,
  ButtonComponentProps,
  ChipList,
  SelectOption,
  useModalControl,
} from '@learnway/ui';
import { TeacherList } from './teacher-list';

export interface FormTeacherChipListProps {
  value?: any[];
  onChange?: (value: any[]) => void;
  button?: ButtonComponentProps;
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const FormTeacherChipListComponent = forwardRef<HTMLDivElement, FormTeacherChipListProps>(
  ({ value = [], onChange: ownerOnChange, button = {}, ...props }, ref) => {
    const { open: openModal } = useModalControl();
    const [selectedChipOptions, setSelectedChipOptions] = useState<SelectOption[]>(value);

    const {
      type = 'button',
      variant = 'point',
      size = 'sm',
      label = '선택',
      onClick: buttonOnClick,
    } = button;

    useEffect(() => {
      ownerOnChange?.(selectedChipOptions);
    }, [selectedChipOptions]);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // const newChip = buttonOnClick?.(event);
      openModal(<TeacherList />, { title: '강사 목록' }, (e) => {
        console.log(e);
      });
    };

    const handleChipListChange = (event: SelectOption[]) => {
      // setSelectedChipOptions(event);
    };

    return (
      <div ref={ref} className={'flex flex-row'}>
        <Button label={label} variant={variant} size={size} onClick={handleButtonClick} />
        <ChipList options={selectedChipOptions} onChange={handleChipListChange} />
      </div>
    );
  },
);
export const FormTeacherChipList = FormTeacherChipListComponent;
