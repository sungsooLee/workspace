import { useRef, useEffect } from 'react';
import { t } from 'i18next';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { Button, useModal } from '@learnway/ui';
import { TrainingPlaceDetail } from '@features/learning-operate-support/learning-space/learning-space-management/training-place-detail';
import { EnFormMode, EnPageMode } from '@types';
import { MainContents, PageContainer, LinkBox, ContentsButtons } from '@shared/ui';

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
  }, [learningSpaceId, router]);

  const handleSaveClick = () => {
    if (formRef.current?.saveData) formRef.current.saveData();
  };

  const handleDeleteClick = async () => {
    if (formRef.current?.deleteData) formRef.current.deleteData();
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button
            variant="point"
            size="sm"
            onClick={() => router.navigate({ to: '/learning/training-place' })}
          >
            {t('LABEL.button.list')}
          </Button>
        </LinkBox>
        <Button variant="point" size="sm" onClick={handleDeleteClick}>
          {t('LABEL.button.delete')}
        </Button>
        <Button variant="primary" size="sm" onClick={handleSaveClick}>
          {t('LABEL.button.save')}
        </Button>
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
