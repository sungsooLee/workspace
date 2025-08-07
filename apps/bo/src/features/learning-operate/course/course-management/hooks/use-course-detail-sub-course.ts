import {
  useCopyCourse,
  useDeleteCourse,
  useFetchCourseAndConfig,
  useTranslateCourse,
  useUpdateCourse,
} from '@entities/course';
import {
  TriggerKey,
  useCourseLastTriggered,
} from '@features/learning-operate/course/course-management';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { usePageState } from '@shared/lib/use-page-state';
import { getCurrentAuthUser } from '@shared/lib/util/query-utils';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formDataToRequestData, responseDataToFormData } from '../service/course-data-convert';
import { useCourseActions } from '../store/use-course-store';
import { CourseDetailPageLocationState } from './use-course-detail-page';

export function useCourseDetailSubCourse() {
  const { t } = useTranslation();
  const { showSaveComplete, alert, saveConfirm, confirm } = useModal();
  const lastTriggered = useCourseLastTriggered();
  const navigate = useNavigate();

  // 라우터 state에서 courseId 가져오기
  const { courseId = -1, courseName } = usePageState<CourseDetailPageLocationState>();

  const { provider, getValues, updateFormData, formValues, onSubmit, onFormChange, formState } =
    useDynamicForm2();

  const { course: formData, courseConfig } = useFetchCourseAndConfig(courseId);

  const { setCheckDirtyForm } = useCourseActions();

  const { mutate: updateCourse } = useUpdateCourse({
    onSuccess: async (response: any) => {
      await showSaveComplete();
    },
  });

  const { mutate: deleteCourse } = useDeleteCourse({
    onSuccess: async (response: any) => {
      await showSaveComplete();
      navigate({ to: '/learning/course' });
    },
  });

  const { mutate: copyCourse } = useCopyCourse({
    onSuccess: async (response: any) => {
      await alert(t('과정이 복사 되었습니다.'));
      navigate({
        to: '/learning/course/detail',
        state: { courseId: response, meta: { title: `[${t('복사')}]${courseName}` } },
      });
    },
  });

  const { mutate: translateCourse } = useTranslateCourse({
    onSuccess: async (response: any) => {
      await alert(t('과정이 복사 되었습니다.'));
      navigate({
        to: '/learning/course/detail',
        state: { courseId: response, meta: { title: `[${t('번역')}]${courseName}` } },
      });
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
        const { lastVisitedBoTenantId } = getCurrentAuthUser() || {}; // 현재 로그인한 사용자의 테넌트 ID
        copyCourse({ courseId, tenantId: lastVisitedBoTenantId || -1 });
      }
    };
    run();
  };

  const handleTranslate = () => {
    const run = async () => {
      if (await confirm(t('과정 번역 하시겠습니까?'))) {
        const { lastVisitedBoTenantId } = getCurrentAuthUser() || {}; // 현재 로그인한 사용자의 테넌트 ID
        translateCourse({ courseId, tenantId: lastVisitedBoTenantId || -1 });
      }
    };
    run();
  };

  useUpdateEffect(() => {
    switch (lastTriggered?.key) {
      case TriggerKey.LIST:
        navigate({ to: '/learning/course' });
        break;
      case TriggerKey.SAVE:
        handleSave();
        break;
      case TriggerKey.COPY:
        handleCopy();
        break;
      case TriggerKey.TRANSLATE:
        handleTranslate();
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

  // form state 변경 시 폼 더티 체크 함수 설정
  useEffect(() => {
    // console.log('use-course-create-sub-page : useEffect.formState', formState.isDirty);
    setCheckDirtyForm(() => formState.isDirty);
  }, [formState.isDirty]);

  return {
    provider,
    getValues,
    updateFormData,
    formValues,
    onSubmit,
    onFormChange,
    courseConfig,
    formData,
    courseId,
    handleSave,
  };
}
