import { CourseTabBaseProps } from '@features/learning-operate/course/course-management';
import { CurriculumDetail } from '@features/learning-operate/curriculum/curriculum-management/ui/curriculum-detail';
import { useDynamicForm2 } from '@learnway/hooks';
import { Button, FormSubTitle } from '@learnway/ui';
import { FORM_MODE } from '@shared/const';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCourseCreateSubPage } from '../../../../hooks/use-course-create-sub-page';

const CurriculumComponent = forwardRef<HTMLElement, CourseTabBaseProps>((_, ref) => {
  const { t } = useTranslation();

  const form = useDynamicForm2();
  const { getValues, onFormChange } = form;
  const { isUpdateMode } = useCourseCreateSubPage(form);

  return (
    <div>
      {/*대표커리큘럼설정*/}
      <FormSubTitle
        label={t('대표 커리큘럼 설정')}
        lineType={'dark'}
        actionNode={<Button variant="text" size="sm" label={t('미리보기')} />}
      />
      {/* 커리큘럼 상세 */}
      <CurriculumDetail
        mode={getValues().primaryCurriculumId ? FORM_MODE.detail : FORM_MODE.create}
        curriculumId={getValues().primaryCurriculumId}
        onCurriculumCreated={(curriculumId: number) => {
          console.log('----- onCurriculumCreated', curriculumId);
          onFormChange({
            primaryCurriculumId: curriculumId,
          });
        }}
      />
    </div>
  );
});

export const CurriculumByCreate = CurriculumComponent;
