export interface ImageOption {
  id: string;
  path: string;
  checked?: boolean; // 체크 여부
  readonly?: boolean; // 삭제, 체크 불가 여부
}
