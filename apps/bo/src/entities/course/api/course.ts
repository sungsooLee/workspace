import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { CoursesRequest, CoursesResponse } from '../../../types';

export default class CourseService {
  static fetchCourses(params: CoursesRequest): Promise<CoursesResponse> {
    return httpService.get<CoursesResponse>(`${PMSApiPrefix()}/courses`, params);
  }
  static fetchCourse(id: string) {
    return httpService.get<CoursesResponse>(`${PMSApiPrefix()}/course/${id}`);
  }

  static createCourse(payload: any) {
    return httpService.post<CoursesResponse>(`${PMSApiPrefix()}/course`, payload);
  }

  static updateCourse(payload: any) {
    return httpService.post<CoursesResponse>(`${PMSApiPrefix()}/course`, payload);
  }

  static deleteCourse(id: string) {
    return httpService.post<CoursesResponse>(`${PMSApiPrefix()}/course`, { id });
  }
}
