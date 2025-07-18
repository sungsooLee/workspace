import {
  InstructorHistory,
  InstructorRegist,
} from '@features/learning-operate-support/instructor-tutor/instructor-management';
import { Button } from '@learnway/ui';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { EnPageMode } from '@types';
import { t } from 'i18next';
import { useRef } from 'react';

export const Route = createLazyFileRoute(
  '/_layout/learning-operate-support/instructor/management/instructor-regist',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const instructorId = routerState.location.state?.instructorId;
  const instructorType = routerState.location.state?.instructorType;

  const formRef = useRef<HTMLFormElement>(null);

  const handleSaveButtonClick = async () => {
    if (formRef.current?.saveData) formRef.current.saveData();
  };

  const handleDeleteButtonClick = async () => {
    if (formRef.current?.deleteData) formRef.current.deleteData();
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            label={t('LABEL.button.list')}
            variant="gray2"
            size="sm"
            onClick={() =>
              router.navigate({
                to: '/learning-operate-support/instructor/management',
              })
            }
          />
        </LinkBox>
        <Button
          label={t('LABEL.button.delete')}
          variant="gray2"
          size="sm"
          onClick={handleDeleteButtonClick}
        />
        <Button
          label={t('LABEL.button.save')}
          variant="primary"
          size="sm"
          onClick={handleSaveButtonClick}
        />
      </ContentsButtons>
      <MainContents>
        <InstructorRegist
          viewMode={EnPageMode.PAGE}
          ref={formRef}
          instructorId={instructorId}
          instructorType={instructorType}
        />
        {instructorId && <InstructorHistory instructorId={instructorId} />}
      </MainContents>
    </PageContainer>
  );
}
