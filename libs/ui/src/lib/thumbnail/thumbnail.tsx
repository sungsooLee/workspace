/* eslint-disable jsx-a11y/alt-text */
import React, { forwardRef, useState } from 'react';

import { CheckedState } from '@radix-ui/react-checkbox';

import { cn } from '@learnway/shared';
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';
import { IcoTrash03 } from '@learnway/icons';
import styles from './thumbnail.module.css';

export interface ThumbnailComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  className?: string;
  width?: number;
  height?: number;
  path: string;
  showCheckbox?: boolean;
  showDeleteBtn?: boolean; // delete button
  selected?: boolean;
  onCheckedChange?: (checked: CheckedState) => any;
  // checked?: boolean;
}

const ThumbnailComponent = forwardRef<HTMLElement, ThumbnailComponentProps>(
  ({
    className,
    variant,
    size,
    width,
    height,
    path,
    showCheckbox,
    showDeleteBtn,
    selected,
    onCheckedChange,
    ...props
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleHover = (state: boolean) => setIsHovered(state);
    return (
      <div
        {...props}
        style={{ width: width ? width + 'px' : '', height: height ? height + 'px' : '' }}
        className={cn(styles.start, styles.thumbnail, 'nlp--thumbnail', {
          [styles.active]: isHovered,
          [styles.selected]: selected,
        })}
        onMouseEnter={() => handleHover(true)} // 마우스 오버 시
        onMouseLeave={() => handleHover(false)}>
        {/* checkbox */}
        {showCheckbox && (
          <Checkbox
            className={cn(styles.checkbox)}
            variant="round"
            hideLabel={true}
            onCheckedChange={onCheckedChange}
          />
        )}
        {/* 마우스 오버시 노출 */}
        {showDeleteBtn && isHovered && (
          <Button className={styles.btn_delete}>
            <IcoTrash03 className={styles.icon_delete} width={24} height={24} stroke="#ffffff" />
          </Button>
        )}
        <img src={path} className={styles.thumbnail_image} />
        {/* 시스템에서 제공하는 기본이미지인 경우 styles.default_image 클래스 추가 필요 */}
      </div>
    );
  },
);

export const Thumbnail = ThumbnailComponent;
