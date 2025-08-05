import {
  CourseSharedHistoryList,
  CourseSharedList,
} from '@entities/course-shared/model/course-shared.types';
import { LMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';

export default class CourseSharedService {
  static fetchCourseSharedList(params: any) {
    return httpService.get<CourseSharedList[]>(`${LMSApiPrefix()}/course/shared`, params);
  }
  static fetchCourseSharedHistory(params: any) {
    const courseShareId = params.courseShareId;
    delete params.courseShareId;
    return httpService.get<CourseSharedHistoryList[]>(
      `${LMSApiPrefix()}/course/shared/${courseShareId}`,
      params,
    );
  }
  static copyCourseShared(params: any) {
    const courseId = params.courseId;
    delete params.courseId;
    return httpService.post(`${LMSApiPrefix()}/course/shared/${courseId}/copy`, params);
  }
}
