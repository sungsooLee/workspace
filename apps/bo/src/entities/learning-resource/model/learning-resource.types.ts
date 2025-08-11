import { PaginationRequest, PaginationResponse } from '@learnway/ui/type';
import { CourseType } from '@shared/types';
import {
  ContentAddInfoType,
  ContentCreateType,
  ContentStatusCode,
  ContentType,
  FileStatus,
  FileType,
  ProcessingStatus,
} from '@shared/types/enums';

export interface MediaContentSaveReq {
  contentName: string;
  languageCountryCode: string;
  tenantId: number;
  channelUuid: string;
  description: string;
  coordinatorUuid: string;
  coordinatorName: string;
  coordinatorTelCountryCode?: string;
  coordinatorTelNo: string;
  isUnlimited: boolean;
  contentUseStartDate: Date | undefined;
  contentUseEndDate: Date | undefined;
  isVendored: boolean;
  vendorCode: string | number;
  vendorName: string;
  vendorCoordinatorName: string;
  vendorTelCountryCode?: string;
  vendorTelNo: string;
  contentThumbnailFileGroupUuid?: string;
  selectedContentThumbnailFileUuid?: string;
  isCourseUsed: boolean;
  isInspected: boolean;
  isCopyrighted: boolean;
  isDeleted: boolean;
  isOpened: boolean;
  tags: Tag[] | string[];
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

export type PostDraftScormParams = PostDraftVideosParams;

export interface PostDraftHtmlVideoParams {
  tenantId: string;
  channelUuid: string;
  languageCountryCode: string;
  fileUuid: string;
}

export interface HtmlVideoChangeStatus {
  changeId: number;
  contentUuid: string;
  fileUuid: string;
  processingStatus: ProcessingStatus;
}

export type PostDraftETCParams = PostDraftHtmlVideoParams;

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

export interface Tag {
  tagId?: number;
  tagName: string;
}

/**
 * 컨텐츠 기본 정보
 */
export interface ContentBaseInfo {
  /** 교육자원명 */
  contentName: string;
  /** 국가 언어 코드 */
  languageCountryCode: string;
  /** 테넌트 ID */
  tenantId?: number;
  /** 채널 UUID */
  channelUuid: string;
  /** 교육자원 설명 */
  description?: string;
  /** 담당자 UUID */
  coordinatorUuid: string;
  /** 담당자명 */
  coordinatorName: string;
  /** 담당자 연락처 국가코드 */
  coordinatorTelCountryCode: string;
  /** 담당자 연락처 */
  coordinatorTelNo: string;

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
  /** 검수 확인 여부 */
  isInspected: boolean;
  /** 저작권 확인 여부 */
  isCopyrighted: boolean;
  /** 콘텐츠 추가정보 코드 */
  contentAddInfoType?: ContentAddInfoType | string;
  /** 콘텐츠 추가 정보 */
  contentAddInfo?: string | number;
  /** 삭제 여부 */
  isDeleted: boolean;
  /** 공개 여부 */
  isOpened: boolean;
  /** 태그 리스트 */
  tags: Tag[] | string[];
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

