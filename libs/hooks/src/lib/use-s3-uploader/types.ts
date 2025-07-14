import { FileInfo } from '../use-file-manager/type';
import { S3_PATH_TYPE } from './constants';

export const DEFAULT_MULTIPART_THRESHOLD = 5 * 1024 * 1024; // 5MB
export interface S3UploaderConfig {
  s3Path: S3_PATH_TYPE;
  affairsType: 'PMS' | 'CMS' | 'LMS';
  languageCode?: string;
  groupUuid?: string; // 기존 그룹 UUID (전달받은 경우 사용)
  groupMode?: 'individual' | 'batch'; // 파일 그룹 생성 방식: 개별 생성 | 배치 생성, 기본값: 'batch
  auto?: boolean; // 자동 업로드 여부 기본 true
  async?: boolean; // 병렬 업로드 여부 기본 true
  multipartThreshold?: number; // 멀티파트 업로드 기준 사이즈, 기본값 5MB
  acceptFiles?: string[]; // 허용할 파일 형식 (예: ["png"] , 확장자)
  maxFileCount?: number; // 허용할 최대 파일 개수, 기본값: 10
  maxFileSize?: number; // 단일 파일 허용 용량 (단위: 바이트), 기본값 5MB
}
export type UploadStatus =
  | 'validating' // 파일 검증 중
  | 'grouping' // 그룹 생성 중
  | 'idle' // 업로드 대기
  | 'uploading' // 업로드 중
  | 'paused' // 업로드 일시정지
  | 'completed' // 업로드 완료
  | 'fetched' // 서버에서 가져옴
  | 'failed' // 업로드 실패
  | 'aborted' // 업로드 중단
  | 'validating-error'; // 파일 검증 실패

export interface UploadPart {
  ETag: string;
  PartNumber: number;
}

export enum UploadType {
  SINGLE_PART = 'S3_SINGLEPART',
  MULTI_PART = 'S3_MULTIPART',
}

// AbortController
// https://developer.mozilla.org/ko/docs/Web/API/AbortController
export interface UploadFile {
  id: string; // 파일 아이디
  file?: File; // 파일
  uploadType: UploadType;
  extension: string; // 확장자
  s3FileName: string; // s3 업로드 할 파일명
  fileName: string; // 실제 원본 파일명
  size: number; // 파일 사이즈
  displaySize: string; // 포맷팅된 사이즈
  progress: number; // 업로드 Progress
  status: UploadStatus; // 파일 상태
  uploadId?: string; // 업로드 아이디
  fileUuid?: string; // 파일 UUID (임시 저장 후 받는 ID)
  groupUuid?: string; // 그룹 UUID (그룹 생성 후 받는 ID)
  fileUrl?: string; // 파일 Url (직접 접근 가능한 파일 주소)
  key: string; // S3 업로드 KEY
  parts: UploadPart[]; // 멀티 part 시 사용
  contentType?: string;
  controller?: AbortController; // fetch 취소를 위해 사용
  message?: string;
  basicPath: string;
  detailPath: string;
}

export interface ThumbnailFileValue {
  groupUuid?: string;
  files?: FileInfo[];
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
export type PartPresignedReq = {
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

/**
 * 파일 정보 임시 저장 요청
 */
export type SaveTempFileInfoReq = {
  detailPath: string;
  files: Array<{
    s3UploadType: UploadType;
    originalFileName: string;
    serverFileName: string;
    fileSize: number;
  }>;
};

/**
 * 파일 정보 임시 저장 응답
 */
export type SaveTempFileInfoRes = {
  fileUuid: string;
  uploadId?: string;
  s3Key?: string;
  files?: Array<{
    fileUuid: string;
    uploadId?: string;
    s3Key?: string;
  }>;
};

/**
 * 파일 업로드 완료 요청
 */
export type CompleteFileUploadReq = {
  key: string;
  uploadId: string;
  parts: UploadPart[];
};
