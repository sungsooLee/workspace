import {
  useCopyCourse,
  useDeleteCourse,
  useFetchCourse,
  useFetchCourseConfig,
  useUpdateCourse,
} from '@entities/course';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui';
import { TriggerKey, useCourseStore } from '@pages/_layout/learning/course/-store/use-course-store';
import { useNavigate } from '@tanstack/react-router';
import { Course, CourseConfig } from '@types';
import { useUpdateEffect } from 'ahooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route as CourseRoute } from '../index';

export function useCourseDetail(courseId: number) {
  const { t } = useTranslation();
  const { showSaveComplete, alert, saveConfirm, confirm } = useModal();
  const lastTriggered = useCourseStore((state) => state.lastTriggered);
  const navigate = useNavigate();

  const { provider, getValues, updateFormData, formValues, onSubmit, onFormChange } =
    useDynamicForm2();

  const { data: formData } = useFetchCourse(courseId);

  const { data: courseConfig } = useFetchCourseConfig({
    courseType: formData?.courseType,
    channelUuid: formData?.channelUuid,
  });

  const { mutate: updateCourse } = useUpdateCourse({
    onSuccess: async (response: any) => {
      await showSaveComplete();
    },
  });

  const { mutate: deleteCourse } = useDeleteCourse({
    onSuccess: async (response: any) => {
      await showSaveComplete();
      navigate({ to: CourseRoute.to });
    },
  });

  const { mutate: copyCourse } = useCopyCourse({
    onSuccess: async (response: any) => {
      await alert(t('과정 복사 완료'));
      navigate({ to: CourseRoute.to });
    },
  });

  const handleSave = () => {
    const run = onSubmit(async (data) => {
      console.log('수동 제출 성공:', { formValues, data });
      if (await saveConfirm()) {
        const mergeData = { ...formValues, ...data };
        const requestData = formDataToRequestData(mergeData);
        updateCourse(requestData);
      }
    });
    // 가짜 이벤트 객체를 생성해서 수동으로 호출
    run({ preventDefault: () => null } as any);
  };

  const handleCopy = () => {
    const run = async () => {
      if (await confirm(t('과정 복사 하시겠습니까?'))) {
        copyCourse(courseId);
      }
    };
    run();
  };

  useUpdateEffect(() => {
    switch (lastTriggered?.key) {
      case TriggerKey.LIST:
        navigate({ to: CourseRoute.to });
        break;
      case TriggerKey.SAVE:
        handleSave();
        break;
      case TriggerKey.COPY:
        handleCopy();
        break;
      case TriggerKey.TRANSLATE:
        handleSave();
        break;
      case TriggerKey.DELETE:
        // handleDeleteAction(lastTriggered.payload);
        break;
    }
  }, [lastTriggered]);

  useEffect(() => {
    if (formData) {
      updateFormData(responseDataToFormData(formData, courseConfig));
    }
  }, [formData, courseConfig]);

  return {
    provider,
    getValues,
    updateFormData,
    formValues,
    onSubmit,
    onFormChange,
    courseConfig,
    formData,
    handleSave,
  };
}

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
