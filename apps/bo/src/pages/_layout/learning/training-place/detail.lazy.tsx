import { TrainingPlaceDetail } from '@features/learning-operate-support/learning-space/learning-space-management/training-place-detail';
import { Button } from '@learnway/ui/button';
import { EnFormMode, EnPageMode } from '@shared/types/enums';
import { ContentsButtons, LinkBox, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect, useRef } from 'react';

export const Route = createLazyFileRoute('/_layout/learning/training-place/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const learningSpaceId = routerState.location.state?.learningSpaceId;
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!learningSpaceId) router.navigate({ to: '/learning/training-place' });
  }, []);

  const handleSaveClick = () => {
    if (formRef.current?.saveData) formRef.current.saveData();
  };

  const handleDeleteClick = async () => {
    if (formRef.current?.deleteData) formRef.current.deleteData();
  };

  const handleListClick = () => {
    const listParam = routerState.location.state?.listParam;
    router.navigate({ to: '/learning/training-place', state: { listParam } });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            variant="point"
            size="sm"
            onClick={handleListClick}
            label={t('LABEL.button.list')}
          />
        </LinkBox>
        <Button
          variant="point"
          size="sm"
          onClick={handleDeleteClick}
          label={t('LABEL.button.delete')}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleSaveClick}
          label={t('LABEL.button.save')}
        />
      </ContentsButtons>
      <MainContents>
        <TrainingPlaceDetail
          ref={formRef}
          pageMode={EnPageMode.PAGE}
          mode={EnFormMode.VIEW}
          spaceId={learningSpaceId}
        />
      </MainContents>
    </PageContainer>
  );
}
