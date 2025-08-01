export enum CmsEnContentType {
  /**동영상 */
  VIDEO = 'VIDEO',
  /**이북 */
  EBOOK = 'EBOOK',
  /** 스콤 */
  SCORM = 'SCORM',
  /** HTML5 */
  HTML5_VIDEO = 'HTML5_VIDEO',
  /** 겔러리 */
  IMAGE = 'IMAGE',
  /** 외부 링크 */
  EXTERNAL_LINK = 'EXTERNAL_LINK',
  /** 외부 위탁 */
  EXTERNAL_AGENCY = 'EXTERNAL_AGENCY',
  /** 외부 위탁 250801 */
  COMMISSIONED_CONTENT = 'COMMISSIONED_CONTENT',
  /** 블로그 */
  BLOG = 'BLOG',
  /** 시험 */
  EXAM = 'EXAM',
  /** 문제은행 */
  EXAM_POOL = 'EXAM_POOL',
  /** 과제 */
  ASSIGNMENT = 'ASSIGNMENT',
  /** 설문 */
  SURVEY = 'SURVEY',
  /** 기타 */
  ETC = 'ETC',
}

export enum CmsLearningCompletionStatus {
  COMPLETED = 'COMPLETED',
  INCOMPLETE = 'INCOMPLETE',
  NOT_ATTEMPTED = 'NOT_ATTEMPTED',
}

export interface CmsImageResource {
  contentUuid: string;
  contentType: string;
  images: CmsImageItem[];
}

export interface CmsImageItem {
  resourceId: number;
  contentUuid: string;
  sortOrder: number;
  fileUuid: string;
  fileName: string;
  fileSize: number;
  itemUrl: string;
}

export interface CmsEncodedVideoResponseDto {
  contentUuid?: string;
  m3u8Url?: string;
  height?: number;
  width?: number;
  filePath?: string;
}

export type CmsVideoSubtitleResDto = {
  /**
   * 자막 파일 UUID
   */
  subtitleFileUuid?: string;
  /**
   * 자막 언어코드
   */
  languageCode?: string;
  /**
   * 자막 제목
   */
  subtitleName?: string;
  /**
   * 자막 파일 URL
   */
  subtitleUrl?: string;
};

export interface CmsEncodedAudioResponseDto {
  contentUuid?: string;
  fileUrl?: string;
  filePath?: string;
}

/**
 * 비디오 리소스 응답 Dto
 */
export interface CmsVideoContentInfoResDto {
  contentUuid?: string;
  contentName?: string;
  masterVideo?: string;
  encodedVideos?: CmsEncodedVideoResponseDto[];
  videoSubtitles?: CmsVideoSubtitleResDto[];
  videoDuration?: number;
  /**
   * 직전 비디오 종료 시간
   */
  lastVideoEndTime?: number;
  progress?: number;
  languageCountryCode?: string;
  encodedAudios?: CmsEncodedAudioResponseDto[];
}

/**
 * [공통] 학습자원 학습 진행률 정보 객체
 */
export interface CmsContentProgressResDto {
  courseSequenceId: number;
  courseId: number;
  curriculumId: number;
  moduleId: number;
  lessonId: number;
  contentUuid: string;
  contentType: string;
  orgnId: number;
  itemId: number;
  progress: number;
  completionStatus: CmsLearningCompletionStatus;
}

export interface CmsContentProgressMultiRes {
  courseSequenceId: number;
  courseId: number;
  curriculumId: number;
  progress: number;
  completionStatus: string;
  progressList: CmsContentProgressResDto[];
}

export interface CmsEtcResource {
  contentUuid: string;
  contentType: string;
  fileInfo: CmsFileInfo;
}

export interface CmsFileInfo {
  groupUuid: string;
  fileId: number;
  fileUuid: string;
  fileName: string;
  storageType: string;
  bucket: string;
  filePath: string;
  fileSize: number;
  extType: string;
  uploadStatus: string;
}

export interface CmsContentProgressMultiReq {
  contents: CmsContentProgressReq[];
}

export interface CmsContentProgressReq {
  courseSequenceId: number;
  courseId: number;
  curriculumId: number;
  moduleId: number;
  lessonId: number;
  orgnId?: number;
  itemId?: number;
  contentUuid: string;
  userUuid?: string;
}

export interface CmsHtml5LearningReq {
  courseSequenceId?: number;
  courseId?: number;
  curriculumId?: number;
  moduleId?: number;
  lessonId?: number;
  contentUuid?: string;
  playRate: number;
}
