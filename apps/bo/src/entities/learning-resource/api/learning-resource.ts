import { fileDownload, httpService } from '@learnway/shared';
import { faker } from '@faker-js/faker';
import { CMSApiPrefix, PMSApiPrefix } from '@learnway/config';
import {
  BlogCreateReq,
  BlogUpdateReq,
  BlogWatchLogReq,
  CourseMappingStatusRes,
  GetContentDetailRes,
  PostDraftVideosParams,
  PostDraftVideosRes,
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

  static fetchContents(params: any): Promise<any> {
    return httpService.get(`${CMSApiPrefix()}/contents`, params);
  }

  static fetchContent(contentUuid: string): Promise<GetContentDetailRes> {
    return httpService.get(`${CMSApiPrefix()}/content/${contentUuid}`);
  }

  static deleteContent(contentUuid: string): Promise<any> {
    return httpService.delete(`${CMSApiPrefix()}/content/${contentUuid}`);
  }

  static fetchCurriculumMapping(contentUuid: string): Promise<boolean> {
    return httpService.get(`${CMSApiPrefix()}/content/curriculum-mapping/${contentUuid}`);
  }

  static fetchCourseMapping(contentUuid: string): Promise<CourseMappingStatusRes> {
    return httpService.get(`${CMSApiPrefix()}/content/course-mapping/${contentUuid}`);
  }

  static postDraftVideos(params: PostDraftVideosParams): Promise<PostDraftVideosRes> {
    return httpService.post(`${CMSApiPrefix()}/videos/draft`, params);
  }

  static async fetchS3FileDownload(key: string, fileName: string): Promise<void> {
    return fileDownload({ url: `${PMSApiPrefix()}/file/s3/download`, params: { key, fileName } });
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
  static createHTML5Draft(params: {
    tenantId: string;
    tenantName: string;
    channelUuid: string;
    languageCountryCode: string;
    fileUuid: string;
  }) {
    return httpService.post(`${CMSApiPrefix()}/html5/draft`, params);
  }
  // HTML5 동영상 콘텐츠 관리
  static updateHTML5FileChange(body: { contentUuid: string; fileUuid: string }): Promise<any> {
    return httpService.put(`${CMSApiPrefix()}/html5/file/change`, body);
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

  // 블로그 사용/조회 이력 저장
  static saveBlogWatchLog(body: BlogWatchLogReq) {
    return httpService.post(`${CMSApiPrefix()}/blog/watch-log`, body);
  }
}
