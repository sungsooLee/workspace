import Dropdown from './dropdown';
import { FC } from 'react';
import { DropdownColorPickerProps } from './type';
import ColorPicker from './color-picker';

const DropdownColorPicker: FC<DropdownColorPickerProps> = ({ icon }) => {
  return (
    <Dropdown icon={icon}>
      <ColorPicker />
    </Dropdown>
  );
};

export default DropdownColorPicker;
