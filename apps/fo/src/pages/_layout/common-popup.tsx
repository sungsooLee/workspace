import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { pageRouteConfig } from '@features/auth';

import { queryOptions } from '@entities/course';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormSubTitle } from '@learnway/ui/base-form';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { FileDownloads, FormRow } from '@shared/ui';

export const Route = createFileRoute('/_layout/common-popup')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: { mobile: { showHeader: true } },
  }),
});

function RouteComponent() {
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
      <h3>Welcome component test</h3>
      <FormSubTitle className="b-0 m-0 p-0" label="학습창 " />
      <ContentsRow className="m-0">
        <FormRow className="p-0" provider={provider} name="courseId" />
        <FormRow className="p-0" provider={provider} name="sequenceId" />
        <FormRow className="p-0" provider={provider} name="curriculumId" />
      </ContentsRow>
      <ContentsRow className="m-0">
        <FormRow className="p-0" provider={provider} name="moduleId" />
        <FormRow className="p-0" provider={provider} name="lessonId" />
        <FormRow className="p-0" provider={provider} name="----">
          <Button
            className="mt-12"
            label="학습창"
            variant="primary"
            type="button"
            size="lg"
            preventDefault
            onClick={async () => {
              const values = getValues();

              const coursePromeis = queryClient.fetchQuery(queryOptions.detail(values.courseId));
              console.log(coursePromeis);
              coursePromeis
                .then((courseData) => {
                  handleLearningWindow(values, courseData);
                })
                .catch((r) => {
                  handleLearningWindow(values, { courseName: '과정명 없음' });
                });
            }}
          />
        </FormRow>
      </ContentsRow>
      <FormSubTitle className="b-0 m-0 p-0" label="과정 상세  보기" />
      <ContentsRow className="m-0">
        <FormRow className="p-0" provider={provider} name="detailCourseId" />
        <FormRow className="p-0" provider={provider} name="---"></FormRow>
        <FormRow className="p-0" provider={provider} name="---">
          <Button
            className="mt-12"
            label="과정상세"
            variant="primary"
            type="button"
            size="lg"
            preventDefault
            onClick={async () => {
              const values = getValues();

              handleCourse(values);
            }}
          />
        </FormRow>
      </ContentsRow>
      <FileDownloads />
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
