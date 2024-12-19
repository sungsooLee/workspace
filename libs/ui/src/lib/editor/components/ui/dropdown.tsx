import { FC } from 'react';
import { DropdownProps } from './type';
import Icon from './icon';

const DropDown: FC<DropdownProps> = ({ icon }) => {
  return (
    <button className={`border-0 flex bg-none rounded-[10px] p-[8px] align-middle`}>
      <Icon icon={`heading1`} className={`flex w-[20px] h-[20px] mr-[8px] select-none`} />
      <span>Heading1</span>
      <Icon icon={'chevronDown'} className={`mt-[3px] w-[16px] h-[16px] flex select-none`} />
    </button>
  );
};
export default DropDown;
