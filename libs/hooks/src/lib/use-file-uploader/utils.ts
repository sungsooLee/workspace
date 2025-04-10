// 바이트를 자동 포맷된 문자열로 변환
export const dpSize = (bytes: number, digits = 2): string => {
  if (bytes < 1024 * 1024) return `${bytes.toLocaleString()} B`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(digits)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(digits)} GB`;
};
