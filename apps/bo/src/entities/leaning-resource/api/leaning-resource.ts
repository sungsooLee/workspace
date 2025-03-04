import { httpService } from '@learnway/shared';
import { faker } from '@faker-js/faker';
export default class LeaningResourceService {
  static fetchLeaningResources(params: any) {
    return new Promise((resolve) => {
      const leanings = Array.from({ length: 10 }, (_, id) => ({
        id: id + 1,
        tenant: faker.food.fruit(),
        channel: faker.food.fruit(),
        type: faker.food.fruit(),
        leaningResourceName: faker.food.fruit(),
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
      resolve({ content: leanings, pageable: { pageSize: 10, pageIndex: 0, totalElements: 55 } });
    });
  }
  static fetchMappingCourses(params: any) {
    return new Promise((resolve) => {
      const mappingCourses = Array.from({ length: 10 }, (_, id) => ({
        id: id + 1,
        tenant: faker.food.fruit(),
        channel: faker.food.fruit(),
        type: faker.food.fruit(),
        leaningResourceName: faker.food.fruit(),
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
