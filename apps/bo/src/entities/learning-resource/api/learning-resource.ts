import { CMSApiPrefix, PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { omit, pick } from 'lodash-es';
import {
  AssignmentSubmissionItem,
  BlogCreateReq,
  BlogUpdateReq,
  ChannelCodeType,
  ContentBaseInfo,
  ContentCourseMappingParams,
  ContentCourseMappingRes,
  ContentExportReq,
  ContentExportRes,
  ContentSharingInfoReq,
  ContentSharingInfoRes,
  ExamPaperQuestionCountUpdateReq,
  FetchTranslationListRes,
  GetContentDetailRes,
  GetContentRemovableRes,
  GetContentsParams,
  GetContentsRes,
  GetScormFileChangeRes,
  GetScormResourceRes,
  GetScormStatusRes,
  GetSharedBoxContentsParams,
  GetSharedBoxContentsRes,
  GetSharedContentsParams,
  GetSharedContentsRes,
  GetSharedHistoryParams,
  GetSharedHistoryRes,
  GetShareTenantsChannelsParams,
  GetShareTenantsChannelsRes,
  GetVideoFileChangeRes,
  GetVideoResourceRes,
  GetVideoStatusRes,
  HtmlVideoChangeStatus,
  HtmlVideoFileChangeReq,
  HtmlVideoMetadataReq,
  HtmlVideoStatus,
  MutationResponse,
  PostContentCopyRes,
  PostDraftETCParams,
  PostDraftETCRes,
  PostDraftHtmlVideoParams,
  PostDraftScormParams,
  PostDraftScormRes,
  PostDraftVideosParams,
  PostDraftVideosRes,
  PostShareContentsParams,
  PostShareContentsRes,
  PutETCChangeParams,
  PutETCChangeRes,
  PutETCUpdateParams,
  PutETCUpdateRes,
  PutScormChangeParams,
  PutScormChangeRes,
  PutScormUpdateParams,
  PutScormUpdateRes,
  PutVideoChangeParams,
  PutVideoChangeRes,
  PutVideoUpdateParams,
  PutVideoUpdateRes,
  QuestionCountInfo,
  QuestionItem,
  QuestionItemDeleteParam,
  QuestionListForRetrieveReq,
  QuestionListForRetrieveRes,
  QuestionsCopyReq,
  QuestionSortReq,
  QuestionStatusUpdateReq,
  TenantCodeType,
  TestPaperBasicInfoSaveReq,
  TestPaperBasicInfoSaveRes,
  UpdateQuestionBankCountInfoReq,
} from '../model/learning-resource.types';

export default class LearningResourceService {
  static fetchChannelsByTenantId(param: {
    tenantId: string | number;
    channelName?: string;
  }): Promise<any> {
    const params = { page: 0, size: 2000, ...param };
    return httpService.get(`${PMSApiPrefix()}/channel`, params);
  }

  static fetchUser(uuid: string): Promise<any> {
    return httpService.get(`${PMSApiPrefix()}/users/${uuid}`);
  }

  static fetchContents(params: GetContentsParams): Promise<GetContentsRes> {
    return httpService.get(`${CMSApiPrefix()}/contents`, params);
  }

  static fetchContent(contentUuid: string): Promise<GetContentDetailRes> {
    return httpService.get(`${CMSApiPrefix()}/content/${contentUuid}`);
  }

  static getContentRemovable(contentUuid: string) {
    return httpService.get<GetContentRemovableRes>(
      `${CMSApiPrefix()}/content/${contentUuid}/removable`,
    );
  }

  static fetchContentCourseMapping(
    contentUuid: string,
    params: ContentCourseMappingParams,
  ): Promise<ContentCourseMappingRes> {
    return httpService.get(`${CMSApiPrefix()}/content/course-mapping/${contentUuid}`, params);
  }

  static fetchTranslationList(contentUuid: string) {
    return httpService.get<FetchTranslationListRes>(
      `${CMSApiPrefix()}/content/${contentUuid}/translation/list`,
    );
  }

  static deleteContent(contentUuid: string): Promise<number> {
    return httpService.delete(`${CMSApiPrefix()}/content/${contentUuid}`);
  }

  static fetchCurriculumMapping(contentUuid: string): Promise<boolean> {
    return httpService.get(`${CMSApiPrefix()}/content/curriculum-mapping/${contentUuid}`);
  }

  static postContentExport(body: ContentExportReq): Promise<ContentExportRes> {
    return httpService.post(
      `${CMSApiPrefix()}/content/${body.contentUuid}/export`,
      omit(body, 'contentUuid'),
    );
  }

  static fetchContentSharingInfo(params: ContentSharingInfoReq): Promise<ContentSharingInfoRes> {
    const { contentUuid, tenantId, channelUuid } = params;
    return httpService.get(`${CMSApiPrefix()}/content/${contentUuid}/channel/sharing`, {
      tenantId,
      channelUuid,
    });
  }

  static postContentCopy(contentUuid: string): Promise<PostContentCopyRes> {
    return httpService.post(`${CMSApiPrefix()}/content/${contentUuid}/copy`, {});
  }

  static postDraftVideos(params: PostDraftVideosParams): Promise<PostDraftVideosRes> {
    return httpService.post(`${CMSApiPrefix()}/videos/draft`, params);
  }

  static postDraftScorm(params: PostDraftScormParams): Promise<PostDraftScormRes> {
    return httpService.post(`${CMSApiPrefix()}/scorm/draft`, params);
  }

  static postDraftETC(params: PostDraftETCParams): Promise<PostDraftETCRes> {
    return httpService.post(`${CMSApiPrefix()}/etc/draft`, params);
  }

  static putVideoUpdate(params: PutVideoUpdateParams) {
    return httpService.put<PutVideoUpdateRes>(`${CMSApiPrefix()}/video/update`, params);
  }

  static putScormUpdate(params: PutScormUpdateParams) {
    return httpService.put<PutScormUpdateRes>(`${CMSApiPrefix()}/scorm/update`, params);
  }

  static putETCUpdate(params: PutETCUpdateParams) {
    return httpService.put<PutETCUpdateRes>(`${CMSApiPrefix()}/etc/update`, params);
  }

  static putVideoChange(params: PutVideoChangeParams) {
    return httpService.put<PutVideoChangeRes>(`${CMSApiPrefix()}/video/file/change`, params);
  }

  static putScormChange(params: PutScormChangeParams) {
    return httpService.put<PutScormChangeRes>(`${CMSApiPrefix()}/scorm/file/change`, params);
  }

  static putETCChange(params: PutETCChangeParams) {
    return httpService.put<PutETCChangeRes>(`${CMSApiPrefix()}/etc/file/change`, params);
  }

  // 단건 HTML5 임시 컨텐츠 생성
  static createHTML5Draft(body: PostDraftHtmlVideoParams) {
    return httpService.post(`${CMSApiPrefix()}/html5/draft`, body);
  }

  // HTML5 동영상 메타 정보 저장
  static updateHTML5Metadata(body: HtmlVideoMetadataReq) {
    return httpService.put(`${CMSApiPrefix()}/html5/update`, body);
  }

  // HTML5 동영상 파일 변경
  static updateHTML5FileChange(body: HtmlVideoFileChangeReq): Promise<any> {
    return httpService.put(`${CMSApiPrefix()}/html5/file/change`, body);
  }
  // HTML5 동영상 상태 조회
  static fetchHTML5Status(contentUuid: string): Promise<HtmlVideoStatus> {
    return httpService.get(`${CMSApiPrefix()}/html5/${contentUuid}/status`);
  }
  // HTML5 동영상 파일변경 상태 조회
  static fetchHTML5FileChangeStatus(changeId: number): Promise<HtmlVideoChangeStatus> {
    return httpService.get(`${CMSApiPrefix()}/html5/file/change/${changeId}`);
  }

  // HTML5 동영상 콘텐츠 리소스 조회
  static fetchHTML5Resource(contentUuid: string) {
    return httpService.get(`${CMSApiPrefix()}/html5/${contentUuid}/resource`);
  }

  // 단건 블로그 컨텐츠 조회
  static fetchBlogResource(contentUuid: string) {
    return httpService.get(`${CMSApiPrefix()}/blog/${contentUuid}/resource`);
  }

  // 단건 블로그 컨텐츠 생성
  static createBlogContent(body: BlogCreateReq) {
    return httpService.post(`${CMSApiPrefix()}/blog/save`, body);
  }

  // 단건 블로그 컨텐츠 수정
  static updateBlogContent(body: BlogUpdateReq) {
    return httpService.put(`${CMSApiPrefix()}/blog/update`, body);
  }

  // 시험지 컨텐츠 단건 등록 (기본정보)
  static createExamPaperContent(body: TestPaperBasicInfoSaveReq) {
    return httpService.post(`${CMSApiPrefix()}/exam`, body);
  }

  // 시험지 컨텐츠 단건 수정 (기본정보)
  static updateExamPaperContent(body: TestPaperBasicInfoSaveReq) {
    return httpService.put(`${CMSApiPrefix()}/exam`, body);
  }

  /**
   * 시험지의 유형별/난이도별 문항수 수정
   * @param body
   */
  static updateExamPaperQuestionCountInfo(body: ExamPaperQuestionCountUpdateReq) {
    return httpService.put(`${CMSApiPrefix()}/exam/add`, body);
  }

  /**
   * 랜덤형 문항의 유형별 출제 문제수를 조회한다.
   * @param examUuid
   */
  static fetchExamRandomQuestionCount(examUuid: string): Promise<QuestionCountInfo[]> {
    return httpService.get(`${CMSApiPrefix()}/exam/random/${examUuid}`);
  }

  /**
   * 문제은행 기본 정보 저장
   * @param body
   * @returns
   */
  static createQuestionBankContent(body: ContentBaseInfo) {
    return httpService.post<TestPaperBasicInfoSaveRes>(`${CMSApiPrefix()}/exam/pool`, body);
  }

  static updateQuestionBankContent(body: ContentBaseInfo) {
    return httpService.put<TestPaperBasicInfoSaveRes>(`${CMSApiPrefix()}/exam/pool`, body);
  }

  /**
   * 문제은행 유형별/난이도별 문항수 수정
   * @param body
   */
  static updateQuestionBankQuestionCountInfo(body: UpdateQuestionBankCountInfoReq) {
    return httpService.put(`${CMSApiPrefix()}/exam/pool/add`, body);
  }

  /**
   * 시험, 문제은행 문항 등록
   * @param body
   * @returns
   */
  static createQuestionItem(body: QuestionItem) {
    return httpService.post<any>(`${CMSApiPrefix()}/exam/question`, body);
  }
  /**
   * 문제은행 or 시험지의 문항 목록 조회
   * @param contentUuid
   * @returns
   */
  static getQuestionItemList(contentUuid: string) {
    return httpService.get<QuestionItem[]>(`${CMSApiPrefix()}/exam/questions/${contentUuid}`);
  }

  /**
   * 문항 상세 정보 조회
   * @param questionUuid
   * @returns
   */
  static getQuestionItem(questionUuid: string) {
    return httpService.get<QuestionItem>(`${CMSApiPrefix()}/exam/question/${questionUuid}`);
  }

  /**
   * 문제은행 or 시험지의 문항 삭제
   * @param param
   * @returns
   */
  static deleteQuestionItemList(param: QuestionItemDeleteParam) {
    return httpService.delete(`${CMSApiPrefix()}/exam/question`, param);
  }

  /**
   * 각 문항의 사용 여부 변경
   * @param body
   */
  static updateQuestionStatus(body: QuestionStatusUpdateReq) {
    return httpService.put(`${CMSApiPrefix()}/exam/question/status`, body);
  }

  /**
   * 문항가져오기 팝업용 목록 조회
   * @param params
   */
  static fetchQuestionListForRetrieve(
    params: QuestionListForRetrieveReq,
  ): Promise<QuestionListForRetrieveRes[]> {
    return httpService.get(`${CMSApiPrefix()}/exam/questions/pool`, params);
  }

  /**
   * 시험 문항 단건 또는 다건 복사
   * @param body
   */
  static copyQuestionsToExamPaper(body: QuestionsCopyReq): Promise<MutationResponse> {
    return httpService.post(`${CMSApiPrefix()}/exam/questions/copy`, body);
  }

  /**
   * 시험 문항 순서 변경
   * @param body
   */
  static changeQuestionOrder(body: QuestionSortReq): Promise<MutationResponse> {
    return httpService.put(`${CMSApiPrefix()}/exam/question/sort`, body);
  }

  /**
   * 과제 단건 등록
   */
  static createAssignment(body: ContentBaseInfo): Promise<string> {
    return httpService.post(`${CMSApiPrefix()}/assignment`, body);
  }

  /**
   * 과제 단건 수정
   */
  static updateAssignment(body: ContentBaseInfo): Promise<string> {
    return httpService.put(`${CMSApiPrefix()}/assignment`, body);
  }

  /**
   * 과제 화면 내 과제물 목록 조회
   * @param contentUuid
   */
  static fetchAssignmentSubmissionList(contentUuid: string): Promise<AssignmentSubmissionItem[]> {
    return httpService.get(`${CMSApiPrefix()}/assignment/submissions/${contentUuid}`);
  }

  /**
   * 비디오 컨텐츠 상태 조회
   */
  static getVideoStatus(contentUuid: string) {
    return httpService.get<GetVideoStatusRes>(`${CMSApiPrefix()}/video/${contentUuid}/status`);
  }

  /**
   * 비디오 컨텐츠 상태 조회
   */
  static getScormStatus(contentUuid: string) {
    return httpService.get<GetScormStatusRes>(`${CMSApiPrefix()}/scorm/${contentUuid}/status`);
  }

  /**
   * 비디오 파일변경 상태 조회
   */
  static getVideoFileChange(resourceId: number) {
    return httpService.get<GetVideoFileChangeRes>(
      `${CMSApiPrefix()}/video/file/change/${resourceId}`,
    );
  }

  /**
   * 스콤 파일변경 상태 조회
   */
  static getScormFileChange(resourceId: number) {
    return httpService.get<GetScormFileChangeRes>(
      `${CMSApiPrefix()}/scorm/file/change/${resourceId}`,
    );
  }

  /**
   * 동영상 교육자원 상세 조회
   */
  static getVideoResource(contentUuid: string) {
    return httpService.get<GetVideoResourceRes>(`${CMSApiPrefix()}/video/${contentUuid}/resource`);
  }

  /**
   * 스콤 교육자원 상세 조회
   */
  static getScormResource(contentUuid: string) {
    return httpService.get<GetScormResourceRes>(`${CMSApiPrefix()}/scorm/${contentUuid}/resource`);
  }

  /**
   * 공유 팝업 테넌트 코드 목록
   */
  static getShareTenantCodes(contentUuid: string) {
    return httpService.get<TenantCodeType[]>(
      `${CMSApiPrefix()}/contents/share/${contentUuid}/tenant/codes`,
    );
  }

  /**
   * 공유 팝업 좌측 테넌트-채널 코드 목록
   */
  static getShareTenantsChannels(params: GetShareTenantsChannelsParams) {
    return httpService.get<GetShareTenantsChannelsRes>(
      `${CMSApiPrefix()}/contents/share/${params.contentUuid}/tenants/${params.tenantId}/channels`,
      pick(params, 'channelName'),
    );
  }
  /**
   * 공유 팝업 공유채널 목록 조회
   */
  static getSharedContents(params: GetSharedContentsParams) {
    return httpService.get<GetSharedContentsRes>(`${CMSApiPrefix()}/contents/share`, params);
  }

  /**
   * 공유 팝업 공유채널 목록 저장
   */
  static postShareContents(params: PostShareContentsParams) {
    return httpService.post<PostShareContentsRes>(`${CMSApiPrefix()}/contents/share`, params);
  }

  /**
   * 공유함 교육자원 조회
   */
  static getSharedBoxContents(params: GetSharedBoxContentsParams) {
    return httpService.get<GetSharedBoxContentsRes>(
      `${CMSApiPrefix()}/contents/share/sharedBox`,
      params,
    );
  }

  /**
   * 공유함 출발지 테넌트 코드 목록 조회
   */
  static getSharedBoxTenantCodes(lastVisitedBoRoleId: number) {
    return httpService.get<TenantCodeType[]>(
      `${CMSApiPrefix()}/contents/share/sharedBox/tenant/codes`,
      { lastVisitedBoRoleId },
    );
  }

  /**
   * 공유함 출발지 채널 코드 목록 조회
   */
  static getSharedBoxChannelCodes(srcTenantId: number) {
    return httpService.get<ChannelCodeType[]>(
      `${CMSApiPrefix()}/contents/share/sharedBox/tenant/channel/codes`,
      { srcTenantId },
    );
  }

  /**
   *
   */
  static getSharedHistory({ sourceContentUuid, destChannelUuid }: GetSharedHistoryParams) {
    return httpService.get<GetSharedHistoryRes>(
      `${CMSApiPrefix()}/contents/share/sharedBox/${sourceContentUuid}/history`,
      { destChannelUuid },
    );
  }
}
