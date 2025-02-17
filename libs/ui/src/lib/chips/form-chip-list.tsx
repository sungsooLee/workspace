import { FC } from 'react';
import { ChipList } from './chip-list';
import { SelectOption } from '../select/type';

/**
 * 공통 Form Chips List
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const FormChipListComponent: FC<any> = ({ value, onChange: ownerOnChange, ...props }) => {
  const handleChange = (event: SelectOption[]) => {
    ownerOnChange(event);
  };

  return <ChipList {...props} options={value} onChange={handleChange} />;
};
export const FormChipList = FormChipListComponent;
