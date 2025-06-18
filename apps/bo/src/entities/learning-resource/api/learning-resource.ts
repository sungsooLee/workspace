import { fileDownload, httpService } from '@learnway/shared';
import { faker } from '@faker-js/faker';
import { CMSApiPrefix, PMSApiPrefix } from '@learnway/config';

export default class LearningResourceService {
  static fetchChannelsByTenantId(tenantId: string | number): Promise<any> {
    const params = { page: 0, size: 2000, tenantId };
    return httpService.get(`${PMSApiPrefix()}/channel`, params);
  }

  static fetchUser(uuid: string): Promise<any> {
    return httpService.get(`${PMSApiPrefix()}/users/` + uuid);
  }

  static fetchContents(params: any): Promise<any> {
    return httpService.get(`${CMSApiPrefix()}/contents`, params);
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

  // HTML5 동영상 콘텐츠 관리
  static updateHTML5FileChange(params: { contentUuid: string; fileUuid: string }): Promise<any> {
    return httpService.put(`${CMSApiPrefix()}/html5/file/change`, params);
  }

  // HTML5 동영상 콘텐츠 리소스 조회
  static fetchHTML5Resource(params: { contentUuid: string }) {
    return httpService.put(`${CMSApiPrefix()}/html5/${params.contentUuid}/resource`, params);
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
}
