import { FileStatus, FileType, ProcessingStatus } from './enum';

export interface BlogCreateReq {
  contentName: string;
  languageCountryCode: string;
  tenantId: number;
  channelUuid: string;
  description: string;
  coordinatorUuid: string;
  coordinatorName: string;
  coordinatorTelNo: string;
  blogContent: object;
  contentTime: number;
  isUnlimited: boolean;
  contentUseStartDate: Date | undefined;
  contentUseEndDate: Date | undefined;
  isVendored: boolean;
  vendorCode: string | number;
  vendorName: string;
  // vendorCoordinatorUuid: string; // 개발업체담당자명은 직접입력으로 명시되어 있음
  vendorCoordinatorName: string;
  vendorTelNo: string;
  contentThumbnailFileGroupUuid: string;
  selectedContentThumbnailFileUuid: string;
  isCourseUsed: boolean;
  isContentSecured: boolean;
  isInspected: boolean;
  isCopyrighted: boolean;
  isSecured: boolean;
  isDeleted: boolean;
  isOpened: boolean;
  tags: string[];
  contentAddInfoType?: string;
  contentAddInfo?: number;
}

export interface BlogUpdateReq extends BlogCreateReq {
  contentUuid: string;
}

export type BlogWatchLogReq = {
  courseSequenceId: number;
  curriculumId: number;
  // 임시로 ? 추가 (화면 개발 중 제거 가능)
  moduleId?: number;
  lessonId?: number;
  contentUuid: string;
};

export interface PostDraftVideosParams {
  languageCountryCode: string;
  tenantId: string;
  channelUuid: string;
  fileUuids: string[];
}

export interface PostDraftVideosRes {
  fileUuids: string[];
  contents: {
    contentUuid: string;
    fileUuid: string;
    contentType: FileType;
    contentStatusCode: FileStatus;
    processingStatus: ProcessingStatus;
    isDrafted: boolean;
  }[];
}
