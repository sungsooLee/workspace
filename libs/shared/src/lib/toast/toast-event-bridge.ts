import { ErrorEventData, eventService, HTTP_EVENTS } from '../event/event.service';

export type ToastHandler = (config: {
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}) => void;

let toastHandler: ToastHandler = () => {
  //
};

/**
 * 애플리케이션에서 실제 Toast를 표시하는 핸들러를 등록
 */
export function registerToastHandler(handler: ToastHandler): void {
  toastHandler = handler;
}

/**
 * 에러 이벤트 리스너 설정
 */
export function setupErrorToastListener(): () => void {
  // 에러 이벤트 핸들러
  const handleErrorEvent = (errorData: ErrorEventData) => {
    toastHandler({
      title: errorData.title,
      description: errorData.message,
      type: 'error',
      duration: 3000,
    });
  };

  // 구독 설정
  eventService.on(HTTP_EVENTS.ERROR, handleErrorEvent);
  eventService.on(HTTP_EVENTS.REACT_QUERY_ERROR, handleErrorEvent);

  // 구독 해제 함수 반환
  return () => {
    eventService.off(HTTP_EVENTS.ERROR, handleErrorEvent);
    eventService.off(HTTP_EVENTS.REACT_QUERY_ERROR, handleErrorEvent);
  };
}
