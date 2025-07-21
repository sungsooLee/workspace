export enum CmsLearningCompletionStatus {
  COMPLETED = 'COMPLETED',
  INCOMPLETE = 'INCOMPLETE',
  NOT_ATTEMPTED = 'NOT_ATTEMPTED',
}

export interface CmsImageContent {
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
