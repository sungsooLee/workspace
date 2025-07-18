import { httpService } from '@learnway/shared';
import { PageableContent } from '@types';
import { PMSApiPrefix, LMSApiPrefix } from '@learnway/config';
// import { InstructorHistory, Instructor, Instructors } from 'src/types/entities/round';

export default class LearningSequenceService {
  static fetchSequenceList(params: any) {
    // return httpService.get<PageableContent<Instructors>>(`${LMSApiPrefix()}/instructor`, params);
    return [
      {
        openYear: 2025,
        sequence: 1,
        courseSequenceCd: 1116,
        courseSequenceName: '테스트',
        regStartDate: new Date(),
        regEndDate: new Date(),
        eduStartDate: new Date(),
        eduEndDate: new Date(),
        eduEndDay: null,
        status: '수강신청 전',
        isUsed: '사용',
        capacity: 1,
        enroll: 2,
        student: 3,
        graduateStudent: 4,
      },
      {
        openYear: 2025,
        sequence: 2,
        courseSequenceCd: 1117,
        courseSequenceName: '테스트',
        regStartDate: new Date(),
        regEndDate: new Date(),
        eduStartDate: new Date(),
        eduEndDate: null,
        eduEndDay: 5,
        status: '학습중',
        isUsed: '사용',
        capacity: 1,
        enroll: 2,
        student: 3,
        graduateStudent: 4,
      },
      {
        openYear: 2025,
        sequence: 3,
        courseSequenceCd: 1118,
        courseSequenceName: '테스트',
        regStartDate: new Date(),
        regEndDate: new Date(),
        eduStartDate: new Date(),
        eduEndDate: new Date(),
        eduEndDay: null,
        status: '수강신청중',
        isUsed: '사용',
        capacity: 1,
        enroll: 2,
        student: 3,
        graduateStudent: 4,
      },
    ];
  }

  static fetchSequenceOne(params: any) {
    return null;
  }

  static fetchEnrollmentRegistList(params: any) {
    return [
      {
        openYear: 2025,
        sequenceName: '테스트',
        eduStartDate: new Date(),
        eduEndDate: new Date(),
        status: '조직장 대기중',
        company: '현대오토에버',
        department: 'L&D플랫폼',
        employeeId: 99999,
        employeeName: '김현대',
        regDate: new Date(),
      },
    ];
  }
  static fetchEnrollmentWaitList(params: any) {
    return null;
  }
  static fetchEnrollmentCancelList(params: any) {
    return null;
  }
}
