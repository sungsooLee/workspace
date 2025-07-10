import { Course, CourseConfig } from '@types';

// ------------------------------------------------------------------
//
// - 더미 데이터
//
// ------------------------------------------------------------------

export const getDummyCourseConfig = (): CourseConfig => {
  return {
    enrollOption: 'IMPOSSIBLE',
    learningEnvOption: 'OPTIONAL',
    learningControlOption: 'OPTIONAL',
    passOption: 'MANDATORY',
    communicationOption: 'OPTIONAL',
    instructorOption: 'OPTIONAL',
    textBookOption: 'OPTIONAL',
    relatedCourseOption: 'OPTIONAL',
    adminDataOption: 'OPTIONAL',
    allowedContentTypes: ['VIDEO', 'EXAM', 'ASSIGNMENT'],
    fileStorageType: 'AWS_INTERNAL',
  };
};

// 이러닝1
export const getDummyCourse = () => {
  return {
    courseType: 'ELEARNING1',
    categories: [
      {
        categoryId: 11,
        name: '1-1',
        categoryCode: 'category11',
        categoryContent: '',
        categoryPath: 'ROOT>한글명-CATE00011>1-1',
        isPrimary: false,
        tenantIds: [2],
      },
    ],
    channelUuid: 'd4bf5f43-3184-445b-8985-f316619909db',
    language: 'KO',
    courseName: '과정명 1111111111111111',
    courseSummary: 'ㅁㅁ',
    courseContent:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ㅍㅍㅍㅍㅍ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    trainingLevelType: 'NONE',
    learningSpaceType: 'LEARNING_WAY',
    coordinatorUuid: 'c3927f00-3f6d-11f0-9435-0218a74d52f7',
    coordinatorName: '정민혁/개발팀',
    coordinatorDeptName: '정민혁/개발팀',
    coordinatorTelCountryCode: 'KOR_82',
    coordinatorTelNo: '2233',
    coordinatorEmail: '2222',
    operatorUuid: 'c39280c3-3f6d-11f0-9435-0218a74d52f7',
    operatorName: '김지훈/개발팀',
    operatorDeptName: '김지훈/개발팀',
    primaryCategoryId: 11,
    operatorTelCountryCode: 'KOR_82',
  };
};

// 클래스
export const getDummyCourse2 = (): Course => {
  return {
    courseType: 'CLASS',
    channelUuid: '67bbca16-4180-4982-a4e0-d192212dd7c2',
    tenantIds: [2, 3],
    categories: [
      {
        categoryId: 11,
        name: '1-1',
        categoryCode: 'category11',
        categoryContent: '',
        categoryPath: 'ROOT>한글명-CATE00011>1-1',
        isPrimary: false,
        tenantIds: [2],
      },
    ],
    primaryCategoryId: 1,
    targetList: [],
    language: 'KO',
    courseName: '과정명...',
    courseSummary: '과장 요약',
    courseContent:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"교육 내용","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    trainingLevelType: 'BASIC',
    learningSpaceName: '장소',
    operatorName: '김지훈/개발팀',
    operatorUuid: 'c39280c3-3f6d-11f0-9435-0218a74d52f7',
    operatorDeptName: '개발팀',
    coordinatorUuid: 'c3929798-3f6d-11f0-9435-0218a74d5224',
    learningSpaceType: 'MANUAL',
    coordinatorName: '이현주/개발팀',
    coordinatorDeptName: '개발팀',
    coordinatorTelNo: '33332222',
    coordinatorEmail: '담당자@email.com',
    operatorTelNo: '44445555',
    operatorEmail: '운영자@email.com',
    learningSpaceNameKeyIn: 'xx',
  } as unknown as Course;
};
