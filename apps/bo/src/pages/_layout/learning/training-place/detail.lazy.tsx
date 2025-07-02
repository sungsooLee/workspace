import { useRef, useEffect } from 'react';
import { t } from 'i18next';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { Button, useModal } from '@learnway/ui';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { LinkBox } from '@widgets/layout/ui/container/slot/link-box';
import { TrainingPlaceDetail } from '@features/learning/training-place/training-place-detail';
import { EnFormMode, EnPageMode } from '@types';

export const Route = createLazyFileRoute('/_layout/learning/training-place/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const { open: openConfirm } = useModal();

  const learningSpaceId = routerState.location.state?.learningSpaceId;
  const formRef = useRef();

  useEffect(() => {
    console.log('### learningSpaceUuid', learningSpaceId);
    if (!learningSpaceId) router.navigate({ to: '/learning/training-place' });
  }, [learningSpaceId]);

  const handleSaveClick = () => {
    const detail: any = formRef.current;
    detail.saveData();
  };

  const handleDeleteClick = async () => {
    const detail: any = formRef.current;
    detail.deleteData();
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
