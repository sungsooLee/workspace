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

export interface CmsBlogResource {
  contentUuid: string;
  contentName: string;
  languageCountryCode: string;
  blogContent: any;
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
export interface CmsVideoResource {
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

export interface CmsEtcResource {
  contentUuid: string;
  contentType: CmsEnContentType;
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

export interface CmsHtml5Resource {
  resourceId: number;
  fileInfo: CmsFileInfo;
  startFile: string;
  startFileUrl: string;
}

/**
 * ETC, 와 추가 파일
 */
export interface CmsOtherInfo {
  label: string;
  lessonTime?: string;
  contentUuid: string;
  contentType: CmsEnContentType;
  fileInfo: CmsFileInfo;
}

export interface CmsContentProgressMultiReq {
  contents: CmsContentProgressReq[];
}

export interface CmsContentProgressReq {
  courseSequenceId?: number;
  courseId?: number;
  curriculumId?: number;
  moduleId: number;
  lessonId: number;
  orgnId?: number;
  itemId?: number;
  contentUuid: string;
  userUuid?: string;
}

export interface CmsBaseLearningReq {
  courseSequenceId?: number;
  courseId?: number;
  curriculumId?: number;
  moduleId?: number;
  lessonId?: number;
  contentUuid?: string;
}

export interface CmsHtml5LearningReq extends CmsBaseLearningReq {
  playRate: number;
}

export interface CmsScormBaseReq {
  sequenceId: number;
  courseId: number;
  curriculumId: number;
  contentUuid: string;
}

export interface CmsScormRtcScoInfoReq extends CmsScormBaseReq {
  orgnId: number;
  scoId: string;
}
export interface CmsScormRteInitializeReq extends CmsScormBaseReq {
  orgnId: number;
  scoId: string;
}

export interface CmsScormRteCommitReq extends CmsScormBaseReq {
  orgnId: number;
  scoId: string;
  objectInfo: any;
}

export interface CmsScormRteScoInfo {
  sequenceId: number;
  courseId: number;
  curriculumId: number;
  contentId: number;
  orgnId: number;
  scoId: string;
  itemURL: string;
  previous: boolean;
  next: boolean;
  objectInfo: any;
}

export interface CmsVideoWatchLogReq extends CmsBaseLearningReq {
  videoStartTime: number;
  videoEndTime: number;
  speed: number;
}

export interface CmsVideoWatchLogStatisticsReq extends CmsBaseLearningReq {}

export interface CmsImageLearningReq extends CmsBaseLearningReq {
  resourceId: number;
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
