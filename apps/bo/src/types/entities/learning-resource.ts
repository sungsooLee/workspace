import { CourseType } from '@pages/_layout/learning/course/-common/type';
import {
  ContentAddInfoType,
  ContentCreateType,
  ContentStatusCode,
  ContentType,
  FileStatus,
  FileType,
  ProcessingStatus,
} from './enum';
import { PaginationRequest, PaginationResponse } from '@learnway/ui';

export interface MediaContentSaveReq {
  contentName: string;
  languageCountryCode: string;
  tenantId: number;
  channelUuid: string;
  description: string;
  coordinatorUuid: string;
  coordinatorName: string;
  coordinatorTelCountryCode: string;
  coordinatorTelNo: string;
  contentTime: number;
  isUnlimited: boolean;
  contentUseStartDate: Date | undefined;
  contentUseEndDate: Date | undefined;
  isVendored: boolean;
  vendorCode: string | number;
  vendorName: string;
  vendorCoordinatorName: string;
  vendorTelCountryCode: string;
  vendorTelNo: string;
  contentThumbnailFileGroupUuid?: string;
  selectedContentThumbnailFileUuid?: string;
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

export interface BlogCreateReq extends MediaContentSaveReq {
  blogContent: object;
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

export interface PostDraftVideosParams {
  languageCountryCode: string;
  tenantId: string;
  channelUuid: string;
  fileUuids: string[];
}

export interface PostDraftHtmlVideoParams {
  tenantId: string;
  channelUuid: string;
  languageCountryCode: string;
  fileUuid: string;
}

export interface Resource {
  resourceId: number;
  startFile: string;
  startFileUrl: string;
}

export interface ContentFileInfo {
  groupUuid: string;
  fileUuid: string;
  imageUrl: string;
}

/**
 * 컨텐츠 기본 정보
 */
export interface ContentBaseInfo {
  /** 학습자원명 */
  contentName: string;
  /** 국가 언어 코드 */
  languageCountryCode: string;
  /** 테넌트 ID */
  tenantId?: number;
  /** 채널 UUID */
  channelUuid: string;
  /** 학습자원 설명 */
  description?: string;
  /** 담당자 UUID */
  coordinatorUuid: string;
  /** 담당자명 */
  coordinatorName: string;
  /** 담당자 연락처 국가코드 */
  coordinatorTelCountryCode: string;
  /** 담당자 연락처 */
  coordinatorTelNo: string;
  /** 콘텐츠시간(분) */
  contentTime?: number;

  /** 사용기한 무기한 여부 */
  isUnlimited: boolean;
  /** 사용기한 시작일 */
  contentUseStartDate?: string | Date;
  /** 사용기한 종료일 */
  contentUseEndDate?: string | Date;
  /** 외주 개발 여부 */
  isVendored: boolean;
  /** 벤더사 코드 */
  vendorCode?: string | number;
  /** 외주 개발 업체명 */
  vendorName: string;
  /** 외주 개발 업체 담당자 UUID명 */
  vendorCoordinatorUuid: string;
  /** 외주 개발 업체 담당자명 */
  vendorCoordinatorName: string;
  /** 외주 개발 업체 연락처 국가코드 */
  vendorTelCountryCode: string;
  /** 외주 개발 업체 연락처 */
  vendorTelNo: string;
  /** 썸네일 파일그룹 UUID */
  contentThumbnailFileGroupUuid?: string;
  /** 대표 썸네일 파일 UUID */
  selectedContentThumbnailFileUuid?: string;
  /** 교육자원 활용 여부 */
  isCourseUsed: boolean;
  /** 보안콘텐츠 여부 */
  isContentSecured: boolean;
  /** 검수 확인 여부 */
  isInspected: boolean;
  /** 저작권 확인 여부 */
  isCopyrighted: boolean;
  /** 콘텐츠 추가정보 코드 */
  contentAddInfoType?: ContentAddInfoType | string;
  /** 콘텐츠 추가 정보 */
  contentAddInfo?: string | number;
  /** 보안 확인 여부 */
  isSecured: boolean;
  /** 삭제 여부 */
  isDeleted: boolean;
  /** 공개 여부 */
  isOpened: boolean;
  /** 태그 리스트 */
  tags: string[];
}

export interface ContentInformation extends ContentBaseInfo {
  /** 콘텐츠 UUID*/
  contentUuid: string;
  /** 국가 언어 코드 */
  langCountryCode: string; //	국가 언어 코드[...]
  /** 콘텐츠 생성 유형  */
  createType: ContentCreateType; //	, MANUAL|TRASLATE|SHARED[...]
  /** 콘텐츠 분류 코드 */
  contentType: ContentType; //	 Enum(ContentType) - VIDEO|EXAM|SURVEY|ASSIGNMENT|HTML5|YOUTUBE|BLOG|SCORM|DEFAULT[...]
  /** 콘텐츠 상태 코드 */
  contentStatusCode?: ContentStatusCode; //	 Enum(ContentStatusCode) - TEMPORARY_SAVE|SAVED|DELETED[...]
  /** 채널명 */
  channelName: string;
  /** 테넌트 이름 */
  tenantName?: string;

