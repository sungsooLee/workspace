import { useEffect, useState } from 'react';
import { TabItemProps } from '../tabs';

interface UseSubProgressTabsProps {
  items: TabItemProps[];
  currentValue?: string; // 현재 활성화된 탭의 값 (선택 사항)
}

/**
 * `SubProgressTabs` 컴포넌트의 현재 탭 정보 및 이동 기능을 제공하는 커스텀 훅입니다.
 * @param {UseSubProgressTabsProps} props - 훅에 전달되는 props
 * @param {TabItemProps[]} props.items - 탭 아이템 배열
 * @param {string} [props.currentValue] - 현재 활성화된 탭의 값 (선택 사항)
 * @returns {UseSubProgressTabsResult} - 현재 탭 정보 및 이동 함수를 담은 객체
 */
export const useStepperTabs = ({ items, currentValue }: UseSubProgressTabsProps) => {
  /**
   * 현재 활성화된 탭의 인덱스 상태
   */
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /**
   * `items` 또는 `currentValue` prop이 변경될 때 현재 탭 인덱스를 업데이트합니다.
   */
  useEffect(() => {
    // items 배열이 비어있으면 인덱스를 0으로 초기화하고 종료
    if (!items.length) {
      setCurrentIndex(0);
      return;
    }

    // currentValue에 해당하는 탭의 인덱스를 찾습니다.
    const index = items.findIndex((item) => item.key === currentValue);
    // 찾은 인덱스가 유효하면 해당 인덱스로, 아니면 첫 번째 탭(인덱스 0)으로 설정합니다.
    setCurrentIndex(index !== -1 ? index : 0);
  }, [items, currentValue]);

  /**
   * 현재 탭이 첫 번째 탭인지 여부
   */
  const isFirst = currentIndex === 0;

  /**
   * 현재 탭이 마지막 탭인지 여부
   */
  const isLast = currentIndex === items.length - 1;

  /**
   * 현재 활성화된 탭의 키 값
   */
  const currentKey = items[currentIndex]?.key;

  /**
   * 전체 탭 개수
   */
  const totalTabSize = items?.length;

  /**
   * 이전 탭으로 이동하는 함수
   */
  const goToPrevious = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  /**
   * 다음 탭으로 이동하는 함수
   */
  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return {
    currentIndex,
    currentKey,
    isFirst,
    isLast,
    totalTabSize,
    goToPrevious,
    goToNext,
  };
};
