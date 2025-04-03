/* eslint-disable jsx-a11y/alt-text */
import React, { forwardRef, useState } from 'react';

import { CheckedState } from '@radix-ui/react-checkbox';

import { cn } from '@learnway/shared';
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';
import { IcoTrash03 } from '@learnway/icons';
import styles from './thumbnail.module.css';

export interface ThumbnailProps {
  /** variant */
  variant?: 'primary' | 'secondary';
  /** size */
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  /** className */
  className?: string;
  /** 가로 사이즈 */
  width?: number;
  /** 세로 사이즈 */
  height?: number;
  /** 이미지 경로 */
  path: string;
  /** index 번호 (list type 에서 index 번호 확인시 사용) */
  indexNumber?: number;
  /** 파일 사이즈*/
  sizeText?: string;
  /** 체크박스 표시 여부 */
  showCheckbox?: boolean;
  /** 삭제버튼 표시 여부 */
  showDeleteBtn?: boolean; // delete button
  /** 선택 여부 (check style 에 사용) */
  selected?: boolean;
  /** 카운트 체크 여부 */
  count?: boolean;
  /** 체크 변경 이벤트 */
  onCheckedChange?: (checked: CheckedState) => void;
}

const ThumbnailComponent = forwardRef<HTMLElement, ThumbnailProps>(
  ({
    className,
    variant,
    size,
    width,
    height,
    path,
    indexNumber,
    sizeText,
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
        style={{ width: width ? `${width}px` : '', height: height ? `${height}px` : '' }}
        className={cn(styles.start, styles.thumbnail, 'nlp--thumbnail', {
          [styles.active]: isHovered,
          [styles.selected]: selected,
        })}
        onMouseEnter={() => handleHover(true)} // 마우스 오버 시
        onMouseLeave={() => handleHover(false)}>
        {/* index 번호 */}
        {indexNumber !== null && <span className={styles.indexNumber}>{indexNumber}</span>}
        {/* 체크박스 */}
        {showCheckbox && (
          <Checkbox
            className={cn(styles.checkbox)}
            variant="round"
            hideLabel
            onCheckedChange={onCheckedChange}
          />
        )}
        {/* 파일 사이즈 텍스트 */}
        {sizeText && <span className={styles.sizeText}>{sizeText}</span>}
        {/* 마우스 오버시 노출 */}
        {showDeleteBtn && isHovered && (
          <Button className={styles.btn_delete}>
            <IcoTrash03 className={styles.icon_delete} width={24} height={24} stroke="#ffffff" />
          </Button>
        )}
        <img src={path} className={styles.thumbnail_image} alt="Thumbnail" />
        {/* 시스템에서 제공하는 기본이미지인 경우 styles.default_image 클래스 추가 필요 */}
      </div>
    );
  },
);

export const Thumbnail = ThumbnailComponent;
