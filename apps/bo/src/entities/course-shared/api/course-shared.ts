import { LMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { CourseSharedHistoryList, CourseSharedList } from '../model/course-shared.types';

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
  static courseShare(params: any) {
    return httpService.post(`${LMSApiPrefix()}/course/share`, params);
  }
  static copyCourseShared(params: any) {
    const courseId = params.courseId;
    delete params.courseId;
    return httpService.post(`${LMSApiPrefix()}/course/shared/${courseId}/copy`, params);
  }
  static fetchOriginChannels(params: any) {
    return httpService.get<any[]>(`${LMSApiPrefix()}/course/shared/originChannels`, params);
  }
}
