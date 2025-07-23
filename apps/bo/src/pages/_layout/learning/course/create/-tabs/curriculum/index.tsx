import { useDynamicForm2 } from '@learnway/hooks';
import { IcoMinus, IcoPlus } from '@learnway/icons';
import { Button, FormSubTitle, SplitPanel, TreeBox, TreeContainer } from '@learnway/ui';
import { Course } from '@types';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseTabBaseProps, CourseTabFormRef } from '../../../-common/type';
import { useCourseCreateSubPage } from '../../../-hooks/use-course-create-sub-page';
import { FORM_MODE } from '@shared/const';
import { CurriculumDetail } from '@features/learning-operate/curriculum/curriculum-management/ui/curriculum-detail';

const CurriculumComponent = forwardRef<CourseTabFormRef, CourseTabBaseProps>((_, ref) => {
  const { t } = useTranslation();

  const form = useDynamicForm2();
  const { provider, getValues, watch, onFormChange } = form;

  const { courseConfig } = useCourseCreateSubPage(form);

  const channelUuid = watch('channelUuid');
  const courseType = watch('courseType');

  console.log('----- basic', {
    channelUuid,
    courseType,
    values: getValues(),
  });

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
        mode={FORM_MODE.create}
        curriculumId={0}
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

export const Curriculum = CurriculumComponent;
