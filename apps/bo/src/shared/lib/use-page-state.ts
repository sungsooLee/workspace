// src/hooks/usePageState.js (예시 경로)
import { useRouter } from '@tanstack/react-router';

/**
 * 현재 페이지로 전달된 state 데이터를 가져오는 커스텀 훅
 * @returns {any | undefined} state 데이터 또는 undefined
 */
export function usePageState() {
  const router = useRouter();
  return router.state.location.state;
}
