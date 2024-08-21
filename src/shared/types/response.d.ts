export interface CommonResponse {
  message: string;
  status: number;
  timestamp: Date;
  errors: any[]; // 변경 필요
  code: string;
  data: T;
}
