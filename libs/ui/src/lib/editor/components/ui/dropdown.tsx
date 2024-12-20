import { FC, MouseEvent, useState, useRef, useMemo } from 'react';
import { DropdownProps, DropdownItem as IDropDownItem } from './type';
import Icon from './icon';
import DropdownItem from './dropdown-item';
import { useOnClickOutside } from 'usehooks-ts';

const DropDown: FC<DropdownProps> = ({
  icon,
  label,
  items,
  children,
  active = false,
  disable = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const activeItem = useMemo<IDropDownItem | undefined>(
    () => (items ? items.find((item) => item.active) : undefined),
    [items],
  );
  /**
   * 버튼 클릭 이벤트
   * @param event
   */
  const handleDropdownOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disable) {
      setOpen((state) => !state);
    }
  };
  /**
   * 컴포넌트 이외의 영역 클릭 이벤트
   */
  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref} className={'relative'}>
      <button
        className={`border-0 flex bg-none rounded-[10px] p-[8px] align-middle disabled:cursor-not-allowed ${
          active ? 'bg-blue-100' : 'bg-none'
        } ${!disable ? 'hover:bg-gray-200' : ''}`}
        onClick={handleDropdownOnClick}>
        {icon && <Icon icon={icon} className={`flex w-[20px] h-[20px] select-none`} />}
        {!icon && activeItem && (
          <>
            {activeItem.icon && (
              <Icon
                icon={activeItem.icon}
                className={`flex w-[20px] h-[20px] mr-[8px] select-none`}
              />
            )}
            <span>{activeItem.label}</span>
          </>
        )}
        {label && <span>{label}</span>}
        <Icon
          icon={'chevronDown'}
          className={`mt-[3px] w-[16px] h-[16px] flex select-none ml-[8px]`}
        />
      </button>
      {open && (
        <div
          className={
            'absolute mt-[5px] z-[100] block fixed shadow-[0_12px_28px_0_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] rounded-lg min-h-[40px] bg-white'
          }>
          {items &&
            items.map((item, index) => (
              <DropdownItem
                key={item.value}
                item={item}
                className={`${index === 0 ? 'mt-[8px]' : ''}`}
              />
            ))}
          {!items && children && children}
        </div>
      )}
    </div>
  );
};
export default DropDown;
