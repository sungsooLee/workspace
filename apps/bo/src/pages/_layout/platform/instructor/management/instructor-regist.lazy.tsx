import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer, MainContents, ContentsButtons, LinkBox } from '@widgets/layout';
import { Button } from '@learnway/ui';
import { InstructorRegist } from '@features/platform/instructor';
import { useRef } from 'react';

export const Route = createLazyFileRoute(
  '/_layout/platform/instructor/management/instructor-regist',
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
            onClick={() => router.navigate({ to: '/platform/instructor/management' })}
          />
        </LinkBox>
        {/* <Button
          label={t('LABEL.button.reset')}
          variant="gray2"
          size="sm"
          //onClick={() => router.navigate({ to: '/platform/tenant/management/regist' })}
        /> */}
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
          ref={formRef}
          instructorId={instructorId}
          instructorType={instructorType}
        />
      </MainContents>
    </PageContainer>
  );
}
