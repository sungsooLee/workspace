import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { pageRouteConfig } from '@features/auth';

import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormRow } from '@shared/ui';
import { queryOptions } from '@entities/course';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { FormSubTitle } from '@learnway/ui/base-form';

export const Route = createFileRoute('/_layout/')({
  component: HomeComponent,
  ...pageRouteConfig({
    meta: { mobile: { showHeader: true, showFooter: true, showMainFooter: true } },
  }),
});

function HomeComponent() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();

  const { provider, getValues, control } = useDynamicForm(formConfig);
  const handleLearningWindow = (values: any, courseData: any) => {
    router.navigate({
      to: `/learning-window`,
      state: {
        learningInfo: {
          courseName: courseData?.courseName,
          courseId: values.courseId,
          sequenceId: values.sequenceId,
          curriculumId: values.curriculumId,
          moduleId: values.moduleId ? parseInt(values.moduleId) : undefined,
          lessonId: values.lessonId ? parseInt(values.lessonId) : undefined,
        },
      },
    });
  };
  const handleCourse = (values: any) => {
    router.navigate({
      to: `/course/detail`,
      state: {
        courseId: values.detailCourseId,
      },
    });
  };
  return (
    <div className="flex flex-col gap-10 p-2">
      <h3>Welcome Home!</h3>
      <Link to="/common-popup">테스트 페이지 (common-popup)</Link>
    </div>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'detailCourseId',
      type: 'text',
      label: '과정Id',
      value: '7',
    },
    {
      name: 'courseId',
      type: 'text',
      label: '과정Id',
      value: '1',
    },
    {
      name: 'sequenceId',
      type: 'text',
      label: '과정차수Id',
      value: '1',
    },
    {
      name: 'curriculumId',
      type: 'text',
      label: '커리큘럼 Id',
      value: '1',
    },
    {
      name: 'moduleId',
      type: 'text',
      label: '모듈 Id',
      placeholder: '모듈 ID 입력 필요시',
      value: '',
    },
    {
      name: 'lessonId',
      type: 'text',
      label: '레슨 Id',
      placeholder: '레슨 ID 입력 필요시',
      value: '',
    },
  ],
  validator: {
    curriculumId: {
      required: true,
    },
  },
};
