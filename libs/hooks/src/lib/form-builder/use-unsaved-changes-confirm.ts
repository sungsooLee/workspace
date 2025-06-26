import { useCallback, useRef } from 'react';
import { t } from 'i18next';

interface UseUnsavedChangesConfirmOptions {
  compareFunction?: (original: any, current: any) => boolean;
  compareFields?: string[]; // 비교할 필드들 (기본값: 모든 필드)
  deepCompare?: boolean; // 깊은 비교 여부 (기본값: true)
  confirmOptions?: {
    title?: string;
    content?: string;
  };
  confirmFunction: (options: { title: string; content: string }) => Promise<boolean>; // 외부에서 주입
  disabled?: boolean;
}

/**
 * 저장되지 않은 변경사항에 대한 컨펌창을 처리하는 커스텀 훅 / 변경시 주석 업데이트 요청.
 *
 * @param originalData - 원본 데이터 (배열, 객체, 원시값 모두 지원)
 * @param currentData - 현재 데이터 (배열, 객체, 원시값 모두 지원)
 * @param options - 옵션 설정
 * @returns hasChanges, confirmChanges 함수
 *
 * @example
 * // 기본 사용법 (모든 필드 깊은 비교)
 * const { hasChanges, confirmChanges } = useUnsavedChangesConfirm(
 *   originalData,
 *   currentData,
 *   { confirmFunction: confirm }
 * );
 *
 * @example
 * // 특정 필드만 비교
 * const { hasChanges, confirmChanges } = useUnsavedChangesConfirm(
 *   originalFormData,
 *   currentFormData,
 *   {
 *     compareFields: ['name', 'email'],
 *     confirmFunction: confirm
 *   }
 * );
 *
 * @example
 * // 단순 비교로 성능 최적화
 * const { hasChanges, confirmChanges } = useUnsavedChangesConfirm(
 *   originalArray,
 *   currentArray,
 *   {
 *     compareFields: ['targetLanguage'],
 *     deepCompare: false,
 *     confirmFunction: confirm
 *   }
 * );
 *
 * @example
 * // 컨펌창 비활성화
 * const { hasChanges, confirmChanges } = useUnsavedChangesConfirm(
 *   originalData,
 *   currentData,
 *   {
 *     disabled: isReadOnly,
 *     confirmFunction: confirm
 *   }
 * );
 */
export const useUnsavedChangesConfirm = (
  originalData: any,
  currentData: any,
  options: UseUnsavedChangesConfirmOptions,
) => {
  const {
    compareFunction,
    compareFields,
    deepCompare = true,
    confirmOptions = {
      title: t('LABEL.confirm.title'),
      content: t('LABEL.confirm.unsaved-changes'),
    },
    confirmFunction,
    disabled = false,
  } = options;

  const isConfirmingRef = useRef(false);

  /**
   * 기본 비교 함수 - 배열/객체/원시값 모든 타입 지원
   */
  function defaultCompareFunction(original: any, current: any): boolean {
    // null/undefined와 빈 배열을 동일하게 처리
    const isOriginalEmpty = !original || (Array.isArray(original) && original.length === 0);
    const isCurrentEmpty = !current || (Array.isArray(current) && current.length === 0);

    if (isOriginalEmpty && isCurrentEmpty) return false;
    if (isOriginalEmpty || isCurrentEmpty) return true;

    if (Array.isArray(original) && Array.isArray(current)) {
      if (original.length !== current.length) return true;

      return current.some((currentItem: any, index: number) => {
        const originalItem = original[index];
        if (!originalItem && !currentItem) return false;
        if (!originalItem || !currentItem) return true;

        if (compareFields && compareFields.length > 0) {
          // 지정된 필드들만 비교
          return compareFields.some((field) => {
            if (deepCompare && typeof currentItem[field] === 'object') {
              return JSON.stringify(currentItem[field]) !== JSON.stringify(originalItem[field]);
            }
            return currentItem[field] !== originalItem[field];
          });
        } else {
          // 모든 필드 비교
          return deepCompare
            ? JSON.stringify(currentItem) !== JSON.stringify(originalItem)
            : currentItem !== originalItem;
        }
      });
    }

    // 객체인 경우
    if (typeof original === 'object' && typeof current === 'object') {
      if (compareFields && compareFields.length > 0) {
        return compareFields.some((field) => {
          if (deepCompare && typeof current[field] === 'object') {
            return JSON.stringify(current[field]) !== JSON.stringify(original[field]);
          }
          return current[field] !== original[field];
        });
      } else {
        return deepCompare
          ? JSON.stringify(current) !== JSON.stringify(original)
          : current !== original;
      }
    }

    // 원시값인 경우
    return current !== original;
  }

  const finalCompareFunction = compareFunction || defaultCompareFunction;

  /**
   * 변경사항이 있는지 확인
   */
  const hasChanges = useCallback(() => {
    if (disabled) return false;
    return finalCompareFunction(originalData, currentData);
  }, [originalData, currentData, finalCompareFunction, disabled]);

  /**
   * 변경사항이 있으면 컨펌창을 띄우고 결과를 반환
   * @returns Promise<boolean> - 계속 진행할지 여부
   */
  const confirmChanges = useCallback(async (): Promise<boolean> => {
    if (disabled || !hasChanges()) return true;

    if (isConfirmingRef.current) {
      return false; // 이미 컨펌창이 열려있으면 false 반환
    }

    try {
      isConfirmingRef.current = true;
      const shouldProceed = await confirmFunction({
        title: confirmOptions.title!,
        content: confirmOptions.content!,
      });
      return shouldProceed;
    } finally {
      isConfirmingRef.current = false;
    }
  }, [hasChanges, confirmFunction, confirmOptions, disabled]);

  return {
    hasChanges,
    confirmChanges,
  };
};
