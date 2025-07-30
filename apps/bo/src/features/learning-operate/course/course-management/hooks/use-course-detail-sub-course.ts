import {
  useCopyCourse,
  useDeleteCourse,
  useFetchCourse,
  useFetchCourseConfig,
  useUpdateCourse,
} from '@entities/course';
import {
  TriggerKey,
  useCourseLastTriggered,
} from '@features/learning-operate/course/course-management';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui';
import { usePageState } from '@shared/lib/use-page-state';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formDataToRequestData, responseDataToFormData } from '../service/course-data-convert';
import { CourseDetailPageLocationState } from './use-course-detail-page';

export function useCourseDetailSubCourse() {
  const { t } = useTranslation();
  const { showSaveComplete, alert, saveConfirm, confirm } = useModal();
  const lastTriggered = useCourseLastTriggered();
  // const { courseId } = useCourseCreateInfo();
  const navigate = useNavigate();

  // 라우터 state에서 courseId 가져오기
  const { courseId = -1 } = usePageState<CourseDetailPageLocationState>();

  const { provider, getValues, updateFormData, formValues, onSubmit, onFormChange } =
    useDynamicForm2();

  const { data: formData } = useFetchCourse(courseId);

  console.log('courseId', courseId);

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
      navigate({ to: '/learning/course' });
    },
  });

  const { mutate: copyCourse } = useCopyCourse({
    onSuccess: async (response: any) => {
      await alert(t('과정 복사 완료'));
      navigate({ to: '/learning/course' });
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
        navigate({ to: '/learning/course' });
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
    courseId,
    handleSave,
  };
}
