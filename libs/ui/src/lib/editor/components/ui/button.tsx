import { FC, MouseEvent } from 'react';
import { ButtonProps } from './type';
import Icon from './icon';

const DEFAULT_CLASS = `bg-contain h-[18px] w-[18px] mt-[2px] align-middle`;
/**
 * 에디터에서 사용되는 버튼
 * @constructor
 */
const Button: FC<ButtonProps> = ({
  icon,
  onClick,
  disable = false,
  active = false,
  ariaLabel = '',
  className = '',
}) => {
  /**
   * 버튼 엘리먼트의 클릭 콜백 호출 함수
   * @param event
   */
  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disable) {
      onClick && onClick();
    }
  };
  return (
    <button
      className={`border-0 flex rounded-lg p-[8px] cursor-pointer align-middle disabled:cursor-not-allowed ${
        active ? 'bg-blue-100' : 'bg-none'
      } ${!disable ? 'hover:bg-gray-200' : ''} ${className}`}
      disabled={disable}
      aria-label={ariaLabel}
      onClick={handleOnClick}>
      <Icon
        icon={icon}
        className={`${DEFAULT_CLASS} ${disable ? 'opacity-10' : 'opacity-60'} ${
          active ? 'opacity-100' : ''
        }`}
      />
    </button>
  );
};

export default Button;
