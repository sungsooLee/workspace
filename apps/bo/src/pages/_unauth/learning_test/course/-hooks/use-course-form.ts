import { useCallback, useRef, useState } from 'react';
import { TabFormRef } from '../-common/type';

import {
  useCreateCourse,
  useUpdateCourseWizard1,
  useUpdateCourseWizard2,
  useUpdateCourseWizard3,
  useUpdateCourseWizard4,
  useUpdateCourseWizard5,
} from '@entities/course';
import { useQueryClient } from '@tanstack/react-query';
import { queryOptions } from '@entities/course/service/course.queries';
import { Course, CourseConfig } from '@types';

export const useCourseForm = (courseType?: string) => {
  // QueryClient 인스턴스
  const queryClient = useQueryClient();
  // 각 탭별 저장 훅
  const createCourse = useCreateCourse();
  const updateCourseWizard1 = useUpdateCourseWizard1();
  const updateCourseWizard2 = useUpdateCourseWizard2();
  const updateCourseWizard3 = useUpdateCourseWizard3();
  const updateCourseWizard4 = useUpdateCourseWizard4();
  const updateCourseWizard5 = useUpdateCourseWizard5();

  // 각 탭의 ref 관리
  const tabRefs = useRef<Record<string, TabFormRef | null>>({
    STEP1: null, // BasicInfo
    STEP2: null, // CourseRegistration
    STEP3: null, // Curriculum
    STEP4: null, // DetailInfo
    STEP5: null, // PublishCourse
  });

  // 전체 폼 데이터 상태
  const [data, setData] = useState<{ formData: Course; courseConfig: CourseConfig }>({
    formData: responseDataToFormData({
      courseType,
      categories: [
        // 카테고리 팝업 api 연동되면 삭제
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
    } as Course),
    courseConfig: {} as CourseConfig,
  });

  // 현재 활성 탭
  const [activeTab, setActiveTab] = useState('STEP1');

  // ref 설정 함수들
  const setTabRef = useCallback((tabKey: string, ref: TabFormRef | null) => {
    tabRefs.current[tabKey] = ref;
  }, []);

  // 특정 탭의 유효성 검사
  const validateTab = useCallback(async (tabKey: string) => {
    const currentRef = tabRefs.current[tabKey];
    if (!currentRef) {
      return { isValid: false, data: null, errors: '해당 탭은 아직 구현되지 않았습니다.' };
    }

    try {
      const result = await currentRef.validate();
      return result;
    } catch (error) {
      console.error(`${tabKey} 탭 유효성 검사 중 오류:`, error);
      return { isValid: false, data: null, errors: '유효성 검사 중 오류가 발생했습니다.' };
    }
  }, []);

  // 탭별 저장 함수 매핑
  const getTabSaveFunction = useCallback(
    (tabKey: string): { mutateAsync?: (data: any) => Promise<any> } | undefined => {
      const saveHookMap = {
        STEP1: updateCourseWizard1, // BasicInfo
        STEP2: updateCourseWizard2, // CourseRegistration
        STEP3: updateCourseWizard3, // Curriculum
        STEP4: updateCourseWizard4, // DetailInfo
        STEP5: updateCourseWizard5, // PublishCourse
      };
      return saveHookMap[tabKey as keyof typeof saveHookMap];
    },
    [
      updateCourseWizard1,
      updateCourseWizard2,
      updateCourseWizard3,
      updateCourseWizard4,
      updateCourseWizard5,
    ],
  );

  // 데이터 조회
  const loadCourseData = useCallback(
    async (courseId: number) => {
      try {
        // 과정 상세 조회
        const rowData: Course = await queryClient.fetchQuery(queryOptions.get(courseId));
        const formData = responseDataToFormData(rowData);
        // 과정 항목 설정 정보 조회
        const courseConfig: CourseConfig = await queryClient.fetchQuery(
          queryOptions.getCourseConfig({
            courseType: formData.courseType,
            channelId: 1, //formData.channelUuid,
          }),
        );
        setData((prev) => ({ ...prev, formData, courseConfig }));
        return { success: true, data: formData };
      } catch (error) {
        console.error('데이터 조회 중 오류:', error);
        return { success: false, error };
      }
    },
    [queryClient],
  );

  // 과정 저장 API 호출
  const saveCourseData = useCallback(
    async (data: any) => {
      const courseId = data?.formData?.courseId || data.courseId;
      const requestData = formDataToRequestData(data, activeTab);

      if (!courseId) {
        console.log('새로운 과정 생성:', requestData);
        return await createCourse.mutateAsync(requestData);
      }

      const saveFunction = getTabSaveFunction(activeTab);
      if (!saveFunction?.mutateAsync) {
        throw new Error(`${activeTab} 탭에 대한 저장 함수가 정의되지 않았습니다.`);
      }

      console.log(`${activeTab} 탭 업데이트:`, requestData);
      return await saveFunction.mutateAsync(requestData);
    },
    [data, activeTab, createCourse, getTabSaveFunction],
  );

  // 현재 활성 탭 저장
  const saveCurrentTab = useCallback(async () => {
    try {
      // 1. 유효성 검사
      const { isValid, data: tabData, errors } = await validateTab(activeTab);
      if (!isValid) {
        console.log(`${activeTab} 탭 유효성 검사 실패:`, errors);
        throw new Error(`유효성 검사 에러 : ${errors}`);
      }

      // 2. API 호출 (상태 업데이트는 재조회에서 처리)
      console.log(`${activeTab} 탭 유효성 검사 통과:`, tabData);
      return await saveCourseData(tabData);
    } catch (error: any) {
      throw new Error(`저장 중 에러 : ${error.message}`);
    }
  }, [activeTab, validateTab, saveCourseData]);

  // 탭 변경
  const changeTab = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
  }, []);

  // 테스트용
  const loadMockData = useCallback(() => {
    setData((prev) => ({
      ...prev,
      formData: getDummyCourse2(),
      courseConfig: getDummyCourseConfig(),
    }));
  }, []);

  return {
    // 상태
    data,
    activeTab,
    tabRefs,
    // 액션
    setTabRef,
    validateTab,
    saveCurrentTab,
    loadCourseData,
    changeTab,
    loadMockData,
    getTabValues: () => {
      const currentRef = tabRefs.current[activeTab];
      if (!currentRef) {
        return null;
      }
      return currentRef.getValues?.();
    },
  };
};

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (response: Course) => {
  return {
    ...response,
    // step1
    primaryCategoryId: 1, // 서버에서 받으면 삭제
    categoryIds: response?.categories?.map((d: any) => d.categoryId), // 카테고리 아이디
    tenantIds: response?.tenantList?.map((d: any) => d.tenantId), // 테넌트 아이디
    targetList: response?.targetList?.map((d: any) => ({
      ...d,
      name: d?.combiners?.[0]?.combineValue,
    })),
    // step2
    isEnrollRequired: true, // 수강신청 그룹
    // step4
    isLearnEnvEnabled: true, // 학습환경 설정 사용 여부
    isLearnControlEnabled: true, // 학습제어 설정 사용 여부
    isUsePassOption: true, // 이수기준 설정 사용 여부
    // isCommunicationToolEnabled: true, // 커뮤니티 및 공유설정 사용 여부
    isInstructorAssigned: true, // 강사 설정 사용 여부
    isTextbookProvided: true, // 교재 설정 사용 여부
    isRelatedPrerequisiteCourseExisted: true, // 사전/연관학습 설정 사용 여부
    isUseOutsourcing: true, // 오토에버 위탁 전용 설정 여부
  };
};

/**
 * 폼 데이터를 요청 데이터로 변환
 */
const formDataToRequestData = (formData: Record<string, any>, activeTab: string): Course => {
  const newFormData = {
    ...formData,
    categoryIds: formData?.categories?.map((d: any) => d.categoryId), // 카테고리 아이디
    targetList: formData?.targetList?.map((d: any) => ({ ...d, name: undefined })), // 학습대상 아이디
    wizardStep: activeTab,
    primaryCategoryId: 1, // 서버에서 받으면 삭제
    coordinatorTelCountryCode: 'KOR_82',
    operatorTelCountryCode: 'KOR_82',
  } as unknown as Course;
  // 수강신청
  return newFormData;
};

const getDummyCourseConfig = (): CourseConfig => {
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

// 이러닝2
const getDummyCourse = () => {
  const response = {
    courseType: 'ELEARNING2',
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
  };
  return response;
};

// 클래스
const getDummyCourse2 = (): Course => {
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
