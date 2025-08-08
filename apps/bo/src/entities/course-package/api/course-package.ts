import { LMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';
import { CoursePackagesParam, CreateCoursePackage } from '../model/course-package.types';

export default class CoursePackageService {
  static fetchCoursePackages(params: CoursePackagesParam) {
    // return httpService.get<CoursePackages[]>(`${LMSApiPrefix()}/pkgs`, params);
    return {
      totalPages: 0,
      totalElements: 0,
      size: 0,
      content: [
        {
          packageId: 1,
          packageName: '자바 기초',
          description: '자바 프로그래밍 기초 과정입니다.',
          channelName: '채널명',
          tenantName: '테넌트명',
          isUsed: true,
        },
      ],
      number: 0,
      sort: [
        {
          direction: 'string',
          nullHandling: 'string',
          ascending: true,
          property: 'string',
          ignoreCase: true,
        },
      ],
      numberOfElements: 0,
      pageable: {
        offset: 0,
        sort: [
          {
            direction: 'string',
            nullHandling: 'string',
            ascending: true,
            property: 'string',
            ignoreCase: true,
          },
        ],
        pageSize: 0,
        paged: true,
        pageNumber: 0,
        unpaged: true,
      },
      first: true,
      last: true,
      empty: true,
    };
  }
  static createCoursePackage(params: CreateCoursePackage) {
    return httpService.post(`${LMSApiPrefix()}/pkgs`, params);
  }
  static fetchCoursePackagesTree(packageId: number) {
    // return httpService.get<any>(`${LMSApiPrefix()}/pkgs/${packageId}/tree`);
    return {
      id: 1,
      itemName: 'string',
      itemType: 'COURSE',
      sortSeq: null,
      name: 'ROOT',
      depth: 0,
      children: [
        {
          id: 17,
          itemName: '과정',
          itemType: 'COURSE',
          sortSeq: 1,
          name: '과정',
          depth: 1,
          children: [],
        },
        {
          id: 44,
          itemName: '서브패키지',
          itemType: 'SUB_PKG',
          sortSeq: 2,
          name: '서브패키지',
          depth: 1,
          children: [],
        },
      ],
    };
  }
}
