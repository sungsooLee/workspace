import {
  ContentCreateType,
  FileStatus,
  FileType,
  ProcessingStatus,
  ContentStatusCode,
  ContentType,
  ContentAddInfoType,
} from './enum';

export interface BlogCreateReq {
  contentName: string;
  languageCountryCode: string;
  tenantId: number;
  channelUuid: string;
  description: string;
  coordinatorUuid: string;
  coordinatorName: string;
  coordinatorTelCountryCode: string;
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
  vendorTelCountryCode: string;
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
  contentAddInfoType: string;
  contentAddInfo: number;
}

export interface BlogUpdateReq extends BlogCreateReq {
  contentUuid: string;
}

export interface BlogDetailRes extends GetContentDetailRes {
  blogContent: object;
  contentTime: number;
}

export interface BlogPostRes extends BlogCreateReq {
  contentUuid: string;
  createType: string;
  contentType: string;
  contentStatusCode: string;
  aiSummary: string;
  aiKeyword: string;
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

export interface Tag {
  tagId: string;
  tagName: string;
  contentUuid: string;
}

export interface ContentFileInfo {
  groupUuid: string;
  fileUuid: string;
  imageUrl: string;
}

export interface ContentInformation {
  contentUuid: string; //	콘텐츠 UUID[...]
  contentName: string; //	학습자원명[...]
  langCountryCode: string; //	국가 언어 코드[...]
  createType: ContentCreateType; //	콘텐츠 생성 유형, MANUAL|TRASLATE|SHARED[...]
  contentType: ContentType; //	콘텐츠 분류 코드 Enum(ContentType) - VIDEO|EXAM|SURVEY|ASSIGNMENT|HTML5|YOUTUBE|BLOG|SCORM|DEFAULT[...]
  contentStatusCode?: ContentStatusCode; //	콘텐츠 상태 코드 Enum(ContentStatusCode) - TEMPORARY_SAVE|SAVED|DELETED[...]
  channelUuid: string; //	채널 UUID[...]
  channelName: string; //	채널명[...]
  tenantId?: string; //	테넌트 ID[...]
  tenantName?: string; //	테넌트 이름[...]
  description?: string; //	학습자원 설명[...]
  coordinatorUuid: string; //	담당자 UUID[...]
  coordinatorName: string; //	담당자명[...]
  coordinatorTelNo: string; //	담당자 연락처[...]
  isUnlimited: boolean; //	사용기한 무기한 여부[...]
  contentUseStartDate?: string; //	사용기한 시작일[...]
  contentUseEndDate?: string; //	사용기한 종료일[...]
  isVendored: string; //	외주 개발 여부[...]
  vendorName: string; //	외주 개발 업체명[...]
  vendorCoordinatorUuid: string; //	외주 개발 업체 담당자 UUID[...]
  vendorCoordinatorName: string; //	외주 개발 업체 담당자명[...]
  vendorTelNo: string; //	외주 개발 업체 연락처[...]
  contentThumbnailFileGroupUuid: string; //	썸네일 파일그룹 UUID[...]
  thumbnailFiles: ContentFileInfo[]; //	썸네일 파일 목록[...]
  selectedContentThumbnailFileUuid?: string; //	대표 썸네일 파일 UUID[...]
  isCourseUsed: boolean; //	교육자원 활용 여부[...]
  isInspected: boolean; //	검수 확인 여부[...]
  isCopyrighted: boolean; //	저작권 확인 여부[...]
  contentAddInfoType?: ContentAddInfoType; //	콘텐츠 추가정보 코드 Enum(ContentAddInfoType) - VIDEO_ADD_INFO(초)|EXAM_ADD_INFO(건수)[...]
  contentAddInfo?: string | number; //	콘텐츠 추가 정보, 콘텐츠 추가정보 코드 별 초/건수 값[...]
  isSecured: boolean; //	보안 확인 여부[...]
  isDeleted: boolean; //	삭제 여부[...]
  isOpened: boolean; //	공개 여부[...]
  isDrafted: boolean; //	임시저장 여부[...]
  tags: string[] | Tag[]; //	태그 리스트[...]
  aiSummary?: string; //	학습자원 개요 (AI자동추출)[...]
  aiKeyword?: string; //	키워드 (AI자동추출)[...]
  children: any[];
  resource?: {
    resourceId: number;
    startFile: string;
    startFileUrl: string;
  };
}

export type GetContentDetailRes = ContentInformation;

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

export type MappedCourseItem = {
  courseId: number;
  courseUuid: string;
  courseName: string;
  courseType: string;
  courseContent: string;
  channelId?: number;
  channelUuid?: string;
  channelName?: string;
  openingYear?: number;
  courseValidityStartDate?: Date | undefined;
  courseValidityEndDate?: Date | undefined;
};

export type CourseMappingStatusRes = {
  hasMapping: boolean;
  courses: MappedCourseItem[] | null;
};
