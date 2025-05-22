import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Thumbnail, ThumbnailProps } from './thumbnail';
import { Carousel } from '../carousel/carousel';

import styles from './thumbnail-list.module.css';
import { ImageOption } from './type';

export interface ThumbnailListComponentProps
  extends Omit<ThumbnailProps, 'onCheckedChange' | 'path' | 'id'> {
  /**
   * 썸네일 이미지 옵션 배열
   * 각 객체는 이미지 경로, ID, 체크 상태, 읽기 전용 여부 등을 포함합니다.
   */
  options: ImageOption[];
  /**
   * 체크박스 표시 여부
   */
  showCheckbox?: boolean;
  /**
   * 삭제 버튼 표시 여부
   */
  showDeleteButton?: boolean;
  /**
   * 썸네일의 체크 상태가 변경될 때 호출되는 콜백 함수
   * @param options - 체크 상태가 업데이트된 전체 ImageOption 배열
   */
  onCheckedChange?: (options: ImageOption[]) => void;
  /**
   * 썸네일 목록에서 옵션이 제거될 때 호출되는 콜백 함수
   * @param options - 제거된 후의 전체 ImageOption 배열
   */
  onRemoveOptions?: (options: ImageOption[]) => void; // 변경된 prop 이름
}

/**
 * 썸네일 이미지 목록 컴포넌트
 * 캐러셀 형태로 썸네일을 표시하며, 각 썸네일에 대한 체크 및 삭제 기능을 제공합니다.
 * `forwardRef`를 사용하여 부모 컴포넌트에서 이 컴포넌트의 DOM 요소에 접근할 수 있도록 합니다.
 */
const ThumbnailListComponent = forwardRef<HTMLDivElement, ThumbnailListComponentProps>(
  (
    {
      className,
      options = [],
      showCheckbox = true,
      showDeleteButton = true,
      onRemoveOptions,
      onCheckedChange,
      ...props
    },
    ref,
  ) => {
    /**
     * 특정 썸네일이 삭제될 때 호출되는 핸들러 함수입니다.
     * @param currentOption - 삭제될 ImageOption 객체
     */
    const handleRemoveClick = (currentOption: ImageOption) => {
      // 현재 옵션 배열에서 삭제될 썸네일을 제외한 새로운 배열 생성
      const newOptions = options.filter((d: ImageOption) => d.id !== currentOption.id);
      // 변경된 썸네일 목록을 부모 컴포넌트에 알림 (onRemoveOptions 콜백 사용)
      onRemoveOptions?.(newOptions); // 변경된 콜백 호출
    };

    /**
     * 특정 썸네일의 체크 상태가 변경될 때 호출되는 핸들러 함수입니다.
     * @param checked - 변경된 체크 상태 (true/false)
     * @param currentOption - 체크 상태가 변경된 ImageOption 객체
     */
    const handleCheckChange = (checked: CheckedState, currentOption: ImageOption) => {
      // 현재 옵션 배열에서 체크 상태가 변경된 썸네일을 업데이트한 새로운 배열 생성
      const newOptions = options.map((d: ImageOption) => {
        if (d.id === currentOption.id) {
          return { ...d, checked: !!checked }; // checked 상태 업데이트
        }
        return d;
      });
      // 변경된 체크 상태를 부모 컴포넌트에 알림
      onCheckedChange?.(newOptions);
    };

    /**
     * `options` 배열을 기반으로 `Thumbnail` 컴포넌트 배열을 생성합니다.
     * 각 `Thumbnail`은 고유한 `key`와 필요한 props를 가집니다.
     */
    const items = options?.map((d: ImageOption, index: number) => (
      <Thumbnail
        id={d.id}
        path={d.path}
        key={d.id}
        showCheckbox={showCheckbox}
        showDeleteBtn={showDeleteButton}
        selected={d.checked}
        onCheckedChange={(checked: CheckedState) => handleCheckChange(checked, d)}
        onRemoveClick={() => handleRemoveClick(d)}
      />
    ));

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.start, styles.thumbnail_list, className, 'nlp--thumbnail-list')}
      >
        <Carousel
          {...props}
          items={items}
          slidesPerView={'auto'}
          spaceBetween={12}
          freeMode={true}
          grabCursor={true}
          className={styles.thumbnail_carousel}
          // navigation={true}
        />
      </div>
    );
  },
);

export const ThumbnailList = ThumbnailListComponent;
