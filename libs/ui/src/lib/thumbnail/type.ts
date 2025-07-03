export interface ImageOption {
  id: string;
  path: string;
  checked?: boolean; // 체크 여부
  readonly?: boolean; // 삭제, 체크 불가 여부

  // s3 업로드 통해 받은 내용 모두 다 붙여넣음 사용 여부에 따라 수정 예정..
  file?: File;
  uploadType?: string;
  extension?: string;
  s3FileName?: string;
  fileName?: string;
  size?: number;
  displaySize?: string;
  progress?: number;
  status?: string;
  key?: string;
  parts?: any[];
  contentType?: string;
}
