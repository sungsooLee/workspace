// button props

import { icons } from '../../config/icon.config';

export type IconKey = keyof typeof icons;

export interface ButtonProps {
  icon: IconKey;
  active?: boolean; // 활성화 여부
  disable?: boolean; // disable 여부
  ariaLabel?: string; //
  onClick?: () => void; // 클릭 함수
  className?: string;
}

export interface DropdownProps {
  icon: IconKey;
  active?: boolean; // 활성화 여부
  disable?: boolean; // disable 여부
  ariaLabel?: string; //
  className?: string;
}
