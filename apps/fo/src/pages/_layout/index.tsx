import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { pageRouteConfig } from '@features/auth';

import { Button, ContentsRow } from '@learnway/ui';
import { DynamicFormConfig, useDynamicForm } from '@learnway/hooks';
import { FormRow } from '@shared/ui';

export const Route = createFileRoute('/_layout/')({
  component: HomeComponent,
  ...pageRouteConfig({
    meta: { mobile: { showHeader: true, showFooter: true, showMainFooter: true } },
  }),
});

function HomeComponent() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const { provider, getValues, control } = useDynamicForm(formConfig);

  return (
    <div className="flex flex-col gap-10 p-2">
      <h3>Welcome Home!</h3>
      <ContentsRow>
        <FormRow provider={provider} name="courseId" />
        <FormRow provider={provider} name="sequenceId" />
        <FormRow provider={provider} name="curriculumId" />
      </ContentsRow>
      <ContentsRow>
        <FormRow provider={provider} name="moduleId" />
        <FormRow provider={provider} name="lessonId" />
        <Button
          label="학습창"
          variant="primary"
          type="button"
          size="lg"
          preventDefault
          onClick={() => {
            const values = getValues();
            router.navigate({
              to: `/learning-window`,
              state: {
                learningInfo: {
                  courseId: values.courseId,
                  sequenceId: values.sequenceId,
                  curriculumId: values.curriculumId,
                  moduleId: values.moduleId ? parseInt(values.moduleId) : undefined,
                  lessonId: values.lessonId ? parseInt(values.lessonId) : undefined,
                },
              },
            });
          }}
        />
      </ContentsRow>
    </div>
  );
}

const formConfig: DynamicFormConfig = {
  builders: [
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
