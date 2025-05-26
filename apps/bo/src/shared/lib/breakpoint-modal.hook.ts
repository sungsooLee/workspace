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

  return width < breakpoint;
};
