import { CourseCompleteDetail, CourseResponse, CourseType, CourseTypeLabel, TrainingLevelType, TrainingLevelTypeLabel } from "@types";

const ddata = {
  thumbnail: 'https://cdn.learnway.io/thumbnail/thumbnail.png',
  // course: {
  //   courseId: 'A100021',
  //   courseName: '패키지 타이틀 패키지 타이틀 패키지 타이틀 패키지 타이틀 패키지 타이틀',
  //   courseStar: 4.5,
  //   courseLike: 500,
  //   courseViews: 77500,

  //   data: {
  //     type: '클래스',
  //     category: 'Quiz > JavaScript > 기초',
  //     place: '온라인',
  //     duration: 84,
  //     outchannel: 'LearnWay',
  //     lernType: '자율학습',
  //     level: '초급',
  //     certificate: true,
  //     captionLanguage: '한국어',
  //   },
  // },
  class: [
    {
      id: 'C0001',
      name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
      type: 'empty', // 수강 가능 없음
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      dday: 30,
      number: 1,
      location: '온라인',
      remainingSeats: 10,
    },
    {
      id: 'C0002',
      name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
      type: 'alram', // 오픈알림
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      dday: 30,
      number: 1,
      location: '온라인',
      remainingSeats: 10,
    },
    {
      id: 'C0003',
      name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
      type: 'class', // 정상 차수
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      dday: 30,
      number: 1,
      location: '온라인',
      remainingSeats: 10,
    },
    {
      id: 'C0004',
      name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
      type: 'class', // 정상 차수
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      dday: 0,
      number: 2,
      location: '온라인',
      remainingSeats: 10,
    },
    {
      id: 'C0005',
      name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
      type: 'class', // 정상 차수
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      dday: 0,
      number: 3,
      location: '온라인',
      remainingSeats: 10,
    },
  ],
  package: [
    {
      id: 'p01',
      name: '패키지 이름 패키지 이름 패키지 이름 패키지 이름 패키지 이름',
      type: '패키지',
      description: '패키지 설명',
      classes: [
        {
          id: 'A100020',
          name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          type: '패키지',
          thumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
        },
        {
          id: 'A100021',
          name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          type: '패키지',
          thumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
        },
        {
          id: 'A100022',
          name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          type: '패키지',
          thumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
        },
      ],
    },
    {
      id: 'p02',
      name: '패키지 이름2 패키지 이름 패키지 이름 패키지 이름 패키지 이름',
      type: '패키지',
      description: '패키지 설명',
      classes: [
        {
          id: 'A100020',
          name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          type: '패키지',
          thumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
        },
        {
          id: 'A100021',
          name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          type: '패키지',
          thumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
        },
        {
          id: 'A100022',
          name: '클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름 클래스 이름',
          type: '패키지',
          thumbnail: 'https://cdn.learnway.io/class/thumbnail.png',
        },
      ],
    },
  ],
  preRequired: [
    {
      id: 'A100020',
      name: '선수 과정 이름 선수 과정 이름 선수 과정 이름 선수 과정 이름',
      thumbnail: 'https://cdn.learnway.io/course/thumbnail.png',
      courseId: 7,
      courseName: 'CLASS - A2',
      courseType: 'CLASS',
      curriculumId: 2,
      starRatingAverage: 0,
      viewCount: 2,
      likeCount: 1,
    },
    {
      id: 'A100021',
      name: '선수 과정 이름2 선수 과정 이름 선수 과정 이름 선수 과정 이름',
      thumbnail: 'https://cdn.learnway.io/course/thumbnail.png',
    },
  ],
  // introduction: {
  //   aiSummary:
  //     '과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다.',
  //   tags: [
  //     { value: 'tag1', label: '태그1' },
  //     { value: 'tag2', label: '태그2' },
  //     { value: 'tag3', label: '태그3' },
  //   ],
  //   goal: [{ text: '과정 목표1' }, { text: '과정 목표2' }, { text: '과정 목표3' }],
  //   contentsSummary: [{ text: '과정 내용1' }, { text: '과정 내용2' }, { text: '과정 내용3' }],
  //   content: {
  //     title: '과정 소개',
  //     text: '과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다.',
  //     image: 'https://cdn.learnway.io/course/introduction.png',
  //   },
  //   recommand: [{ text: '추천 대상1' }, { text: '추천 대상2' }, { text: '추천 대상3' }],
  //   curriculum: [
  //     {
  //       id: 'c1',
  //       name: '커리큘럼1',
  //       totalTime: '10시간',
  //       course: [
  //         {
  //           id: 'A100020',
  //           name: '과정1',
  //           type: '이북',
  //           duration: '2시간',
  //         },
  //         {
  //           id: 'A100021',
  //           name: '과정2',
  //           type: '이북',
  //           duration: '2시간',
  //         },
  //         {
  //           id: 'A100022',
  //           name: '과정3',
  //           type: '이북',
  //           duration: '2시간',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'c2',
  //       name: '커리큘럼2',
  //       totalTime: '10시간',
  //       course: [
  //         {
  //           id: 'A100020',
  //           name: '과정1',
  //           type: '이북',
  //           duration: '2시간',
  //         },
  //         {
  //           id: 'A100021',
  //           name: '과정2',
  //           type: '이북',
  //           duration: '2시간',
  //         },
  //         {
  //           id: 'A100022',
  //           name: '과정3',
  //           type: '이북',
  //           duration: '2시간',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'c3',
  //       name: '커리큘럼3',
  //       totalTime: '10시간',
  //       course: [
  //         {
  //           id: 'A100020',
  //           name: '과정1',
  //           type: '이북',
  //           duration: '2시간',
  //         },
  //         {
  //           id: 'A100021',
  //           name: '과정2',
  //           type: '이북',
  //           duration: '2시간',
  //         },
  //         {
  //           id: 'A100022',
  //           name: '과정3',
  //           type: '이북',
  //           duration: '2시간',
  //         },
  //       ],
  //     },
  //   ],
  //   completionCriteria: {
  //     scores: [
  //       {
  //         title: '총점(100%)',
  //         attendance: '80점 이상',
  //       },
  //       {
  //         title: '총점(100%)',
  //         attendance: '90점 이상',
  //       },
  //       {
  //         title: '총점(100%)',
  //         attendance: '80점 이상',
  //       },
  //       {
  //         title: '총점(100%)',
  //         attendance: '90점 이상',
  //       },
  //     ],
  //     description: [
  //       {
  //         text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.',
  //       },
  //       {
  //         text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.',
  //       },
  //       {
  //         text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.',
  //       },
  //     ],
  //   },
  //   teachers: [
  //     {
  //       id: 't1',
  //       name: '강사1',
  //       historys: [{ text: '강사1 이력1' }, { text: '강사1 이력2' }, { text: '강사1 이력3' }],
  //     },
  //     {
  //       id: 't2',
  //       name: '강사2',
  //       profileImage: 'https://cdn.learnway.io/teacher/profile2.png',
  //       description: '강사2 소개입니다. 강사2 소개입니다. 강사2 소개입니다.',
  //       email: 'abcde@google.com',
  //       historys: [{ text: '강사1 이력1' }, { text: '강사1 이력2' }, { text: '강사1 이력3' }],
  //     },
  //   ],
  //   operators: [
  //     {
  //       id: 'o1',
  //       name: '운영자1',
  //       teams: '운영팀',
  //       position: '운영자',
  //       email: 'abs@google.com',
  //       phone: '010-1234-5678',
  //     },
  //     {
  //       id: 'o2',
  //       name: '운영자2',
  //       profileImage: 'https://cdn.learnway.io/operator/profile2.png',
  //       teams: '운영팀',
  //       position: '운영자',
  //       email: 'abs@google.com',
  //       phone: '010-1234-5678',
  //     },
  //   ],
  //   information: [
  //     {
  //       title: '과정 정보1',
  //       content: '과정 정보 내용1입니다. 과정 정보 내용1입니다. 과정 정보 내용1입니다.',
  //     },
  //     {
  //       title: '과정 정보2',
  //       content: '과정 정보 내용2입니다. 과정 정보 내용2입니다. 과정 정보 내용2입니다.',
  //     },
  //   ],
  // },
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
            {
              text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.',
            },
            {
              text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.',
            },
            {
              text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.',
            },
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
          address: '서울 강남구 테헤란로 KG타워',
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
            {
              text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.',
            },
            {
              text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.',
            },
            {
              text: '과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다. 과정 이수 기준 설명입니다.',
            },
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
  // channel: {
  //   id: '200030',
  //   name: '채널 이름 채널 이름 채널 이름',
  //   description: '채널 설명',
  //   thumbnail: 'https://cdn.learnway.io/channel/thumbnail.png',
  //   subscribers: 1500,
  // },

  isEnrollRequired: true,
};

