import { useCallback, useEffect, useMemo } from 'react';
import { CourseDetailTab, CourseTab } from '../types/type';

import {
  useCreateCourse,
  useDeleteCourse,
  useFetchCourse,
  useFetchCourseConfig,
  useUpdateCourseWizard1,
  useUpdateCourseWizard2,
  useUpdateCourseWizard3,
  useUpdateCourseWizard4,
  useUpdateCourseWizard5,
} from '@entities/course';
import { UseDynamicFormResult } from '@learnway/hooks';
import { useModal } from '@learnway/ui';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { formDataToRequestData, responseDataToFormData } from '../service/data-convert';
import {
  TriggerKey,
  useCourseActions,
  useCourseCreateInfo,
  useCourseLastTriggered,
} from '../store/use-course-store';
import { getDummyCourse, getDummyCourse2, getDummyCourse4 } from './course-mock-data';

// 과정 생성/수정 서브페이지 커스텀 훅
export const useCourseCreateSubPage = (form: UseDynamicFormResult) => {
  const { showSaveComplete, saveConfirm, showDeleteComplete } = useModal();
  const navigate = useNavigate();
  const { updateFormData, formValues, onSubmit, formState, watch } = form;
  const lastTriggered = useCourseLastTriggered();
  const { courseId, courseType: initCourseType, activeTab } = useCourseCreateInfo();
  const { setCheckDirtyForm } = useCourseActions();

  const courseType = watch('courseType');
  const channelUuid = watch('channelUuid');

  // courseData를 먼저 가져와서 channelUuid를 확보
  const { data: courseData } = useFetchCourse(courseId);

  // courseConfigParams를 courseData와 courseCreateInfo로부터 생성
  // const courseConfigParams = useMemo(
  //   () => ({
  //     courseType,
  //     channelUuid: courseData?.channelUuid,
  //   }),
  //   [courseType, courseData?.channelUuid],
  // );

  // 과정 설정 정보(courseConfig) 조회
  const { data: courseConfig } = useFetchCourseConfig(
    useMemo(() => ({ courseType, channelUuid }), [courseType, channelUuid]),
  );

  // 과정 생성 뮤테이션
  const { mutate: createCourse } = useCreateCourse({
    onSuccess: async () => {
      await showSaveComplete();
      moveCourseListPage();
    },
  });

  // 과정 삭제 뮤테이션
  const { mutate: deleteCourse } = useDeleteCourse({
    onSuccess: () => {
      showDeleteComplete();
      moveCourseListPage();
    },
  });

  // 각 스텝별 과정 수정 뮤테이션 객체
  const updateMutations = useUpdateCourseWizardMutations(() => {
    showSaveComplete();
    if (activeTab === CourseTab.STEP5) {
      moveCourseDetailPage();
    }
  });

  // 현재 탭에 맞는 update 뮤테이션 반환
  const getUpdateMutate = useCallback(
    (currentTab: CourseTab | CourseDetailTab) => updateMutations[currentTab as CourseTab],
    [updateMutations],
  );

  // 저장 핸들러
  const handleSave = useCallback(async () => {
    const run = onSubmit(async (data) => {
      if (!(await saveConfirm())) {
        return;
      }
      const wizardStep = getWizardStep(activeTab);
      const mergeData = { ...formValues, ...data, wizardStep };
      const isUpdate = mergeData?.courseId;
      const requestData = formDataToRequestData(mergeData);
      const updateCourse = getUpdateMutate(activeTab);

      isUpdate ? updateCourse(requestData) : createCourse(requestData);
    });
    // 가짜 이벤트 객체를 생성해서 수동으로 호출
    run({ preventDefault: () => null } as any);
  }, [formValues, activeTab]);

  // 삭제 핸들러
  const handleDelete = useCallback(async () => {
    if (!(await saveConfirm())) {
      return;
    }
    deleteCourse(courseId);
  }, [courseId]);

  // 테스트용 더미 데이터 로드
  const loadMockData = useCallback((type = 1) => {
    const dummyData =
      type === 1
        ? getDummyCourse()
        : type === 2
          ? getDummyCourse2()
          : type === 4
            ? getDummyCourse4()
            : getDummyCourse();
    // setData((prev) => ({
    //   ...prev,
    //   formData: dummyData as Course,
    //   courseConfig: getDummyCourseConfig(),
    // }));
  }, []);

  // 수정 모드 여부
  const isUpdateMode = useMemo(() => !!courseData?.courseId, [courseData]);

  // 과정 목록 페이지 이동
  const moveCourseListPage = () => {
    navigate({
      to: '/learning/course',
    });
  };

  // 과정 상세 페이지 이동
  const moveCourseDetailPage = () => {
    navigate({
      to: '/learning/course/detail',
      state: {
        courseId,
      },
    });
  };

  // 저장/삭제 트리거 감지 effect
  useUpdateEffect(() => {
    // form이 dirty한 경우 early return
    switch (lastTriggered?.key) {
      case TriggerKey.SAVE:
        handleSave();
        break;
      case TriggerKey.DELETE:
        handleDelete();
        break;
    }
  }, [lastTriggered]);

  // courseData 변경 시 폼 데이터 갱신
  useEffect(() => {
    if (courseData) {
      const formData = responseDataToFormData(courseData);
      updateFormData(formData);
    } else {
      updateFormData({ courseType: initCourseType });
    }
  }, [courseData, initCourseType]);

  // form state 변경 시 코스 생성 정보 업데이트 - 무한 반복 방지를 위해 제거
  useEffect(() => {
    // console.log('use-course-create-sub-page : useEffect.formState', formState.isDirty);
    setCheckDirtyForm(() => formState.isDirty);
  }, [formState.isDirty]);

  return {
    isUpdateMode,
    loadMockData,
    courseConfig,
  };
};

// 현재 활성화된 탭에 맞는 wizard step 반환
const getWizardStep = (activeTab: CourseTab | CourseDetailTab) => {
  switch (activeTab) {
    case CourseTab.STEP1:
      return 'STEP1';
    case CourseTab.STEP2:
      return 'STEP2';
    case CourseTab.STEP3:
      return 'STEP3';
    case CourseTab.STEP4:
      return 'STEP4';
    case CourseTab.STEP5:
      return 'STEP5';
  }
};

// 각 과정 스텝별 update 뮤테이션 반환
export const useUpdateCourseWizardMutations = (onSuccess: () => void) => {
  const w1 = useUpdateCourseWizard1({ onSuccess });
  const w2 = useUpdateCourseWizard2({ onSuccess });
  const w3 = useUpdateCourseWizard3({ onSuccess });
  const w4 = useUpdateCourseWizard4({ onSuccess });
  const w5 = useUpdateCourseWizard5({ onSuccess });

  return {
    [CourseTab.STEP1]: w1.mutate,
    [CourseTab.STEP2]: w2.mutate,
    [CourseTab.STEP3]: w3.mutate,
    [CourseTab.STEP4]: w4.mutate,
    [CourseTab.STEP5]: w5.mutate,
  };
};
