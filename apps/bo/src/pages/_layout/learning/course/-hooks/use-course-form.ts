import { useCallback, useRef, useState } from 'react';
import { TabFormRef } from '../-components/common/tab-form-ref';

// import { useUpdateCourseWizard1 } from '@entities/course/api/use-update-course-wizard1';
import {
  useCreateCourse,
  useFetchCourse,
  useUpdateCourseWizard1,
  useUpdateCourseWizard2,
  useUpdateCourseWizard3,
  useUpdateCourseWizard4,
  useUpdateCourseWizard5,
} from '@entities/course';

export const useCourseForm = () => {
  // 과정 데이터 fetch 훅
  const fetchCourse = useFetchCourse;
  // 각 탭별 저장 훅
  const createCourse = useCreateCourse();
  const updateCourseWizard1 = useUpdateCourseWizard1();
  const updateCourseWizard2 = useUpdateCourseWizard2();
  const updateCourseWizard3 = useUpdateCourseWizard3();
  const updateCourseWizard4 = useUpdateCourseWizard4();
  const updateCourseWizard5 = useUpdateCourseWizard5();

  // 각 탭의 ref 관리
  const tabRefs = useRef<Record<string, TabFormRef | null>>({
    a: null, // BasicInfo
    b: null, // CourseRegistration
    c: null, // Curriculum
    d: null, // DetailInfo
    e: null, // PublishCourse
  });

  // 전체 폼 데이터 상태
  const [formData, setFormData] = useState<Record<string, any>>({});

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 현재 활성 탭
  const [activeTab, setActiveTab] = useState('a');

  // ref 설정 함수들
  const setTabRef = useCallback((tabKey: string, ref: TabFormRef | null) => {
    tabRefs.current[tabKey] = ref;
  }, []);

  // 폼 데이터 업데이트
  const updateFormData = useCallback((newData: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  }, []);

  // 전체 폼 데이터 설정
  const setFormDataComplete = useCallback((data: Record<string, any>) => {
    setFormData(data);
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
        a: updateCourseWizard1, // BasicInfo
        b: updateCourseWizard2, // CourseRegistration
        c: updateCourseWizard3, // Curriculum
        d: updateCourseWizard4, // DetailInfo
        e: updateCourseWizard5, // PublishCourse
      };
      return saveHookMap[tabKey as keyof typeof saveHookMap];
    },
    [
      createCourse,
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
      setIsLoading(true);

      try {
        // useFetchCourse 훅을 사용하여 실제 데이터 조회
        const courseData = await fetchCourse(courseId);
        setFormData(courseData);

        return { success: true, data: courseData };
      } catch (error) {
        console.error('데이터 조회 중 오류:', error);
        return { success: false, error };
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCourse],
  );

  // 과정 저장 API 호출
  const saveCourseData = useCallback(
    async (data: any) => {
      const courseId = formData.courseId || data.courseId;

      if (!courseId) {
        console.log('새로운 과정 생성:', data);
        return await createCourse.mutateAsync(data);
      }

      const saveFunction = getTabSaveFunction(activeTab);
      if (!saveFunction?.mutateAsync) {
        throw new Error(`${activeTab} 탭에 대한 저장 함수가 정의되지 않았습니다.`);
      }

      console.log(`${activeTab} 탭 업데이트:`, data);
      return await saveFunction.mutateAsync(data);
    },
    [formData.courseId, activeTab, createCourse, getTabSaveFunction],
  );

  // 현재 활성 탭 저장
  const saveCurrentTab = useCallback(async () => {
    setIsLoading(true);

    try {
      // 1. 유효성 검사
      const validation = await validateTab(activeTab);
      if (!validation.isValid) {
        console.log(`${activeTab} 탭 유효성 검사 실패:`, validation.errors);
        return { success: false, error: validation.errors };
      }

      // 2. API 호출 (상태 업데이트는 재조회에서 처리)
      console.log(`${activeTab} 탭 유효성 검사 통과:`, validation.data);
      await saveCourseData(validation.data);

      return { success: true, data: validation.data };
    } catch (error) {
      console.error('저장 중 오류:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, validateTab, saveCourseData]);

  // 탭 변경
  const changeTab = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
  }, []);

  // 테스트용
  const loadMockData = useCallback(() => {
    setFormData(getDummyCourseData());
  }, []);

  return {
    // 상태
    formData,
    isLoading,
    activeTab,
    tabRefs,

    // 액션
    setTabRef,
    updateFormData,
    setFormDataComplete,
    validateTab,
    saveCurrentTab,
    loadCourseData,
    changeTab,
    loadMockData,
  };
};

// 더미 데이터 함수
const getDummyCourseData = () => {
  const response = {
    courseType: 'ELEARNING1',
    channelUuid: '67bbca16-4180-4982-a4e0-d192212dd7c2',
    tenantIds: [2, 3],
    categoryIds: [11, 22, 33],
    primaryCategoryId: 1,
    targetList: [
      {
        key: '66',
        title: 'test1',
        apiUuid: 'bc1fd644-b6c5-42fc-b2ff-796fa7b3d03d',
        apiId: '66',
        apiNodeType: 'API',
        apiMethod: 'GET',
        apiName: 'test1',
        apiScope: 'FO',
        apiUrl: 'test1234',
        depth: null,
        parentId: 1,
        sortOrder: 2,
        isUsed: true,
        apiDesc: '1234',
        children: [],
        fullPath: 'ROOT > test1',
        _visible: true,
      },
    ],
    language: 'KO',
    courseName: '과정명...',
    courseSummary: '과장 요약',
    courseContent:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"교육 내용","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    trainingLevelType: 'BASIC',
    learningSpaceName: '신민제/개발팀',
    operatorName: '김지훈/개발팀',
    operatorUuid: 'c39280c3-3f6d-11f0-9435-0218a74d52f7',
    operatorDeptName: '개발팀',
    coordinatorUuid: 'c3929798-3f6d-11f0-9435-0218a74d5224',
    learningSpaceType: 'LEARNING_WAY',
    coordinatorName: '이현주/개발팀',
    coordinatorDeptName: '개발팀',
    coordinatorTelNo: '33332222',
    coordinatorEmail: '담당자@email.com',
    operatorTelNo: '44445555',
    operatorEmail: '운영자@email.com',
  };
  return response;
};
