import { debounce } from 'lodash-es'; // Lodash의 debounce 함수 import
import { useMemo, useRef } from 'react'; // React의 useMemo와 useRef 훅 import

/**
 * useDebounce: 특정 함수 호출을 지연시키는 커스텀 React 훅
 *
 * @param fn - 지연 호출할 함수
 * @param ms - 디바운스 대기 시간 (밀리초 단위)
 * @param maxWait - (선택 사항) 최대 대기 시간. 설정 시, 지정 시간 이후에는 무조건 함수 실행
 *
 * @returns 디바운스된 함수를 반환
 */
export function useDebounce<T extends (...args: never[]) => void>(
  fn: T, // 호출하려는 함수
  ms: number, // 디바운스 대기 시간 (밀리초)
  maxWait?: number, // (옵션) 최대 대기 시간
) {
  // 1. funcRef: 항상 최신의 fn을 참조하기 위한 useRef 훅
  const funcRef = useRef<T | null>(null); // 초기값은 null
  funcRef.current = fn; // 렌더링마다 최신의 fn을 ref에 저장

  // 2. useMemo를 사용하여 디바운스된 함수 메모이제이션 처리
  return useMemo(
    () =>
      debounce(
        (...args: Parameters<T>) => {
          // 디바운스된 함수가 실행될 때 ref에서 최신의 함수 호출
          if (funcRef.current) {
            funcRef.current(...args); // 최신 참조 함수 실행
          }
        },
        ms, // 디바운스 대기 시간 설정
        { maxWait }, // Lodash debounce 옵션으로 최대 대기 시간 설정
      ),
    [ms, maxWait], // 디바운스 함수는 ms, maxWait이 변경될 때만 새로 생성
  );
}
