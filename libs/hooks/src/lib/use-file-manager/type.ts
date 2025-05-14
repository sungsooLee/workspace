export type UPLOAD_TYPE = 'CONTENTS' | 'ATTACH';
export type AFFAIRS_TYPE = 'PMS' | 'CMS' | 'LMS';
export type REPOS_TYPE = 'S3';

// 공통 파일 속성
export interface BaseFileInfo {
  originalFileName: string;
  serverFileName: string;
  fileSize: number;
  detailPath?: string; // 선택적 속성
}

// 공통 그룹 속성
export interface BaseGroupInfo {
  uploadType: UPLOAD_TYPE;
  affairsType: AFFAIRS_TYPE;
  reposType: REPOS_TYPE;
  basicPath: string;
  languageCode: string;
}

//  파일 정보
export interface FileInfo {
  group: FileGroupInfo;
  fileUuid: string;
  originalFileName: string;
  serverFileName: string;
  fileSize: number;
  detailPath: string;
  fileType: string;
  uploadStatus: string;
  deleteYn: boolean;
  useYn: boolean;
}
// 파일 그룹 정보
export interface FileGroupInfo {
  groupUuid: string;
  uploadType: string;
  affairsType: AFFAIRS_TYPE;
  reposType: string;
  basicPath: string;
  languageCode: string;
  isDeleted: boolean;
  isUsed: boolean;
}

export interface GroupFileInfo extends FileGroupInfo {
  files: FileInfo[];
}

// 파일 정보 생성 요청
export interface CreateFileInfoReq extends BaseFileInfo {
  groupUuid: string; // 그룹 UUID 추가
}

// 파일 그룹정보와 파일정보 생성 요청 (최종 조합 타입)
export interface CreateFileGroupFilesInfoReq extends BaseGroupInfo {
  detailPath: string;
  files: BaseFileInfo[];
}
