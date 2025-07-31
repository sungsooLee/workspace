import { isDisableAuth } from '@learnway/shared';
import { useEffect, useRef } from 'react';
import { useWindowSize } from 'react-use';

export const useBreakpointModalClose = (closeCallback: () => void, breakpoint = 1000) => {
  const hasTriggeredRef = useRef(false);
  const prevWidthRef = useRef<number | null>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (prevWidthRef.current === null) {
      prevWidthRef.current = width;
      return;
    }

    const crossedBreakpoint =
      prevWidthRef.current >= breakpoint && width < breakpoint && !hasTriggeredRef.current;

    if (crossedBreakpoint) {
      closeCallback();
      hasTriggeredRef.current = true;
    }

    if (width >= breakpoint) {
      hasTriggeredRef.current = false;
    }

    prevWidthRef.current = width;
  }, [width, closeCallback, breakpoint]);

  // 테스트 모드에서 강제로 끄기 위해
  if (isDisableAuth()) {
    return false;
  }

  return width < breakpoint;
};