export const mapCourseDetail = (courseData: CourseResponse): CourseCompleteDetail => {
  return {
    ...courseData,
    ...ddata,

    course: {
      // courseId: 'A100021',
      courseName: courseData.courseName || '',
      courseStar: courseData.starRatingAverage || 0,
      courseLike: courseData.likeCount,
      courseLikeChk: courseData.isLikeCourse,
      courseViews: courseData.viewCount || 0,

      data: {
        type: CourseTypeLabel[courseData.courseType as CourseType] || '',
        category: courseData.categories?.map((c) => c.categoryName).join(' > ') || '',
        level: TrainingLevelTypeLabel[courseData.trainingLevelType as TrainingLevelType] || '',
        certificate: courseData.isCertificateProvided || false,
        captionLanguage: courseData.language || '',
      },
    },
    channel: {
      id: '200030',
      name: '****************',
      description: '**************',
      thumbnail: 'https://cdn.learnway.io/channel/thumbnail.png',
      subscribers: 1500,
    },
    introduction: {
      aiSummary: courseData.courseSummary || '',
      tags: courseData.tagNames?.map((tag) => ({ value: tag.tagId, label: tag.tagName })) || [],
      content: {
        title: '과정 소개',
        // content: '<div><p>과정 내용입니다. 과정 내용입니다. 과정 내용입니다.</p></div>과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다. 과정 소개 내용입니다.',
        content: courseData.courseContent || '',
        // image: 'https://cdn.learnway.io/course/introduction.png',
      },
      curriculum: [
        // 커리큘럼
        {
          id: 'c1',
          name: '************ 커리큘럼1',
          totalTime: '*********** 10시간',
          course: [
            {
              id: '********** A100020',
              name: '********** 과정1',
              type: '********** 이북',
              duration: '********** 2시간',
            },
          ],
        },
      ],
      completionCriteria: {
        scores: [
          {
            title: `총점(100%)`,
            attendance: `${courseData.totalMinPassScore}점 이상`,
          },
          {
            title: `진도(${courseData.progressWeights}%)`,
            attendance: `${courseData.progressMinPassScore}점 이상`,
          },
          {
            title: `출석(${courseData.attendanceWeights}%)`,
            attendance: `${courseData.attendanceMinPassScore}점 이상`,
          },
          {
            title: `평가(${courseData.examWeights}%)`,
            attendance: `${courseData.examMinPassScore}점 이상`,
          },
          {
            title: `과제(${courseData.asgmtWeights}%)`,
            attendance: `${courseData.asgmtMinPassScore}점 이상`,
          },
        ],
      },
      teachers: [
        {
          id: 'instructor',
          name: courseData.instructorName,
          profileImage: '************** .png',
          description: '************ 강사 소개',
          email: courseData.instructorEmail,
          career: courseData.career || '전) 경력1\n전) 경력2\n현) 경력3',
        },
      ],
      operators: [
        {
          id: 'operator',
          name: courseData.operatorName,
          profileImage: '************.png',
          teams: courseData.operatorCompany,
          position: courseData.operatorDept,
          email: courseData.operatorEmail,
          phone: courseData.operatorTelNo,
        },
      ],
      // information: [
      //   {
      //     title: '*********** 과정 정보1',
      //     content: '************* 과정 내용1',
      //   },
      //   {
      //     title: '*********** 과정 정보2',
      //     content: '************* 과정 내용2',
      //   },
      // ],
    },
    // preRequired: courseData.preqCourseList?.map((item) => ({
    //   courseId: 7,
    //   courseName: "CLASS - A2",
    //   courseType: "CLASS",
    //   curriculumId: 2,
    //   starRatingAverage: 0,
    //   viewCount: 2,
    //   likeCount: 1
    // })) || [],
  };
};