  /** 썸네일 파일 목록 */
  thumbnailFiles: ContentFileInfo[];

  /** 파일 UUID */
  fileUuid?: string;

  /** 임시저장 여부 */
  isDrafted: boolean;

  /** 학습자원 개요 (AI자동추출) */
  aiSummary?: string;
  /** 키워드 (AI자동추출) */
  aiKeyword?: string;
  children: any[];
  resource?: Resource;
  createdBy?: string;
  creatorName?: string;
  createdDate?: Date | undefined;
  lastModifiedBy?: string;
  modifyerName?: string;
  modifiedDate?: Date | undefined;
}

export type GetContentDetailRes = ContentInformation;

export type PostContentCopyRes = ContentInformation;

export interface GetContentsParams extends PaginationRequest {
  tenantId: string;
  channelUuid: string;
  contentTypes?: string[];
  contentName?: string;
  isVendored?: boolean;
  isContentEnabled?: boolean;
  isCourseUsed?: boolean;
  coordinatorName?: string;
  langCountryCode?: string;
  // isMockUp?:boolean;
}

export interface ContentInfo {
  tenantId: string; // 테넌트 id
  tenantName: string; //	테넌트 이름[...]
  channelUuid: string; //	채널 UUID[...]
  channelName: string; //	채널명[...]
  contentUuid: string; //	콘텐츠 uuid[...]
  contentName: string; //	학습자원명[...]
  contentType: ContentType; //	콘텐츠 분류 코드 Enum(ContentType) - VIDEO|EXAM|SURVEY|ASSIGNMENT|HTML5|YOUTUBE|BLOG|SCORM|DEFAULT[...]
  groupContentId: string; //	학습자원 그룹ID[...]
  createType: ContentCreateType; //	콘텐츠 생성 유형, MANUAL|TRANSLATE|SHARED[...]
  contentStatusCode: ContentStatusCode; //	콘텐츠 상태 코드 Enum(ContentStatusCode) - TEMPORARY_SAVE|SAVED|DELETED[...]
  isContentEnabled: string; //	사용 가능 여부[...]
  coordinatorUuid: string; //	담당자 ID[...]
  coordinatorName: string; //	담당자명[...]
  contentAddInfoType: ContentAddInfoType; //	콘텐츠 추가정보 코드 Enum(ContentAddInfoType) - VIDEO_ADD_INFO(초)|EXAM_ADD_INFO(건수)[...]
  contentAddInfo: string; //	콘텐츠 추가 정보, 콘텐츠 추가정보 코드 별 초/건수 값[...]
  langCountryCode: string; //	국가 언어 코드[...]
  createdBy: string; //	최초등록자아이디[...]
  createdDate: string; //	최초등록타임스탬프[...]
  lastModifiedBy: string; //	최종수정자아이디[...]
  modifiedDate: string; //	최종수정타임스탬프[...]
  creatorName: string; //	최초등록자명[...]
  modifyerName: string; //	최종수정자명[...]
}

export type GetContentsRes = PaginationResponse<ContentInfo>;

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

export interface PostDraftHtmlVideoRes {
  contentUuid: string;
  fileUuid: string;
  contentType: FileType;
  contentStatusCode: FileStatus;
  processingStatus: ProcessingStatus;
  isDrafted: boolean;
}

export type HtmlVideoStatus = PostDraftHtmlVideoRes;

export interface HtmlVideoMetadataReq extends MediaContentSaveReq {
  contentUuid: string;
}

export interface HtmlVideoMetadataRes extends HtmlVideoMetadataReq {
  processingStatus: ProcessingStatus;
  resource?: Resource;
}

export type HtmlVideoDetailRes = GetContentDetailRes;

export interface HtmlVideoFileChangeReq {
  contentUuid: string;
  fileUuid: string;
}

export interface HtmlVideoFileChangeRes extends HtmlVideoFileChangeReq {
  changeId: number;
  processingStatus: ProcessingStatus;
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

export interface ContentCourseMappingParams extends PaginationRequest {
  courseType?: CourseType;
  courseName?: string;
}

export interface Content {
  courseId: number; //	과정 ID integer($int64)
  courseUuid: string; //	과정 UUID string
  courseName: string; //	과정명 string
  courseType: CourseType; //	과정 타입 string enum ELEARNING, ELEARNING1, ELEARNING2, CLASS, LIVE, EXAM, SURVEY
  courseContent: string; //	과정내용 string
  channelId: number; //	채널Id integer($int64)
  channelUuid: string; //	채널 UUID string
  channelName: string; //	채널명 string
  openingYear: number; //	개설년도 integer($int32)
  courseValidityStartDate: string; //	노출기간 시작일 string($date-time)
  courseValidityEndDate: string; //	노출기간 종료일 string($date-time)
}

export type ContentCourseMappingRes = PaginationResponse<Content>;

export interface TestPaperBasicInfoSaveReq extends MediaContentSaveReq {
  contentUuid?: string;
  examTemplateType: ExamTemplateType;
  questionCount: number;
  questionCountPerPage: number;
  examLimitTime: number;
  maxAttemptCount: number;
  isMoveQuestion: boolean;
  isShowResult: boolean;
  isShowTotalScore: boolean;
  isShowQuestion: boolean;
  isShowScore: boolean;
  isShowCorrectAnswer: boolean;
  isShowAnswerExplain: boolean;
  resultVisibleTime: ExamResultVisibleMoment;
  isDisableWrongRetry: boolean;
  isAutoSubmit: boolean;
  isExamEndNotice: boolean;
  examEndNoticeOffsetMinutes: number;
  examEndNoticeMessage: string;
  questionGenType?: ExamQuestionGenType;
}

export interface TestPaperBasicInfoSaveRes {
  examUuid: string;
  examPoolUuid: string;
}

export interface TestPaperBasicInfoDetail extends GetContentDetailRes {
  examTemplateType: ExamTemplateType;
  questionCount: number;
  questionCountPerPage: number;
  examLimitTime: number;
  maxAttemptCount: number;
  isMoveQuestion: boolean;
  isShowResult: boolean;
  isShowTotalScore: boolean;
  isShowQuestion: boolean;
  isShowScore: boolean;
  isShowCorrectAnswer: boolean;
  isShowAnswerExplain: boolean;
  resultVisibleTime: ExamResultVisibleMoment;
  isDisableWrongRetry: boolean;
  isAutoSubmit: boolean;
  isExamEndNotice: boolean;
  examEndNoticeOffsetMinutes: number;
  examEndNoticeMessage: string;
  questionGenType?: ExamQuestionGenType;
  examPoolUuid?: string;
}

export enum ExamTemplateType {
  EXAM = 'EXAM',
  OMR = 'OMR',
  QUIZ = 'QUIZ',
}

export enum ExamResultVisibleMoment {
  ON_EXAM_END = 'ON_EXAM_END',
  ON_SUBMIT = 'ON_SUBMIT',
}

export enum ExamQuestionGenType {
  FIXED = 'FIXED',
  RANDOM = 'RANDOM',
}

export type TestPaperDetailRes = GetContentDetailRes;

export interface GetVideoStatusRes {
  contentUuid: string;
  fileUUid: string;
  contentType: ContentType;
  contentStatusCode: ContentStatusCode;
  processingStatus: ProcessingStatus;
  isDrafted: boolean;
}

interface VideoFileInfo {
  groupUuid: string;
  fileId: number;
  fileUuid: string;
  fileName: string;
  storageType: 'S3' | 'HMG';
  bucket: string;
  filePath: string;
  fileSize: number;
  extType: string;
  uploadStatus: FileStatus;
}

interface EncodedVideo {
  contentUuid: string;
  m3u8Url: string;
  height: number;
  width: number;
  filePath: string;
}

interface EncodedAudio {
  contentUuid: string;
  fileUrl: string;
  filePath: string;
}

interface VideoSubtitles {
  subtitleFileUuid: string;
  languageCode: string;
  subtitleName: string;
  subtitleUrl?: string;
}

export interface GetVideoResourceRes {
  contentUuid: string;
  contentName: string;
  languageCountryCode: string;
  contentStatusCode: ContentStatusCode;
  fileInfo: VideoFileInfo;
  masterVideo: string | null;
  contentAddInfo: number;
  encodedVideos: EncodedVideo[] | null;
  encodedAudios: EncodedAudio[] | null;
  videoSubtitles: VideoSubtitles[];
}

export enum EnQuestionType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  OX = 'OX',
  SHORT_ANSWER = 'SHORT_ANSWER',
  ESSAY = 'ESSAY',
}

export enum EnQuestionLevel {
  HARD = 'HARD',
  MEDIUM = 'MEDIUM',
  EASY = 'EASY',
}
export interface QuestionItem {
  sortSeq: number;
  examQuestionUuid: string;
  questionText: string;
  questionType: EnQuestionType;
  explainText: string;
  questionLevel: EnQuestionLevel;
  fileUuid: string;
  optionCount: number;
  isUsed: boolean;
  options: QuestionItemOption[];
}

export interface QuestionItemDeleteParam {
  contentUuid: string;
  contentType: string;
  questionUuidList: string[];
}

export interface QuestionItemGridRow extends QuestionItem {
  orderChange: string;
}
export interface QuestionItemOption {
  sortSeq: number;
  examOptionText: string;
  isCorrectAnswer: boolean;
  fileUuid: string;
}

export type SelectedQuestionState = Record<
  EnQuestionType,
  Partial<Record<EnQuestionLevel, number | `${number}`>>
>;
