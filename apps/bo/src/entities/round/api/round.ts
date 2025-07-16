import { httpService } from '@learnway/shared';
import { PageableContent } from '@types';
import { PMSApiPrefix, LMSApiPrefix } from '@learnway/config';
// import { InstructorHistory, Instructor, Instructors } from 'src/types/entities/round';

export default class RoundService {
  static fetchList(params: any) {
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
        eduEndDate: new Date(),
        status: '학습중',
        isUsed: '사용',
        capacity: 1,
        enroll: 2,
        student: 3,
        graduateStudent: 4,
      },
    ];
  }

  static fetchOne(params: any) {
    return null;
  }
}
