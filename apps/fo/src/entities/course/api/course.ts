import { httpService, objectToQueryString } from '@learnway/shared';
import {
  Course,
  PassCriteriaData
} from '../../../types';
import { LMSApiPrefix, PMSApiPrefix } from '@learnway/config';

// export class TreeService {
//   static async fetch<T = any>(tenantId: 1010010, deviceType: '텍스트') {
//     const url = objectToQuery'텍스트'(`${PMSApiPrefix()}/menus/tenantTree`, {
//       tenantId,
//       deviceType,
//     });
//       return httpService.get<any>(url);
//   }
// }


export default class CourseService {
  static async fetch(id: number) {
    return {
      thumbnail: 'https://cdn.learnway.io/thumbnail/thumbnail.png',
      course: {
        courseId: 'A100021',
        courseName: '패키지 타이틀 패키지 타이틀 패키지 타이틀 패키지 타이틀 패키지 타이틀',
        courseStar: 4.5,
        courseLike: 500,
        courseViews: 77500,

        data: {
          type: '클래스',
          category: 'Quiz > JavaScript > 기초',
          place: '온라인',
          duration: 84,
          outchannel: 'LearnWay',
          lernType: '자율학습',
          level: '초급',
          certificate: true,
          captionLanguage: '한국어',
        },
      },
      class: [
        {
          classId: 'C0001',
          className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          classType: 'empty', // 수강 가능 없음
          classStartDate: '2023-01-01',
          classEndDate: '2023-12-31',
          classDday: 30,
          classNumber: 1,
          classLocation: '온라인',
          classRemainingSeats: 10,
        },
        {
          classId: 'C0002',
          className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          classType: 'alram', // 오픈알림
          classStartDate: '2023-01-01',
          classEndDate: '2023-12-31',
          classDday: 30,
          classNumber: 1,
          classLocation: '온라인',
          classRemainingSeats: 10,
        },
        {
          classId: 'C0003',
          className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          classType: 'class',  // 정상 차수
          classStartDate: '2023-01-01',
          classEndDate: '2023-12-31',
          classDday: 30,
          classNumber: 1,
          classLocation: '온라인',
          classRemainingSeats: 10,
        },
        {
          classId: 'C0004',
          className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          classType: 'class',  // 정상 차수
          classStartDate: '2023-01-01',
          classEndDate: '2023-12-31',
          classDday:              0,
          classNumber: 2,
          classLocation: '온라인',
          classRemainingSeats: 10,
        },
        {
          classId: 'C0005',
          className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          classType: 'class',  // 정상 차수
          classStartDate: '2023-01-01',
          classEndDate: '2023-12-31',
          classDday: 0,
          classNumber: 3,
          classLocation: '온라인',
          classRemainingSeats: 10,
        },
      ],
      package: [
        {
          packageId: 'p01',
          packageName: '패키지 이름 패키지 이름 패키지 이름 패키지 이름 패키지 이름',
          packageType: '패키지',
          packageDescription: '패키지 설명',
          packageClasses: [
            {
              classId: 'A100020',
              className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
              classType: '패키지',
              classThumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
            },
            {
              classId: 'A100021',
              className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
              classType: '패키지',
              classThumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
            },
            {
              classId: 'A100022',
              className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
              classType: '패키지',
              classThumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
            },
          ],
        },
        {
          packageId: 'p02',
          packageName: '패키지 이름2 패키지 이름 패키지 이름 패키지 이름 패키지 이름',
          packageType: '패키지',
          packageDescription: '패키지 설명',
          packageClasses: [
            {
              classId: 'A100020',
              className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
              classType: '패키지',
              classThumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
            },
            {
              classId: 'A100021',
              className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
              classType: '패키지',
              classThumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
            },
            {
              classId: 'A100022',
              className: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
              classType: '패키지',
              classThumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
            },
          ],
        },
      ],
      preRequired: [
        {
          requiredCourseId: 'A100020',
          requiredCourseName: '선수 과정 이름 선수 과정 이름 선수 과정 이름 선수 과정 이름',
          requiredCourse: [
            {
              courseId: 'A100020',
              courseName: '선수 과정 이름 선수 과정 이름 선수 과정 이름 선수 과정 이름',
              courseThumbnail: 'https://cdn.learnway.io/course/thumbnail.png',
            },
            {
              courseId: 'A100021',
              courseName: '선수 과정 이름2 선수 과정 이름 선수 과정 이름 선수 과정 이름',
              courseThumbnail: 'https://cdn.learnway.io/course/thumbnail.png',
            },
          ],
        },
        {
          requiredCourseId: 'A100021',
          requiredCourseName: '선수 과정 이름 선수 과정 이름 선수 과정 이름 선수 과정 이름',
          requiredCourse: [
            {
              courseId: 'A100020',
              courseName: '선수 과정 이름 선수 과정 이름 선수 과정 이름 선수 과정 이름',
              courseThumbnail: 'https://cdn.learnway.io/course/thumbnail.png',
            },
            {
              courseId: 'A100021',
              courseName: '선수 과정 이름2 선수 과정 이름 선수 과정 이름 선수 과정 이름',
              courseThumbnail: 'https://cdn.learnway.io/course/thumbnail.png',
            },
          ],
        },
      ],
      introduction: {
        aiSummary: '과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다.',
        tags: [
          { value: 'tag1', label: '태그1' },
          { value: 'tag2', label: '태그2' },
          { value: 'tag3', label: '태그3' },
        ],
        goal: [
          {text: '과정 목표1'},
          {text: '과정 목표2'},
          {text: '과정 목표3'},
        ],
        contentsSummary: [
          {text: '과정 내용1'},
          {text: '과정 내용2'},
          {text: '과정 내용3'},
        ],
        content: {
          contentTitle: '과정 소개',
          contentText: '과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다.',
          contentImage: 'https://cdn.learnway.io/course/introduction.png',

        },
        recommand: [
          {text: '추천 대상1'},
          {text: '추천 대상2'},
          {text: '추천 대상3'},
        ],
        curriculum: [
          { 
            curriculumId: 'c1', 
            curriculumName: '커리큘럼1',
            curriculumTotalTime: '10시간',
            course: [
              { 
                courseId: 'A100020', 
                courseName: '과정1', 
                courseType: '이북',
                duration: '2시간',
              },
              { 
                courseId: 'A100021', 
                courseName: '과정2', 
                courseType: '이북',
                duration: '2시간',
              },
              { 
                courseId: 'A100022', 
                courseName: '과정3', 
                courseType: '이북',
                duration: '2시간',
              },
            ],
          },
          { 
            curriculumId: 'c2', 
            curriculumName: '커리큘럼2',
            curriculumTotalTime: '10시간',
            course: [
              { 
                courseId: 'A100020', 
                courseName: '과정1', 
                courseType: '이북',
                duration: '2시간',
              },
              { 
                courseId: 'A100021', 
                courseName: '과정2', 
                courseType: '이북',
                duration: '2시간',
              },
              { 
                courseId: 'A100022', 
                courseName: '과정3', 
                courseType: '이북',
                duration: '2시간',
              },
            ],
          },
          { 
            curriculumId: 'c3', 
            curriculumName: '커리큘럼3',
            curriculumTotalTime: '10시간',
            course: [
              { 
                courseId: 'A100020', 
                courseName: '과정1', 
                courseType: '이북',
                duration: '2시간',
              },
              { 
                courseId: 'A100021', 
                courseName: '과정2', 
                courseType: '이북',
                duration: '2시간',
              },
              { 
                courseId: 'A100022', 
                courseName: '과정3', 
                courseType: '이북',
                duration: '2시간',
              },
            ],
          },
        ],
        completionCriteria: {
          scores: [
            { 
              title: '총점(100%)',
              attendance: '80점 이상', 
            },
            { 
              title: '총점(100%)',
              attendance: '90점 이상', 
            },
            { 
              title: '총점(100%)',
              attendance: '80점 이상', 
            },
            { 
              title: '총점(100%)',
              attendance: '90점 이상', 
            },
          ],
          description: [
            {text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.'},
            {text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.'},
            {text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.'},
          ],
        },
        teachers: [
          {
            teacherId: 't1',
            teacherName: '강사1',
            historys: [
              {text: '강사1 이력1'},
              {text: '강사1 이력2'},
              {text: '강사1 이력3'},
            ],
          },
          {
            teacherId: 't2',
            teacherName: '강사2',
            teacherProfileImage: 'https://cdn.learnway.io/teacher/profile2.png',
            teacherDescription: '강사2 소개입니다. 강사2 소개입니다. 강사2 소개입니다.',
            email: 'abcde@google.com',
            historys: [
              {text: '강사1 이력1'},
              {text: '강사1 이력2'},
              {text: '강사1 이력3'},
            ],
          },
        ],
        operators: [
          {
            operatorId: 'o1',
            operatorName: '운영자1',
            teams: '운영팀',
            position: '운영자',
            email: 'abs@google.com',
            phone: '010-1234-5678',
          },
          {
            operatorId: 'o2',
            operatorName: '운영자2',
            operatorProfileImage: 'https://cdn.learnway.io/operator/profile2.png',
            teams: '운영팀',
            position: '운영자',
            email: 'abs@google.com',
            phone: '010-1234-5678',
          },
        ],
        information: [
          {
            title: '과정 정보1',
            content: '과정 정보 내용1입니다. 과정 정보 내용1입니다. 과정 정보 내용1입니다.',
          },
          {
            title: '과정 정보2',
            content: '과정 정보 내용2입니다. 과정 정보 내용2입니다. 과정 정보 내용2입니다.',
          },
        ],
      },
      educations: {
        classes: [
          {
            id: 'C100001',
            name: '교육 클래스1',
            type: '온라인',
            startDate: '2023-01-01',
            endDate: '2023-12-31',
            state: '진행중',
            info: {
              startTime: '23-01-01 15:00',
              endTime: '23-01-01 15:00',
              teacher: '김강사',
              location: '온라인',
              duration: '2시간',
              price: '1인당 30,000원',
              seats: {
                total: 30,
                current: 20,
                remaining: 10,
              },
            },
            completionCriteria: {
              scores: [
                { 
                  title: '총점(100%)',
                  attendance: '80점 이상', 
                },
                { 
                  title: '총점(100%)',
                  attendance: '90점 이상', 
                },
              ],
              description: [
                {text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.'},
                {text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.'},
                {text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.'},
              ],
            },
          },
          {
            id: 'C100002',
            name: '교육 클래스2',
            type: '오프라인',
            startDate: '2023-01-01',
            endDate: '2023-12-31',
            state: '진행중',
            info: {
              startTime: '23-01-01 15:00',
              endTime: '23-01-01 15:00',
              teacher: '김강사',
              location: '강남역',
              address: '서울 강남구 테헤란로 510',
              duration: '2시간',
              price: '1인당 30,000원',
              seats: {
                total: 30,
                current: 20,
                remaining: 10,
              },
            },
            completionCriteria: {
              scores: [
                { 
                  title: '총점(100%)',
                  attendance: '80점 이상', 
                },
                { 
                  title: '총점(100%)',
                  attendance: '90점 이상', 
                },
              ],
              description: [
                {text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.'},
                {text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.'},
                {text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.'},
              ],
            },
          },
        ],
      },
      reviews: {
        count: 1010372390123,
        personCount: 1000,
        average: 4.5,
        starScores: [
          { star: 1, percent: 20 },
          { star: 2, percent: 20 },
          { star: 3, percent: 20 },
          { star: 4, percent: 20 },
          { star: 5, percent: 20 },
        ],
        reviews: [],
      },
      channel: {
        channelId: '200030',
        channelName: '채널 이름 채널 이름 채널 이름',
        channelDescription: '채널 설명',
        channelThumbnail: 'https://cdn.learnway.io/channel/thumbnail.png',
        channelSubscribers: 1500,
      },

      isEnrollRequired: true,
    };
    return httpService.get(`${LMSApiPrefix()}/course/${id}`);
  }
  
  static async fetchSequnces(courseUuid: string): Promise<any> {
    return httpService.get<any>(`${LMSApiPrefix()}/course/${courseUuid}/sequences`);
  }
}


