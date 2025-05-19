export interface S3UploaderConfig {
  s3Path: string;
  auto?: boolean; // 자동 업로드 여부 기본 true
  async?: boolean; // 병렬 업로드 여부 기본 true
  multipartThreshold?: number; // 멀티파트 업로드 기준 사이즈
  acceptFiles?: string[]; // 허용할 파일 형식 (예: ["png"] , 확장자)
  maxFileCount?: number; // 허용할 최대 파일 개수
  maxFileSize?: number; // 단일 파일 허용 용량 (단위: 바이트)
}
export type UploadStatus =
  | 'validating'
  | 'idle'
  | 'uploading'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'aborted'
  | 'validating-error';

export interface UploadPart {
  ETag: string;
  PartNumber: number;
}

// AbortController
// https://developer.mozilla.org/ko/docs/Web/API/AbortController
export interface UploadFile {
  id: string; // 파일 아이디
  file: File; // 파일
  uploadType: 'multi-part' | 'single-part';
  extension: string; // 확장자
  s3FileName: string; // s3 업로드 할 파일명
  fileName: string; // 실제 원본 파일명
  size: number; // 파일 사이즈
  displaySize: string; // 포맷팅된 사이즈
  progress: number; // 업로드 Progress
  status: UploadStatus; // 파일 상태
  uploadId?: string; // 업로드 아이디
  key: string; // S3 업로드 KEY
  parts: UploadPart[]; // 멀티 part 시 사용
  contentType?: string;
  controller?: AbortController; // fetch 취소를 위해 사용
  message?: string;
  basicPath: string;
  detailPath: string;
}

export interface UseUploadQueueConfig {
  files: UploadFile[]; // 업로드 작업에 사용될 파일 목록
  executeTask: (id: string) => Promise<void>; // 특정 작업을 실행하는 함수 (예: 새 업로드 작업)
  resumeTask: (id: string) => Promise<void>; // 중단된 작업을 다시 실행하는 함수
}

export type UploadCommand = {
  id: string;
  action: 'start' | 'resume';
};

/*
 * [BO] S3 File 업로드/다운로드 응답/요청 타입
 * */

/**
 * MultiPart 업로드 응답
 */
export type InitMultiPartUploadRes = {
  key: string; // 키
  /**
   * 멀티파트 업로드 식별을 위한 고유 ID
   * - S3 같은 스토리지 서비스에서 특정 파일 업로드를 추적하는 데 사용
   */
  uploadId: string;
};
/**
 * Part 별 Presigend URL 요청 req
 */
export type PartPresigendReq = {
  uploadId: string; // 업로드 아이디
  partNumber: number; // 발급 받을 PartNumber
  key: string; // 파일명 경로 + 파일명
};
/**
 * Presigend 요청에 대한 응답
 */
export type PresignedRes = {
  method: 'put';
  contentType: string;
  url: string;
};

/**
 * S3 멀티파트 업로드 완료 요청에 대한 응답
 */
export type CompletedMultiPartUploadRes = {
  Location: string;
  Bucket: string;
  Key: string;
  ETag: string;
};
/**
 * S3 멀티파트 업로드 완료 요청
 */
export type CompletedMultiPartUploadReq = {
  uploadId: string;
  key: string;
  parts: {
    ETag: string;
    PartNumber: number;
  }[];
};

/**
 * S3 멀티파트 업로드 Part 목록
 */
export type MultiFilePartRes = {
  Bucket: string;
  Key: string;
  UploadId: string;
  Parts: [
    {
      PartNumber: number;
      LastModified: string;
      Size: number;
      ETag: string;
    },
  ];
};
