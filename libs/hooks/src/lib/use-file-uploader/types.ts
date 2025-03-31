// UPPY 파일 아이템 인터페이스 확장 - 파트 정보 추가

export interface UppyFileItem {
  /** 파일의 고유 ID (클라이언트에서 생성) */
  id: string;

  /** 파일 이름 */
  name: string;

  /** 파일 크기 (바이트 단위) */
  size: number;

  /** 파일의 전체 업로드 진행률 (0 ~ 100 사이의 값) */
  progress: number;

  /**
   * 파일의 현재 업로드 상태
   * - `waiting`: 업로드 대기 중
   * - `uploading`: 업로드 진행 중
   * - `complete`: 업로드 완료
   * - `error`: 업로드 실패
   * - `paused`: 업로드 일시 중지
   */
  status: 'waiting' | 'uploading' | 'complete' | 'error' | 'paused';

  /** 업로드 실패 시의 오류 메시지 */
  errorMessage?: string;

  /**
   * 멀티파트 업로드 청크(part) 관련 데이터
   * 각 청크의 상태를 관리하기 위해 사용
   */
  parts?: {
    /** 청크의 고유 번호 (1부터 시작) */
    partNumber: number;

    /** 해당 청크의 업로드 진행률 (0 ~ 100) */
    progress: number;

    /**
     * 청크의 현재 업로드 상태
     * - `waiting`: 업로드 대기 중
     * - `uploading`: 청크 업로드 진행 중
     * - `complete`: 청크 업로드 완료
     * - `error`: 청크 업로드 실패
     */
    status: 'waiting' | 'uploading' | 'complete' | 'error';
  }[];

  /**
   * 업로드 재시도 횟수
   * - 네트워크 문제나 오류 발생 시 재시도한 횟수를 기록
   */
  retryCount?: number;

  /**
   * 멀티파트 업로드 식별을 위한 고유 ID
   * - S3 같은 스토리지 서비스에서 특정 파일 업로드를 추적하는 데 사용
   */
  uploadId?: string;

  /**
   * 스토리지 상에서 파일을 식별하기 위한 키
   * - 예: S3 버킷 내의 파일 경로 (e.g., 'uploads/folder/filename')
   */
  key?: string;

  /**
   * 업로드 응답 데이터
   * - 업로드 완료 혹은 진행 중에 서버로부터 반환된 응답 데이터를 저장
   */
  response?: any;
}

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
  filename: string; // 파일명 경로 + 파일명
};
/**
 * Presigend 요청에 대한 응답
 */
export type PresignedRes = {
  method: 'put';
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
 *  Uppy Reducer Type
 *
 */

// 파일 아이템 정보 타입
export type FileItem = {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'waiting' | 'uploading' | 'complete' | 'error' | 'paused';
  errorMessage?: string;
  parts?: {
    partNumber: number;
    progress: number;
    status: 'waiting' | 'uploading' | 'complete' | 'error';
  }[];
  retryCount?: number;
  uploadId?: string;
  key?: string;
  response?: any;
};

/**
 * useFileUploader
 */
export interface FileUploaderConfig {
  isAuto: boolean; // 자동 업로드 여부
  maxFileCount?: number; // 최대 파일 업로드 개수
  maxFileSize?: number; // 최대 파일 사이즈
  s3Path: string; // 업로드 할 S3 버킷 디렉토리 경로 upload 를 제외한 경로만 입력
}

export interface FileMeta {
  name?: string;
  label?: string;
  folderId?: string;
  [key: string]: any; // ✅ 이것만 추가하면 끝!
}

export type FileBody = Record<string, unknown>;

/*
 *
 * UppyFile Upload Progress 타입 옮겨옴
 * */

export interface DeterminateFileProcessing {
  mode: 'determinate';
  message: string;
  value: number;
}
export interface IndeterminateFileProcessing {
  mode: 'indeterminate';
  message?: string;
  value?: 0;
}
export type FileProcessingInfo = IndeterminateFileProcessing | DeterminateFileProcessing;

// TODO explore whether all of these properties need to be optional
export interface FileProgressBase {
  uploadComplete?: boolean;
  percentage?: number; // undefined if we don't know the percentage (e.g. for files with `bytesTotal` null)
  // note that Companion will send `bytesTotal` 0 if unknown size (not `null`).
  // this is not perfect because some files can actually have a size of 0,
  // and then we might think those files have an unknown size
  // todo we should change this in companion
  bytesTotal: number | null;
  preprocess?: FileProcessingInfo;
  postprocess?: FileProcessingInfo;
}

// FileProgress is either started or not started. We want to make sure TS doesn't
// let us mix the two cases, and for that effect, we have one type for each case:
export type FileProgressStarted = FileProgressBase & {
  uploadStarted: number;
  bytesUploaded: number;
};
export type FileProgressNotStarted = FileProgressBase & {
  uploadStarted: null;
  bytesUploaded: false;
};
export type FileProgress = FileProgressStarted | FileProgressNotStarted;
