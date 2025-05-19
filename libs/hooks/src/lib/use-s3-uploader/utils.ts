import { UploadFile, UploadPart } from './types';

/**
 * 업로드 중인 파일 리스트에서 특정 파일(id)의 상태를 업데이트
 * @param files 기존 파일 리스트
 * @param id 업데이트할 파일 ID
 * @param patch 덮어쓸 필드들
 * @returns 새로운 파일 리스트
 */
export const updateFile = (
  files: UploadFile[],
  id: string,
  patch: Partial<UploadFile>,
): UploadFile[] => {
  return files.map((f) => (f.id === id ? { ...f, ...patch } : f));
};

/**
 * 서버에서 가져온 Part 목록과 로컬 상태에 저장된 Part 목록을 병합
 * PartNumber 기준으로 중복을 제거하며, 서버 값을 우선함
 * @param localParts 클라이언트에 저장된 Part 목록
 * @param serverParts 서버에서 가져온 Part 목록
 * @returns 병합된 고유 Part 목록
 */
export const mergeParts = (localParts: UploadPart[], serverParts: UploadPart[]): UploadPart[] => {
  return [...new Map([...serverParts, ...localParts].map((p) => [p.PartNumber, p])).values()];
};

export const normalizePath = (path: string) => {
  // 시작에 '/'가 있으면 제거
  if (path.startsWith('/')) {
    path = path.slice(1);
  }

  // 끝에 '/'가 있으면 삭제
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  return path;
};

export const formatFileSize = (size: number): string => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 ** 2) {
    return `${(size / 1024).toFixed(1)} KB`;
  } else if (size < 1024 ** 3) {
    return `${(size / 1024 ** 2).toFixed(1)} MB`;
  } else if (size < 1024 ** 4) {
    return `${(size / 1024 ** 3).toFixed(1)} GB`;
  } else {
    return `${(size / 1024 ** 4).toFixed(1)} TB`;
  }
};
