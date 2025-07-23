import { useCallback, useEffect, useMemo } from 'react';
import { CourseTab } from '../-common/type';

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
import { useModal } from '@learnway/ui';
import { Course, CourseConfig } from '@types';
import {
  getDummyCourse,
  getDummyCourse2,
  getDummyCourse4,
  getDummyCourseConfig,
} from './course-mock-data';
import { useCourseSaveMutations } from './use-course-save-mutation';
import { TriggerKey, useCourseStore } from '../-store/use-course-store';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { UseDynamicFormResult } from '@learnway/hooks';
import { Route as CourseListRoute } from '..';

export const useCourseCreateSubPage = (form: UseDynamicFormResult) => {
  const { showSaveComplete, saveConfirm } = useModal();
  const { lastTriggered, courseCreateInfo } = useCourseStore((state) => state);
  const navigate = useNavigate();
  const { updateFormData, formValues, onSubmit } = form;

  // courseData를 먼저 가져와서 channelUuid를 확보
  const { data: courseData, refetch } = useFetchCourse(courseCreateInfo.courseId);

  // courseConfigParams를 courseData와 courseCreateInfo로부터 생성
  const courseConfigParams = useMemo(
    () => ({
      courseType: courseCreateInfo.courseType,
      channelUuid: courseData?.channelUuid,
    }),
    [courseCreateInfo.courseType, courseData?.channelUuid],
  );

  // courseConfig를 가져옴
  const { data: courseConfig } = useFetchCourseConfig(courseConfigParams);

  const { mutate: createCourse } = useCreateCourse({
    onSuccess: async () => {
      await showSaveComplete();
      moveCourseListPage();
    },
  });

  const { mutate: deleteCourse } = useDeleteCourse({
    onSuccess: () => handleUpdateSuccess(),
  });

  const { mutate: updateCourseWizard1 } = useUpdateCourseWizard1({
    onSuccess: () => handleUpdateSuccess(),
  });

  const { mutate: updateCourseWizard2 } = useUpdateCourseWizard2({
    onSuccess: () => handleUpdateSuccess(),
  });

  const { mutate: updateCourseWizard3 } = useUpdateCourseWizard3({
    onSuccess: () => handleUpdateSuccess(),
  });

  const { mutate: updateCourseWizard4 } = useUpdateCourseWizard4({
    onSuccess: () => handleUpdateSuccess(),
  });

  const { mutate: updateCourseWizard5 } = useUpdateCourseWizard5({
    onSuccess: () => handleUpdateSuccess(),
  });

  const handleUpdateSuccess = () => {
    showSaveComplete();
    // refetch();
  };

  const getUpdateMutate = useCallback((currentTab: CourseTab) => {
    switch (currentTab) {
      case CourseTab.STEP1:
        return updateCourseWizard1;
      case CourseTab.STEP2:
        return updateCourseWizard2;
      case CourseTab.STEP3:
        return updateCourseWizard3;
      case CourseTab.STEP4:
        return updateCourseWizard4;
      case CourseTab.STEP5:
        return updateCourseWizard5;
    }
  }, []);

  const handleSave = useCallback(async () => {
    const run = onSubmit(async (data) => {
      if (!(await saveConfirm())) {
        return;
      }
      const wizardStep = getWizardStep(courseCreateInfo.activeTab);
      const mergeData = { ...formValues, ...data, wizardStep };
      const isUpdate = mergeData?.courseId;
      const requestData = formDataToRequestData(mergeData);
      const updateCourse = getUpdateMutate(courseCreateInfo.activeTab);

      isUpdate ? updateCourse(requestData) : createCourse(requestData);
    });
    // 가짜 이벤트 객체를 생성해서 수동으로 호출
    run({ preventDefault: () => null } as any);
  }, [formValues, courseCreateInfo.activeTab]);

  const handleDelete = useCallback(async () => {
    if (!(await saveConfirm())) {
      return;
    }
    deleteCourse(formValues.courseId ?? -1);
  }, []);

  // 테스트용
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

  const isUpdateMode = useMemo(() => !!courseData?.courseId, [courseData]);

  const moveCourseListPage = () => {
    navigate({
      to: CourseListRoute.to,
    });
  };

  useUpdateEffect(() => {
    switch (lastTriggered?.key) {
      case TriggerKey.SAVE:
        handleSave();
        break;
      case TriggerKey.DELETE:
        handleDelete();
        break;
    }
  }, [lastTriggered]);

  useEffect(() => {
    if (courseData) {
      updateFormData(responseDataToFormData(courseData));
    }
  }, [courseData]);

  return {
    isUpdateMode,
    loadMockData,
    courseConfig,
  };
};

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (d: Course, c: CourseConfig = {} as CourseConfig): Course => {
  return {
    ...d,
    tenantIds: d?.tenantList?.map((d: any) => d.tenantId), // 테넌트 아이디
    isLearnEnvEnabled: c.learningEnvOption !== 'IMPOSSIBLE', // 학습환경 설정 사용 여부
    isLearnControlEnabled: c.learningControlOption !== 'IMPOSSIBLE', // 학습제어 설정 사용 여부
    isUsePassOption: c.passOption !== 'IMPOSSIBLE', // 이수기준 설정 사용 여부
    isCommunicationToolEnabled: c.communicationOption !== 'IMPOSSIBLE', // 커뮤니티 및 공유설정 사용 여부
    isInstructorAssigned: c.instructorOption !== 'IMPOSSIBLE', // 강사 설정 사용 여부
    isTextbookProvided: c.textBookOption !== 'IMPOSSIBLE', // 교재 설정 사용 여부
    isRelatedPrerequisiteCourseExisted: c.relatedCourseOption !== 'IMPOSSIBLE', // 사전/연관학습 설정 사용 여부
    isUseOutsourcing: true, // 오토에버 위탁 전용 설정 여부 (CourseConfig 에 관리안함)
    // 이수기준 설정
    passOption: {
      progressMinPassScore: d.progressMinPassScore, // 진도 최소 이수 점수
      attendanceMinPassScore: d.attendanceMinPassScore, // 출석 최소 이수 점수
      examMinPassScore: d.examMinPassScore, // 평가 최소 이수 점수
      asgmtMinPassScore: d.asgmtMinPassScore, // 과제 최소 이수 점수
      totalMinPassScore: d.totalMinPassScore, // 총점 최소 이수 점수
      progressWeights: d.progressWeights, // 진도 반영 비율
      attendanceWeights: d.attendanceWeights, // 출석 반영 비율
      examWeights: d.examWeights, // 평가 반영 비율
      asgmtWeights: d.asgmtWeights, // 과제 반영 비율
    },
    courseValidityRange: {
      from: d.courseValidityStartDateTime, // 과정 유효 시작일
      to: d.courseValidityEndDateTime, // 과정 유효 종료일
    },
    // tagNameArray: d.tagNames?.map((item) => item.value), // 태그
  };
};