  /** 교육자원 개요 (AI자동추출) */
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
  images?: any[];
}

export type GetContentDetailRes = ContentInformation;

export type GetContentRemovableRes = 'REMOVABLE' | 'REASON_TRANSLATE' | 'REASON_SHARED';

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
  tenantId: number; // 테넌트 id
  tenantName: string; //	테넌트 이름[...]
  channelUuid: string; //	채널 UUID[...]
  channelName: string; //	채널명[...]
  contentUuid: string; //	콘텐츠 uuid[...]
  contentName: string; //	교육자원명[...]
  contentType: ContentType; //	콘텐츠 분류 코드 Enum(ContentType) - VIDEO|EXAM|SURVEY|ASSIGNMENT|HTML5|YOUTUBE|BLOG|SCORM|DEFAULT[...]
  groupContentId: number; //	교육자원 그룹ID[...]
  createType: ContentCreateType; //	콘텐츠 생성 유형, MANUAL|TRANSLATE|SHARED[...]
  contentStatusCode: ContentStatusCode; //	콘텐츠 상태 코드 Enum(ContentStatusCode) - TEMPORARY_SAVE|SAVED|DELETED[...]
  isContentEnabled: boolean; //	사용 가능 여부[...]
  coordinatorUuid: string; //	담당자 ID[...]
  coordinatorName: string; //	담당자명[...]
  contentAddInfoType: ContentAddInfoType; //	콘텐츠 추가정보 코드 Enum(ContentAddInfoType) - VIDEO_ADD_INFO(초)|EXAM_ADD_INFO(건수)[...]
  contentAddInfo: number; //	콘텐츠 추가 정보, 콘텐츠 추가정보 코드 별 초/건수 값[...]
  languageCountryCode: string; //	국가 언어 코드[...]
  createdBy: string; //	최초등록자아이디[...]
  createdDate: string; //	최초등록타임스탬프[...]
  lastModifiedBy: string; //	최종수정자아이디[...]
  modifiedDate: string; //	최종수정타임스탬프[...]
  creatorName: string; //	최초등록자명[...]
  modifyerName: string; //	최종수정자명[...]
  contentId: number;
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

export type PostDraftScormRes = PostDraftVideosRes;

export interface PostDraftETCRes {
  contentUuid: string;
  contentType: ContentType;
  contentStatusCode: ContentStatusCode;
  isDrafted: boolean;
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
  contentStatusCode: ContentStatusCode;
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
  lastVisitedBoRoleId: number;
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

interface TranslationSituation {
  languageCountryCode: string;
  contentUuid?: string;
  contentName?: string;
  createType?: ContentCreateType;
  groupContentId?: number;
  contentType: ContentType;
}

export type FetchTranslationListRes = TranslationSituation[];

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

export type GetScormStatusRes = GetVideoStatusRes;

interface ResourceFileInfo {
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

export interface VideoSubtitle {
  subtitleFileUuid: string;
  languageCountryCode: string;
  subtitleName: string;
  subtitleUrl?: string;
}

export interface GetVideoResourceRes {
  contentUuid: string;
  contentName: string;
  languageCountryCode: string;
  contentStatusCode: ContentStatusCode;
  fileInfo: ResourceFileInfo;
  masterVideo: string | null;
  contentAddInfo: number;
  encodedVideos: EncodedVideo[] | null;
  encodedAudios: EncodedAudio[] | null;
  videoSubtitles: VideoSubtitle[];
}

interface ScormItem {
  itemTitle: string;
  scoId: string;
  itemFilePath: string;
  itemUrl: string;
  itemType: string;
  items?: ScormItem[];
}

export interface ScormOrgn {
  orgnId: number;
  orgnTitle: string;
  orgnElementId: string;
  items: ScormItem[];
}

export interface GetScormResourceRes {
  contentId: number;
  contentUuid: string;
  fileInfo: ResourceFileInfo;
  processingStatus: ProcessingStatus;
  children: ScormOrgn[];
}

export interface PutVideoChangeParams {
  contentUuid: string;
  fileUuid: string;
}

export type PutScormChangeParams = PutVideoChangeParams;

export type PutETCChangeParams = PutVideoChangeParams;

export interface PutETCChangeRes {
  //
}

export interface PutVideoChangeRes {
  resourceId: number;
  contentUuid: string;
  fileUuid: string;
  processingStatus: ProcessingStatus;
}

export type GetVideoFileChangeRes = PutVideoChangeRes;

export interface PutScormChangeRes {
  changeId: number;
  contentUuid: string;
  fileUuid: string;
  processingStatus: ProcessingStatus;
}

export type GetScormFileChangeRes = PutScormChangeRes;

export interface PutVideoUpdateParams extends ContentBaseInfo {
  videoSubtitles?: VideoSubtitle[];
}

export interface PutVideoUpdateRes extends ContentInformation {
  fileChangeId: number | null;
  processingStatus: ProcessingStatus;
  masterVideo: string | null;
  encodedVideos: EncodedVideo[] | null;
  encodedAudios: EncodedAudio[] | null;
  videoSubtitles: VideoSubtitle[];
}

export type PutScormUpdateParams = ContentBaseInfo;

export interface PutScormUpdateRes extends ContentInformation {
  fileChagngeId: number | null;
  processingStatus: ProcessingStatus;
  children: ScormOrgn[];
}

export type PutETCUpdateParams = ContentBaseInfo;

export interface PutETCUpdateRes extends ContentInformation {
  fileChangeId: number | null;
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
  contentUuid: string;
  examQuestionUuid: string;
  questionText: string;
  questionType: EnQuestionType;
  explainText: string;
  questionLevel: EnQuestionLevel;
  fileUuid: string;
  fileType: string;
  optionCount?: number;
  isUsed: boolean;
  options: QuestionItemOption[];
}

export interface QuestionBasicInfoDetail extends GetContentDetailRes {
  isExamMapping?: boolean;
}

export interface UpdateQuestionBankCountInfoReq {
  contentUuid: string;
  questionTotalCount: number;
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

export interface QuestionStatusUpdateReq {
  contentUuid: string;
  examQuestionUuid: string;
  isUsed: boolean;
}

export interface QuestionCountInfo {
  questionType: EnQuestionType;
  hardLevelCount: number;
  mediumLevelCount: number;
  easyLevelCount: number;
}

export interface ExamPaperQuestionCountUpdateReq {
  contentUuid: string;
  questionGenType: ExamQuestionGenType;
  questionTotalCount: number;
  countList: QuestionCountInfo[];
}

export interface QuestionListForRetrieveReq {
  examPoolUuid: string;
  tenantId: number;
  channelUuid: string;
  contentName?: string;
  questionType?: EnQuestionType;
  questionLevel?: EnQuestionLevel;
}

export interface QuestionListForRetrieveRes {
  contentName: string;
  examQuestionUuid: string;
  questionText: string;
  questionType: EnQuestionType;
  languageCountryCode: string;
  tenantName: string;
  channelName: string;
}

export interface QuestionsCopyReq {
  examPoolContentUuid: string;
  questionUuidList: string[];
}

export interface QuestionSortItem {
  examQuestionUuid: string;
  sortSeq: number;
}

export interface QuestionSortReq {
  contentUuid: string;
  contentType: ContentType;
  mappingList: QuestionSortItem[];
}

export interface AssignmentSubmissionCreateReq {
  contentUuid: string;
  assignmentSubmissionText: string;
  explainText: string;
  attachFileUuid: string;
  answerFileUuid: string;
}

export interface AssignmentSubmissionUpdateReq extends AssignmentSubmissionCreateReq {
  assignmentSubmissionUuid: string;
}

export interface AssignmentSubmissionItem {
  assignmentSubmissionUuid: string;
  assignmentSubmissionText: string;
  explainText: string;
  attachFileUuid: string;
  answerFileUuid: string;
  attachFileName: string;
  attachFileSize: number;
  attachFilePath: string;
  answerFileName: string;
  answerFileSize: number;
  answerFilePath: string;
}

export interface AssignmentSubmissionMutationReq {
  contentUuid: string;
  assignmentSubmissionUuidList: string[];
}

export interface MutationResponse {
  result: boolean;
}

export interface ContentExportReq {
  contentUuid: string;
  tenantId: number;
  destChannelUuid: string;
  languageCountryCode: string;
}

export interface ContentExportRes {
  srcTenantId: number;
  srcChannelUuid: string;
  srcContentUuid: string;
  destTenantId: number;
  destChannelUuid: string;
  destContentUuid: string;
  languageCountryCode: string;
  createType: ContentCreateType;
  contentType: ContentType;
}

export interface ContentSharingInfoReq {
  contentUuid: string;
  tenantId: number;
  channelUuid: string;
}

export interface ContentSharingInfoRes {
  isPossible: boolean;
  reason: string;
}

export type GetSharedContentsParams = ContentSharingInfoReq;

export interface SharedContent {
  sharedBoxId: number; //	integer($int64)
  sourceTenantId: number; //	출발지 테넌트 idinteger($int64)
  sourceTenantName: string; //	출발지 테넌트 이름string
  sourceChannelUuid: string; //	출발지 채널 UUIDstring
  sourceChannelName: string; //	출발지 채널 이름string
  destTenantId: number; //	도착지 테넌트 idinteger($int64)
  destTenantName: string; //	도착지 테넌트 이름string
  destChannelUuid: string; //	도착지 채널 UUIDstring
  destChannelName: string; //	도착지 테넌트 이름string
}

export type GetSharedContentsRes = SharedContent[];

export interface PostShareContentsParams {
  sourceContentUuid: string; //	string 출발지 콘텐츠 UUID
  sourceTenantId: number; //	integer($int64)
  sourceChannelUuid: string; //	string 출발지 채널 UUID
  isOriginalCopyDownload: boolean; //	boolean 원본파일 다운로드 여부
  shareDestinations: {
    destTenantId: number; //	integer($int64) 도착지 테넌트 id
    destChannelUuid: string; //	string 도착지 채널 UUID
  }[];
}

export interface PostShareContentsRes {
  contentUuid: string; //	콘텐츠 UUIDstring
  sourceTenantId: number; //	출발지 테넌트 idinteger($int64)
  sourceChannelUuid: string; //	출발지 채널 UUIDstring
  isOriginalCopyDownload: boolean; //	원본파일 다운로드 여부boolean
  shareDestinations: {
    sharedBoxId: number; //	공유함 IDinteger($int64)
    destTenantId: number; //	도착지 테넌트 idinteger($int64)
    destChannelUuid: string; //	도착지 채널 UUIDstring
  }[];
}

export interface TenantCodeType {
  tenantId: number;
  tenantName: string;
}

export interface GetShareTenantsChannelsParams {
  contentUuid: string;
  tenantId: number;
  channelName?: string;
}

export interface ChannelCodeType {
  channelUuid: string;
  channelName: string;
}

export type TenantChannelCodeType = TenantCodeType & ChannelCodeType;

export type GetShareTenantsChannelsRes = TenantChannelCodeType[];

export interface GetSharedBoxContentsParams extends PaginationRequest {
  lastVisitedBoRoledId: number;
  sourceTenantId: number;
  sourceChannelUuid: string;
  contentTypes?: ContentType[];
  contentName?: string;
  isContentEnabled?: boolean;
  languageCountryCode?: string;
  sharedDateStart?: string;
  sharedDateEnd?: string;
}

export interface SharedBoxContent extends Omit<SharedContent, 'sharedBoxId'> {
  sourceContentUuid: string; //	원본 교육자원 UUIDstring
  sourceContentName: string; //	원본 교육자원명string
  sourceGroupContentId: number; // 원본 교육자원 그룹ID
  sourceContentType: ContentType; // 원본 교육자원 유형, Enum(cms.content.ContentType)string
  contentCreateType: ContentCreateType; //	string
  languageCountryCode: string; //	원본 교육자원 국가 언어 코드string
  isContentEnabled: boolean; //	원본 교육자원 사용가능 여부boolean
  sharerUuid: string; //	공유자 UUIDstring
  sharerName: string; //	공유자명string
  sharedCount: string; //	공유 횟수integer($int64)
  sharedDate: string; //	공유타임스탬프string($date-time)
}

export type GetSharedBoxContentsRes = PaginationResponse<SharedBoxContent>;

export interface GetSharedHistoryParams {
  sourceContentUuid: string;
  destChannelUuid: string;
}

export interface ShareDestination {
  destContentUuid: string; //도착지 콘텐츠 UUID
  destContentName: string; //도착지 콘텐츠명
  destTenantId: number; //도착지 테넌트 ID
  destTenantName: string; //도착지 테넌트명
  destChannelUuid: string; //도착지 채널 UUID
  destChannelName: string; //도착지 채널 이름
  languageCountryCode: string; //도착지 콘텐츠 국가 언어 코드 Enum(pms.multilingual.LangCountryCode)
  languageCountryCodeName: string; //도착지 콘텐츠 국가 언어 코드
  recieverUuid: string; //수신자 UUID
  recieverName: string; //수신자이름
  recievedDate: Date;
}

export interface GetSharedHistoryRes {
  sourceContentUuid: string; //	출발지 콘텐츠 UUIDstring
  sourceContentName: string; //	출발지 콘텐츠명string
  sourceTenantId: number; //	출발지 테넌트 IDinteger($int64)
  sourceTenantName: string; //	출발지 테넌트명string
  sourceChannelUuid: string; //	출발지 채널 UUIDstring
  sourceChannelName: string; //	출발지 채널 이름string
  languageCountryCode: string; //	출발지 콘텐츠 국가 언어 코드string
  languageCountryCodeName: string; //	출발지 콘텐츠 국가 언어명string
  shareDestinations: ShareDestination[];
}
