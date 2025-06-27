export const HTTP_EVENTS = {
  ERROR: 'http:error',
  REACT_QUERY_ERROR: 'reactQuery:error',
  SERVER_DOWN: 'http:serverDown',
};

// 에러 이벤트 데이터 타입
export interface ErrorEventData {
  title: string;
  message: string;
  status?: number;
  url?: string;
}

// 이벤트 핸들러 타입
type EventHandler = (data: any) => void;

class EventService {
  private events: Record<string, EventHandler[]> = {};

  on(eventName: string, handler: EventHandler): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  off(eventName: string, handler: EventHandler): void {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter((h) => h !== handler);
  }

  emit(eventName: string, data?: any): void {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach((handler) => {
      handler(data);
    });
  }
}

export const eventService = new EventService();
