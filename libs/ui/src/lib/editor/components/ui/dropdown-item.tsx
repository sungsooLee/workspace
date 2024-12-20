import { FC } from 'react';
import { DropDownItemProps } from './type';
import Icon from './icon';
const DropdownItem: FC<DropDownItemProps> = ({
  item: { active = false, icon, label },
  className = '',
}) => {
  return (
    <button
      className={`w-full p-[8px] flex items-center disabled:cursor-not-allowed ${
        active ? 'bg-blue-100' : 'bg-none'
      } hover:bg-gray-200 ${className}`}>
      {icon && <Icon icon={icon} className={`mr-[12px]`} />}
      <span>{label}</span>
    </button>
  );
};
export default DropdownItem;
