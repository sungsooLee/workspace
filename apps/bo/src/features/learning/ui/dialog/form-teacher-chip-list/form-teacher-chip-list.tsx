import { forwardRef, useEffect, useState } from 'react';
import { t } from 'i18next';

import {
  Button,
  ButtonComponentProps,
  ChipList,
  ChipListComponentProps,
  useModalControl,
} from '@learnway/ui';
import { TeacherList } from './teacher-list';

export interface FormTeacherChipListProps {
  value?: any[];
  onChange?: (value: any) => void;
  button?: ButtonComponentProps;
  chipList?: ChipListComponentProps;
}

/**
 * 공통 form select chip list
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const FormTeacherChipListComponent = forwardRef<HTMLDivElement, FormTeacherChipListProps>(
  ({ value = [], onChange, button = {}, chipList, ...props }, ref) => {
    const { open: openModal } = useModalControl();
    const [selectedChipOptions, setSelectedChipOptions] = useState<any[]>(value);

    const { variant = 'point', size = 'sm', label = t('선택') } = button;

    useEffect(() => {
      console.log('>>>>> useEffect.selectedChipOptions', selectedChipOptions);
      onChange?.(selectedChipOptions);
    }, [selectedChipOptions]);

    const appendSelectedChipOptions = (newOption: any) => {
      const isDuplicated = !!selectedChipOptions?.find((d) => d.id === newOption.id); // 새로 등록하는 chips 중복 여부
      !isDuplicated && setSelectedChipOptions([...selectedChipOptions, newOption]);
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // const newChip = buttonOnClick?.(event);
      // 모달 오픈 - 강사 목록
      openModal(<TeacherList />, { title: '강사 목록' }, (newOption) => {
        console.log(newOption);
        newOption && appendSelectedChipOptions(newOption);
      });
    };

    const handleChipListChange = (newOptions: any[]) => {
      setSelectedChipOptions(newOptions);
    };

    return (
      <div ref={ref} className={'flex flex-row items-center gap-3'}>
        <Button label={label} variant={variant} size={size} onClick={handleButtonClick} />
        <ChipList
          labelField={'name'}
          valueField={'id'}
          options={selectedChipOptions}
          onChange={handleChipListChange}
        />
      </div>
    );
  },
);
export const FormTeacherChipList = FormTeacherChipListComponent;
