import React, { FC, ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  children: ReactNode; // 자식요소
  className?: string; // 클래스
  onClick?: () => void; // 버튼 클릭 callback
  disabled?: boolean; // 비활성화 여부
  active?: boolean; // 활성화 여부
}

/**
 * 툴바 버튼 컴포넌트, children 내용을 렌더링 한다.
 * @param children
 * @param className
 * @param onClick
 * @constructor
 */
const Button: FC<ButtonProps> = ({
  children,
  className = '',
  disabled = false,
  onClick,
  active = false,
}) => {
  /**
   * 버튼 클릭 이벤트 바인딩
   * @param e
   */
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    onClick && onClick();
  };
  return (
    <button
      onClick={handleOnClick}
      disabled={disabled}
      className={`flex justify-center items-center hover:bg-gray-3 rounded-lg disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:opacity-25 ${
        active ? 'bg-gray-2 text-gray-10' : ''
      } ${className}`}>
      {children}
    </button>
  );
};

export default Button;
