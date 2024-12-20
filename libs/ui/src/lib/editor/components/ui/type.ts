// button props

import { icons } from '../../config/icon.config';
import { ReactNode } from 'react';

export type IconKey = keyof typeof icons;

export interface ButtonProps {
  icon: IconKey;
  active?: boolean; // 활성화 여부
  disable?: boolean; // disable 여부
  ariaLabel?: string; //
  onClick?: () => void; // 클릭 함수
  className?: string;
}

export interface DropdownItem {
  value: string; // 값
  label: string; // 라벨
  active?: boolean; // 활성화 여부
  icon?: IconKey; // 아이콘
}

export interface DropDownItemProps {
  item: DropdownItem;
  className?: string;
}

export interface DropdownProps {
  icon?: IconKey; // 아이콘
  label?: string; // 라벨
  active?: boolean; // 활성화 여부
  disable?: boolean; // disable 여부
  ariaLabel?: string; //
  className?: string;
  items?: DropdownItem[]; // 옵션, 옵션이 있으면 옵션이 우선
  children?: ReactNode; // 컴포넌트
}

export interface DropdownColorPickerProps {
  icon: IconKey;
  active?: boolean; // 활성화 여부
  disable?: boolean; // disable 여부
  ariaLabel?: string; //
  className?: string;
}