/**
 * 과정 기본 정보 컴포넌트 폼 데이터를 요청 데이터로 변환하는 함수
 *
 * @component BasicInfo
 * @param {Course} d - 과정 기본 정보 폼 데이터
 * @returns {Course} 과정 기본 정보 요청 데이터
 */
export const formDataToRequestData = (d: Course) => {
  // 교육공간 라디오 선택에 따라 값 변경 관련 처리 (교육공간=learningSpaceType)
  // 교육공간 > 차세데 학습학습 플랫폼
  if (d.learningSpaceType === 'LEARNING_WAY') {
    d.learningSpaceId = undefined; // 교육 장소 ID
    d.learningSpaceName = undefined; // 교육 장소(선택입력)
    d.learningSpaceNameKeyIn = undefined; // 교육 장소 직접입력
  }
  // 교육공간 > 공간선택
  else if (d.learningSpaceType === 'REGISTERED') {
    d.learningSpaceNameKeyIn = undefined; // 교육 장소 직접입력
  }
  // 교육공간 > 직적입력
  else if (d.learningSpaceType === 'MANUAL') {
    d.learningSpaceId = undefined; // 교육 장소 ID
    d.learningSpaceName = undefined; // 교육 장소(선택입력)
  }

  // 카테고리 아이디 배열
  d.categoryIds = d.categories?.map((d: any) => d.categoryId);
  // 대표 카테고리
  // d.primaryCategoryId = d.categories?.[0]?.categoryId;
  // 학습대상-ID 배열
  d.targetListIds = d.targetList?.map((d: any) => d.id);

  // 담당자, 운영자 연락처 국가코드
  // d.coordinatorTelCountryCode = 'KOR_82';
  // d.operatorTelCountryCode = 'KOR_82';

  //사전 필수과정
  const preRequisiteCourseIds = d.preRequisiteCourseList
    ?.map((d) => d.courseId)
    ?.filter((id): id is number => id !== undefined);
  //연관 과정
  const relatedCourseIds = d.relatedCourseList
    ?.map((d) => d.courseId)
    ?.filter((id): id is number => id !== undefined);

  // 라디오 옵션 null 처리
  // 복습 제한 > 미사용
  if (d.isReviewRestricted === false) {
    d.maxReviewPeriodMonths = undefined; // 복습 제한 기간(개월)
  }

  // 1일 진도제한 > 미사용
  if (d.isDailyLearningProgressRestricted === false) {
    d.maxDailyLearningProgress = undefined; // 1일 진도제한(분)
  }

  // 인정 학습시간 > 학습시간
  if (d.recognizedStudyMinType === 'TIME') {
    d.recognizedStudyCycles = undefined; // 인정 학습 횟수
  }

  // 학습포인트 > 미사용
  if (d.isRecognizedStudyPoint === false) {
    d.recognizedStudyPoint = undefined; // 인정학습점수(학습포인트)
  }

  // 강사 > 강사선택
  if (d.instructorAssignType === 'REGISTERED') {
    d.instructorName = undefined; // 강사 직접입력
  }

  // 1인당 교육비 > 미사용
  if (d.isUseTrainingCostPerPerson === false) {
    d.trainingCostPerPerson = undefined; // 1인당 교육비(원)
  }

  // 고용보험 환급비용 > 미사용
  if (d.isUseEmploymentInsuranceRefund === false) {
    d.employmentInsuranceRefund = undefined; // 고용보험 환급비(원)
  }

  return {
    ...d,
    ...d.passOption, // 이수기준 설정
    preRequisiteCourseIds,
    relatedCourseIds,
    courseValidityStartDateTime: d.courseValidityRange?.from, // 과정 유효 시작일
    courseValidityEndDateTime: d.courseValidityRange?.to, // 과정 유효 종료일
    // courseValidityStartHour: 0, // 과정 노출 시작 시각 (삭제 후 courseValidityStartDate에 통합 예정)
    // courseValidityEndHour: 23, // 과정 노출 종료 시각 (삭제 후 courseValidityEndDate에 통합 예정)
    // thumbnailFileGroupUuid: '1', // 썸네일 이미지 Group UUID
    // primaryThumbnailFileUuid: '1', // 대표 썸네일 이미지 UUID
    // tagNames: d.tagNameArray?.map((item) => ({ value: item })), // 태그
  };
};

const getWizardStep = (activeTab: CourseTab) => {
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
