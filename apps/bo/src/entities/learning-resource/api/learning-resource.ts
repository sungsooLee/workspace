import { fileDownload, httpService } from '@learnway/shared';
import { faker } from '@faker-js/faker';
import { CMSApiPrefix, PMSApiPrefix } from '@learnway/config';
import {
  BlogCreateReq,
  BlogUpdateReq,
  ContentBaseInfo,
  ContentCourseMappingParams,
  ContentCourseMappingRes,
  GetContentDetailRes,
  GetContentsParams,
  GetContentsRes,
  GetVideoResourceRes,
  GetVideoStatusRes,
  HtmlVideoFileChangeReq,
  HtmlVideoMetadataReq,
  HtmlVideoStatus,
  PostContentCopyRes,
  PostDraftHtmlVideoParams,
  PostDraftVideosParams,
  PostDraftVideosRes,
  QuestionItem,
  TestPaperBasicInfoSaveReq,
  TestPaperBasicInfoSaveRes,
} from '@types';

export default class LearningResourceService {
  static fetchChannelsByTenantId(param: {
    tenantId: string | number;
    channelName?: string;
  }): Promise<any> {
    const params = { page: 0, size: 2000, ...param };
    return httpService.get(`${PMSApiPrefix()}/channel`, params);
  }

  static fetchUser(uuid: string): Promise<any> {
    return httpService.get(`${PMSApiPrefix()}/users/` + uuid);
  }

  static fetchContents(params: GetContentsParams): Promise<GetContentsRes> {
    return httpService.get(`${CMSApiPrefix()}/contents`, params);
  }

  static fetchContent(contentUuid?: string): Promise<GetContentDetailRes> {
    return httpService.get(`${CMSApiPrefix()}/content/${contentUuid}`);
  }

  static fetchContentCourseMapping(
    contentUuid: string,
    params: ContentCourseMappingParams,
  ): Promise<ContentCourseMappingRes> {
    return httpService.get(`${CMSApiPrefix()}/content/course-mapping/${contentUuid}`, params);
  }

  static deleteContent(contentUuid: string): Promise<number> {
    return httpService.delete(`${CMSApiPrefix()}/content/${contentUuid}`);
  }

  static fetchCurriculumMapping(contentUuid: string): Promise<boolean> {
    return httpService.get(`${CMSApiPrefix()}/content/curriculum-mapping/${contentUuid}`);
  }

  static postContentCopy(contentUuid: string): Promise<PostContentCopyRes> {
    return httpService.post(`${CMSApiPrefix()}/content/${contentUuid}/copy`, {});
  }

  static postDraftVideos(params: PostDraftVideosParams): Promise<PostDraftVideosRes> {
    return httpService.post(`${CMSApiPrefix()}/videos/draft`, params);
  }

  static fetchLearningResources(params: any) {
    return new Promise((resolve) => {
      const learnings = Array.from({ length: 10 }, (_, id) => ({
        id: id + 1,
        tenant: faker.food.fruit(),
        channel: faker.food.fruit(),
        type: faker.food.fruit(),
        learningResourceName: faker.food.fruit(),
        fileType: faker.food.fruit(),
        fileSize: faker.food.fruit(),
        managerName: faker.person.fullName(),
        source: faker.food.fruit(),
        preview: faker.food.fruit(),
        educationConjugation: faker.food.fruit(),
        procedureCnt: faker.food.fruit(),
        isSecureContents: faker.food.fruit(),
        sharedChannel: faker.food.fruit(),
        inspection: faker.food.fruit(),
        available: faker.food.fruit(),
        registerUser: faker.food.fruit(),
        registerDateTime: faker.food.fruit(),
        modifyUser: faker.food.fruit(),
        modifyDateTime: faker.food.fruit(),
      }));
      resolve({ content: learnings, pageable: { pageSize: 10, pageIndex: 0, totalElements: 55 } });
    });
  }
  static fetchMappingCourses(params: any) {
    return new Promise((resolve) => {
      const mappingCourses = Array.from({ length: 10 }, (_, id) => ({
        id: id + 1,
        tenant: faker.food.fruit(),
        channel: faker.food.fruit(),
        type: faker.food.fruit(),
        learningResourceName: faker.food.fruit(),
        learningPeriod: faker.food.fruit(),
        courseDetail: faker.food.fruit(),
      }));
      resolve({
        content: mappingCourses,
        pageable: { pageSize: 10, pageIndex: 0, totalElements: 55 },
      });
    });
  }
  static fetchSharedHistories(params: any) {
    return new Promise((resolve) => {
      const sharedHistories = Array.from({ length: 10 }, (_, id) => ({
        id: id + 1,
        tenant: faker.food.fruit(),
        channel: faker.food.fruit(),
        sharedDt: faker.date.anytime().toDateString(),
      }));
      resolve({
        content: sharedHistories,
        pageable: { pageSize: 10, pageIndex: 0, totalElements: 55 },
      });
    });
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

  // HTML5 동영상 콘텐츠 리소스 조회
  static fetchHTML5Resource(contentUuid: string) {
    return httpService.get(`${CMSApiPrefix()}/html5/${contentUuid}/resource`);
  }

  static fetchProgramGuideDownload() {
    return new Promise((resolve) => {
      const sharedHistories = Array.from({ length: 10 }, (_, id) => ({
        id: id + 1,
        fileName: faker.food.fruit(),
      }));
      resolve({
        content: sharedHistories,
      });
    });
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
  static getQuestionList(contentUuid: string) {
    return httpService.get<any>(`${CMSApiPrefix()}/exam/questions/${contentUuid}`);
  }

  /**
   * 비디오 컨텐츠 상태 조회
   */
  static getVideoStatus(contentUuid: string) {
    return httpService.get<GetVideoStatusRes>(`${CMSApiPrefix()}/video/${contentUuid}/status`);
  }

  /**
   * 동영상 학습자원 상세 조회
   */
  static getVideoResource(contentUuid: string) {
    return httpService.get<GetVideoResourceRes>(`${CMSApiPrefix()}/video/${contentUuid}/resource`);
  }
}
