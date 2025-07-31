import { LMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';

export default class CourseService {
  // 과정 정보 조회
  static async fetch(id: number) {
    // return {
    //   courseName: '패키지 타이틀123123 패키지 타이틀 패키지 타이틀 패키지 타이틀 패키지 타이틀',
    //   starRatingAverage: 4.5,
    //   starRatings: [
    //     { starRating: 1, starRatingCount: 100, starRatingRatio: 20 },
    //     { starRating: 2, starRatingCount: 200, starRatingRatio: 20 },
    //     { starRating: 3, starRatingCount: 300, starRatingRatio: 20 },
    //     { starRating: 4, starRatingCount: 400, starRatingRatio: 20 },
    //     { starRating: 5, starRatingCount: 500, starRatingRatio: 20 },
    //   ],
    //   likeCount: 500,
    //   viewCount: 77500,
    //   channelUuid: 'A001010',
    //   courseType: CourseType.ELEARNING1,
    //   primarycategoryId: 101,
    //   categories: [
    //     {
    //       categoryId: 901,
    //       categoryName: 'string1',
    //       categoryCode: 'string2',
    //       categoryContent: 'string3',
    //       categoryPath: 'string4',
    //       isPrimary: true,
    //       tenantIds: [{ items: 110111 }, { items: 110112 }],
    //     },
    //     {
    //       categoryId: 901,
    //       categoryName: 'string1',
    //       categoryCode: 'string2',
    //       categoryContent: 'string3',
    //       categoryPath: 'string4',
    //       isPrimary: false,
    //       tenantIds: [{ items: 110111 }, { items: 110112 }],
    //     },
    //   ],
    //   trainingLevelType: TrainingLevelType.BEGINNER,
    //   // 언어 설정
    //   language: '힌국어, 영어',
    //   // 썸네일 이미지 Group UUID
    //   thumbnailFileGroupUuid: 'lms',
    //   // 대표 썸네일 이미지 UUID
    //   primaryThumbnailFileUuid: 'a-b-c-img.jpg',
    //   // 과정요약
    //   courseSummary: 'AI가 작성한 과정 요약입니다. 과정 요약입니다. 과정 요약입니다.',
    //   // 태그 이름 목록
    //   tagNames: [
    //     { tagId: 'tag1', tagName: '태그1' },
    //     { tagId: 'tag2', tagName: '태그2' },
    //     { tagId: 'tag3', tagName: '태그3' },
    //   ],
    //   // 과정내용
    //   courseContent: '<div><p>과정 내용입니다. 과정 내용입니다. 과정 내용입니다.</p></div>',
    //   // 이수기준 설정 여부
    //   isUsePassOption: false,
    //   // 이수 처리 방식 (자동/수동)
    //   passMethodType: PassMethodType.AUTO,
    //   // 수료증 제공 여부
    //   isCertificateProvided: true,
    //   // 항목별 이수 기준 (진도)
    //   progressMinPassScore: 10,
    //   // 항목별 이수 기준 (출석)
    //   attendanceMinPassScore: 20,
    //   // 항목별 이수 기준 (평가)
    //   examMinPassScore: 30,
    //   // 항목별 이수 기준 (과제)
    //   asgmtMinPassScore: 40,
    //   // 항목별 이수 기준 (총점)
    //   totalMinPassScore: 50,
    //   // 반영 비율 (진도)
    //   progressWeights: 10,
    //   // 반영 비율 (출석)
    //   attendanceWeights: 20,
    //   // 반영 비율 (시험)
    //   examWeights: 30,
    //   // 반영 비율 (과제)
    //   asgmtWeights: 40,
    //   // 강사 이름
    //   instructorName: '강사님',
    //   // 강사 이메일
    //   instructorEmail: 'aaa@abc.com',
    //   // 강사 경력
    //   career: '전) 경력1, 전) 경력2, 현) 경력3',
    //   // 운영자 이름
    //   operatorName: '강사님',
    //   // 운영자 회사
    //   operatorCompany: '회사',
    //   // 운영자 부서
    //   operatorDept: '파트',
    //   // 운영자 이메일
    //   operatorEmail: 'aaa@abc.com',
    //   // 운영자 전화번호
    //   operatorTelNo: '010-1234-5678',
    //   // 연관 학습 목록
    //   relatedCourseList: [
    //     {
    //       // 과정 ID
    //       courseId: 5551,
    //       // 과정
    //       courseName: '과정이름',
    //       // 과정 유형
    //       courseType: CourseType.LIVE,
    //       // New(개시일로부터 3개월)
    //       isNew: true,
    //       // 접수 상태 유형
    //       courseEnrollStatusType: CourseEnrollStatusType.OPEN,
    //       // 찜
    //       isBookmarks: true,
    //       // 영상 시간(이러닝1,2 한정)
    //       playTime: 450,
    //       // 태그 이름 목록
    //       tagNames: [
    //         { tagId: 'tag1', tagName: '태그1' },
    //         { tagId: 'tag2', tagName: '태그2' },
    //         { tagId: 'tag3', tagName: '태그3' },
    //       ],
    //       // 별점
    //       starRating: 4.1,
    //       // 조회수
    //       viewCount: 1540,
    //       // 좋아요 수
    //       likeCount: 3,
    //       // 디데이
    //       dday: 5,
    //     },
    //     {
    //       // 과정 ID
    //       courseId: 5551,
    //       // 과정
    //       courseName: '과정이름',
    //       // 과정 유형
    //       courseType: CourseType.LIVE,
    //       // New(개시일로부터 3개월)
    //       isNew: true,
    //       // 접수 상태 유형
    //       courseEnrollStatusType: CourseEnrollStatusType.OPEN,
    //       // 찜
    //       isBookmarks: true,
    //       // 영상 시간(이러닝1,2 한정)
    //       playTime: 450,
    //       // 태그 이름 목록
    //       tagNames: [
    //         { tagId: 'tag1', tagName: '태그1' },
    //         { tagId: 'tag2', tagName: '태그2' },
    //         { tagId: 'tag3', tagName: '태그3' },
    //       ],
    //       // 별점
    //       starRating: 4.1,
    //       // 조회수
    //       viewCount: 1540,
    //       // 좋아요 수
    //       likeCount: 3,
    //       // 디데이
    //       dday: 5,
    //     },
    //   ],
    // };

    return await httpService.get(`${LMSApiPrefix()}/course/${id}`);
  }

  // 과정 차수 불러오기
  static async fetchSequences(courseId: string, reqDto: any): Promise<any> {
    return await httpService.get<any>(`${LMSApiPrefix()}/course/${courseId}/sequences`, {
      ...reqDto,
    });
  }
  // 과정 차수 단건 불러오기
  static async fetchSequenceOne(courseSequenceId: string): Promise<any> {
    return await httpService.get<any>(`${LMSApiPrefix()}/sequence/${courseSequenceId}`);
  }

  // 과정 패키지 리스트 불러오기
  static async fetchCoursePackage(uuid: string): Promise<any> {
    return await httpService.get<any>(`${LMSApiPrefix()}/course/${uuid}/sequences`);
  }

  // 과정 패키지 아이템 불러오기
  static async fetchCoursePackageItems(uuid: string, packageid: string): Promise<any> {
    return await httpService.get<any>(`${LMSApiPrefix()}/course/${uuid}/sequences`);
  }

  // 과정 대시보드 불러오기
  static async fetchDashboard(uuid: string): Promise<any> {
    return await httpService.get<any>(`${LMSApiPrefix()}/course/${uuid}/sequences`);
  }

  // 수강신청
  // static async postCourseEnroll(payload: any) {
  //   console.log('payload', payload);
  //   return {
  //     code: 200,
  //     message: '승인되었습니다.',
  //   };
  //   return await httpService.post(`${LMSApiPrefix()}/course/enroll`, payload);
  // }
  // 수강취소신청
  static async postCourseEnrollCancle(payload: any) {
    console.log('payload', payload);
    return {
      code: 200,
      message: '수강취소',
    };
    return await httpService.post(`${LMSApiPrefix()}/course/enroll`, payload);
  }
  // 수강대기신청
  static async postCourseEnrollWaiting(payload: any) {
    console.log('payload', payload);
    return {
      code: 200,
      message: '대기신청 완료',
    };
    return await httpService.post(`${LMSApiPrefix()}/course/enroll`, payload);
  }
  // 수강대기취소신청
  static async postCourseEnrollWaitingCancle(payload: any) {
    console.log('payload', payload);
    return {
      code: 200,
      message: '대기신청 취소',
    };
    return await httpService.post(`${LMSApiPrefix()}/course/enroll`, payload);
  }
  // 과정찜하기
  static async postCourseLike(courseId: any) {
    // console.log('payload', payload);
    // return {
    //   code: 200,
    //   message: '좋아요',
    // };
    return await httpService.post(`${LMSApiPrefix()}/course/${courseId}/like`, {});
  }
  // 나의 학습 진행율 조회
  static async postDashboardLearningProgress(payload: any) {
    return await httpService.post(`${LMSApiPrefix()}/students/learning/progress`, payload);
  }

  static fetchCourse(courseId: number) {
    // /user/api/v1/course/{courseId}/sequences
    return httpService.get<any>(`${LMSApiPrefix()}/course/${courseId}`);
  }
}
